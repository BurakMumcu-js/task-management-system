"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domainsFromEnv = process.env.CORS_DOMAINS || "";
const whitelist = domainsFromEnv.split(",").map(item => item.trim());
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin || '') !== -1 || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};
exports.default = corsOptions;
