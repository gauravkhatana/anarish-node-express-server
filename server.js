const http = require('http');
const app = require('./app')

const port = process.env.PORT || 3000

const server = http.createServer(app);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
  });

server.listen(port);
