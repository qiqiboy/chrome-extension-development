export const KEY = 'chrome-extension-development-markdown';

export const get = () => localStorage.getItem('chrome-extension-development-markdown') || `Markdown编辑器
=====
直接输入内容将会在当前tab预览效果
`;

export const set = code => localStorage.setItem(KEY, code);
