# Todo List API

A RESTful API for managing todo lists and items, built with TypeScript, Express, and SQLite.

## 📋 Features

- Complete todo list management (create, read, update)
- Todo items with status tracking (PENDING, IN-PROGRESS, DONE)
- SQLite database for data persistence
- OpenAPI/Swagger documentation
- TypeScript for type safety
- Auto-generated unique IDs
- Input validation and error handling

## 🛠 Tech Stack

- TypeScript
- Node.js
- Express.js
- SQLite3
- Swagger/OpenAPI
- ts-node-dev (development)

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository

```bash
git clone [repository-url]
cd todo-api-typescript
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm run dev
```

The server will start at `http://localhost:3000`

### Production Build

```bash
# Build the project
npm run build

# Start production server
npm start
```

## 📚 API Documentation

API documentation is available at `/api-docs` when the server is running.
Visit `http://localhost:3000/api-docs` to view the interactive Swagger documentation.

### API Endpoints

#### Lists

- `GET /lists` - Get all todo lists
- `POST /lists` - Create a new todo list
- `PUT /lists/:id` - Update a todo list

#### Items

- `GET /lists/:id/items` - Get all items in a list
- `POST /lists/:id/items` - Add a new item to a list
- `PUT /lists/:listId/items/:itemId` - Update an item
- `DELETE /lists/:listId/items/:itemId` - Delete an item

## 💻 Usage Examples

### Managing Lists

```bash
# Get all lists
curl http://localhost:3000/lists

# Create a new list
curl -X POST http://localhost:3000/lists \
  -H "Content-Type: application/json" \
  -d '{
    "id": "list1",
    "name": "Shopping List",
    "description": "Groceries for the week"
  }'

# Update a list
curl -X PUT http://localhost:3000/lists/list1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Shopping List",
    "description": "Monthly groceries"
  }'
```

### Managing Items

```bash
# Get items in a list
curl http://localhost:3000/lists/list1/items

# Add new item
curl -X POST http://localhost:3000/lists/list1/items \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Buy milk"
  }'

# Update item status
curl -X PUT http://localhost:3000/lists/list1/items/[item-id] \
  -H "Content-Type: application/json" \
  -d '{
    "status": "DONE"
  }'

# Delete item
curl -X DELETE http://localhost:3000/lists/list1/items/[item-id]
```

## 🗄 Database Schema

### Lists Table

```sql
CREATE TABLE lists (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT
)
```

### Items Table

```sql
CREATE TABLE items (
  id TEXT PRIMARY KEY,
  list_id TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT CHECK(status IN ('PENDING', 'IN-PROGRESS', 'DONE')) NOT NULL,
  FOREIGN KEY(list_id) REFERENCES lists(id)
)
```

## 🧪 Testing

### Seeding Test Data

```bash
# Run the database seeder
npm run seed
```

This will populate the database with sample lists and items for testing.

## 📁 Project Structure

```
todo-api-typescript/
├── src/
│   ├── controllers/
│   │   ├── listController.ts
│   │   └── itemController.ts
│   ├── models/
│   │   └── database.ts
│   ├── routes/
│   │   └── index.ts
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   └── index.ts
│   ├── scripts/
│   │   └── mockData.ts
│   ├── app.ts
│   └── server.ts
├── dist/
├── package.json
├── tsconfig.json
└── README.md
```

## ⚙️ Environment Variables

No environment variables are required by default. The server runs on port 3000, and the SQLite database is created in the project root directory.

## 🔒 Error Handling

The API includes comprehensive error handling:

- Input validation
- Database constraints
- Not found errors
- Server errors

All errors are returned in JSON format:

```json
{
  "error": "Error message description"
}
```

## 🛡️ Limitations

- SQLite database is used for simplicity (can be replaced with other databases)
- Basic authentication is not implemented
- Rate limiting is not implemented

## 🔧 Development

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Run database seeder
npm run seed
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details

## 👥 Author

Messaoud HAMDI

## 🙏 Acknowledgments

- Express.js team
- TypeScript team
- SQLite team
- Swagger/OpenAPI team
