require('dotenv').config();

const app = require('../../app');
const http = require('http');
const winston = require('../../config/winston');

const port = process.env.PORT || 3000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port); // http://localhost:3000/

server.on('listening', () => winston.info(`App running on PORT ${port}`));
