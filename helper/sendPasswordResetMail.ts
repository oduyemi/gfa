import { escapeHtml } from "@/utils/escapeHtml";
import { sendEmailWithRetry } from "./emailLogic";

const APP_NAME = "Go Far Agency";
const BRAND_COLOR = "#010156";


export const sendPasswordResetMail = async (
    recipient: string,
    fname: string,
    resetUrl: string,
    expiresInMinutes = 15
  ) => {
    const safeFname = escapeHtml(fname);
    const safeResetUrl = escapeHtml(resetUrl);
  
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; color: #222; line-height: 1.7; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #010156;">Password Reset Request</h2>
  
        <p>Hi ${safeFname},</p>
  
        <p>
          We received a request to reset the password associated with your
          ${APP_NAME} administrator account.
        </p>
  
        <p>
          Click the button below to create a new password. This link expires in
          <strong>${expiresInMinutes} minutes</strong> and can only be used once.
        </p>
  
        <p style="text-align: center; margin: 30px 0;">
          <a
            href="${safeResetUrl}"
            style="display: inline-block; background: ${BRAND_COLOR}; color: #ffffff; text-decoration: none; padding: 14px 24px; border-radius: 6px; font-weight: bold;"
          >
            Reset My Password
          </a>
        </p>
  
        <p>
          If the button does not work, copy and paste the link below into your browser:
        </p>
  
        <p style="word-break: break-all;">${safeResetUrl}</p>
  
        <p>
          If you did not request a password reset, you can safely ignore this email.
          Your password will remain unchanged.
        </p>
  
        <p>
          Best regards,<br />
          <strong>${APP_NAME} Team</strong>
        </p>
      </div>
    `;
  
    await sendEmailWithRetry(
      recipient,
      `Password Reset — ${APP_NAME}`,
      htmlContent
    );
  };