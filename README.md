# 🤖 AI Chatbot App

A full-stack AI chatbot application built with **FastAPI**, **Groq (LLaMA 3.1)**, **Supabase Auth**, and a vanilla JS frontend.

---

## 🗂️ Project Structure

```
chatbot-app/
├── app/
│   ├── core/
│   │   └── config.py          # Environment config (API keys)
│   ├── db/
│   │   ├── database.py        # SQLAlchemy engine & session
│   │   └── models.py          # Chat & Message DB models
│   ├── routes/
│   │   └── chat.py            # POST /chat endpoint
│   ├── schemas/
│   │   └── chat.py            # Pydantic request schemas
│   ├── services/
│   │   └── groq_service.py    # Groq AI API integration
│   └── main.py                # FastAPI app entry point
├── frontend/
│   ├── index.html             # Chat UI
│   ├── script.js              # Supabase auth + chat logic
│   └── style.css              # Glassmorphism UI styles
├── .env                       # Environment variables (DO NOT COMMIT)
├── .gitignore
├── requirements.txt
└── README.md
```

---

## ✨ Features

- 💬 Real-time AI chat powered by **Groq's LLaMA 3.1 8B Instant** model
- 🔐 User authentication (register/login/logout) via **Supabase**
- 🧠 Conversation memory — last 10 messages sent as context
- 🗄️ Chat history persisted in **PostgreSQL** (SQLAlchemy)
- 🆕 New chat session support
- 🎨 Glassmorphism dark UI with smooth animations

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Backend | FastAPI (Python) |
| AI Model | Groq — LLaMA 3.1 8B Instant |
| Database | PostgreSQL (SQLAlchemy) |
| Auth | Supabase |
| Frontend | HTML, CSS, Vanilla JS |

---

## ⚙️ Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/Naveen-20070227/chatbot-app.git
cd chatbot-app
```

### 2. Create and activate a virtual environment

```bash
python -m venv .venv

# Windows
.venv\Scripts\activate

# macOS/Linux
source .venv/bin/activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
pip install psycopg2-binary
```

### 4. Create the PostgreSQL database

```sql
CREATE DATABASE chatbot_db;
```

### 5. Configure environment variables

Create a `.env` file in the root directory:

```env
GROQ_API_KEY=your_groq_api_key_here
DATABASE_URL=postgresql://username:password@localhost:5432/chatbot_db
```

> - Get your Groq API key at [console.groq.com](https://console.groq.com)
> - Replace `username`, `password`, and `chatbot_db` with your actual PostgreSQL credentials
> - For cloud PostgreSQL (Supabase, Neon, Railway), paste the connection string directly

### 6. Run the backend

```bash
uvicorn app.main:app --reload
```

The API will be available at `http://127.0.0.1:8000`

### 7. Open the frontend

Open `frontend/index.html` directly in your browser, or serve it with any static file server.

---

## 🔌 API Reference

### `POST /chat`

Send a message and receive an AI reply.

**Request Body:**
```json
{
  "message": "Hello!",
  "session_id": "user_abc123"
}
```

**Response:**
```json
{
  "reply": "Hi! How can I help you today?"
}
```

---

## 🔐 Authentication

This app uses **Supabase** for user authentication. To set up:

1. Create a project at [supabase.com](https://supabase.com)
2. Copy your **Project URL** and **anon public key**
3. Update the Supabase credentials in `frontend/script.js`

---

## 🚀 Deployment

### Backend (e.g., Railway / Render)

- Set environment variables (`GROQ_API_KEY`, `DATABASE_URL`) in your hosting platform
- Use the start command: `uvicorn app.main:app --host 0.0.0.0 --port 8000`
- Use a cloud PostgreSQL service (Supabase, Neon, or Railway) and update `DATABASE_URL` accordingly

### Frontend

- Deploy `frontend/` to **Netlify**, **Vercel**, or **GitHub Pages**
- Update the API URL in `script.js` from `http://127.0.0.1:8000` to your deployed backend URL

---

## 📦 Requirements

See `requirements.txt`. Key dependencies:

- `fastapi`
- `uvicorn`
- `sqlalchemy`
- `psycopg2-binary`
- `groq`
- `python-dotenv`

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
