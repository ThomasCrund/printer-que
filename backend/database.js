const mysql = require('mysql');
var connection = mysql.createConnection({
    host: process.env.SQLHOST,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: "printer"
})

module.exports = {
    connection,
    query( sql, args ) {
        return new Promise( ( resolve, reject ) => {
            this.connection.query( sql, args, ( err, rows ) => {
                if ( err )
                    return reject( err );
                resolve( rows );
            } );
        } );
    }
};