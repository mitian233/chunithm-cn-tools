import { reactive } from "vue";
export const store = reactive({
    drawer: false,
    showDrawer() {
        store.drawer = true
    }
})