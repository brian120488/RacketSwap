import { NextResponse } from "next/server";  
import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("authToken");
    return NextResponse.json(
      { message: "Cookie deleted." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete cookie." + error },
      { status: 500 }
    );
  }
}