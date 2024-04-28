import mysql from 'mysql2/promise'
import { MYSQLHOST, MYSQLUSER, MYSQLPASSWORD, DATABASE, MYSQLPORT } from "./config"

export const connect = () => {
    try {
        const dbConnection = mysql.createPool({
            connectionLimit: 10,
            host: MYSQLHOST,
            user: MYSQLUSER,
            password: MYSQLPASSWORD,
            database: DATABASE,
            port: +(MYSQLPORT ?? '')
        })
        console.log('\x1b[35mSending request to the database! 📶\x1b[0m');

        return dbConnection
    } catch (error) {
        console.log('Couldnt connect to database. ⚠️')
        throw error
    }
}
