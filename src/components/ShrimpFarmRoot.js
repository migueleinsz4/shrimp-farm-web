import React from "react";
import {observer} from "mobx-react";
import {useStore} from "./ShrimpFarmApp";
import {ShrimpFarmLogin} from "./ShrimpFarmLogin";
import {ShrimpFarmLayout} from "./ShrimpFarmLayout";

export const ShrimpFarmRoot = observer(() => {
    const store = useStore();
    let actualView;

    if (store.username && store.view !== "LOGIN_VIEW") {
        actualView = <ShrimpFarmLayout/>;
    } else {
        actualView = <ShrimpFarmLogin/>
    }

    return(
        <div>
            {actualView}
        </div>
    )
});