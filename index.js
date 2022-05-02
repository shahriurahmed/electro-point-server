const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');

const port = process.env.PORT || 5000;



// midlewere
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.d7gqz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const itemcollection = client.db("electro-point").collection("Items");
        app.get('/items', async (req, res) => {
            const query = {};
            const cursor = itemcollection.find(query);
            const items = await cursor.toArray();
            res.send(items);
        })

    }
    finally {
        // await client.close();
    }
}

run().catch(console.dir);





app.get('/', (req, res) => {
    res.send('Running electro-point Server');
});

app.listen(port, () => {
    console.log('Listening to port', port);
})