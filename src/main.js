import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'
import VueCookies from 'vue-cookies'
import "./assets/reset.css"
import {
  Form,
  FormItem,
  Button,
  Upload,
  Dialog,
  Alert,
  Switch,
  Input,
  Container,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Header,
  Aside,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Main,
  Table,
  Tag,
  TableColumn,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Loading
} from 'element-ui'

Vue.use(Loading.directive);
Vue.use(Checkbox);
Vue.use(CheckboxButton);
Vue.use(CheckboxGroup);
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Button)
Vue.use(Input)
Vue.use(Menu)
Vue.use(Upload);
Vue.use(Dialog);
Vue.use(Tag);
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Switch)
Vue.use(Main)
Vue.use(Dropdown);
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Alert);


Vue.use(VueCookies)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
