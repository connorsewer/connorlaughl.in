// Blueprint pixel CL monogram -> app/icon.png, app/apple-icon.png, favicon.ico
// Pixel art, so it is encoded directly rather than rasterised through a
// browser: no antialiasing, exact cell edges at every size.
import { deflateSync } from "node:zlib";
import { writeFileSync } from "node:fs";

const BLUEPRINT = [0x2e, 0x47, 0xf1];
const GROUND = [0xfb, 0xfb, 0xfb];

// 16x16 cell grid. 1 = ground (letter), 0 = blueprint (tile).
const GRID = 16;
const C = [
  "01110",
  "10001",
  "10000",
  "10000",
  "10000",
  "10001",
  "01110",
];
const L = [
  "10000",
  "10000",
  "10000",
  "10000",
  "10000",
  "10000",
  "11111",
];

function cellMap() {
  const on = new Set();
  const place = (glyph, col0, row0) => {
    glyph.forEach((row, r) => {
      [...row].forEach((ch, c) => {
        if (ch === "1") on.add(`${col0 + c},${row0 + r}`);
      });
    });
  };
  place(C, 2, 5);
  place(L, 9, 5);
  return on;
}

function crc32(buf) {
  let c;
  const table = [];
  for (let n = 0; n < 256; n += 1) {
    c = n;
    for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c >>> 0;
  }
  let crc = 0xffffffff;
  for (const b of buf) crc = table[(crc ^ b) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, "ascii"), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
}

function png(size) {
  const on = cellMap();
  const cell = Math.floor(size / GRID);
  const content = cell * GRID;
  const pad = Math.floor((size - content) / 2);

  const raw = Buffer.alloc(size * (size * 4 + 1));
  let p = 0;
  for (let y = 0; y < size; y += 1) {
    raw[p] = 0; // no filter
    p += 1;
    const gy = Math.floor((y - pad) / cell);
    for (let x = 0; x < size; x += 1) {
      const gx = Math.floor((x - pad) / cell);
      const inside = gx >= 0 && gx < GRID && gy >= 0 && gy < GRID;
      const rgb = inside && on.has(`${gx},${gy}`) ? GROUND : BLUEPRINT;
      raw[p] = rgb[0];
      raw[p + 1] = rgb[1];
      raw[p + 2] = rgb[2];
      raw[p + 3] = 0xff;
      p += 4;
    }
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // truecolor + alpha (Next.js ICO decoding requires RGBA)
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

/** ICO container holding one PNG frame; every current browser reads this. */
function ico(pngBuf, size) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(1, 4); // one image
  const entry = Buffer.alloc(16);
  entry[0] = size === 256 ? 0 : size;
  entry[1] = size === 256 ? 0 : size;
  entry[2] = 0; // palette
  entry[3] = 0;
  entry.writeUInt16LE(1, 4); // colour planes
  entry.writeUInt16LE(32, 6); // bits per pixel
  entry.writeUInt32LE(pngBuf.length, 8);
  entry.writeUInt32LE(22, 12); // offset
  return Buffer.concat([header, entry, pngBuf]);
}

const root = process.argv[2] ?? process.cwd();
writeFileSync(`${root}/app/icon.png`, png(512));
writeFileSync(`${root}/app/apple-icon.png`, png(180));
writeFileSync(`${root}/app/favicon.ico`, ico(png(32), 32));
console.log("wrote icon.png (512), apple-icon.png (180), favicon.ico (32)");
