import React from "react";
import { Animated, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../../../utils/useTheme.util";
import CustomText from "../../../lib/CustomText";
import { observer } from "mobx-react";
import { useSellerViewProductStore } from "../../../../state/auth/SellerViewProductStore";
import CopyIcon from "../../../../icons/catalog/Copy";
import EditIcon from "../../../../icons/catalog/Edit";
import TrashIcon from "../../../../icons/catalog/Trash";
import styled from "styled-components/native";
import { copyToClipboard } from "../../../../utils/clipboard.util";
import { useUtilStore } from "../../../../state/Util.store";
import { useCatalogStore } from "../../../../state/auth/Catalog.store";
import { CatalogStatus } from "../../../../@types/GlobalTypes";

interface IProductOptionsElement {
    text: string;
    icon: React.ReactNode;
    onClick: () => void;
}

const ProductOptions = () => {
    const theme = useTheme();
    const sellerViewProductStore = useSellerViewProductStore();
    const scaleValue = React.useRef(new Animated.Value(0)).current;
    const utilStore = useUtilStore();
    const catalogStore = useCatalogStore();

    const DATA: IProductOptionsElement[] = [
        {
            text: "Copy link",
            icon: <CopyIcon />,
            onClick: () => {
                copyToClipboard(`https://diush.xyz/hjdhj/hjdhj`);
                sellerViewProductStore.setProductOptionsPopup();
                utilStore.setMsgIndicator("Link copied!");
                setTimeout(() => {
                    utilStore.setMsgIndicator();
                }, 2500);
            },
        }, //TODO: Properly make this url link to something once the buyer flow is built out
        {
            text: "Edit listing",
            icon: <EditIcon />,
            onClick: () => {
                catalogStore.setStatus(CatalogStatus.EDIT);
                sellerViewProductStore.setProductOptionsPopup();
            },
        },
        {
            text: "Delete listing",
            icon: <TrashIcon />,
            onClick: () => sellerViewProductStore.setDeleteConfirmation(),
        },
    ];

    const Wrapper = styled(Animated.View)`
        box-shadow: 0px 0px 5px ${theme.line};
    `;

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
        <Wrapper
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
                        key={idx}
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            paddingVertical: 11,
                            paddingHorizontal: 16,
                            borderBottomWidth: idx !== DATA.length - 1 && 1,
                            borderBottomColor: "#ffffff0d",
                        }}
                        onPress={elem.onClick}
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
        </Wrapper>
    );
};

export default observer(ProductOptions);
