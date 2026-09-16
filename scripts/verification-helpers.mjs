function yamlError(line, message) {
  const location = line ? ` at line ${line.number}` : "";
  return new Error(`Invalid YAML subset${location}: ${message}`);
}

function parseYamlScalar(value, line) {
  if (value === "[]") {
    return [];
  }
  if (value === "{}") {
    return {};
  }
  if (value === "true") {
    return true;
  }
  if (value === "false") {
    return false;
  }
  if (value === "null") {
    return null;
  }
  if (/^-?(?:0|[1-9]\d*)(?:\.\d+)?$/.test(value)) {
    return Number(value);
  }
  if (value.startsWith('"') && value.endsWith('"')) {
    try {
      return JSON.parse(value);
    } catch (error) {
      throw yamlError(line, `invalid quoted scalar (${error.message})`);
    }
  }

  throw yamlError(
    line,
    `unsupported scalar ${JSON.stringify(value)}; registry scalars must be quoted or JSON-like`,
  );
}

function parseYamlPair(content, line) {
  const match = content.match(/^([A-Za-z][A-Za-z0-9_-]*):(?:\s+(.*))?$/);
  if (!match) {
    throw yamlError(line, `expected a mapping pair, received ${JSON.stringify(content)}`);
  }

  return { key: match[1], rawValue: match[2] ?? "" };
}

export function parseYamlSubset(source) {
  const lines = source
    .split(/\r?\n/)
    .map((raw, index) => ({ raw, number: index + 1 }))
    .filter(({ raw }) => raw.trim().length > 0 && !raw.trimStart().startsWith("#"))
    .map((line) => {
      if (line.raw.includes("\t")) {
        throw yamlError(line, "tabs are not allowed for indentation");
      }

      const indent = line.raw.length - line.raw.trimStart().length;
      if (indent % 2 !== 0) {
        throw yamlError(line, "indentation must use multiples of two spaces");
      }

      return { ...line, indent, content: line.raw.slice(indent) };
    });

  if (lines.length === 0) {
    throw yamlError(null, "document is empty");
  }

  function parseMapping(start, indent) {
    const value = {};
    let cursor = start;

    while (cursor < lines.length && lines[cursor].indent === indent) {
      const line = lines[cursor];
      if (line.content.startsWith("-")) {
        break;
      }

      const { key, rawValue } = parseYamlPair(line.content, line);
      if (Object.hasOwn(value, key)) {
        throw yamlError(line, `duplicate key ${key}`);
      }

      cursor += 1;
      if (rawValue.length > 0) {
        value[key] = parseYamlScalar(rawValue, line);
        continue;
      }

      const child = lines[cursor];
      if (!child || child.indent !== indent + 2) {
        throw yamlError(line, `key ${key} must have a value indented by two spaces`);
      }
      const parsed = parseBlock(cursor, indent + 2);
      value[key] = parsed.value;
      cursor = parsed.cursor;
    }

    return { value, cursor };
  }

  function parseSequence(start, indent) {
    const value = [];
    let cursor = start;

    while (cursor < lines.length && lines[cursor].indent === indent) {
      const line = lines[cursor];
      const match = line.content.match(/^-\s+(.*)$/);
      if (!match) {
        break;
      }

      const itemSource = match[1];
      cursor += 1;
      if (/^[A-Za-z][A-Za-z0-9_-]*:/.test(itemSource)) {
        const { key, rawValue } = parseYamlPair(itemSource, line);
        const item = {};

        if (rawValue.length > 0) {
          item[key] = parseYamlScalar(rawValue, line);
        } else {
          const child = lines[cursor];
          if (!child || child.indent !== indent + 2) {
            throw yamlError(line, `key ${key} must have a value indented by two spaces`);
          }
          const parsed = parseBlock(cursor, indent + 2);
          item[key] = parsed.value;
          cursor = parsed.cursor;
        }

        if (cursor < lines.length && lines[cursor].indent === indent + 2) {
          const continuation = parseMapping(cursor, indent + 2);
          for (const [continuationKey, continuationValue] of Object.entries(
            continuation.value,
          )) {
            if (Object.hasOwn(item, continuationKey)) {
              throw yamlError(lines[cursor], `duplicate key ${continuationKey}`);
            }
            item[continuationKey] = continuationValue;
          }
          cursor = continuation.cursor;
        }

        value.push(item);
      } else {
        value.push(parseYamlScalar(itemSource, line));
      }
    }

    return { value, cursor };
  }

  function parseBlock(start, indent) {
    const line = lines[start];
    if (!line || line.indent !== indent) {
      throw yamlError(line, `expected indentation level ${indent}`);
    }

    return line.content.startsWith("-")
      ? parseSequence(start, indent)
      : parseMapping(start, indent);
  }

  if (lines[0].indent !== 0) {
    throw yamlError(lines[0], "top-level content must not be indented");
  }

  const parsed = parseBlock(0, 0);
  if (parsed.cursor !== lines.length) {
    const line = lines[parsed.cursor];
    throw yamlError(line, `unexpected indentation level ${line.indent}`);
  }

  return parsed.value;
}

export function parseStaticArrayExport(source, exportName) {
  function maskCommentsAndStrings() {
    const masked = [...source];
    let index = 0;

    function maskCharacter(position) {
      if (masked[position] !== "\n" && masked[position] !== "\r") {
        masked[position] = " ";
      }
    }

    while (index < source.length) {
      if (source.startsWith("//", index)) {
        while (index < source.length && source[index] !== "\n") {
          maskCharacter(index);
          index += 1;
        }
        continue;
      }
      if (source.startsWith("/*", index)) {
        const start = index;
        while (index < source.length && !source.startsWith("*/", index)) {
          maskCharacter(index);
          index += 1;
        }
        if (index >= source.length) {
          throw new Error(`Unterminated comment at offset ${start}`);
        }
        maskCharacter(index);
        maskCharacter(index + 1);
        index += 2;
        continue;
      }

      const quote = source[index];
      if (quote === '"' || quote === "'" || quote === "`") {
        const start = index;
        maskCharacter(index);
        index += 1;
        let escaped = false;
        while (index < source.length) {
          const character = source[index];
          maskCharacter(index);
          index += 1;
          if (!escaped && character === quote) {
            break;
          }
          escaped = !escaped && character === "\\";
          if (character !== "\\") {
            escaped = false;
          }
        }
        if (source[index - 1] !== quote) {
          throw new Error(`Unterminated string at offset ${start}`);
        }
        continue;
      }
      index += 1;
    }

    return masked.join("");
  }

  const codeOnlySource = maskCommentsAndStrings();
  const escapedName = exportName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const declaration = new RegExp(
    `export\\s+const\\s+${escapedName}\\b[^=]*=\\s*`,
  ).exec(codeOnlySource);
  if (!declaration) {
    throw new Error(`Missing exported static array ${exportName}`);
  }

  let cursor = declaration.index + declaration[0].length;

  function skipTrivia() {
    while (cursor < source.length) {
      if (/\s/.test(source[cursor])) {
        cursor += 1;
        continue;
      }
      if (source.startsWith("//", cursor)) {
        const newline = source.indexOf("\n", cursor + 2);
        cursor = newline === -1 ? source.length : newline + 1;
        continue;
      }
      if (source.startsWith("/*", cursor)) {
        const end = source.indexOf("*/", cursor + 2);
        if (end === -1) {
          throw new Error("Unterminated comment in static literal export");
        }
        cursor = end + 2;
        continue;
      }
      break;
    }
  }

  function readString() {
    const start = cursor;
    cursor += 1;
    let escaped = false;
    while (cursor < source.length) {
      const character = source[cursor];
      if (!escaped && character === '"') {
        cursor += 1;
        try {
          return JSON.parse(source.slice(start, cursor));
        } catch (error) {
          throw new Error(`Invalid string in static literal: ${error.message}`);
        }
      }
      escaped = !escaped && character === "\\";
      if (character !== "\\") {
        escaped = false;
      }
      cursor += 1;
    }
    throw new Error("Unterminated string in static literal export");
  }

  function readIdentifier() {
    const match = source.slice(cursor).match(/^[A-Za-z_$][A-Za-z0-9_$-]*/);
    if (!match) {
      throw new Error(
        `Expected a static literal identifier near ${JSON.stringify(source.slice(cursor, cursor + 24))}`,
      );
    }
    cursor += match[0].length;
    return match[0];
  }

  function parseValue() {
    skipTrivia();
    const character = source[cursor];
    if (character === '"') {
      return readString();
    }
    if (character === "[") {
      cursor += 1;
      const values = [];
      skipTrivia();
      while (source[cursor] !== "]") {
        values.push(parseValue());
        skipTrivia();
        if (source[cursor] === ",") {
          cursor += 1;
          skipTrivia();
          if (source[cursor] === "]") {
            break;
          }
        } else if (source[cursor] !== "]") {
          throw new Error("Expected comma or closing bracket in static literal array");
        }
      }
      if (source[cursor] !== "]") {
        throw new Error("Unterminated static literal array");
      }
      cursor += 1;
      return values;
    }
    if (character === "{") {
      cursor += 1;
      const value = {};
      skipTrivia();
      while (source[cursor] !== "}") {
        const key = source[cursor] === '"' ? readString() : readIdentifier();
        skipTrivia();
        if (source[cursor] !== ":") {
          throw new Error(`Expected colon after static literal property ${key}`);
        }
        cursor += 1;
        if (Object.hasOwn(value, key)) {
          throw new Error(`Duplicate static literal property ${key}`);
        }
        value[key] = parseValue();
        skipTrivia();
        if (source[cursor] === ",") {
          cursor += 1;
          skipTrivia();
          if (source[cursor] === "}") {
            break;
          }
        } else if (source[cursor] !== "}") {
          throw new Error("Expected comma or closing brace in static literal object");
        }
      }
      if (source[cursor] !== "}") {
        throw new Error("Unterminated static literal object");
      }
      cursor += 1;
      return value;
    }
    if (character === "-" || /\d/.test(character ?? "")) {
      const match = source.slice(cursor).match(/^-?(?:0|[1-9]\d*)(?:\.\d+)?/);
      if (!match) {
        throw new Error("Invalid number in static literal export");
      }
      cursor += match[0].length;
      return Number(match[0]);
    }
    if (/[A-Za-z_$]/.test(character ?? "")) {
      const identifier = readIdentifier();
      if (identifier === "true") return true;
      if (identifier === "false") return false;
      if (identifier === "null") return null;
      throw new Error(`Expected a static literal, received ${identifier}`);
    }

    throw new Error(
      `Expected a static literal near ${JSON.stringify(source.slice(cursor, cursor + 24))}`,
    );
  }

  const value = parseValue();
  if (!Array.isArray(value)) {
    throw new Error(`Export ${exportName} must be a static literal array`);
  }
  return value;
}

export function isDayOneForbiddenDependency(dependency) {
  return (
    dependency === "radix-ui" ||
    dependency.startsWith("@radix-ui/") ||
    dependency === "@base-ui/react" ||
    dependency.startsWith("@base-ui-components/") ||
    dependency === "shadcn" ||
    dependency === "shadcn-ui" ||
    dependency.startsWith("@shadcn/")
  );
}

export function usesPrivateReferenceColor(source) {
  if (typeof source !== "string") {
    throw new Error("source must be text");
  }
  const withoutComments = source
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/[^\r\n]*/g, "");
  return /var\(\s*--rain-ref-[a-z0-9-]+\s*\)/i.test(withoutComments);
}

export function inspectPngMetadata(source) {
  if (!Buffer.isBuffer(source) || source.length < 33) {
    throw new Error("PNG evidence must contain a complete signature and IHDR chunk");
  }

  const expectedSignature = Buffer.from([
    0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
  ]);
  if (!source.subarray(0, 8).equals(expectedSignature)) {
    throw new Error("PNG evidence has an invalid file signature");
  }
  if (
    source.readUInt32BE(8) !== 13 ||
    source.toString("ascii", 12, 16) !== "IHDR"
  ) {
    throw new Error("PNG evidence is missing the canonical IHDR chunk");
  }

  const width = source.readUInt32BE(16);
  const height = source.readUInt32BE(20);
  if (width < 1 || height < 1) {
    throw new Error("PNG evidence must declare positive IHDR dimensions");
  }

  return { height, width };
}

export function parsePnpmLockfileImporters(source) {
  if (typeof source !== "string") {
    throw new Error("pnpm lockfile source must be text");
  }

  const lines = source.replaceAll("\r\n", "\n").split("\n");
  const importerSectionIndexes = lines.flatMap((line, index) =>
    line === "importers:" ? [index] : [],
  );
  if (importerSectionIndexes.length !== 1) {
    throw new Error("pnpm lockfile must contain exactly one top-level importers section");
  }

  const importers = [];
  for (let index = importerSectionIndexes[0] + 1; index < lines.length; index += 1) {
    const line = lines[index];
    if (line.trim().length === 0) continue;
    if (!line.startsWith(" ")) break;
    if (!line.startsWith("  ") || line.startsWith("   ")) continue;

    const match = line.match(/^  (.+):\s*$/);
    if (!match) {
      throw new Error(`invalid top-level pnpm importer declaration: ${line}`);
    }

    let importer = match[1];
    if (
      (importer.startsWith('"') && importer.endsWith('"')) ||
      (importer.startsWith("'") && importer.endsWith("'"))
    ) {
      importer = importer.slice(1, -1);
    }
    importers.push(importer);
  }

  if (importers.length === 0) {
    throw new Error("pnpm lockfile importers section must not be empty");
  }
  return importers;
}
