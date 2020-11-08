const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


require('./controllers/routeController.js')(app);


const port = process.env.PORT || 8080
app.listen(port, (err) => {
    if (err){
        return console.log('ERROR', err)
    }

    console.log(`Server listening on port ${port}`)
});




