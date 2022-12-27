// 文章博客列表
const express = require('express')
// 创建路由对象
const router = express.Router();

// 导入数据库操作模块
const db = require('../db/index');
router.post('/articleList', (req, res) => {

  const sql = `select * from article`
  db.query(sql, ((err, resual) => {
    if (err) {
      return res.send({
        status: 1,
        message: err.message
      })
    } else {
      return res.send({
        code: 200,
        status: 1,
        msg: "成功",
        data: resual
      })
    }
  }))
})

// 查文章详情
router.post('/articleDetail', (req, res) => {
  let postData = '' // 存放客户端传来的数据
  req.on('data', chunk => {
    console.log('chunk', chunk) // 二进制格式
    postData += chunk.toString() // 将二进制格式转成字符串格式，拼接到 postData 上
  })
  console.log(postData, 'postData')
  //接受前端数据
  let obj = '';
  req.on('end', () => {
    // 将字符串转对象
    obj = JSON.parse(postData);
  })
  // 前端数据接受完毕
  req.on('end', () => {
    const sql = `SELECT * FROM  article_detail WHERE article_detail.detailId = ${obj.id} `
    db.query(sql, ((err, resual) => {
      if (err) {
        return res.send({
          status: 1,
          message: err.message
        })
      } else {
        let sendObj = {
          container: resual[0].container,
          id: resual[0].id,
        }
        console.log(resual[0].id, 'resualresualresual');
        return res.send({
          code: 200,
          status: 1,
          msg: "成功",
          data: sendObj
        })
      }

    }))

  })
})

// 查询个人简介信息
router.post('/personDetail', (req, res) => {
  const sql = 'select  *from  user_text';

  db.query(sql, ((err, resual) => {
    if (err) {
      return res.send({
        status: 1,
        message: err.message
      })
    } else {
      let obj = {
        id:resual[0].id,
        user_text:resual[0].user_text
      }
      return res.send({
        code: 200,
        status: 1,
        msg: "成功",
        data: obj
      })
    }
  }))
})

// 查询文章分类
router.post('/articleType',((req,res)=>{
  const sql = `select * from article`
  db.query(sql, ((err, resual) => {
    if (err) {
      return res.send({
        status: 1,
        message: err.message
      })
    } else {
      // reduce 计算出累加
      console.log(resual,'resualresual')
      let dataRes =  resual.reduce((acc,cur)=>{
        let obj = {
          type:cur.type,
          type_title:cur.type_title,
          start_time:cur.start_time,
          end_time:cur.end_time,
          id:cur.id
        }
        acc.push(obj)
        return acc 
      },[])

      return res.send({
        code: 200,
        status: 1,
        msg: "成功",
        data: dataRes
      })
    }
  }))
}))

// 根据type 查询文章分类下面的文章
router.post('/artTypes',((req,res)=>{
  let postData = '' // 存放客户端传来的数据
  req.on('data', chunk => {
    console.log('chunk', chunk) // 二进制格式
    postData += chunk.toString() // 将二进制格式转成字符串格式，拼接到 postData 上
  })
  console.log(postData, 'postData')
  //接受前端数据
  let obj = '';
  req.on('end', () => {
    // 将字符串转对象
    obj = JSON.parse(postData);
    console.log(obj,'objj')
  })
// 数据接受完毕
  req.on('end', () => {
    const sql = `SELECT * FROM  article_detail WHERE article_detail.type = ${obj.type} `
    db.query(sql, ((err, resual) => {
      if (err) {
        return res.send({
          status: 1,
          message: err.message
        })
      } else {
        console.log(resual,'resualresualresual')
        let dataRes =  resual.reduce((acc,cur)=>{
          let obj = {
            title:cur.title,
            detailId:cur.detailId,
            id:cur.id,
            end_time:cur.endTime
          }
          acc.push(obj)
          return acc 
        },[])
        console.log(dataRes,'dataResdataResdataResdataResdataResdataResdataResdataResdataResdataRes')

        return res.send({
          code: 200,
          status: 1,
          msg: "成功",
          data: dataRes
        })
      }

    }))

  })
}))



module.exports = router