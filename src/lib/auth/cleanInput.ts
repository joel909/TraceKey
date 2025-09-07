import DOMPurify from 'dompurify';

export default function cleanInput(input: string): string {
    let result = input.trim()
    result = DOMPurify.sanitize(result);
    return result;
}