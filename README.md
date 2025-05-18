# CV Backend API 🚀

Hey! This is a simple backend for my CV website. It's built with Node.js, Express, MongoDB, and Redis. Super basic, super fast.

## Features ✨

- Secure REST API for CV data
- MongoDB for storage
- Redis for caching
- Swagger docs
- API key protection
- Rate limiting & DDOS protection
- Jest tests

---

## Quick Start 🏁

```bash
git clone https://github.com/scaryBrownie/cv-backend.git
cd cv-backend
npm install
```

Create a `.env` file in the root:

```
PORT=3000
MONGO_URI=your_mongo_uri
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=your_redis_password
API_KEY=super_secret_api_key
FRONTEND_URL=http://localhost:3000
```

Start the server:

```bash
npm run dev
```

---

## API Docs 📚

Swagger UI: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

---

## Endpoints 🛣️

All endpoints need `x-api-key` header.

- `GET /data/get-skills?page=1` → List skills (paginated)
- `GET /data/get-education` → List education
- `GET /data/get-work` → List work experience
- `GET /data/get-projects?page=1` → List projects (paginated)
- `GET /health` → Health check

All responses are encrypted. Decrypt on frontend.

---

## Security 🔒

- Helmet for HTTP headers
- CORS (customizable)
- Rate limiting (100 req/15min)
- DDOS protection (auto-ban IP)
- Only GET allowed

---

## Testing 🧪

Run all tests:

```bash
npm test
```

---

## Logging 📋

- Winston logger (console + file)
- MongoDB & Redis connection logs

---

## Author

Fatih Acan

---

## License 🪪

MIT
