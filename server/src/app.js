const express = require(`express`);
const app = express();
const port = 8081;
const knex = require('knex')(require('../knexfile.js')["development"]);
var cors = require('cors')


app.use(express.json())


app.get('/', (req, res) => {
    res.send('Application up and running!')
})

app.get('/movielist', cors(), (req, res) => {
    knex('movie_table')
        .select('*')
        .then(result => {
            var movie_list = result.map(movie => movie)
            res.json(movie_list);
        })
})

app.listen(port, () => {
    console.log(`Server running at ${port}.  Let's see some queries!`)
})