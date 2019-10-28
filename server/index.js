const express = require('express') // 引入express
// const Mock = require('mockjs')  // 引入mock
const app = express()  // 实例化express

app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild')
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
  if (req.method == 'OPTIONS') {
    res.send(200)
  }
  else {
    next()
  }
})

app.use('/test', function (req, res) {
  res.json({test: 'test'})
  // res.json(Mock.mock({
  //   'return_code': 0,
  //   'data': {
  //     // id_card: '320382199003078573',
  //     // name: '司机测试'
  //     id_card: '320382199003078572',
  //     name: '司机测试'
  //   }
  // }))
})

app.listen('8081', () => {
  console.log('监听端口 8089')
})