"use server";

import transporter from "@/lib/nodemailer";

const styles = {
  body: "background-color:#f2f4f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; padding: 40px 20px;",
  container:
    "max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;",
  content: "padding: 48px 48px;",
  logoContainer: "text-align: center; margin-bottom: 24px;",
  logo: "height: 40px; width: auto;",
  header:
    "font-size: 28px; font-weight: 700; color: #111827; text-align: center; margin: 0 0 24px 0;",
  paragraph:
    "font-size: 16px; color: #374151; line-height: 1.6; margin: 0 0 32px 0;",
  buttonContainer: "text-align: center;",
  button:
    "display: inline-block; background-color: #2563eb; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;",
  hr: "border: none; border-top: 1px solid #e5e7eb; margin: 32px 0;",
  footer:
    "font-size: 12px; color: #6b7280; text-align: center; line-height: 1.5;",
};

export async function sendEmailAction({
  to,
  subject,
  meta,
}: {
  to: string;
  subject: string;
  meta: {
    description: string;
    link: string;
    companyName?: string;
    logoUrl?: string;
  };
}) {
  const company = "your company name";
  const logoSrc =
    "https://images.unsplash.com/photo-1720884413532-59289875c3e1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZnJlZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D";

  const mailOptions = {
    from: `"${company}" <${process.env.NODEMAILER_USER}>`,
    to,
    subject: `[${company}] - ${subject}`,
    html: `
      <body style="${styles.body}">
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center">
              <table style="${
                styles.container
              }" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="${styles.content}">
                    <div style="${styles.logoContainer}">
                      <img src="${logoSrc}" alt="${company} Logo" style="${
      styles.logo
    }" />
                    </div>
                    <h1 style="${styles.header}">${subject}</h1>
                    <p style="${styles.paragraph}">${meta.description}</p>
                    <div style="${styles.buttonContainer}">
                      <a href="${meta.link}" target="_blank" style="${
      styles.button
    }">
                        Verify Your Email
                      </a>
                    </div>
                    <hr style="${styles.hr}" />
                    <div style="${styles.footer}">
                      <p>If you did not request this email, you can safely ignore it.</p>
                      <p>© ${new Date().getFullYear()} ${company}. All rights reserved.</p>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (err) {
    console.error("[SendEmail]:", err);
    return { success: false };
  }
}
