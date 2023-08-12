import { StyleSheet } from "react-native";
import { useTheme } from "../utils/useTheme.util";

const theme = useTheme();

export const GLOBAL_STYLES = StyleSheet.create({
    page: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        paddingHorizontal: 30,
    },
    // display: "flex",
    // flexDirection: "row",
    // justifyContent: "center",
    // alignItems: "center",
    // padding: "10px 0px",
    // color: "#ffffff",
    // width: "329px",
    // height: "44px",
    // // left: "calc(50% - 329px/2 - 0.5px)",
    // // top: "calc(50% - 44px/2 + 111px)",
    // backgroundColor:
    //     "linear-gradient(91.05deg, rgba(200, 151, 249, 0) 1.04%, rgba(200, 151, 249, 0.2) 1.05%, rgba(255, 63, 112, 0.2) 99.1%)",
    // // filter: "drop-shadow(0px 5px 20px rgba(0, 0, 0, 0.15))",
    // borderRadius: 22,
    // paddingVertical: 11,
    // width: "100%",
    // alignItems: "center",
    // borderRadius: 22,
    // borderWidth: 2,
    // borderColor: theme.accent,

    bottomSheet: {
        backgroundColor: theme.popupBackground,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    handleStyle: {
        backgroundColor: theme.popupBackground,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    handleIndicatorStyle: {
        backgroundColor: theme.secondary,
    },
    bottomSheetViewStyle: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.popupBackground,
        width: "100%",
    },
    viewProductSheetViewStyle: {
        flex: 1,
        backgroundColor: theme.popupBackground,
    },
});
