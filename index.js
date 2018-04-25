let cron = require('cron');
const fs = require('fs');
const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile);
let jobs = [];

async function fnc() {
    let arr = [];
    try {
        let tasksArray = JSON.parse(await readFileAsync('tasksList.json', { encoding: 'utf8' })).tasksList;
        for (let index = 0; index < tasksArray.length; index++) {
            arr.push(new cron.CronJob({
                cronTime: '*/1 * * * * ',
                onTick: function () {

                    console.log('job ticked');
                },
                onComplete: function () {
                    console.log('All done');
                },
                start: false,
                timeZone: 'Europe/Kiev'
            }));
        }        
        return arr;
    }
    catch (err) {
        console.log('ERROR:', err);
    }
};

jobs = fnc();


for (let index = 0; index < jobs.length; index++) {
    jobs[index].start();
}
