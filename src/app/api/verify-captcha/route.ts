import { verifyRecaptcha } from "@/lib/recaptcha";

/** Lightweight endpoint for client-side forms that call third-party services
 *  directly (e.g. Supabase auth) and can't pass the token through their own
 *  API route. Call this before proceeding with the sensitive action.
 */
export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const { token } = body as { token?: string };

  if (!token) {
    return Response.json({ ok: false, error: "Missing token" }, { status: 400 });
  }

  const { ok, score } = await verifyRecaptcha(token);
  if (!ok) {
    return Response.json({ ok: false, score }, { status: 400 });
  }
  return Response.json({ ok: true });
}
