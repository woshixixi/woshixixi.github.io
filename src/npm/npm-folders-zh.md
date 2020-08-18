# npm-folders

1.  描述

    -   本地安装(默认):将文件放入本包的根目录下的 node_modules 下
    -   全局安装( `-g`):将文件放在 `/usr/local`或者是 node 安装的目录下
    -   如果想使用 `require()` 用本地安装，如果想在命令行中运行，使用全局安装。如果两个都想用，可以安装两次，或者使用`npm link`

2.  prefix 设置

    prefix 默认为 node 安装的目录，在多数系统中，一般是 `/usr/local`。在 windows 系统中是`%AppData%npm`，在 Unix 系统，通常为上一层，因为 node 一般安装在`{prefix}/bin/node`在而不是`{prefix}/node.exe`。如果使用全局安装，npm 就会把包安装在这个 prefix 目录下，而本地安装是装在当前目录下。

3.  `node modules`

    -   全局安装

        -   Unix： `{prefix}/lib/node_modules`
        -   Windows: `{prefix}/node_modules`

    -   本地安装 `require("packagename/lib/path/to/sub/module)`

4.  可执行文件

    -   全局安装

        -   Unix： 可执行文件链接或直接安装到`{prefix}/bin`
        -   Windows: `{prefix}/`

    -   本地安装 `./node_modules/.bin`

5.  更多信息

    从`$PWD` 目录开始，npm 会遍历文件树，找到一个包含 package.json 或者是 node_modules 的文件。如果发现了这个文件，这个文件将会被标识为可运行命令行的有效的"当前目录"

6.  循环、冲突和 Folder Parsimony

    1. 当 npm 遍历文件寻找 node_modules 的时候，会发现祖先节点安装的包。因此如果一个包已经在祖先的 node_modules 里面安装了，该包就不会被安装在当前的目录中。

    -   🌰 foo -> bar -> baz 假如 baz 依赖 bar 那就会陷入死循环，因此在安装了 `foo/node_modules/bar/node_modules/baz` 之后，发现 bar 已经存在在祖先的 node_modules 中了，就不会再放入 `.../baz/node_modules` 里了。

    2. 上面那种情况仅适用于相同的版本，如果两个包是不同的版本。

    3. 可以通过在最高级安装一些包进行优化

7.  例子

```
foo
+-- blerg@1.2.5
+-- bar@1.2.3
|   +-- blerg@1.x(latest=1.3.7)
|   +-- baz@2.x
|   |   `-- quux@3.x
|   |       `-- bar@1.2.3(cycle)
|   `-- asdf@*
`-- baz@1.2.3
    `-- quux@3.x
        `-- bar
```

安装目录：

```
foo
+-- node_modules
    +-- blerg@1.2.5
    +-- bar@1.2.3
    |   `-- node_modules
    |       +-- baz@2.x
    |       |   `-- node_modules
    |       |       `-- quux@3.x
    |       `-- asdf@*
    |
    `-- baz@1.2.3
        `-- node_modules
            `-- quux@3.x
```
