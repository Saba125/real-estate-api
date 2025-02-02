import { join } from "path"
import pug from "pug"
import { sendTestEmail } from "./connection"

const templatesPath = join(__dirname, "templates")

export const send_register_email = async (
  to: string,
  subject: string,
  text: string,
  verificationUrl?: string
) => {
  // Compile Pug template
  const compiledTemplate = pug.compileFile(join(templatesPath, "register.pug"))

  // Render HTML using the compiled template
  const sendHtml = compiledTemplate({ subject, to, verificationUrl })

  // Send the email
  return sendTestEmail({ to, subject, text, html: sendHtml })
}
