
const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://ShajuMongodbClient:rec123@cluster0.hgqm9.mongodb.net/entenaadu?retryWrites=true&w=majority'
const client = new MongoClient(uri);


const database = client.db("entenaadu");
const Hospitals = database.collection("Hospitals");

client.connect();


module.exports = Hospitals
