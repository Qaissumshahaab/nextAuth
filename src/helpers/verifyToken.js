import jwt from "jsonwebtoken";

export const verifyToken = (request) => {
  try {
    const token = request.cookies.get("token")?.value || "";

    
    if (!token) {
      throw new Error("No token provided");
    }

    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    return decodedToken;

  } catch (error) {
    throw new Error("Token verification failed", { cause: error });
  }
};