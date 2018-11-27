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
// 添加商品路由
router.post('/addgoods', (req, res) => {
 
    // 接收参数
    let { cateName, barCode, goodsName, salePrice, marketPrice, costPrice, goodsNum, goodsWeight, unit, discount, promotion, goodsDesc } = req.body;
  
    // 构造sql语句
    const sqlStr = 'insert into goods(cateName, barCode, goodsName, salePrice,marketPrice, costPrice, goodsNum, goodsWeight, unit, discount, promotion, goodsDesc) values(?,?,?,?,?,?,?,?,?,?,?,?)';
    // 接收到的数据参数
    const sqlParams = [cateName, barCode, goodsName, salePrice, marketPrice, costPrice, goodsNum, goodsWeight, unit, discount, promotion, goodsDesc]
  
    // 执行sql语句
    connection.query(sqlStr, sqlParams, (err, data) => {
      if (err) {
        throw err;
      } else {
        // 如果受影响的数据行数 > 0 就是成功
        if (data.affectedRows > 0) {
          // 返回成功的信息（数据对象）给前端
          res.send({"rstCode": 1, "msg":"添加商品成功"})
  
        } else {
          // 否则就是失败 返回失败的信息（数据对象）给前端
          res.send({"rstCode": 0, "msg":"添加商品失败"})
        }
      }
    })
  })


// 账户列表路由
router.get('/goodsmanagebypage', (req, res) => {
    let {currentPage,pageSize} =req.query;
    // 编写查询所有的sql语句
    let sqlStr = `select * from users order by ctime desc`
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
router.get('/delgoods', (req, res) => {
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
router.get('/editgoods', (req, res) => {
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

module.exports = router;
