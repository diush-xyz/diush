import {
    View,
    Text,
    GestureResponderEvent,
    TouchableOpacity,
    Image,
} from "react-native";
import React from "react";
import { observer } from "mobx-react";
import { HeaderWrapper } from "./styles";
import { useTheme } from "../../../../utils/useTheme.util";
import LeftArrowIcon from "../../../../icons/common/leftArrow";
import CustomText from "../../../lib/CustomText";
import RoundedMoreIcon from "../../../../icons/common/RoundedMore";
import { useCatalogStore } from "../../../../state/auth/Catalog.store";
import { useConversationStore } from "../../../../state/auth/Conversation.store";

/**
 * Acts as a nav bar (header) of sorts.
 */
const CustomDMScreenHeader = () => {
    const theme = useTheme();
    const conversationStore = useConversationStore();

    return (
        <HeaderWrapper>
            <View
                style={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "center",
                    marginRight: "auto",
                }}
            >
                <TouchableOpacity
                    onPress={() =>
                        conversationStore.setActiveConversation(null)
                    }
                >
                    <LeftArrowIcon />
                </TouchableOpacity>
            </View>
            <View
                style={{ flex: 1, display: "flex", justifyContent: "center" }}
            >
                <View
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <View style={{ display: "flex", flexDirection: "row" }}>
                        <Image
                            borderRadius={11} //TODO: Find a way to make this a string and just make this 50% without using styled-components/native
                            source={{
                                uri: "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?cs=srgb&dl=pexels-suliman-sallehi-1704488.jpg&fm=jpg",
                            }}
                            style={{
                                height: 22,
                                width: 22,
                                borderColor: theme.accent,
                                borderWidth: 2,
                                marginRight: 8,
                            }}
                        />
                        <CustomText
                            primary
                            textAlign="center"
                            font="Bold"
                            fontSize={18}
                        >
                            {conversationStore.activeConvoOtherUser.displayName}
                        </CustomText>
                    </View>
                    {/* <CustomText secondary textAlign="center" fontSize={16}>
                        @jess_om
                    </CustomText> */}
                </View>
            </View>
            <View
                style={{
                    flex: 1,
                    display: "flex",
                    marginLeft: "auto",
                }}
            >
                <View
                    style={{
                        marginLeft: "auto",
                    }}
                >
                    {/*TODO: Change icon*/}
                    <RoundedMoreIcon />
                </View>
            </View>
        </HeaderWrapper>
    );
};

export default observer(CustomDMScreenHeader);
