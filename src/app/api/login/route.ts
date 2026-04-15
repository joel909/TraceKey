export async function POST(request:Request) {
    const { email, password } = await request.json();
    if (!email || !password) {
        return new Response(JSON.stringify({ message: 'Email and password are required.' }), { status: 400 });
    }
    
}