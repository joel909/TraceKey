import DOMPurify from 'dompurify';
export function cleanInput(input: string): string {
    let result = input.trim()
    result = DOMPurify.sanitize(result);
    return result;
}

