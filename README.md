# Time-tracker | Register | Hour tracker
Whatever you want to call it, it is a small command line utility written in NodeJS. Probably useless to most people 
who do not need to track hours (or who use normal software for this).

# Usage
Using this application, you can track your time in a global register. In this help menu,
all keywords are blue, all user-defined values are purle. Times are expected in ${bold('HH:MM.
 
```register start|-s [TIME?]```       
starts a new day at an optional time, otherwise 
rounds to nearest quarter. Completely wipes the 
previous register.

```register [NAME] [TIME?]```        
adds the end time of a project to the register. 
Optionally add end time, to overwrite rounding to 
nearest quarter.

```register output|-o|calculate|-c```
calculates an overview of the hours you have made so
far for each project.

```register previous|-p```
shows the last entry you made into the registry.

```register undo|-u```
removes the last entry you made into the registry.

```register list|ls|-l```
lists all entries you have made into your register.
  