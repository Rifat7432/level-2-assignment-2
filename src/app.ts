import express from 'express';
import cors from 'cors';
import { userRoutes } from './app/user/user.route';
const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/users',userRoutes)

app.get('/', (req, res) => {
  res.send('Hello World!');
});

export default app;
