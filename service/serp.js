'use strict';

const serp = require('serp');
const colors = require('colors');
const Parser = require('../lib/parser');
const config = require('../conf/config');

class SerpService {

    /**
     * @param answers
     */
    search(answers = {}, options = {}) {
        answers = {...config, ...answers};
        if(typeof answers.kws === 'undefined') {
            answers['kws'] = [];
        }

        answers.locale = !answers.locale ? (!config.locale ? 'int' : config.locale) : answers.locale;
        answers.kws.push(answers.kw);
        answers.kws = [...new Set(answers.kws)];

        answers.kws.forEach((kw) => {
            if(typeof kw !== 'undefined') {
                answers.kw = kw;
                serp.search(new Parser().getOptions(answers))
                    .then(links => this.match(links, answers, options))
                    .catch(error => console.log(error));
            }
        });
    }

    /**
     * @param links
     * @param answers
     */
    match(links, answers, options = {}) {
        let counter = 0;
        if(typeof options.csv === 'undefined'){
            console.log(`KW: ${answers.kw}`);
            console.log('-'.repeat(answers.kw.length + 4));

            links.forEach((item) => {
                counter++;
                if(item.url.includes(answers.target)) {
                    console.log(`[ ${counter} ]`, colors.magenta(item.title) + ' - ' + colors.blue(item.url));
                }
            });
        }else{
            links.forEach((item) => {
                counter++;
                if(item.url.includes(answers.target)) {
                    console.log(`${answers.kw},${answers.target},${item.title},${item.url},${counter}`);
                }
            });
        }

    }

}

module.exports = SerpService;