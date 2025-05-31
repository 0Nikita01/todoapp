import {Pool} from 'pg';
import 'dotenv/config';

const pool = new Pool({
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    max: 20,                  // Максимум подключений
    idleTimeoutMillis: 30000, // Закрывать неиспользуемые через 30 сек
    connectionTimeoutMillis: 2000, // Таймаут подключения
    ...(process.env.NODE_ENV === 'production' && {
        ssl: { rejectUnauthorized: false }
    })

});

pool.on('error', (err) => {
    console.error('Ошибка подключения к БД:', err);
});
  
export default pool;

if (process.env.NODE_ENV !== 'test') {
    process.on('exit', () => pool.end());
}