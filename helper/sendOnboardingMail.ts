import { escapeHtml } from "@/utils/escapeHtml";
import { sendEmailWithRetry } from "./emailLogic";
const APP_NAME = "Go Far Agency";
const BRAND_COLOR = "#1265F4";
const INVITATION_TTL_MINUTES = 45;


export const sendAdminInvitationMail = async (
  recipient: string,
  otp: string,
  activationUrl: string,
  expiresInMinutes = INVITATION_TTL_MINUTES) => {
  const safeOtp = escapeHtml(otp);
  const safeActivationUrl = escapeHtml(activationUrl);

  const htmlContent = `
    <div style="
      font-family: Arial, sans-serif;
      color: #222;
      line-height: 1.7;
      max-width: 600px;
      margin: 0 auto;
    ">
      <div style="border-bottom: 3px solid ${BRAND_COLOR}; padding-bottom: 16px;">
        <h2 style="color: ${BRAND_COLOR}; margin-bottom: 0;">
          You're invited to join ${APP_NAME}
        </h2>
      </div>

      <p>Hello,</p>

      <p>
        You have been invited to join the
        <strong>${APP_NAME} Admin Team</strong>.
        We're pleased to welcome you and look forward to having you
        contribute to the team.
      </p>

      <p>
        To activate your administrator account, complete the verification
        process using the activation code below.
      </p>

      <div style="
        background: #f4f7ff;
        border: 1px solid #dce6ff;
        border-radius: 10px;
        padding: 24px;
        margin: 24px 0;
        text-align: center;
      ">
        <p style="margin: 0 0 10px; font-weight: bold;">
          Your activation code
        </p>

        <div style="
          font-size: 32px;
          font-weight: bold;
          letter-spacing: 8px;
          color: ${BRAND_COLOR};
        ">
          ${safeOtp}
        </div>

        <p style="font-size: 13px; color: #666; margin-bottom: 0;">
          This code expires in ${expiresInMinutes} minutes.
        </p>
      </div>

      <h3 style="color: ${BRAND_COLOR};">Activate your account</h3>

      <ol style="padding-left: 20px;">
        <li>Click the button below to open your account activation page.</li>
        <li>Enter the six-digit activation code from this email.</li>
        <li>Create and confirm your permanent password.</li>
        <li>Return to the login page and sign in with your new password.</li>
      </ol>

      <p style="text-align: center; margin: 30px 0;">
        <a
          href="${safeActivationUrl}"
          style="
            display: inline-block;
            background: ${BRAND_COLOR};
            color: #ffffff;
            text-decoration: none;
            padding: 14px 28px;
            border-radius: 7px;
            font-weight: bold;
          "
        >
          Activate My Account
        </a>
      </p>

      <p style="font-size: 13px; color: #666;">
        If the button doesn't work, copy and paste this link into your browser:
        <br />
        <a href="${safeActivationUrl}" style="color: ${BRAND_COLOR};">
          ${safeActivationUrl}
        </a>
      </p>

      <div style="
        border-left: 3px solid #f4be28;
        padding: 12px 16px;
        background: #fffbef;
        margin: 24px 0;
      ">
        <strong>Important:</strong>
        <p style="margin: 5px 0 0;">
          Your invitation and activation code expire after
          ${expiresInMinutes} minutes. If your invitation expires,
          please contact your administrator for a new invitation.
        </p>
      </div>

      <p>
        If you weren't expecting this invitation, you can safely ignore
        this email.
      </p>

      <p>
        We look forward to having you on the team.
      </p>

      <p>
        Best regards,<br />
        <strong>${APP_NAME} Team</strong>
      </p>

      <hr style="border: 0; border-top: 1px solid #eee; margin-top: 32px;" />

      <p style="font-size: 12px; color: #888; text-align: center;">
        ${APP_NAME} · Go far with your project.
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
  fname: string,
  loginUrl: string
) => {
  const safeFname = escapeHtml(fname);
  const safeLoginUrl = escapeHtml(loginUrl);

  const htmlContent = `
    <div style="
      font-family: Arial, sans-serif;
      color: #222;
      line-height: 1.7;
      max-width: 600px;
      margin: 0 auto;
    ">
      <div style="border-bottom: 3px solid ${BRAND_COLOR}; padding-bottom: 16px;">
        <h2 style="color: ${BRAND_COLOR}; margin-bottom: 0;">
          Welcome to ${APP_NAME}!
        </h2>
      </div>

      <p>Hi ${safeFname},</p>

      <p>
        Congratulations! Your administrator account has been successfully
        activated, and your permanent password has been set.
      </p>

      <div style="
        background: #f0f7f0;
        border: 1px solid #d6ead6;
        border-radius: 10px;
        padding: 20px;
        margin: 24px 0;
      ">
        <h3 style="color: #216e39; margin-top: 0;">
          Your account is ready
        </h3>

        <p style="margin-bottom: 0;">
          You can now access your administrator account using your email
          address and the password you created during activation.
        </p>
      </div>

      <p style="text-align: center; margin: 30px 0;">
        <a
          href="${safeLoginUrl}"
          style="
            display: inline-block;
            background: ${BRAND_COLOR};
            color: #ffffff;
            text-decoration: none;
            padding: 14px 28px;
            border-radius: 7px;
            font-weight: bold;
          "
        >
          Sign In to Your Account
        </a>
      </p>

      <p>
        Thank you for joining ${APP_NAME}. We look forward to working
        together and accomplishing great things.
      </p>

      <p>
        Best regards,<br />
        <strong>${APP_NAME} Team</strong>
      </p>

      <hr style="border: 0; border-top: 1px solid #eee; margin-top: 32px;" />

      <p style="font-size: 12px; color: #888; text-align: center;">
        ${APP_NAME} · Go far with your project.
      </p>
    </div>
  `;

  await sendEmailWithRetry(
    recipient,
    `Welcome Aboard — ${APP_NAME}`,
    htmlContent
  );
};
