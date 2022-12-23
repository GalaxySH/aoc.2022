import fs from "fs";
import path from "path";
import url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const input = fs.readFileSync(path.join(__dirname + "/i"), "utf8").trim();

function outcome(p, o) {
    p = p === "X" ? 0 : p === "Y" ? 1 : 2;
    o = o === "A" ? 0 : o === "B" ? 1 : 2;
    let r = 0;
    if (p == 0 && o == 2)      r = 1;
    else if (p == 1 && o == 0) r = 1;
    else if (p == 2 && o == 1) r = 1;
    else if (p == 0 && o == 1) r = -1;
    else if (p == 1 && o == 2) r = -1;
    else if (p == 2 && o == 0) r = -1;
    
    // const d = p - o;
    // let r2 = 0;
    // if ([-1, 2].includes(d)) {
    //     r2 = -1;
    // } else if ([1, -2].includes(d)) {
    //     r2 = 1;
    // }
    // if (p !== o) {
    //     if ()
    // }
    // console.log(`R: ${r} R2: ${r2} D: ${d}`)
    return r;
}

const strategy = {
    A: {
        X: "Z",
        Y: "X",
        Z: "Y"
    },
    B: {
        X: "X",
        Y: "Y",
        Z: "Z"
    },
    C: {
        X: "Y",
        Y: "Z",
        Z: "X"
    },
}

// 1

const rounds = input.split("\n").map(r => r.split(" "));
const roundsScored = rounds/* .slice(0,20) */.map(r => {
    const o = r[0];
    const p = r[1];
    const w = outcome(p, o);
    const points = (p === "X" ? 1 : p === "Y" ? 2 : 3)
    + (w == -1 ? 0 : w == 0 ? 3 : 6);
    // console.log(`${p} ${o} ${w} ${points} ${(p === "A" ? 1 : p === "B" ? 2 : 3)} ${(w == -1 ? 0 : w == 0 ? 3 : 6)}`)
    return points;
});

const total = roundsScored.reduce((p, c) => p + c, 0);

// 2

const rounds2Scored = rounds/* .slice(0,20) */.map(r => {
    const o = r[0];
    const p = strategy[o][r[1]];
    const w = outcome(p, o);
    const points = (p === "X" ? 1 : p === "Y" ? 2 : 3)
    + (w == -1 ? 0 : w == 0 ? 3 : 6);
    // console.log(`${p} ${o} ${w} ${points} ${(p === "A" ? 1 : p === "B" ? 2 : 3)} ${(w == -1 ? 0 : w == 0 ? 3 : 6)}`)
    return points;
});

const total2 = rounds2Scored.reduce((p, c) => p + c, 0);

console.log(`Total: ${total} Total 2: ${total2}`);


