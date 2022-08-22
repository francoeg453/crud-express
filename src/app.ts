import express, {Application ,Request, Response} from 'express'
import HandleErrors from './middlewares/HandleErrors';
import bodyParser from 'body-parser';
const db = require ('./config/config')

db()

const app : Application = express()


app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
  }))
app.use( '/api/article', require('./routes/articleRoutes') );

app.use( '/api/comment', require('./routes/commentRoutes') );
 
app.listen(5000,()=>{
    console.log('server running in the port 5000.')
})


app.use(HandleErrors)

module.exports = app