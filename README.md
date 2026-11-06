# Beyond the Bin: FoodBridge

**Good food deserves a destination, not a dustbin.**

FoodBridge is a food-surplus coordination platform designed to connect food donors with organisations that can redistribute surplus food to people who need it.

It aims to make food redistribution more organised, accessible and transparent by bringing donation submissions, NGO registrations and volunteer participation into one platform.

## The Problem

Large amounts of edible food go unused while communities continue to face food insecurity. One challenge is the gap between people and businesses with surplus food and organisations capable of distributing it.

FoodBridge explores how a simple digital platform can help bridge that gap.

## Our Solution

FoodBridge provides a central platform where donors, NGOs and volunteers can register their interest and submit information.

An authenticated administrative dashboard allows authorised administrators to review submissions and update their statuses. A separate public, read-only dashboard gives hackathon judges an overview of platform activity without exposing personal submission details.

## Key Features

- **Food Donation:** Donors can submit surplus food information and collection details.
- **NGO Registration:** Organisations can submit their details and weekly meal capacity.
- **Volunteer Registration:** Individuals can register their interest in helping.
- **Admin Dashboard:** Authorised administrators can review submissions across all three categories.
- **Status Management:** Administrators can update donation and application statuses.
- **Public Judge Dashboard:** Judges can view an overview of real submissions and their statuses without accessing personal information or modifying records.
- **Cloud Database:** Supabase stores submitted information.
- **Authentication:** The administrative dashboard is protected by Supabase authentication.

## The Journey of a Meal

FoodBridge represents a potential journey:

**Donor → FoodBridge → NGO Partner → Community**

The platform is designed to support the coordination behind this journey. Actual food collection, transportation and distribution require participating organisations and operational arrangements.

## Dashboards

| Dashboard | Access | Purpose |
|---|---|---|
| Admin Dashboard | Authenticated administrators | Review submissions and manage statuses |
| Judge Dashboard | Public, read-only | View submission counts, categories and statuses |

The Judge Dashboard retrieves limited submission information through a dedicated Supabase database function. It does not display donor names, email addresses or other personal submission details, and does not allow public users to modify records.

## Technology Stack

| Technology | Purpose |
|---|---|
| React | User interface |
| TypeScript | Type safety |
| Vite | Development and build tooling |
| Tailwind CSS | Styling |
| Supabase | Database and authentication |
| PostgreSQL | Database engine |
| React Router | Page routing |
| Lucide React | Icons |
| Render | Deployment |
| GitHub | Version control and source code |

## Live Project

- **Website:** https://foodbridge-ekhu.onrender.com
- **Public Judge Dashboard:** https://foodbridge-ekhu.onrender.com/judge
- **Admin Dashboard:** https://foodbridge-ekhu.onrender.com/admin
- **GitHub Repository:** https://github.com/Ark284574/FoodBridge

The admin dashboard requires authorised administrator access. The judge dashboard is publicly accessible and read-only.

## Running Locally

### 1. Clone the repository

```bash
git clone https://github.com/Ark284574/FoodBridge.git
cd FoodBridge
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

Use your own Supabase project credentials. Never commit private credentials or service-role keys.

### 4. Start the development server

```bash
npm run dev
```

### 5. Build the project

```bash
npm run build
```

## Security and Data Handling

FoodBridge uses Supabase Row Level Security (RLS) to control access to submitted data.

- Public users can submit new records.
- Public submissions are restricted to pending status.
- Administrative access requires authentication and an authorised admin account.
- Administrative actions are governed by database policies.
- The public Judge Dashboard uses a dedicated database function to expose only limited, non-personal submission information.
- Public dashboard access does not grant permission to edit or delete submissions.

## Current Scope and Future Possibilities

The current implementation supports:

- Food donation, NGO and volunteer submissions.
- Supabase database storage.
- Authenticated administrative access.
- Submission review and status management.
- A public, read-only judge dashboard.

Potential future improvements include:

- Automated donor and NGO matching.
- Pickup and delivery coordination.
- Location-based discovery.
- Notifications and collection confirmations.
- Verified distribution and impact reporting.

These are future possibilities, not features currently claimed as implemented.

## Project Vision

FoodBridge is built around a simple idea: good food should reach people rather than go to waste.

**Beyond the Bin — from surplus to significance.**