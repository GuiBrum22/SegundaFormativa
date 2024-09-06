import User from "@/models/User";
import connectMongo from "@/utils/dbConnect";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function Post(request) {
    const { email, password } = await request.json();
    await connectMongo();
    try {
        const user = User.findOne({email});
        if (user && (user.comparePassWord(password))) {
            const token = jwt.sign({ userId: user._id },
                process.env.JWT_SECRET, { expires: '1h' });
            return NextResponse.json({ token });
        } else {
            return NextResponse.json({ success: false }, { status: 400 });
        }
    } catch (error) {
        return NextResponse.json({ success: false }, { status: 404 });
    }
}