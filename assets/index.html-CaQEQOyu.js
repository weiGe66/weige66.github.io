import{_ as n,c as a,e,o as l}from"./app-BFIWhM4u.js";const p={};function t(o,s){return l(),a("div",null,s[0]||(s[0]=[e(`<h2 id="防抖" tabindex="-1"><a class="header-anchor" href="#防抖"><span>防抖</span></a></h2><p>当持续触发事件时，一定时间段内没有再触发事件，事件处理函数才会执行一次，如果设定的时间到来之前，又一次触发了事件，就重新开始延时。</p><div class="language-javascript line-numbers-mode" data-ext="javascript" data-title="javascript"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#C678DD;">let</span><span style="color:#E06C75;"> input</span><span style="color:#56B6C2;"> =</span><span style="color:#E5C07B;">document</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">querySelector</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39;input&#39;</span><span style="color:#ABB2BF;">)</span></span>
<span class="line"><span style="color:#C678DD;">    function</span><span style="color:#61AFEF;"> ajax</span><span style="color:#ABB2BF;">(</span><span style="color:#E06C75;font-style:italic;">param</span><span style="color:#ABB2BF;">) {</span></span>
<span class="line"><span style="color:#E5C07B;">        console</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">log</span><span style="color:#ABB2BF;">(</span><span style="color:#E06C75;">param</span><span style="color:#ABB2BF;">);</span></span>
<span class="line"><span style="color:#ABB2BF;">    }</span></span>
<span class="line"><span style="color:#E5C07B;">    input</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">addEventListener</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39;input&#39;</span><span style="color:#ABB2BF;">,(</span><span style="color:#E06C75;font-style:italic;">e</span><span style="color:#ABB2BF;">) </span><span style="color:#C678DD;">=&gt;</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#61AFEF;">         debounceAjax</span><span style="color:#ABB2BF;">(</span><span style="color:#E5C07B;">e</span><span style="color:#ABB2BF;">.</span><span style="color:#E5C07B;">target</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">value</span><span style="color:#ABB2BF;">)</span></span>
<span class="line"><span style="color:#ABB2BF;">    })</span></span>
<span class="line"><span style="color:#C678DD;">    function</span><span style="color:#61AFEF;"> debounce</span><span style="color:#ABB2BF;">(</span><span style="color:#E06C75;font-style:italic;">fn</span><span style="color:#ABB2BF;">,</span><span style="color:#E06C75;font-style:italic;">wait</span><span style="color:#ABB2BF;">) {</span></span>
<span class="line"><span style="color:#C678DD;">        let</span><span style="color:#E06C75;"> timer</span><span style="color:#56B6C2;"> =</span><span style="color:#D19A66;"> null</span></span>
<span class="line"><span style="color:#C678DD;">        let</span><span style="color:#E06C75;"> that</span><span style="color:#56B6C2;"> =</span><span style="color:#E5C07B;"> this</span></span>
<span class="line"><span style="color:#C678DD;">        return</span><span style="color:#C678DD;"> function</span><span style="color:#ABB2BF;">(</span><span style="color:#E06C75;font-style:italic;">param</span><span style="color:#ABB2BF;">) {  </span></span>
<span class="line"><span style="color:#61AFEF;">            clearTimeout</span><span style="color:#ABB2BF;">(</span><span style="color:#E06C75;">timer</span><span style="color:#ABB2BF;">)</span></span>
<span class="line"><span style="color:#E06C75;">            timer</span><span style="color:#56B6C2;"> =</span><span style="color:#61AFEF;"> setTimeout</span><span style="color:#ABB2BF;">(() </span><span style="color:#C678DD;">=&gt;</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#E5C07B;">            fn</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">call</span><span style="color:#ABB2BF;">(</span><span style="color:#E06C75;">that</span><span style="color:#ABB2BF;">,</span><span style="color:#E06C75;">param</span><span style="color:#ABB2BF;">)</span></span>
<span class="line"><span style="color:#ABB2BF;">            },</span><span style="color:#E06C75;">wait</span><span style="color:#ABB2BF;">)</span></span>
<span class="line"><span style="color:#ABB2BF;">        }      </span></span>
<span class="line"><span style="color:#ABB2BF;">    }</span></span>
<span class="line"><span style="color:#C678DD;">let</span><span style="color:#E06C75;"> debounceAjax</span><span style="color:#56B6C2;"> =</span><span style="color:#61AFEF;"> debounce</span><span style="color:#ABB2BF;">(</span><span style="color:#E06C75;">ajax</span><span style="color:#ABB2BF;">,</span><span style="color:#D19A66;">1000</span><span style="color:#ABB2BF;">)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3)]))}const r=n(p,[["render",t],["__file","index.html.vue"]]),i=JSON.parse(`{"path":"/article/sjafeetp/","title":"防抖","lang":"zh-CN","frontmatter":{"title":"防抖","createTime":"2024/12/28 23:06:41","permalink":"/article/sjafeetp/","tags":["js"],"description":"防抖 当持续触发事件时，一定时间段内没有再触发事件，事件处理函数才会执行一次，如果设定的时间到来之前，又一次触发了事件，就重新开始延时。","head":[["meta",{"property":"og:url","content":"https://weige66.github.io/article/sjafeetp/"}],["meta",{"property":"og:site_name","content":"zhengWei's Blog"}],["meta",{"property":"og:title","content":"防抖"}],["meta",{"property":"og:description","content":"防抖 当持续触发事件时，一定时间段内没有再触发事件，事件处理函数才会执行一次，如果设定的时间到来之前，又一次触发了事件，就重新开始延时。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-12-28T16:17:08.000Z"}],["meta",{"property":"article:tag","content":"js"}],["meta",{"property":"article:modified_time","content":"2024-12-28T16:17:08.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"防抖\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-12-28T16:17:08.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"weiGe66\\",\\"url\\":\\"https://github.com/weiGe66\\",\\"email\\":\\"2361929296@qq.com\\"}]}"]]},"headers":[],"readingTime":{"minutes":0.38,"words":114},"git":{"updatedTime":1735402628000,"contributors":[{"name":"zhengwei","username":"zhengwei","email":"wangzhengwei@nstc.com.cn","commits":1,"avatar":"https://avatars.githubusercontent.com/zhengwei?v=4","url":"https://github.com/zhengwei"}]},"autoDesc":true,"filePathRelative":"blog/js工具库/防抖.md","categoryList":[{"id":"126ac9","sort":10005,"name":"blog"},{"id":"11dc35","sort":10011,"name":"js工具库"}],"bulletin":false}`);export{r as comp,i as data};