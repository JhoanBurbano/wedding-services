import { environment } from "./config";
const { connect, set } = require('mongoose');
const { USER, PASSWORD, DATABASE } = environment.MONGO;

const URI = `mongodb+srv://${USER}:${PASSWORD}@burbanocorp.91g2g.mongodb.net/${DATABASE}?retryWrites=true&w=majority`; 

set('strictQuery', false)
connect(
	URI,
    {useNewUrlParser: true}
)
.then(()=>console.log(`Mongo DB has been conected in: ${DATABASE}`))
.catch((err: any)=>console.log(`This error has been interupt: \n${err} ${DATABASE}`));