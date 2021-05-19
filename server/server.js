const express = require('express');

const app = express();
const path = require('path');

const PORT = 3000;  

const controllers = require('./controllers/SQLControllers')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log(process.env.NODE_ENV)

if (process.env.NODE_ENV === 'production'){
  app.use('/build', express.static(path.join(__dirname, '../build')));
  app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
  });
};

app.post('/test',
controllers.newUser,
(req, res) => {
  res.status(200).send(res.locals.newUser)
}
)

app.post('/test2', 
controllers.newItem,
(req, res) => {
  res.status(200).send('success')
})


app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});