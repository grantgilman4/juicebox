//imports pg module
const { Client } = require('pg');

//add db name and location url
const client = new Client('postgres://localhost:5432/juicebox-dev');

//helper functions
async function getAllUsers() {
    const { rows } = await client.query(`SELECT id, username FROM users;`);
    return rows;
}
module.exports = { client, getAllUsers, }