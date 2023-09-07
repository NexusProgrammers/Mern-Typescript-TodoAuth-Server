import jwt from "jsonwebtoken";

const generateToken = (id: string): string | null => {
  try {
    const token = jwt.sign({ id }, process.env.JWT_SECRET_KEY || "default Secret");
    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    return null;
  }
};

export default generateToken;
