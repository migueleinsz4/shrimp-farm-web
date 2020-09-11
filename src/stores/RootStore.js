import axios from "axios";

export function createRootStore() {
    return {
        //username: "",
        username: "jsnow",
        //farmerName: "",
        farmerName: "Jon Snow",
        farmerId: null,
        //view: "LOGIN_VIEW",
        view: "MAIN_VIEW",
        loginMessage: "Login ok",
        selectedMenu: "FARMS_VIEW",
        selectedOption: "FARMS_VIEW_SEARCH",
        login(username, password, view) {
            if ((username === "jsnow" && password === "cargill") || (username === "sstark" && password === "cargill")) {
                this.username = username;
                this.farmerName = "Jon Snow";
                this.farmerId = 1;
                this.view = view;
                this.loginMessage = "Login ok";
            } else {
                this.username = "";
                this.farmerName = "";
                this.farmerId = null;
                this.view = "LOGIN_VIEW";
                this.loginMessage = "Login error";
            }
        },
        async createFarm(farm) {
            return await axios({
                url: `http://localhost:8081/cargill-shrimp-farm/api/v1.0/farms`,
                method: 'post',
                responseType: 'json',
                data: {...farm}
            });
        },
        async updateFarm(farm) {
            return await axios({
                url: `http://localhost:8081/cargill-shrimp-farm/api/v1.0/farms`,
                method: 'put',
                responseType: 'json',
                data: {...farm}
            });
        },
        async deleteFarm(_id) {
            return await axios({
                url: `http://localhost:8081/cargill-shrimp-farm/api/v1.0/farms/${_id}`,
                method: 'delete',
                responseType: 'json'
            });
        },
        async searchFarms(_id) {
            let id = _id ? `/${_id}` : '';
            return await axios({
                url: `http://localhost:8081/cargill-shrimp-farm/api/v1.0/farms${id}?idFarmer=${this.farmerId}`,
                method: 'get',
                withCredentials: false,
                timeout: 3000,
                responseType: 'json',
            });
        },
        async searchPonds(_id, _idFarm) {
            let id = _id ? `/${_id}` : '';
            let idFarm = _idFarm ? `?idFarm=${_idFarm}` : '';
            return await axios({
                url: `http://localhost:8081/cargill-shrimp-farm/api/v1.0/ponds${id}${idFarm}?idFarmer=${this.farmerId}`,
                method: 'get',
                withCredentials: false,
                timeout: 3000,
                responseType: 'json',
            });
        }
    }
}