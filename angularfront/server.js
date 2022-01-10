const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.static('./dist/angularfront'));
app.use(cors());

app.get('/*', function(req, res) {
  res.sendFile('index.html', {root: 'dist/angularfront/'}
);
});

app.listen(process.env.PORT || 8080);
