export default () => ({
  database: {
    uri: process.env.MONGODB_URI || "mongodb://localhost:27017/bloodlines",
  },
  jwt: {
    secret: process.env.JWT_SECRET || "your-secret-key",
    expiresIn: process.env.JWT_EXPIRATION || "7d",
  },
  email: {
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number.parseInt(process.env.SMTP_PORT || "587"),
    user: process.env.SMTP_USER || "",
    password: process.env.SMTP_PASSWORD || "",
    from: process.env.SMTP_FROM || "noreply@bloodlines.com",
  },
  app: {
    url: process.env.APP_URL || "http://localhost:3001",
    port: Number.parseInt(process.env.PORT || "3001"),
  },
})
