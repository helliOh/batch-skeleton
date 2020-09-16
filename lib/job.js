const { fork } = require('child_process');
const clc = require('cli-color')

class Job{
    constructor(path, options={}){
        this.path = path;
        this.name = options.name || 'ANONYM';
        this.buffer = [];
        this.running = false;
        this.error = false;
    }

    run(){
        const child = fork(this.path, {
            stdio : [null, 'pipe', 'pipe', 'ipc']
        })
        .on('message', (msg) =>{
            if(msg.data.done){
                const log = this.buffer
                .map((line) => {
                    let str = line.toString();
                    str = `[${clc.blue(this.name)}]\t` + str;
                    return str.toString().replace(/\n/g, '');
                })
                .reduce((acc, cur) => `${acc}\n${cur}`);

                this.buffer = [];
                console.log(log);
            }
        })
        .on('exit', (code) =>{
            
            this.running = false;
            if(code != 0){
                var log = this.buffer
                .map((line) => line.toString());

                log = log.length > 0 ? log.reduce((acc, cur) => `${acc}\n${cur}`) : 'No log available';
                console.log(`[${clc.blue(this.name)}]\t${clc.red('Error')}\n${log}`);
            }
            else{
                var log = this.buffer
                .map((line) => line.toString());

                log = log.length > 0 ? log.reduce((acc, cur) => `${acc}\n${cur}`) : 'No log available';
                console.log(`[${clc.blue(this.name)}]\t${clc.red('Exit')}\n${log}`);
            }
        })

        child.stdout.on('data', (chunk, encoding, next) =>{
            this.buffer.push(chunk);
        });

        child.stderr.on('data', (chunk, encoding, next) =>{
            this.buffer.push(chunk);
        });

        this.running = true;
        console.log(`[${clc.blue(this.name)}]\t${clc.green('Start running...')}\tPATH(${clc.greenBright(this.path)})`);
    }

}

function exitHandler(){
    process.on('exit', (code) =>{
        process.send({
            type : 'exit',
            data : {
                code : code
            }
        });
    })
}

function start(){
    const startStamp = new Date();
    const sdate = startStamp.getFullYear() + '-' + (startStamp.getMonth() + 1) + '-' + startStamp.getDate();
    const stime = startStamp.getHours() + ":" + startStamp.getMinutes() + ":" + startStamp.getSeconds();
    const sdatetime = sdate + ' ' + stime;
    console.log(`[${clc.yellow(sdatetime)}]\tBatch started`);
}

function done(){
    const endStamp = new Date();
    const edate = endStamp.getFullYear() + '-' + (endStamp.getMonth() + 1) + '-' + endStamp.getDate();
    const etime = endStamp.getHours() + ":" + endStamp.getMinutes() + ":" + endStamp.getSeconds();
    const edatetime = edate + ' ' + etime;
    console.log(`[${clc.yellow(edatetime)}]\tBatch ended`);

    process.send({
        type : 'message',
        data : {
            done : true
        }
    })
}

module.exports.Job = Job;
module.exports.exitHandler = exitHandler;
module.exports.ctx = {
    start : start,
    done : done
}

