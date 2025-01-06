import{_ as n,c as a,e as l,o as e}from"./app-BFIWhM4u.js";const p={};function o(t,s){return e(),a("div",null,s[0]||(s[0]=[l(`<blockquote></blockquote><p>给你一个整数 x ，如果 x 是一个回文整数，返回 true ；否则，返回 false 。</p><p>回文数 是指正序（从左向右）和倒序（从右向左）读都是一样的整数。</p><p>例如，121 是回文，而 123 不是。</p><blockquote></blockquote><h3 id="解题思路" tabindex="-1"><a class="header-anchor" href="#解题思路"><span>解题思路</span></a></h3><blockquote></blockquote><p>解法一: 1.先将给定数转换为字符串 2.获取字符串的开始索引和结束索引 3.通过while循环判断 当第一和最后一位不相等则不是回文数返回false否则直至循环结束返回true</p><blockquote></blockquote><div class="language-js line-numbers-mode" data-ext="js" data-title="js"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#7F848E;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"> * 检查给定的整数是否为回文数。</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"> * 如果一个数从左到右读和从右到左读都是一样的，那么这个数就是回文数。</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"> *</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"> * </span><span style="color:#C678DD;font-style:italic;">@param</span><span style="color:#E5C07B;font-style:italic;"> {number}</span><span style="color:#E06C75;font-style:italic;"> x</span><span style="color:#7F848E;font-style:italic;"> - 要检查的整数。</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"> * </span><span style="color:#C678DD;font-style:italic;">@return</span><span style="color:#E5C07B;font-style:italic;"> {boolean}</span><span style="color:#7F848E;font-style:italic;"> - 如果 x 是回文数则返回 true，否则返回 false。</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"> */</span></span>
<span class="line"><span style="color:#C678DD;">var</span><span style="color:#61AFEF;"> isPalindrome</span><span style="color:#56B6C2;"> =</span><span style="color:#C678DD;"> function</span><span style="color:#ABB2BF;"> (</span><span style="color:#E06C75;font-style:italic;">x</span><span style="color:#ABB2BF;">) {</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">  // 将整数转换为字符串</span></span>
<span class="line"><span style="color:#C678DD;">  let</span><span style="color:#E06C75;"> str</span><span style="color:#56B6C2;"> =</span><span style="color:#E5C07B;"> x</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">toString</span><span style="color:#ABB2BF;">();</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">  // 获取字符串的长度</span></span>
<span class="line"><span style="color:#C678DD;">  let</span><span style="color:#E06C75;"> len</span><span style="color:#56B6C2;"> =</span><span style="color:#E5C07B;"> str</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">length</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">  // 初始化两个指针，一个指向字符串的开头，一个指向字符串的结尾</span></span>
<span class="line"><span style="color:#C678DD;">  let</span><span style="color:#E06C75;"> i</span><span style="color:#56B6C2;"> =</span><span style="color:#D19A66;"> 0</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#C678DD;">  let</span><span style="color:#E06C75;"> j</span><span style="color:#56B6C2;"> =</span><span style="color:#E06C75;"> len</span><span style="color:#56B6C2;"> -</span><span style="color:#D19A66;"> 1</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">  // 从字符串的两端向中间遍历</span></span>
<span class="line"><span style="color:#C678DD;">  while</span><span style="color:#ABB2BF;"> (</span><span style="color:#E06C75;">i</span><span style="color:#56B6C2;"> &lt;</span><span style="color:#E06C75;"> j</span><span style="color:#ABB2BF;">) {</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">    // 如果两个指针所指的字符不相等，那么这个字符串就不是回文数</span></span>
<span class="line"><span style="color:#C678DD;">    if</span><span style="color:#ABB2BF;"> (</span><span style="color:#E06C75;">str</span><span style="color:#ABB2BF;">[</span><span style="color:#E06C75;">i</span><span style="color:#ABB2BF;">] </span><span style="color:#56B6C2;">!==</span><span style="color:#E06C75;"> str</span><span style="color:#ABB2BF;">[</span><span style="color:#E06C75;">j</span><span style="color:#ABB2BF;">]) {</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">      // 返回 false</span></span>
<span class="line"><span style="color:#C678DD;">      return</span><span style="color:#D19A66;"> false</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#ABB2BF;">    }</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">    // 两个指针向中间移动一步</span></span>
<span class="line"><span style="color:#E06C75;">    i</span><span style="color:#56B6C2;">++</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#E06C75;">    j</span><span style="color:#56B6C2;">--</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#ABB2BF;">  }</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">  // 如果遍历完整个字符串都没有发现不相等的字符，那么这个字符串就是回文数</span></span>
<span class="line"><span style="color:#C678DD;">  return</span><span style="color:#D19A66;"> true</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#ABB2BF;">};</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote></blockquote><p>解法二: 1.设置一个和标记 2.将给定值转字符串 3.循环字符串的一半通过字符串的charAt()方法判断开始是否等于结束 不等于返回false否则返回true</p><blockquote></blockquote><div class="language-js line-numbers-mode" data-ext="js" data-title="js"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#C678DD;">var</span><span style="color:#61AFEF;"> isPalindrome</span><span style="color:#56B6C2;"> =</span><span style="color:#C678DD;"> function</span><span style="color:#ABB2BF;">(</span><span style="color:#E06C75;font-style:italic;">x</span><span style="color:#ABB2BF;">) {</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">    // 设置一个标记，默认 true</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span></span>
<span class="line"><span style="color:#E06C75;">    x</span><span style="color:#56B6C2;">&lt;</span><span style="color:#D19A66;">0</span><span style="color:#C678DD;"> ?</span><span style="color:#E06C75;"> flag</span><span style="color:#56B6C2;"> =</span><span style="color:#D19A66;"> false</span><span style="color:#C678DD;">:</span><span style="color:#E06C75;"> flag</span><span style="color:#56B6C2;"> =</span><span style="color:#D19A66;"> true</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">    // 先将数字转换为字符串</span></span>
<span class="line"><span style="color:#C678DD;">    let</span><span style="color:#E06C75;"> str</span><span style="color:#56B6C2;"> =</span><span style="color:#E5C07B;"> x</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">toString</span><span style="color:#ABB2BF;">()</span></span>
<span class="line"><span style="color:#C678DD;">    switch</span><span style="color:#ABB2BF;">(</span><span style="color:#E5C07B;">str</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">lengt</span><span style="color:#ABB2BF;">) {</span></span>
<span class="line"><span style="color:#C678DD;">        case</span><span style="color:#D19A66;"> 1</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">            flag</span><span style="color:#56B6C2;"> =</span><span style="color:#D19A66;"> true</span></span>
<span class="line"><span style="color:#C678DD;">            break</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#C678DD;">        case</span><span style="color:#D19A66;"> 2</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">            str</span><span style="color:#ABB2BF;">[</span><span style="color:#D19A66;">0</span><span style="color:#ABB2BF;">] </span><span style="color:#56B6C2;">===</span><span style="color:#E06C75;"> str</span><span style="color:#ABB2BF;">[</span><span style="color:#D19A66;">1</span><span style="color:#ABB2BF;">] </span><span style="color:#C678DD;">?</span><span style="color:#E06C75;"> flag</span><span style="color:#56B6C2;"> =</span><span style="color:#D19A66;"> true</span><span style="color:#C678DD;">:</span><span style="color:#E06C75;">flag</span><span style="color:#56B6C2;"> =</span><span style="color:#D19A66;"> false</span></span>
<span class="line"><span style="color:#C678DD;">            break</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#C678DD;">        default</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#C678DD;">            for</span><span style="color:#ABB2BF;">(</span><span style="color:#C678DD;">let</span><span style="color:#E06C75;"> i</span><span style="color:#56B6C2;"> =</span><span style="color:#D19A66;">0</span><span style="color:#ABB2BF;">; </span><span style="color:#E06C75;">i</span><span style="color:#56B6C2;">&lt;</span><span style="color:#E5C07B;">str</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">length</span><span style="color:#56B6C2;">/</span><span style="color:#D19A66;">2</span><span style="color:#ABB2BF;">;</span><span style="color:#E06C75;">i</span><span style="color:#56B6C2;">++</span><span style="color:#ABB2BF;">) {</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">                    // charAt() 方法可返回指定位置的字符。 </span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">                    // 判断索引第一个位置的字符等不等于最后一个位置的字符</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">                    // 不等于则不是回文数，标记为false</span></span>
<span class="line"><span style="color:#C678DD;">                if</span><span style="color:#ABB2BF;">(</span><span style="color:#E5C07B;">str</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">charAt</span><span style="color:#ABB2BF;">(</span><span style="color:#E06C75;">i</span><span style="color:#ABB2BF;">) </span><span style="color:#56B6C2;">!==</span><span style="color:#E5C07B;"> str</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">charAt</span><span style="color:#ABB2BF;">(</span><span style="color:#E5C07B;">str</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">length</span><span style="color:#56B6C2;">-</span><span style="color:#D19A66;">1</span><span style="color:#56B6C2;">-</span><span style="color:#E06C75;">i</span><span style="color:#ABB2BF;">)) {</span></span>
<span class="line"><span style="color:#E06C75;">                        flag</span><span style="color:#56B6C2;"> =</span><span style="color:#D19A66;"> false</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">                        // 不相等直接退出循环</span></span>
<span class="line"><span style="color:#C678DD;">                        break</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#ABB2BF;">                }</span></span>
<span class="line"><span style="color:#ABB2BF;">            }</span></span>
<span class="line"><span style="color:#C678DD;">            break</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#ABB2BF;">    </span></span>
<span class="line"><span style="color:#C678DD;">    return</span><span style="color:#E06C75;"> flag</span></span>
<span class="line"><span style="color:#ABB2BF;">};</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,14)]))}const i=n(p,[["render",o],["__file","index.html.vue"]]),r=JSON.parse(`{"path":"/article/a7fkskiu/","title":"回文数","lang":"zh-CN","frontmatter":{"title":"回文数","createTime":"2024/12/30 11:42:36","permalink":"/article/a7fkskiu/","tags":["算法"],"description":"给你一个整数 x ，如果 x 是一个回文整数，返回 true ；否则，返回 false 。 回文数 是指正序（从左向右）和倒序（从右向左）读都是一样的整数。 例如，121 是回文，而 123 不是。 解题思路 解法一: 1.先将给定数转换为字符串 2.获取字符串的开始索引和结束索引 3.通过while循环判断 当第一和最后一位不相等则不是回文数返回fa...","head":[["meta",{"property":"og:url","content":"https://weige66.github.io/article/a7fkskiu/"}],["meta",{"property":"og:site_name","content":"zhengWei's Blog"}],["meta",{"property":"og:title","content":"回文数"}],["meta",{"property":"og:description","content":"给你一个整数 x ，如果 x 是一个回文整数，返回 true ；否则，返回 false 。 回文数 是指正序（从左向右）和倒序（从右向左）读都是一样的整数。 例如，121 是回文，而 123 不是。 解题思路 解法一: 1.先将给定数转换为字符串 2.获取字符串的开始索引和结束索引 3.通过while循环判断 当第一和最后一位不相等则不是回文数返回fa..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-12-30T03:48:56.000Z"}],["meta",{"property":"article:tag","content":"算法"}],["meta",{"property":"article:modified_time","content":"2024-12-30T03:48:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"回文数\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-12-30T03:48:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"weiGe66\\",\\"url\\":\\"https://github.com/weiGe66\\",\\"email\\":\\"2361929296@qq.com\\"}]}"]]},"headers":[],"readingTime":{"minutes":1.96,"words":589},"git":{"updatedTime":1735530536000,"contributors":[{"name":"zhengwei","username":"zhengwei","email":"wangzhengwei@nstc.com.cn","commits":1,"avatar":"https://avatars.githubusercontent.com/zhengwei?v=4","url":"https://github.com/zhengwei"}]},"autoDesc":true,"filePathRelative":"blog/算法/回文数.md","categoryList":[{"id":"126ac9","sort":10005,"name":"blog"},{"id":"44f0ef","sort":10007,"name":"算法"}],"bulletin":false}`);export{i as comp,r as data};
