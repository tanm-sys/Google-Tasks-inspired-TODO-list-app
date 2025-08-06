# Enhanced Todo Application

This is a feature-rich todo application built with Next.js, TypeScript, and Shadcn/UI. It's designed to be a modern, responsive, and user-friendly way to manage your tasks.

![Todo App Screenshot](public/screenshot.png)

## Features

- **Add, Edit, and Delete Tasks:** Easily manage your tasks with intuitive controls.
- **Complete and Star Tasks:** Mark tasks as complete or star them for importance.
- **Advanced Filtering:** Filter tasks by status (all, active, completed, starred).
- **Flexible Sorting:** Sort tasks by creation date, due date, priority, or alphabetically.
- **Due Dates:** Assign due dates to your tasks and see overdue items.
- **Task Statistics:** View a summary of your tasks, including completion percentage.
- **Responsive Design:** A clean and responsive UI that works on all screen sizes.
- **Toast Notifications:** Get feedback on your actions with non-intrusive notifications.
- **Persistent Storage:** Tasks are saved to your browser's local storage.

## Tech Stack

This project is built with a modern tech stack, including:

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **UI Components:** [Shadcn/UI](https://ui.shadcn.com/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/guide/packages/lucide-react)
- **State Management:** React Hooks & Context API
- **Forms:** [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Notifications:** [Sonner](https://sonner.emilkowal.ski/)
- **Charts:** [Recharts](https://recharts.org/)

For more details, see the [AI Development Rules](AI_RULES.md).

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You need to have [Node.js](https://nodejs.org/) (version 18 or later) and [pnpm](https://pnpm.io/) installed on your machine.

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/enhanced-todo-app.git
   cd enhanced-todo-app
   ```
2. **Install dependencies:**
    ```sh
    pnpm install
    ```
3. **Run the development server:**
    ```sh
    pnpm dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

The project structure is organized as follows:
```
.
├── public/              # Static assets
├── src/
│   ├── app/             # Next.js App Router pages
│   ├── components/      # React components
│   │   ├── todo/        # Todo-specific components
│   │   └── ui/          # Shadcn/UI components
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions
│   └── types/           # TypeScript types
├── AI_RULES.md          # Guidelines for AI development
├── next.config.ts       # Next.js configuration
└── package.json         # Project dependencies and scripts
```
## License

This project is licensed under the Apache License 2.0. See the [LICENSE](LICENSE) file for more details.

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

Please see [CONTRIBUTING.md](CONTRIBUTING.md) for more information on how to get started.

## Acknowledgments

- [Shadcn/UI](https://ui.shadcn.com/) for the fantastic UI components.
- [Lucide React](https://lucide.dev/guide/packages/lucide-react) for the beautiful icons.
- [Vercel](https://vercel.com/) for the Next.js framework.
