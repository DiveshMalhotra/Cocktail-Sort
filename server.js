const express = require('express');

const app = express();

app.use(express.static('./dist/app-cocktail-sort-system'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/app-cocktail-sort-system/'}),
);

app.listen(process.env.PORT || 8080);