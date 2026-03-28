export default () => ({
  nodeEnv: process.env.NODE_ENV || "development",
  port: parseInt(process.env.PORT || "3001", 10),
  database: {
    uri: process.env.MONGODB_URI,
  },
  jwt: {
    secret: process.env.JWT_SECRET || "your-secret-key",
    expiresIn: process.env.JWT_EXPIRATION || "7d",
    refreshSecret: process.env.JWT_REFRESH_SECRET || "refresh-secret-key",
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "30d",
  },
  email: {
    apiKey: process.env.RESEND_API_KEY || "resend-api-key",
    from:
      process.env.EMAIL_FROM || "Bloodlines <noreply@bloodlinesfoundation.org>",
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
