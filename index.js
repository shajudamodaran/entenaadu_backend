const express = require('express')
const app = express()
const port = process.env.PORT || 3000
app.use(express.json());

const {MongoClient} = require('mongodb');

const uri = 'mongodb+srv://ShajuMongodbClient:rec123@cluster0.hgqm9.mongodb.net/entenaadu?retryWrites=true&w=majority'
const client = new MongoClient(uri);



async function main(){

  try {
      // Connect to the MongoDB cluster
      await client.connect();

      // Make the appropriate DB calls
      await  listDatabases(client);

  } catch (e) {
      console.error(e);
  } finally {
      await client.close();
  }
}

main().catch(console.error);


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





app.listen(port, () => 
{
  console.log(`Server listening at http://localhost:${port}`)

})



