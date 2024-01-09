var mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true,
  useUnifiedTopology: true, })
  .then(() => console.log('MongoDB is connected'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));
