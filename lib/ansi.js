const ANSI_BRIGHT = '\x1b[1m';
const ANSI_RESET = '\x1b[0m';
const ANSI_FG_RED = '\x1b[31m';
const ANSI_FG_CYAN = '\x1b[36m';
const ANSI_FG_MAGENTA = '\x1b[35m';

const purple = (text) => `${ANSI_FG_MAGENTA}${text}${ANSI_RESET}`;
const bold = (text) => `${ANSI_BRIGHT}${text}${ANSI_RESET}`;
const blue = (text) => `${ANSI_FG_CYAN}${text}${ANSI_RESET}`;
const red = (text) => `${ANSI_FG_RED}${text}${ANSI_RESET}`;

module.exports = { purple, bold, blue, red }