import { createServer } from "node:http";

const files = new Map(), attempts = new Map();
let sequence = 0;
const server = createServer(async (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5471");
  response.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (request.method === "OPTIONS") { response.writeHead(204).end(); return; }
  if (request.url === "/health") { response.end("ok"); return; }
  if (request.url === "/original") { response.setHeader("Content-Type", "text/plain"); response.end("original content"); return; }
  if (request.method === "POST" && request.url === "/upload") {
    try {
      const chunks = []; let size = 0;
      for await (const chunk of request) { size += chunk.length; if (size > 5 * 1024 * 1024) { response.writeHead(413).end(); return; } chunks.push(chunk); }
      const incoming = new Request("http://127.0.0.1/upload", { method: "POST", headers: { "Content-Type": request.headers["content-type"] ?? "" }, body: Buffer.concat(chunks) });
      const file = (await incoming.formData()).get("file");
      if (!(file instanceof File)) { response.writeHead(400).end(); return; }
      const key = file.name, attempt = (attempts.get(key) ?? 0) + 1; attempts.set(key, attempt);
      if (key.includes("retry") && attempt === 1) { response.writeHead(503).end("retry fixture"); return; }
      const id = String(++sequence), bytes = Buffer.from(await file.arrayBuffer());
      // The delayed response makes the processing/cancel boundary observable.
      await new Promise(resolve => setTimeout(resolve, key.includes("slow") ? 1400 : 200));
      if (response.destroyed) return;
      files.set(id, { bytes, type: file.type });
      response.setHeader("Content-Type", "application/json");
      response.end(JSON.stringify({ remoteId: id, url: "http://127.0.0.1:5472/files/" + id }));
    } catch { if (!response.destroyed) response.writeHead(400).end("bad request"); }
    return;
  }
  const stored = files.get(request.url?.split("/").at(-1));
  if (stored && request.url?.startsWith("/files/")) { response.setHeader("Content-Type", stored.type || "application/octet-stream"); response.end(stored.bytes); return; }
  response.writeHead(404).end("missing");
});
server.listen(5472, "127.0.0.1");
process.on("SIGTERM", () => server.close());
