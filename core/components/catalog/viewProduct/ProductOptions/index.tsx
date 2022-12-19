import React from "react";
import { Animated, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../../../utils/useTheme.util";
import CustomText from "../../../lib/CustomText";
import { observer } from "mobx-react";
import { useSellerViewProductStore } from "../../../../state/auth/SellerViewProductStore";
import CopyIcon from "../../../../icons/catalog/Copy";
import EditIcon from "../../../../icons/catalog/Edit";
import TrashIcon from "../../../../icons/catalog/Trash";

interface IProductOptionsElement {
    text: string;
    icon: React.ReactNode;
}

const ProductOptions = () => {
    const theme = useTheme();
    const sellerViewProductStore = useSellerViewProductStore();
    const scaleValue = React.useRef(new Animated.Value(0)).current;

    const DATA: IProductOptionsElement[] = [
        { text: "Copy link", icon: <CopyIcon /> },
        { text: "Edit listing", icon: <EditIcon /> },
        { text: "Delete listing", icon: <TrashIcon /> },
    ];

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
                    borderRadius: 12,
                    elevation: 20,
                    position: "absolute",
                    right: 0,
                    bottom: 32,
                    backgroundColor: theme.popupBackground,
                    zIndex: 1000,
                },
                { transform: [{ scale: scaleValue }] },
            ]}
        >
            {DATA.map((elem: IProductOptionsElement, idx: number) => {
                return (
                    <TouchableOpacity
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            paddingVertical: 11,
                            paddingHorizontal: 16,
                            borderBottomWidth: idx !== DATA.length - 1 && 1,
                            borderBottomColor: "#ffffff0d",
                        }}
                        onPress={() => console.log("The best")}
                    >
                        <CustomText
                            style={{
                                color:
                                    idx == DATA.length - 1
                                        ? "#FF453A"
                                        : "#ffffff",
                            }}
                        >
                            {elem.text}
                        </CustomText>
                        {elem.icon}
                    </TouchableOpacity>
                );
            })}
        </Animated.View>
    );
};

export default observer(ProductOptions);
