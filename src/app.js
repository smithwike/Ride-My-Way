import express from 'express';
import bodyParser from 'body-parser';
import ridesRouter from './routes/rides';
import authRouter from './routes/auth';

const port = process.env.PORT || 5008;
const app = express();

app.use(bodyParser.json());
app.use('/api/v1/rides', ridesRouter);
app.use('/api/v1/auth', authRouter);

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    err: err.message,
    error: req.app.get('env') === 'development' ? err : {},
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});


export default app;
