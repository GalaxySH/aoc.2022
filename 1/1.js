import fs from "fs";
import path from "path";
import url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const input = fs.readFileSync(path.join(__dirname + "/i.txt"), "utf8");

const carriers = input.split("\n\n");
const carriersCalories = carriers.map((c) => {
    const f = c.trim().split("\n").map(i => parseInt(i.trim()));
    return f.reduce((prev, curr) => prev += curr);
});

const carriersSorted = carriersCalories.sort((a,b) => a > b ? -1 : 1);

console.log(`Top elf: ${carriersSorted[0]}\nTop three elves: ${carriersSorted.slice(0,3).reduce((p, c) => p + c, 0)}`);
