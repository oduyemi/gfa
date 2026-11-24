import { escapeHtml } from "@/utils/escapeHtml";
import { sendEmailWithRetry } from "./emailLogic";


const APP_NAME = "Go Far Agency";
const BRAND_COLOR = "#010156";
const INVITATION_TTL_MINUTES = 45;


export const sendAdminInvitationMail = async (
  recipient: string,
  temporaryPassword: string,
  otp: string,
  loginUrl: string,
  expiresInMinutes = INVITATION_TTL_MINUTES
) => {
  const safePassword = escapeHtml(temporaryPassword);
  const safeOtp = escapeHtml(otp);
  const safeLoginUrl = escapeHtml(loginUrl);

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; color: #222; line-height: 1.7; max-width: 600px; margin: 0 auto;">
      <h2 style="color: ${BRAND_COLOR};">You're invited to join ${APP_NAME}</h2>

      <p>Hello,</p>

      <p>
        You have been invited to join the <strong>${APP_NAME} Admin Team</strong>.
        Your administrator account has been provisionally created, and you need to
        complete the activation process before you can access the admin dashboard.
      </p>

      <p>
        Your temporary login credentials are provided below. They are valid for
        <strong>${expiresInMinutes} minutes only</strong>.
      </p>

      <div style="background: #f5f5f9; border: 1px solid #e3e3ec; border-radius: 8px; padding: 20px; margin: 24px 0;">
        <p style="margin: 0 0 8px;"><strong>Temporary Password</strong></p>
        <div style="font-size: 18px; font-weight: bold; word-break: break-all;">
          ${safePassword}
        </div>

        <p style="margin: 20px 0 8px;"><strong>Activation Code</strong></p>
        <div style="font-size: 28px; font-weight: bold; letter-spacing: 5px; color: ${BRAND_COLOR};">
          ${safeOtp}
        </div>
      </div>

      <h3 style="color: ${BRAND_COLOR};">How to activate your account</h3>

      <ol>
        <li>Open the admin login page using the link below.</li>
        <li>Sign in using your email address and temporary password above.</li>
        <li>Enter your activation code when prompted.</li>
        <li>Create and confirm your new permanent password.</li>
        <li>Once activation is successful, log in with your new password to access the dashboard.</li>
      </ol>

      <p style="text-align: center; margin: 30px 0;">
        <a
          href="${safeLoginUrl}"
          style="display: inline-block; background: ${BRAND_COLOR}; color: #ffffff; text-decoration: none; padding: 14px 24px; border-radius: 6px; font-weight: bold;"
        >
          Activate My Account
        </a>
      </p>

      <p>
        <strong>Important:</strong> Your invitation, temporary password, and
        activation code expire after ${expiresInMinutes} minutes. The temporary
        password can only be used once. If the invitation expires before you
        complete activation, please contact your administrator to request a new one.
      </p>

      <p>
        If you were not expecting this invitation, you may safely ignore this email.
      </p>

      <p>
        We look forward to having you on the team and working together.
      </p>

      <p>
        Best regards,<br />
        <strong>${APP_NAME} Team</strong>
      </p>
    </div>
  `;

  await sendEmailWithRetry(
    recipient,
    `Admin Invitation — ${APP_NAME}`,
    htmlContent
  );
};


export const sendAdminOnboardingMail = async (
  recipient: string,
  fname: string
) => {
  const safeFname = escapeHtml(fname);
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; color: #222; line-height: 1.7; max-width: 600px; margin: 0 auto;">
      <h2 style="color: ${BRAND_COLOR};">Welcome to ${APP_NAME}!</h2>

      <p>Hi ${safeFname},</p>

      <p>
        Congratulations! Your administrator account has been successfully
        activated. Your onboarding is complete, and you're now officially
        part of the ${APP_NAME} admin team.
      </p>

      <div style="background: #f0f7f0; border: 1px solid #d6ead6; border-radius: 8px; padding: 20px; margin: 24px 0;">
        <h3 style="color: #216e39; margin-top: 0;">Account successfully activated</h3>
        <p style="margin-bottom: 0;">
          Your permanent password has been set and your admin account is ready.
          You can now sign in using your email address and new password.
        </p>
      </div>

      <p>
        Thank you for joining us. We look forward to collaborating with you
        and accomplishing great things together.
      </p>

      <p>
        Best regards,<br />
        <strong>${APP_NAME} Team</strong>
      </p>
    </div>
  `;

  await sendEmailWithRetry(
    recipient,
    `Welcome Aboard — ${APP_NAME}`,
    htmlContent
  );
};
