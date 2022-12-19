import React from "react";
import { Animated, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../../../utils/useTheme.util";
import CustomText from "../../../lib/CustomText";
import InfoIcon from "../../../../icons/common/info";
import { observer } from "mobx-react";
import { useSellerViewProductStore } from "../../../../state/auth/SellerViewProductStore";

const ProductOptions = () => {
    const theme = useTheme();
    const sellerViewProductStore = useSellerViewProductStore();
    const scaleValue = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        if (sellerViewProductStore.productOptionsPopup) {
            Animated.spring(scaleValue, {
                toValue: 1,
                //@ts-ignore
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(scaleValue, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    });
    return (
        <Animated.View
            style={[
                {
                    width: "70%",
                    borderRadius: 20,
                    elevation: 20,
                    position: "absolute",
                    paddingVertical: 11,
                    paddingHorizontal: 16,
                    right: 0,
                    bottom: 32,
                    backgroundColor: theme.popupBackground,
                    zIndex: 1000,
                },
                { transform: [{ scale: scaleValue }] },
            ]}
        >
            <TouchableOpacity onPress={() => console.log("Please WORK!!!!")}>
                <View style={{ display: "flex", flexDirection: "row" }}>
                    <CustomText>Copy</CustomText>
                    <InfoIcon />
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
};

export default observer(ProductOptions);
