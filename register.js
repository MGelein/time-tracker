#!/usr/bin/env node
const { nearestQuarter, timeToFloat, getTimeDifference } = require('./lib/time');
const { header, showHelp, showErrorAndAbort } = require('./lib/text');
const { blue, purple, bold } = require('./lib/ansi');
const projectsFile = require('./lib/projects');

if (process.argv.length < 3) {
    showHelp();
}

const command = process.argv.splice(2, process.argv.length - 2).join(" ");
const [timeString, commandName] = findAndReplaceTime(command);

switch (commandName.toLowerCase()) {
    case 'start':
    case '--start':
    case '-s':
        startNewDay(timeString);
        break;
    case 'undo':
    case '--undo':
    case '-u':
        undoLast();
        break;
    case 'previous':
    case '--previous':
    case '-p':
        printPrevious();
        break;
    case 'list':
    case '--list':
    case '-l':
    case 'ls':
    case '-ls':
        printList();
        break;
    case 'calculate':
    case '--calculate':
    case '-c':
    case 'output':
    case '--output':
    case '-o':
        generateCalculation();
        break;
    case 'help':
    case '--help':
    case '-h':
    case '?':
        showHelp();
        break;
    default:
        registerProject(commandName, timeString)
}

function printList() {
    const projects = projectsFile.load();
    console.log(header("List"));
    const lines = projects.map(({ name, time }, i) => {
        if (i !== 0) return `Worked on ${blue(name)} until ${purple(time)}`;
        return `${blue('Started')} the day at ${purple(time)}`;
    });
    console.log(lines.join('\n'));
}

function printPrevious() {
    const projects = projectsFile.load();
    const { name, time } = projects[projects.length - 1];
    console.log(header("Last"));
    console.log(`Worked on ${blue(name)} until ${purple(time)}`);
}

function undoLast() {
    const projects = projectsFile.load();
    if (projects.length < 1) showErrorAndAbort('No project entries to undo');
    const { name, time } = projects[projects.length - 1];
    projects.splice(projects.length - 1);

    console.log(header("Undo"));
    console.log(`Removed entry of ${blue(name)} with end time ${purple(time)}`);
    projectsFile.save(projects);
}

function generateCalculation() {
    const projects = projectsFile.load();
    const projectRegistry = {};
    for (let i = 1; i < projects.length; i++) {
        const project = projects[i];
        const prevProject = projects[i - 1];
        const timeSpent = getTimeDifference(prevProject.time, project.time);

        if (projectRegistry[project.name]) projectRegistry[project.name] += timeSpent;
        else projectRegistry[project.name] = timeSpent;
    }
    prettyPrintProjectRegistry(projectRegistry);
}

function prettyPrintProjectRegistry(registry) {
    const projectNames = Object.keys(registry);
    projectNames.sort((nameA, nameB) => registry[nameB] - registry[nameA]);
    const lines = projectNames.map(name => `${bold(purple(registry[name] + 'h'))}\t${blue(name)}`);

    console.log(header("Overview"))
    console.log(lines.join('\n'));
}

function logNewEntry({ name, time }) {
    console.log(`Worked on ${blue(name)} until ${purple(time)}`);
}

function startNewDay(timeString) {
    const newEntry = projectsFile.create(timeString, 'start');

    console.log(`${blue('Started')} the day at ${purple(timeString)}`);
    projectsFile.save([newEntry]);
}

function registerProject(name, timeString) {
    const newEntry = projectsFile.create(timeString, name);
    const existingProjects = projectsFile.load();
    if (existingProjects.length < 1) showErrorAndAbort(`No existing projects, please start the day first by running: ${blue('register start')}`);

    const previousProject = existingProjects[existingProjects.length - 1];
    const timePassed = getTimeDifference(previousProject.time, newEntry.time);
    if (timePassed <= 0) showErrorAndAbort(`Registered time ${newEntry.time} is not after previously registered time ${previousProject.time}`);

    logNewEntry(newEntry);
    projectsFile.save([...existingProjects, newEntry]);
}

function findAndReplaceTime(inputString) {
    const timeRegex = /\d+:\d\d/g;
    const times = inputString.match(timeRegex);
    const otherParts = inputString.replace(timeRegex, '').trim();
    if (!times) return [nearestQuarter(), otherParts];
    if (times.length > 1) showErrorAndAbort(`You can not supply more than one time. Found: ${bold(times.join(', '))}`);

    timeToFloat(times[0])
    return [times[0], otherParts];
}
