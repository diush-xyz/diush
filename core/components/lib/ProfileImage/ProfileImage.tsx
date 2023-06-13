import React from "react";
import {
    Image,
    ImageStyle,
    StyleProp,
    TouchableOpacity,
    View,
    ViewStyle,
} from "react-native";
import { IUser } from "../../../@types/GlobalTypes";
import { useTheme } from "../../../utils/useTheme.util";
import CustomText from "../CustomText";
import { getInitials } from "../../../utils/initials.util";
import { useAuthStore } from "../../../state/auth/Auth.store";
import { observer } from "mobx-react";
import { PFP_LOADING_PLACEHOLDER } from "../../../utils/constants";

interface IProfileImage {
    specificUser: IUser;
    size: number;
    style?: StyleProp<ViewStyle>;
    border?: boolean;
    borderColor?: string;
    loading?: boolean;
}

const ProfileImage = (props: IProfileImage) => {
    const theme = useTheme();
    const BORDER_RADIUS = props.size / 2;
    const [processedLoading, setProcessedLoading] =
        React.useState<boolean>(true);

    const fontSize = props.size / 2.5;
    const borderColor = props.borderColor ?? theme.accent;

    return (
        <>
            <View style={props.style}>
                {props.specificUser?.photoURL ? (
                    <>
                        <Image
                            onLoadEnd={() => setProcessedLoading(false)}
                            borderRadius={BORDER_RADIUS} //TODO: Find a way to make this a string and just make this 50% without using styled-components/native
                            source={{
                                uri: processedLoading
                                    ? PFP_LOADING_PLACEHOLDER
                                    : props.specificUser?.photoURL,
                            }}
                            style={{
                                height: props.size,
                                width: props.size,
                                borderColor: props.border ? borderColor : null,
                                borderWidth: props.border ? 2 : 0,
                            }}
                        />
                    </>
                ) : (
                    <>
                        <View
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: BORDER_RADIUS,
                                height: props.size,
                                width: props.size,
                                padding: 5,
                                backgroundColor: theme.accent,
                            }}
                        >
                            <CustomText fontSize={fontSize}>
                                {props.specificUser &&
                                    getInitials(
                                        props.specificUser?.displayName
                                    )}
                            </CustomText>
                        </View>
                    </>
                )}
            </View>
        </>
    );
};

export default observer(ProfileImage);
