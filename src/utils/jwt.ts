import jwt from "jsonwebtoken";

const SECRET = process.env.SECRET || "changme";

export function signJWT(data: object) {
  return jwt.sign(data, SECRET, { expiresIn: "20m" });
}

export function verifyJWT<T>(token: string) {
  return jwt.verify(token, SECRET) as T;
}
