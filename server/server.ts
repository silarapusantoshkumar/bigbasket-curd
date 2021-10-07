import express from 'express';
import dotEnv from 'dotenv';
import cors from 'cors';
import mongoose from "mongoose";
import apiRouter from "./router/apiRouter";

const app:express.Application = express();

// configuration
app.use(cors());
dotEnv.config({path : './.env'}); // config dotEnv
app.use(express.json());  // configure express to receive the form data

const port = Number(process.env.EXPRESS_PORT);
const hostname = process.env.EXPRESS_HOST_NAME;

// connect to MongoDB
let dbURL = process.env.MONGO_DB_LOCAL_URL;
if(dbURL){
    mongoose.connect(dbURL, {
        useNewUrlParser : true,
        useUnifiedTopology : true
    }).then((response) => {
        console.log(`Connected to MongoDB.....`);
    }).catch((error) => {
        console.error(error);
        process.exit(1); // stop the node js process
    });
}

app.get('/', (request , response) => {
  response.status(200).json({
      message : 'Express Server is Up and Running'
  });
});

// configure the router
app.use('/api/v1/products', apiRouter);

if(port && hostname){
    app.listen(port , hostname, () => {
        console.log(`server is started at http://${hostname}:${port}`);
    });
}


