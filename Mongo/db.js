
const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://ShajuMongodbClient:rec123@cluster0.hgqm9.mongodb.net/entenaadu?retryWrites=true&w=majority'
const client = new MongoClient(uri);


const database = client.db("entenaadu");
const LSG = database.collection("LSG");
const BloodBank = database.collection("Bloodbank");

client.connect();


module.exports = BloodBank