import { defineNuxtPlugin } from "#app";
import PrimeVue from "primevue/config";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import InputSwitch from "primevue/inputswitch";
import Calendar from "primevue/calendar";
import Card from "primevue/card";
import Badge from "primevue/badge";
import Checkbox from "primevue/checkbox";
import Toast from "primevue/toast";
import Tooltip from "primevue/tooltip";
import Dialog from "primevue/dialog";
import Chip from "primevue/chip";
import ToastService from "primevue/toastservice";
import Listbox from "primevue/listbox";
import Password from "primevue/password";
import DialogService from "primevue/dialogservice";
import SplitButton from "primevue/splitbutton";
import Divider from "primevue/divider";

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(PrimeVue, {ripple: true});
    nuxtApp.vueApp.use(ToastService);
    nuxtApp.vueApp.use(DialogService);

    nuxtApp.vueApp.directive('Checkbox', Tooltip);

    nuxtApp.vueApp.component('Button', Button);
    nuxtApp.vueApp.component('InputText', InputText);
    nuxtApp.vueApp.component('InputNumber', InputNumber);
    nuxtApp.vueApp.component('InputSwitch', InputSwitch);
    nuxtApp.vueApp.component('Calendar', Calendar);
    nuxtApp.vueApp.component('Card', Card);
    nuxtApp.vueApp.component('Badge', Badge);
    nuxtApp.vueApp.component('Checkbox', Checkbox);
    nuxtApp.vueApp.component('Toast', Toast);
    nuxtApp.vueApp.component('Dialog', Dialog);
    nuxtApp.vueApp.component('Chip', Chip);
    nuxtApp.vueApp.component('Listbox', Listbox);
    nuxtApp.vueApp.component('Password', Password);
    nuxtApp.vueApp.component('SplitButton', SplitButton);
    nuxtApp.vueApp.component('Divider', Divider);
});