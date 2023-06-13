export const getHighestOffer = offers => {
    return offers.reduce((prev, current) =>
        prev.amount > current.amount ? prev : current
    );
};
