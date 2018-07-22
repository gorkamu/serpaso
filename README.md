# 🔥 🔥 Serpaso SERP Rank Checker

A node cli program to check serp ranking of your keywords.
This program is based in [this one](https://github.com/christophebe/serp)
.

## How to install it
You'll need the last version of node and NPM first. 
Then you can execute the install bash script:
``` bash
$ sudo chmod 775 install.sh 
$ ./install.sh
``` 

This bash script will install the following depedencies:
 - colors: "^1.3.0"
 - commander: "^2.16.0
 - inquirer: "^6.0.0"
 - request: "^2.87.0"
 - serp: "^2.0.2"
 - simple-proxies: "^0.1.12"
 - yarn: "^1.7.0"
     
Dev dependencies:
 - nodemon: "^1.17.5"
 - chai: "^3.5.0"
 - mocha: "*"
 
 
And it will create the symbolic link to **/usr/local/bin**to can launch the binary globally. 

After that, you can use the program like this
``` bash
$ serpaso
``` 

## Execution modes
This program has three distinct modes to be launched:

### Interactive mode with user
``` bash
$ serpaso
>
    ? Enter keyword: how to check spam folder
    ? Enter target: howtocheck.com
    ? Enter locale [int] en_EN
``` 
![Interactive mode](https://i.imgur.com/8yP4wt7.jpg)

### CLI based arguments mode
``` bash
$ serpaso --keywords "how to check spam folder" --target howtocheck.com --locale en_EN
``` 
![Arguments mode](https://i.imgur.com/y3O469H.jpg)
![Arguments mode CSV output](https://i.imgur.com/94ABzAg.jpg)


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
#### Config file options
- **kws**: Array with your keywords
- **target**: Hostname to be found 
- **locale**: Locale to be used. This option allows you specify the google domain to search in
- **proxy**: Perform the search behind a proxy
- **proxyList**: Array with your proxies. Perform the search behind a proxy. For every connection the proxy will rotate.
- **delay**: Delay miliseconds between connections
- **retry**: Number of tries to retry if connection fails

## Serpaso options
When you launch it via argument mode, you can add a --csv flag to get the output in this format.
The CSV output has the following structure:
``` bash
    <keyword>,<target>,<result_title>,<result_url>,<rank_position>
```