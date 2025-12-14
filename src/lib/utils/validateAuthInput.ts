export default function validateAuthInput(email: string, password: string, username: string): [boolean,string,string] {
    email = email.trim();
    password = password.trim();
    username = username.trim();
    //white space check
    function hasInternalWhitespace(input: string): boolean {
        // This checks for any whitespace between characters
        return /\s/.test(input.trim());
    }

  // email validation
  const isValidEmail = (email: string): [boolean,string] => {
    if (!email || typeof email !== 'string') {
        return [false,"Email must be a non-empty string"];
    }
    // A standard regex for email validation to check the format
    const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    // Test the email against the regex
    if (hasInternalWhitespace(email)) {
        return [false,"Email must not contain whitespace"];
    }
    else{
        return [emailRegex.test(email), "Email format is invalid"];
    }
    };

  // password validation
  const isValidPassword = (password: string): [boolean,string] => {
    if (!password || typeof password !== 'string' || password.length < 5) {
        return [false,"Password must be at least 5 characters long"];
    }
    const commonPasswords = ['password', '123456', '123456789', '12345678', '12345'];
    if (commonPasswords.includes(password)) {
        return [false,"Password is too common"];
    }
    if (hasInternalWhitespace(password)) {
        return [false,"Password must not contain whitespace"];
    }
    return [true,""];
    };

  // username validation
  const isValidUsername = (username: string): [boolean, string] => {
    let reason = ""
    // Check if the input is a non-empty string
    if (!username || typeof username !== 'string') {
        return [false,reason="Username must be a non-empty string"];
    }

    // Check the length of the username
    if (username.length < 3 || username.length > 30) {
        return [false,reason="Username must be between 3 and 30 characters long"];
    }

    if (hasInternalWhitespace(username)) {
        return [false,"Username must not contain whitespace"];
    }

  // Check for invalid characters (e.g., spaces, special characters)
    const invalidChars = /[^a-zA-Z0-9_]/;
    if (invalidChars.test(username)) {
        return [false,"Username must only contain letters, numbers, and underscores"];
    }

    // If all checks pass, the username is valid
    return [true,""];
    };

    const [emailValid, emailReason] = isValidEmail(email);
    const [passwordValid, passwordReason] = isValidPassword(password);
    const [usernameValid, usernameReason] = isValidUsername(username);

    if (!emailValid || !passwordValid || !usernameValid) {
        console.log("Invalid input fields detected");
        if (!usernameValid) {
            console.log(usernameReason);
            return [false,"username",usernameReason];
        }
        if (!emailValid) {
            console.log(emailReason);
            return [false,"email",emailReason];
        }
        if (!passwordValid) {
            console.log(passwordReason);
            return [false,"password",passwordReason];
        }
        
        
    }

    return [true,"",""];
}
