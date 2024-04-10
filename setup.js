console.log('Starting setup...');

import { JSDOM } from 'jsdom';

const dom = new JSDOM('<!doctype html><html><body></body></html>', {
  // Tests and code that use window.location must use this url
  url: 'https://example.com',
});
global.document = dom.window.document;
global.location = dom.window.location;
global.window = dom.window;

console.log('Setup complete');
