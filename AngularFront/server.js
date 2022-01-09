const express = require('express');
const app = express();
app.use(requireHTTPS);

app.use(express.static('./dist/AngularFront'));

app.get('/*', function(req, res) {
  res.sendFile('index.html', {root: 'dist/AngularFront/'}
);
});

app.listen(process.env.PORT || 8080);
