# npm scripts

1. 描述

    - `prepublish`

        在 pack 包 和 publish 包之前运行，同时也在 本地安装之前运行

    - `prepare`

        也在 打包 和 publish 包之前，同时也在本地安装之前运行，不过在 `prepublishOnly` 之前，在 `prepublish` 之后

    - `prepublishOnly`

        只在包 `npm publish` 时执行，在 prepared 和 packed 之前

    - `prepack/postpack`

        在 包 pack 之前/之后 (npm pack 和 npm publish 和 npm install 时执行)

    - `publish/postpublish`
    - `preinstall/install/postinstall`
    - `preuninstall/uninstall/postuninstall`
    - `preversion/version/postversion`
    - `pretest/test/posttest`
    - `prestop/stop/poststop`
    - `prestart/start/poststart`
    - `preshrinkwrap/shrinkwrap/postshrinkwrap`
    - 还可以自己定义 `premyscript / myscript / postmyscript`

2. `prepublish & prepare`

    - prepublish

        - npm publish
        - npm install

    - prepare

        - npm publish
        - npm install
        - after prepublish

    - prepublishOnly

        - npm publish

3. 使用

    coffee-script 情况 可以在 devDependency 立面写，在 prepublish 中添加脚本编译成 js

4. 默认值

    1. `start`
        - `node server.js`
    2. `install`
        - `node-gyp rebuild`

5. 用户

    如果 npm 有管理员的权限，会自动切换为 nobody 用户。想使用根用户的权限，使用 `unsafe-perm` flag 来运行 脚本

6. 路径

    如果你依赖的包包含了可执行脚本，那么这些脚本会被添加到 PATH 下

7. package.json

    package.json 中的 fields 都可以通过添加 `npm_package_`前缀来获取 value 值 可以通过 `process.env.npm_package_name` 来获取包的名字，其他亦可

8. 当前生命周期

    - 注意：脚本是通过 把脚本传给 `sh` 执行的，因此这些脚本不一定非要是 nodejs 或者 js 程序，可以是任何形式的 可执行文件

9. hook

    如果想 在 所有包的 一个特殊的生命周期时运行一个 脚本，可以使用 hook script。

    在 `node_modules/.hooks/{eventname}`下放这个脚本即可,npm 会开一个子进程来执行这个脚本

10. 最佳实践

    1. 除非卸载脚本，否则不要 return 一个 非零 error ，除非你确定要这样的报错。这样可能会导致 npm 操作失败 还有可能回滚。因此一般的错误打出警告并成功退出即可。
    2. 尽量不要用脚本来实现 npm 可以做的事情。
    3. 检查环境以确定放文件的位置，比如 npm_config_bin 的根目录在 /home/user/bin 但不要尝试 安装文件到 /usr/local/bin 中，用户可能故意这样设置的
    4. 不要给你脚本 `sudo` 权限
    5. 不要使用 install 来进行编译，使用 .gyp 文件编译。基本用不到转专门设置 preinstall 和 install 脚本。如果要这样用，参考是否还有其他方式。
