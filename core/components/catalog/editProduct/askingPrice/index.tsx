import React from "react";
import { View } from "react-native";
import CustomText from "../../../lib/CustomText";
import { useTheme } from "../../../../utils/useTheme.util";
import { useCatalogStore } from "../../../../state/auth/Catalog.store";
import LargeButton from "../../../lib/LargeButton";
import SmallButton from "../../../lib/SmallButton";
import { observer } from "mobx-react";

interface IAskingPriceSection {
    askingPrice: number;
}

const AskingPriceSection = (props: IAskingPriceSection) => {
    const theme = useTheme();
    const catalogStore = useCatalogStore();

    return (
        <View
            style={{
                display: "flex",
                flexDirection: "column",
            }}
        >
            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <View
                    style={{
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <CustomText
                        fontSize={18}
                        font="Bold"
                        style={{ marginBottom: 12 }}
                    >
                        asking price
                    </CustomText>
                    <CustomText accent font="Bold" fontSize={24}>
                        ${props.askingPrice}
                    </CustomText>
                </View>
                <View>
                    <SmallButton
                        title="edit"
                        onPress={() =>
                            catalogStore.setIsPriceEditPopupOpen(true)
                        }
                    />
                </View>
            </View>
        </View>
    );
};

export default observer(AskingPriceSection);
