import React from "react";
import { useTheme } from "../../../utils/useTheme.util";
import CustomText from "../../lib/CustomText";
import { View, Image, TouchableOpacity } from "react-native";
import { useAuthStore } from "../../../state/auth/Auth.store";
import RoundedMoreIcon from "../../../icons/common/RoundedMore";
import DealsIcon from "../../../icons/home/sidebar/deals";
import HorizontalLine from "../../lib/HorizontalLine";

export interface ISIDEBAR_DATA {
    icon: React.ReactNode;
    text: string;
    onClick: () => void;
}

const Sidebar = () => {
    const theme = useTheme();
    const authStore = useAuthStore();

    const SIDEBAR_DATA: ISIDEBAR_DATA[] = [
        {
            icon: <DealsIcon />,
            text: "deals",
            onClick: () => null,
        },
        {
            icon: <DealsIcon />,
            text: "my catalog",
            onClick: () => null,
        },
        {
            icon: <DealsIcon />,
            text: "metrics",
            onClick: () => null,
        },
        {
            icon: <DealsIcon />,
            text: "settings",
            onClick: () => null,
        },
        {
            icon: <DealsIcon />,
            text: "my profile",
            onClick: () => null,
        },
    ];

    return (
        <View
            style={{
                zIndex: 1000,
                backgroundColor: theme.popupBackground,
                flex: 1,
                position: "absolute",
                left: 0,
                width: "80%",
                height: "100%",
                paddingTop: 60,
            }}
        >
            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    width: "100%",
                    paddingHorizontal: 25,
                }}
            >
                <View style={{ display: "flex" }}>
                    <Image
                        borderRadius={27.5} //TODO: Find a way to make this a string and just make this 50% without using styled-components/native
                        source={{
                            uri:
                                authStore.user.photoURL ??
                                "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80",
                        }}
                        style={{
                            height: 55,
                            width: 55,
                            marginBottom: 12,
                        }}
                    />
                    <CustomText font="Bold" fontSize={19}>
                        {authStore.user.displayName}
                    </CustomText>
                </View>
                <TouchableOpacity onPress={() => null}>
                    <RoundedMoreIcon />
                </TouchableOpacity>
            </View>
            <View
                style={{
                    display: "flex",
                    marginTop: 30,
                    paddingHorizontal: 25,
                }}
            >
                {SIDEBAR_DATA.map((elem: ISIDEBAR_DATA, idx: number) => {
                    return (
                        <TouchableOpacity
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                marginBottom:
                                    idx !== SIDEBAR_DATA.length - 1 && 30,
                            }}
                            onPress={elem.onClick}
                        >
                            {elem.icon}
                            <CustomText
                                font="Bold"
                                fontSize={18}
                                style={{ marginLeft: 18 }}
                            >
                                {elem.text}
                            </CustomText>
                        </TouchableOpacity>
                    );
                })}
            </View>
            <HorizontalLine />
        </View>
    );
};

export default Sidebar;
