require('dotenv').config()
const path = require('path');
const express = require('express');
const favicon = require('express-favicon');

const app = express();
const buildPath = path.join(__dirname, '..', 'build');
const port = process.env.PORT || 3000;

app.use(favicon(buildPath + '/favicon.ico'));
app.use(express.static(buildPath));
app.get('/ping', function (req, res) {
    return res.send('pong');
});


const SOCCER_DATA_API_KEY = process.env.SOCCER_DATA_API_KEY;

app.get('/api/soccerTeams', (req, res) => {
    console.log('api key:', SOCCER_DATA_API_KEY)
    if (SOCCER_DATA_API_KEY) {
        return res.send(['team 1', 'teams2', 'team3'])
    } else {
        return res.send('error!')
    }
})

app.get('/*', function (req, res) {
    res.sendFile(path.join(buildPath, 'index.html'));
});

app.listen(port, () => console.log(`Server is up on port ${port}...`));