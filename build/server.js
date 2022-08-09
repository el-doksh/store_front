"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var app = (0, express_1.default)();
var port = 3000;
app.listen(port, function () {
    console.log("server is running at http://localhost:".concat(port));
});
app.use(body_parser_1.default.json());
app.get('/', function (req, res) {
    res.send('Server is running');
});
exports.default = app;
