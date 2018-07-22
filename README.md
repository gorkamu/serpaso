# WooSerp

A node cli program to check serp ranking of your keywords.

## How to install it
You'll need last version of node and NPM first. 
Then you should execute the install bash script
``` bash
$ sudo chmod 775 install.sh
$ ./install.sh
``` 

Then you can use the program like this
``` bash
$ wooserp
``` 

## Execution modes
This program has three distinct modes to be launched:

### Interactive mode with user
``` bash
$ wooserp
``` 

### CLI based arguments mode
``` bash
$ wooserp --keywords "how to check spam folder" --target howtocheck.com --locale en_EN
``` 
### Config file mode
You can specify the configuration needed to run the program. This configuration is available in conf/config.js

``` bash
$ cat conf/config.js
> module.exports = {
      kws: ['how to check spam folder'],
      target: 'howtocheck.com',
      locale: 'en_EN',
      proxy: 'http://83.175.238.170:53281',
      proxyList: ['http://83.175.238.170:53281', 'http://83.175.238.170:53281', 'http://83.175.238.170:53281'],
      delay: 200,
      retry: 3
  };
``` 

The options specified in configuration file will be override by the arguments mode by default 