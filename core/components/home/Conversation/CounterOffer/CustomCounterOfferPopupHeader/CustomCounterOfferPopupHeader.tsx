import {
    View,
    Text,
    GestureResponderEvent,
    TouchableOpacity,
    Image,
} from "react-native";
import React from "react";
import { useTheme } from "../../../../../utils/useTheme.util";
import { useConversationStore } from "../../../../../state/auth/Conversation.store";
import { observer } from "mobx-react";
import LeftArrowIcon from "../../../../../icons/common/leftArrow";
import MoreIcon from "../../../../../icons/common/more";
import CustomText from "../../../../lib/CustomText";
import ProfileImage from "../../../../lib/ProfileImage";
import { HeaderWrapper } from "./styles";
import { useOfferStore } from "../../../../../state/auth/Offer.store";

/**
 * Acts as a nav bar (header) of sorts.
 */
const CustomCounterOfferPopupHeader = () => {
    const theme = useTheme();
    const offerStore = useOfferStore();

    return (
        <HeaderWrapper
            style={{
                paddingBottom: 16,
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
                    onPress={() => offerStore.setIsOfferBeingCountered(false)}
                >
                    <LeftArrowIcon />
                </TouchableOpacity>
            </View>
            <View
                style={{ flex: 1, display: "flex", justifyContent: "center" }}
            >
                <CustomText
                    primary
                    textAlign="center"
                    font="Bold"
                    fontSize={18}
                >
                    counter offer
                </CustomText>
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

export default observer(CustomCounterOfferPopupHeader);
