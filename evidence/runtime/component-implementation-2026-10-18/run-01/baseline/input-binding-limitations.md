# 早期检查绑定边界

在 checks/G01/complete-working-input-binding 之前，运行器只保存未暂存的git diff哈希（更早记录可能没有该字段）和锁文件哈希；不能以此声称绑定了全部未跟踪新模块。那些 command.json、失败日志及实际exit code 保留不改。

从该检查起，inputs-before/after.json 给出有限Git列举的tracked/staged/untracked源码、合同、配置和文档内容哈希，另记录暂存差异及生成物摘要。stableDuringCheck=false 表示期间输入发生变化，不能把它当固定最终候选的证明；未受影响的具体检查结果可保留为开发观察。最终候选须封存后重新执行所需整合gate。历史evidence不混入此清单，由37304文件独立哈希与来源链核验。

阶段恢复包见 progress.json recoveryPoints，含开工已有101个未跟踪历史evidence的原始内容，不只保存哈希。恢复请按包内README在新工作区操作，保留当前用户后续修改。
