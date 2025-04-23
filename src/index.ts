import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import trackerRoutes from './routes/tracker.routes';
import path from 'path';


dotenv.config();
const app = express();

app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use('/api', trackerRoutes);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
