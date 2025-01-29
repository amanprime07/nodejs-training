client = require('./httpClient');

const url = 'https://jsonplaceholder.typicode.com/posts';

client.get(url).then(data => console.log(data));

// client..then(data => console.log(data));