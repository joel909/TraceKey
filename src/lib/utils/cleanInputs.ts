import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

export function cleanInputForServer(input: string): string {
    const { window } = new JSDOM('<!DOCTYPE html><html><body></body></html>');
    const DOMPurifyServer = DOMPurify(window as any);
    let result = input.trim()
    result = DOMPurifyServer.sanitize(result);
    return result;
}