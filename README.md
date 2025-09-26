# Tasks - A Google Tasks Clone

This is a clone of the popular Google Tasks application, built with modern web technologies. It's a beautiful and simple todo list app designed to help you stay organized and productive.

![Tasks App Screenshot](public/screenshot.png)

## ✨ Features

*   **Task Management**: Add, edit, and delete tasks with ease.
*   **Task Completion**: Mark tasks as complete to track your progress.
*   **Starring**: Star important tasks to prioritize them.
*   **Filtering & Sorting**: Filter tasks by status (all, active, completed, starred) and sort them by creation date, due date, priority, or alphabetically.
*   **Task Statistics**: View a summary of your tasks, including active, completed, starred, and total counts.
*   **Responsive Design**: A beautiful and intuitive interface that works seamlessly on desktop and mobile devices.
*   **Local Storage Persistence**: Your tasks are saved in your browser's local storage, so they'll be there when you come back.
*   **Toast Notifications**: Get feedback on your actions with non-intrusive toast notifications.

## 🛠️ Tech Stack

*   **Framework**: [Next.js](https://nextjs.org/)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **UI Components**: [Radix UI](https://www.radix-ui.com/) & [shadcn/ui](https://ui.shadcn.com/)
*   **Animations**: [Framer Motion](https://www.framer.com/motion/)
*   **State Management**: [React Hooks](https://reactjs.org/docs/hooks-intro.html)
*   **Toast Notifications**: [Sonner](https://sonner.emilkowal.ski/)

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have Node.js and pnpm installed on your machine.
*   [Node.js](https://nodejs.org/)
*   [pnpm](https://pnpm.io/installation)

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2.  **Install dependencies:**
    ```sh
    pnpm install
    ```

3.  **Run the development server:**
    ```sh
    pnpm dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

The project is organized as follows:

```
.
├── public/              # Static assets
├── src/
│   ├── app/             # Next.js App Router pages
│   ├── components/      # Reusable components
│   │   ├── todo/        # Components specific to the todo app
│   │   ├── types/       # TypeScript type definitions
│   │   └── ui/          # General-purpose UI components (from shadcn/ui)
│   ├── hooks/           # Custom React hooks
│   └── lib/             # Utility functions
├── ...
└── package.json
```

## deploy Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.