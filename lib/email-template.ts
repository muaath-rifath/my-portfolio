import { siteUrl } from '@/lib/seo';

type ContactEmail = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const escapeHtml = (value: string) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

/**
 * A self-contained email shell for portfolio correspondence.
 * Uses light mode by default, then follows clients that support
 * `prefers-color-scheme` (Apple Mail, Outlook for macOS/iOS, Gmail mobile, etc.).
 */
export function contactEmailTemplate({ name, email, phone, message }: ContactEmail) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safePhone = escapeHtml(phone);
  const safeMessage = escapeHtml(message).replace(/\r?\n/g, '<br />');

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="color-scheme" content="light dark" />
    <meta name="supported-color-schemes" content="light dark" />
    <title>Portfolio inquiry from ${safeName}</title>
    <style>
      :root { color-scheme: light dark; supported-color-schemes: light dark; }
      body, .email-body { margin: 0 !important; padding: 0 !important; background: #f7f7f5; color: #241f1c; }
      .email-body { width: 100% !important; }
      .shell { width: 100%; padding: 40px 16px; }
      .card { width: 100%; max-width: 600px; background: #ffffff; border: 1px solid #e8e5e1; border-radius: 8px; overflow: hidden; }
      .header { padding: 28px 32px 24px; border-bottom: 1px solid #e8e5e1; }
      .brand-table { border-collapse: collapse; }
      .brand { font-family: Arial, Helvetica, sans-serif; font-size: 20px; font-weight: 700; line-height: 1; letter-spacing: -0.5px; color: #006b42; margin: 0; }
      .brand-logo { display: block; width: 24px; height: 24px; border: 0; outline: none; text-decoration: none; }
      .dark-logo { display: none; }
      .brand-last { color: #76716d; font-weight: 500; }
      .eyebrow { margin: 25px 0 0; font-family: Arial, Helvetica, sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 1.3px; line-height: 16px; text-transform: uppercase; color: #006b42; }
      .content { padding: 30px 32px 32px; }
      h1 { margin: 0 0 10px; font-family: Arial, Helvetica, sans-serif; font-size: 28px; font-weight: 700; letter-spacing: -0.7px; line-height: 34px; color: #241f1c; }
      .intro, .message { margin: 0; font-family: Arial, Helvetica, sans-serif; font-size: 16px; line-height: 25px; color: #5c5752; }
      .details { width: 100%; margin: 26px 0; border: 1px solid #e8e5e1; border-collapse: collapse; border-radius: 6px; overflow: hidden; }
      .details th, .details td { padding: 13px 16px; border-bottom: 1px solid #e8e5e1; font-family: Arial, Helvetica, sans-serif; font-size: 14px; line-height: 20px; text-align: left; }
      .details tr:last-child th, .details tr:last-child td { border-bottom: 0; }
      .details th { width: 104px; color: #76716d; font-weight: 600; }
      .details td { color: #241f1c; overflow-wrap: anywhere; }
      .details a { color: #006b42; text-decoration: none; }
      .message-label { margin: 0 0 9px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.8px; text-transform: uppercase; color: #76716d; }
      .message-box { padding: 18px 20px; border-left: 3px solid #006b42; background: #f7faf7; }
      .footer { padding: 18px 32px 22px; border-top: 1px solid #e8e5e1; font-family: Arial, Helvetica, sans-serif; font-size: 12px; line-height: 18px; color: #76716d; }
      .footer a { color: #006b42; text-decoration: none; }
      @media screen and (max-width: 620px) {
        .shell { padding: 16px 0 !important; }
        .card { border-right: 0 !important; border-left: 0 !important; border-radius: 0 !important; }
        .header, .content { padding-right: 22px !important; padding-left: 22px !important; }
        .footer { padding-right: 22px !important; padding-left: 22px !important; }
      }
      @media (prefers-color-scheme: dark) {
        body, .email-body { background: #171110 !important; color: #faf9f4 !important; }
        .card { background: #211918 !important; border-color: #3b302d !important; }
        .header, .footer { border-color: #3b302d !important; }
        .brand { color: #8fffaa !important; }
        .light-logo { display: none !important; }
        .dark-logo { display: block !important; max-height: none !important; }
        .brand-last, .eyebrow, .details th, .message-label, .footer { color: #b6afa9 !important; }
        .eyebrow { color: #8fffaa !important; }
        h1, .details td { color: #faf9f4 !important; }
        .intro, .message { color: #d0c9c3 !important; }
        .details, .details th, .details td { border-color: #3b302d !important; }
        .details a, .footer a { color: #8fffaa !important; }
        .message-box { border-color: #8fffaa !important; background: #1b2a20 !important; }
      }
      [data-ogsc] body, [data-ogsc] .email-body { background: #171110 !important; color: #faf9f4 !important; }
      [data-ogsc] .card { background: #211918 !important; border-color: #3b302d !important; }
      [data-ogsc] .header, [data-ogsc] .footer, [data-ogsc] .details, [data-ogsc] .details th, [data-ogsc] .details td { border-color: #3b302d !important; }
      [data-ogsc] .brand, [data-ogsc] .eyebrow, [data-ogsc] .details a, [data-ogsc] .footer a { color: #8fffaa !important; }
      [data-ogsc] .light-logo { display: none !important; }
      [data-ogsc] .dark-logo { display: block !important; max-height: none !important; }
      [data-ogsc] .brand-last, [data-ogsc] .details th, [data-ogsc] .message-label, [data-ogsc] .footer { color: #b6afa9 !important; }
      [data-ogsc] h1, [data-ogsc] .details td { color: #faf9f4 !important; }
      [data-ogsc] .intro, [data-ogsc] .message { color: #d0c9c3 !important; }
      [data-ogsc] .message-box { border-color: #8fffaa !important; background: #1b2a20 !important; }
    </style>
  </head>
  <body class="email-body">
    <center class="email-body">
      <table role="presentation" class="email-body" cellpadding="0" cellspacing="0" border="0">
        <tr><td align="center" class="shell">
          <table role="presentation" class="card" cellpadding="0" cellspacing="0" border="0">
            <tr><td class="header">
              <table role="presentation" class="brand-table" cellpadding="0" cellspacing="0" border="0" style="vertical-align: middle;">
                <tr>
                  <td valign="middle" style="vertical-align: middle; padding-right: 10px; line-height: 0;">
                    <a href="${siteUrl}" target="_blank" style="text-decoration: none; display: inline-block;">
                      <img src="${siteUrl}/assets/logo-portfolio.png" width="24" height="24" alt="Muaath Rifath" class="brand-logo light-logo" style="display: block; width: 24px; height: 24px; border: 0; outline: none; text-decoration: none;" />
                      <!--[if !mso]><!-->
                      <img src="${siteUrl}/assets/logo-portfolio-dark.png" width="24" height="24" alt="Muaath Rifath" class="brand-logo dark-logo" style="display: none; width: 24px; height: 24px; border: 0; outline: none; text-decoration: none; max-height: 0px;" />
                      <!--<![endif]-->
                    </a>
                  </td>
                  <td valign="middle" style="vertical-align: middle; line-height: 1;">
                    <div class="brand">Muaath <span class="brand-last">Rifath</span></div>
                  </td>
                </tr>
              </table>
              <p class="eyebrow">Portfolio correspondence</p>
            </td></tr>
            <tr><td class="content">
              <h1>New project inquiry</h1>
              <p class="intro">${safeName} sent a message through your portfolio contact form.</p>
              <table role="presentation" class="details" cellpadding="0" cellspacing="0" border="0">
                <tr><th scope="row">Name</th><td>${safeName}</td></tr>
                <tr><th scope="row">Email</th><td><a href="mailto:${safeEmail}">${safeEmail}</a></td></tr>
                <tr><th scope="row">Phone</th><td>${safePhone}</td></tr>
              </table>
              <p class="message-label">Message</p>
              <div class="message-box"><p class="message">${safeMessage}</p></div>
            </td></tr>
            <tr><td class="footer">Reply directly to this email to respond to ${safeName}, or visit <a href="${siteUrl}">muaathrifath.me</a>.</td></tr>
          </table>
        </td></tr>
      </table>
    </center>
  </body>
</html>`;
}
