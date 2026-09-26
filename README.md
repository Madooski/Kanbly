# Kanbly

A lightweight Kanban workspace built as a personal project. Kanbly helps users organize work through role-based workflows, planning, and task progression from active work to archive.

## Features

- Role-based onboarding (Student, Freelancer, HR/Ops, Developer, Marketer, and more) with seeded example tasks
- Kanban board with stage-based task progression using move actions
- Planning tab for tasks scheduled to start later
- Archive for completed tasks
- Per-task actions through a context menu (archive, move back, delete where applicable)
- Full-text search across task titles and tags
- Light and dark mode with a settings menu
- Confetti celebration when a task reaches the final stage

## Tech Stack

- Next.js (App Router)
- TypeScript
- Redux Toolkit
- React Context
- Tailwind CSS

## Known Limitations

- Data is stored in `localStorage`, so it doesn't sync across devices.
- Switching roles or logging out resets saved task data (by design).
- New users are seeded with demo tasks based on their selected role.
- No automated tests yet.

## Getting Started

```bash
npm install
npm run dev
```