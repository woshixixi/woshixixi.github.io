# package.json

1.  name

    规则：

    -   少于 214 个字符,如果是某个包下面，包含外包名
    -   不能以“.”或"\_"开头
    -   新包不要有大写字母
    -   包最后会被放在 url 中，或者作为命令行的参数，或者是文件名。因此名称不能为 url 不能包含的参数

    建议:

    -   不要和 node 的模块的包名相同
    -   不要把 "js" "node" 放在最后，可以用 "engines" 这个参数标明
    -   建议 简短 可读性高 因为要使用 require() 来用
    -   起名字前最好先检查下是否重复

2.  version

    遵循 semver 规则

3.  description

    描述，是 string 类型，搜索的时候显示出来，帮助别人发现你的包

4.  keywords

    关键字，`string[]` 类型

5.  homepage

    项目主页

6.  bugs

    项目 issues url 及 bug report email

7.  license
8.  people fields:author,contributors
9.  files

    描述你的包安装的时候所包含的文件，其值为描述文件模式的数组。文件模式的描述和.gitignore 中类似的语法。如果省略这个字段，默认值为`["*"]`,表示全部文件都包含在内。

    一些特殊的文件，无论是否在 files 字段的数组中，都将包含在内

    你可以在根目录或者子目录中写个`.npmignore` 文件。文件中的模式将不会被包含。在根目录中的.npmignore 文件不会重写“files” 字段，但在子目录中的文件会重写 files 字段。`.npmignore`文件和`.gitignore`功能类似。 如果有`.gitignore` 而没有 `.npmignore` 文件，则`.gitignore` 的内容将当作 `.npmignore`使用。

    以下文件一定会被包含在内，不管是否在 files 字段中：

        - package.json
        - README
        - CHANGES / CHANGELOG / HISTORY
        - LICENSE / LICENCE
        - NOTICE
        - “main” 字段里的文件

        README, CHANGES, LICENSE & NOTICE 可以有任何形式的拓展名

    以下文件一定会被排除在外：

        .git CVS .svn .hg .lock-wscript ...

10. main

    该字段为程序入口。假设你的包名为 foo , 当用户安装了之后， 用户使用 `require('foo')` 拿到的就是你的包的主要导出的 object

11. browser

    如果你的包在浏览器端使用，应该使用这个字段而不是 main 字段。 这可以告诉用户，包内可能依赖一些 Nodejs 所不包含的属性。

12. bin

    很多包都有一个或多个想安装在 PATH 下的可执行文件。

    在 bin 中给一个 本地文件的 名字 key 和 本地文件， 安装的时候，如果是全局安装， npm 会把该文件软链接到 prefix/bin 下，如果是本地安装，则安装到./node_modules/.bin/ 下。

    例如

    ```js
    {
        "bin":{
            "myapp" :"./cli.js"
        }
    }
    ```

    当你安装 myapp 的时候，会把 cli.js 脚本的软链接到`/user/local/bin/myapp`

    如果是单个命令行，也可以这么写：

    ```js
    {
        "name":"my-programe",
        "version":"1.2.5",
        "bin":"./path/to/program"
    }
    ```

    相当于命令的名字就是包的名字

    > 注意：请保证你的脚本以 `#!/usr/bin/env node`开始,否则 脚本会在没有 node 的情况下执行

13. man

    给 man 程序识别的文件

14. directories

    -   directories.lib

        告诉别人 lib 文件地址，没有特殊操作

    -   directories.bin

        同时生命"bin"和"directories.bin" 会报错。此字段用于包含某个文件目录下多个文件

    -   directories.man

        man page 的文件目录

    -   directories.doc
    -   directories.example
    -   directories.test

15. repository
16. scripts

    [detail](./npm-scripts-zh.md)

17. config

    [detail](./npm-config-zh.md)

18. dependencies

    不要把测试工具和编译器写在 dependencies 中

    本地测试的时候，也可以把相对路径的包写在立面

    ```js
    {
        "name":"baz",
        "dependencies":{
            "bar":"file:../foo/bar"
        }
    }
    ```

19. devDependencies

    使用你的包的时候不需要安装在使用者的程序中的依赖包都放在这里。

    执行 `npm link` 和 `npm install` 时候会安装，

    如果有一些特殊的步骤需要的依赖，比如 编译 CoffeeScript 或者其他的语言到 js,在 `script` 中的`prepare`字段中添加的脚本，并在 devDependencies 中添加依赖。

    `prepare` 命令会在 发布前执行，所以用户可以使用功能而不自己安装依赖, 在 dev mode 的 npm install， 也会执行该脚本，所以可以轻松的测试。

20. peerDependencies

    一般用于写插件或者工具，你写的东西不一定需要使用到这个包，但使用你的包的包一定会要用到这个包，就放在 peerDependencies 中

    但是如果你的 peerDependencies 和 别人的包的版本不通，很容易就陷入循环。因此尽可能的将版本扩大到最大的兼容

21. bundledDependencies

    该选项接收一个依赖的数组，不包含依赖包的版本。在打包成 tar 包的时候，会把这个选项中的依赖包一起打进去。

22. optionalDependencies

    这个依赖可以被使用，但如果没有正确安装或者安装失败还需要程序继续运行就可以把依赖安装在这个选项中。

    可以添加异常处理

    ```js
    try {
        var foo = require('foo');
    } catch (e) {
        foo = null;
    }

    if (foo) {
        foo.doFooThings();
    }
    ```

    optionalDependencies 会 覆盖 dependencies 中的同名依赖，因此一个依赖包最好只放在一个字段里面。

23. engines

    可以规定你的 node 的版本范围/npm 版本范围，不要写死，不写就是全部适用

24. enginStrict

    npm 3.0.0 版本删除了

25. os
26. cpu
27. preferGlobal
