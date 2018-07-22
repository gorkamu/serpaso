
const proxyLoader = require("simple-proxies/lib/proxyfileloader");
const serp = require("../service/serp");


describe("Test Simple Search", () => {
    it("Should return links with a minimal option set", function test() {
        this.timeout(20000);
        return new serp().search({
            kw: 'bot de twitter',
            target: 'gorkamu.com'
        });
    });

    it("Should return links with a specific locale parameter", function test() {
        this.timeout(20000);
        return new serp().search({
            kw: 'bot de twitter',
            target: 'gorkamu.com',
            locale: 'es_ES'
        });
    });

});


describe.skip("Test Simple Search with proxy", () => {
    let proxyList = null;

    before(function beforeTest(done) {
        this.timeout(100000);
        const config = proxyLoader.config().setProxyFile("../conf/proxies.txt")
            .setCheckProxies(true)
            .setRemoveInvalidProxies(false);

        proxyLoader.loadProxyFile(config, (error, pl) => {
            if (error) {
                done(error);
            }
            proxyList = pl;
            console.log("proxies loaded");
            done();
        });
    });

    it("Should return results with a proxy", function test() {
        this.timeout(60000);
        return new serp().search({
            kw: 'bot de twitter',
            target: 'gorkamu.com',
            locale: 'es_ES',
            proxy: 'http://50.93.200.237:2018'
        });
    });

    it("Should return results with a proxy list", function test() {
        this.timeout(60000);
        return new serp().search({
            kw: 'bot de twitter',
            target: 'gorkamu.com',
            locale: 'es_ES',
            proxyList: proxyList
        });
    });
});
