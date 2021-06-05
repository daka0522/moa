// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faCheck,
    faPencilAlt,
    faUndo,
    faSave,
    faTrash,
    faExclamation,
    faExclamationTriangle,
    faTools,
    faPalette,
    faCertificate,
    faLock,
    faLockOpen
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add({
    faCheck,
    faPencilAlt,
    faUndo,
    faSave,
    faTrash,
    faExclamation,
    faExclamationTriangle,
    faTools,
    faPalette,
    faCertificate,
    faLock,
    faLockOpen
})
Vue.component('fa-i', FontAwesomeIcon)