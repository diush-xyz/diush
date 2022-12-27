import React from "react";
import { useHomeStore } from "../../state/auth/Home.store";
import DMScreen from "./Conversation/DMScreen";
import HomeBaseScreen from "./HomeBase/HomeBase.screen";
import { observer } from "mobx-react";
import { useConversationStore } from "../../state/auth/Conversation.store";

const HomeScreen = () => {
    const conversationStore = useConversationStore();
    return (
        <>
            {conversationStore.activeConversation ? (
                <DMScreen />
            ) : (
                <HomeBaseScreen />
            )}
        </>
    );
};

export default observer(HomeScreen);
