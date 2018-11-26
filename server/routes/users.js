// 引入express模块
var express = require('express');

// 引入路由模块
var router = express.Router();
// 引入公共链接模块
const connection = require('./connect')

// 设置所有响应头
router.all('*', (req, res, next) => {
    // 先设置响应头
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:8080');
    // 设置允许设置cookie
    res.setHeader('Access-Control-Allow-Credentials', true);
    // 给其他路由放行
    next();
})
// 添加账户路由
router.post("/adduser", (req, res) => {
    let { username, password, usergroup } = req.body;

    // 构造sql语句
    let sqlStr = `insert into users(username,password,usergroup) value(?,?,?)`
    let sqlParams = [username, password, usergroup]

    connection.query(sqlStr, sqlParams, (err, data) => {
        if (err) {
            throw err
        } else {
            // 判断当影响行数大于0时则成功
            if (data.affectedRows > 0) {
                res.send({ "rstCode": 1, "msg": "账户添加成功" })
            } else {
                res.send({ "rstCode": 0, "msg": "账户添加失败" })
            }
        }
    })
})

// 账户列表路由
router.post('/usermanage', (req, res) => {
    // 编写查询所有的sql语句
    let sqlStr = `select * from users order by cdate desc`
    connection.query(sqlStr, (err, data) => {
        if (err) {
            // 有错误抛出
            throw err
        } else {
            //否侧发送数据给前端
            res.send(data)
        }
    })
})

// 单挑删除数据路由
router.get('/deluser', (req, res) => {
    // 接受ID
    let { id } = req.query;
    // 编写sql语句
    let sqlStr = `delete from users where id = ${id}`

    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err
        } else {
            if (data.affectedRows > 0) {
                res.send({ 'rstCode': 1, 'msg': '删除成功' })
            } else {
                res.send({ 'rstCode': 0, 'msg': '删除失败' })
            }
        }
    })
})
// 修改数据回显路由
router.get('/edituser', (req, res) => {
    // 接受ID
    let { id } = req.query;

    // 编写sql语句
    let sqlStr = `select * from users where id=${id}`

    // 操作数据库
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err
        } else {
            res.send(data)
        }
    })

})

// 修改后保存数据路由
router.post('/saveuser', (req, res) => {
    let { username, password, usergroup, editId } = req.body;

    // 编写sql语句
    const sqlStr = `update users set username='${username}', password='${password}', usergroup='${usergroup}' where id=${editId}`;

    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err
        } else {
            if (data.affectedRows > 0) {
                res.send({ "rstCode": 1, "msg": "账号修改成功" })
            } else {
                res.send({ "rstCode": 0, "msg": "账号修改失败" })
            }
        }
    })
})

// 批量删除路由
router.post('/batchdel', (req, res) => {
    // 接受
    let { idArr } = req.body;

    idArr = JSON.parse(idArr);

    // 编写sql语句
    const sqlStr = `delete from users where id in (${idArr})`;

    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err
        } else {
            if (data.affectedRows > 0) {
                res.send({ "rstCode": 1, "msg": "账户删除成功" })
            } else {
                res.send({ "rstCode": 0, "msg": "账户删除失败" })
            }
        }
    })
})

// 验证用户名密码路由
router.post('/checklogin', (req, res) => {
    // 接收前端数据
    let { username, password } = req.body;

    // 编写sql语句
    const sqlStr = `select * from users where username='${username}' and password='${password}'`;

    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err
        } else {
            if (data.length) {

                // 设置cookie 必须设置在res.send()之前
                res.cookie('userid', data[0].id);
                res.cookie('username', data[0].username);

                res.send({ "rstCode": 1, "msg": "登录成功" })
            } else {
                res.send({ "rstCode": 0, "msg": "登陆失败" })
            }
        }
    })
})

// 判断是否有cookie路由
router.get('/checkIsLogin', (req, res) => {
    let userid = req.cookies.userid;
    let username = req.cookies.username;
    if(userid && username) {
        res.send({'islogin':true})
    }else{
        res.send({'islogin':false})
    }
})

module.exports = router;
