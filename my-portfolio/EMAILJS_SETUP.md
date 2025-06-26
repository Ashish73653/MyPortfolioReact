# EmailJS Setup Guide

This guide will help you set up EmailJS to receive emails from your contact form.

## Step 1: Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/) and create a free account
2. Verify your email address

## Step 2: Add Email Service

1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. Note down your **Service ID**

### For Gmail:

- Use your Gmail account
- You might need to enable "Less secure app access" or use App Passwords
- Service ID will look like: `service_xxxxxxx`

## Step 3: Create Email Template

1. Go to "Email Templates" in EmailJS dashboard
2. Click "Create New Template"
3. Use this template content:

```html
Subject: New Contact Form Message from {{from_name}} From: {{from_name}}
({{from_email}}) Subject: {{subject}} Message: {{message}} --- This message was
sent from your portfolio contact form. Reply-to: {{reply_to}}
```

4. Template variables to use:

   - `{{from_name}}` - Sender's name
   - `{{from_email}}` - Sender's email
   - `{{subject}}` - Message subject
   - `{{message}}` - Message content
   - `{{reply_to}}` - Reply-to email

5. Note down your **Template ID** (looks like: `template_xxxxxxx`)

## Step 4: Get Public Key

1. Go to "Account" → "General"
2. Find your **Public Key** (looks like: `user_xxxxxxxxxxxxxxxxxxxxxx` or newer format)

## Step 5: Update Environment Variables

Add these to your `.env` file:

```env
# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

## Step 6: Update .env.example

Add the EmailJS variables to your `.env.example` file:

```env
# EmailJS Configuration (Get from emailjs.com)
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

## Testing

1. Start your development server: `npm run dev`
2. Go to the Contact page
3. Fill out the form and submit
4. Check your email inbox for the message
5. Check browser console for any errors

## Free Tier Limits

EmailJS free tier includes:

- 200 emails per month
- Basic email services
- Standard support

For higher volumes, consider upgrading to a paid plan.

## Alternative Email Services

If you prefer other email services:

- **Gmail SMTP**: Works well with EmailJS
- **Outlook/Hotmail**: Supported by EmailJS
- **Yahoo**: Supported by EmailJS
- **Custom SMTP**: Available in paid plans

## Troubleshooting

### Common Issues:

1. **Email not received**: Check spam folder
2. **403 Forbidden**: Check your public key
3. **Invalid template**: Verify template ID and variables
4. **Gmail issues**: Enable 2FA and use App Password

### Debug Mode:

Enable debug logging by adding to your component:

```javascript
emailjs.init(publicKey);
// Add this for debugging
emailjs.send(serviceId, templateId, templateParams, publicKey).then(
  (result) => {
    console.log("SUCCESS!", result.status, result.text);
  },
  (error) => {
    console.log("FAILED...", error);
  }
);
```

## Security Notes

- Never commit your actual EmailJS credentials to Git
- Use environment variables for all sensitive data
- Consider rate limiting for production use
- EmailJS credentials are safe to use in frontend (they're designed for client-side use)

---

Need help? Check [EmailJS Documentation](https://www.emailjs.com/docs/) or their support.
