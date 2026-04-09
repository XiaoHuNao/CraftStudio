# CraftStudio Branding Backlog

本文件记录 2026-04-09 全仓扫描后仍保留的旧品牌 / 旧标识，供后续分阶段处理。

## 本轮已完成

- 用户可见品牌已统一为 `CraftStudio`
- `theia-extensions/product` 内部文件名 / 类名已重命名为 `craft-studio-*`
- `applications/*/resources/preload.html` 中的 `theia-ide-spinner` 已改为 `craft-studio-spinner`
- `theia-extensions/product/lib` 已清理并重建，不再残留旧 `theia-ide-*` 编译产物

## 仍保留的旧品牌残留

### 1. 包名 / workspace 依赖名 / lerna scope

**典型残留**
- `theia-ide-browser-app`
- `theia-ide-electron-app`
- `theia-ide-next-electron-app`
- `theia-ide-product-ext`
- `theia-ide-launcher-ext`
- `theia-ide-updater-ext`
- root `package.json` 中的 `--scope="theia-ide*app"` / `--scope="theia-ide*ext"`

**涉及文件**
- `package.json`
- `applications/browser/package.json`
- `applications/electron/package.json`
- `applications/electron-next/package.json`
- `theia-extensions/product/package.json`
- `theia-extensions/launcher/package.json`
- `theia-extensions/updater/package.json`

**为何延期**
- 这会影响 workspace 解析、应用依赖、构建脚本、可能还会联动 `yarn.lock`
- 需要一次性成组修改，不能只改单个包名

---

### 2. 用户配置目录 / 存储目录

**典型残留**
- `.theia-ide`
- `.theia-ide-next`
- `globalStorage/theia-ide-launcher/`

**涉及文件**
- `applications/browser/package.json`
- `applications/electron/package.json`
- `applications/electron-next/package.json`
- `applications/electron/scripts/theia-electron-main.js`
- `applications/electron-next/scripts/theia-electron-main.js`
- `theia-extensions/launcher/src/node/launcher-util.ts`
- `.gitignore`

**为何延期**
- 这会影响用户本地配置、插件缓存、已有安装数据
- 如果直接改名，可能导致升级后“像是丢配置”
- 后续应设计迁移逻辑，而不是直接替换

---

### 3. 为兼容性故意保留的命令 ID / menu path

**典型残留**
- `theia-ide:report-issue`
- `theia-ide:documentation`
- menu segment `'theia-ide'`

**涉及文件**
- `theia-extensions/product/src/browser/craft-studio-contribution.tsx`

**为何延期**
- 这些 ID 可能已被下游 keybinding、自动化脚本、测试或自定义菜单引用
- 虽然不是用户可见品牌，但改动兼容性风险高于收益

---

### 4. 上游仓库 / 文档 / 下载地址

**典型残留**
- `https://github.com/eclipse-theia/theia-ide`
- `https://theia-ide.org`
- `https://github.com/eclipse-theia/theia-ide/releases/download/next`

**涉及文件**
- `package.json`
- `README.md`
- `ADOPTER.md`
- `PUBLISHING.md`
- `applications/browser/package.json`
- `applications/electron/package.json`
- `applications/electron-next/package.json`
- `theia-extensions/product/package.json`
- `theia-extensions/launcher/package.json`
- `theia-extensions/updater/package.json`
- `theia-extensions/product/src/browser/branding-util.tsx`
- `theia-extensions/product/src/browser/craft-studio-contribution.tsx`
- `theia-extensions/updater/src/electron-main/update/theia-updater-impl.ts`
- `.github/PULL_REQUEST_TEMPLATE.md`
- `releng/preview/Jenkinsfile.build`

**为何延期**
- 其中一部分是真实存在的上游文档/发布地址，不是简单的“品牌残留”
- 如果 CraftStudio 未来有自有官网、文档站、发布页、Issue 仓库，需要整体替换，不适合零散修改

---

### 5. Jenkins / 发布流水线 job 名

**典型残留**
- `theia-ide-release`
- `theia-ide-sign-notarize`
- `theia-ide-upload`

**涉及文件**
- `PUBLISHING.md`
- `releng/preview/Jenkinsfile.build`
- `releng/preview/Jenkinsfile.sign`
- `releng/preview/Jenkinsfile.upload`

**为何延期**
- 这些是外部 CI / Jenkins 中真实存在的 job 名
- 仅修改仓库代码不会自动重命名外部流水线
- 应等新基础设施就绪后再统一调整

---

### 6. Electron 启动脚本文件名

**典型残留**
- `applications/electron/scripts/theia-electron-main.js`
- `applications/electron-next/scripts/theia-electron-main.js`

**为何延期**
- 这类属于中低风险内部残留，后续可以改
- 但会联动 `package.json` 的 `main` / `start` 配置，适合单独做一次小重构

---

### 7. 文档模板里仍引用上游 Theia 仓库

**涉及文件**
- `.github/PULL_REQUEST_TEMPLATE.md`
- `README.md`
- `PUBLISHING.md`
- `ADOPTER.md`

**为何延期**
- 需要先决定 CraftStudio 后续的协作流程、Issue 仓库、发布仓库、文档站是否全部自托管
- 在这些目标地址明确前，不建议盲改

---

## 暂不纳入本次处理的内容

- `applications/**/lib/**` 等构建产物中的上游 `@theia/*` 包名或 chunk 名
- 这些多数来自依赖包、webpack chunk、自动生成代码，不属于单纯品牌文案问题
- 如果未来真的要继续深改，应优先从源码命名与包名入手，而不是直接改生成产物

## 建议的后续处理顺序

1. **包名 / workspace 名统一重命名**
   - 一次性修改 app 名、ext 名、依赖名、root scripts、lockfile
2. **配置目录迁移**
   - 为 `.theia-ide` / `.theia-ide-next` 提供一次性迁移逻辑
3. **自有网址替换**
   - 等 CraftStudio 官网 / 文档 / 下载页 / issue 仓库稳定后再替换
4. **CI / Jenkins 外部资源重命名**
   - 需要仓库外同步操作
5. **命令 ID / menu path 最后再动**
   - 先审计是否存在下游依赖

## 备注

当前仓库已经达到：
- 用户可见品牌基本完成 CraftStudio 化
- product 扩展内部标识已完成一轮保守重命名
- 剩余残留大多属于“兼容性 / 基础设施 / 外部地址”层面的后续工作
