git merge -s recursive branch1 branch2
递归是拉取或合并一个分支时的默认合并策略。此外可以检测和处理涉及重命名的合并
-s resolve
通常认为是安全且快速的 试图仔细检查纵横交错的合并歧义
-s Octopus
两个以上分支传递时自启动该策略 当有需要手动解决的冲突时 会拒绝合并尝试 主要用于将相似功能分支标题捆绑在一起
-s ours
该策略意味着忽略所有其他分支的所有变更 旨在合并相似功能分支的历史纪录
-s subtree
为递归策略的拓展 若 A 合并 B 时 B 是 A 的子子树 则首先更新 B 以反映 A 的树结构 还会对 A 和 B 之间共享公共祖先树

John 发布了本地到中央储存库 git push origin main
然后 Mary 以 John 的提交为基础进行变基 git pull --rebase origin main
处理冲突后 git rebase --continue 按照每次本地的提交重复提交合并冲突后的流程
可以回到原点 git rebase --abort ，完成同步后发布到中央储存库 git push origin main
