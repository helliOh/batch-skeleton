const execSync = require('child_process').execSync;
const path = require('path');

const clc = require('cli-color');
const sequelize = require('../models').sequelize;

module.exports = async function handleEnv(){
    console.log(`Environment Handler :: handling environment...`);

    const { FORCE, SEED } = process.env;

    if(FORCE && (FORCE == 'true')) await syncDatabase();
    if(SEED && (SEED == 'true')) await seeder();
    
    if((FORCE && (FORCE == 'true')) || (SEED && (SEED == 'true'))){
        console.log('App will exit in 5 seconds...');
        setTimeout(() => process.exit(), 5000);
    }

    console.log(`App running on ${process.env.NODE_ENV == 'production' ? clc.yellow('production') : clc.green('development')} mode`);   
}

async function syncDatabase(){
    console.log(`Synchronizing with database...`);

    try{
        console.log(`\tDropping Database...`)
        console.log(`\t\t${clc.yellow('sequelize db:drop')}`)
        execSync(`sequelize db:drop --config ${path.join(__dirname, '../config/config.json')}`);

        console.log(`\tDropping database ${clc.green('success')}`)
    }
    catch(e){
        console.log(`\tDropping database ${clc.red('failed')}`);
        console.log('please retry the sync');
        process.exit();
    }
    
    console.log(`\tCreating Database...`)

    try{
        console.log(`\t\t${clc.yellow('sequelize db:create')}`)
        execSync(`sequelize db:create --config ${path.join(__dirname, '../config/config.json')}`);
        console.log(`\tCreating database ${clc.green('success')}`)
    }
    catch(e){
        console.log(`\tCreating database ${clc.red('failed')}`)
        console.log('please retry the sync');
        process.exit();
    }
    
    await sequelize.sync({force:true});

    console.log(`Synchronized with database ${clc.green('success')}`);
}

async function seeder(){
    console.log(`Creating seed database...`);

    const models = [
        'BatchStatus', 'Batch'
    ];

    const command = `sequelize db:seed --seeders-path ${path.join(__dirname, '../seeders')} --seed `;
    const argv = models.reduce((acc, cur) => `${acc} ${cur}`);
    console.log(`\t${clc.yellow(command + ' ' + argv)}`)

    try{
        execSync(`${command} ${argv} --config ${path.join(__dirname, '../config/config.json')}`);
        console.log(`\tCreating seed database ${clc.green('success')}`)
    }
    catch(e){
        console.log(`\tCreating seed database ${clc.red('failed')}`)
        console.log('please retry the sync');
        process.exit();
    }

    console.log(`Creating seed database...`);
}



