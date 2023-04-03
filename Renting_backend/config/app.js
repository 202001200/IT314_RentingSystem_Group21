const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb+srv://KunjParekh:xyz123@cluster0.stcddrp.mongodb.net/?retryWrites=true&w=majority';

const dbName = 'RentingSystem';

const client = new MongoClient(url);

client.connect().then(()=>{
    console.log("Connected To Srever...");
    const db = client.db(dbName);
    client.close();
});
