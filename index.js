const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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


    // start 

    const serviceCollection = client.db("carDoctorDB").collection("services");
    const bookingCollection = client.db("carDoctorDB").collection("bookingService");


    // get service dekhar jnne

    app.get("/services", async (req, res) => {
      const cursor = serviceCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })
    //to get single service details
    app.get("/services/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };

      const options = {
        projection: { _id: 1, title: 1, price: 1, service_id: 1, img: 1 }
      }
      const result = await serviceCollection.findOne(query, options);
      res.send(result);
    })


    // to book 1 service

    app.post("/bookings", async (req, res) => {
      const booking = req.body;
      const result = await bookingCollection.insertOne(booking);
      res.send(result)
    })

    //get 

    app.get("/bookings", async (req, res) => {
      let query = {};
      if (req.query?.email) {
        query = { email: req.query.email }
      }
      const result = await bookingCollection.find(query).toArray();
      res.send(result);
    })

    // delete 

    app.delete("/bookings/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await bookingCollection.deleteOne(query)
      res.send(result)
    })










    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {



    // await client.close();
  }
}
run().catch(console.dir);




app.get("/", (req, res) => {
  res.send("car-doctor server is running")
})


app.listen(port, () => {
  console.log(`car-doctor server is running on ${port}`);
})