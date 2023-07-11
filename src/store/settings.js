import apiClient from "../../apiClient";

const settings = {
    namespaced: true,
    state: {
        settings: []
    },
    getters: {
        getSettings: (state) => state.settings,
    },
    mutations: {
        setSettings: (state, settings) => state.settings = settings,
    },
    actions: {
        // save new client data in the back-end
        save: async ({ commit, state }, subdomainId) => {
            const { settings } = state;
            const response = await apiClient.post(`lead-colors/v1/${subdomainId}/settings`, {
                settings
            });
            commit("setSettings", response.data.data);
        },
        get: async ({ commit }, subdomainId) => {
            let response = await apiClient.get(`lead-colors/v1/${subdomainId}/settings`);
            let settings = response.data.data;
            commit('setSettings', settings);
        },
        show: async ({ commit }, data) => {
            const subdomainId = data.subdomain_id;
            const settingsId = data.settings_id;
            let response = await apiClient.get(`lead-colors/v1/${subdomainId}/settings/${settingsId}`);
            let settings = response.data.data;
            commit('setSettings', settings);
        },
        destory: async ({ commit }, { subdomainId, settingsId }) => {
            await apiClient.delete(`lead-colors/v1/${subdomainId}/settings/${settingsId}`);
            commit("setSettings", [])
        }
    },
}
export default settings;









