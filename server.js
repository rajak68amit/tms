const app = require('./app');
const http = require('http');
require("dotenv").config();
const PORT = process.env.PORT;
const server = http.createServer(app);
console.log(process.env.PORT);
server.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
