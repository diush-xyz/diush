// Email address matcher.
// const matcher: RegExp =
//     /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const matcher: RegExp =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

/**
 * Validate the validity of an email address.
 *
 * @param {string} email
 * @return {boolean}
 */
export const validateEmail = (email: string) => {
    if (email.length > 320) return false;
    return matcher.test(email);
};
