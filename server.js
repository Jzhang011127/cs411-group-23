import mongoose from 'mongoose';
import express from 'express';
import dotenv from 'dotenv';

dotenv.config({ path: './config/config.env' });

const db = 'mongodb+srv://tdamani:darshdamani@test.ehu5btu.mongodb.net/?retryWrites=true&w=majority';

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.log(err));
  export default mongoose;
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

app.get('/', (req, res) => res.send('Server running'));

const PORT = process.env.PORT || 5500;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));