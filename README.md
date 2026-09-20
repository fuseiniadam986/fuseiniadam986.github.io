# 聚搜云 GitHub SEO 内容站第一版

这是一个可直接发布到 GitHub Pages 的静态内容站，方向是云服务器采购前的选型、报价核对和迁移咨询。

## 已包含页面

- 首页：`index.html`
- 指南首页：`guides/index.html`
- 香港服务器总指南：`guides/hong-kong-server/index.html`
- 香港、新加坡、日本和美国服务器地域对比：`guides/server-region-comparison/index.html`
- 国内与国际云厂商选择：`guides/cloud-vendor-comparison/index.html`
- 香港服务器费用核算：`guides/hong-kong-server-cost/index.html`
- 香港服务器带宽选择：`guides/hong-kong-bandwidth/index.html`
- 云服务器报价核对清单：`guides/cloud-quote-checklist/index.html`
- 香港服务器迁移准备：`guides/hong-kong-server-migration/index.html`

## 转化方式

本站不使用表单。所有咨询入口都引导客户主动扫码添加微信，并发送配置、报价截图或业务场景。

微信二维码图片已放在 `assets/weixinqr.jpg`，所有咨询模块都引用该图片。

首屏背景使用 `assets/hong-kong-cloud-hero.webp`，原始 PNG 保留为源素材，不参与页面加载。

## 发布建议

如果用于 GitHub 用户主页，仓库名建议为：

```text
fuseiniadam986.github.io
```

发布后默认地址为：

```text
https://fuseiniadam986.github.io/
```

当前 canonical、`robots.txt` 和 `sitemap.xml` 已统一使用上面的 GitHub Pages 地址。如改用自己的域名，需要同步替换这三处地址，并在发布后重新提交站点地图。
