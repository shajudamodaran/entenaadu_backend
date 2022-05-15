
const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://ShajuMongodbClient:rec123@cluster0.hgqm9.mongodb.net/entenaadu?retryWrites=true&w=majority'
const client = new MongoClient(uri);
const database = client.db("entenaadu");

const LSG = database.collection("LSG");
const BloodBank = database.collection("Bloodbank");
const Hospitals = database.collection("Contacts");
const Complaints = database.collection("Complaints");
const Jobes = database.collection("Jobes");
const Schemes = database.collection("Schemes");
const RationShopes = database.collection("RationShopes");
const RationItems = database.collection("RationItems");
const Users = database.collection("users");


client.connect();


module.exports = {BloodBank,LSG,Hospitals, Complaints,Jobes, Schemes, RationShopes, RationItems, Users}