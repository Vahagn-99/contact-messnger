import { computed, inject } from 'vue';
import { useStore } from 'vuex';

export function useSubdomain() {
    const store = useStore();
    const amocrm = inject('amocrm');
    const subdomainId = computed(() => store.getters['subdomain/getSubdomainId']);
    const subdomain = computed(() => store.getters['subdomain/getSubdomain']);
    const isLicensed = computed(() => store.getters['subdomain/isLicensed']);
    const isRegistred = computed(() => store.getters['subdomain/isRegistred']);
    const hasPhone = computed(() => store.getters['subdomain/hasPhone']);
    const isSaved = computed(() => store.getters['subdomain/isSaved']);

    const checkIsRegistred = async () => await store.dispatch('subdomain/checkIsRegistred', subdomainId.value);
    const checkIsLicensed = async () => await store.dispatch('subdomain/checkIsLicensed', subdomainId.value);
    const checkIsSaved = async () => await store.dispatch('subdomain/checkIsSaved', subdomainId.value);
    const save = async () => await store.dispatch('subdomain/save', subdomainId.value);
    const addPhone = async (data) => {
        await store.dispatch('subdomain/addPhone', data);
        await checkHasPhone();
    };
    const checkHasPhone = async () => await store.dispatch('subdomain/checkHasPhone');

    const asyncSubdomain = async () => {
        const account = amocrm.constant('account')
        await store.dispatch('subdomain/async', account.subdomain);
    }

    return {
        asyncSubdomain,
        checkIsRegistred,
        checkIsLicensed,
        subdomainId,
        isRegistred,
        isLicensed,
        checkHasPhone,
        addPhone,
        subdomain,
        hasPhone,
        isSaved,
        checkIsSaved,
        save
    };
}