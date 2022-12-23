import fs from "fs";
import path from "path";
import url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const input = fs.readFileSync(path.join(__dirname + "/i"), "utf8").trim();


