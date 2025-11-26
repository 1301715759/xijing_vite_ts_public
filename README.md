# Vue 3 + TypeScript + Vite

基于 Vue 3 + TypeScript + Vite 模板， 集成戏鲸APP原生api接口的项目。

## 免责声明

⚠️ 本项目为基于戏鲸APP的未授权二次开发，仅供学习和技术研究目的使用。项目中使用的API接口和相关资源均属于戏鲸平台所有，如有侵权请联系我们删除。使用者应遵守相关法律法规，不得将此项目用于任何商业用途。

## todoList
- [x] 集成戏鲸APP原生api接口
- [~] 集成需要原生功能组件到页面
  - [x] 广播
  - [ ] 用户信息
  - [ ] 关注列表
  - [x] 关注在线房间
  - [x] 收藏房间列表
  - [ ] 房间详细情况
  - [x] 关注动态/广场动态
  - [ ] 我看过谁/谁看过我
  - [ ] 剧本
  - [ ] 配音列表
  - [ ] 修改登录用户信息
  - [ ] ~~websocket房间语音（戏鲸app基于声网sdk，大概率无法实现）~~
  - [ ] ~~websocket消息列表（戏鲸app基于网易云信，大概率无法实现）~~
  - [ ] 更多...
- [ ] 页面路由配置
- [ ] 页面样式美化
- [ ] 适配移动端页面

## 开发环境搭建

1. 安装依赖:
   ```bash
   npm install
   ```

2. 配置认证信息:
   重命名`src/api-V2/config/example_auth_key.json`为`src/api-V2/config/auth_key.json`并填入您的认证信息

3. 启动开发服务器:
   ```bash
   npm run dev
   ```

## 认证信息配置

~~项目使用`auth_key.json`文件来手动管理API认证信息~~。
在运行项目之前，您需要配置此文件：

1. 复制`src/api-V2/config/example_auth_key.json`文件并重命名为`auth_key.json`
2. 在`auth_key.json`文件中填入您的认证信息：
   - `Authkey`: 您的认证密钥（可选）
   - `Authorization`: 您的访问令牌（必需）
？如何获取秘钥？  
不好意思，本app为未授权二次开发，~~因此需要您自己获取认证密钥和访问令牌。~~

示例配置：
```json
{
  "Authkey": "YmM6ZmM6ZTc6MGI6ZWM6YTA",
  "Authorization": "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.xxxxx"
}
```

注意：请保护好您的认证信息，不要将其提交到公共仓库。