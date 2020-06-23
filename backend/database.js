const mysql = require('mysql');
var connection = mysql.createConnection({
    host: process.env.SQLHOST,
    user: process.env.SQLUSERNAME,
    password: process.env.SQLPASSWORD,
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
    },
    async getUserData(userId) {
        const sql = "SELECT * FROM user WHERE user.id = ?";
        var dataBaseUserData = await this.query(sql, userId);
        if (dataBaseUserData.length === 1) {
            
            return dataBaseUserData[0];
        }
        return null;
    }
};