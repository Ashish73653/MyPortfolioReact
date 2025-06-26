# 📧 Quick Setup Guide - Contact Form Email

## ✅ What's Already Done

- EmailJS library installed
- Contact form updated to send emails
- Environment variables configured
- Fallback behavior for development

## 🚀 Next Steps (5 minutes setup)

### 1. Create EmailJS Account

- Go to [EmailJS.com](https://www.emailjs.com/)
- Sign up with your email (ashish73653@gmail.com)
- Verify your email

### 2. Add Email Service

- Dashboard → "Email Services" → "Add New Service"
- Choose "Gmail"
- Connect your Gmail account
- Copy the **Service ID** (like: `service_abc123`)

### 3. Create Email Template

- Dashboard → "Email Templates" → "Create New Template"
- **Template content:**

```
Subject: 💌 New Portfolio Contact: {{subject}}

Hi Ashish,

You received a new message from your portfolio contact form:

📝 **From:** {{from_name}} ({{from_email}})
📋 **Subject:** {{subject}}
📅 **Time:** {{timestamp}}

**Message:**
{{message}}

---
Reply directly to this email to respond to {{from_name}}.
Portfolio Contact Form - ashish73653.com
```

- Copy the **Template ID** (like: `template_xyz789`)

### 4. Get Public Key

- Dashboard → "Account" → "General"
- Copy your **Public Key** (like: `user_abcdefghijk`)

### 5. Update Your .env File

Replace these in your `.env` file:

```env
VITE_EMAILJS_SERVICE_ID=service_abc123
VITE_EMAILJS_TEMPLATE_ID=template_xyz789
VITE_EMAILJS_PUBLIC_KEY=user_abcdefghijk
```

### 6. Test It!

- Restart your dev server: `npm run dev`
- Go to Contact page
- Fill out the form and submit
- Check your email inbox!

## 🎯 Expected Result

- Form submits successfully
- You receive email in your Gmail
- Form shows "Message Sent!" success state
- User can reply directly to their email

## 📱 Free Tier Limits

- 200 emails per month
- Perfect for portfolio use
- No credit card required

## 🔧 Troubleshooting

- **Not receiving emails?** Check spam folder
- **Form not working?** Check browser console for errors
- **Need help?** Check `EMAILJS_SETUP.md` for detailed guide

---

**Total setup time: ~5 minutes** ⏱️
