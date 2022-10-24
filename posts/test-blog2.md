---
title: 'テストブログ'
date: '2022-10-18'
description: 'テストなのでてきとうに説明を書きます。'
image: images/onepiece01_luffy.png
---

# 1. ひとつ
## 2. ふたつ
### 3. みっつ
#### 4. よっつ

はたして**太字**になるかしら

[Qiita](https://qiita.com/)へ移動  
[<font color="blue">Qiita</font>](https://qiita.com/)へ移動  
<font color="red">赤字</font>にもなる！

- 箇条書きも
- できます
- 完璧です

```javascript
import marked from "marked";

marked.setOptions({
  langPrefix: "hljs language-",
  highlight: function(code) {
    return require("highlight.js").highlightAuto(code, ["html", "javascript"])
      .value;
  }
});

```

```CSharp
public string GetName(int id)
{
  return User.First(u => u.Id == id).Name;
}

```