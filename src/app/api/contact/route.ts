import { createContactMessage } from "@/src/lib/api/contact";
import { NextRequest } from "next/server";
import { z } from "zod";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  subject: z.string().min(5, "Subject must be at least 5 characters."),
  message: z.string().min(10, "Message must be at least 10 characters."),
  token: z.string().min(1, "Captcha token is required."),
});

export async function POST(request: NextRequest) {
  await delay(200 + Math.random() * 300); // simulate network latency

  try {
    const body = await request.json();
    
    // Validate request body
    const { token, ...validatedData } = contactSchema.parse(body);

    // Verify Turnstile token
    const verifyParams = new URLSearchParams();
    verifyParams.append("secret", process.env.TURNSTILE_SECRET_KEY as string);
    verifyParams.append("response", token);

    const verifyResponse = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: verifyParams,
    });

    const verifyResult = await verifyResponse.json();

    if (!verifyResult.success) {
      return Response.json(
        { success: false, message: "Invalid captcha verification" },
        { status: 400 }
      );
    }

    const message = await createContactMessage(validatedData);

    return Response.json({ success: true, data: message }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json(
        { success: false, errors: error.issues },
        { status: 400 }
      );
    }

    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
