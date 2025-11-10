# FuelEU Maritime Compliance Platform  
Full-Stack Assignment (React + Node + PostgreSQL + Prisma)

---

## 🧭 Overview
This project implements a minimal FuelEU Maritime compliance module including:

- Route baseline selection
- GHG intensity comparison visualization
- Compliance Balance (CB) calculation
- CB banking mechanism (Article 20)
- CB pooling mechanism (Article 21)

Interfaces follow **Hexagonal Architecture** ensuring clear separation of concerns.

---

## 🧱 Architecture

backend/
src/
core/ (domain logic, pure TypeScript)
adapters/ (HTTP + Prisma implementations)
infrastructure/ (Express server & config)
prisma/ (schema + migrations)

frontend/
src/
core/ (domain types + ports)
adapters/ui (React components)
adapters/infrastructure (axios + react-query)


**Core Layer ≠ React ≠ Express** (no direct dependencies)

---

## 🛠 Tech Stack

| Area | Tools |
|------|-------|
| Frontend | React + TypeScript + Tailwind + @tanstack/react-query + Recharts |
| Backend | Node.js + Express + Prisma ORM + TypeScript |
| Database | PostgreSQL |
| Testing | Jest + Supertest |

---

## 🚀 Running Locally

### 1. Backend Setup
```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev
npm run dev



### 2. Frontend Setup
cd frontend
npm install
npm run dev


# Frontend runs at:
http://localhost:5173

# Backend runs at:
http://localhost:4000

### 📡 Example API Calls
_______________________________________________________________________
| Endpoint                         | Description                      |
| -------------------------------- | -------------------------------- |
| `GET /routes`                    | Get all maritime routes          |
| `POST /routes/:id/baseline`      | Set selected route as baseline   |
| `GET /routes/comparison`         | Compare other routes to baseline |
| `GET /compliance/cb?shipId&year` | Compute Compliance Balance       |
| `POST /banking/bank`             | Store positive CB to bank        |
| `POST /banking/apply`            | Apply stored CB to deficit       |
| `POST /pools`                    | Create a CB pooling agreement    |


### 🧪 Testing
cd backend
npm run test

### 🖼 Screenshots

---

# 3) **REFLECTION.md**

```markdown
# Reflection

This project highlighted how AI-assisted development can improve productivity while still requiring human judgment and engineering discipline.

### What AI Helped With
- Generating boilerplate code (React components, Prisma models, Express routes)
- Debugging dependency errors quickly
- Clarifying business rules from FuelEU regulations

### Where Human Thinking Was Required
- Designing a **Hexagonal Architecture** to maintain separation of concerns
- Ensuring compliance balance formulas were correct
- Making sure pooling and banking rules did not violate regulatory constraints
- Testing API correctness and UI state transitions

### Efficiency Gains
- Development was approximately **2–3× faster** due to AI support
- Code consistency improved by letting AI handle repetitive scaffolding

### Future Improvements
- Add authentication & role-based access
- Add vessel analytics & historical CB charts
- Containerize the entire system with Docker + CI pipelines

### ✅ Final Step
git add .
git commit -m "docs: add AGENT_WORKFLOW, README, REFLECTION"
git push origin main
