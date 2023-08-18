import { App } from 'vue';

import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import SgLayoutContainer from '@/components/layout/sgLayoutContainer.vue';
import SgLayoutScroll from '@/components/layout/sgLayoutScroll.vue';
import SgLayoutCenter from '@/components/layout/sgLayoutCenter.vue';
import SgLayoutFlex from '@/components/layout/sgLayoutFlex.vue';
import SgLayoutFlexAverage from '@/components/layout/sgLayoutFlexAverage.vue';
import SgLayoutBox from '@/components/layout/sgLayoutBox.vue';
import SgTitle from '@/components/title/sgTitle.vue';
import SgIconTitle from '@/components/title/sgIconTitle.vue';

export default {
  install: (app: App) => {
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component);
    }
    app
      .component('SgLayoutCenter', SgLayoutCenter)
      .component('SgLayoutFlex', SgLayoutFlex)
      .component('SgLayoutFlexAverage', SgLayoutFlexAverage)
      .component('SgLayoutBox', SgLayoutBox)
      .component('SgTitle', SgTitle)
      .component('SgIconTitle', SgIconTitle)
      .component('SgLayoutContainer', SgLayoutContainer)
      .component('SgLayoutScroll', SgLayoutScroll);
  },
};
