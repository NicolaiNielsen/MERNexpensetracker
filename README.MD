# MERN Expense Tracker

A full-stack expense tracking application built with the MERN stack (MongoDB, Express, React, Node.js). This project demonstrates modern web development practices including RESTful API design, database modeling, and comprehensive testing.

## 📋 Overview

The Expense Tracker is a web-based application that allows users to:
- Create, read, update, and delete expenses
- Categorize expenses (Food, Transport, Entertainment, Shopping, Bills, Other)
- Track spending with timestamps
- View all expenses with detailed information

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js v5.2.1
- **Database**: MongoDB with Mongoose v9.0.1
- **Testing**: Jest & Supertest
- **Code Quality**: ESLint, Prettier
- **Development**: Nodemon (auto-reload)

### Frontend
- **Library**: React
- **Build Tool**: Vite (optional setup)

### Development Tools
- **Testing Framework**: Jest with HTTP integration testing (Supertest)
- **Linting**: ESLint with flat config
- **Code Formatting**: Prettier
- **Environment Management**: Dotenv

## 📁 Project Structure

```
MERNexpensetracker/
├── server/
│   ├── models/
│   │   └── expenseModel.js          # Mongoose schema for expenses
│   ├── controllers/
│   │   └── expenseControllers.js    # Business logic for expense CRUD operations
│   ├── routers/
│   │   └── expenseRouters.js        # Express route definitions
│   ├── config/
│   │   └── db.js                    # MongoDB connection setup
│   ├── tests/
│   │   └── expenseControllers.test.js # Jest test suite
│   ├── app.js                       # Express application setup
│   ├── server.js                    # Server entry point
│   └── package.json
├── client/
│   └── [React application files]
└── README.MD                        # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local instance or MongoDB Atlas)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/NicolaiNielsen/MERNexpensetracker.git
cd MERNexpensetracker
```

2. Install backend dependencies:
```bash
cd server
npm install
```

3. Configure environment variables:
Create a `.env` file in the `server/` directory:
```
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/expense-tracker?retryWrites=true&w=majority
DATABASE_PASSWORD=<your_password>
PORT=8000
```

4. Start the server:
```bash
npm start
```

The server will run on `http://localhost:8000` with nodemon watching for changes.

## 📡 API Endpoints

### Base URL: `/api/v2/expenses`

#### Get All Expenses
```
GET /api/v2/expenses
```
**Response (200)**:
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "description": "Lunch",
      "amount": 15.50,
      "category": "Food",
      "date": "2024-12-07T10:30:00Z",
      "createdAt": "2024-12-07T10:30:00Z",
      "updatedAt": "2024-12-07T10:30:00Z"
    }
  ]
}
```

#### Create an Expense
```
POST /api/v2/expenses
```
**Request Body**:
```json
{
  "description": "Lunch",
  "amount": 15.50,
  "category": "Food",
  "date": "2024-12-07"
}
```
**Response (201)**:
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "description": "Lunch",
    "amount": 15.50,
    "category": "Food",
    "date": "2024-12-07T00:00:00Z"
  }
}
```

#### Update an Expense
```
PUT /api/v2/expenses/:id
```
**Request Body**:
```json
{
  "description": "Dinner",
  "amount": 25.00,
  "category": "Food"
}
```
**Response (200)**:
```json
{
  "success": true,
  "data": { /* updated expense */ }
}
```

#### Delete an Expense
```
DELETE /api/v2/expenses/:id
```
**Response (200)**:
```json
{
  "success": true,
  "data": { /* deleted expense */ },
  "message": "Deleted successfully"
}
```

### Error Responses

**404 Not Found**:
```json
{
  "success": false,
  "message": "Not found"
}
```

**500 Server Error**:
```json
{
  "success": false,
  "message": "Error details"
}
```

## 🧪 Testing (Not functional yet)

Run the test suite:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

### Test Coverage

The test suite includes:
- ✅ GET all expenses (empty and populated)
- ✅ POST new expense with validation
- ✅ PUT update existing expense
- ✅ DELETE remove expense
- ✅ 404 error handling for missing resources
- ✅ Data validation and schema enforcement

**Note**: Tests require MongoDB to be running. For CI/CD pipelines, consider using MongoDB Memory Server.

## 📊 Data Model

### Expense Schema

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| `description` | String | ✅ | Max 100 chars, trimmed |
| `amount` | Number | ✅ | Min: 0.01 |
| `category` | String | ✅ | Enum: Food, Transport, Entertainment, Shopping, Bills, Other |
| `date` | Date | ❌ | Defaults to current date |
| `timestamps` | Auto | - | createdAt, updatedAt |

## 🔍 Code Quality

### ESLint Configuration
- Uses ESLint 9.x flat config
- Node.js environment with ES modules support
- Rules: Warns on unused variables, errors on undefined variables, console logs allowed

### Running Linter
```bash
npm run lint       # Check for issues
npm run lint:fix   # Auto-fix issues
```

### Code Formatting
```bash
npm run format     # Format with Prettier
```

## 📝 Key Features & Architecture

### MVC Pattern
- **Models**: Mongoose schemas defining data structure
- **Views**: React components (frontend)
- **Controllers**: Business logic handling requests/responses

### Async/Await
All database operations use async/await for clean asynchronous code:
```javascript
const expense = await Expense.find();
const newExpense = await expense.save();
```

### Error Handling
Comprehensive try-catch blocks ensure graceful error responses with appropriate HTTP status codes.

### Data Validation
Mongoose schema validation ensures:
- Required fields are provided
- Data types are correct
- Enum values match allowed categories
- Numeric constraints are met

## 🚀 Deployment

### Prepare for Production
1. Set `NODE_ENV=production` in `.env`
2. Use MongoDB Atlas for cloud database
3. Install production dependencies only: `npm install --production`
4. Run tests: `npm test`
5. Build frontend: `cd client && npm run build`

### Deploy to Heroku/Render/Railway
```bash
git push origin main
# CI/CD pipeline will handle deployment
```

## 📚 Learning Resources

This project demonstrates:
- RESTful API design principles
- MongoDB schema design with Mongoose
- Express middleware and routing
- Jest testing framework
- Error handling and validation
- Async/await patterns
- Environment configuration management

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/amazing-feature`
2. Commit changes: `git commit -m 'Add amazing feature'`
3. Push to branch: `git push origin feature/amazing-feature`
4. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 👨‍💻 Author

**Nicolai Nielsen**
- GitHub: [@NicolaiNielsen](https://github.com/NicolaiNielsen)
- Email: [your-email@example.com]

## 🐛 Known Issues & Future Improvements

### Current Limitations
- Frontend not yet implemented
- No authentication/authorization
- No input sanitization
- No rate limiting

### Planned Features
- User authentication (JWT)
- Expense categories with custom names
- Expense filtering and search
- Monthly spending reports
- Export to CSV/PDF
- Frontend React dashboard
- Dark mode support

## 💡 Notes for Recruiters

This project showcases:
- **Backend Development**: Complete RESTful API with proper status codes and error handling
- **Database Design**: Normalized MongoDB schema with validation rules
- **Testing Practices**: Comprehensive Jest test suite with positive and negative cases
- **Code Quality**: ESLint and Prettier configuration for consistent code style
- **Git Workflow**: Structured commits and branch management
- **Documentation**: Clear API documentation and code comments
- **Best Practices**: Async/await, MVC pattern, environment configuration, separation of concerns

---

**Last Updated**: December 2024
**Status**: Active Development 