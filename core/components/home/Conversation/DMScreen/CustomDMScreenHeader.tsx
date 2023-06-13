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
import MoreIcon from "../../../../icons/common/more";
import ProfileImage from "../../../lib/ProfileImage";
import { truncate } from "../../../../utils/truncate.util";

/**
 * Acts as a nav bar (header) of sorts.
 */
const CustomDMScreenHeader = () => {
    const theme = useTheme();
    const conversationStore = useConversationStore();

    return (
        <HeaderWrapper
            style={{
                paddingBottom: 16,
                borderBottomWidth: 1,
                borderBottomColor: "#ffffff0D",
            }}
        >
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
                style={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <View
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                        }}
                    >
                        <ProfileImage
                            specificUser={
                                conversationStore.activeConvoOtherUser
                            }
                            size={22}
                            border
                            style={{ marginRight: 8 }}
                            borderColor={
                                conversationStore.activeConversation.dealReached
                                    ? theme.success
                                    : theme.accent
                            }
                        />
                        <CustomText
                            primary
                            font="Bold"
                            fontSize={18}
                            textAlign="center"
                        >
                            {
                                conversationStore.activeConvoOtherUser.displayName.split(
                                    " "
                                )[0]
                            }
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
                    <MoreIcon />
                </View>
            </View>
        </HeaderWrapper>
    );
};

export default observer(CustomDMScreenHeader);
