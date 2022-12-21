// 导入 exprees
const express   = require('express');

// 导入跨域中间件
const cors = require('cors') ;



const app = express() ;

app.use(cors());

// 配置解析表单数据中间件
app.use(express.urlencoded({extended:false}));


// 导入并注册用户路由模块
const userRouter = require('./router/article')
app.use('/api', userRouter)

// 启动服务器
app.listen(3000,()=>{
  console.log('api server running at http://127.0.0.1:3000')
})