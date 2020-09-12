import React from "react";
import { useLocalStore } from "mobx-react";
import {createRootStore} from "../stores/RootStore";
import {ShrimpFarmRoot} from "./ShrimpFarmRoot";

const StoreContext = React.createContext();

const StoreProvider = ({ children }) => {
    const store = useLocalStore(createRootStore);

    return (
        <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    );
};

export const useStore = () => {
    const store = React.useContext(StoreContext);
    if (!store) {
        throw new Error('useStore must be used within a StoreProvider.')
    }
    return store
};

export function ShrimpFarmApp() {
    return (
        <StoreProvider>
            <ShrimpFarmRoot/>
        </StoreProvider>
    );
}