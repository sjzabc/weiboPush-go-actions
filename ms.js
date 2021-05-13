const puppeteer = require('puppeteer');
const yargs = require('yargs');
const https = require('https')
const argv = yargs.argv;
var co = require('co');
var redis = require('redis');
var wrapper = require('co-redis');
// redis配置参数
var redis_config = {
    "host": argv.ip,
    "port": 6379,
};





(async () => {
        var redisClient = redis.createClient(redis_config);
    console.log("pass:"+argv.p)
redisClient.auth(argv.p)
redisClient.select("3", function (err) {
    if (err) {
        return false
    } else {
        console.log('connect success');
    }
})
var redisCo = wrapper(redisClient);    
        const browser = await puppeteer.launch({headless: true});
        //linux设置
        // const browser = await puppeteer.launch({ executablePath: '/usr/bin/chromium', args:["--no-sandbox"] });
        const page = await browser.newPage();
        await page.goto('https://twitter.com/elonmusk');
        await page.waitForSelector('article');
        let tweetsArray = await page.$$('div[data-testid="tweet"]');
        let tweetElement = tweetsArray[1]

        let content = await tweetElement.$$eval('div+div>div>div>span', element => element.map(data => data.innerText));
        content=content.toString()
            var orderRecord = co(function* () {
                yield redisCo.get('orderRecord');
                console.log(yield redisCo.get('orderRecord'));
                redisClient.quit();
            }).catch(function(e) {

            });;              
        console.log("tempRe"+tempOrderRecord)
        //最新内容不等于缓存的内容，发送消息到微信，更新json数据库
        if (content != orderRecord) {


                 console.log("发送"+content)
                    // //发送
//                     const data = JSON.stringify({
//                         //在https://wxpusher.zjiecode.com/申请
//                         "appToken":argv.n,
//                         "content": content,
//                         "summary":"马斯克的推特",
//                         "contentType":1,
//                         "topicIds":[
//                             2052
//                         ],
//                         "url":"https://v.gojw.xyz"
//                     })
//                     const options = {
//                         hostname: 'wxpusher.zjiecode.com',
//                         path:'/api/send/message',
//                         method: 'POST',
//                         headers: {
//                             'Content-Type': 'application/json'
//                         }
//                     }
                    
//                     const req = https.request(options, res => {
//                         console.log(`状态码: ${res.statusCode}`)
                    
//                         res.on('data', d => {
//                             process.stdout.write(d)
//                         })
//                     })
//                     req.on('error', error => {
//                         console.error(error)
//                     })
//                     req.write(data)
//                     req.end()
            //更新缓存
        console.log("更新" + content)
        co(function* () {
            yield redisCo.set('orderRecord', content);
            console.log("更新后的值" +   redisCo.get('orderRecord'));  redisClient.quit();
        }).catch(function(e) {

        });;
        }else {
            console.log("无需发送")
        }
        await browser.close();



})();
