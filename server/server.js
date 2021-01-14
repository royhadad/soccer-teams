require('dotenv').config();
const path = require('path');
const express = require('express');
const favicon = require('express-favicon');
const {apiRoutes} = require('./apiRoutes');

const isDev = process.env.NODE_ENV !== 'production';

const app = express();
const buildPath = path.join(__dirname, '..', 'build');
const port = process.env.PORT || 3001;

app.use(favicon(buildPath + '/favicon.ico'));
app.use(express.static(buildPath));
app.get('/ping', function (req, res) {
    return res.send('pong');
});

app.use(apiRoutes);

if (!isDev) {
    app.disable('x-powered-by');
    app.get('/*', function (req, res) {
        res.sendFile(path.join(buildPath, 'index.html'));
    });
}

app.listen(port, () => console.log(`Server is up on port ${port}...`));

// To avoid a typescript error regarding the { isolatedModules: true } option
module.exports = {
    dummyExport: 0
};