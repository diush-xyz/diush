import React from "react";
import { TouchableOpacity, View, Image } from "react-native";
import { IProduct, LoggedInScreen } from "../../../../@types/GlobalTypes";
import ChevronRight from "../../../../icons/catalog/ChevronRight";
import { truncate } from "../../../../utils/truncate.util";
import CustomText from "../../../lib/CustomText";
import { useTheme } from "../../../../utils/useTheme.util";
import { useBuyProductStore } from "../../../../state/buy/BuyProduct.store";
import { useUtilStore } from "../../../../state/Util.store";

interface IResultElem {
    elem: IProduct;
    idx: number;
}

const ResultElem = (props: IResultElem) => {
    const theme = useTheme();
    const buyProductStore = useBuyProductStore();
    const utilStore = useUtilStore();

    return (
        <TouchableOpacity
            onPress={() => {
                buyProductStore.setIdFromSearch(props.elem.id);
                utilStore.setCurrentLoggedInScreen(LoggedInScreen.BUY);
            }}
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: "row",
                width: "100%",
                marginBottom: 20,
                borderBottomWidth: 1,
                borderBottomColor: theme.secondary,
                paddingBottom: 20,
            }}
        >
            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                }}
            >
                <Image
                    style={{
                        height: 80,
                        width: 80,
                        borderRadius: 10,
                        resizeMode: "cover",
                    }}
                    source={{ uri: props.elem.imageURL }}
                />
                <View
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginLeft: 8,
                    }}
                >
                    <View>
                        <CustomText font="Bold">
                            {truncate(props.elem.title, 25)}
                        </CustomText>
                        <CustomText fontSize={14} secondary>
                            {truncate(props.elem.blurb, 25)}
                        </CustomText>
                    </View>
                    <View>
                        <CustomText accent font="Bold">
                            ${props.elem.askingPrice}
                        </CustomText>
                    </View>
                </View>
            </View>
            <ChevronRight />
        </TouchableOpacity>
    );
};

export default ResultElem;
