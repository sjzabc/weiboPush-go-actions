const puppeteer = require('puppeteer');
//linux设置
// const puppeteer = require('puppeteer-core');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const https = require('https')
const schedule = require('node-schedule');

let adapter = new FileSync('db.json',{
        serialize: (data) => JSON.stringify(data),
        deserialize: (data) => JSON.parse(data)
});
let db = low(adapter);
db.defaults({orderRecord: '', count: 30 }).write();



(async () => {
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
        let tempOrderRecord = db.get("orderRecord").value();
        console.log("tempRe"+tempOrderRecord)
        //最新内容不等于缓存的内容，发送消息到微信，更新json数据库
        if (content != tempOrderRecord ) {


                 console.log("发送"+content)
                    // //发送
                    // const data = JSON.stringify({
                    //     //在https://wxpusher.zjiecode.com/申请
                    //     "appToken":"",
                    //     "content": content,
                    //     "summary":"马斯克的推特",
                    //     "contentType":1,
                    //     "topicIds":[
                    //         2052
                    //     ],
                    //     "url":"https://v.gojw.xyz"
                    // })
                    // const options = {
                    //     hostname: 'wxpusher.zjiecode.com',
                    //     path:'/api/send/message',
                    //     method: 'POST',
                    //     headers: {
                    //         'Content-Type': 'application/json'
                    //     }
                    // }
                    //
                    // const req = https.request(options, res => {
                    //     console.log(`状态码: ${res.statusCode}`)
                    //
                    //     res.on('data', d => {
                    //         process.stdout.write(d)
                    //     })
                    // })
                    // req.on('error', error => {
                    //     console.error(error)
                    // })
                    // req.write(data)
                    // req.end()
            //更新缓存
                console.log("更新"+content)
            db.set("orderRecord",content).write()

             db.update("count", n => n + 1).write();
        }else {
            console.log("无需发送")
        }
        await browser.close();



})();
