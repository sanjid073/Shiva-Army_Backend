const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");
const cors = require("cors");
const ObjectId = require("mongodb").ObjectId;
require("dotenv").config();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

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
    const introCollection = database.collection("intro");
    const accordionCollection = database.collection("Accordion");
    const aboutTextCollection = database.collection("AboutText");
    const tokenomoicsCollection = database.collection("Tokenomoics");
    const tokenomoicsSubHeadingCollection = database.collection(
      "TokenomoicsSubHeading"
    );
    const contactCollection = database.collection("Contact");

    // add intro text
    app.post("/intro", async (req, res) => {
      const intro = req.body;
      const result = await introCollection.insertOne(intro);
      res.json(result);
    });
    // get intro
    app.get("/intro", async (req, res) => {
      const review = await introCollection.find({}).toArray();
      res.json(review);
    });
    //delete intro from the database
    app.delete("/deleteIntro/:id", async (req, res) => {
      const result = await introCollection.deleteOne({
        _id: ObjectId(req.params.id),
      });
      res.send(result);
    });

    // add tokenomoicsSubHeading text
    app.post("/tokenomoicsSubHeading", async (req, res) => {
      const tokenomoicsSubHeading = req.body;
      const result = await tokenomoicsSubHeadingCollection.insertOne(
        tokenomoicsSubHeading
      );
      res.json(result);
    });
    // get tokenomoicsSubHeading
    app.get("/tokenomoicsSubHeading", async (req, res) => {
      const review = await tokenomoicsSubHeadingCollection.find({}).toArray();
      res.json(review);
    });
    //delete tokenomoicsSubHeading from the database
    app.delete("/deleteTokenomoicsSubHeading/:id", async (req, res) => {
      const result = await tokenomoicsSubHeadingCollection.deleteOne({
        _id: ObjectId(req.params.id),
      });
      res.send(result);
    });

    // add analysis
    app.post("/analysis", async (req, res) => {
      const analysis = req.body;
      const result = await analysisCollection.insertOne(analysis);
      console.log(result);
      res.json(result);
    });
    // get analysis
    app.get("/analysis", async (req, res) => {
      const review = await analysisCollection.find({}).toArray();
      res.json(review);
    });
    //delete analysis from the database
    app.delete("/deleteAnalysis/:id", async (req, res) => {
      console.log("dgf");
      const result = await analysisCollection.deleteOne({
        _id: ObjectId(req.params.id),
      });
      res.send(result);
    });

    // add faq qustion and answer
    app.post("/accordion", async (req, res) => {
      const accordion = req.body;
      const result = await accordionCollection.insertOne(accordion);
      console.log(result);
      res.json(result);
    });
    // get faq
    app.get("/accordion", async (req, res) => {
      const review = await accordionCollection.find({}).toArray();
      res.json(review);
    });
    //delete faq from the database
    app.delete("/deleteAccordion/:id", async (req, res) => {
      console.log("dgf");
      const result = await accordionCollection.deleteOne({
        _id: ObjectId(req.params.id),
      });
      res.send(result);
    });
    // add about text
    app.post("/aboutText", async (req, res) => {
      const aboutText = req.body;
      const result = await aboutTextCollection.insertOne(aboutText);
      console.log(result);
      res.json(result);
    });
    // get about text
    app.get("/aboutText", async (req, res) => {
      const review = await aboutTextCollection.find({}).toArray();
      res.json(review);
    });
    //delete about text from the database
    app.delete("/deleteAboutText/:id", async (req, res) => {
      console.log("dgf");
      const result = await aboutTextCollection.deleteOne({
        _id: ObjectId(req.params.id),
      });
      res.send(result);
    });

    // add tokenomoics text
    app.post("/tokenomoics", async (req, res) => {
      const tokenomoics = req.body;
      const result = await tokenomoicsCollection.insertOne(tokenomoics);
      console.log(result);
      res.json(result);
    });
    // get tokenomoics text
    app.get("/tokenomoics", async (req, res) => {
      const review = await tokenomoicsCollection.find({}).toArray();
      res.json(review);
    });
    //delete tokenomoics text from the database
    app.delete("/deleteTokenomoics/:id", async (req, res) => {
      console.log("dgf");
      const result = await tokenomoicsCollection.deleteOne({
        _id: ObjectId(req.params.id),
      });
      res.send(result);
    });

    // add contact text
    app.post("/contact", async (req, res) => {
      const contact = req.body;
      const result = await contactCollection.insertOne(contact);
      console.log(result);
      res.json(result);
    });
    // get contact text
    app.get("/contact", async (req, res) => {
      const review = await contactCollection.find({}).toArray();
      res.json(review);
    });
    //delete contact text from the database
    app.delete("/deleteContact/:id", async (req, res) => {
      console.log("dgf");
      const result = await contactCollection.deleteOne({
        _id: ObjectId(req.params.id),
      });
      res.send(result);
    });
  } finally {
    //   await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("running Shiva Army server");
});

app.listen(port, () => {
  console.log("running Shiva Army server", port);
});
