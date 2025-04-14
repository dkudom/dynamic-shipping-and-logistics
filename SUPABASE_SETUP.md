# Supabase Setup for Shipping Dashboard

This guide will help you set up Supabase authentication and database for the Shipping Dashboard application.

## Prerequisites

1. Create a Supabase account at [https://supabase.com](https://supabase.com) if you don't have one already.
2. Create a new Supabase project.

## Environment Variables

Create a `.env.local` file in the root of your project with the following variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

You can find these values in your Supabase project dashboard under Project Settings > API.

## Database Setup

1. Go to your Supabase project dashboard.
2. Navigate to the SQL Editor.
3. Create a new query and paste the contents of the `supabase-schema.sql` file.
4. Run the query to create all necessary tables and security policies.

## Authentication Setup

1. In your Supabase dashboard, go to Authentication > Settings.
2. Make sure Email Auth is enabled.
3. Configure your site URL (this should be your production URL or localhost for development).
4. If you want to use social login providers like Google, configure them in the Providers section.

## Testing

After setting up Supabase:

1. Run your application with `npm run dev`
2. Try to sign up with a new account
3. Check your Supabase dashboard to verify that:
   - A new user was created in the Auth > Users section
   - A new profile was automatically created in the Database > Tables > profiles table

## Troubleshooting

If you encounter any issues:

1. Check the browser console for errors
2. Verify your environment variables are correct
3. Make sure your Supabase project is active
4. Check that the SQL schema was applied correctly

## Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js with Supabase Auth Helpers](https://supabase.com/docs/guides/auth/auth-helpers/nextjs)
