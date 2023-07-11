import { computed } from 'vue';
import { useStore } from 'vuex';
import { notify } from "@kyvg/vue3-notification";

export function useSettings() {
    const store = useStore();
    const settings = computed(() => store.getters['settings/getSettings']);
    const subdomainId = computed(() => store.getters['subdomain/getSubdomainId']);
    const hasSettings = computed(() => settings.value.length > 0);
    const getSettings = async () => {
        try {
            await store.dispatch('settings/get', subdomainId.value)
        } catch (error) {
            console.log(error);
        }
    }

    const showSettings = async (settingsId) => {
        try {
            await store.dispatch('settings/show', {
                'subdomain_id': subdomainId.value,
                'settings_id': settingsId,
            })
        } catch (error) {
            console.log(error);
        }
    }

    const saveSettings = async () => {
        try {
            await store.dispatch('settings/save', subdomainId.value);
            notify({
                type: 'success',
                title: "Пользователь #" + subdomainId.value,
                text: "Настройки успешно сохранены",
            });
        } catch (error) {
            notify({
                type: 'error',
                title: "Пользователь #" + subdomainId.value,
                text: "Заполните все поля или попробуйте авторизоваться еще раз",
            });
        }
    }

    const destorySettings = async (settingsId) => {
        console.log(settingsId);
        try {
            await store.dispatch('settings/destory', {
                subdomainId: subdomainId.value, settingsId
            });
            await getSettings();
            notify({
                type: 'success',
                title: "Пользователь #" + subdomainId.value,
                text: "Настройки успешно Удалены",
            });
        } catch (error) {
            notify({
                type: 'error',
                title: "Пользователь #" + subdomainId.value,
                text: "Что-то пошло не так! Повтарите действе или заново авторизуйтесь",
            });
        }
    }

    return {
        settings,
        getSettings,
        hasSettings,
        saveSettings,
        showSettings,
        destorySettings
    };
}