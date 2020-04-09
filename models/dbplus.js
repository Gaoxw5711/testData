/**
 *sqserver Model
 **/
var mysql = require('mysql');
// import dbConfig from './DBConfig';

// const pool = mysql.createPool(dbConfig);

const pool = mysql.createPool({
  host: '49.235.242.185', // 地址
  user: 'kerwin',
  port: '3306',
  password: 'kerwin@123',
  database: 'testDatabase' // 数据库名字
}); //数据库连接配置

// var getConnection = function (callback) {
//   //连接数据库
//   if (!callback) {
//     callback = function () {};
//   }
//   var con = new mysql.createConnection(conf, function (err) {
//     if (err) {
//       throw err;
//     }
//     callback(con);
//   });
// };
// var querySql = function (sql, params, callBack) {
//   //写sql语句自由查询
//   getConnection(function (connection) {
//     var ps = new mssql.PreparedStatement(connection);
//     if (params != "") {
//       for (var index in params) {
//         if (typeof params[index] == "number") {
//           ps.input(index, mssql.Int);
//         } else if (typeof params[index] == "string") {
//           ps.input(index, mssql.NVarChar);
//         }
//       }
//     }
//     ps.prepare(sql, function (err) {
//       if (err) console.log(err);
//       ps.execute(params, function (err, recordset) {
//         callBack(err, recordset);
//         ps.unprepare(function (err) {
//           if (err) console.log(err);
//         });
//       });
//     });
//   });
// };

// var select = function (
//   tableName,
//   topNumber,
//   whereSql,
//   params,
//   orderSql,
//   callBack
// ) {
//   //查询该表所有符合条件的数据并可以指定前几个
//   getConnection(function (connection) {
//     var ps = new mssql.PreparedStatement(connection);
//     var sql = "select * from " + tableName + " ";
//     if (topNumber != "") {
//       sql = "select top(" + topNumber + ") * from " + tableName + " ";
//     }
//     sql += whereSql + " ";
//     if (params != "") {
//       for (var index in params) {
//         if (typeof params[index] == "number") {
//           ps.input(index, mssql.Int);
//         } else if (typeof params[index] == "string") {
//           ps.input(index, mssql.NVarChar);
//         }
//       }
//     }
//     sql += orderSql;
//     console.log(sql);
//     ps.prepare(sql, function (err) {
//       if (err) console.log(err);
//       ps.execute(params, function (err, recordset) {
//         callBack(err, recordset);
//         ps.unprepare(function (err) {
//           if (err) console.log(err);
//         });
//       });
//     });
//   });
// };

// // select * from news_base limit "+(req.params.page-1)*3+",3"
// // 分页查询
// var selectPage = function (
//   tableName,
//   pageNum,
//   pageSize,
//   whereSql,
//   params,
//   callBack
// ) {
//   getConnection(function (connection) {
//     var ps = new mssql.PreparedStatement(connection);
//     var start = (pageNum - 1) * pageSize;
//     var end = pageSize;
//     // select ID,Title from Article_Detail order by id OFFSET (15 * (50-1)) ROW FETCH NEXT 15 rows only

//     // SELECT * FROM
//     // ( SELECT TOP ( @pageSize * @pageIndex ) ROW_NUMBER() OVER ( ORDER BY dbo.Products.UnitPrice DESC ) AS rownum , *  FROM dbo.Products
//     // ) AS temp WHERE  temp.rownum > ( @pageSize * ( @pageIndex - 1 ) ) ORDER BY temp.UnitPrice

//     var sql = "select * , COUNT(1) OVER() AS total from " + tableName + " ";
//     if (params != "") {
//       for (var index in params) {
//         if (typeof params[index] == "number") {
//           ps.input(index, mssql.Int);
//         } else if (typeof params[index] == "string") {
//           ps.input(index, mssql.NVarChar);
//         }
//       }
//     }
//     if (whereSql != "") {
//       sql += whereSql + " ";
//     }
//     sql +=
//       "order by id DESC OFFSET " +
//       start +
//       " ROW FETCH NEXT " +
//       end +
//       " rows only";
//     ps.prepare(sql, function (err) {
//       if (err) console.log(err);
//       ps.execute(params, function (err, recordset) {
//         callBack(err, recordset);
//         ps.unprepare(function (err) {
//           if (err) console.log(err);
//         });
//       });
//     });
//   });
// };

var selectAll = function(tableName, callBack) {
  //查询该表所有数据
  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected!

    var sql = 'SELECT * FROM ' + tableName + ' ';
    connection.query(sql, function(error, result) {
      if (error) throw error;

      console.log(result); //数据库查询结果返回到result中

      connection.release();
    });
  });
};

const add = (addObj, tableName, callBack) => {
  //添加数据
  pool.getConnection(function(err, connection) {
    var sql = 'insert into ' + tableName + '(';
    if (addObj != '') {
      for (var index in addObj) {
        if (typeof addObj[index] == 'number') {
          ps.input(index, mssql.Int);
        } else if (typeof addObj[index] == 'string') {
          ps.input(index, mssql.NVarChar);
        }
        sql += index + ',';
      }
      sql = sql.substring(0, sql.length - 1) + ') values(';
      for (var index in addObj) {
        if (typeof addObj[index] == 'number') {
          sql += addObj[index] + ',';
        } else if (typeof addObj[index] == 'string') {
          sql += "'" + addObj[index] + "'" + ',';
        }
      }
    }
    sql = sql.substring(0, sql.length - 1) + ')';

    connection.query(sql, function(err, rows) {
      callback(err, rows);
      connection.release();
    });
  });
};

// var update = function (updateObj, whereObj, tableName, callBack) {
//   //更新数据
//   getConnection(function (connection) {
//     var ps = new mssql.PreparedStatement(connection);
//     var sql = "update " + tableName + " set ";
//     if (updateObj != "") {
//       for (var index in updateObj) {
//         if (typeof updateObj[index] == "number") {
//           ps.input(index, mssql.Int);
//           sql += index + "=" + updateObj[index] + ",";
//         } else if (typeof updateObj[index] == "string") {
//           ps.input(index, mssql.NVarChar);
//           sql += index + "=" + "'" + updateObj[index] + "'" + ",";
//         }
//       }
//     }
//     sql = sql.substring(0, sql.length - 1) + " where ";
//     if (whereObj != "") {
//       for (var index in whereObj) {
//         if (typeof whereObj[index] == "number") {
//           ps.input(index, mssql.Int);
//           sql += index + "=" + whereObj[index] + " and ";
//         } else if (typeof whereObj[index] == "string") {
//           ps.input(index, mssql.NVarChar);
//           sql += index + "=" + "'" + whereObj[index] + "'" + " and ";
//         }
//       }
//     }
//     sql = sql.substring(0, sql.length - 5);
//     ps.prepare(sql, function (err) {
//       if (err) console.log(err);
//       ps.execute(updateObj, function (err, recordset) {
//         callBack(err, recordset);
//         ps.unprepare(function (err) {
//           if (err) console.log(err);
//         });
//       });
//     });
//   });
// };

// var del = function (whereSql, params, tableName, callBack) {
//   //删除数据
//   getConnection(function (connection) {
//     var ps = new mssql.PreparedStatement(connection);
//     var sql = "delete from " + tableName + " ";
//     if (params != "") {
//       for (var index in params) {
//         if (typeof params[index] == "number") {
//           ps.input(index, mssql.Int);
//         } else if (typeof params[index] == "string") {
//           ps.input(index, mssql.NVarChar);
//         }
//       }
//     }
//     sql += whereSql;
//     ps.prepare(sql, function (err) {
//       if (err) console.log(err);
//       ps.execute(params, function (err, recordset) {
//         callBack(err, recordset);
//         ps.unprepare(function (err) {
//           if (err) console.log(err);
//         });
//       });
//     });
//   });
// };

// exports.config = conf;
// exports.del = del;
// exports.select = select;
// exports.update = update;
// exports.querySql = querySql;
exports.selectAll = selectAll;
// exports.selectPage = selectPage;
// exports.restoreDefaults = restoreDefaults;
exports.add = add;
