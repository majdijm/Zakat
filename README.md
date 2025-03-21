# Zakat Manager

A comprehensive web application for managing assets and calculating Zakat according to Islamic principles. Built with React, TypeScript, and Supabase.

## Features

- **User Authentication**: Secure login and registration system
- **Asset Management**: Add, edit, and delete various types of assets
- **Zakat Calculator**: Calculate Zakat based on your assets and current gold prices
- **Asset Inventory**: Track your assets in detail
- **Historical Records**: View past Zakat calculations
- **Islamic Guidelines**: Reference for Zakat rules and principles
- **User Profiles**: Manage your personal information and preferences

## Technology Stack

- **Frontend**: React, TypeScript, Vite
- **UI Components**: Shadcn UI (based on Radix UI)
- **Authentication & Database**: Supabase
- **Styling**: Tailwind CSS
- **Routing**: React Router

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/zakat-manager.git
   cd zakat-manager
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Set up your Supabase database using the schema in `supabase/schema.sql`

5. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. Open your browser and navigate to `http://localhost:5173`

## Database Schema

The application uses the following tables in Supabase:

- **profiles**: User profile information
- **assets**: User assets for Zakat calculation
- **zakat_calculations**: Historical record of Zakat calculations
- **gold_prices**: Current gold prices for Nisab calculation

## Security

The application implements Row Level Security (RLS) in Supabase to ensure that users can only access their own data.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built by AIVirtus - Majdi El-Jazmawi
- Shadcn UI for the beautiful component library
- Supabase for authentication and database services
