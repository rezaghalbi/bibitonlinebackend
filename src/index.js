const express = require('express');
const dotenv = require('dotenv');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const customerRoutes = require('./routes/customerRoutes');
const productRoutes = require('./routes/productRoutes');
const preorderRoutes = require('./routes/preorderRoutes');
const adminRoutes = require('./routes/adminRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
dotenv.config();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/customers', customerRoutes); //ok
app.use('/products', productRoutes); //ok
app.use('/preorders', preorderRoutes); //ok
app.use('/admin', adminRoutes); //ok
app.use('/transactions', transactionRoutes);//ok

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server berjalan pada port ${process.env.PORT || 5000}`);
});
