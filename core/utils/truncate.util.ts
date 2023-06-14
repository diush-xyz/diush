export const truncate = (str: string | null, n: number) => {
    return str?.length > n ? `${str?.substring(0, n - 1)}...` : str ?? "";
};
