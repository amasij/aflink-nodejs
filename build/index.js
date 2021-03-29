"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import loaders from './loaders';
var express_1 = __importDefault(require("express"));
var winston = __importStar(require("winston"));
var cors_1 = __importDefault(require("cors"));
var userController_1 = require("./controllers/userController");
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ debug: true });
var app = express_1.default();
var routes = [];
// const debugLog: debug.IDebugger = debug('app');
// await loaders.init({ app: app });
// here we are adding middleware to parse all incoming requests as JSON
app.use(express_1.default.json());
// here we are adding middleware to allow cross-origin requests
app.use(cors_1.default());
// here we are preparing the expressWinston logging middleware configuration,
// which will automatically log all HTTP requests handled by Express.js
var loggerOptions = {
    transports: [new winston.transports.Console()],
    format: winston.format.combine(winston.format.json(), winston.format.prettyPrint(), winston.format.colorize({ all: true })),
};
routes.push(new userController_1.UserController(app));
// here we are crashing on unhandled errors and spitting out a stack trace,
// but only when in debug mode
if (process.env.DEBUG) {
    process.on('unhandledRejection', function (reason) {
        // debugLog('Unhandled Rejection:', reason);
        process.exit(1);
    });
}
else {
    loggerOptions.meta = false; // when not debugging, make terse
}
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.listen(process.env.PORT, function () {
    // debugLog(`Server running at http://localhost:${process.env.PORT}`);
    routes.forEach(function (route) {
        // debugLog(`Routes configured for ${route.getName()}`);
    });
});
// debugLog("hello")
