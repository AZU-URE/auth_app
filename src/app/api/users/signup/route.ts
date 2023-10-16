import { connect } from "@/dbConfig/dbConfig";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import mailer from "@/helper/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, email, password } = body;
    console.log(body);

    const user = await User.findOne({ email });

    if (user) {
      console.log("user exists!!!!", user);
      return NextResponse.json(
        { error: "User Already exists" },
        { status: 400 }
      );
    }
    // Hash Password
    console.log("hii");

    const salt = await bcryptjs.genSalt(10);
    const hashedPass = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPass,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);
    await mailer({ email, emailType: "VERIFY", userId: savedUser._id });
    return NextResponse.json({
      message: "User created Successfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
