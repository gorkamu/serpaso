#!/usr/bin/env node

const woo = require('commander');
const { prompt } = require('inquirer');
const wooSerp = require('./service/serp_service');
const questions = require('./lib/questions');
const config = require('./conf/config');
let answers = {}, options = {};

woo.version('0.1.0')
    .option('-kw, --keyword <keyword>', 'Add keyword')
    .option('-t, --target <target>', 'Add target')
    .option('-l, --locale <locale>', 'Add locale')
    .option('-csv, --csv', 'CSV output')
    .parse(process.argv);

if(woo.csv) options.csv = true;

if(!woo.keyword && !woo.target){
    if(typeof config.kws === 'undefined' && typeof config.target === 'undefined') {
        prompt(questions).then(answers => {
            new wooSerp().search(answers, options);
            process.exit(1);
        })
    }else{
        new wooSerp().search({}, options);
    }
}else{
    if(woo.keyword && !woo.target && typeof config.target === 'undefined') {
        console.log('No target given!');
        process.exit(1);
    }

    if(woo.keyword && !woo.target && typeof config.target !== 'undefined') {
        answers.kw = woo.keyword;
    }

    if(woo.keyword && woo.target) {
        answers.kw = woo.keyword;
        answers.target = woo.target;
    }

    if(woo.locale) answers.locale = woo.locale;

    new wooSerp().search(answers, options);
}

