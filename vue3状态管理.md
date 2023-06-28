prop 逐级透传问题

组件层和应用层都可以使用

```
<!-- 应用层provide -->
import {createApp} from 'vue'
const app = createApp()
app.provide('注入名'，'值')
<!-- 组件层provide -->
import{ref ,provide} from 'vue'
const count =ref(0)
provide('key',count)
<!-- 提供的响应式状态使后代组件可以由此和提供者建立响应式的联系。 -->
```

<script setup>
  import { inject } from 'vue'
  const message =inject('key','默认值')
  // 默认值可能需要通过调用函数或者初始化一个类获得，为避免用不到默认值进行不必要的计算产生副作用，使用工厂函数创建默认值
  const value = inject('key', () => new ExpensiveClass())
</script>

```

```
