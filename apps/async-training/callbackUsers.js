const request = require('request');
const fs = require('fs');

const callbackUsers = request('https://reqres.in/api/users', (error, response, body) => {
    if(error!=null){
        console.error(`Could not sent request to api: ${error.message}` ); // Print the error if one occurred
        return
    }
    if(response.statusCode != 200){
        console.error(`API returned status code ${response.statusCode}`);
        return
    }
    console.log('Parsing Body');
    const payload = JSON.parse(body);
    let users = '';
    payload.data.forEach(user => {
        users += (`${user['id']}, ${user['email']}, ${user['first_name']}, ${user['last_name']}, ${user['avatar']}\n`);
    });

    fs.writeFile('callbackUsers.csv', users, (err) => {
        if(err){
            console.error(`Could not write to file: ${err.message}`);
            return
        }
        console.log('File written successfully to callbackUsers.csv');
    });
});