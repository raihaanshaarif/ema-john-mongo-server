const express = require('express')
const { MongoClient } = require('mongodb');
const cors = require('cors')
require('dotenv').config()



const app = express()
const port = process.env.PORT || 5000
// MiddleWare
app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pfshu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// console.log(uri);

async function run(){
    try{
        await client.connect()
        // console.log('database connected successfully');
        const database = client.db("emajohn");
        const productCollection = database.collection("products");

         /* Get API Started */
         app.get('/products', async(req, res) => {
            const cursor = productCollection.find({})
            const products = await cursor.toArray()
            const count = await cursor.count(); // pagination korte hole
            res.send({
                count,
                products
            })
        })


    }
    finally{
        // await client.close()
    }

}

run().catch(console.dir);




app.get('/', (req, res) => {
    res.send('Amazon server is running')
})
app.listen(port, ()  => {
    console.log('Server running in ',  port)
})