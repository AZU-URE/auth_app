import { NextRequest, NextResponse } from "next/server";
import getProfileInfo from "@/helper/profileInfo";
import User from "@/model/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();
export async function GET(request: NextRequest) {
  try {
    const data = await getProfileInfo(request);
    // console.log(user);
    const id = data.id;
    const user = await User.findById({ _id: id });
    // console.log(user);
    return NextResponse.json({ message: "User found", user });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
