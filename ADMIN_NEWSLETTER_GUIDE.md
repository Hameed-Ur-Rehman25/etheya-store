# 📧 Admin Guide: Newsletter Subscriber Management

## Quick Access to Subscribers

### 🎯 Method 1: Supabase Dashboard (Easiest)

1. **Go to:** https://app.supabase.com
2. **Login** to your account
3. **Select** your Etheya Store project
4. **Click** "Table Editor" (left sidebar)
5. **Find and click** `newsletter_subscribers` table
6. **View** all subscriber emails with timestamps

**What you'll see:**
- Email addresses
- Subscription date/time
- Unique ID for each subscriber

---

## 📊 Get Subscriber Statistics

### Total Subscriber Count

1. Go to **SQL Editor** in Supabase Dashboard
2. Click **New Query**
3. Paste and run:

```sql
SELECT COUNT(*) as total_subscribers 
FROM newsletter_subscribers;
```

### Subscribers This Month

```sql
SELECT COUNT(*) as subscribers_this_month
FROM newsletter_subscribers
WHERE subscribed_at >= DATE_TRUNC('month', CURRENT_DATE);
```

### Subscribers This Week

```sql
SELECT COUNT(*) as subscribers_this_week
FROM newsletter_subscribers
WHERE subscribed_at >= DATE_TRUNC('week', CURRENT_DATE);
```

### Growth by Month

```sql
SELECT 
  TO_CHAR(subscribed_at, 'Month YYYY') as month,
  COUNT(*) as new_subscribers
FROM newsletter_subscribers
GROUP BY TO_CHAR(subscribed_at, 'Month YYYY'), DATE_TRUNC('month', subscribed_at)
ORDER BY DATE_TRUNC('month', subscribed_at) DESC;
```

---

## 📥 Export Subscriber Emails

### Method 1: Download as CSV from Dashboard

1. Go to **Table Editor** → `newsletter_subscribers`
2. Click the **Download** or **Export** button
3. Save the CSV file
4. Open in Excel or Google Sheets

### Method 2: Get Email List (Copy & Paste)

**All emails (one per line):**
```sql
SELECT email 
FROM newsletter_subscribers 
ORDER BY subscribed_at DESC;
```

**All emails (comma-separated):**
```sql
SELECT string_agg(email, ', ') as email_list
FROM newsletter_subscribers;
```

**Recent subscribers (last 30 days):**
```sql
SELECT email, subscribed_at
FROM newsletter_subscribers
WHERE subscribed_at >= NOW() - INTERVAL '30 days'
ORDER BY subscribed_at DESC;
```

**Copy the results and paste into your email marketing tool!**

---

## 📮 Send Newsletter to Subscribers

### Step 1: Export Email List

Use one of the methods above to get your subscriber emails.

### Step 2: Choose Email Service

Popular options:
- **Mailchimp** - https://mailchimp.com (Free up to 500 subscribers)
- **SendGrid** - https://sendgrid.com
- **Mailgun** - https://mailgun.com
- **AWS SES** - https://aws.amazon.com/ses
- **ConvertKit** - https://convertkit.com

### Step 3: Import Subscribers

1. Create an account with your chosen email service
2. Create a new "Audience" or "List"
3. Import your subscriber emails
4. Create your newsletter campaign
5. Send!

### Example: Using Mailchimp

1. **Sign up** at https://mailchimp.com
2. **Create Audience** → Click "Create Audience"
3. **Import Contacts** → Upload CSV or paste emails
4. **Create Campaign** → Design your newsletter
5. **Select Audience** → Choose your imported subscribers
6. **Send** → Schedule or send immediately

---

## 🔍 Find Specific Subscribers

### Search by Email

```sql
SELECT * 
FROM newsletter_subscribers 
WHERE email LIKE '%example.com%'
ORDER BY subscribed_at DESC;
```

### Search by Date Range

```sql
SELECT email, subscribed_at
FROM newsletter_subscribers
WHERE subscribed_at BETWEEN '2024-01-01' AND '2024-12-31'
ORDER BY subscribed_at DESC;
```

---

## 🗑️ Manage Subscribers

### Remove a Subscriber (Unsubscribe)

```sql
DELETE FROM newsletter_subscribers 
WHERE email = 'user@example.com';
```

### Remove Multiple Subscribers

```sql
DELETE FROM newsletter_subscribers 
WHERE email IN ('user1@example.com', 'user2@example.com', 'user3@example.com');
```

### Remove Old/Invalid Emails

```sql
-- Remove subscribers older than 2 years (if needed)
DELETE FROM newsletter_subscribers 
WHERE subscribed_at < NOW() - INTERVAL '2 years';
```

---

## 📈 Subscriber Growth Report

### Daily Growth (Last 30 Days)

```sql
SELECT 
  DATE(subscribed_at) as date,
  COUNT(*) as new_subscribers,
  SUM(COUNT(*)) OVER (ORDER BY DATE(subscribed_at)) as total_to_date
FROM newsletter_subscribers
WHERE subscribed_at >= NOW() - INTERVAL '30 days'
GROUP BY DATE(subscribed_at)
ORDER BY date DESC;
```

### Monthly Summary

```sql
SELECT 
  TO_CHAR(subscribed_at, 'YYYY-MM') as month,
  COUNT(*) as new_subscribers,
  SUM(COUNT(*)) OVER (ORDER BY TO_CHAR(subscribed_at, 'YYYY-MM')) as cumulative_total
FROM newsletter_subscribers
GROUP BY TO_CHAR(subscribed_at, 'YYYY-MM')
ORDER BY month DESC;
```

---

## 🎨 Create Newsletter Campaign - Best Practices

### 1. Subject Line Tips
- Keep it under 50 characters
- Create urgency or curiosity
- Personalize when possible
- Avoid spam trigger words

### 2. Content Ideas
- New product launches
- Exclusive discounts for subscribers
- Fashion tips and styling guides
- Behind-the-scenes content
- Customer testimonials
- Seasonal collections

### 3. Timing
- Best days: Tuesday, Wednesday, Thursday
- Best times: 10 AM - 12 PM or 2 PM - 4 PM
- Avoid Mondays (busy) and Fridays (weekend mode)

### 4. Frequency
- Weekly: Good for active brands
- Bi-weekly: Balanced approach
- Monthly: Minimum recommended
- Don't spam: Respect your subscribers!

---

## 📋 Newsletter Campaign Checklist

Before sending your newsletter:

- [ ] Export subscriber list from database
- [ ] Import to email marketing service
- [ ] Design newsletter (mobile-responsive)
- [ ] Add unsubscribe link (required by law)
- [ ] Include company information
- [ ] Test email on different devices
- [ ] Check all links work
- [ ] Proofread content
- [ ] Send test email to yourself
- [ ] Schedule or send campaign
- [ ] Track open rates and click rates

---

## ⚖️ Legal Requirements

### CAN-SPAM Act Compliance (USA)

✅ **Include:**
- Your physical business address
- Clear "From" name and email
- Honest subject line
- Clear unsubscribe link
- Honor unsubscribe requests within 10 days

### GDPR Compliance (EU)

✅ **Ensure:**
- Clear consent was given (your signup form does this)
- Easy way to unsubscribe
- Ability to delete user data upon request
- Secure storage of email addresses (Supabase handles this)

---

## 🔐 Subscriber Data Security

Your subscriber data is protected by:
- ✅ **Supabase encryption** at rest and in transit
- ✅ **Row Level Security (RLS)** - only authenticated admins can view
- ✅ **HTTPS** for all connections
- ✅ **No public API access** to read subscriber list
- ✅ **Backup systems** via Supabase

### Best Practices:
- Don't share subscriber list publicly
- Use secure password for Supabase account
- Enable 2FA on Supabase account
- Don't commit .env.local to git
- Only give access to trusted team members

---

## 🆘 Common Admin Tasks

### Task: Export emails for Mailchimp
```sql
SELECT email 
FROM newsletter_subscribers 
ORDER BY email ASC;
```
Copy results → Mailchimp → Import Contacts → Paste

### Task: Check if specific email is subscribed
```sql
SELECT * 
FROM newsletter_subscribers 
WHERE email = 'customer@example.com';
```

### Task: Get emails subscribed in last 7 days
```sql
SELECT email, subscribed_at
FROM newsletter_subscribers
WHERE subscribed_at >= NOW() - INTERVAL '7 days'
ORDER BY subscribed_at DESC;
```

### Task: Count subscribers by domain
```sql
SELECT 
  SUBSTRING(email FROM POSITION('@' IN email) + 1) as email_domain,
  COUNT(*) as count
FROM newsletter_subscribers
GROUP BY email_domain
ORDER BY count DESC
LIMIT 10;
```

---

## 📞 Need Help?

**Documentation:**
- `SETUP_INSTRUCTIONS.md` - Initial setup guide
- `NEWSLETTER_IMPLEMENTATION_GUIDE.md` - Technical details
- `supabase/migrations/README.md` - Database info

**Common Issues:**
1. **Can't see subscribers** → Check you're logged into correct Supabase project
2. **Table not found** → Run the migration (see SETUP_INSTRUCTIONS.md)
3. **Access denied** → RLS policy requires authentication

---

## 🎯 Quick Reference Card

| Task | Location |
|------|----------|
| **View all subscribers** | Supabase → Table Editor → newsletter_subscribers |
| **Export emails** | Table Editor → Download CSV |
| **Run SQL queries** | Supabase → SQL Editor |
| **Check total count** | SQL: `SELECT COUNT(*) FROM newsletter_subscribers` |
| **Recent subscribers** | SQL: `WHERE subscribed_at >= NOW() - INTERVAL '7 days'` |
| **Delete subscriber** | SQL: `DELETE WHERE email = 'user@example.com'` |

---

## ✨ Pro Tips

1. **Regular exports** - Export your list weekly as backup
2. **Segment your audience** - Create different lists for different content
3. **Track engagement** - Monitor open rates and adjust strategy
4. **Test before sending** - Always send test emails
5. **Mobile-first** - Most people read emails on phones
6. **Clear CTAs** - Make your call-to-action buttons obvious
7. **Personalization** - Use subscriber names when possible
8. **Consistency** - Stick to a regular schedule

---

**Your newsletter subscribers are ready! Time to engage with your audience! 🚀**

**Remember:** Quality > Quantity. Better to have 100 engaged subscribers than 1000 uninterested ones.

