import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'
import "./assets/reset.css"
import {  
  Form,
  FormItem,
  Button,
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
  TableColumn,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
} from 'element-ui'

Vue.use(Checkbox);
Vue.use(CheckboxButton);
Vue.use(CheckboxGroup);
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Button)
Vue.use(Input)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Dropdown);
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Table);
Vue.use(TableColumn);


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
