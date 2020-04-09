var mssql = require('mssql');
var db = {};
var config = {
    user:'sa',
    password:'gaoxw',
    server:'127.0.0.1',
    database:'testsystem',
    options: {
      encrypt: true
    }
};

//执行sql,返回数据.
db.sql = function (sql, callBack) {
    var pool = new mssql.ConnectionPool(config, function (err) {
        if (err) {
            console.log(err);
            return;
        }
        var ps = new mssql.PreparedStatement(pool);
        ps.prepare(sql, function (err) {
            if (err){
                console.log(err);
                return;
            }
            ps.execute('', function (err, result) {

                callBack(err, result);
                // if (err){
                //     console.log(err);
                //     return;
                // }

                ps.unprepare(function (err) {
                    if (err){
                        console.log(err);
                        callback(err,null);
                        return;
                    }
                });
            });
        });
    });
};

module.exports = db;