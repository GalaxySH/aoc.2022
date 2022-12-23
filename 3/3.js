import fs from "fs";
import path from "path";
import url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const input = fs.readFileSync(path.join(__dirname + "/i"), "utf8").trim();

function getPriority(c) {
    if (typeof c !== "string") return 0;
    if (/[A-Z]/.test(c)) {
        return c.charCodeAt() - 38;
    }
    return c.charCodeAt() - 96;
}

const sacks = input.split("\n");

const dupes = sacks/* .slice(0, 5) */
    .map(s => [s.slice(0, s.length / 2), s.slice(s.length / 2, s.length)])
    .map((s/* , ind */) => {
    let dupe = "";
    for (let i = 0; i < s[0].length; i++) {
        const c = s[0][i];
        if (s[1].includes(c)) {
            dupe = c;
            // console.log(`found ${dupe} ${ind}`);
            break;
        }
    }
    return dupe;
});

const priorities = dupes.map(c => getPriority(c));

const total = priorities.reduce((p, c) => p + c);

const groups = [];
while (sacks.length) {// for some reason while loop sacks.length / 3 didn't work here /shrug
    groups.push(sacks.splice(0, 3));
}
console.log(groups.length)
const groupIds = groups.map(g => {
    let b = "";
    for (let i = 0; i < g[0].length; i++) {
        const c = g[0][i];
        if (g[1].includes(c) && g[2].includes(c)) {
            b = c;
            break;
        }
    }
    return b;
});
const groupPriorities = groupIds.map(b => getPriority(b));
const total2 = groupPriorities.reduce((p,c) => p + c);

// 7826
console.log(`Total: ${total} Total 2: ${total2}`);
