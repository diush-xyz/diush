import React from "react";
import { useHomeStore } from "../../state/auth/Home.store";
import DMScreen from "./Conversations/IncomingConversations/DM/DMScreen";
import HomeBaseScreen from "./HomeBase/HomeBase.screen";
import { observer } from "mobx-react";
import { useConversationStore } from "../../state/auth/Conversation.store";
import ConversationScreenHandler from "./Conversations/IncomingConversations/ConversationScreenHandler";

const HomeScreen = () => {
    const conversationStore = useConversationStore();
    return (
        <>
            {conversationStore.activeConversation ? (
                <ConversationScreenHandler />
            ) : (
                <HomeBaseScreen />
            )}
        </>
    );
};

export default observer(HomeScreen);
