//grab client with destructuring from export
const { client, getAllUsers } = require('./index');

async function testDB() {
    try {
        //connect client to database
        client.connect();
        //await query
        const users = await getAllUsers();
        console.log(users);
    } catch (error) {
        console.log(error)
    } finally {
        client.end();
    }
}

testDB();