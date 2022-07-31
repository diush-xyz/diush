import { View, Text } from "react-native";
import React from "react";
import CatalogHome from "../../components/catalog/Home";
import { useCatalogStore } from "../../state/auth/Catalog.store";
import { CatalogStatus } from "../../@types/GlobalTypes";
import CustomText from "../../components/lib/CustomText";
import { observer } from "mobx-react";
import CreateProductFlow from "./CreateProduct/CreateProduct.flow";

const CatalogScreen = () => {
    const catalogStore = useCatalogStore();

    const populateFlowContent = () => {
        switch (catalogStore.status) {
            case CatalogStatus.ACTIVE_DASH:
                return <CatalogHome />;
            case CatalogStatus.CREATE:
                return <CreateProductFlow />;
        }
    };

    return <>{populateFlowContent()}</>;
};

export default observer(CatalogScreen);
