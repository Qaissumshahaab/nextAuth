import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";


export const verifyToken = (request) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    return decodedToken;
  } catch (error) {
    throw new Error("Something wrong happen with token decoding", { cause: error });
  }
};