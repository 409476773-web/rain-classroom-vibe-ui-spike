# 学生学习情况：有历史指导的迁移自测

这是在 RN-14 starter 基线 `rn14-93e4625b94026067` 上修改的本地衍生原型。`source-lock.json` 保留原导出基线，不代表当前衍生版本身份。当前归档的 SHA-256 见组件库 generation-quality/transfer-record.json。

固定任务见同目录 transfer-task.json；首次可运行版本与交付前自查版本分别留档。仅修改 prototype 主入口与 student.css；Shared UI、Layouts、Foundations 保留导出内容。

## 运行

```sh
pnpm install --frozen-lockfile
pnpm dev --host 127.0.0.1 --port 5342
```

```sh
pnpm typecheck
pnpm build
TRANSFER_URL=http://127.0.0.1:5342/ pnpm exec node transfer-check.mjs
```

本地虚构资料；保存仅保留当前页面状态，刷新后恢复。没有后台、通知或对外联系。
