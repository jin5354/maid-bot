/*
 * @Filename: index.js
 * @Author: jin
 * @Email: xiaoyanjinx@gmail.com
 * @Last Modified time: 2017-08-22 10:18:42
 */

import express from 'express'
import bodyParser from 'body-parser'
import multer from 'multer'
import {Wechaty, Room, Contact} from 'wechaty'
import QrcodeTerminal from 'qrcode-terminal'

let app = express()
let upload = multer()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/sendAlertMessage', upload.array(), function (req, res) {
  console.log(req.body)
  res.send('Hello World')
})

app.listen(9000)

Wechaty.instance() // Singleton
  .on('scan', (url, code) => {
    if (!/201|200/.test(String(code))) {
      const loginUrl = url.replace(/\/qrcode\//, '/l/')
      QrcodeTerminal.generate(loginUrl)
    }
    console.log(`${url}\n[${code}] Scan QR Code in above url to login: `)
  })
  .on('login', (user) => {
    console.log(`User ${user} logined`)
    Room.find({topic: /@zju$/}).then((room) => {
      console.log('find room @zju')
    })
  })
  .on('message', (message) => {
    const room    = message.room()
    const sender  = message.from()
    const content = message.content()

    console.log(sender)
    console.log(content)

    if(!message.self()) {
      //room.say(JSON.stringify(sender.obj))
      //room.say('content:' + content)
    }
  })
  .init()
