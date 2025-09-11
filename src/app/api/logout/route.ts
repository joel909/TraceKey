// app/api/logout/route.ts
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST() {
  const cookieStore = await cookies()
  // Delete all cookies
  cookieStore.getAll().forEach(cookie => {
    console.log("Deleting cookie: ", cookie.name);
    cookieStore.delete(cookie.name)
  })
  // Redirect to login page
  return NextResponse.json({ 
    success: true, 
    message: 'Cookies deleted on POST' 
  });
}