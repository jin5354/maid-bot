/*
 * @Filename: index.js
 * @Author: jin
 * @Email: xiaoyanjinx@gmail.com
 * @Last Modified time: 2017-08-21 21:27:07
 */

import {Wechaty} from 'wechaty'
import QrcodeTerminal from 'qrcode-terminal'

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
  })
  .on('message', (message) => {
    console.log(`Message: ${message}`)
    console.log(JSON.stringify(message))
  })
  .init()
