"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const { connect, set } = require('mongoose');
const { USER, PASSWORD, DATABASE } = config_1.environment.MONGO;
const URI = `mongodb+srv://${USER}:${PASSWORD}@burbanocorp.91g2g.mongodb.net/${DATABASE}?retryWrites=true&w=majority`;
set('strictQuery', false);
connect(URI, { useNewUrlParser: true })
    .then(() => console.log(`Mongo DB has been conected in: ${DATABASE}`))
    .catch((err) => console.log(`This error has been interupt: \n${err} ${DATABASE}`));
