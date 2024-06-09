require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const port = process.env.PORT;
const app = express();
const path = require('path');
const imagePath = path.join(__dirname,'images');
app.use('/images',express.static(imagePath));

app.use(express.json());

const adminRoutes = require('./routes/Admin/index.routes');
app.use('/api-admin',adminRoutes);

const userRoutes = require('./routes/User/index.routes');
app.use('/api-user',userRoutes);

async function main ()
{
    mongoose.connect(process.env.MONGO_DB);
}

main()
.then(() => console.log(`Db is connected..........`))
.catch( err => console.log(err.message));

app.listen(port, () => {
    console.log(`\nStart server at http://localhost:${port}`);
});