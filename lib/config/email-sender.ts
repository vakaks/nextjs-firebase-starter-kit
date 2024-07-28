import "server-only";


enum TEMPLATE_IDS {
  "RESET_PASSWORD" = "YOUR_TEMPLATE_ID",
  "VERIFY_EMAIL" = "YOUR_TEMPLATE_ID",
  "WELCOME" = "YOUR_TEMPLATE_ID"
}

type Templates = keyof typeof TEMPLATE_IDS

const getTemplateId = (template: Templates) => {
  return TEMPLATE_IDS[template]
}


/**
 * This Function can only called from the server
 * Send an email to a user
 * @param data Record<string, any>
 * @param templateId Templates Type
 * @returns Promise<string>
 * @example 
 * sendEmail(
 * {
 *  email: "test@example.com",
 *  username: "Test User",
 *  link: "https://example.com"
 * },
 * "VERIFY_EMAIL"
 * )
 */

export const sendEmail = async (
  data: Record<string, any>, 
  templateId:Templates
): Promise<string> => {

  /* const template = getTemplateId(templateId) as string
  const sendGrid = require('@sendgrid/mail');

  sendGrid.setApiKey(process.env.SENDGRID_API_KEY as string);

  const msg = {
    to: email,
    from: process.env.SENDGRID_SENDER_EMAIL as string,
    templateId: template,
    dynamic_template_data: {
      ...data
    }

  await sendGrid.send(msg) */

  console.log(data, templateId)
  return 'Email sent successfully'
}
