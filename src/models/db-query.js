import { Client } from 'pg';

const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/books';
const client = new Client(connectionString);
const usersTable = 'users';
// const orderTable = 'orders';


const getAll = () => new Promise((resolve, reject) => {
  client.connect()
    .then(() => {
      const sql = `SELECT * FROM ${usersTable}`;
      client.query(sql)
        .then((result) => {
          console.log(result.rows);
          resolve(result.rows);
          client.end();
        })
        .catch(e => reject(e));
    }).catch(e => reject(e));
});

export default getAll;
