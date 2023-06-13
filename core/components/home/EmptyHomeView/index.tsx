import React from "react";
import { View } from "react-native";
import EmptyCatalogIcon from "../../../icons/catalog/Empty";
import CustomText from "../../lib/CustomText";
import { useHomeStore } from "../../../state/auth/Home.store";

const EmptyHomeView = () => {
    const homeStore = useHomeStore();
    return (
        <View
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 50,
            }}
        >
            <EmptyCatalogIcon />
            <CustomText fontSize={16} font="Bold" textAlign="center">
                {homeStore.isIncomingChatsActive
                    ? "you have no incoming chats at the moment."
                    : "you have not made any offers to others yet!"}
            </CustomText>
            <CustomText
                secondary
                fontSize={14}
                font="bold"
                textAlign="center"
                style={{ marginTop: 12 }}
            >
                {homeStore.isIncomingChatsActive
                    ? "share your product links and check\n back later when others have made you offers."
                    : "make an offer on someone else's\n product and it will appear here!"}
            </CustomText>
        </View>
    );
};

export default EmptyHomeView;
