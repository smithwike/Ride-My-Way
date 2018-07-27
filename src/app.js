import express from 'express';
import bodyParser from 'body-parser';
import ridesRouter from './routes/rides';

const port = process.env.PORT || 5008;
const app = express();

app.use(bodyParser.json());
app.use('/rides', ridesRouter);

// error handler
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {},
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});


export default app;
