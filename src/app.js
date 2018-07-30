import express from 'express';
import bodyParser from 'body-parser';
import ridesRouter from './routes/rides';
import authRouter from './routes/auth';

const port = process.env.PORT || 5008;
const app = express();
app.use(bodyParser.json());
app.use('/api/v1/rides', ridesRouter);
app.use('/api/v1/auth', authRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});


export default app;
