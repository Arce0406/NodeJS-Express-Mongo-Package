// 引用 mongoose 並載入 Todo model
const mongoose = require('mongoose')
const DiscordUser = require('../DiscordUser')
// 連線成功狀態設定
const db = require('../../configs/database/mongodb-connection')

db.once('open', () => { // 產生種子資料
  console.log('mongodb connected ^_^')

  async function findUsers() {
    const users = await DiscordUser.find();    
    if (users.length > 0) {
      console.log(users);  
    } else {
      console.log('add seed data.');
      DiscordUser.create({
        discordid: '123456789',
        username: 'JohnCena',
        discriminator: '6666',
        email: 'abc@mail.com'
      });
    }
  }

  findUsers().then(() => console.log('done.'));
})