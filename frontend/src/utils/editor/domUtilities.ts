export const minifyCSS = (css: string): string => {
    return css
        .replace(/\s+/g, ' ') // Replace multiple spaces with a single space
        .replace(/\s*{\s*/g, '{') // Remove spaces around opening brace
        .replace(/\s*}\s*/g, '}') // Remove spaces around closing brace
        .replace(/\s*;\s*/g, ';') // Remove spaces around semicolons
        .replace(/\/\*.*?\*\//g, '') // Remove comments
        .trim(); // Remove leading and trailing spaces
}