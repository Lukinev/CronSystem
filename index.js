let cron = require('cron');
const fs = require('fs');
const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile);

let jobs = [];

async function getJobs() {
    try {
        const tasksList = await readFileAsync('tasksList.json', { encoding: 'utf8' });
        console.log('CONTENT:', tasksList);
    }
    catch (err) {
        console.log('ERROR:', err);
    }

}

jobs.push(new cron.CronJob({
    cronTime: '*/1 * * * *',
    onTick: function () {
        getJobs();
        console.log('job 1 ticked');
    },
    onComplete: function () {
        console.log('All done');
    },
    start: false,
    timeZone: 'Europe/Kiev'
}));
jobs[0].start(); // job 1 started