import express from 'express';
import cors from 'cors';
import userRoutes from "./routes/user.routes.js";

const app = express();
const port = 8000;

// CORS 설정
app.use(cors({
  origin: 'http://localhost:3000',
  allowedHeaders: ['Content-Type'],
  credentials: true
}));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/users', userRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})