// 链接mysql数据库公共模块

// 引入mysql
let mysql = require('mysql')

// 使用mysql链接数据库
let connection =mysql.createConnection({
    host     : 'localhost', // 数据地址 默认本地
    user     : 'root',      // 用户名字
    password : 'ROOT',    // 密码
    database : 'smms'       // 要连接的数据库的名字
})

// 执行链接

connection.connect(() => {
    console.log('数据库连接成功')
})

// 暴露出去
module.exports = connection