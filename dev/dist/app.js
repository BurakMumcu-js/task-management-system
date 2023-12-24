"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const error_middleware_1 = require("./src/middlewares/error.middleware");
const register_router_1 = __importDefault(require("./src/routes/register.router"));
const login_router_1 = __importDefault(require("./src/routes/login.router"));
const channels_router_1 = __importDefault(require("./src/routes/channels.router"));
const tasks_router_1 = __importDefault(require("./src/routes/tasks.router"));
const password_router_1 = __importDefault(require("./src/routes/password.router"));
//import config from './src/config';
const cors_2 = __importDefault(require("./src/config/cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const authenticate_middleware_1 = require("./src/middlewares/authenticate.middleware");
dotenv_1.default.config({ path: 'src/.env' });
const app = (0, express_1.default)();
const uri = process.env.MongoUri;
app.use((0, cors_1.default)(cors_2.default));
app.use(express_1.default.json());
mongoose_1.default.connect(uri).then(() => {
    console.log('db connected');
}).catch(err => {
    console.log(err);
});
app.use(authenticate_middleware_1.authenticateMiddleware);
app.use('/password', password_router_1.default);
app.use('/channel', channels_router_1.default);
app.use('/auth', register_router_1.default);
app.use('/auth', login_router_1.default);
app.use('/task', tasks_router_1.default);
app.use(error_middleware_1.mainErrorHandler);
const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
    console.log(`Port ${port} dinleme modunda...`);
});
exports.default = server;
