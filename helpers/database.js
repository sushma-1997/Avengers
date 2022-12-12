const mariadb = require("mariadb")
const localhost = '127.0.0.1';
const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: 'dbClass',
    database: 'avengers',
    connectionLimit: 5,
    port: 3307
})

pool.getConnection((err, connection) => {
    if(err){
        if (err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('Database connection lost');
        }
        if (err.code === 'ER_CON_COUNT_ERROR'){
            console.error('Database has too many connection');
        }
        if (err.code === 'ECONNREFUSED'){
            console.error('Database connection was refused');
        }
    }
    if(connection) connection.release();

    return;
});

module.exports = pool;