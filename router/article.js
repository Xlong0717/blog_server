// 文章博客列表
const express = require('express')
// 创建路由对象
const router = express.Router();

// 导入数据库操作模块
const db = require('../db/index');
router.post('/articleList',(req,res)=>{

  const sql = `select * from article`
  db.query(sql,((err,resual)=>{
    if (err) {
      return res.send({ status: 1, message: err.message })
    }else{
      return res.send({
        code:200,
        status: 1,
        msg:"成功",
        data:resual
      })
    }
  }
  ))
})

// 查文章详情
router.post('/articleDetail',(req,res)=>{

  let postData = '' // 存放客户端传来的数据
    req.on('data', chunk => {
      console.log('chunk', chunk) // 二进制格式
      postData += chunk.toString() // 将二进制格式转成字符串格式，拼接到 postData 上
  })
  console.log(postData,'postData')
  //接受前端数据
  let obj = '' ; 
   req.on('end', () => {
    // 将字符串转对象
     obj =  JSON.parse(postData) ;
    })
    // 前端数据接受完毕
    req.on('end',()=>{
      const sql = `SELECT * FROM  article_detail WHERE article_detail.detailId = ${obj.id} `
      db.query(sql,((err,resual)=>{
        if (err) {
          return res.send({ status: 1, message: err.message })
        }else{
          let sendObj = {
            container:resual[0].container,
            id:resual[0].id,
          }
          console.log(resual[0].id,'resualresualresual');
          return res.send({
            code:200,
            status: 1,
            msg:"成功",
            data:sendObj
          })
        }

      }))

    })
})




module.exports = router
