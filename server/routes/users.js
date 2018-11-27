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
router.post('/usermanagebypage', (req, res) => {
    let {currentPage,pageSize} =req.body;
    // 编写查询所有的sql语句
    let sqlStr = `select * from users order by cdate desc`
    connection.query(sqlStr, (err, data) => {
        if (err) {
            // 有错误抛出
            throw err;
        } else {
            // 获取到数据条数
            let totalpage = data.length;
            
            // 计算需要跳过的页数
            let n = (currentPage-1)*pageSize;
            // 编写sql语句
            sqlStr += ` limit ${n}, ${pageSize}`;

            connection.query(sqlStr, (err, data) => {
                if(err){
                    throw err
                }else{
                    res.send({"totalpage" : totalpage,"data":data})
                }
            })
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
// 检查旧密码路由
router.get('/checkoldpwd', (req, res) => {
    // 接收前端传的旧密码
    let {oldpassword} = req.query;
    // 接受ID
    let id = req.cookies.userid
    // 编写sql语句
    let sqlStr = `select * from users where id=${id}`

    connection.query(sqlStr, (err, data) => {
        if(oldpassword === data[0].password){
            res.send({"rstCode":1,"msg":"原密码正确"})
        }else{
            res.send({"rstCode":0,"msg":"原密码错误"})
        }
    })
})
// 保存修改密码路由
router.post('/savenewpwd', (req, res) => {
    let {newpassword} = req.body;

    let id = req.cookies.userid
    // 编写sql语句
    const sqlStr =`update users set password='${newpassword}' where id=${id}`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err
        } else {
            if (data.affectedRows > 0) {
                res.clearCookie('userid');
                res.clearCookie('username');
                res.send({ "rstCode": 1, "msg": "密码修改成功" })
            } else {
                res.send({ "rstCode": 0, "msg": "密码修改失败" })
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

// 退出登录路由
router.get('/logout', (req, res) => {
    // 清除cookie
    res.clearCookie('userid');
    res.clearCookie('username');
    res.send({'rstCode':1,'msg':'退出登录成功！'})
})

// 获取用户名路由
router.get('/getusername', (req, res) => {
    let username = req.cookies.username;
    res.send(username)
})

module.exports = router;
