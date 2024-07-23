// db.js
import Pool from 'pg-pool';

export const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'bd_dentista',
  password: '1234',
  port: 5433,
});


