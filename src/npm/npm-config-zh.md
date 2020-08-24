# npm config

1. 命令行 flags

    `--foo bar` 相当于给 foo 设置为 “bar” 值

2. 环境变量

    - `npm_config_`前缀来获取对应 config

    - `NPM_CONFIG_FOO=bar` 大小写不敏感，但小写会覆盖大写，因此最好用小写

    - `--allow-same-version` 会变成 `npm_config_allow_same_version=true` 使用底杠而不是中杠

3. npmrc 文件

    - 项目的 config 文件 `/path/to/my/project/.npmrc`
    - 用户 config 文件 `$HOME/.npmrc`(默认), 可以通过 `--userconfig`来配置
    - 全局 config `$PREFIX/etc/.npmrc`(默认) , 可以通过`--globalconfig`来配置

4. config settings

    可以通过命令行来改变 packag.json 中的 config

    ```js
    {
        "name":"foo",
        "version":"1.2.5",
        "config":{"port":"8000"},
        "script":{"start":"node server.js"}
    }
    ```

    可以通过 修改 config 运行的值

    ```js
    npm config set foo:port 80
    ```
