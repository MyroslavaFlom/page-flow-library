# Бібліотечний ресурсний центр

Навчальний fullstack-проєкт — вебзастосунок для управління бібліотечним каталогом книг.

## Технологічний стек

**Бекенд**
- Node.js + Express
- MongoDB + Mongoose
- Apollo Server (GraphQL)
- JWT-авторизація + bcryptjs
- Nodemailer (підтвердження email)

**Фронтенд**
- Vue 3 (Composition API)
- Vite
- Pinia (стейт-менеджмент)
- Vue Router 4
- Axios
- Tailwind CSS

## Архітектура

```
page_flow/
├── server/                  # Бекенд (порт 5000)
│   ├── config/              # БД, JWT, SMTP
│   ├── controllers/         # auth, books, authors, categories
│   ├── graphql/             # Apollo схема та резолвери
│   ├── middleware/          # auth, admin, error
│   ├── models/              # User, Book, Author, Category
│   ├── routes/              # REST маршрути
│   ├── services/            # book.service, email.service
│   ├── utils/               # sendSuccess, sendError
│   ├── app.js
│   └── index.js
└── client/                  # Фронтенд (порт 5173)
    └── src/
        ├── api/             # axios-клієнти для кожного ресурсу
        ├── components/      # BookCard, SearchFilter, Pagination, NavBar, BookForm
        ├── router/          # маршрути + guard для адміна
        ├── stores/          # auth.store, books.store (з polling)
        └── views/           # сторінки + admin-панель
```

## Запуск

### Передумови

- Node.js 18+
- MongoDB (локально або Atlas)

### Бекенд

```bash
cd server
cp ../.env.example ../.env   # заповнити реальними значеннями
npm install
npm run dev
```

### Фронтенд

```bash
cd client
npm install
npm run dev
```

Фронтенд запускається на `http://localhost:5173` і проксує `/api` та `/graphql` на порт 5000.

## Змінні середовища

Створіть файл `.env` у корені проєкту на основі `.env.example`:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/library
JWT_SECRET=your_super_secret_key_change_in_production
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your@email.com
SMTP_PASS=your_app_password
CLIENT_URL=http://localhost:5173
```

## API

### REST

| Метод | Маршрут | Доступ | Опис |
|-------|---------|--------|------|
| GET | `/api/health` | публічний | Перевірка сервера |
| POST | `/api/auth/register` | публічний | Реєстрація |
| POST | `/api/auth/login` | публічний | Вхід |
| GET | `/api/auth/verify-email/:token` | публічний | Підтвердження email |
| GET | `/api/auth/me` | user/admin | Поточний користувач |
| GET | `/api/books` | публічний | Список книг (пошук, фільтри, пагінація) |
| GET | `/api/books/:id` | публічний | Одна книга |
| POST | `/api/books` | admin | Створити книгу |
| PUT | `/api/books/:id` | admin | Оновити книгу |
| DELETE | `/api/books/:id` | admin | Видалити книгу |
| PATCH | `/api/books/:id/toggle` | admin | Змінити активність |
| GET | `/api/authors` | публічний | Список авторів |
| POST | `/api/authors` | admin | Створити автора |
| PUT | `/api/authors/:id` | admin | Оновити автора |
| DELETE | `/api/authors/:id` | admin | Видалити автора |
| PATCH | `/api/authors/:id/toggle` | admin | Змінити активність |
| GET | `/api/categories` | публічний | Список категорій |
| POST | `/api/categories` | admin | Створити категорію |
| PUT | `/api/categories/:id` | admin | Оновити категорію |
| DELETE | `/api/categories/:id` | admin | Видалити категорію |
| PATCH | `/api/categories/:id/toggle` | admin | Змінити активність |

### GraphQL

Endpoint: `http://localhost:5000/graphql`

Підтримує ті самі операції через Apollo Server. Apollo Sandbox доступний при відкритті endpoint у браузері.

**Приклад query:**
```graphql
query {
  books(page: 1, limit: 10) {
    books { id title author { firstName lastName } category { name } isActive }
    total
    totalPages
  }
}
```

**Приклад mutation (потребує токен у заголовку):**
```graphql
mutation {
  login(email: "admin@example.com", password: "password") {
    token
    user { firstName role }
  }
}
```

## Функціональність

### Публічна частина
- Каталог книг із пошуком за назвою, фільтрацією по автору та категорії
- Пагінація (12 книг на сторінку)
- Автоматичне оновлення кожні 10 секунд (без перезавантаження сторінки)
- Реєстрація з підтвердженням email
- Вхід в систему

### Адмін-панель (`/admin/*`)
- Управління книгами: створення, редагування, видалення, toggle активності
- Управління авторами
- Управління категоріями
- Доступна тільки для користувачів з роллю `admin`

## Безпека

- Паролі хешуються через bcryptjs (salt rounds: 12)
- JWT-токени з терміном дії 7 днів
- Helmet.js для HTTP-заголовків
- Rate limiting: 100 запитів / 15 хвилин
- CORS налаштований на `CLIENT_URL`
- Email верифікується перед першим входом (токен дійсний 24 години)