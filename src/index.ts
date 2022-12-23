import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors'
import {router, router_families} from './routes/'
import './config'
import { environment } from './config';
import { cleanBodyMiddleware } from './middleware';

const app = express();
const port = 3001;

export const root= __dirname

app.use(cors())

app.use(express.json())

require('./db')

app.get('/', (req, res) => {
  res.send('App running correctly');
});

app.use('/', router)
app.use('/', cleanBodyMiddleware, router_families)

app.use(express.static('uploads'))

app.listen(port, () => {
  return console.log(`Express is listening at ${port}`);
});