import User from "@/model/userModel";
import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log("email: ", email);
    const user = await User.findOne({ email });
    if (user) {
      if (user.isVerified === false) {
        return NextResponse.json({ error: "Email Not Verified" });
      }
      const validPass = await bcryptjs.compare(password, user.password);
      if (!validPass) {
        return NextResponse.json({ error: "Invalid Pass" });
      } else {
        const tokenData = {
          id: user._id,
          email: user.email,
          username: user.username,
        };
        const token = jwt.sign(tokenData, process.env.JWT_SECRET as string, {
          expiresIn: "1d",
        });

        const response = NextResponse.json({
          message: "User LoggedIn",
          user,
          success: true,
        });

        response.cookies.set("token", token, {
          httpOnly: true,
        });

        return response;
      }
    } else {
      return NextResponse.json({ error: "User doesn't exist" });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
