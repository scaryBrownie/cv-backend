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
git clone https://github.com/fatihacan/cv-backend.git
cd cv-backend
npm install
```

Create a `.env` file in the root:

```
PORT=5001
MONGO_URI=your_mongo_uri
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=your_redis_password
API_KEY=super_secret_api_key
FRONTEND_URL=http://localhost:5001
```

Start the server (dev):

```bash
npm run dev
```

---

## 🐳 Docker

You can run this backend with Docker. The app now starts with `src/www.mjs` (see Dockerfile).
Make sure you have MongoDB and Redis running and accessible from the container.

Build the image:

```bash
docker build -t cv-backend .
```

Run the container:

```bash
docker run --env-file .env -p 5001:5001 cv-backend
```

- Your `.env` file must be in the project root (not inside the container).
- MongoDB and Redis must be accessible from inside the container (use Docker network or external services).
- The app listens on port 5001 by default (set in `.env`).

---

## API Docs 📚

Swagger UI: [http://localhost:5001/api-docs](http://localhost:5001/api-docs)

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
