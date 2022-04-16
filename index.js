const express = require('express')
const app = express()
const port = process.env.PORT || 3000
app.use(express.json());
const {MongoClient} = require('mongodb');
const uri = 'mongodb+srv://ShajuMongodbClient:rec123@cluster0.hgqm9.mongodb.net/entenaadu?retryWrites=true&w=majority'
const client = new MongoClient(uri);
var feeds = require('./Routes/feeds.js');
var bloodbank = require('./Routes/bloodbank.js');
var hospitals = require('./Routes/hospitals.js');
var contacts = require('./Routes/contacts');
var complaints = require('./Routes/complaints');


async function main(){

  try {
      // Connect to the MongoDB cluster
      await client.connect();

  } catch (e) {
      console.error(e);
  } finally {
      await client.close();
  }
}

main().catch(console.error);

const LSG = require('./Mongo/db.js');

//API Calls......................................................................................................
app.get('/', (req, res) => {

   getMasterData(client).then((result)=>{

    if(result)
    {
      res.send(result)
    }
    else{

    }
    res.send(`No listings found `);

   })
 
})


// app.get('/feeds', (req, res) => {

//   let {lsg}=req.body

//   if(lsg)
//   {

//    getFeedsOfLsg(lsg).then((responce)=>{
//       res.send(responce)
//     })
   


//   }
//   else{
//     res.status(422)
//     res.send("Please provide LSG Code")
//   }
 
// })

app.use('/feeds', feeds);
app.use('/bloodbank', bloodbank);
app.use('/hospitals', hospitals);
app.use('/contacts', contacts);
app.use('/complaints', complaints);



//Functions......................................................................................................
async function listDatabases(client)
{
  databasesList = await client.db().admin().listDatabases();
  console.log("Databases:");
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};


async function getMasterData(client) {

  await client.connect();
  
  const result = await client.db("entenaadu").collection("LSG").find({}).toArray()
  if (result) 
  {
     return(result[0])
  } else 
  {
      console.log(`No listings found `);
  }
}


async function getFeedsOfLsg(lsgCode){

  await client.connect();

  
  const result = LSG.find({"_id":lsgCode},{details:1}).toArray()

  if (result) 
  {
     return(result)

  } else 
  {
      console.log(`No listings found `);
  }

}



app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});


