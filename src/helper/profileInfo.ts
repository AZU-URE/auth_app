import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";
export default function getProfileInfo(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value || "";
    const data: any = jwt.verify(token, process.env.JWT_SECRET as any);
    // console.log(data.id);
    // console.log("inside helper");
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
