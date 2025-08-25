# Backend Starter - Express.js REST API

A professional, production-ready Express.js REST API with JWT authentication, MySQL database, and comprehensive error handling.

## 🚀 Features

- **Authentication & Authorization**: JWT-based authentication system
- **Database**: MySQL with Sequelize ORM
- **Security**: Helmet, CORS, Rate limiting
- **Validation**: Request validation with Joi
- **File Upload**: Multer for handling file uploads
- **Error Handling**: Centralized error handling
- **Logging**: Morgan for HTTP request logging
- **Testing**: Jest testing framework
- **Code Structure**: Clean architecture with services, controllers, middleware

## 📁 Project Structure

```
src/
├── config/          # Database and application configuration
├── controllers/     # Request handlers
├── middleware/      # Custom middleware functions
├── models/         # Database models (Sequelize)
├── routes/         # API routes
├── services/       # Business logic layer
├── utils/          # Utility functions and helpers
├── app.js          # Express application setup
└── server.js       # Server entry point

public/
└── uploads/        # File upload directory

tests/              # Test files
```

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd whatsapp-gateway-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   PORT=3001
   NODE_ENV=development
   
   DB_HOST=localhost
   DB_PORT=3306
   DB_NAME=backend_starter
   DB_USERNAME=root
   DB_PASSWORD=your_password
   
   TOKEN_SECRET=your_jwt_secret_key
   ```

4. **Database Setup**
   - Create a MySQL database named `backend_starter`
   - The application will automatically sync the database schema

5. **Start the application**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Refresh Token
```http
POST /api/auth/refresh
Authorization: Bearer <token>
```

### User Endpoints

#### Get Profile
```http
GET /api/users/profile
Authorization: Bearer <token>
```

#### Update Profile
```http
PUT /api/users/profile
Authorization: Bearer <token>
Content-Type: multipart/form-data

{
  "name": "John Updated",
  "email": "john.updated@example.com",
  "phone": "1234567890",
  "picture": <file>
}
```

### Todo Endpoints

#### Get All Todos
```http
GET /api/todos?page=1&limit=10&status=pending
Authorization: Bearer <token>
```

#### Create Todo
```http
POST /api/todos
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Complete project",
  "description": "Finish the backend API development",
  "deadline": "2024-12-31T23:59:59.000Z",
  "status": "pending"
}
```

#### Get Todo by ID
```http
GET /api/todos/:id
Authorization: Bearer <token>
```

#### Update Todo
```http
PUT /api/todos/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated title",
  "status": "completed"
}
```

#### Delete Todo
```http
DELETE /api/todos/:id
Authorization: Bearer <token>
```

#### Get Todo Statistics
```http
GET /api/todos/stats
Authorization: Bearer <token>
```

### Example Endpoints

#### Health Check
```http
GET /api/example/health
```

#### Test Endpoint
```http
GET /api/example/test
Authorization: Bearer <token>
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 🔧 Development

### Code Style
- Use ES6+ features
- Follow consistent naming conventions
- Write descriptive commit messages
- Add JSDoc comments for functions

### Database Migrations
```bash
# Generate migration
npx sequelize-cli migration:generate --name migration-name

# Run migrations
npx sequelize-cli db:migrate

# Undo last migration
npx sequelize-cli db:migrate:undo
```

## 🚀 Deployment

### Environment Variables for Production
```env
NODE_ENV=production
PORT=3001
DB_HOST=your_production_db_host
DB_NAME=your_production_db_name
DB_USERNAME=your_production_db_user
DB_PASSWORD=your_production_db_password
TOKEN_SECRET=your_strong_jwt_secret
CORS_ORIGIN=https://yourdomain.com
```

### PM2 (Recommended for production)
```bash
# Install PM2
npm install -g pm2

# Start application
pm2 start src/server.js --name "backend-api"

# Monitor
pm2 monit

# Logs
pm2 logs backend-api
```

## 📝 Error Handling

The API uses consistent error response format:

```json
{
  "success": false,
  "message": "Error description",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt with salt rounds
- **Rate Limiting**: Prevents API abuse
- **CORS**: Configurable cross-origin resource sharing
- **Helmet**: Security headers
- **Input Validation**: Joi schema validation

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👥 Authors

- **Fajri Rinaldi Chan** - *Initial work*

## 🙏 Acknowledgments

- Express.js community
- Sequelize documentation
- JWT.io for token handling
- All contributors and testers
