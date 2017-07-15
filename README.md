# chrome-extension-development
chrome扩展开发功能示范与开发环境配置。该项目包含了chrome开发中常见功能与场景的代码例子，以及一个使用webpack配置的开发环境，其支持以下特性：

1. javascript语法支持`ES6+`(babel-preset-latest)、css支持`sass`预编译器。
2. 支持`React-jsx`，自定义页面（`option`、`browser action`等）和`content scripts`都可以使用react构建ui。
3. 开发时支持background、contnet scripts以及其它自定义页面的自动刷新、`HMR`(Hot Moudule Replacement)。
4. 支持eslint代码预检查，可以在页面与终端控制台显示错误与警告。

![][5]

### 使用 & usage

* Fork或者直接clone本项目
* 打开chrome的扩展开发者模式（`chrome://extensions/`）
* 点击“加载已解压的扩展程序”，选择`<chrome-extension-development>/extension/`目录

然后就可以看到本示例扩展已成功安装到你的chrome浏览器上。

### 开发 & development

#### 开始开发
进入到项目目录，运行：

    $ npm install
    $ npm start

需要注意的是，扩展所在目录在项目下的`extension`目录下（默认，可更改）。开发代码在项目的 `app` 目录下。经过webpack打包，代码会被
放到 `extension/dist/` 目录下。  
之所以这么做，是为了避免chrome会将 `node_modules` 目录当作扩展一部分加载，否则会导致chrome假死。

#### 打包上线

    $ npm run build

以上命令依然会将代码输出到 `extension/dist/` ，但是js代码会经过压缩，大大减小文件体积。  

发布插件时，通过 `chrome://extensions/` 页面的 `打包扩展程序` 按钮，依然选择项目下的extension目录，然后就可以将打包后的扩展文件发布到`chrome store`。

[0]: https://user-images.githubusercontent.com/3774036/28240644-12bfd4e4-69b8-11e7-81cc-b4bbbd50f307.png
[1]: https://user-images.githubusercontent.com/3774036/28240645-12ef4da0-69b8-11e7-80dd-b35bae7d1861.png
[3]: https://user-images.githubusercontent.com/3774036/28240646-12eff8ea-69b8-11e7-8120-6c2588dfbb9b.png
[4]: https://user-images.githubusercontent.com/3774036/28240643-12babf86-69b8-11e7-9ace-75b93e707b3b.png
[5]: https://user-images.githubusercontent.com/3774036/28240610-b7533ac4-69b7-11e7-8423-0179cadc7a93.png "全屏1"
[6]: https://user-images.githubusercontent.com/3774036/28240609-b75342c6-69b7-11e7-86c4-9bc2519c50b0.png "全屏2"
