import './bootstrap';
import '../css/app.css';
import Toast from "vue-toastification";
import "../../node_modules/vue-toastification/dist/index.css";

// Required Core Stylesheet
import "../../node_modules/@glidejs/glide/dist/css/glide.core.min.css";
// Optional Theme Stylesheet
import "../../node_modules/@glidejs/glide/dist/css/glide.theme.min.css";

import '../../node_modules/@glidejs/glide/dist/glide.min.js';

import { createApp, h } from 'vue';
import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ZiggyVue } from '../../vendor/tightenco/ziggy';

import {library} from '@fortawesome/fontawesome-svg-core';
import {
    faMoneyBillTransfer,faSearch,faUser,faWallet,
    faTicket,faBars,faArrowPointer,faAngleLeft,faAngleRight,faCircleExclamation,
    faCircleCheck,faCircleXmark,faCircleInfo,faFloppyDisk,faMoon,faSun,faCirclePlus,faCircleMinus,
    faTriangleExclamation,faXmark,faTrash,faFile,faEye,faPencil,
    faCheck,faSpinner,faCircleUser,faCopy,faHourglassHalf
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
library.add(
    faMoneyBillTransfer,faSearch,faUser,faWallet,
    faTicket,faBars,faArrowPointer,faAngleLeft,faAngleRight,faCircleExclamation,
    faCircleCheck,faCircleXmark,faCircleInfo,faFloppyDisk,faMoon,faSun,faCirclePlus,faCircleMinus,
    faTriangleExclamation,faXmark,faTrash,faFile,faEye,faPencil,
    faCheck,faSpinner,faCircleUser,faCopy,faHourglassHalf
);

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob('./Pages/**/*.vue')),
    setup({ el, App, props, plugin }) {
        return createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(ZiggyVue)
            .use(Toast)
            .component('font-awesome-icon', FontAwesomeIcon)
            .mount(el);
    },
    progress: {
        color: '#4B5563',
    },
});

