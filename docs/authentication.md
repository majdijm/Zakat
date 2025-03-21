# Authentication System Documentation

## Overview

The Zakat Manager application uses Supabase for authentication and user management. This document explains how the authentication system works and how to implement it in your own projects.

## Components

### AuthContext

The `AuthContext` provides authentication state and functions to the entire application. It is implemented in `src/components/auth/AuthContext.tsx`.

Key features:
- User state management
- Sign in, sign up, and sign out functions
- Session persistence
- Supabase client access

### Protected Routes

The `ProtectedRoute` component ensures that only authenticated users can access certain routes. It is implemented in `src/components/auth/ProtectedRoute.tsx`.

When a user tries to access a protected route:
1. If the user is authenticated, they can access the route
2. If the user is not authenticated, they are redirected to the login page
3. The current location is saved so the user can be redirected back after login

### Login and Registration

The application provides two components for user authentication:
- `Login.tsx`: Allows existing users to sign in
- `Register.tsx`: Allows new users to create an account

## Database Structure

When a user registers, the following happens:
1. A new record is created in Supabase's `auth.users` table
2. A trigger automatically creates a corresponding record in the `profiles` table
3. Row Level Security (RLS) policies ensure users can only access their own data

## Implementation Guide

### Setting Up Authentication

1. Initialize the AuthProvider in your main App component:

```tsx
function App() {
  return (
    <AuthProvider>
      <Router>
        {/* Your routes here */}
      </Router>
    </AuthProvider>
  );
}
```

2. Use the auth context in your components:

```tsx
import { useAuth } from './path/to/AuthContext';

function MyComponent() {
  const { user, signIn, signOut } = useAuth();
  
  // Now you can use these functions and state
  return (
    <div>
      {user ? (
        <button onClick={signOut}>Sign Out</button>
      ) : (
        <button onClick={() => signIn('email@example.com', 'password')}>Sign In</button>
      )}
    </div>
  );
}
```

3. Protect routes that require authentication:

```tsx
<Route 
  path="/protected-route" 
  element={
    <ProtectedRoute>
      <ProtectedComponent />
    </ProtectedRoute>
  } 
/>
```

## Security Considerations

1. Never store sensitive information in local storage or cookies without encryption
2. Always use HTTPS in production
3. Implement proper Row Level Security (RLS) policies in Supabase
4. Set appropriate session timeouts
5. Use strong password requirements

## Troubleshooting

### Common Issues

1. **User is not redirected after login**
   - Check that the navigation is working correctly
   - Ensure the auth state is being updated properly

2. **Authentication state is lost on page refresh**
   - Make sure the Supabase session persistence is configured correctly

3. **User can access protected routes without authentication**
   - Verify that all protected routes are wrapped with the `ProtectedRoute` component
   - Check that the auth state is being correctly checked
