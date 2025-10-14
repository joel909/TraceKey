import createDOMPurify from 'isomorphic-dompurify';
import { JSDOM } from 'jsdom';
export function cleanInputForServer(input: string): string {
    const window = new JSDOM('').window;
    const DOMPurify_Server = createDOMPurify(window);
    let result = input.trim()
    result = DOMPurify_Server.sanitize(result);
    return result;
}