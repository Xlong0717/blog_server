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
        status: 1,
        msg:"成功",
        data:resual
      })
    }
  }
  ))

})


module.exports = router
