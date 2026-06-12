import SibApiV3Sdk from "sib-api-v3-sdk";

const client = SibApiV3Sdk.ApiClient.instance;

const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.BREVO_API_KEY;

const emailApi = new SibApiV3Sdk.TransactionalEmailsApi();

export const sendConfirmationEmail = async (
  email,
  fullName,
  domain
) => {

  await emailApi.sendTransacEmail({
    sender: {
      email: process.env.EMAIL_FROM,
      name: process.env.EMAIL_FROM_NAME
    },

    to: [
      {
        email: email,
        name: fullName
      }
    ],

    subject: "Application Received - QSkill",

    htmlContent: `
      <h2>Application Received Successfully</h2>

      <p>Dear ${fullName},</p>

      <p>
      Thank you for applying for the
      <b>${domain}</b> internship program.
      </p>

      <p>
      We have successfully received your application.
      </p>

      <p>
      Further updates will be shared via
      email and WhatsApp.
      </p>

      <br>

      <p>
      Regards,<br>
      QSkill Team
      </p>
    `
  });

};