---
title: 构建时记录git信息并写入json文件中
createTime: 2024/12/28 23:50:33
permalink: /notes/js/构建时记录git信息并写入json文件中/
---

下面的脚本写入的是供人阅读的文本。如果要把它用于浏览器版本检测，建议另外用 `JSON.stringify` 生成真正的版本清单，只包含提交 SHA 或构建编号、UTC 构建时间等必要字段。发布切换时同步更新清单，避免客户端看到与入口产物不一致的版本。

清单的发布时间和缓存策略见 [静态资源发布与缓存](../../blog/前端工程/静态资源发布与缓存.md)。

```js
const fs = require('fs')
const path = require('path')
const childProcess = require('child_process')

function getGitInfo() {
  // 代码仓库的地址
  const gitRemoteUrl = childProcess.execSync('git config --get remote.origin.url').toString().trim()
  // git的分支信息
  const gitBranch = process.env.GIT_BRANCH || childProcess.execSync('git rev-parse --abbrev-ref HEAD').toString().trim()
  // 最后提交ID
  const lastCommitID = childProcess.execSync('git log -1 --format=%H').toString().trim()
  // 最后提交信息
  const lastCommitMessage = childProcess.execSync('git log -1 --format=%B').toString().trim()
  // 构建人信息
  const packagerName = childProcess.execSync('git config user.name').toString().trim()
  // 构建时间
  const buildDate = new Date().toLocaleString()
  // 构建类型
  const packagerType = process.env.JENKINS_URL ? 'jenkins' : 'manual'

  // 记录打包信息
  let infoArr = []
  infoArr.push('代码仓库: ' + gitRemoteUrl)
  infoArr.push('构建分支: ' + gitBranch)
  infoArr.push('最后提交: ' + lastCommitID)
  infoArr.push('最后提交: ' + lastCommitMessage)
  infoArr.push('构建类型: ' + packagerType)
  infoArr.push('构建作者: ' + packagerName)
  infoArr.push('构建时间: ' + buildDate)
  let infoStr = infoArr.join('\n')
  if (!fs.existsSync(path.resolve('./public/json'))) {
    fs.mkdirSync(path.resolve('./public/json'))
  }
  fs.writeFileSync(path.resolve('./public/json/gitinfo.json'), infoStr, 'utf8')
}

if (process.env.NODE_ENV === 'production') {
  getGitInfo()
} else if (process.env.npm_lifecycle_script && process.env.npm_lifecycle_script.includes('nstc-gitinfo')) {
  getGitInfo()
}
```
