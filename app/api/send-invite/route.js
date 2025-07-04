import { Resend } from "resend";

export async function POST(req) {
  try {
    const { email, chamaName, inviteLink } = await req.json();
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "Your App <noreply@yourdomain.com>",
      to: email,
      subject: `You're invited to join ${chamaName}!`,
      html: `<p>You have been invited to join <b>${chamaName}</b>.</p>
             <p><a href="${inviteLink}">Click here to join</a></p>`,
    });
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
