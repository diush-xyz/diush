import { View, Text } from "react-native";
import React from "react";
import { observer } from "mobx-react";
import { useUtilStore } from "../state/Util.store";
import { LoggedInScreen } from "../@types/GlobalTypes";
import CatalogScreen from "./catalog/Catalog.screen";
import HomeScreen from "./home/Home.screen";
import SettingsScreen from "./settings/Settings.screen";
import BuyProductScreen from "./buy/BuyProduct.screen";

const ScreenHandler = () => {
    const utilStore = useUtilStore();

    const populateScreenContent = () => {
        switch (utilStore.currentLoggedInScreen) {
            case LoggedInScreen.HOME:
                return <HomeScreen />;
            case LoggedInScreen.CATALOG:
                return <CatalogScreen />;
            case LoggedInScreen.SETTINGS:
                return <SettingsScreen />;
            case LoggedInScreen.BUY:
                return <BuyProductScreen />;
        }
    };

    return <>{populateScreenContent()}</>;
};

export default observer(ScreenHandler);
