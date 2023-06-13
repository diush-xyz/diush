/**
 * Determines whether or not a string contains whitespace (spaces).
 * @param {string} str - The string to be analyzed.
 * @returns {boolean} - True if the string contains whitespace, false otherwise.
 */
export const containsWhitespace = (str: string): boolean => {
    return /\s/.test(str);
};
