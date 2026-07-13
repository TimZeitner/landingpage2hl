import { unsubscribeContact } from "../../lib/resend";

const BG = "#0A0A0A";
const WHITE = "#ffffff";
const DIM = "#8a8a8a";

function page(title: string, body: string): Response {
  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title></head>
<body style="margin:0;background:${BG};font-family:'Helvetica Neue',Arial,sans-serif;">
  <div style="max-width:480px;margin:0 auto;padding:96px 24px;text-align:center;">
    <div style="font-size:15px;font-weight:700;letter-spacing:0.5px;color:${WHITE};padding-bottom:28px;">2hoursleft</div>
    <h1 style="font-size:24px;color:${WHITE};margin:0 0 12px;">${title}</h1>
    <p style="font-size:15px;line-height:1.6;color:${DIM};margin:0;">${body}</p>
  </div>
</body></html>`;
  return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
}

// Footer link click.
export async function GET(request: Request) {
  const email = new URL(request.url).searchParams.get("email");
  if (!email) {
    return page("Something went wrong", "No email address was provided.");
  }
  await unsubscribeContact(email);
  return page(
    "You're unsubscribed",
    "You won't get any more emails from 2hoursleft. Changed your mind? Just sign up again anytime.",
  );
}

// One-click unsubscribe (RFC 8058) from Gmail / Apple Mail.
export async function POST(request: Request) {
  const email = new URL(request.url).searchParams.get("email");
  if (email) {
    await unsubscribeContact(email);
  }
  return new Response(null, { status: 200 });
}
