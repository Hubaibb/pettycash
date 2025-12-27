# 💰 Petty Cash Management System

Sistem Manajemen Kas Kecil menggunakan GraphQL, Node.js, Express, MongoDB, dan Docker.

## 📋 Daftar Isi

- [Fitur](#fitur)
- [Teknologi](#teknologi)
- [Arsitektur Sistem](#arsitektur-sistem)
- [ERD (Entity Relationship Diagram)](#erd-entity-relationship-diagram)
- [Instalasi](#instalasi)
- [Penggunaan](#penggunaan)
- [API Documentation](#api-documentation)
- [Screenshot](#screenshot)
- [Kontributor](#kontributor)

## ✨ Fitur

### Fitur Utama
- ✅ **Dashboard Interaktif** - Menampilkan statistik keuangan real-time
- ✅ **Manajemen Transaksi** - Catat pemasukan dan pengeluaran
- ✅ **Manajemen User** - Kelola pengguna dengan role (admin/user)
- ✅ **Manajemen Kategori** - Kategorisasi transaksi
- ✅ **Manajemen Akun** - Kelola multiple akun keuangan
- ✅ **GraphQL API** - Query dan Mutation yang fleksibel
- ✅ **Real-time Balance** - Update saldo otomatis
- ✅ **Docker Support** - Easy deployment dengan Docker

### GraphQL Features
- **Queries**: Mendapatkan data (transactions, users, categories, accounts)
- **Mutations**: Menambah, update, dan hapus data
- **Error Handling**: Penanganan error yang komprehensif
- **Relations**: Populate data relasi antar collection

## 🛠 Teknologi

### Backend
- **Node.js** (v18+)
- **Express.js** - Web framework
- **GraphQL** - API query language
- **express-graphql** - GraphQL HTTP server middleware
- **Mongoose** - MongoDB ODM
- **MongoDB** - NoSQL database
- **dotenv** - Environment variables management
- **CORS** - Cross-Origin Resource Sharing

### Frontend
- **HTML5**
- **CSS3** - Modern styling dengan gradients
- **Vanilla JavaScript** - Fetch API untuk GraphQL queries
- **Responsive Design** - Mobile-friendly interface

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration

## 🏗 Arsitektur Sistem

```
pettycash/
├── backend/
│   ├── src/
│   │   ├── models/
│   │   │   ├── user.js          # User model
│   │   │   ├── category.js      # Category model
│   │   │   ├── account.js       # Account model
│   │   │   └── transaction.js   # Transaction model (with relations)
│   │   ├── schema.js            # GraphQL schema definition
│   │   ├── resolvers.js         # GraphQL resolvers
│   │   └── index.js             # Express server setup
│   ├── Dockerfile               # Backend container config
│   ├── docker-compose.yml       # Multi-service orchestration
│   ├── package.json             # Dependencies
│   └── .env                     # Environment variables
├── client/
│   └── index.html               # Frontend application
└── README.md                    # Documentation
```

### Modular Architecture
- **Models**: Mongoose schemas dengan validasi
- **Schema**: GraphQL type definitions (modular)
- **Resolvers**: Business logic terpisah per entity
- **Error Handling**: Comprehensive error messages
- **Database Relations**: Mongoose populate untuk join data

## 📊 ERD (Entity Relationship Diagram)

```
┌─────────────┐       ┌──────────────┐
│    User     │       │  Category    │
├─────────────┤       ├──────────────┤
│ id (PK)     │       │ id (PK)      │
│ name        │       │ name         │
│ email       │       │ description  │
│ role        │       │ created_at   │
│ created_at  │       └──────────────┘
└─────────────┘              │
       │                     │
       │                     │
       ├─────────────────────┴─────────────┐
       │                                   │
       ▼                                   ▼
┌─────────────────┐                 ┌──────────────┐
│  Transaction    │                 │   Account    │
├─────────────────┤                 ├──────────────┤
│ id (PK)         │                 │ id (PK)      │
│ date            │                 │ name         │
│ description     │                 │ balance      │
│ amount          │                 │ created_at   │
│ type            │                 └──────────────┘
│ user_id (FK)    │────────────────────────┘
│ category_id(FK) │
│ account_id (FK) │
│ created_at      │
└─────────────────┘
```

### Relasi
- **Transaction → User** (Many to One)
- **Transaction → Category** (Many to One)
- **Transaction → Account** (Many to One)

## 📦 Instalasi

### Prasyarat
- Node.js v18 atau lebih tinggi
- Docker & Docker Compose
- MongoDB (jika tidak menggunakan Docker)

### 1. Clone Repository
```bash
git clone https://github.com/Hubaibb/pettycash.git
cd pettycash
```

### 2. Setup Backend

#### Menggunakan Docker (Recommended)
```bash
cd backend

# Build dan jalankan containers
docker-compose up --build

# Atau run di background
docker-compose up -d
```

Services yang berjalan:
- Backend: http://localhost:4000
- GraphQL Playground: http://localhost:4000/graphql
- MongoDB: localhost:27017

#### Manual Setup (Tanpa Docker)
```bash
cd backend

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env dan atur MONGO_URI

# Jalankan server
npm start
```

### 3. Setup Frontend
```bash
# Buka file client/index.html di browser
# Atau gunakan live server
cd client
python3 -m http.server 8080
# Akses: http://localhost:8080
```

## 🚀 Penggunaan

### Menjalankan dengan Docker

```bash
# Start services
docker-compose up

# Stop services
docker-compose down

# View logs
docker-compose logs -f backend

# Rebuild containers
docker-compose up --build
```

### Akses Aplikasi

1. **GraphQL Playground**: http://localhost:4000/graphql
   - Test queries dan mutations
   - Lihat schema documentation

2. **Frontend Client**: Buka `client/index.html`
   - Dashboard dengan statistik
   - Form untuk CRUD operations
   - Real-time data updates

## 📖 API Documentation

### GraphQL Schema

#### Types

**User**
```graphql
type User {
  id: ID!
  name: String!
  email: String!
  role: String!
  created_at: String!
}
```

**Category**
```graphql
type Category {
  id: ID!
  name: String!
  description: String
  created_at: String!
}
```

**Account**
```graphql
type Account {
  id: ID!
  name: String!
  balance: Int!
  created_at: String!
}
```

**Transaction**
```graphql
type Transaction {
  id: ID!
  date: String!
  description: String!
  amount: Int!
  type: String!
  user: User!
  category: Category!
  account: Account!
  created_at: String!
}
```

### Queries

#### Get All Transactions
```graphql
query {
  getTransactions {
    id
    date
    description
    amount
    type
    user {
      name
      email
    }
    category {
      name
    }
    account {
      name
      balance
    }
  }
}
```

#### Get Single Transaction
```graphql
query {
  getTransaction(id: "123") {
    id
    description
    amount
  }
}
```

#### Get Transactions by Type
```graphql
query {
  getTransactionsByType(type: "income") {
    id
    description
    amount
  }
}
```

#### Get All Users
```graphql
query {
  getUsers {
    id
    name
    email
    role
  }
}
```

#### Get All Categories
```graphql
query {
  getCategories {
    id
    name
    description
  }
}
```

#### Get All Accounts
```graphql
query {
  getAccounts {
    id
    name
    balance
  }
}
```

#### Get Total Balance
```graphql
query {
  getTotalBalance
}
```

### Mutations

#### Add Transaction
```graphql
mutation {
  addTransaction(input: {
    date: "2025-12-27"
    description: "Pembelian ATK"
    amount: 150000
    type: "expense"
    user_id: "USER_ID"
    category_id: "CATEGORY_ID"
    account_id: "ACCOUNT_ID"
  }) {
    id
    description
    amount
  }
}
```

#### Add User
```graphql
mutation {
  addUser(input: {
    name: "John Doe"
    email: "john@example.com"
    role: "user"
  }) {
    id
    name
    email
  }
}
```

#### Add Category
```graphql
mutation {
  addCategory(input: {
    name: "Office Supplies"
    description: "Peralatan kantor"
  }) {
    id
    name
  }
}
```

#### Add Account
```graphql
mutation {
  addAccount(input: {
    name: "Kas Utama"
    balance: 5000000
  }) {
    id
    name
    balance
  }
}
```

#### Update Transaction
```graphql
mutation {
  updateTransaction(
    id: "TRANSACTION_ID"
    input: {
      description: "Updated description"
      amount: 200000
      type: "expense"
      user_id: "USER_ID"
      category_id: "CATEGORY_ID"
      account_id: "ACCOUNT_ID"
    }
  ) {
    id
    description
  }
}
```

#### Delete Transaction
```graphql
mutation {
  deleteTransaction(id: "TRANSACTION_ID")
}
```

### Error Handling

All resolvers include comprehensive error handling:

```javascript
// Success response
{
  "data": {
    "addTransaction": {
      "id": "123",
      "description": "Sample"
    }
  }
}

// Error response
{
  "errors": [
    {
      "message": "Error adding transaction: User not found"
    }
  ]
}
```

## 📸 Screenshot

### Dashboard
- Statistik total saldo, pemasukan, dan pengeluaran
- Tabel transaksi terbaru
- Real-time updates

### Manajemen Transaksi
- Form tambah transaksi dengan dropdown
- Tabel transaksi lengkap dengan relasi
- Fitur hapus dengan konfirmasi

### Manajemen User
- Tambah user dengan role
- List semua user
- Delete user

### Manajemen Kategori & Akun
- CRUD operations untuk kategori
- CRUD operations untuk akun
- Update balance otomatis

### GraphQL Playground
- Interactive API documentation
- Test queries dan mutations
- Schema explorer

## 🔧 Environment Variables

Buat file `.env` di folder `backend/`:

```env
# MongoDB Connection
MONGO_URI=mongodb://admin:password123@mongodb:27017/pettycash?authSource=admin

# Server Port
PORT=4000
```

Untuk MongoDB Atlas (cloud):
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/pettycash?retryWrites=true&w=majority
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process menggunakan port 4000
lsof -ti:4000 | xargs kill -9

# Atau gunakan port lain
PORT=5000 npm start
```

### MongoDB Connection Error
```bash
# Pastikan MongoDB container berjalan
docker-compose ps

# Restart MongoDB
docker-compose restart mongodb

# Check logs
docker-compose logs mongodb
```

### Node Modules Error
```bash
# Hapus dan install ulang
rm -rf node_modules package-lock.json
npm install
```

## 🧪 Testing GraphQL API

### Menggunakan GraphQL Playground

1. Buka http://localhost:4000/graphql
2. Gunakan panel kiri untuk query/mutation
3. Lihat results di panel kanan
4. Explore schema dengan Docs

### Menggunakan Postman

1. Create new POST request ke http://localhost:4000/graphql
2. Set Content-Type: application/json
3. Body (raw JSON):
```json
{
  "query": "{ getTransactions { id description amount } }"
}
```

### Menggunakan cURL
```bash
curl -X POST http://localhost:4000/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "{ getTransactions { id description } }"}'
```

## 📝 Best Practices

### GraphQL
- ✅ Modular schema definitions
- ✅ Separate resolvers by entity
- ✅ Proper error handling
- ✅ Use of relations (populate)
- ✅ Input validation

### Database
- ✅ Mongoose schema validation
- ✅ Proper indexing
- ✅ Relations dengan ObjectId
- ✅ Automatic timestamps

### Code Organization
- ✅ Separation of concerns
- ✅ Reusable components
- ✅ Environment variables
- ✅ Modular architecture

## 🤝 Kontributor

- **Achmad Fanial** - Backend Developer
- **Team IAE** - Full Stack Development

## 📄 License

This project is licensed under the MIT License.

## 🔗 Links

- Repository: https://github.com/Hubaibb/pettycash
- Documentation: [README.md](README.md)
- GraphQL API: http://localhost:4000/graphql

---

**Dibuat menggunakan Node.js, GraphQL, dan Docker**
