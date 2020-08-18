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

    在当前项目中以软链接的形式安装目录中的包，先安装该包的所有依赖，再链接。如果`<folser>`在根目录下，其依赖会跟其他依赖一样放在最顶层的 node_modules 中

-   `npm install <tarball file>`

    安装文件目录中的包

    > 如果只是想把本地的目录 link 到你的 npm 根目录中，可以使用`npm link`命令。

    tar 包要求：

        - 文件名必须以.tar .tar.gz .tgz 作为系统文件
        - 包的内容要存放在 tar包的 子文件中，一般为 package/ 。安装的时候会剥离一层文件层（和 命令 `tar x --strip-components=1` 等效）。
        - 包必须包含一个 package.json文件，且package.json 必须包含name 和 version属性

    例子： `npm install ./package.tgz`

-   `npm install <tarball url>`

    下载一个 tarball ，并安装这个 tarball，为了和其他区分出来，url 必须以`http://` 或 `https://` 开头

-   `npm install [<@scope>/]<name>`

-   `npm install [<@scope>/]<name><tag>`

-   `npm install [<@scope>/]<name>@<version>`

-   `npm install [<@scope>/]<name>@<version range>`

-   `npm install <git remote url>`

-   `npm install <githubname>/<githubrepo>[#<commit-ish>]`

-   `npm install github:<githubname>/<githubrepo>[#<commit-ish>]`

-   `npm install gist[<githubname>/]<gistID>[#<commit-ish>|#semver:<semver>]`
-   ...

-   `npm install xxx --force`

    -   `--force` 强制 npm 从远程拉取包即使本地已经有了该包

3.  算法
    1. 从磁盘中加载已有的 node_modules 树
    2. 复制树
    3. 获取 package.json 和 分类后的数据，并添加到复制树中
    4. 遍历复制树，并添加任何缺少的依赖
        - 依赖将尽量被添加到复制树的顶部，避免破坏其他模块
    5. 对比初始树 和 复制树，列举从初始树 到 复制树 需要做的所有的动作
    6. 执行所有的动作，标识第一种动作是 install update remove 和 move


    以 `package{dep}`为格式的这种数据:A{B,C},B{C},C{D},算法生成树：
    ```
        A
        +--B
        +--C
        +--D
    ```
    如上是因为 A 已经使C被安装在跟高的级别了，满足了B到C的依赖，D仍安装在顶层，是因为没有冲突

    对于:A{B,C},B{C,D@1},C{D@2}
    ```
        A
        +--B
        +--C
            `--D@2
        +--D@1
    ```
    因为B的D@1已经被安装在顶层了，C就私有安装D@2

    因此，如果两个依赖被安装的顺序不同，会导致生成不同的树

    - npm算法的局限性
        1. npm 拒绝安装和当前包有相同名字的任何包，可以通过`--force`命令将其覆盖，但是多数情况下，可以更改本地软件包名称来解决

        2. 对于 A->B->A'->B'->A->....这种无解
        3. 为了避免这种问题，npm 拒绝安装在任何package folder 的祖先树中已经存在的 name@version ， 更正确单复杂的解决方案是 将现在已经存在的版本链接到新位置。如果影响到实际的用例，再对其进行具体分析。
