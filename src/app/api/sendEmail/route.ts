import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: `New Contact Form Submission from ${name}`,
      replyTo: email,
      html: `
    <div style="
      font-family: Arial, sans-serif;
      background: #f7f7f7;
      padding: 20px;
      color: #333;
    ">
      <div style="
        max-width: 600px;
        background: #ffffff;
        margin: auto;
        border-radius: 10px;
        padding: 25px;
        box-shadow: 0px 3px 10px rgba(0,0,0,0.1);
      ">
        <h2 style="text-align: center; color: #4A90E2;">New Contact Form Submission</h2>
        <hr style="border: none; height: 1px; background: #eee; margin: 20px 0">

        <p style="font-size: 16px;"><strong>Name:</strong> ${name}</p>
        <p style="font-size: 16px;"><strong>Email:</strong> ${email}</p>
        
        <div style="
          margin-top: 20px;
          padding: 15px;
          background: #f2f8ff;
          border-left: 5px solid #4A90E2;
          border-radius: 5px;
        ">
          <p style="font-size: 16px; line-height: 1.6;">
            <strong>Message:</strong><br>
            ${message}
          </p>
        </div>

        <br>
        <p style="font-size: 14px; color: #888; text-align: center;">
          This email was generated automatically from your contact form.
        </p>
      </div>
    </div>
  `,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json(
      { message: "Email sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to send email", error },
      { status: 500 }
    );
  }
}
