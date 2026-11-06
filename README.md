# Beyond the Bin: FoodBridge

**Good food deserves a destination, not a dustbin.**

FoodBridge is a food-surplus coordination platform designed to connect food donors with organisations that can redistribute surplus food to people who need it.

It aims to make food redistribution more organised, accessible and transparent by bringing donation submissions, NGO registrations and volunteer participation into one platform.

## The Problem

Large amounts of edible food go unused while communities continue to face food insecurity. One challenge is the gap between people and businesses with surplus food and organisations capable of distributing it.

FoodBridge explores how a simple digital platform can help bridge that gap.

## Our Solution

FoodBridge provides a central place for donors, NGOs and volunteers to register their interest and submit information.

An administrative dashboard allows authorised administrators to review submissions and update their statuses.

## Key Features

- **Food Donation:** Donors can submit surplus food information and collection details.
- **NGO Registration:** Organisations can submit their details and weekly meal capacity.
- **Volunteer Registration:** Individuals can register their interest in helping.
- **Admin Dashboard:** Administrators can review submissions across all three categories.
- **Status Management:** Administrators can update application and donation statuses.
- **Cloud Database:** Supabase stores submitted information.
- **Authentication:** The administrative dashboard is protected by Supabase authentication.

## The Journey of a Meal

FoodBridge represents a potential journey:

**Donor → FoodBridge → NGO Partner → Community**

The platform is designed to support the coordination behind this journey. Actual food collection, transportation and distribution require participating organisations and operational arrangements.

## Technology Stack

| Technology | Purpose |
|---|---|
| React | User interface |
| TypeScript | Type safety |
| Vite | Development and build tooling |
| Tailwind CSS | Styling |
| Supabase | Database and authentication |
| React Router | Page routing |
| Lucide React | Icons |
| Render | Deployment |

## Live Project

- **Website:** https://foodbridge-ekhu.onrender.com
- **GitHub:** https://github.com/Ark284574/FoodBridge
- **Admin Dashboard:** https://foodbridge-ekhu.onrender.com/admin

The admin dashboard requires authorised administrator access.

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

## Current Scope and Future Possibilities

The current implementation supports submission storage, administrator review and status updates.

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