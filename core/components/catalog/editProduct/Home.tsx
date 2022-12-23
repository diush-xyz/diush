import { View } from "react-native";
import React from "react";
import { observer } from "mobx-react";
import { useTheme } from "styled-components";
import { CatalogStatus } from "../../../@types/GlobalTypes";
import { useUtilStore } from "../../../state/Util.store";
import { useCatalogStore } from "../../../state/auth/Catalog.store";
import ScreenHeader from "../../lib/ScreenHeader";
import Switcher from "../Dashboard/Switcher";

const EditProductHome = () => {
    const catalogStore = useCatalogStore();
    const utilStore = useUtilStore();
    const theme = useTheme();

    return (
        <View
            style={{
                alignItems: "center",
                flex: 1,
                marginTop: 55,
                width: "100%",
            }}
        >
            <ScreenHeader
                backArrow
                backArrowOnPress={() =>
                    catalogStore.setStatus(CatalogStatus.VIEW)
                }
                title="edit listing"
                subtitle="my catalog"
                button
                buttonText="save"
                onButtonPress={() => null}
                buttonDisabled={false}
            />
            <Switcher />
        </View>
    );
};

export default observer(EditProductHome);
