# Universal Mailer Service

A stateless email microservice built with Next.js. Acts as a secure bridge to relay transactional emails from HTTP clients to SMTP servers (Zoho, Gmail, etc.). Designed to bypass port restrictions on cloud platforms like Render free tier.

## Architecture

1.  **Client (Render App):** Sends HTTPS POST request to this service.
2.  **Server (Vercel):** Receives request, authenticates, and relays email via SMTP.

## Usage

### Endpoint

`POST https://smtp-relay-api.vercel.app/api/send-email`

### Headers

- `Content-Type`: `application/json`
- `x-secret-key`: `YOUR_SECRET_KEY` (Must match `MY_SECRET_KEY` env var in Vercel)

### Request Body

```json
{
  "smtp": {
    "host": "smtp.example.com",
    "port": 465,
    "secure": true, 
    "user": "your_email@example.com",
    "pass": "your_password"
  },
  "email": {
    "from": "Sender Name <sender@example.com>",
    "to": "recipient@example.com",
    "subject": "Test Email",
    "html": "<p>Hello world</p>"
  }
}
```

### Client Example (Node.js)

```javascript
async function sendEmailViaRelay(smtpConfig, emailData) {
  const RELAY_URL = 'https://smtp-relay-api.vercel.app/api/send-email';
  const MY_SECRET_KEY = process.env.RELAY_SECRET_KEY;

  const response = await fetch(RELAY_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-secret-key': MY_SECRET_KEY,
    },
    body: JSON.stringify({
      smtp: smtpConfig,
      email: emailData
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to send email');
  }

  return await response.json();
}
```

## Deployment

1.  Push this repository to GitHub.
2.  Import the project into Vercel.
3.  Add the Environment Variable: `MY_SECRET_KEY` (Set this to a strong random string).
4.  Deploy!
