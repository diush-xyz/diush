export const censorWord = str => {
    return str[0] + "*".repeat(str.length - 2) + str.slice(-1);
};

export const censorEmail = email => {
    const arr = email.split("@");
    return censorWord(arr[0]) + "@" + arr[1];
};
