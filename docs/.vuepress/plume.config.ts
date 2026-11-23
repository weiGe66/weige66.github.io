import { defineThemeConfig } from 'vuepress-theme-plume'
import { zhNavbar } from './navbar'
import {  zhNotes } from './notes'

/**
 * @see https://theme-plume.vuejs.press/config/basic/
 */
export default defineThemeConfig({
  logo: '/images/logo.png',

  appearance: true,

  social: [
    { icon: 'github', link: 'https://github.com/weiGe66' },
    { icon: 'juejin', link: 'https://juejin.cn/user/1169536105056071' }
  ],
  navbarSocialInclude: ['github', 'juejin'],
  locales: {
    '/': {
      profile: {
        avatar: '/images/logo.png',
        name: "zhengWei's Blog",
        description: '记录前端工程中的技术取舍、故障排查与验证过程。',
        circle: true,
        location: '武汉',
        // organization: '',
      },

      navbar: zhNavbar,
      notes: zhNotes,
    }
  },
})
