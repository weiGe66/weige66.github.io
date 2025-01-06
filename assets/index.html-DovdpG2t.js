import{_ as n,c as a,e as l,o as e}from"./app-BFIWhM4u.js";const o={};function p(t,s){return e(),a("div",null,s[0]||(s[0]=[l(`<h2 id="函数柯里化" tabindex="-1"><a class="header-anchor" href="#函数柯里化"><span>函数柯里化</span></a></h2><blockquote><p>函数柯里化用于将一个多参函数转换为多个单参函数的组合，使得函数变得&gt; 更加灵活、更易用、更加模块化，从而提高代码的可读性和可维护性。 以下是柯里化常见的使用场景： 1.参数复用 当一个函数输入的参数比较多，而且有一些参数需要在不同的地方复用时，&gt; 柯里化可以帮助我们将那些要复用的参数进行缓存，避免重复输入该参数。&gt; 这样可以减少代码所需的参数数量，从而提高代码的可读性。 2. 延迟执行 柯里化函数可以将多个参数的函数拆分成多个单个参数的函数，在调用柯里&gt; 化函数时，只需要提供部分参数，此时返回该函数的一个新的柯里化函数。&gt; 当准备好所有参数后，再一次性地调用这个柯里化函数，从而达到延迟执行&gt; 的效果。 3. 预处理数据 柯里化函数可以用来对数据进行一些辅助计算，预处理数据以便于后续的函&gt; 数调用。这样可以使得我们的代码更加清晰和模块化。 4. 代码复用 柯里化可以避免编写相似代码的复制粘贴，因为我们只需要对共性代码进行&gt; 柯里化封装，然后提供不同的参数从而达到复用代码的效果。</p></blockquote><div class="language-js line-numbers-mode" data-ext="js" data-title="js"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#C678DD;">function</span><span style="color:#61AFEF;"> curry</span><span style="color:#ABB2BF;">(</span><span style="color:#E06C75;font-style:italic;">fn</span><span style="color:#ABB2BF;">) {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C678DD;">      return</span><span style="color:#C678DD;"> function</span><span style="color:#61AFEF;"> curried</span><span style="color:#ABB2BF;">(...</span><span style="color:#E06C75;font-style:italic;">args</span><span style="color:#ABB2BF;">) {</span></span>
<span class="line"><span style="color:#ABB2BF;">      </span></span>
<span class="line"><span style="color:#C678DD;">        if</span><span style="color:#ABB2BF;"> (</span><span style="color:#E5C07B;">args</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">length</span><span style="color:#56B6C2;"> &gt;=</span><span style="color:#E5C07B;"> fn</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">length</span><span style="color:#ABB2BF;">) {</span></span>
<span class="line"><span style="color:#ABB2BF;">        </span></span>
<span class="line"><span style="color:#C678DD;">          return</span><span style="color:#E5C07B;"> fn</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">apply</span><span style="color:#ABB2BF;">(</span><span style="color:#E5C07B;">this</span><span style="color:#ABB2BF;">, </span><span style="color:#E06C75;">args</span><span style="color:#ABB2BF;">)</span></span>
<span class="line"><span style="color:#ABB2BF;">        } </span><span style="color:#C678DD;">else</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#ABB2BF;">         </span></span>
<span class="line"><span style="color:#C678DD;">          return</span><span style="color:#C678DD;"> function</span><span style="color:#ABB2BF;"> (...</span><span style="color:#E06C75;font-style:italic;">args2</span><span style="color:#ABB2BF;">) {</span></span>
<span class="line"><span style="color:#ABB2BF;">           </span></span>
<span class="line"><span style="color:#C678DD;">            return</span><span style="color:#E5C07B;"> curried</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">apply</span><span style="color:#ABB2BF;">(</span><span style="color:#E5C07B;">this</span><span style="color:#ABB2BF;">, </span><span style="color:#E5C07B;">args</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">concat</span><span style="color:#ABB2BF;">(</span><span style="color:#E06C75;">args2</span><span style="color:#ABB2BF;">))</span></span>
<span class="line"><span style="color:#ABB2BF;">          }</span></span>
<span class="line"><span style="color:#ABB2BF;">        }</span></span>
<span class="line"><span style="color:#ABB2BF;">      }</span></span>
<span class="line"><span style="color:#ABB2BF;">    }</span></span>
<span class="line"><span style="color:#C678DD;">    function</span><span style="color:#61AFEF;"> fn1</span><span style="color:#ABB2BF;">(</span><span style="color:#E06C75;font-style:italic;">a</span><span style="color:#ABB2BF;">, </span><span style="color:#E06C75;font-style:italic;">b</span><span style="color:#ABB2BF;">, </span><span style="color:#E06C75;font-style:italic;">c</span><span style="color:#ABB2BF;">) {</span></span>
<span class="line"><span style="color:#C678DD;">      return</span><span style="color:#E06C75;"> a</span><span style="color:#56B6C2;"> +</span><span style="color:#E06C75;"> b</span><span style="color:#56B6C2;"> +</span><span style="color:#E06C75;"> c</span></span>
<span class="line"><span style="color:#ABB2BF;">    }</span></span>
<span class="line"><span style="color:#C678DD;">    let</span><span style="color:#E06C75;"> fn2</span><span style="color:#56B6C2;"> =</span><span style="color:#61AFEF;"> curry</span><span style="color:#ABB2BF;">(</span><span style="color:#E06C75;">fn1</span><span style="color:#ABB2BF;">)</span></span>
<span class="line"><span style="color:#C678DD;">    let</span><span style="color:#E06C75;"> res</span><span style="color:#56B6C2;"> =</span><span style="color:#61AFEF;"> fn2</span><span style="color:#ABB2BF;">(</span><span style="color:#D19A66;">1</span><span style="color:#ABB2BF;">)(</span><span style="color:#D19A66;">2</span><span style="color:#ABB2BF;">)(</span><span style="color:#D19A66;">3</span><span style="color:#ABB2BF;">)</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">    // console.log(res) // 6</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3)]))}const r=n(o,[["render",p],["__file","index.html.vue"]]),i=JSON.parse(`{"path":"/article/o5nqb7vf/","title":"函数柯里化","lang":"zh-CN","frontmatter":{"title":"函数柯里化","createTime":"2024/12/28 23:11:04","permalink":"/article/o5nqb7vf/","tags":["js"],"description":"函数柯里化 函数柯里化用于将一个多参函数转换为多个单参函数的组合，使得函数变得> 更加灵活、更易用、更加模块化，从而提高代码的可读性和可维护性。 以下是柯里化常见的使用场景： 1.参数复用 当一个函数输入的参数比较多，而且有一些参数需要在不同的地方复用时，> 柯里化可以帮助我们将那些要复用的参数进行缓存，避免重复输入该参数。> 这样可以减少代码所需的参...","head":[["meta",{"property":"og:url","content":"https://weige66.github.io/article/o5nqb7vf/"}],["meta",{"property":"og:site_name","content":"zhengWei's Blog"}],["meta",{"property":"og:title","content":"函数柯里化"}],["meta",{"property":"og:description","content":"函数柯里化 函数柯里化用于将一个多参函数转换为多个单参函数的组合，使得函数变得> 更加灵活、更易用、更加模块化，从而提高代码的可读性和可维护性。 以下是柯里化常见的使用场景： 1.参数复用 当一个函数输入的参数比较多，而且有一些参数需要在不同的地方复用时，> 柯里化可以帮助我们将那些要复用的参数进行缓存，避免重复输入该参数。> 这样可以减少代码所需的参..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-12-28T16:17:08.000Z"}],["meta",{"property":"article:tag","content":"js"}],["meta",{"property":"article:modified_time","content":"2024-12-28T16:17:08.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"函数柯里化\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-12-28T16:17:08.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"weiGe66\\",\\"url\\":\\"https://github.com/weiGe66\\",\\"email\\":\\"2361929296@qq.com\\"}]}"]]},"headers":[],"readingTime":{"minutes":1.52,"words":455},"git":{"updatedTime":1735402628000,"contributors":[{"name":"zhengwei","username":"zhengwei","email":"wangzhengwei@nstc.com.cn","commits":1,"avatar":"https://avatars.githubusercontent.com/zhengwei?v=4","url":"https://github.com/zhengwei"}]},"autoDesc":true,"filePathRelative":"blog/js工具库/函数柯里化.md","categoryList":[{"id":"126ac9","sort":10005,"name":"blog"},{"id":"11dc35","sort":10011,"name":"js工具库"}],"bulletin":false}`);export{r as comp,i as data};
