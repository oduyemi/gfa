import { transporter } from "./tansporter";

export const sendEmail = async (
  to: string,
  subject: string,
  html: string
) => {
  await transporter.sendMail({
    from: `"Go Far Agency" <hello@oduyemi.dev>`,
    to,
    subject,
    html,
  });
};