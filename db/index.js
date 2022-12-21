const mysql = require('mysql')

// 创建数据库连接对象
const db = mysql.createPool({
  host: '43.142.61.154',
  user: 'root',
  password: 'admin123',
  database: 'blog_db',
})

// 向外共享 db 数据库连接对象
module.exports = db