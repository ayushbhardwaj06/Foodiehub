
## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:


You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# FoodieHub

FoodieHub is a modern, full-stack web application for discovering, sharing, and managing recipes. Built with Next.js, Prisma, and Tailwind CSS, it provides a rich user experience for food enthusiasts, home cooks, and professional chefs.

---

## Table of Contents
- Project Overview
- Features
- Tech Stack
- Folder Structure
- Database Models
- Authentication & Authorization
- How to Run
- Screenshots
- Contributors

---

## Project Overview
FoodieHub is a recipe management platform where users can:
- Browse and search thousands of recipes
- Create, edit, and delete their own recipes
- View detailed recipe pages with ingredients, instructions, nutrition, and chef info
- Register, login, and manage their profile
- Use social login (Google, GitHub)
- Reset password and verify email
- Admins can manage users and recipes

---

## Features
- **Recipe Discovery:** Search, filter, and view recipes by cuisine, difficulty, tags, and meal type
- **Recipe Creation:** Add new recipes with images, ingredients, instructions, and tags
- **User Authentication:** Email/password, magic link, Google, and GitHub login
- **Profile Management:** Update user info, change password, view personal recipes
- **Admin Dashboard:** Manage users, set roles, delete users, and view stats
- **Responsive UI:** Mobile-friendly, modern design using Tailwind CSS
- **Feedback & Notifications:** Toast messages for actions and errors

---

## Tech Stack
- **Frontend:** Next.js (App Router, Server Actions), React, Tailwind CSS, Radix UI
- **Backend:** Next.js API routes, Prisma ORM, PostgreSQL
- **Authentication:** better-auth (customizable, supports social providers)
- **Email:** Nodemailer for verification and password reset
- **Icons:** Lucide, React Icons
- **Other:** Sonner (toast notifications), clsx, tailwind-merge

---

## Folder Structure
```
Foodiehub/
├── actions/                # Server actions for recipes, auth, etc.
├── app/                    # Next.js app directory
│   ├── dashboard/          # User dashboard pages
│   ├── recipes/            # Recipe listing and details
│   ├── auth/               # Auth pages (login, register, reset, verify)
│   ├── admin/              # Admin dashboard
│   └── ...                 # Other pages
├── components/             # Reusable React components
│   ├── ui/                 # UI primitives (button, input, card, etc.)
├── lib/                    # Utility libraries (auth, prisma, permissions, etc.)
├── prisma/                 # Prisma schema and seed script
├── public/                 # Static assets
├── middleware.ts           # Route protection middleware
├── package.json            # Project dependencies and scripts
├── README.md               # Project documentation
└── ...
```

---

## Database Models
Defined in `prisma/schema.prisma`:
- **User:** id, name, email, role (USER, ADMIN, SUPERADMIN), image, phone, banned, etc.
- **Recipe:** id, name, ingredients, instructions, prep/cook time, servings, difficulty, cuisine, calories, tags, image, rating, reviewCount, mealType, userId
- **Session, Account, Verification, Password:** For authentication and password management

---

## Authentication & Authorization
- Uses `better-auth` for secure authentication
- Supports email/password, magic link, Google, and GitHub
- Email verification and password reset via Nodemailer
- Role-based access control (USER, ADMIN, SUPERADMIN)
- Middleware protects routes (dashboard, admin, profile)

---

## How to Run
1. **Install dependencies:**
	```bash
	npm install
	```
2. **Set up environment variables:**
	- `DATABASE_URL` (PostgreSQL connection)
	- `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` (Google OAuth)
	- `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` (GitHub OAuth)
	- `NODEMAILER_USER`, `NODEMAILER_APP_PASSWORD` (Email)
	- `ADMIN_EMAILS` (semicolon-separated list for admin accounts)
3. **Generate Prisma client & migrate DB:**
	```bash
	npx prisma generate
	npx prisma db push
	```
4. **Seed the database (optional):**
	```bash
	npm run seed
	```
5. **Start the development server:**
	```bash
	npm run dev
	```
6. **Open in browser:**
	[http://localhost:3000](http://localhost:3000)

---

## Screenshots
> Add screenshots of the homepage, dashboard, recipe page, admin panel, etc. for your review presentation.

---

## Contributors
- Ayush Bhardwaj (ayushbhardwaj06)
- [Add your name if you contributed]

---

## License
MIT
