import validateAuthInput from '../frontend-functions/validateAuthInput';
import { ValidationError } from '@/lib/errors/ValidationError';
import { cleanInputForServer } from './cleanInputs';
export default function cleanAndValidateInputs(email: string, password: string, username: string): string {
    password = cleanInputForServer(password);
    username = cleanInputForServer(username);
    email = cleanInputForServer(email);
    const [isValid, fields,reason] = validateAuthInput(email,password,username);

    if (!isValid) {
        throw new ValidationError(reason,fields)
    }
    return 'All inputs are valid.';
}


