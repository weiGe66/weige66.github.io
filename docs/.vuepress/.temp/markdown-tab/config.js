import { CodeTabs } from "/Users/zhengwei/myCode/blog/node_modules/.pnpm/@vuepress+plugin-markdown-tab@2.0.0-rc.66_markdown-it@14.1.0_vuepress@2.0.0-rc.19_@vuepress+b_rmerkfv3ofdgdqbrkc5olbl6um/node_modules/@vuepress/plugin-markdown-tab/lib/client/components/CodeTabs.js";
import { Tabs } from "/Users/zhengwei/myCode/blog/node_modules/.pnpm/@vuepress+plugin-markdown-tab@2.0.0-rc.66_markdown-it@14.1.0_vuepress@2.0.0-rc.19_@vuepress+b_rmerkfv3ofdgdqbrkc5olbl6um/node_modules/@vuepress/plugin-markdown-tab/lib/client/components/Tabs.js";
import "/Users/zhengwei/myCode/blog/node_modules/.pnpm/@vuepress+plugin-markdown-tab@2.0.0-rc.66_markdown-it@14.1.0_vuepress@2.0.0-rc.19_@vuepress+b_rmerkfv3ofdgdqbrkc5olbl6um/node_modules/@vuepress/plugin-markdown-tab/lib/client/styles/vars.css";

export default {
  enhance: ({ app }) => {
    app.component("CodeTabs", CodeTabs);
    app.component("Tabs", Tabs);
  },
};
