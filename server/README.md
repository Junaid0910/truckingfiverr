# Server

Simple Express + lowdb/MySQL backend for local development. The server supports basic auth, program listing, profiles, enrollments, and payments (Stripe optional).

Run:

```powershell
cd server
npm install
npm run dev
```

Migrate (if using MySQL):

```powershell
cd server
npm run migrate
```

Seed (creates an admin user and sample programs):

```powershell
cd server
npm run seed
```

API:
- GET /api/health
- POST /api/auth/register { email, password }
- POST /api/auth/login { email, password }
- GET /api/programs
- POST /api/programs { title, description } (admin)
- GET /api/programs/:id
- GET /api/profiles/me (authenticated)
- POST /api/profiles/me (authenticated)
- POST /api/enrollments { programId } (authenticated)
- GET /api/enrollments/me (authenticated)
- POST /api/payments/create { amount, currency?, description? } (authenticated)
- GET /api/payments/me (authenticated)

LMS & Plans:
- GET /api/lms/courses
- POST /api/lms/courses (admin)
- POST /api/lms/courses/:courseId/modules (admin)
- POST /api/lms/courses/:courseId/modules/:moduleId/lessons (admin)
- POST /api/lms/progress { courseId,moduleId,lessonId } (authenticated)
- GET /api/lms/progress/me (authenticated)
- POST /api/lms/courses/:courseId/certificate (authenticated)

- GET /api/plans
- POST /api/plans (admin)
- POST /api/plans/:id/purchase (authenticated, creates Stripe checkout)

Billing & Certificates & Resumes:
- POST /api/billing/product (admin) - create Stripe product & price
- POST /api/billing/subscribe (authenticated) - create subscription checkout
- GET /api/billing/invoices (authenticated)
- POST /api/billing/refund (admin)
- POST /api/certificates/generate/:courseId (authenticated) - returns base64 PDF
- POST /api/resumes/upload-url (authenticated) - returns signed S3 upload url (if S3 configured)
- GET /api/resumes/search?q=.. (employer/admin)

Subscriptions & Reports:
- GET /api/subscriptions (authenticated)
- POST /api/subscriptions/:subscriptionId/cancel (admin)
- GET /api/reports/revenue (admin)
- GET /api/reports/enrollments (admin)
- POST /api/reports/notifications (admin) - schedule notifications
- GET /api/reports/notifications (admin)

Notes:
- If `MYSQL_HOST` is set in the environment, the app will attempt to use MySQL and the `migrate` script will create tables.
- If Stripe is configured via `STRIPE_SECRET_KEY`, `/api/payments/create` will create a PaymentIntent and return a `client_secret`.
