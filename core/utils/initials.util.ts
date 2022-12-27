//get the initials of the other user's display name
export const getInitials = (name: string) => {
    const split = name.split(" ");
    let initials = "";
    split.forEach(word => {
        initials += word[0];
    });
    return initials;
};
