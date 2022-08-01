"use strict";
// When starting this project by using `npm run dev`, this server script
// will be compiled using tsc and will be running concurrently along side webpack-dev-server
// visit https://127.0.0.1:8080
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// In the production environment we don't use the webpack-dev-server, so instead type,
// npm run build        (this creates the production version of bundle.js and places it in ./dist/client/)
// tsc -p ./src/server  (this compiles ./src/server/server.ts into ./dist/server/server.js)
// npm start            (this starts nodejs with express and serves the ./dist/client folder)
// visit http://127.0.0.1:3001
//import dotenv from 'dotenv'
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const http_1 = __importDefault(require("http"));
// import socketIO from 'socket.io'
// import Game from './game'
//dotenv.config({path: __dirname +'/.env'})
//dotenv.config()
console.log('process.env.PORT = ' + process.env.PORT);
const port = process.env.PORT || 3001;
class App {
    //private io: socketIO.Server
    constructor(port) {
        this.port = port;
        const app = (0, express_1.default)();
        app.use(express_1.default.static(path_1.default.join(__dirname, '../client')));
        this.server = new http_1.default.Server(app);
        //this.io = new socketIO.Server(this.server)
        //new Game(this.io)
    }
    Start() {
        this.server.listen(this.port, () => {
            console.log(`Server listening on port ${this.port}.`);
        });
    }
}
new App(port).Start();
