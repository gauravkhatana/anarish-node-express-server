const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config(); // Load environment variables from .env file

const app = express();

// Database connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    // Additional options to avoid deprecation warnings
  })
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.error("Database connection error:", error.message);
  });

// Middleware
app.use(express.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded payloads
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)

// Routes
const usersRoutes = require("./api/routes/users");
const mailRoutes = require("./api/routes/mail");
const studentsRoutes = require("./api/routes/students");

// Static file serving
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the 'public' directory

// API Routes
app.use("/users", usersRoutes);
app.use("/sendmail", mailRoutes);
// Uncomment if you need to use studentsRoutes
// app.use("/students", studentsRoutes);

// Check path route
app.get('/check-path', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'), (err) => {
    if (err) {
      res.status(err.status || 500).end();
    } else {
      console.log('Path is correct.');
    }
  });
});

// Catch-all route for serving the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html')); // Serve the main HTML file for all other routes
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

module.exports = app;





// const express = require("express");
// const app = express();
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const mongoose = require("mongoose");

// mongoose
//   .connect(
//     "mongodb+srv://kumartech0102:node0102@cluster.scdz9q0.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster"
//   )
//   .then((_) => {
//     console.log("connection successful");
//   })
//   .catch((error) => {
//     console.log( error.message);
//   });

// // const uri = "mongodb+srv://kumartech0102:Mongodb0102@cluster.scdz9q0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster";
// // // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// // const client = new MongoClient(uri, {
// //   serverApi: {
// //     version: ServerApiVersion.v1,
// //     strict: true,
// //     deprecationErrors: true,
// //   }
// // });
// // async function run() {
// //   try {
// //     // Connect the client to the server	(optional starting in v4.7)
// //     await client.connect();
// //     // Send a ping to confirm a successful connection
// //     await client.db("test").command({ ping: 1 });
// //     console.log("Pinged your deployment. You successfully connected to MongoDB!");
// //   } finally {
// //     // Ensures that the client will close when you finish/error
// //     await client.close();
// //   }
// // }
// // run().catch(console.dir);

// const usersRoutes = require("./api/routes/users");
// const mailRoutes = require("./api/routes/mail");
// const studentsRoutes = require("./api/routes/students");




// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// app.use(cors());

// // In the place of this code  app.use(cors()) is being used ;
// //
// // app.use((req,resp,next)=>{
// //     resp.header('Access-Control-Allow-Origin',"*")
// //     resp.header('Access-Control-Allow-header',"Origin")

// //     if(req.method = "OPTIONS"){
// //         resp.header('Access-Control-Allow-Methods','PUT,POST,GET,PATCH,DELETE')
// //         return resp.status(200).json();
// //     }
// //     next();
// // })

// app.use("/users", usersRoutes);
// app.use("/sendmail", mailRoutes);
// // app.use("/students", studentsRoutes);

// app.get('/check-path', (req, res) => {
//   res.sendFile(path.join(__dirname, '/index.html'), (err) => {
//     if (err) {
//       res.status(err.status).end();
//     } else {
//       console.log('Path is correct.');
//     }
//   });
// });

// module.exports = app;


