/** Verifies a reCAPTCHA v3 token server-side.
 *  Returns ok=true when the token is valid and score >= 0.5.
 *  Import this in API routes that receive a captchaToken from the client.
 */
export async function verifyRecaptcha(
  token: string
): Promise<{ ok: boolean; score: number }> {
  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
  });
  const data = await res.json();
  return { ok: data.success && (data.score ?? 0) >= 0.5, score: data.score ?? 0 };
}
