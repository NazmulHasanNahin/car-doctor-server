const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const cors = require('cors');
require("dotenv").config()
const app = express();
const port = process.env.PORT || 5000;


// midleware 

app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@car-doctor-cluster.kg1cvvr.mongodb.net/?retryWrites=true&w=majority&appName=car-doctor-cluster`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {






    
    // await client.close();
  }
}
run().catch(console.dir);




app.get("/", (req,res)=>{
    res.send("car-doctor server is running")
})


app.listen(port, ()=>{
    console.log(`car-doctor server is running on ${port}`);
})