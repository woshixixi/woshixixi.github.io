# package.json

1. name

    规则：

    - 少于 214 个字符,如果是某个包下面，包含外包名
    - 不能以“.”或"\_"开头
    - 新包不要有大写字母
    - 包最后会被放在 url 中，或者作为命令行的参数，或者是文件名。因此名称不能为 url 不能包含的参数

    建议:

    - 不要和 node 的模块的包名相同
    - 不要把 "js" "node" 放在最后，可以用 "engines" 这个参数标明
    - 建议 简短 可读性高 因为要使用 require() 来用
    - 起名字前最好先检查下是否重复

2. version

    遵循 semver 规则

3. description

    描述，是 string 类型，搜索的时候显示出来，帮助别人发现你的包

4. keywords

    关键字，`string[]` 类型

5. homepage

    项目主页

6. bugs

    项目 issues url 及 bug report email

7. license
8. people fields:author,contributors
9. files
10. main
11. browser
12. bin
13. man
14. directories
15. repository
16. scripts
17. config
18. dependencies
19. devDependencies
20. peerDependencies
21. bundledDependencies
22. optionalDependencies
23. engines
24. enginStrict
25. os
26. cpu
27. preferGlobal
