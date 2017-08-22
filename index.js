/*
 * @Filename: index.js
 * @Author: jin
 * @Email: xiaoyanjinx@gmail.com
 * @Last Modified time: 2017-08-22 17:31:32
 */

import express from 'express'
import bodyParser from 'body-parser'
import multer from 'multer'
import {Wechaty, Room, Contact} from 'wechaty'
import QrcodeTerminal from 'qrcode-terminal'

let concact
let h5room

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
    Room.find({topic: /前端H5/}).then((room) => {
      console.log('find room 前端H5')
      h5room = room
    })
    Contact.find({name: 'jin'}).then((target) => {
      console.log(JSON.stringify(target))
      concact = target
    })
  })
  .on('message', (message) => {
    // const room    = message.room()
    // const sender  = message.from()
    // const content = message.content()

    //console.log(sender)
    //console.log(content)

    if(!message.self()) {
      //concact.say(content)
    }
  })
  .init()

let app = express()
let upload = multer()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.post('/sendAlertMessage', upload.array(), (req, res) => {
  res.send(req.body)
  if(h5room) {
    h5room.say(req.body.html)
    h5room.say(req.body.link)
  }
})

app.post('/sendTestMessage', upload.array(), (req, res) => {
  res.send(req.body)
  if(concact) {
    h5room.say(req.body.text)
  }
})

app.listen(9000)
