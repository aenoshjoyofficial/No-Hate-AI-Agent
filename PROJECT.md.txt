Advanced Full-Stack “No Hate AI Agent” (Supabase Backend Edition)

You are to build a production-ready, full-stack AI web platform called No Hate AI Agent, designed to detect, fact-check, and counter hate speech and misinformation online.
Use free and open-source tools, modern architecture, and create a clean, explainable, scalable AI system hosted across Vercel, Supabase, and Hugging Face Spaces.

⚙️ Technology Stack
Frontend

React.js + TypeScript

Tailwind CSS (UI styling)

Framer Motion (animations)

Recharts + D3.js (data visualization)

Vercel (free hosting and deployment)

Backend

Supabase Edge Functions (serverless API backend)

Node.js environment inside Supabase functions

Integrated Auth, API routes, and database connectivity via Supabase SDK

Cron triggers for scheduled AI checks (Supabase Functions Scheduler)

Database & Auth

Supabase PostgreSQL (free tier)

Supabase Auth for secure user management (email/password, OAuth optional)

Supabase Storage for user uploads and fact-check reference documents

AI & NLP

Hugging Face Transformers (hate speech + fake news detection)

LangChain for fact verification pipeline

FAISS for similarity-based evidence retrieval

SentenceTransformers for semantic context detection

Wikipedia API + Google Fact Check API for claim validation

Hosted AI models on Hugging Face Spaces (free)

Analytics & Forecasting

D3.js for network graphs

Neo4j AuraDB (free) for relationship insights (optional)

Prophet (Meta) for crisis trend forecasting

Notifications & Bots

Slack Webhooks for moderation alerts

Discord Webhooks for community updates

Telegram Bot API & WhatsApp Cloud API for user submissions

CI/CD

GitHub Actions for continuous integration & deployment

Auto-deploy frontend to Vercel

Auto-deploy Edge Functions to Supabase

Run Jest + Vitest test suites before deploy

🧩 System Architecture

Frontend → Backend (Supabase Edge Functions):

Users interact via React UI → calls Supabase APIs (classification, reports, fact-checking).

Backend → AI Models (Hugging Face):

Supabase function sends data to Hugging Face API → gets classification/fact-check results.

Storage & Auth:

All data securely stored in Supabase tables with row-level security (RLS).

Alerts & Analytics:

Supabase functions detect spikes → trigger Slack/Discord alerts → update frontend dashboard.

Transparency Layer:

Blockchain-based claim logs via Polygon testnet (optional, using web3.js).

🖥 Frontend Requirements (React + TypeScript)
Pages

Landing Page:

Explains No Hate AI Agent’s mission, goals, and features.

CTA → Report Misinformation / Sign In.

Login / Signup Page:

Uses Supabase Auth (email/password).

Redirect to dashboard on login.

Dashboard (Moderator View):

Display reported posts, classifications, confidence, and fact-check outcomes.

Visualizations for crisis trends (Recharts / D3).

Download transparency reports (PDF).

Report Page:

Simple form for reporting suspicious content (text/image/URL).

On submit → triggers classification + fact-check via Supabase Edge Functions.

Alerts Page:

Shows current crisis alerts (keyword trends, time spikes).

Option to subscribe to alerts via Slack/Discord.

Profile Page:

User settings, alert preferences, dark/light theme toggle.

Education Page:

Digital literacy content, AI chatbot Q&A, quizzes & badges.

API Docs Page:

Explains available public APIs (for developers using the backend).

UI/UX Design

Minimalist, responsive layout

Tailwind-based design system

Dark/light theme toggle

Framer Motion animations for transitions

Clear typography, iconography (Lucide React)

Explainable AI pop-ups showing why text was flagged

🔧 Backend Requirements (Supabase Edge Functions)
API Endpoints

POST /classify

Input: text or image URL

Output: classification (hate/fake/clean) + confidence + keywords

POST /fact-check

Input: claim text

Output: verification result + references

POST /report

Input: user report

Action: classify + fact-check + store result

GET /reports

List reports (paginated) for dashboard

GET /alerts

Retrieve active crisis alerts

POST /alerts/notify

Send notifications to Slack/Discord

GET /transparency

Return blockchain-logged verified claims

Services

Hugging Face Spaces API for inference

LangChain RAG with Wikipedia API + FAISS retrieval

Prophet-based crisis trend detection (daily scheduled function)

Slack/Discord webhooks integration

Telegram/WhatsApp bots connected via Supabase function endpoints

🗄 Database Schema (Supabase)
users

| id | email | role | created_at |

reports

| id | user_id | content | classification | confidence | fact_check | sources | created_at |

alerts

| id | keyword | count | detected_at |

transparency

| id | claim_hash | blockchain_tx | timestamp |

🤖 Integrations

Telegram Bot: /report → runs classify + fact-check → returns summarized result.

WhatsApp Bot: Similar flow using Cloud API.

Slack & Discord: Alert messages (e.g., “Spike in hate content detected in 2 hours”).

🔐 Security

Row-Level Security (RLS) on all Supabase tables

User data hashed client-side (CryptoJS)

Blockchain logging of verified claims (Polygon Mumbai testnet)

JWT-based session validation (Supabase Auth)

📊 Analytics & Forecasting

Real-time crisis trend graph (D3.js / Recharts)

Moderator accuracy metrics

Predictive hate trend forecasting (Prophet)

Weekly transparency report generation (ReportLab PDF)

🎓 Awareness & Learning

AI Chatbot: LangChain + Hugging Face chat model to teach misinformation literacy.

Gamified quiz: “Detect the Fake!” with Supabase-based scoring.

Progress badges and certificates for learners.

🧰 DevOps & Deployment

Frontend: Deploy on Vercel (auto from GitHub).

Backend: Deploy Supabase Edge Functions (auto from GitHub).

Database: Supabase hosted (free tier).

AI Models: Hosted on Hugging Face Spaces (free).

CI/CD: GitHub Actions for automated build/test/deploy pipelines.

✅ Deliverables

Frontend: Responsive React + TypeScript + Tailwind app with all pages & routes.

Backend: Supabase Edge Functions with AI, fact-check, and alert APIs.

Database: Supabase schema with RLS + auth configured.

AI Pipeline: Hugging Face Spaces + LangChain integration.

Bots: Telegram + WhatsApp functional reporting.

Analytics Dashboard: Live trend visualization & reporting tools.

Crisis Alert System: Slack/Discord notifications working.

Deployment:

Frontend → Vercel

Backend + DB → Supabase

AI → Hugging Face Spaces

Documentation:

README + setup guide

API docs (Swagger/OpenAPI)

Developer instructions (CI/CD, .env config)

🧭 Instruction for Gemini-CLI

Task:
Generate this full-stack project, including React frontend, Supabase backend (Edge Functions), database schema, AI integrations, and deployment configuration.
Use only free services (Vercel, Supabase, Hugging Face, GitHub Actions).
Ensure modular TypeScript code, accessible UI, and secure API structure.
Output a ready-to-run project suitable for real-world deployment.