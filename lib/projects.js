const { writeFileSync, readFileSync, existsSync } = require("fs");
const { dirname, sep } = require("path");

const INSTALL_DIR = dirname(process.argv[1]);
const FILE = [INSTALL_DIR, "hours.txt"].join(sep);

const convertToString = (entry) => `${entry.time}\t${entry.name}`;

const create = (time, name) => ({ time, name });

function save(projects) {
  const lines = projects.map((project) => convertToString(project));
  writeFileSync(FILE, lines.join("\n"));
}

function load() {
  if (!existsSync(FILE)) return [];
  const dataString = readFileSync(FILE, { encoding: "utf8" }).replace(/\s\s\s+/g, "\t");
  const dataLines = dataString.split(/\r?\n/);
  const entries = dataLines.map((line) => {
    const [time, name] = line.split("\t");
    return { time, name };
  });
  const projects = entries.filter((entry) => entry.time.length > 0 && entry.name);
  return projects;
}

module.exports = { save, load, create, convertToString };
