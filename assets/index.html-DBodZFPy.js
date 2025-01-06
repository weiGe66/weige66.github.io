import{_ as s,c as n,e as a,o as t}from"./app-BFIWhM4u.js";const l={};function o(p,e){return t(),n("div",null,e[0]||(e[0]=[a(`<h3 id="函数只执行一次" tabindex="-1"><a class="header-anchor" href="#函数只执行一次"><span>函数只执行一次</span></a></h3><p>在一些特殊的场景，某一个函数只允许执行一次，或者绑定的某一个方法只允许执行一次。</p><div class="language-js line-numbers-mode" data-ext="js" data-title="js"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#C678DD;">function</span><span style="color:#61AFEF;"> onceFn</span><span style="color:#ABB2BF;"> (</span><span style="color:#E06C75;font-style:italic;">fn</span><span style="color:#ABB2BF;">) {</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">  // 利用闭包判断函数是否执行过</span></span>
<span class="line"><span style="color:#C678DD;">  let</span><span style="color:#E06C75;"> mark</span><span style="color:#56B6C2;"> =</span><span style="color:#D19A66;"> false</span></span>
<span class="line"><span style="color:#C678DD;">  return</span><span style="color:#C678DD;"> function</span><span style="color:#ABB2BF;"> () {</span></span>
<span class="line"><span style="color:#C678DD;">    if</span><span style="color:#ABB2BF;"> (</span><span style="color:#56B6C2;">!</span><span style="color:#E06C75;">mark</span><span style="color:#ABB2BF;">) {</span></span>
<span class="line"><span style="color:#E06C75;">      mark</span><span style="color:#56B6C2;">=</span><span style="color:#D19A66;"> true</span></span>
<span class="line"><span style="color:#E5C07B;">      fn</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">apply</span><span style="color:#ABB2BF;">(</span><span style="color:#E5C07B;">this</span><span style="color:#ABB2BF;">, </span><span style="color:#E5C07B;">arguments</span><span style="color:#ABB2BF;">)</span></span>
<span class="line"><span style="color:#ABB2BF;">    }</span></span>
<span class="line"><span style="color:#ABB2BF;">  }</span></span>
<span class="line"><span style="color:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3)]))}const r=s(l,[["render",o],["__file","index.html.vue"]]),c=JSON.parse(`{"path":"/article/c0w40q7j/","title":"函数只执行一次","lang":"zh-CN","frontmatter":{"title":"函数只执行一次","createTime":"2024/12/28 23:11:41","permalink":"/article/c0w40q7j/","tags":["js"],"description":"函数只执行一次 在一些特殊的场景，某一个函数只允许执行一次，或者绑定的某一个方法只允许执行一次。","head":[["meta",{"property":"og:url","content":"https://weige66.github.io/article/c0w40q7j/"}],["meta",{"property":"og:site_name","content":"zhengWei's Blog"}],["meta",{"property":"og:title","content":"函数只执行一次"}],["meta",{"property":"og:description","content":"函数只执行一次 在一些特殊的场景，某一个函数只允许执行一次，或者绑定的某一个方法只允许执行一次。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-12-28T16:17:08.000Z"}],["meta",{"property":"article:tag","content":"js"}],["meta",{"property":"article:modified_time","content":"2024-12-28T16:17:08.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"函数只执行一次\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-12-28T16:17:08.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"weiGe66\\",\\"url\\":\\"https://github.com/weiGe66\\",\\"email\\":\\"2361929296@qq.com\\"}]}"]]},"headers":[],"readingTime":{"minutes":0.3,"words":91},"git":{"updatedTime":1735402628000,"contributors":[{"name":"zhengwei","username":"zhengwei","email":"wangzhengwei@nstc.com.cn","commits":1,"avatar":"https://avatars.githubusercontent.com/zhengwei?v=4","url":"https://github.com/zhengwei"}]},"autoDesc":true,"filePathRelative":"blog/js工具库/函数只执行一次.md","categoryList":[{"id":"126ac9","sort":10005,"name":"blog"},{"id":"11dc35","sort":10011,"name":"js工具库"}],"bulletin":false}`);export{r as comp,c as data};
