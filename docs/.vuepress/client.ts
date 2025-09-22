import { defineClientConfig } from 'vuepress/client'
// import RepoCard from 'vuepress-theme-plume/features/RepoCard.vue'
import CustomFooter from './theme/components/CustomFooter.vue'

import "./theme/styles/index.scss";

export default defineClientConfig({
  enhance({ app }) {
    // app.component('RepoCard', RepoCard)
    app.component('CustomFooter', CustomFooter)
  }
})
