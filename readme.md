# maid_bot

## run

```bash
$ git clone https://github.com/jin5354/maid-bot.git
$ cd maid_bot
$ npm i
$ docker run -ti -p9000:9000 --rm --volume="$(pwd)":/bot zixia/wechaty index.js
```

## interface

POST /sendAlertMessage

send alert message to 前端H5 room

```json
{
  "html": "测试文本",
  "link": "测试link"
}
```

POST /sendTestMessage

send test message to jin

```json
{
  "text": "测试文本"
}
```