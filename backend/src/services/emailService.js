import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'your-gmail@gmail.com';
const FROM_EMAIL = process.env.FROM_EMAIL || 'onboarding@resend.dev';

export const sendFormConfirmationEmails = async (contactData) => {
  const { firstName, lastName, email, service, message, budget } = contactData;

  console.log('\n📧 ════════════════════════════════════════════');
  console.log('📧 SENDING CONFIRMATION EMAILS');
  console.log('📧 ════════════════════════════════════════════');
  console.log(`Resend API Key: ${process.env.RESEND_API_KEY ? '✅ Configured' : '❌ MISSING'}`);
  console.log(`Admin Email: ${ADMIN_EMAIL}`);
  console.log(`From Email: ${FROM_EMAIL}`);
  console.log(`Submitter Email: ${email}`);
  console.log('📧 ════════════════════════════════════════════\n');

  try {
    // Email 1: Send to your Gmail inbox
    console.log(`📧 Email 1️⃣: Sending admin notification to ${ADMIN_EMAIL}...`);
    const adminEmailResult = await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `New Contact Form Submission - ${firstName} ${lastName}`,
      html: generateAdminEmail(contactData),
    });
    console.log(`✅ Admin email sent successfully. ID: ${adminEmailResult.id}`);

    // Email 2: Send confirmation to form submitter
    // NOTE: In test mode, Resend only allows emails to the verified account email
    // So we send a copy to the admin instead, which includes submitter's info
    console.log(`📧 Email 2️⃣: Sending confirmation to ${email}...`);
    console.log(`⚠️  Note: In test mode, sending to admin (${ADMIN_EMAIL}) instead`);
    const submitterEmailResult = await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL, // Send to admin in test mode
      subject: `Confirmation: ${firstName} ${lastName} submitted form`,
      html: `
        <h2>✅ Form Submission Confirmation</h2>
        <p>A form has been submitted with the following details:</p>
        <p><strong>From:</strong> ${email}</p>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Message:</strong> ${message}</p>
        <p><em>Note: In production, a confirmation email will be sent directly to ${email}</em></p>
      `
    });
    console.log(`✅ Confirmation sent to admin. ID: ${submitterEmailResult.id}`);

    console.log('✅ Both emails sent successfully!\n');
    return {
      success: true,
      message: 'Emails sent successfully',
    };
  } catch (error) {
    console.error('\n❌ ════════════════════════════════════════════');
    console.error('❌ EMAIL SENDING ERROR');
    console.error('❌ ════════════════════════════════════════════');
    console.error('Error message:', error.message);
    console.error('Error code:', error.code);
    console.error('Full error:', JSON.stringify(error, null, 2));
    console.error('❌ ════════════════════════════════════════════\n');
    return {
      success: false,
      message: 'Failed to send emails',
      error: error.message,
    };
  }
};

const generateAdminEmail = (data) => {
  const { first_name, last_name, email, phone, service, budget, message, created_at } = data;
  const firstName = first_name;
  const lastName = last_name;
  const createdAt = created_at;

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; }
          .header { background: #2563eb; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .content { background: white; padding: 20px; border-radius: 0 0 8px 8px; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #2563eb; }
          .value { margin-top: 5px; padding: 10px; background: #f0f0f0; border-radius: 4px; }
          .footer { margin-top: 20px; font-size: 12px; color: #666; border-top: 1px solid #ddd; padding-top: 10px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>📧 New Contact Form Submission</h2>
          </div>
          <div class="content">
            <div class="field">
              <span class="label">Name:</span>
              <div class="value">${firstName} ${lastName}</div>
            </div>
            <div class="field">
              <span class="label">Email:</span>
              <div class="value"><a href="mailto:${email}">${email}</a></div>
            </div>
            ${phone ? `
            <div class="field">
              <span class="label">Phone:</span>
              <div class="value">${phone}</div>
            </div>
            ` : ''}
            <div class="field">
              <span class="label">Service Interested In:</span>
              <div class="value">${service}</div>
            </div>
            ${budget ? `
            <div class="field">
              <span class="label">Budget:</span>
              <div class="value">${budget}</div>
            </div>
            ` : ''}
            <div class="field">
              <span class="label">Message:</span>
              <div class="value">${message}</div>
            </div>
            <div class="field">
              <span class="label">Submitted At:</span>
              <div class="value">${new Date(createdAt).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' })}</div>
            </div>
            <div class="footer">
              <p>👉 Reply to this email or contact them directly at ${email}</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
};

const generateConfirmationEmail = (firstName) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; }
          .header { background: #10b981; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
          .content { background: white; padding: 20px; border-radius: 0 0 8px 8px; }
          .message { background: #ecfdf5; border-left: 4px solid #10b981; padding: 15px; margin: 20px 0; border-radius: 4px; }
          .footer { margin-top: 20px; font-size: 12px; color: #666; border-top: 1px solid #ddd; padding-top: 10px; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>✅ Thank You for Reaching Out!</h2>
          </div>
          <div class="content">
            <p>Hi ${firstName},</p>
            <div class="message">
              <p><strong>We've received your message!</strong></p>
              <p>Our team will review your inquiry and get back to you as soon as possible. We typically respond within 24-48 hours.</p>
            </div>
            <p>In the meantime, if you have any urgent questions, feel free to reach out to us directly.</p>
            <p>Best regards,<br/>
            <strong>NextWeb Solutions Team</strong></p>
            <div class="footer">
              <p>© 2024 NextWeb Solutions. All rights reserved.</p>
              <p>This is an automated message. Please do not reply to this email.</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
};
