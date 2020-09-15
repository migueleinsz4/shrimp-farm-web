import axios from "axios";
import {isId} from "../utils/Utils";

export function createRootStore() {
    const usersDb = new Map();
    usersDb.set("jsnow", {
        password: "cargill",
        farmerId: 1,
        farmerName: "Jon Snow"
    });
    usersDb.set("sstark", {
        password: "cargill",
        farmerId: 2,
        farmerName: "Sansa Stark"
    });
    axios.defaults.baseURL = "http://localhost:8081/cargill-shrimp-farm/api/v1.0";

    return {
        username: "",
        farmerName: "",
        farmerId: null,
        view: "LOGIN_VIEW",
        loginMessage: "Login ok",
        selectedMenu: "FARMS_VIEW",
        selectedOption: "FARMS_VIEW_SEARCH",
        login(username, password, view) {
            let user = usersDb.get(username);
            if (user && password === user.password) {
                this.username = username;
                this.farmerId = user.farmerId;
                this.farmerName = user.farmerName;
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
                url: `/farms`,
                method: 'post',
                responseType: 'json',
                data: {...farm}
            });
        },
        async updateFarm(farm) {
            return await axios({
                url: `/farms/${farm.id}`,
                method: 'put',
                responseType: 'json',
                data: {...farm}
            });
        },
        async deleteFarm(_id) {
            return await axios({
                url: `/farms/${_id}`,
                method: 'delete',
                responseType: 'json'
            });
        },
        async searchFarms(value) {
            let _id = null, _name = null;
            if (isId(value)) {
                console.log(`${value} is Id`);
                _id = value;
            } else {
                console.log(`${value} is Name`);
                _name = value;
            }
            let id = _id ? `/${_id}` : '';
            let name = _name ? `&farmName=${_name}` : '';
            return await axios({
                url: `/farms${id}?idFarmer=${this.farmerId}${name}`,
                method: 'get',
                withCredentials: false,
                timeout: 3000,
                responseType: 'json',
            });
        },
        async calculateFarmTotalSize(farmId) {
            return await axios({
                url: `/farms/${farmId}/size`,
                method: 'get',
                withCredentials: false,
                timeout: 3000,
                responseType: 'json',
            });
        },
        async createPond(pond) {
            return await axios({
                url: `/ponds`,
                method: 'post',
                responseType: 'json',
                data: {...pond}
            });
        },
        async updatePond(pond) {
            return await axios({
                url: `/ponds/${pond.id}`,
                method: 'put',
                responseType: 'json',
                data: {...pond}
            });
        },
        async deletePond(_id) {
            return await axios({
                url: `/ponds/${_id}`,
                method: 'delete',
                responseType: 'json'
            });
        },
        async searchPonds(value, _idFarm = null) {
            let _id = null, _name = null;
            if (isId(value)) {
                console.log(`${value} is Id`);
                _id = value;
            } else {
                console.log(`${value} is Name`);
                _name = value;
            }
            let id = _id ? `/${_id}` : '';
            let idFarm = _idFarm ? `&idFarm=${_idFarm}` : '';
            let name = _name ? `&pondName=${_name}` : '';
            return await axios({
                url: `/ponds${id}?idFarmer=${this.farmerId}${idFarm}${name}`,
                method: 'get',
                withCredentials: false,
                timeout: 3000,
                responseType: 'json',
            });
        }
    }
}