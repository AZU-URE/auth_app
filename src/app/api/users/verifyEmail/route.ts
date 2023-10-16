import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/model/userModel";
connect();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token } = body;
    console.log(token);
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });
    if (user) {
      user.isVerified = true;
      user.verifyToken = undefined;
      user.verifyTokenExpiry = undefined;
      await user.save();
      return NextResponse.json({
        message: "User email verified",
        success: true,
      });
    } else {
      return NextResponse.json({ error: "User not found" });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
