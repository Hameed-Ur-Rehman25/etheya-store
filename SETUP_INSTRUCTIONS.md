# Setup Instructions for Newsletter Feature

## Step 1: Configure Environment Variables

Create a `.env.local` file in the root directory with your Supabase credentials:

```bash
# Copy this template
NEXT_PUBLIC_SUPABASE_URL=your-project-url-here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### How to get your Supabase credentials:
1. Go to https://app.supabase.com
2. Select your project
3. Click on **Settings** (gear icon) in the left sidebar
4. Click on **API** under Project Settings
5. Copy the following:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **Project API keys** → `anon` `public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Example:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNjE2MTYxNiwiZXhwIjoxOTMxNzM3NjE2fQ.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## Step 2: Run the Database Migration

You need to create the `newsletter_subscribers` table in your Supabase database.

### Option A: Using Supabase Dashboard (Recommended)

1. Go to https://app.supabase.com
2. Select your project
3. Click **SQL Editor** in the left sidebar
4. Click **New Query**
5. Open the file: `supabase/migrations/create_newsletter_subscribers_table.sql`
6. Copy ALL the contents of that file
7. Paste into the SQL Editor
8. Click **Run** or press `Ctrl+Enter`
9. You should see: "Success. No rows returned"

### Option B: Using Supabase CLI

If you have Supabase CLI installed:

```bash
cd /Users/pc/Desktop/etheya-store
supabase db push
```

---

## Step 3: Verify the Setup

### Check if the table was created:

1. Go to Supabase Dashboard
2. Click **Table Editor** in the left sidebar
3. Look for `newsletter_subscribers` in the list of tables
4. If you see it, the migration was successful! ✅

### Test the subscription feature:

1. Start your development server:
```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

2. Open your browser to `http://localhost:3000`
3. Scroll to the bottom of the homepage
4. Find the newsletter section
5. Enter a test email (e.g., `test@example.com`)
6. Click **Subscribe**
7. You should see a success message ✅

### Verify the data was stored:

1. Go to Supabase Dashboard → **Table Editor**
2. Click on `newsletter_subscribers` table
3. You should see your test email there! ✅

---

## Step 4: View Your Subscribers

### Via Supabase Dashboard:

1. Go to https://app.supabase.com
2. Select your project
3. Click **Table Editor**
4. Click on `newsletter_subscribers`
5. View all subscriber emails

### Via SQL Query:

1. Go to **SQL Editor** in Supabase Dashboard
2. Run this query:

```sql
SELECT email, subscribed_at 
FROM newsletter_subscribers 
ORDER BY subscribed_at DESC;
```

---

## Step 5: Export Emails for Newsletter Campaigns

### Method 1: Export from Supabase Dashboard

1. Go to **Table Editor** → `newsletter_subscribers`
2. Click the **Download** button (or export option)
3. Save as CSV

### Method 2: Copy Emails via SQL

```sql
-- Get all emails (comma-separated)
SELECT string_agg(email, ', ') as all_emails
FROM newsletter_subscribers;
```

### Method 3: Get Email List

```sql
-- Get all emails (one per line)
SELECT email 
FROM newsletter_subscribers 
ORDER BY subscribed_at DESC;
```

Copy the results and paste into your email marketing service (Mailchimp, SendGrid, etc.)

---

## Troubleshooting

### Issue: "Failed to subscribe" error

**Check:**
1. ✅ Is `.env.local` file created with correct credentials?
2. ✅ Has the migration been run (table exists)?
3. ✅ Is the development server running?
4. ✅ Check browser console for errors
5. ✅ Check Supabase logs in Dashboard

### Issue: Table doesn't exist

**Solution:**
- Run the migration again (Step 2)
- Make sure the SQL ran successfully without errors

### Issue: Can't see subscribers in dashboard

**Solution:**
- Make sure you're logged into Supabase
- Check if you're viewing the correct project
- Verify the table name is `newsletter_subscribers`

---

## Quick Start Checklist

- [ ] Create `.env.local` with Supabase credentials
- [ ] Run the database migration
- [ ] Verify table exists in Supabase
- [ ] Start development server (`npm run dev`)
- [ ] Test subscription with a test email
- [ ] Verify email appears in database
- [ ] Test duplicate email (should show error)
- [ ] Test invalid email format (should show error)
- [ ] Export subscriber list when ready to send newsletter

---

## Security Notes

✅ The newsletter subscription system includes:
- Row Level Security (RLS) enabled
- Public can only INSERT (subscribe)
- Only authenticated users can view subscribers
- Email validation on both frontend and backend
- Duplicate email prevention
- SQL injection prevention via Supabase client

---

## Need Help?

1. Check `NEWSLETTER_IMPLEMENTATION_GUIDE.md` for detailed documentation
2. Review the migration file: `supabase/migrations/create_newsletter_subscribers_table.sql`
3. Check the code implementation:
   - Component: `components/newsletter.tsx`
   - API Route: `app/api/newsletter/subscribe/route.ts`
   - Database Service: `lib/database-service.ts`

---

**You're all set! The newsletter feature is ready to use.** 🚀

