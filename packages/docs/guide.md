---
title: forten - guide
lang: en-US
---

## guide


[[toc]]


::: tip
This is a tip
:::

::: warning
This is a warning
:::

::: danger
This is a dangerous warning
:::


``` html
<ul>
  <li
    v-for="todo in todos"
    :key="todo.id"
  >
    {{ todo.text }}
  </li>
</ul>
```

## header 
This header should be pink

### sub header

``` js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```