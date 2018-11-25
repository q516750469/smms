// 引入express模块
var express = require('express');

// 引入路由模块
var router = express.Router();
// 引入公共链接模块
const connection = require('./connect')

// 添加账户路由
router.post("/adduser", (req, res) => {
    //设置响应头
    res.setHeader('Access-Control-Allow-Origin', '*');
    let {username,password,usergroup} = req.body;
    
    // 构造sql语句
    let sqlStr = `insert into users(username,password,usergroup) value(?,?,?)`
    let sqlParams = [username,password,usergroup]

    connection.query(sqlStr, sqlParams, (err,data) => {
        if(err){
            throw err
        }else{
            // 判断当影响行数大于0时则成功
           if(data.affectedRows > 0){
                res.send({"rstCode":1,"msg":"账户添加成功"})
           }else{
                res.send({"rstCode":0,"msg":"账户添加失败"})
           }
        }
    })
})

// 账户列表路由
router.post('/usermanage', (req, res) => {
    // 设置响应头
    res.setHeader('Access-Control-Allow-Origin','*');
    // 编写查询所有的sql语句
    let sqlStr = `select * from users order by cdate desc`
    connection.query(sqlStr, (err, data) => {
        if(err) {
            // 有错误抛出
            throw err
        }else{
            //否侧发送数据给前端
            res.send(data)
        }
    })
})

// 单挑删除数据路由
router.get('/deluser', (req, res) => {
    //设置响应头
    res.setHeader('Access-Control-Allow-Origin','*');
    // 接受ID
    let {id} =req.query;
    // 编写sql语句
    let sqlStr = `delete from users where id = ${id}`

    connection.query(sqlStr, (err, data) => {
        if(err){
            throw err
        }else{
            if(data.affectedRows > 0){
                res.send({'rstCode' : 1, 'msg' : '删除成功'})
            }else{
                res.send({'rstCode' : 0, 'msg' : '删除失败'})
            }
        }
    })
})



module.exports = router;
