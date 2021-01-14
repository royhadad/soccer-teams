const path = require('path');
const express = require('express');
const favicon = require('express-favicon');
const axios = require('axios');
require('dotenv').config();

const isDev = process.env.NODE_ENV !== 'production';

const app = express();
const buildPath = path.join(__dirname, '..', 'build');
const port = process.env.PORT || 3001;

app.use(favicon(buildPath + '/favicon.ico'));
app.use(express.static(buildPath));
app.get('/ping', function (req, res) {
    return res.send('pong');
});

const SOCCER_DATA_API_KEY = process.env.SOCCER_DATA_API_KEY;
const DEFAULT_FOOTBALL_TEAM_CREST_URL = 'https://www.designevo.com/res/templates/thumb_small/green-shield-and-football.png';
app.get('/api/soccerTeams', (req, res) => {
    axios.get('http://api.football-data.org/v2/competitions/2000/teams', {headers: {'X-Auth-Token': SOCCER_DATA_API_KEY}}).then((soccerTeamsResponse) => {
        const teams = (soccerTeamsResponse.data.teams || []).map((team) => ({
            id: String(team.id),
            name: team.name,
            founded: team.founded,
            crestUrl: team.crestUrl || DEFAULT_FOOTBALL_TEAM_CREST_URL
        }));
        return res.send(teams)
    }).catch(() => {
        res.status(500).send();
    })
})

if (!isDev) {
    app.disable('x-powered-by');
    app.get('/*', function (req, res) {
        res.sendFile(path.join(buildPath, 'index.html'));
    });
}

app.listen(port, () => console.log(`Server is up on port ${port}...`));

exports.stam = () => {
};