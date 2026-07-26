# Backend AI Capstone Service

A production-ready backend AI service built with Node.js, Express, Google Gemini API, and MongoDB. Designed with robust error fallbacks and a built-in evaluation harness.

## Features
- **Structured JSON Outputs:** Enforces strict JSON schemas from Google Gemini (`gemini-2.5-flash`).
- **Resilient Fallback Mechanism:** Gracefully switches to local heuristic processing if network restrictions or API failures occur.
- **Database Persistence:** Automatically logs processed AI results into MongoDB.
- **Evaluation Suite:** Includes an evaluation test script to benchmark system performance against test cases.

## Tech Stack
- **Runtime:** Node.js, Express.js
- **AI SDK:** `@google/genai` (Google Gemini)
- **Database:** MongoDB (Mongoose)

## Getting Started
1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Create a `.env` file with `PORT`, `GEMINI_API_KEY`, and `MONGO_URI`.
4. Run `npm run dev` to start the development server.
