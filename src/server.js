const mongoose = require('mongoose');

const uri = 'mongodb://127.0.0.1:27017/adalinfiledb'; // Replace 'mydatabase' with your desired database name

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB locally!');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });

// Define a simple schema and model for testing
const TestingSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

const TestingModel = mongoose.model('Testing', TestingSchema);

// Insert a test document
TestingModel.create({ name: 'Alice', age: 25 })
  .then(doc => console.log('Document created:', doc))
  .catch(err => console.error('Error creating document:', err));
