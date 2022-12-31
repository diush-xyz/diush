import { makeAutoObservable } from "mobx";
import React from "react";
import { IConversation, IOffer, IUser } from "../../@types/GlobalTypes";

/**
 * A store to handle anything signup-related.
 */
export default class ConversationStore {
    constructor() {
        makeAutoObservable(this);
    }

    activeConversation: IConversation = null;

    setActiveConversation(conversation: IConversation) {
        this.activeConversation = conversation;
    }

    activeConvoOtherUser: IUser = null;

    setActiveConvoOtherUser(user: IUser) {
        this.activeConvoOtherUser = user;
    }

    activeConversationOffers: IOffer[] = null;

    setActiveConversationOffers(offers: IOffer[]) {
        this.activeConversationOffers = offers;
    }
}

const StoreContext = React.createContext<ConversationStore>(
    new ConversationStore()
);

/**
 * Hook to use store.
 *
 * @see Reference:
 *      https://dev.to/codingislove/how-to-setup-mobx-with-react-context-49jh
 */
export const useConversationStore = (): ConversationStore =>
    React.useContext(StoreContext);
