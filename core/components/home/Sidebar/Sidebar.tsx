import React from "react";
import { useTheme } from "../../../utils/useTheme.util";
import CustomText from "../../lib/CustomText";
import { View, Image } from "react-native";
import { useAuthStore } from "../../../state/auth/Auth.store";
import RoundedMoreIcon from "../../../icons/common/RoundedMore";

const Sidebar = () => {
    const theme = useTheme();
    const authStore = useAuthStore();
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
                paddingHorizontal: 25,
            }}
        >
            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    width: "100%",
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
                <View>
                    <RoundedMoreIcon />
                </View>
            </View>
        </View>
    );
};

export default Sidebar;
