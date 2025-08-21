const app = require('./app/app');

const port = process.env.PORT || 5500;

app.listen(port, () => {
  console.log(`Decupla running on port ${port}`);
});
