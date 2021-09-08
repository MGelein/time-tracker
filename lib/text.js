const { bold, red, blue, purple } = require("./ansi");

function header(text) {
  const centerLine = `| ${bold(text)} |`;
  const topAndBottom = "=".repeat(text.length + 4);
  return [topAndBottom, centerLine, topAndBottom].join("\n");
}

function showErrorAndAbort(error) {
  console.log(header("ERROR"));
  console.log(`${red(error)}`);
  process.exit();
}

function showHelp() {
  console.log(`${header("Register - Track your time")}

Using this application, you can track your time in a global register. In this help menu,
all ${blue("keywords")} are ${blue("blue")}, all ${purple("user-defined values")} are ${purple(
    "purle"
  )}. Times are expected in ${bold("HH:MM")}.
 
register ${blue("start|-s")} ${purple("[TIME?]")}       starts a new day at an optional time, otherwise 
                                rounds to nearest quarter. Completely wipes the 
                                previous register.

register ${purple("[NAME] [TIME?]")}         adds the end time of a project to the register. 
                                Optionally add end time, to overwrite rounding to 
                                nearest quarter.

register ${blue("output|-o|calculate|-c")} calculates an overview of the hours you have made so
                                far for each project.

register ${blue("previous|-p")}            shows the last entry you made into the registry.

register ${blue("undo|-u")}                removes the last entry you made into the registry.

register ${blue("list|ls|-l")}             lists all entries you have made into your register.

register ${blue("help|?|-h")}              displays this menu.
        
`);
  process.exit();
}

module.exports = { showErrorAndAbort, showHelp, header };
