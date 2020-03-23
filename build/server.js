"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var multer_1 = __importDefault(require("multer"));
var express_1 = __importDefault(require("express"));
var next_1 = __importDefault(require("next"));
var storage_1 = require("@google-cloud/storage");
var http_proxy_middleware_1 = require("http-proxy-middleware");
var util_1 = require("util");
var url_1 = require("url");
var app = next_1.default({ dev: process.env.NODE_ENV !== 'production' });
var handle = app.getRequestHandler();
var DEFAULT_API_BASE_URL = 'http://34.84.93.244:3000';
var BUCKET_ID = 'inustagram-images';
var apiBaseUrl = (_a = process.env.API_BASE_URL) !== null && _a !== void 0 ? _a : DEFAULT_API_BASE_URL;
// By default, the client will authenticate using the service account file
// specified by the GOOGLE_APPLICATION_CREDENTIALS environment variable and use
// the project specified by the GOOGLE_CLOUD_PROJECT environment variable. See
// https://github.com/GoogleCloudPlatform/google-cloud-node/blob/master/docs/authentication.md
// These environment variables are set automatically on Google App Engine
// 色んな環境変数が必要だけど、Google Ap Engine で自動で設定されるらしい。
// Instantiate a storage client
var storage = new storage_1.Storage();
// Multer is required to process file uploads and make them available via
// req.files.
var multer = multer_1.default({
    storage: multer_1.default.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024,
    },
});
// A bucket is a container for objects (files).
var bucket = storage.bucket(BUCKET_ID);
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var server;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, app.prepare()];
            case 1:
                _a.sent();
                server = express_1.default();
                server.use(http_proxy_middleware_1.createProxyMiddleware('/api/**', {
                    target: apiBaseUrl,
                    changeOrigin: true,
                    pathRewrite: { '/api': '/' },
                }));
                server.use(express_1.default.json({ limit: '10mb' }));
                server.post('/storage', multer.single('file'), function (req, res) {
                    if (!req.file) {
                        res.status(400).send('Nofile upload');
                    }
                    // Create a new blob in the bucket and upload the file data.
                    var blob = bucket.file(req.file.originalname);
                    var blobStream = blob.createWriteStream();
                    blobStream.on('error', function (err) {
                        throw err;
                    });
                    blobStream.on('finish', function () {
                        // The public URL can be used to directly access the file via HTTP.
                        var url = util_1.format("https://storage.googleapis.com/" + bucket.name + "/" + blob.name);
                        res.status(201).send(JSON.stringify({ url: url }));
                    });
                    blobStream.end(req.file.buffer);
                });
                server.all('*', function (req, res) {
                    var parsedUrl = url_1.parse(req.url, true);
                    handle(req, res, parsedUrl);
                });
                return [4 /*yield*/, server.listen(8080)];
            case 2:
                _a.sent();
                console.log("Ready on http://localhost:" + 8080); // eslint-disable-line no-console
                return [2 /*return*/];
        }
    });
}); })();
