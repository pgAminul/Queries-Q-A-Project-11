require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://product-recommendation-s-965a9.web.app",
      "https://product-recommendation-s-965a9.firebaseapp.com",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const verifyToken = (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) {
    return res.status(401).send({ message: "unauthorized access" });
  }

  //verify the token
  jwt.verify(token, process.env.ACESS_JWT_TOKEN, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "unauthorized access" });
    }
    req.user = decoded;
    next();
  });
};

async function run() {
  try {
    // await client.connect();
    const ProductsRecommendation = client.db("productsRecomedation");
    const database = ProductsRecommendation.collection("products");
    const Recommendation = ProductsRecommendation.collection("recommendation");

    //  jwt login start here
    // app.post("/jwt", async (req, res) => {
    //   const user = req.body;
    //   const token = jwt.sign(user, process.env.ACESS_JWT_TOKEN, {
    //     expiresIn: "5d",
    //   });
    //   res
    //     .cookie("token", token, {
    //       httpOnly: true,
    //       secure: process.env.NODE_ENV === "production",
    //       sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    //     })
    //     .send({ success: true });
    // });

    app.post("/jwt", (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACESS_JWT_TOKEN, {
        expiresIn: "10h",
      });

      res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        })
        .send({ success: true });
    });

    //jwt

    app.post("/logout", (req, res) => {
      res
        .clearCookie("token", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        })
        .send({ success: true });
    });

    // //  jwt logout user
    // app.post("/logout", (req, res) => {
    //   res
    //     .clearCookie("token", {
    //       httpOnly: true,
    //       secure: process.env.NODE_ENV === "production",
    //       sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    //     })
    //     .send({ success: true });
    // });

    app.get("/", (req, res) => {
      res.send("Hello World!");
    });

    app.post("/addQuery", async (req, res) => {
      const product = req.body;
      const result = await database.insertOne(product);
      res.send(result);
    });

    app.get("/allData", async (req, res) => {
      try {
        const data = await database
          .find({})
          .sort({ createdAt: -1 })
          .limit(6)
          .toArray();
        res.send(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
      }
    });

    app.get("/findDataByEmail/:email", verifyToken, async (req, res) => {
      const email = req.params.email;
      if (req.user.email !== req.params.email) {
        return res.status(403).send("forbidden access");
      }
      const data = await database
        .find({ userEmail: email })
        .sort({ createdAt: -1 })
        .toArray();
      res.send(data);
    });
    app.get("/allQuery", async (req, res) => {
      const data = await database.find().sort({ createdAt: -1 }).toArray();
      res.send(data);
    });
    app.get("/details-query/:id", async (req, res) => {
      const id = req.params.id;
      const findData = { _id: new ObjectId(id) };
      const data = await database.findOne(findData);
      res.send(data);
    });

    // update query
    app.patch("/updateQuery/:id", async (req, res) => {
      const id = req.params.id;
      const body = req.body;

      try {
        const updateId = { _id: new ObjectId(id) };
        const data = {
          $set: body,
        };

        const result = await database.updateOne(updateId, data);

        res.status(200).json({ message: "Query updated successfully", result });
      } catch (error) {
        console.log(error.message, "error in PATCH method");
        res.status(500).json({ error: "Internal server error" });
      }
    });

    // post for add Recommendatino
    // app.post("/add-recommendation", async (req, res) => {
    //   const recommendationForm = req.body;
    //   const result = await Recommendation.insertOne(recommendationForm);

    //   const id = recommendationForm.previousDataId;
    //   const data = database.find({ _id: new ObjectId(id) });
    //   let count = 0;
    //   if (data.recommendationCount) {
    //     count = data.recommendationCount + 1;
    //   } else {
    //     count = 0;
    //   }

    //   const filter = { _id: new ObjectId(id) };
    //   const updateDoc = {
    //     $set: {
    //       recommendationCount: count,
    //     },
    //   };
    //   const updateResult = await database.updateOne(filter, updateDoc);
    //   console.log(updateResult);
    //   res.send(result);
    // });

    // query Commnet find

    app.get("/queryComment/:id", async (req, res) => {
      const previousDataId = req.params.id;

      try {
        const data = await Recommendation.find({
          previousDataId: previousDataId,
        }).toArray();
        res.send(data);
      } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while fetching the data.");
      }
    });

    app.post("/add-recommendation", async (req, res) => {
      try {
        const recommendationForm = req.body;
        const result = await Recommendation.insertOne(recommendationForm);

        const id = recommendationForm.previousDataId;
        const filter = { _id: new ObjectId(id) };
        const updateDoc = {
          $inc: { recommendationCount: 1 },
        };

        await database.updateOne(filter, updateDoc);
        res.send(result);
      } catch (error) {
        console.error("Error in /add-recommendation:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    // find by recomend your self
    app.get("/findMyRecommed/:email", verifyToken, async (req, res) => {
      const email = req.params.email;
      if (req.user.email !== req.params.email) {
        return res.status(403).send("forbidden access");
      }
      try {
        const findMyRecommend = await Recommendation.find({
          RecommenderEmail: email,
        }).toArray();
        res.send(findMyRecommend);
      } catch (error) {
        console.log(error, "error in find my recommend Route");
      }
    });

    // delete my recommendtaion

    app.delete("/deleteRecommendation/:id", async (req, res) => {
      const id = req.params.id;

      try {
        const recommendationToDelete = await Recommendation.findOne({
          _id: new ObjectId(id),
        });
        const deleteFilter = { _id: new ObjectId(id) };
        const deleteResult = await Recommendation.deleteOne(deleteFilter);

        if (deleteResult.deletedCount === 1) {
          const queryFilter = {
            _id: new ObjectId(recommendationToDelete.previousDataId),
          };
          const updateDoc = {
            $inc: { recommendationCount: -1 },
          };
          const updateResult = await database.updateOne(queryFilter, updateDoc);

          if (updateResult.modifiedCount === 1) {
            res.status(200).json({
              message: "Recommendation deleted and count updated successfully!",
            });
          } else {
            res.status(400).json({
              error: "Recommendation deleted, but failed to update count.",
            });
          }
        } else {
          res.status(400).json({ error: "Failed to delete recommendation." });
        }
      } catch (error) {
        console.error("Error in deleting recommendation:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    app.get("/recommendationForMe", verifyToken, async (req, res) => {
      const email = req.query.email;
      if (req.user.email !== req.query.email) {
        return res.status(403).send("forbidden access");
      }
      try {
        const findMyRecommendation = await Recommendation.find({
          userEmail: email,
        }).toArray();
        res.send(findMyRecommendation);
      } catch (error) {
        console.log("Error fetching recommendations:", error);
        res.status(500).send("Internal Server Error");
      }
    });

    //delete start here
    app.delete("/deleteQuery/:id", async (req, res) => {
      const id = req.params.id;
      try {
        const queryId = { _id: new ObjectId(id) };
        const result = await database.deleteOne(queryId);

        res.send(result);
      } catch (error) {
        console.error("Error deleting query:", error);
      }
    });

    // await client.db("admin").command({ ping: 1 });
    // console.log(
    //   "Pinged your deployment. You successfully connected to MongoDB!"
    // );
  } finally {
  }
}
run().catch(console.dir);

module.exports = app;
