"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const users_1 = __importDefault(require("./handler/users"));
const app = (0, express_1.default)();
const port = 3000;
app.listen(port, () => {
    console.log(`server is running at http://localhost:${port}`);
});
const corsOptions = {
    origin: "http://localhost:3000",
    optionSuccessStatus: 200
};
app.use((0, cors_1.default)(corsOptions));
app.use(body_parser_1.default.json());
app.get('/', (req, res) => {
    res.send('Server is running');
});
app.use(users_1.default);
exports.default = app;
