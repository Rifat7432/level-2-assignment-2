import express from 'express';
import cors from 'cors';
import { userRoutes } from './app/user/user.route';
const app = express();
app.use(express.json());
app.use(cors());
// routes
app.use('/',userRoutes)

app.get('/', (req, res) => {
  res.json({"success":true,"massage":"welcome to Level 2 assignment 2"});
});

export default app;
