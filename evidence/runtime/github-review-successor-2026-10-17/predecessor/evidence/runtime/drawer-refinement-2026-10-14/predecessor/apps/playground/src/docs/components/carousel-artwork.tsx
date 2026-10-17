// Local media fixture copied from apps/prototype/src/carousel-study/Artwork.tsx.
// Original decorative cover illustrations for the accepted v0.4 study, not UI icons.
// Fixed paper / pigment colors belong to the artwork; Rain blue remains token-owned.
const blue = "var(--rain-category-fill-brand-solid-1)";
const paper = "#F7F3E9";
const ink = "#233E48";
const clay = "#C76543";
const ochre = "#D9AA4F";
const green = "#386759";

function Geometry() {
  return <>
    <rect width="600" height="360" fill="#EBE8DF" />
    <path d="M0 280H600M100 0V360M200 0V360M300 0V360M400 0V360M500 0V360" stroke="#D4D1C7" strokeWidth="1" />
    <circle cx="353" cy="133" r="95" fill={ochre} />
    <path d="M126 286V179C126 132 164 94 211 94C258 94 296 132 296 179V286Z" fill={blue} />
    <path d="M164 286V181C164 155 185 134 211 134C237 134 258 155 258 181V286Z" fill={paper} />
    <path d="M276 286L381 111L486 286Z" fill={clay} />
    <path d="M315 286L381 177L447 286Z" fill="#E9BDA1" />
    <circle cx="350" cy="255" r="55" fill={ink} />
    <circle cx="350" cy="255" r="22" fill={paper} />
    <path d="M91 309H511M69 68H114M91 46V90" stroke={ink} strokeWidth="2" />
    <path d="M463 52V104M450 65H502M476 78V130M463 91H515" stroke={ink} strokeWidth="1.5" opacity=".6" />
    <circle cx="509" cy="269" r="7" fill={blue} />
    <circle cx="509" cy="291" r="7" fill={blue} />
    <circle cx="509" cy="313" r="7" fill={blue} />
  </>;
}

function Evidence() {
  return <>
    <rect width="600" height="360" fill="#E8EDF0" />
    <path d="M55 56H551M55 118H551M55 180H551M55 242H551M55 304H551M117 30V330M179 30V330M241 30V330M303 30V330M365 30V330M427 30V330M489 30V330" stroke="#C9D4DB" strokeWidth="1" />
    <path d="M122 242L220 166L322 204L413 112L502 155" fill="none" stroke={blue} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M122 242L220 166L322 204L413 112L502 155V304H122Z" fill={blue} opacity=".07" />
    <g transform="rotate(-7 245 164)">
      <rect x="142" y="72" width="212" height="205" rx="4" fill="#BBCBD3" transform="translate(9 10)" />
      <rect x="142" y="72" width="212" height="205" rx="4" fill={paper} />
      <path d="M164 98H239M164 113H215" stroke={ink} strokeWidth="3" />
      <path d="M164 145H329M164 181H329M164 217H329M164 253H329" stroke="#D9DDD7" strokeWidth="1.5" />
      <rect x="174" y="215" width="24" height="37" fill="#91AAB7" />
      <rect x="216" y="188" width="24" height="64" fill="#91AAB7" />
      <rect x="258" y="165" width="24" height="87" fill={blue} />
      <rect x="300" y="133" width="24" height="119" fill={clay} />
    </g>
    <circle cx="401" cy="193" r="61" fill={paper} stroke={ink} strokeWidth="8" />
    <path d="M442 238L487 284" stroke={ink} strokeWidth="15" strokeLinecap="round" />
    <path d="M363 207L387 183L406 202L439 169" fill="none" stroke={blue} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="387" cy="183" r="6" fill={clay} />
    <circle cx="406" cy="202" r="6" fill={blue} />
    <circle cx="438" cy="169" r="6" fill={blue} />
    <circle cx="100" cy="115" r="8" fill={ochre} />
    <circle cx="508" cy="81" r="16" fill={ochre} />
    <path d="M78 299H101M90 287V311" stroke={ink} strokeWidth="2" />
  </>;
}

function Ecology() {
  return <>
    <rect width="600" height="360" fill="#E8EADF" />
    <circle cx="438" cy="106" r="61" fill="#DCC586" />
    <path d="M0 285Q96 203 229 268Q361 324 600 247V360H0Z" fill="#CCD4B4" />
    <path d="M0 320Q195 260 355 302Q478 334 600 295V360H0Z" fill="#ADC3AA" />
    <ellipse cx="284" cy="318" rx="155" ry="11" fill="#8AA791" opacity=".35" />
    <path d="M286 315C278 235 291 159 312 74" fill="none" stroke={ink} strokeWidth="4" strokeLinecap="round" />
    <path d="M301 128C276 125 245 101 254 65C290 64 311 91 301 128Z" fill={green} />
    <path d="M295 158C322 156 353 133 354 97C318 96 294 120 295 158Z" fill="#739475" />
    <path d="M287 203C244 204 207 179 203 141C251 135 285 162 287 203Z" fill="#739475" />
    <path d="M287 247C328 246 370 218 374 177C325 172 289 201 287 247Z" fill={green} />
    <path d="M285 283C251 283 220 260 214 225C254 221 281 247 285 283Z" fill={green} />
    <path d="M304 115L270 82M299 144L338 115M272 190L221 155M301 232L357 193M273 270L230 238" fill="none" stroke="#D3DBC6" strokeWidth="1.5" />
    <path d="M186 314C189 277 175 237 157 209M397 316C397 285 411 256 432 235" fill="none" stroke={ink} strokeWidth="3" strokeLinecap="round" />
    <path d="M181 271C152 272 131 254 129 228C159 226 181 244 181 271Z" fill="#8BA585" />
    <path d="M182 287C212 283 227 265 226 242C197 245 181 262 182 287Z" fill={green} />
    <path d="M402 283C432 285 452 269 457 244C427 240 406 257 402 283Z" fill={green} />
    <path d="M399 300C379 294 365 278 368 258C390 260 403 277 399 300Z" fill="#8BA585" />
    <path d="M100 90C113 78 123 78 136 90M136 90C149 78 160 78 172 90" fill="none" stroke={ink} strokeWidth="2" strokeLinecap="round" />
    <circle cx="478" cy="216" r="6" fill={clay} />
    <circle cx="115" cy="192" r="4" fill={clay} />
  </>;
}

function Architecture() {
  return <>
    <rect width="600" height="360" fill="#EFE5D3" />
    <circle cx="447" cy="95" r="55" fill="#D7AE6A" />
    <path d="M30 286L238 166L570 296M93 323L301 203M169 349L377 229M44 248L361 360" fill="none" stroke="#D5C7AD" strokeWidth="1.25" />
    <path d="M124 288L269 204L490 279L347 335Z" fill="#C8B392" opacity=".55" />
    <path d="M171 127L276 68L382 127L276 188Z" fill="#E1BB8B" />
    <path d="M171 127L276 188V310L171 249Z" fill={clay} />
    <path d="M276 188L382 127V249L276 310Z" fill="#A8533B" />
    <path d="M207 143V211L243 232V164Z" fill="#E4B38F" />
    <path d="M286 216V271L311 256V202Z" fill={ink} />
    <path d="M330 190V245L354 231V176Z" fill={ink} />
    <path d="M171 127L276 188L382 127" fill="none" stroke="#F0D5B0" strokeWidth="2" />
    <path d="M213 102L276 67L339 102L276 139Z" fill={paper} />
    <path d="M251 53L276 39L301 53L276 68Z" fill={paper} />
    <path d="M251 53V113L276 128V68Z" fill="#E0CEAF" />
    <path d="M276 68V128L301 113V53Z" fill="#BDA482" />
    <path d="M127 278L185 245L233 273L175 307Z" fill="#B9C2B5" />
    <path d="M127 278V300L175 328V307Z" fill={green} />
    <path d="M175 307L233 273V295L175 328Z" fill="#294E45" />
    <path d="M387 273V219M433 294V240" stroke={ink} strokeWidth="4" />
    <ellipse cx="387" cy="217" rx="25" ry="38" fill={green} />
    <ellipse cx="433" cy="239" rx="22" ry="33" fill="#6F8A6B" />
    <path d="M86 122H124M105 103V141" stroke={ink} strokeWidth="1.5" />
    <path d="M474 187H520M474 198H503" stroke="#B59D79" strokeWidth="2" />
  </>;
}

export function Artwork({ kind = 0 }: { kind?: number }) {
  const variant = kind % 4;
  return <svg aria-hidden="true" focusable="false" viewBox="0 0 600 360"
    preserveAspectRatio="xMidYMid slice" style={{ display: "block", width: "100%", height: "100%" }}>
    {variant === 0 ? <Geometry /> : variant === 1 ? <Evidence /> : variant === 2 ? <Ecology /> : <Architecture />}
  </svg>;
}
