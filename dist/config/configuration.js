"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    nodeEnv: process.env.NODE_ENV || "development",
    port: parseInt(process.env.PORT || "3001", 10),
    database: {
        uri: process.env.MONGODB_URI || "mongodb://localhost:27017/bloodlines",
    },
    jwt: {
        secret: process.env.JWT_SECRET || "your-secret-key",
        expiresIn: process.env.JWT_EXPIRATION || "7d",
        refreshSecret: process.env.JWT_REFRESH_SECRET || "refresh-secret-key",
        refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "30d",
    },
    email: {
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: Number.parseInt(process.env.SMTP_PORT || "587"),
        user: process.env.SMTP_USER || "",
        password: process.env.SMTP_PASSWORD || "",
        from: process.env.SMTP_FROM || "noreply@bloodlines.com",
    },
    axios: {
        timeout: parseInt(process.env.AXIOS_TIMEOUT || "5000", 10),
        maxRedirects: parseInt(process.env.AXIOS_MAX_REDIRECTS || "5", 10),
        baseURL: process.env.API_BASE_URL || "",
    },
    cors: {
        origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    },
    app: {
        url: process.env.APP_URL || "http://localhost:3001",
        port: Number.parseInt(process.env.PORT || "3001"),
        name: process.env.APP_NAME || "Blood Donation API",
        version: process.env.APP_VERSION || "1.0.0",
        apiPrefix: process.env.API_PREFIX || "api",
    },
});
//# sourceMappingURL=configuration.js.map