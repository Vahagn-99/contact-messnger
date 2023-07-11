import { createStore } from "vuex";
import subdomain from "./subdomain";
import settings from "./settings";
import selectable from "./selectable";

const store = createStore({
    modules: {
        subdomain,
        settings,
        selectable
    }
});

export default store;