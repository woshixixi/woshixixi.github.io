# npm install

1.  概要
2.  描述

    这个命令安装一个包以及这个包所依赖的所有的包,如果这个包有 package-lock.json 或者 shrinkwrap 文件， 就会按照这个文件的内容来安装，两个文件同时存在的时候，npm-shrinkwrap.json 的优先级更高。

    这个包可能是下面几种情况的一种：

        a. 是程序文件夹，文件夹中有 package.json 文件
        b. 一个 a 文件压缩 成的 gzip包或者是 tar 包
        c. 一个指向 b 的 url
        d. 一个带 c 的 在 npm-registry 上发布了的名为 <name>@<version>
        e. 一个指向 d 的 <name>@<tag>
        f. 一个满足 e 条件，带有 "latest" tag 的 <name>
        g. 一个 指向 a 的 git 远程的 url

    即使你不发布你的包，你也可以通过使用 npm 来得到一些好处。如果你只是想写一个 node 代码，假设你压缩了这个代码包，并且想在任意地方很容易的安装这个包。

-   `npm install`

    -   把依赖安装在本地的 node_modules 文件中
    -   在全局模式下(`npm install -g`或`npm install --global`) 会把这个包的上下文（工作目录）当作全局来安装.
    -   默认 情况下， 会把所有的在 package.json 中列出的所有依赖包都安装下来
    -   如果命令中包含`--production` 或者当 `NODE_ENV` 环境变量被设置成了 production, npm 不会安装 `devDependencies` 中的包

    > 当添加一个依赖包的时候, 使用`--production`在命令行中是不起作用的

-   `npm install <folder>`
