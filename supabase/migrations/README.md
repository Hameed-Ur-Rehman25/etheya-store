# Database Migrations

This directory contains SQL migration files for the Etheya Store database.

## Newsletter Subscribers Table

### Migration File
`create_newsletter_subscribers_table.sql`

### Purpose
Creates a table to store email addresses of users who subscribe to the newsletter through the website.

### How to Run the Migration

#### Option 1: Using Supabase Dashboard
1. Log in to your Supabase dashboard at https://app.supabase.com
2. Select your project
3. Navigate to the SQL Editor (left sidebar)
4. Click "New Query"
5. Copy the contents of `create_newsletter_subscribers_table.sql`
6. Paste into the SQL editor
7. Click "Run" to execute the migration

#### Option 2: Using Supabase CLI
If you have the Supabase CLI installed:
```bash
supabase db push
```

#### Option 3: Direct psql Connection
If you have direct database access:
```bash
psql -h <your-db-host> -U postgres -d postgres -f supabase/migrations/create_newsletter_subscribers_table.sql
```

### Table Schema

```sql
newsletter_subscribers (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  subscribed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE
)
```

### Security Features
- **Row Level Security (RLS)** is enabled
- Public users can INSERT (subscribe)
- Only authenticated users can SELECT (read subscriptions)
- Email addresses are stored in lowercase for consistency
- Duplicate email subscriptions are prevented by UNIQUE constraint

### For Administrators

#### Viewing Subscribers
To view all newsletter subscribers, you can:

1. **Via Supabase Dashboard:**
   - Navigate to Table Editor
   - Select `newsletter_subscribers` table
   - View all subscriber emails

2. **Via SQL Query:**
```sql
SELECT email, subscribed_at 
FROM newsletter_subscribers 
ORDER BY subscribed_at DESC;
```

3. **Export to CSV:**
```sql
COPY (SELECT email, subscribed_at FROM newsletter_subscribers ORDER BY subscribed_at DESC) 
TO '/tmp/newsletter_subscribers.csv' 
WITH CSV HEADER;
```

#### Statistics
```sql
-- Total subscribers
SELECT COUNT(*) as total_subscribers FROM newsletter_subscribers;

-- Subscribers by month
SELECT 
  DATE_TRUNC('month', subscribed_at) as month,
  COUNT(*) as new_subscribers
FROM newsletter_subscribers
GROUP BY month
ORDER BY month DESC;
```

### Integration with Application

The newsletter subscription feature is integrated into:
- **Component:** `components/newsletter.tsx`
- **API Route:** `app/api/newsletter/subscribe/route.ts`
- **Database Service:** `lib/database-service.ts`

Users can subscribe by entering their email in the newsletter section at the bottom of the homepage.

