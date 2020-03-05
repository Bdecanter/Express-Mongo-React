console.log("Server starting...");

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const router = require("./route");
const http = require("http");
const expressServer = express();
const mongoose = require('mongoose')
const cors = require('cors')

mongoose.connect("mongodb+srv://Benoit:Benoit@cluster0-yng5y.mongodb.net/test?retryWrites=true&w=majority",
{ useNewUrlParser: true, useCreateIndex: true }
)
mongoose.connection.once('open', () => {
    console.log('Connecté')
}).on('error', (error) => {
    console.log(error)
})

expressServer.use(morgan('combined'));
expressServer.use(bodyParser.json({type: '*/*'}));
expressServer.use(cors())

const port = 3090;
const server = http.createServer(expressServer);
router(expressServer);
server.listen(port);

console.log("Serveur is Alive... on port ", port);