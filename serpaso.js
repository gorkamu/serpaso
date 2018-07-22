#!/usr/bin/env node

const serpaso = require('commander');
const { prompt } = require('inquirer');
const Serp = require('./service/serp');
const questions = require('./lib/questions');
const config = require('./conf/config');

let answers = {}, options = {}, serp = new Serp();

serpaso.version('0.1.0')
    .option('-kw, --keyword <keyword>', 'Add keyword')
    .option('-t, --target <target>', 'Add target')
    .option('-l, --locale <locale>', 'Add locale')
    .option('-csv, --csv', 'CSV output')
    .parse(process.argv);

if(serpaso.csv) options.csv = true;

if(!serpaso.keyword && !serpaso.target){
    if(typeof config.kws === 'undefined' && typeof config.target === 'undefined') {
        prompt(questions).then(answers => {
            serp.search(answers);
        })
    }else{
        serp.search({}, options);
    }
}else{
    if(serpaso.keyword && !serpaso.target && typeof config.target === 'undefined') {
        console.log('No target given!');
        process.exit(1);
    }

    if(serpaso.keyword && !serpaso.target && typeof config.target !== 'undefined') {
        answers.kw = serpaso.keyword;
    }

    if(serpaso.keyword && serpaso.target) {
        answers.kw = serpaso.keyword;
        answers.target = serpaso.target;
    }

    if(serpaso.locale) answers.locale = serpaso.locale;

    serp.search(answers, options);
}

