import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  // 1. Security Check: Prevent the public from using your relay
  const authHeader = request.headers.get("x-secret-key");
  if (authHeader !== process.env.MY_SECRET_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { smtp, email } = body;

    // 2. Dynamic Transporter: Created on the fly based on the request
    const transporter = nodemailer.createTransport({
      host: smtp.host, // e.g., "smtp.zoho.com"
      port: smtp.port, // e.g., 465
      secure: smtp.secure, // true for 465, false for 587
      auth: {
        user: smtp.user,
        pass: smtp.pass,
      },
    });

    // 3. Send the Email
    const info = await transporter.sendMail({
      from: email.from || smtp.user, // Default to SMTP user if 'from' is missing
      to: email.to,
      subject: email.subject,
      html: email.html,
    });

    return NextResponse.json({ success: true, messageId: info.messageId });
  } catch (error: any) {
    console.error("Email Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to send email" },
      { status: 500 },
    );
  }
}
