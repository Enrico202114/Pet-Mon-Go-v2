import { createHmac, timingSafeEqual } from "node:crypto";

const secret = process.env.JWT_SECRET;
export function createToken(idtutor) {
  if (!secret) throw new Error("JWT_SECRET não configurado");
  const payload = Buffer.from(JSON.stringify({ sub: idtutor, exp: Date.now() + 7 * 86400000 })).toString("base64url");
  const signature = createHmac("sha256", secret).update(payload).digest("base64url");
  return `${payload}.${signature}`;
}
export function requireAuth(req, res, next) {
  if (!secret) return res.status(503).json({ message: "Autenticação indisponível: configure JWT_SECRET" });
  const [payload, signature] = (req.headers.authorization || "").replace(/^Bearer\s+/i, "").split(".");
  if (!payload || !signature) return res.status(401).json({ message: "Autenticação necessária" });
  const expected = createHmac("sha256", secret).update(payload).digest();
  let actual;
  try { actual = Buffer.from(signature, "base64url"); } catch { return res.status(401).json({ message: "Token inválido" }); }
  if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) return res.status(401).json({ message: "Token inválido" });
  try { const data = JSON.parse(Buffer.from(payload, "base64url").toString()); if (data.exp < Date.now()) return res.status(401).json({ message: "Sessão expirada" }); req.tutorId = Number(data.sub); next(); }
  catch { return res.status(401).json({ message: "Token inválido" }); }
}
