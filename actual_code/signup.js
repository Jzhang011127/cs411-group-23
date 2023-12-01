import express from 'express';
import mongoose from '/Users/tanaydamani/Documents/cs411-group-23/server.js';

const app = express();
app.use(express.json());

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
});

const User = mongoose.model('User', userSchema);

app.post('/signup', async (req, res) => {
  const { username, password, email } = req.body;

  const user = new User({ username, password, email });
  await user.save();

  res.status(200).json({ status: 'User created' });
});

app.listen(5500, () => console.log('Server is running on port 5500'));