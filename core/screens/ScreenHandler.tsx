import { View, Text } from "react-native";
import React from "react";
import { observer } from "mobx-react";
import { useUtilStore } from "../state/Util.store";
import { LoggedInScreen } from "../@types/GlobalTypes";
import HomeScreen from "./home/Home.screen";
import CatalogScreen from "./catalog/Catalog.screen";

const ScreenHandler = () => {
    const utilStore = useUtilStore();

    const populateScreenContent = () => {
        switch (utilStore.currentLoggedInScreen) {
            case LoggedInScreen.HOME:
                return <HomeScreen />;
            case LoggedInScreen.CATALOG:
                return <CatalogScreen />;
        }
    };

    return <>{populateScreenContent()}</>;
};

export default observer(ScreenHandler);
