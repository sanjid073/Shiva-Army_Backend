const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");
const cors = require("cors");
const ObjectId = require("mongodb").ObjectId;
require("dotenv").config();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.0th5g.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tvjel.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;


const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
async function run() {
  try {
    await client.connect();

    const database = client.db("ShivaArmy");
    const analysisCollection = database.collection("analysis");
    const accordionCollection = database.collection("Accordion");
    const aboutTextCollection = database.collection("AboutText");
    const tokenomoicsCollection = database.collection("Tokenomoics");
    const usersCollection = database.collection("Users");

     // add analysis
     app.post("/analysis", async (req, res) => {
      const analysis = req.body;
      const result = await analysisCollection.insertOne(analysis);
      console.log(result)
      res.json(result);
    });
    // get analysis
    app.get("/analysis", async (req, res) => {
      const review = await analysisCollection.find({}).toArray();
      res.json(review);
    });
     //delete analysis from the database
     app.delete("/deleteAnalysis/:id", async (req, res) => {
       console.log('dgf');
      const result = await analysisCollection.deleteOne({
        _id: ObjectId(req.params.id),
      });
      res.send(result);
    });

     // add faq qustion and answer
     app.post("/accordion", async (req, res) => {
      const accordion = req.body;
      const result = await accordionCollection.insertOne(accordion);
      console.log(result)
      res.json(result);
    });
    // get faq
    app.get("/accordion", async (req, res) => {
      const review = await accordionCollection.find({}).toArray();
      res.json(review);
    });
     //delete faq from the database
     app.delete("/deleteAccordion/:id", async (req, res) => {
       console.log('dgf');
      const result = await accordionCollection.deleteOne({
        _id: ObjectId(req.params.id),
      });
      res.send(result);
    });
     // add about text
     app.post("/aboutText", async (req, res) => {
      const aboutText = req.body;
      const result = await aboutTextCollection.insertOne(aboutText);
      console.log(result)
      res.json(result);
    });
    // get about text
    app.get("/aboutText", async (req, res) => {
      const review = await aboutTextCollection.find({}).toArray();
      res.json(review);
    });
     //delete about text from the database
     app.delete("/deleteAboutText/:id", async (req, res) => {
       console.log('dgf');
      const result = await aboutTextCollection.deleteOne({
        _id: ObjectId(req.params.id),
      });
      res.send(result);
    });
     // add about text
     app.post("/tokenomoics", async (req, res) => {
      const tokenomoics = req.body;
      const result = await tokenomoicsCollection.insertOne(tokenomoics);
      console.log(result)
      res.json(result);
    });
    // get about text
    app.get("/tokenomoics", async (req, res) => {
      const review = await tokenomoicsCollection.find({}).toArray();
      res.json(review);
    });
     //delete about text from the database
     app.delete("/deleteTokenomoics/:id", async (req, res) => {
       console.log('dgf');
      const result = await tokenomoicsCollection.deleteOne({
        _id: ObjectId(req.params.id),
      });
      res.send(result);
    });





    //   get all product
    app.get("/products", async (req, res) => {
      const product = await ProductCollection.find({}).toArray();
      res.json(product);
    });

    // add product
    app.post("/products", async (req, res) => {
      const offer = req.body;
      const result = await ProductCollection.insertOne(offer);
      res.json(result);
    });
     //delete product from the database
     app.delete("/deleteProduct/:id", async (req, res) => {
      const result = await ProductCollection.deleteOne({
        _id: ObjectId(req.params.id),
      });
      res.send(result);
    });

    // get single product
    app.get("/product/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await ProductCollection.findOne(query);
      res.send(result);
    });

    // order offer
    app.post("/orders", async (req, res) => {
      const order = req.body;
      const result = await orderCollection.insertOne(order);
      res.json(result);
    });

    // get book offer by email
    app.get("/myOrders/:email", async (req, res) => {
      // const email = req.params.email;
      const result = await orderCollection
        .find({ email: req.params.email })
        .toArray();
      res.send(result);
    });
    //delete order from the database
    app.delete("/deleteOrders/:id", async (req, res) => {
      const result = await orderCollection.deleteOne({
        _id: ObjectId(req.params.id),
      });
      res.send(result);
    });

    //   get all order
    app.get("/allOrders", async (req, res) => {
      const result = await orderCollection.find({}).toArray();
      res.json(result);
    });

    //  update products
    app.put("/update/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const result = await orderCollection.updateOne(filter, {
        $set: {
          status: "Shipped",
        },
      });
      res.json(result);
    });

    // add review
    app.post("/review", async (req, res) => {
      const review = req.body;
      const result = await reviewCollection.insertOne(review);
      res.json(result);
    });
    // get review
    app.get("/review", async (req, res) => {
      const review = await reviewCollection.find({}).toArray();
      res.json(review);
    });

    // saved new Register user info into dataBase
    app.post("/users", async (req, res) => {
      const user = req.body;
      const result = await usersCollection.insertOne(user);
      console.log(result);
      res.json(result);
    });

    // search admin
    app.get('/users/:email', async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const user = await usersCollection.findOne(query);
      let isAdmin = false;
      if (user?.role === 'admin') {
          isAdmin = true;
      }
      res.json({ admin: isAdmin });
  })

    // saved google login user into database
    app.put("/users", async (req, res) => {
      const user = req.body;
      const filter = { email: user.email };
      const options = { upsert: true };
      const updateDoc = { $set: user };
      const result = await usersCollection.updateOne(
        filter,
        updateDoc,
        options
      );
      res.json(result);
    });

    app.put("/users/admin", async (req, res) => {
      const user = req.body;
      const filter = { email: user.email };
      const updateDoc = { $set: { role: "admin" } };
      const result = await usersCollection.updateOne(filter, updateDoc);
      res.json(result);
    });
  } finally {
    //   await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("running assignment-12 server");
});

app.listen(port, () => {
  console.log("running assignment-12 server", port);
});
