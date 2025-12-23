# BloodLines Backend - NestJS + GraphQL + MongoDB

A comprehensive backend system for the BloodLines donor onboarding platform built with NestJS, GraphQL, and MongoDB.

## Features

- **Authentication**: Sign up, login, email verification, password reset
- **Three-Step Onboarding**: Guided user registration process
- **GraphQL API**: Full GraphQL implementation for queries and mutations
- **MongoDB Integration**: Mongoose ODM for data persistence
- **Email Service**: Nodemailer integration for email notifications
- **JWT Security**: Token-based authentication with guards
- **Type Safety**: Full TypeScript support

## Project Structure

```
src/
├── modules/
│   ├── auth/          # Authentication logic
│   ├── user/          # User management
│   ├── onboarding/    # Onboarding flow
│   └── email/         # Email service
├── common/
│   ├── enums/         # BloodGroup, Genotype, Gender
│   ├── decorators/    # Custom decorators
│   ├── guards/        # JWT guards
│   ├── interfaces/    # Type definitions
│   ├── middleware/    # Express middleware
│   └── filters/       # Exception filters
├── app.module.ts      # Root module
└── main.ts            # Application bootstrap
```

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Configure environment variables in `.env`:
```
MONGODB_URI=mongodb://localhost:27017/bloodlines
JWT_SECRET=your_jwt_secret_key
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
SMTP_FROM=noreply@bloodlines.com
```

## Running the Application

### Development
```bash
npm run start:dev
```

### Production
```bash
npm run build
npm run start:prod
```

## GraphQL Queries & Mutations

### Authentication

#### Signup
```graphql
mutation {
  signup(
    email: "user@example.com"
    password: "Password123!"
    confirmPassword: "Password123!"
    fullName: "John Doe"
    gender: "Male"
    phoneNumber: "+2347032891632"
  ) {
    message
  }
}
