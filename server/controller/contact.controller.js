import nodemailer from "nodemailer";
import Contact from "../model/Contact.js";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.MAIL_PASS,
  },
});

export const ConatctUs = async (req, res) => {
  try {
    const body =  req.body;

    if (!body.name || !body.email || !body.message) {
      return res.status(400).json({
        success: false,
        message: "Name, email and message are required",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address",
      });
    }

    const contact = await Contact.create({
      name: body.name,
      email: body.email,
      phone: body.phone || "",
      info: body.message,
      status: "pending",
    });

    try {
      await transporter.sendMail({
        from: `"MH Digital Edge Contact Form" <${process.env.SMTP_USER}>`,
        to: "alifarhan1531@gmail.com",
        subject: `New Contact Form Submission from ${body.name}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
              .field { margin-bottom: 20px; }
              .label { font-weight: bold; color: #555; display: block; margin-bottom: 5px; }
              .value { background: white; padding: 10px; border-radius: 5px; border-left: 4px solid #667eea; }
              .footer { margin-top: 30px; text-align: center; color: #888; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>📬 New Contact Form Submission</h2>
              </div>
              <div class="content">
                <div class="field">
                  <span class="label">Name:</span>
                  <div class="value">${body.name}</div>
                </div>
                
                <div class="field">
                  <span class="label">Email:</span>
                  <div class="value">${body.email}</div>
                </div>
                
                ${
                  body.phone
                    ? `
                <div class="field">
                  <span class="label">Phone:</span>
                  <div class="value">${body.phone}</div>
                </div>
                `
                    : ""
                }
                
                <div class="field">
                  <span class="label">Message:</span>
                  <div class="value">${body.message.replace(/\n/g, "<br>")}</div>
                </div>
                
                <div class="field">
                  <span class="label">Submitted:</span>
                  <div class="value">${new Date().toLocaleString()}</div>
                </div>
              </div>
              <div class="footer">
                <p>This message was sent from the MH Digital Edge contact form.</p>
              </div>
            </div>
          </body>
          </html>
        `,
        text: `
New Contact Form Submission

Name: ${body.name}
Email: ${body.email}
${body.phone ? `Phone: ${body.phone}\n` : ""}
Message: ${body.message}
Submitted: ${new Date().toLocaleString()}

This message was sent from the MH Digital Edge contact form.
        `,
      });

      await transporter.sendMail({
        from: `"MH Digital Edge" <${process.env.SMTP_USER}>`,
        to: body.email,
        subject: "Thank You for Contacting MH Digital Edge",
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
              .message { background: white; padding: 20px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #667eea; }
              .signature { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; }
              .button { display: inline-block; padding: 10px 20px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
              .footer { margin-top: 30px; text-align: center; color: #888; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>Thank You for Contacting Us! 🙏</h2>
              </div>
              <div class="content">
                <p>Dear <strong>${body.name}</strong>,</p>
                
                <p>Thank you for reaching out to MH Digital Edge. We have received your message and appreciate you taking the time to contact us.</p>
                
                <div class="message">
                  <strong>Your Message:</strong><br>
                  ${body.message.replace(/\n/g, "<br>")}
                </div>
                
                <p>Our team will review your inquiry and get back to you within <strong>24 hours</strong>. We aim to respond to all queries as quickly as possible.</p>
                
                <p>In the meantime, you can:</p>
                <ul>
                  <li>Visit our website to learn more about our services</li>
                  <li>Check out our portfolio of completed projects</li>
                  <li>Follow us on social media for updates</li>
                </ul>
                
                <div class="signature">
                  <p>Best regards,<br>
                  <strong>The MH Digital Edge Team</strong><br>
                  <small style="color: #666;">Building Digital Excellence</small></p>
                </div>
              </div>
              <div class="footer">
                <p>© 2025 MH Digital Edge. All rights reserved.</p>
                <p style="font-size: 12px;">#410, 4th Floor, Noor Trade Center, Block 13-A, Gulshan-e-Iqbal, Karachi, Pakistan</p>
              </div>
            </div>
          </body>
          </html>
        `,
        text: `
Thank You for Contacting MH Digital Edge

Dear ${body.name},

Thank you for reaching out to MH Digital Edge. We have received your message and appreciate you taking the time to contact us.

Your Message:
${body.message}

Our team will review your inquiry and get back to you within 24 hours. We aim to respond to all queries as quickly as possible.

Best regards,
The MH Digital Edge Team
Building Digital Excellence

#410, 4th Floor, Noor Trade Center, Block 13-A, Gulshan-e-Iqbal, Karachi, Pakistan
        `,
      });
    } catch (emailError) {
      console.error("Email sending error:", emailError);
    }

    // Send success response
    return res.status(200).json({
      success: true,
      message: "Contact form submitted successfully!",
    });
  } catch (error) {
    console.error("Error contact us:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};