import pg from 'pg';
import 'dotenv/config';

const { Pool } = pg;
const { PGHOST, PGUSER, PGPASSWORD, PGDATABASE, PGPORT } = process.env;

const pool = new Pool({
    host: PGHOST,
    user: PGUSER,
    password: PGPASSWORD,
    database: PGDATABASE,
    port: PGPORT,
    allowExitOnIdle: true
})

pool.query('SELECT NOW()', (err, res) => {
    if(err){
        console.error('Database connection error:', err);
    }else{
        console.log('Database connected successfully:', res.rows[0]);
    }
})

export default pool;