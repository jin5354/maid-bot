/*
 * @Filename: index.js
 * @Author: jin
 * @Email: xiaoyanjinx@gmail.com
 * @Last Modified time: 2017-08-22 15:09:30
 */

import express from 'express'
import bodyParser from 'body-parser'
import multer from 'multer'
import {Wechaty, Room, Contact} from 'wechaty'
import QrcodeTerminal from 'qrcode-terminal'

let concact

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
    Contact.find({name: 'jin'}).then((target) => {
      console.log(JSON.stringify(target))
      concact = target
    })
  })
  .on('message', (message) => {
    const room    = message.room()
    const sender  = message.from()
    const content = message.content()

    console.log(sender)
    console.log(content)

    if(!message.self() && concact) {
      //concact.say(content)
    }
  })
  .init()

let app = express()
let upload = multer()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/sendAlertMessage', upload.array(), function (req, res) {
  console.log(req.body)
  res.send(req.body)
  if(concact) {
    concact.say(JSON.stringify(req.body))
    concact.say(req.body.html)
  }
})

app.listen(9000)