const path = require('path');
const express = require('express');
const BASE_PATH='/klage-permittering-refusjon';
const server = express();
const mustacheExpress = require('mustache-express');
const { getConfiguredTokenXClient, apiTokenExchange } = require('./tokenexchange');
const getDecorator = require('./decorator');
const Promise = require('promise');
const port = process.env.PORT || 3000;

const buildPath = path.join(__dirname,'../../build');

server.engine('html', mustacheExpress());
server.set('view engine', 'mustache');
server.set('views', buildPath);

server.get(`${BASE_PATH}/redirect-til-login`, (req, res) => {
    const loginUrl = process.env.LOGIN_URL ||
        'http://localhost:8080/klage-permittering-refusjon-api/local/cookie?redirect=http://localhost:3000/klage-permittering-refusjon';
    res.redirect(loginUrl);
});

const renderApp = decoratorFragments =>
    new Promise((resolve, reject) => {
        server.render('index.html', decoratorFragments, (err, html) => {
            if (err) {
                reject(err);
            } else {
                resolve(html);
            }
        });
    });

const startServer = async html => {
    console.log("start server");
    server.use(BASE_PATH, express.static(buildPath, {index: false}));

    const { tokenXClient, tokenXIssuer } = await getConfiguredTokenXClient();
    apiTokenExchange(server, tokenXClient, tokenXIssuer);

    setInternalEndpoints();
    server.get(`${BASE_PATH}/*`, (req, res) => {
        res.send(html);
    });
    server.listen(port, () => {
        console.log('Server listening on port', port);
    });
};

const startMockServer = () => {
    console.log("start mock server");
    server.use(BASE_PATH, express.static(buildPath));

    setInternalEndpoints();

    server.get(`${BASE_PATH}/*`, (req, res) => {
        res.sendFile(path.resolve(buildPath, 'index.html'));
    });
    server.listen(port, () => {
        console.log('Server listening on port', port);
    });
};

const setInternalEndpoints = () => {
    server.get(
        `${BASE_PATH}/internal/isAlive`,
        (req, res) => res.sendStatus(200)
    );
    server.get(
        `${BASE_PATH}/internal/isReady`,
        (req, res) => res.sendStatus(200)
    );
};

if(process.env.REACT_APP_MOCK) {
    startMockServer();

} else {
    getDecorator()
        .then(renderApp, error => {
            console.error('Kunne ikke hente dekoratør ', error);
            process.exit(1);
        })
        .then(startServer, error => {
            console.error('Kunne ikke rendre app ', error);
            process.exit(1);
        })
}