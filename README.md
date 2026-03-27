# AI Daily Planner

**AI Daily Planner** is a Next.js‑based productivity app that lets users interact with a conversational AI assistant to organize tasks, manage schedules, and plan their day. It combines a live chat interface with AI tool calls that can **add, complete, list, and analyze tasks**, all stored in localStorage for offline persistence.

👉 Live demo: [https://ai-daily-planner-six.vercel.app/](https://ai-daily-planner-six.vercel.app/) 

---

## 🧠 Overview

* Natural language task planning with chat
* Task management: add, complete, delete, filter
* AI tool calls — tools let the assistant perform actions (not just generate text)
* File & image uploads in chat (drag & paste support)
* AI task analysis with recommendations
* Next.js 16+ (App Router), React, and Tailwind CSS / DaisyUI
* LocalStorage persistence (no backend database needed)


---

## 🚀 Features

### 🗣️ Chat Interface

Users can have a conversation with Aria — a friendly daily planning assistant — using natural language:

* Enter requests like "Add a meeting at 2 pm" or "What should I do today?"
* Upload screenshots of calendars or notes
* The AI reads uploaded images and suggests tasks or answers questions

### 🛠️ AI Tools for Actions

The assistant uses tools to manipulate tasks:

| Tool               | Purpose                                  |
| ------------------ | ---------------------------------------- |
| **addTask**        | Save a new task                          |
| **completeTask**   | Mark a task as completed                 |
| **getTasks**       | List tasks (optionally filter by status) |
| **getCurrentTime** | AI helper to know the current date/time  |

These tools are defined with Zod schemas and invoked through the AI chat.

---

## 🧩 Technologies Used

* **Next.js 16+ (App Router)** — React framework for frontend + API
* **Tailwind CSS & DaisyUI** — utility‑first styling
* **@ai‑sdk/react & ai** — AI chat, tools, streaming
* **Zod** — tool input validation schemas
* **LocalStorage** — client storage for tasks
* **React Icons** — UI icons

---

## 📦 Getting Started

### Clone the Repo

```bash
git clone https://github.com/plinadev/ai-daily-planner.git
cd ai-daily-planner
```

### Install Dependencies

```bash
npm install
# or
pnpm install
```

### Environment Variables

This project uses the **Vercel AI Gateway** by default. Create a `.env.local` with:

```env
AI_GATEWAY_API_KEY=your_api_gateway_key_here
BLOB_READ_WRITE_TOKEN=vercel_blob_token
```

If using another provider (OpenAI, Anthropic, etc.), configure the provider keys accordingly in `lib/ai.config.ts`.

---

## 🧪 Run in Dev Mode

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view.

---

## 📂 Project Structure

```
├── app/
│   ├── api/
│   │   ├── chat/route.ts       # main chat endpoint
│   │   └── completion/route.ts # autocomplete API for task form
│   │   └── analyze/route.ts    # analyze API for task analysis
│   │   └── upload/route.ts     # upload images to vercel blob
│   ├── page.tsx                # chat + task panel layout
├── components/                 # UI components
├── context/                    # React context (tasks)
├── hooks/                      # custom hooks (attachments, persistence)
├── lib/                        # AI config helpers
├── public/                     # static assets
├── tailwind.config.js          # styling
```

---

## 💡 How the AI Works

### Chat + Tools Integration

When the user sends a message:

1. The frontend prepares a chat request including the current task list
2. The API route calls `streamText()` and includes tools
3. The AI assistant can respond normally or **call tools**
4. Tool calls result in structured output like:

```json
{ "tool": "addTask", "arguments": { "title": "Do laundry", "priority": "medium" } }
```

5. The frontend detects tool results and updates the task list accordingly

This allows the assistant to *perform actions* instead of just suggesting them.

---

## 📌 Task Autocomplete

The task creation form uses the AI for suggestions:

* Title and description autocomplete
* Uses the `useCompletion` hook
* Backend endpoint at `/api/completion`

This improves user experience during manual task input.

---
