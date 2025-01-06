import{_ as n,c as a,e as l,o as p}from"./app-BFIWhM4u.js";const o={};function e(t,s){return p(),a("div",null,s[0]||(s[0]=[l(`<div class="language-js line-numbers-mode" data-ext="js" data-title="js"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#C678DD;">const</span><span style="color:#E5C07B;"> path</span><span style="color:#56B6C2;"> =</span><span style="color:#61AFEF;"> require</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&quot;path&quot;</span><span style="color:#ABB2BF;">);</span></span>
<span class="line"><span style="color:#C678DD;">const</span><span style="color:#E5C07B;"> HotHashWebpackPlugin</span><span style="color:#56B6C2;"> =</span><span style="color:#61AFEF;"> require</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&quot;hot-hash-webpack-plugin&quot;</span><span style="color:#ABB2BF;">);</span></span>
<span class="line"><span style="color:#C678DD;">const</span><span style="color:#E5C07B;"> WebpackBar</span><span style="color:#56B6C2;"> =</span><span style="color:#61AFEF;"> require</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&quot;webpackbar&quot;</span><span style="color:#ABB2BF;">);</span></span>
<span class="line"><span style="color:#C678DD;">const</span><span style="color:#61AFEF;"> resolve</span><span style="color:#56B6C2;"> =</span><span style="color:#ABB2BF;"> (</span><span style="color:#E06C75;font-style:italic;">dir</span><span style="color:#ABB2BF;">) </span><span style="color:#C678DD;">=&gt;</span><span style="color:#E5C07B;"> path</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">join</span><span style="color:#ABB2BF;">(</span><span style="color:#E06C75;">__dirname</span><span style="color:#ABB2BF;">, </span><span style="color:#98C379;">&quot;.&quot;</span><span style="color:#ABB2BF;">, </span><span style="color:#E06C75;">dir</span><span style="color:#ABB2BF;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E5C07B;">module</span><span style="color:#ABB2BF;">.</span><span style="color:#E5C07B;">exports</span><span style="color:#56B6C2;"> =</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#E06C75;">  productionSourceMap</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">false</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#E06C75;">  publicPath</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&quot;./&quot;</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#E06C75;">  outputDir</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&quot;dist&quot;</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#E06C75;">  assetsDir</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&quot;assets&quot;</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#E06C75;"> filenameHashing</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">true</span><span style="color:#ABB2BF;">, </span><span style="color:#7F848E;font-style:italic;">// 生产文件名带hash</span></span>
<span class="line"><span style="color:#E06C75;">  lintOnSave</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">true</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#E06C75;"> css</span><span style="color:#ABB2BF;">: {</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">    // extract: true,</span></span>
<span class="line"><span style="color:#E06C75;">    sourceMap</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">true</span></span>
<span class="line"><span style="color:#ABB2BF;">  },</span></span>
<span class="line"><span style="color:#E06C75;">  devServer</span><span style="color:#ABB2BF;">: {</span></span>
<span class="line"><span style="color:#E06C75;">    port</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">9999</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#E06C75;">    open</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">true</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#E06C75;">    proxy</span><span style="color:#ABB2BF;">: {</span></span>
<span class="line"><span style="color:#98C379;">      &#39;/api&#39;</span><span style="color:#ABB2BF;">: {</span></span>
<span class="line"><span style="color:#E06C75;">        target</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&#39;http://xxx.com&#39;</span><span style="color:#ABB2BF;">, </span><span style="color:#7F848E;font-style:italic;">//目标主机</span></span>
<span class="line"><span style="color:#E06C75;">        ws</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">true</span><span style="color:#ABB2BF;">, </span><span style="color:#7F848E;font-style:italic;">//代理的WebSockets</span></span>
<span class="line"><span style="color:#E06C75;">        changeOrigin</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">true</span><span style="color:#ABB2BF;">, </span><span style="color:#7F848E;font-style:italic;">//需要虚拟主机站点</span></span>
<span class="line"><span style="color:#E06C75;">        pathRewrite</span><span style="color:#ABB2BF;">: {}</span></span>
<span class="line"><span style="color:#ABB2BF;">      }</span></span>
<span class="line"><span style="color:#ABB2BF;">    } </span></span>
<span class="line"><span style="color:#ABB2BF;">  },</span></span>
<span class="line"><span style="color:#61AFEF;">  chainWebpack</span><span style="color:#ABB2BF;">: (</span><span style="color:#E06C75;font-style:italic;">config</span><span style="color:#ABB2BF;">) </span><span style="color:#C678DD;">=&gt;</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#C678DD;">    const</span><span style="color:#E5C07B;"> types</span><span style="color:#56B6C2;"> =</span><span style="color:#ABB2BF;"> [</span><span style="color:#98C379;">&quot;vue-modules&quot;</span><span style="color:#ABB2BF;">, </span><span style="color:#98C379;">&quot;vue&quot;</span><span style="color:#ABB2BF;">, </span><span style="color:#98C379;">&quot;normal-modules&quot;</span><span style="color:#ABB2BF;">, </span><span style="color:#98C379;">&quot;normal&quot;</span><span style="color:#ABB2BF;">];</span></span>
<span class="line"><span style="color:#E5C07B;">    types</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">forEach</span><span style="color:#ABB2BF;">((</span><span style="color:#E06C75;font-style:italic;">type</span><span style="color:#ABB2BF;">) </span><span style="color:#C678DD;">=&gt;</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#C678DD;">      let</span><span style="color:#E06C75;"> rule</span><span style="color:#56B6C2;"> =</span><span style="color:#E5C07B;"> config</span><span style="color:#ABB2BF;">.</span><span style="color:#E5C07B;">module</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">rule</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&quot;less&quot;</span><span style="color:#ABB2BF;">).</span><span style="color:#61AFEF;">oneOf</span><span style="color:#ABB2BF;">(</span><span style="color:#E06C75;">type</span><span style="color:#ABB2BF;">);</span></span>
<span class="line"><span style="color:#E06C75;">      rule</span></span>
<span class="line"><span style="color:#ABB2BF;">        .</span><span style="color:#61AFEF;">use</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&quot;style-resource&quot;</span><span style="color:#ABB2BF;">)</span></span>
<span class="line"><span style="color:#ABB2BF;">        .</span><span style="color:#61AFEF;">loader</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&quot;style-resources-loader&quot;</span><span style="color:#ABB2BF;">)</span></span>
<span class="line"><span style="color:#ABB2BF;">        .</span><span style="color:#61AFEF;">options</span><span style="color:#ABB2BF;">({</span></span>
<span class="line"><span style="color:#E06C75;">          patterns</span><span style="color:#ABB2BF;">: [</span><span style="color:#E5C07B;">path</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">resolve</span><span style="color:#ABB2BF;">(</span><span style="color:#E06C75;">__dirname</span><span style="color:#ABB2BF;">, </span><span style="color:#98C379;">&quot;./lessVariates.less&quot;</span><span style="color:#ABB2BF;">)],</span></span>
<span class="line"><span style="color:#ABB2BF;">        });</span></span>
<span class="line"><span style="color:#ABB2BF;">    });</span></span>
<span class="line"><span style="color:#E5C07B;">    config</span><span style="color:#ABB2BF;">.</span><span style="color:#E5C07B;">resolve</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">alias</span></span>
<span class="line"><span style="color:#ABB2BF;">      .</span><span style="color:#61AFEF;">set</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&quot;@&quot;</span><span style="color:#ABB2BF;">, </span><span style="color:#61AFEF;">resolve</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&quot;src&quot;</span><span style="color:#ABB2BF;">))</span></span>
<span class="line"><span style="color:#ABB2BF;">      .</span><span style="color:#61AFEF;">set</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&quot;api&quot;</span><span style="color:#ABB2BF;">, </span><span style="color:#61AFEF;">resolve</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&quot;src/apis&quot;</span><span style="color:#ABB2BF;">))</span></span>
<span class="line"><span style="color:#ABB2BF;">      .</span><span style="color:#61AFEF;">set</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&quot;common&quot;</span><span style="color:#ABB2BF;">, </span><span style="color:#61AFEF;">resolve</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&quot;src/common&quot;</span><span style="color:#ABB2BF;">));</span></span>
<span class="line"><span style="color:#E5C07B;">    config</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">module</span></span>
<span class="line"><span style="color:#ABB2BF;">      .</span><span style="color:#61AFEF;">rule</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&quot;images&quot;</span><span style="color:#ABB2BF;">)</span></span>
<span class="line"><span style="color:#ABB2BF;">      .</span><span style="color:#61AFEF;">use</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&quot;url-loader&quot;</span><span style="color:#ABB2BF;">)</span></span>
<span class="line"><span style="color:#ABB2BF;">      .</span><span style="color:#61AFEF;">tap</span><span style="color:#ABB2BF;">((</span><span style="color:#E06C75;font-style:italic;">options</span><span style="color:#ABB2BF;">) </span><span style="color:#C678DD;">=&gt;</span><span style="color:#ABB2BF;"> ({</span></span>
<span class="line"><span style="color:#E06C75;">        name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&quot;./assets/images/[name].[ext]&quot;</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#E06C75;">        quality</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">85</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#E06C75;">        limit</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">0</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#E06C75;">        esModule</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">false</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#ABB2BF;">      }));</span></span>
<span class="line"><span style="color:#E5C07B;">    config</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">module</span></span>
<span class="line"><span style="color:#ABB2BF;">      .</span><span style="color:#61AFEF;">rule</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&quot;svg&quot;</span><span style="color:#ABB2BF;">)</span></span>
<span class="line"><span style="color:#ABB2BF;">      .</span><span style="color:#61AFEF;">test</span><span style="color:#ABB2BF;">(</span><span style="color:#E06C75;">/.svg</span><span style="color:#C678DD;">$</span><span style="color:#E06C75;">/</span><span style="color:#ABB2BF;">)</span></span>
<span class="line"><span style="color:#ABB2BF;">      .</span><span style="color:#E5C07B;">include</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">add</span><span style="color:#ABB2BF;">(</span><span style="color:#61AFEF;">resolve</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&quot;src/svg&quot;</span><span style="color:#ABB2BF;">))</span></span>
<span class="line"><span style="color:#ABB2BF;">      .</span><span style="color:#61AFEF;">end</span><span style="color:#ABB2BF;">()</span></span>
<span class="line"><span style="color:#ABB2BF;">      .</span><span style="color:#61AFEF;">use</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&quot;svg-sprite-loader&quot;</span><span style="color:#ABB2BF;">)</span></span>
<span class="line"><span style="color:#ABB2BF;">      .</span><span style="color:#61AFEF;">loader</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&quot;svg-sprite-loader&quot;</span><span style="color:#ABB2BF;">);</span></span>
<span class="line"><span style="color:#E06C75;">    config</span></span>
<span class="line"><span style="color:#ABB2BF;">      .</span><span style="color:#61AFEF;">plugin</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&quot;define&quot;</span><span style="color:#ABB2BF;">)</span></span>
<span class="line"><span style="color:#ABB2BF;">      .</span><span style="color:#61AFEF;">tap</span><span style="color:#ABB2BF;">((</span><span style="color:#E06C75;font-style:italic;">args</span><span style="color:#ABB2BF;">) </span><span style="color:#C678DD;">=&gt;</span><span style="color:#ABB2BF;"> [{ ...</span><span style="color:#E06C75;">args</span><span style="color:#ABB2BF;">, </span><span style="color:#98C379;">&quot;window.isDefine&quot;</span><span style="color:#ABB2BF;">: </span><span style="color:#E5C07B;">JSON</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">stringify</span><span style="color:#ABB2BF;">(</span><span style="color:#D19A66;">true</span><span style="color:#ABB2BF;">) }]);</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">    // 生产环境配置</span></span>
<span class="line"><span style="color:#C678DD;">    if</span><span style="color:#ABB2BF;"> (</span><span style="color:#E5C07B;">process</span><span style="color:#ABB2BF;">.</span><span style="color:#E5C07B;">env</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">NODE_ENV</span><span style="color:#56B6C2;"> ===</span><span style="color:#98C379;"> &quot;production&quot;</span><span style="color:#ABB2BF;">) {</span></span>
<span class="line"><span style="color:#E5C07B;">      config</span><span style="color:#ABB2BF;">.</span><span style="color:#E5C07B;">output</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">filename</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&quot;./js/[name].[chunkhash:8].js&quot;</span><span style="color:#ABB2BF;">);</span></span>
<span class="line"><span style="color:#E5C07B;">      config</span><span style="color:#ABB2BF;">.</span><span style="color:#E5C07B;">output</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">chunkFilename</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&quot;./js/[name].[chunkhash:8].js&quot;</span><span style="color:#ABB2BF;">);</span></span>
<span class="line"><span style="color:#E5C07B;">      config</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">plugin</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&quot;extract-css&quot;</span><span style="color:#ABB2BF;">).</span><span style="color:#61AFEF;">tap</span><span style="color:#ABB2BF;">((</span><span style="color:#E06C75;font-style:italic;">args</span><span style="color:#ABB2BF;">) </span><span style="color:#C678DD;">=&gt;</span><span style="color:#ABB2BF;"> [</span></span>
<span class="line"><span style="color:#ABB2BF;">        {</span></span>
<span class="line"><span style="color:#E06C75;">          filename</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&quot;css/[name].[contenthash:8].css&quot;</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#E06C75;">          chunkFilename</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&quot;css/[name].[contenthash:8].css&quot;</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#ABB2BF;">        },</span></span>
<span class="line"><span style="color:#ABB2BF;">      ]);</span></span>
<span class="line"><span style="color:#E06C75;">      config</span></span>
<span class="line"><span style="color:#ABB2BF;">        .</span><span style="color:#61AFEF;">plugin</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&quot;hotHash&quot;</span><span style="color:#ABB2BF;">)</span></span>
<span class="line"><span style="color:#ABB2BF;">        .</span><span style="color:#61AFEF;">use</span><span style="color:#ABB2BF;">(</span><span style="color:#E06C75;">HotHashWebpackPlugin</span><span style="color:#ABB2BF;">, [{ </span><span style="color:#E06C75;">version</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&quot;1.0.0&quot;</span><span style="color:#ABB2BF;"> }]);</span></span>
<span class="line"><span style="color:#E5C07B;">      config</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">plugin</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&quot;webpackBar&quot;</span><span style="color:#ABB2BF;">).</span><span style="color:#61AFEF;">use</span><span style="color:#ABB2BF;">(</span><span style="color:#E06C75;">WebpackBar</span><span style="color:#ABB2BF;">);</span></span>
<span class="line"><span style="color:#E5C07B;">      config</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">optimization</span></span>
<span class="line"><span style="color:#ABB2BF;">        .</span><span style="color:#61AFEF;">minimize</span><span style="color:#ABB2BF;">(</span><span style="color:#D19A66;">true</span><span style="color:#ABB2BF;">)</span></span>
<span class="line"><span style="color:#ABB2BF;">        .</span><span style="color:#61AFEF;">minimizer</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&quot;terser&quot;</span><span style="color:#ABB2BF;">)</span></span>
<span class="line"><span style="color:#ABB2BF;">        .</span><span style="color:#61AFEF;">tap</span><span style="color:#ABB2BF;">((</span><span style="color:#E06C75;font-style:italic;">args</span><span style="color:#ABB2BF;">) </span><span style="color:#C678DD;">=&gt;</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#C678DD;">          let</span><span style="color:#ABB2BF;"> { </span><span style="color:#E06C75;">terserOptions</span><span style="color:#ABB2BF;"> } </span><span style="color:#56B6C2;">=</span><span style="color:#E06C75;"> args</span><span style="color:#ABB2BF;">[</span><span style="color:#D19A66;">0</span><span style="color:#ABB2BF;">];</span></span>
<span class="line"><span style="color:#E5C07B;">          terserOptions</span><span style="color:#ABB2BF;">.</span><span style="color:#E5C07B;">compress</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">drop_console</span><span style="color:#56B6C2;"> =</span><span style="color:#D19A66;"> true</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#E5C07B;">          terserOptions</span><span style="color:#ABB2BF;">.</span><span style="color:#E5C07B;">compress</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">drop_debugger</span><span style="color:#56B6C2;"> =</span><span style="color:#D19A66;"> true</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#C678DD;">          return</span><span style="color:#E06C75;"> args</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#ABB2BF;">        });</span></span>
<span class="line"><span style="color:#E5C07B;">      config</span><span style="color:#ABB2BF;">.</span><span style="color:#E5C07B;">optimization</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">splitChunks</span><span style="color:#ABB2BF;">({</span></span>
<span class="line"><span style="color:#E06C75;">        cacheGroups</span><span style="color:#ABB2BF;">: {</span></span>
<span class="line"><span style="color:#E06C75;">          common</span><span style="color:#ABB2BF;">: {</span></span>
<span class="line"><span style="color:#E06C75;">            name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&quot;common&quot;</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#E06C75;">            chunks</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&quot;all&quot;</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#E06C75;">            minSize</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">1</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#E06C75;">            minChunks</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">2</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#E06C75;">            priority</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">1</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#ABB2BF;">          },</span></span>
<span class="line"><span style="color:#E06C75;">          vendor</span><span style="color:#ABB2BF;">: {</span></span>
<span class="line"><span style="color:#E06C75;">            name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&quot;chunk-libs&quot;</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#E06C75;">            chunks</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&quot;all&quot;</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#E06C75;">            test</span><span style="color:#ABB2BF;">:</span><span style="color:#E06C75;"> /</span><span style="color:#D19A66;">[</span><span style="color:#56B6C2;">\\/</span><span style="color:#D19A66;">]</span><span style="color:#E06C75;">node_modules</span><span style="color:#D19A66;">[</span><span style="color:#56B6C2;">\\/</span><span style="color:#D19A66;">]</span><span style="color:#E06C75;">/</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#E06C75;">            priority</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">10</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#ABB2BF;">          },</span></span>
<span class="line"><span style="color:#ABB2BF;">        },</span></span>
<span class="line"><span style="color:#ABB2BF;">      });</span></span>
<span class="line"><span style="color:#ABB2BF;">    }</span></span>
<span class="line"><span style="color:#ABB2BF;">  },</span></span>
<span class="line"><span style="color:#ABB2BF;">};</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1)]))}const B=n(o,[["render",e],["__file","index.html.vue"]]),r=JSON.parse(`{"path":"/notes/vue/vue2%E9%85%8D%E7%BD%AEvue.config.js/","title":"vue2配置vue.config.js","lang":"zh-CN","frontmatter":{"title":"vue2配置vue.config.js","createTime":"2024/12/28 23:43:44","permalink":"/notes/vue/vue2配置vue.config.js/","head":[["meta",{"property":"og:url","content":"https://weige66.github.io/notes/vue/vue2%E9%85%8D%E7%BD%AEvue.config.js/"}],["meta",{"property":"og:site_name","content":"zhengWei's Blog"}],["meta",{"property":"og:title","content":"vue2配置vue.config.js"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-12-28T16:17:08.000Z"}],["meta",{"property":"article:modified_time","content":"2024-12-28T16:17:08.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"vue2配置vue.config.js\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-12-28T16:17:08.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"weiGe66\\",\\"url\\":\\"https://github.com/weiGe66\\",\\"email\\":\\"2361929296@qq.com\\"}]}"]]},"headers":[],"readingTime":{"minutes":0.96,"words":287},"git":{"updatedTime":1735402628000,"contributors":[{"name":"zhengwei","username":"zhengwei","email":"wangzhengwei@nstc.com.cn","commits":1,"avatar":"https://avatars.githubusercontent.com/zhengwei?v=4","url":"https://github.com/zhengwei"}]},"filePathRelative":"notes/vue/note/vue2配置vue.config.js.md","categoryList":[{"id":"4358b5","sort":10000,"name":"notes"},{"id":"67cf80","sort":10001,"name":"vue"},{"id":"0b1ef0","sort":10002,"name":"note"}],"bulletin":false}`);export{B as comp,r as data};
