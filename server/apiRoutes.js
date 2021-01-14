const express = require('express')
const axios = require('axios');

const soccerApiBaseUrl = 'http://api.football-data.org/v2';
const SOCCER_DATA_API_KEY = process.env.SOCCER_DATA_API_KEY;
const DEFAULT_FOOTBALL_TEAM_CREST_URL = 'https://www.designevo.com/res/templates/thumb_small/green-shield-and-football.png';

const router = express.Router();

router.get('/api/soccerTeams', (req, res) => {
    axios.get(`${soccerApiBaseUrl}/competitions/2000/teams`, {headers: {'X-Auth-Token': SOCCER_DATA_API_KEY}}).then((soccerTeamsResponse) => {
        const teams = (soccerTeamsResponse.data.teams || []).map((team) => ({
            id: String(team.id),
            name: team.name,
            founded: team.founded,
            crestUrl: team.crestUrl || DEFAULT_FOOTBALL_TEAM_CREST_URL
        }));
        return res.send(teams)
    }).catch(() => {
        return res.status(500).send();
    })
})

module.exports = {
    apiRoutes: router
}