'use strict';

const locales = require('./locales');

class WooParser {

    /**
     * @param locale
     * @returns {string}
     */
    getHost(locale) {
        return typeof locales[locale] === 'undefined' ? 'google.com' : locales[locale];
    }

    /**
     * @param answers
     * @returns {{host: string, qs: {q: *, filter: number, pws: number}, num: number, delay: number}}
     */
    getOptions(answers) {

        let localeSplited = answers.locale.split('_');
        let options = {
            host : this.getHost(answers.locale),
            qs : {
                q : answers.kw,
                filter : 0,
                pws : 0
            },
            num : 100,
        };

        if('int' !== answers.locale) {
            options.qs.lr = `lang_${localeSplited[0]}`;
            options.qs.cr = localeSplited[1]
        }

        if(typeof answers.delay !== 'undefined') {
            options.delay = answers.delay;
        }

        if(typeof answers.retry !== 'undefined') {
            options.retry = answers.retry;
        }

        if(typeof answers.proxy !== 'undefined') {
            options.proxy = answers.proxy;
        }

        if(typeof answers.proxyList !== 'undefined') {
            options.proxyList = answers.proxyList;
        }

        if(typeof answers.retry !== 'undefined') {
            options.retry = answers.retry;
        }

        return options;
    }
}

module.exports = WooParser;