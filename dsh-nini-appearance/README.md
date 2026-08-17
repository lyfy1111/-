# 尼尼外观实验室

这是一个为 DeepSeek Harness WebUI 制作的独立外观插件。它通过官方主题 token 和设置插槽工作，不修改 DSH 核心，也可以和 `@linxin666/dsh-web-ui-all` 同时安装。

## 功能

- 上传 JPG、PNG、WebP、GIF、AVIF 背景图
- 上传 MP4、WebM 视频背景，自动静音循环
- 从图片或视频直链加载背景
- 背景铺满、完整显示、拉伸三种适配方式
- 水平和垂直焦点位置调节
- 背景透明度、模糊、阅读遮罩
- 面板透明度、侧栏独立不透明、毛玻璃强度
- 六组主题颜色和背景自动取色
- 尼尼浅粉、薄荷清新等预设
- 配色 JSON 导入和导出
- 所有设置实时预览并保存在浏览器本地

插件不内置人物或动漫壁纸，背景素材由使用者自行上传。

## 安装

```powershell
npx -y @deepseek-ai/dsh plugin --profile web add dsh-nini-appearance
```

重启 DSH Web 后，打开：`设置 -> 通用 -> 尼尼外观实验室`。

与 `dsh-web-ui-all` 同时使用时，建议先在它的皮肤中心选择默认或接近默认的主题，再由本插件控制壁纸、透明度和颜色，避免两套主题同时覆盖相同 token。

## 卸载

```powershell
npx -y @deepseek-ai/dsh plugin --profile web remove dsh-nini-appearance
```

卸载会撤销插件样式和主题覆盖。浏览器本地保存的配置不会影响未安装插件时的界面。

## 开发

```powershell
pnpm install
pnpm test
pnpm bundle
```

## 开源说明

本项目基于 MIT 许可的 `TQSY114514/dsh-ui-appearance` 结构与实现思路二次开发，具体署名见 `NOTICE.md`。本项目继续使用 MIT License。
