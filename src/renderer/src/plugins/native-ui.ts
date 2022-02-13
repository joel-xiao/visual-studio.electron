// 通用字体
import 'vfonts/Lato.css';
// 等宽字体
import 'vfonts/FiraCode.css';

import {
  create,
  NLoadingBarProvider,
  NSpace,
  NSpin,
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NLayoutFooter,
  NH2,
  NButton
} from 'naive-ui';

const components = [
  NLoadingBarProvider,
  NSpace,
  NSpin,
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NLayoutFooter,
  NH2,
  NButton
];
const naive = create({
  components
});

export default naive;
