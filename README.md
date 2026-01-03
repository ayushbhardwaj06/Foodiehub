
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

---

## Complete Project Structure

```
Foodiehub/
├── actions/
│   ├── addStoragePasswordAction.ts          # Add password to storage
│   ├── changePasswordAction.ts              # Change user password
│   ├── deleteStoragePasswordAction.ts       # Delete stored password
│   ├── deleteUserAction.ts                  # Delete user account
│   ├── editStoragePasswordAction.ts         # Edit stored password
│   ├── getStoredPasswordAction.ts           # Retrieve stored passwords
│   ├── recipe-actions.ts                    # Recipe CRUD operations
│   ├── sendEmailActon.ts                    # Send email verification
│   ├── signInEmailAction.ts                 # Email sign in
│   ├── signUpEmailAction.ts                 # Email sign up
│   └── ...                                  # Other actions
├── app/
│   ├── layout.tsx                           # Root layout
│   ├── page.tsx                             # Homepage
│   ├── globals.css                          # Global styles
│   ├── admin/
│   │   ├── layout.tsx                       # Admin layout
│   │   └── dashboard/
│   │       ├── page.tsx                     # Admin dashboard
│   │       └── storage/
│   │           └── page.tsx                 # Password storage management
│   ├── api/
│   │   └── auth/
│   │       └── [...all]/
│   │           └── route.ts                 # Better-auth API routes
│   ├── auth/
│   │   ├── forgot-password/
│   │   │   ├── page.tsx                     # Forgot password page
│   │   │   └── success/
│   │   │       └── page.tsx                 # Success confirmation
│   │   ├── login/
│   │   │   ├── page.tsx                     # Login page
│   │   │   └── error/
│   │   │       └── page.tsx                 # Login error page
│   │   ├── register/
│   │   │   ├── page.tsx                     # Registration page
│   │   │   └── success/
│   │   │       └── page.tsx                 # Registration success
│   │   ├── reset-password/
│   │   │   └── page.tsx                     # Reset password page
│   │   └── verify/
│   │       ├── page.tsx                     # Email verification
│   │       └── success/
│   │           └── page.tsx                 # Verification success
│   ├── dashboard/
│   │   ├── layout.tsx                       # Dashboard layout
│   │   ├── page.tsx                         # Dashboard overview
│   │   ├── create/
│   │   │   └── page.tsx                     # Create recipe page
│   │   ├── profile/                         # User profile
│   │   └── recipes/
│   │       └── page.tsx                     # User recipes list
│   └── recipes/
│       ├── page.tsx                         # All recipes page
│       └── [id]/
│           └── page.tsx                     # Recipe detail page
├── components/
│   ├── ChangePasswordForm.tsx               # Change password form
│   ├── DashboardSidebar.tsx                 # Dashboard navigation
│   ├── DeleteRecipeButton.tsx               # Delete recipe button
│   ├── DeleteUserButton.tsx                 # Delete user button
│   ├── FeedbackCard.tsx                     # Testimonial card
│   ├── ForgotPasswordForm.tsx               # Forgot password form
│   ├── GetStartedButton.tsx                 # Call to action button
│   ├── Header.tsx                           # Header component
│   ├── LoginForm.tsx                        # Login form
│   ├── MagicLinkLoginForm.tsx               # Magic link login
│   ├── RecipeCard.tsx                       # Recipe card component
│   ├── RecipeForm.tsx                       # Recipe creation form
│   ├── RegisterForm.tsx                     # Registration form
│   ├── ResetPasswordForm.tsx                # Reset password form
│   ├── ReturnButton.tsx                     # Back button
│   ├── SendVerificationEmailForm.tsx        # Email verification form
│   ├── SignInButton.tsx                     # Social sign in button
│   ├── SignOutButton.tsx                    # Sign out button
│   ├── UpdateUserForm.tsx                   # Update profile form
│   ├── UserRoleSelect.tsx                   # Role selection dropdown
│   └── ui/
│       ├── badge.tsx                        # Badge component
│       ├── button.tsx                       # Button component
│       ├── card.tsx                         # Card component
│       ├── input.tsx                        # Input component
│       ├── label.tsx                        # Label component
│       └── sonner.tsx                       # Toast notifier
├── lib/
│   ├── argon2.ts                            # Password hashing
│   ├── auth-client.ts                       # Client-side auth
│   ├── auth.ts                              # Server-side auth
│   ├── nodemailer.ts                        # Email configuration
│   ├── permissions.ts                       # Role-based access control
│   ├── prisma.ts                            # Prisma client
│   ├── types.ts                             # TypeScript types
│   └── utils.ts                             # Utility functions
├── prisma/
│   ├── schema.prisma                        # Database schema
│   └── seed.ts                              # Database seeding
├── public/                                  # Static assets
├── middleware.ts                            # Route protection
├── package.json                             # Dependencies
├── tsconfig.json                            # TypeScript config
├── tailwind.config.mjs                      # Tailwind config
├── postcss.config.mjs                       # PostCSS config
├── next.config.ts                           # Next.js config
└── README.md                                # This file
```

---

## Entity Relationship (ER) Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                              DATABASE SCHEMA                         │
└─────────────────────────────────────────────────────────────────────┘

┌────────────────────┐          ┌────────────────────┐
│       User         │          │      Recipe        │
├────────────────────┤          ├────────────────────┤
│ id (PK)            │◄─────────│ id (PK)            │
│ name               │ 1    Many │ name               │
│ email (UNIQUE)     │          │ ingredients[]      │
│ emailVerified      │          │ instructions[]     │
│ image              │          │ prepTimeMinutes    │
│ phone              │          │ cookTimeMinutes    │
│ role               │          │ servings           │
│ banned             │          │ difficulty         │
│ banReason          │          │ cuisine            │
│ banExpires         │          │ caloriesPerServing │
│ createdAt          │          │ tags[]             │
│ updatedAt          │          │ image              │
└────────────────────┘          │ rating             │
         △                        │ reviewCount        │
         │                        │ mealType[]         │
         │ 1                      │ userId (FK)        │
         └──────Many──────────────│ createdAt          │
                                  │ updatedAt          │
                                  └────────────────────┘

┌────────────────────┐          ┌──────────────────────┐
│     Session        │          │      Account         │
├────────────────────┤          ├──────────────────────┤
│ id (PK)            │          │ id (PK)              │
│ token (UNIQUE)     │          │ accountId            │
│ expiresAt          │          │ providerId           │
│ ipAddress          │          │ accessToken          │
│ userAgent          │          │ refreshToken         │
│ impersonatedBy     │          │ idToken              │
│ userId (FK)        │          │ accessTokenExpiresAt │
│ createdAt          │          │ refreshTokenExpiresAt│
│ updatedAt          │          │ scope                │
└────────────────────┘          │ password             │
                                 │ userId (FK)          │
┌────────────────────┐          │ createdAt            │
│   Verification     │          │ updatedAt            │
├────────────────────┤          └──────────────────────┘
│ id (PK)            │
│ identifier         │          ┌──────────────────────┐
│ value              │          │     Password         │
│ expiresAt          │          ├──────────────────────┤
│ createdAt          │          │ id (PK)              │
│ updatedAt          │          │ website              │
└────────────────────┘          │ username             │
                                 │ password (encrypted) │
                                 │ ownerId (FK)         │
                                 │ createdAt            │
                                 │ updatedAt            │
                                 └──────────────────────┘

Relationships:
- User (1) ──── (Many) Recipe     : User creates recipes
- User (1) ──── (Many) Session    : User has sessions
- User (1) ──── (Many) Account    : User has accounts
- User (1) ──── (Many) Password   : User stores passwords
```

---

## Data Flow Diagram (DFD)

```
LEVEL 0 - SYSTEM CONTEXT

                        ┌─────────────────────┐
                        │   FoodieHub System  │
                        │  (Web Application)  │
                        └─────────────────────┘
                                 │
                ┌────────────────┼────────────────┐
                │                │                │
                ▼                ▼                ▼
            ┌────────┐      ┌─────────┐     ┌──────────┐
            │  User  │      │  Admin  │     │ External │
            │        │      │         │     │ Services │
            └────────┘      └─────────┘     └──────────┘
                │                │                │
                ├─ Browse         ├─ Manage      ├─ Email
                ├─ Create         ├─ Monitor     ├─ OAuth
                ├─ Authenticate   └─ Control     └─ Images


LEVEL 1 - MAIN PROCESSES

                          ┌──────────────────┐
                          │  Authentication  │
                          │    Process       │
                          └──────────────────┘
                                  ▼
                          ┌──────────────────┐
                          │  User Profile    │
                          │  Management      │
                          └──────────────────┘
                                  ▼
                          ┌──────────────────┐
                          │  Recipe CRUD     │
                          │  Operations      │
                          └──────────────────┘
                                  ▼
                          ┌──────────────────┐
                          │  Admin Control   │
                          │  Panel           │
                          └──────────────────┘


LEVEL 2 - DETAILED PROCESS FLOW

    User Input
        │
        ▼
    ┌──────────────────────┐
    │  Frontend Component  │
    │  (React)             │
    └──────────────────────┘
        │
        ▼
    ┌──────────────────────┐
    │  Server Actions      │
    │  (Next.js)           │
    └──────────────────────┘
        │
        ▼
    ┌──────────────────────┐
    │  Authentication      │
    │  Check (Middleware)  │
    └──────────────────────┘
        │
        ▼
    ┌──────────────────────┐
    │  Business Logic      │
    │  (Actions/APIs)      │
    └──────────────────────┘
        │
        ▼
    ┌──────────────────────┐
    │  Prisma ORM          │
    │  Database Queries    │
    └──────────────────────┘
        │
        ▼
    ┌──────────────────────┐
    │  PostgreSQL          │
    │  Database            │
    └──────────────────────┘
        │
        ▼
    Response Back to Client
```

---

## Database Schema (Prisma)

```prisma
// User Model
enum UserRole {
  USER        // Regular user/home cook
  ADMIN       // Administrator
  SUPERADMIN  // Super administrator
}

model User {
  id            String   @id @default(uuid())
  createdAt     DateTime
  updatedAt     DateTime
  
  // Profile Info
  name          String
  email         String    @unique
  emailVerified Boolean
  image         String?
  phone         String?
  
  // Authorization
  role          UserRole  @default(USER)
  banned        Boolean?
  banReason     String?
  banExpires    DateTime?
  
  // Relations
  sessions      Session[]
  accounts      Account[]
  passwords     Password[]
  recipes       Recipe[]
  
  @@map("users")
}

// Recipe Model
model Recipe {
  id                String   @id @default(uuid())
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  
  // Recipe Details
  name              String
  ingredients       String[]
  instructions      String[]
  prepTimeMinutes   Int
  cookTimeMinutes   Int
  servings          Int      @default(4)
  difficulty        String   // Easy, Medium, Hard
  cuisine           String   // Italian, Chinese, etc.
  caloriesPerServing Int
  tags              String[]
  mealType          String[] // Breakfast, Lunch, Dinner
  
  // Media & Ratings
  image             String
  rating            Float    @default(0)
  reviewCount       Int      @default(0)
  
  // Relations
  userId            String
  user              User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@map("recipes")
}

// Session Model
model Session {
  id              String   @id @default(uuid())
  createdAt       DateTime
  updatedAt       DateTime
  
  // Session Data
  expiresAt       DateTime
  token           String   @unique
  ipAddress       String?
  userAgent       String?
  impersonatedBy  String?
  
  // Relations
  userId          String
  user            User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@map("sessions")
}

// Account Model (for OAuth)
model Account {
  id                    String   @id @default(uuid())
  createdAt             DateTime
  updatedAt             DateTime
  
  // OAuth Provider Info
  accountId             String
  providerId            String
  accessToken           String?
  refreshToken          String?
  idToken               String?
  accessTokenExpiresAt  DateTime?
  refreshTokenExpiresAt DateTime?
  scope                 String?
  password              String?
  
  // Relations
  userId                String
  user                  User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@map("accounts")
}

// Verification Model
model Verification {
  id        String    @id @default(uuid())
  createdAt DateTime?
  updatedAt DateTime?
  
  // Verification Data
  identifier String
  value      String
  expiresAt  DateTime
  
  @@map("verifications")
}

// Password Storage Model
model Password {
  id        String   @id @default(uuid())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  // Stored Credentials
  website   String
  username  String
  password  String   // Encrypted
  
  // Relations
  ownerId   String
  owner     User     @relation(fields: [ownerId], references: [id], onDelete: Cascade)
  
  @@map("passwords")
}
```

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    FOODIEHUB ARCHITECTURE                       │
└─────────────────────────────────────────────────────────────────┘

                            ┌──────────────┐
                            │   Browser    │
                            └──────────────┘
                                  │
                    ┌─────────────┴─────────────┐
                    │                           │
                    ▼                           ▼
            ┌──────────────────┐        ┌──────────────────┐
            │   Next.js App    │        │   Static Files   │
            │   (Client)       │        │   (Images, CSS)  │
            └──────────────────┘        └──────────────────┘
                    │
                    ▼
            ┌──────────────────────────────────┐
            │   Next.js Server (App Router)    │
            ├──────────────────────────────────┤
            │ - Pages (Server Components)      │
            │ - API Routes                     │
            │ - Server Actions                 │
            │ - Middleware (Authentication)    │
            └──────────────────────────────────┘
                    │
        ┌───────────┼───────────┐
        │           │           │
        ▼           ▼           ▼
    ┌────────┐ ┌────────┐ ┌──────────┐
    │Actions │ │Prisma  │ │ External │
    │        │ │ORM     │ │ Services │
    └────────┘ └────────┘ └──────────┘
        │           │           │
        │           ▼           │
        │    ┌─────────────┐    │
        │    │ PostgreSQL  │    │
        │    │ Database    │    │
        │    └─────────────┘    │
        │                       │
        └───────────┬───────────┘
                    │
        ┌───────────┴───────────┐
        │                       │
        ▼                       ▼
    ┌──────────────┐     ┌──────────────┐
    │ Better-Auth  │     │  Nodemailer  │
    │ (OAuth)      │     │  (Email)     │
    └──────────────┘     └──────────────┘
        │                       │
        ▼                       ▼
    ┌──────────────┐     ┌──────────────┐
    │ Google       │     │ Gmail SMTP   │
    │ GitHub       │     │              │
    └──────────────┘     └──────────────┘
```

---

## Key Features Summary

| Feature | Technology | Purpose |
|---------|-----------|---------|
| **Authentication** | better-auth, Nodemailer | Secure user login/registration |
| **Database** | PostgreSQL, Prisma | Data persistence |
| **Password Hashing** | Argon2 (@node-rs) | Secure password storage |
| **UI Framework** | Tailwind CSS, Radix UI | Responsive design |
| **Notifications** | Sonner | User feedback |
| **Icons** | Lucide, React Icons | Visual elements |
| **OAuth** | Google, GitHub | Social login |
| **Email** | Nodemailer | Verification & password reset |

---

## User Roles & Permissions

```
┌─────────────┐
│    USER     │
└─────────────┘
├─ Create recipes
├─ View own recipes
├─ Edit own recipes
├─ Delete own recipes
├─ View all recipes
├─ Search recipes
└─ Update profile

┌─────────────┐
│    ADMIN    │
└─────────────┘
├─ All USER permissions
├─ Create/Edit/Delete any recipe
├─ View user list
└─ Modify user roles

┌──────────────────┐
│   SUPERADMIN     │
└──────────────────┘
├─ All permissions
├─ Ban/Unban users
├─ Delete users
├─ Set user roles
├─ Impersonate users
└─ View system stats
```

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
