const express = require(`express`);
const app = express();
const port = 8081;
const knex = require('knex')(require('../knexfile.js')["development"]);
var cors = require('cors')


app.use(express.json())
app.use(cors())


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

app.post('/movielist', async (req, res) => {
    const {title} = req.body
    const createMovie = {title: title}
    const movieAdded = await knex('movie_table')
        .insert(createMovie)
        .returning('*')
        res.status(200).json(movieAdded)
})

app.put('/movielist', async (req, res) => {
    const title = req.body.title
    const updateTitle = req.body.update
    knex('movie_table')
    .where({title: title})
    .update({title: updateTitle})
    .then(result => {
        knex('movie_table')
            .select('*')
            .then(data => res.status(200).json(data))
            .catch(err =>
                res.status(404).json({
                    message:
                        'The data you are looking for could not be found. Please try again'
                })
            )
    });
})

// app.delete('/movielist', (req, res) => {
//     const title = req.body.title
//     knex('movie_table')
//     .where({title: title})
//     .del()
//     .then(result => {
//         knex('movie_table')
//             .select('*')
//             .then(data => res.status(200).json(data))
//             .catch(err =>
//                 res.status(404).json({
//                     message:
//                         'The data you are looking for could not be found. Please try again'
//                 })
//             )
//     });
// })


app.listen(port, () => {
    console.log(`Server running at ${port}.  Let's see some queries!`)
})