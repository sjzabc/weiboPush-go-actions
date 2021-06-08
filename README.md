# weiboPush-go-actions
微博热搜(热、爆，新)标签推送微信

##  现在我的action只开启 类型为 爆 的热搜, 类型为 `热`的太多了，推送频繁

打开链接，直接关注即可。
[wxpusher.zjiecode.com/api/qrcode/HTbI3AuUOlmzEpJFjKlXnuiEZyWllP2DEuLGMh6tFOlVXVS351BSXzbHMO07QC1w.jpg](http://wxpusher.zjiecode.com/api/qrcode/HTbI3AuUOlmzEpJFjKlXnuiEZyWllP2DEuLGMh6tFOlVXVS351BSXzbHMO07QC1w.jpg)

二维码：

<img src="https://wxpusher.zjiecode.com/api/qrcode/HTbI3AuUOlmzEpJFjKlXnuiEZyWllP2DEuLGMh6tFOlVXVS351BSXzbHMO07QC1w.jpg"
 width="200px" />


## 用途

定时读取微博热搜，将爆文热搜第一时间推送到微信，前排吃瓜。


## 教程

### 觉得教程麻烦可以直接提 issue ,看到后会添加你的 Uid

1. fork项目

2. 创建应用，用来推送消息

```html
https://wxpusher.zjiecode.com/admin/main
```
得到APP_TOKEN,UID

3. 修改定时器

.github/workflows/push_bao.yml 修改corn表达式

```yml
  schedule:
    # 每60分钟执行一次
    - cron:  '*/60 * * * *'
```
cron表达测试 ：https://crontab.guru

4. 配置APP_TOKEN,UID(多个uid请用,拼接),TAG(填写 爆或者 热 或者 新)

Settings--> secrets
![image.png](https://i.loli.net/2021/04/03/TNM2a8OSGXp6Z1F.png)

![image.png](https://i.loli.net/2021/04/03/yEPU5kdWz8RMecY.png)

5. 查看收到的消息

![image.png](https://i.loli.net/2021/04/16/jYKTorZRBfmkghD.png)

