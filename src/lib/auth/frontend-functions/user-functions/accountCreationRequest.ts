import AccountCreationResponse from "./accountCreationResultInterface"
export default async function requestAccountCreation(email: string, username: string, password: string): Promise<[AccountCreationResponse,Response]> {
    const response = await fetch('/api/create-account', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, username, password }),
    });

    const result = await response.json();
    console.log(result);
    return [result,response];

}