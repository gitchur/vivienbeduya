---
name: create-api-route
description: Create Next.js API routes and server actions for handling forms, external APIs, and server-side logic.
---

# Create API Route

Create Next.js API routes and server actions for backend functionality.

## When to Use

- Creating form submission handlers
- Integrating with external APIs (Hubspot, Sendgrid, etc.)
- Handling webhook callbacks
- Server-side data processing
- Custom backend logic that doesn't fit in Sanity

## Choose: API Route vs Server Action

### Use API Routes When:
- Building RESTful endpoints
- Handling webhooks from external services
- Need specific HTTP methods (GET, POST, PUT, DELETE)
- Creating public APIs
- Need custom response headers

### Use Server Actions When:
- Handling form submissions
- Simple server-side mutations
- Don't need custom HTTP methods
- Want progressive enhancement
- Simpler code with less boilerplate

## File Structure

```
src/app/api/
├── contact/
│   └── route.ts              # POST /api/contact
├── newsletter/
│   └── route.ts              # POST /api/newsletter
└── webhooks/
    └── sanity/
        └── route.ts          # POST /api/webhooks/sanity
```

Or for server actions:

```
src/actions/
├── contact.ts                # Server action for contact form
└── newsletter.ts             # Server action for newsletter
```

## Creating an API Route

### Basic API Route

**File:** `src/app/api/contact/route.ts`

```typescript
import { NextRequest, NextResponse } from "next/server";

// Handle POST requests to /api/contact
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    
    // Validate input
    if (!body.email || !body.message) {
      return NextResponse.json(
        { error: "Email and message are required" },
        { status: 400 }
      );
    }
    
    // Process request (send email, save to database, etc.)
    // ... your logic here
    
    // Return success response
    return NextResponse.json(
      { success: true, message: "Message sent" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

### API Route with Multiple Methods

```typescript
import { NextRequest, NextResponse } from "next/server";

// GET /api/users
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get("page") || "1";
  
  // Fetch data
  const users = await fetchUsers(parseInt(page));
  
  return NextResponse.json(users);
}

// POST /api/users
export async function POST(request: NextRequest) {
  const body = await request.json();
  
  // Create user
  const user = await createUser(body);
  
  return NextResponse.json(user, { status: 201 });
}

// DELETE /api/users
export async function DELETE(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const id = searchParams.get("id");
  
  if (!id) {
    return NextResponse.json(
      { error: "ID required" },
      { status: 400 }
    );
  }
  
  await deleteUser(id);
  
  return NextResponse.json(
    { success: true },
    { status: 200 }
  );
}
```

### API Route with Dynamic Segments

**File:** `src/app/api/users/[id]/route.ts`

```typescript
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: { id: string };
}

// GET /api/users/123
export async function GET(
  request: NextRequest,
  { params }: Props
) {
  const { id } = params;
  
  const user = await fetchUser(id);
  
  if (!user) {
    return NextResponse.json(
      { error: "User not found" },
      { status: 404 }
    );
  }
  
  return NextResponse.json(user);
}

// PUT /api/users/123
export async function PUT(
  request: NextRequest,
  { params }: Props
) {
  const { id } = params;
  const body = await request.json();
  
  const user = await updateUser(id, body);
  
  return NextResponse.json(user);
}
```

## Creating a Server Action

### Basic Server Action

**File:** `src/actions/contact.ts`

```typescript
"use server";

import { z } from "zod";

// Define validation schema
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function submitContactForm(formData: FormData) {
  // Validate input
  const validatedFields = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    // Process the form (send email, save to DB, etc.)
    const { name, email, message } = validatedFields.data;
    
    // Example: Send email via external service
    await sendEmail({
      to: "contact@example.com",
      from: email,
      subject: `Contact from ${name}`,
      body: message,
    });

    return {
      success: true,
      message: "Thank you for your message!",
    };
  } catch (error) {
    console.error("Contact form error:", error);
    return {
      success: false,
      errors: { _form: ["Something went wrong. Please try again."] },
    };
  }
}
```

### Using Server Action in Component

```typescript
"use client";

import { submitContactForm } from "@/actions/contact";
import { useState } from "react";

export const ContactForm = () => {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(formData: FormData) {
    setStatus("loading");
    
    const result = await submitContactForm(formData);
    
    if (result.success) {
      setStatus("success");
    } else {
      setStatus("error");
    }
  }

  return (
    <form action={handleSubmit}>
      <input name="name" type="text" required />
      <input name="email" type="email" required />
      <textarea name="message" required />
      
      <button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Sending..." : "Send"}
      </button>
      
      {status === "success" && <p>Message sent!</p>}
      {status === "error" && <p>Error sending message</p>}
    </form>
  );
};
```

## Common Patterns

### Email Sending (Sendgrid)

```typescript
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(request: NextRequest) {
  const { email, message } = await request.json();
  
  try {
    await sgMail.send({
      to: "contact@example.com",
      from: "noreply@example.com",
      subject: "New Contact Form Submission",
      text: message,
      html: `<p>${message}</p>`,
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
```

### Hubspot Form Submission

```typescript
export async function POST(request: NextRequest) {
  const body = await request.json();
  
  const hubspotData = {
    fields: [
      {
        objectTypeId: "0-1",
        name: "email",
        value: body.email,
      },
      {
        objectTypeId: "0-1",
        name: "firstname",
        value: body.name,
      },
    ],
  };
  
  const response = await fetch(
    `https://api.hsforms.com/submissions/v3/integration/submit/${process.env.HUBSPOT_PORTAL_ID}/${process.env.HUBSPOT_FORM_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(hubspotData),
    }
  );
  
  if (!response.ok) {
    return NextResponse.json(
      { error: "Failed to submit to Hubspot" },
      { status: 500 }
    );
  }
  
  return NextResponse.json({ success: true });
}
```

### Webhook Handler

```typescript
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // Verify webhook signature
  const signature = request.headers.get("x-webhook-signature");
  
  if (signature !== process.env.WEBHOOK_SECRET) {
    return NextResponse.json(
      { error: "Invalid signature" },
      { status: 401 }
    );
  }
  
  const payload = await request.json();
  
  // Handle webhook event
  switch (payload.type) {
    case "content.updated":
      // Revalidate affected pages
      revalidatePath("/");
      break;
    case "content.deleted":
      // Handle deletion
      break;
  }
  
  return NextResponse.json({ received: true });
}
```

### Rate Limiting

```typescript
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "10 s"), // 10 requests per 10 seconds
});

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") || "127.0.0.1";
  
  const { success } = await ratelimit.limit(ip);
  
  if (!success) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429 }
    );
  }
  
  // Process request...
  return NextResponse.json({ success: true });
}
```

## Validation

### Using Zod for Validation

```typescript
import { z } from "zod";

const newsletterSchema = z.object({
  email: z.string().email("Invalid email address"),
  consent: z.literal(true, {
    errorMap: () => ({ message: "You must consent to subscribe" }),
  }),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  
  const result = newsletterSchema.safeParse(body);
  
  if (!result.success) {
    return NextResponse.json(
      {
        error: "Validation failed",
        details: result.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }
  
  // Process valid data
  const { email } = result.data;
  
  return NextResponse.json({ success: true });
}
```

## Error Handling

### Structured Error Responses

```typescript
class APIError extends Error {
  constructor(public message: string, public status: number) {
    super(message);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    if (!body.email) {
      throw new APIError("Email is required", 400);
    }
    
    // Process request...
    
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof APIError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status }
      );
    }
    
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

## Testing API Routes

### Using Thunder Client / Postman

```bash
# POST request
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","message":"Hello"}'
```

### In Development

```typescript
// Test in browser console
fetch("/api/contact", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email: "test@example.com",
    message: "Test message",
  }),
})
  .then((res) => res.json())
  .then(console.log);
```

## Environment Variables

**File:** `.env.local`

```env
# Email
SENDGRID_API_KEY=your_key_here

# Hubspot
HUBSPOT_PORTAL_ID=your_portal_id
HUBSPOT_FORM_ID=your_form_id

# Webhooks
WEBHOOK_SECRET=your_secret

# Rate Limiting
UPSTASH_REDIS_REST_URL=your_url
UPSTASH_REDIS_REST_TOKEN=your_token
```

## Best Practices

### ✅ DO

- Validate all input
- Use TypeScript for type safety
- Handle errors gracefully
- Log errors for debugging
- Use environment variables for secrets
- Implement rate limiting for public endpoints
- Return appropriate HTTP status codes
- Use server actions for simple forms
- Add request/response types

### ❌ DON'T

- Expose sensitive data in responses
- Skip input validation
- Hardcode API keys
- Return detailed errors to clients (security risk)
- Use API routes for simple forms (use server actions)
- Forget to handle errors
- Skip rate limiting on public endpoints

## Checklist

- [ ] Created route file in correct location
- [ ] Handled all necessary HTTP methods
- [ ] Added input validation
- [ ] Implemented error handling
- [ ] Used environment variables for secrets
- [ ] Added appropriate HTTP status codes
- [ ] Tested endpoint manually
- [ ] Added rate limiting (if public endpoint)
- [ ] Logged errors for debugging
- [ ] Documented endpoint behavior

## Troubleshooting

**API route not found (404):**
- Check file is named `route.ts`
- Verify file is in `app/api/` directory
- Check URL matches file path
- Restart dev server

**TypeScript errors:**
- Import `NextRequest`, `NextResponse` from `next/server`
- Define types for params and request body
- Use `.json()` to parse request body

**CORS errors:**
- Add CORS headers to response
- Use `NextResponse.json()` with headers option
- Consider using API route middleware

**Environment variables not working:**
- Verify `.env.local` exists
- Check variable names match (including prefix)
- Restart dev server after changing env vars
- Use `process.env.VARIABLE_NAME`

## Related Skills

- Server-side data fetching patterns
- Form handling best practices
- External API integrations

## Next Steps

After creating API route:
- Test with different inputs
- Add logging for debugging
- Implement rate limiting if public
- Add tests (optional)
- Document API behavior for team
- Monitor errors in production
