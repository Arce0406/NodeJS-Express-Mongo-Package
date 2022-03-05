// config/mongoose.js

// 引用 mongoose
const mongoose = require('mongoose')

const url = 'mongodb://admin:password@localhost:27017/testdb?authSource=admin';

// 連線資料庫
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

// 設定連線狀態
const db = mongoose.connection;

db.on('error', () => {
  console.log('mongodb error!')
});

db.once('open', () => {
  console.log('mongodb connected!')
});

// 匯出連線狀態設定
module.exports = db