html5全屏页面自动化工具
==========


####一键脚本安装包

2014年3月27日更新:为了让大家更加方便，写了一个脚本，直接在终端运行以下命令就可以一键(1.git clone 2.重命名 3.修改项目配置 等)配置好所有的文件，不用再一个一个打开文件修改文件。脚本为`go.sh`文件，OSX系统下`sh go.sh`即可执行，大家看下就能理解。

````
git clone git@github.com:samjiehuang/html5.git
````

####克隆本仓库

在开发目录下执行：

````
git clone git@github.com:samjiehuang/html5.git
````




####安装Npm依赖包

详细的依赖包清单请参考`package.json`文件，Grunt相关配置请看`Gruntfile.js`

````
npm install
````

安装完毕之后，你将得到如下的文件结构

####文件结构

静态页面不需要太过复杂的文件结构，最终的发布版本代码和相关文件全部在`build`文件夹中。为了后续维护方便，请适当做好相应的注释和文档。

````
newProject/
|
|-----assets //dev模式下css、js、images,frames,others等集合
|           |-css
|           |-js
|           |-frames
|           |-others
|           |-images
|
|-----build //最终生成的纯净文件夹
|       |-assets //
|           |-css
|               |-min.style.css //  最终生成的为压缩版本的css
|           |-js
|               |-min.v.js //  最终生成的为压缩版本的js
|               |-other.js //  其他样式表
|           |-images //图片
|           |-frames //插件如jquery
|           |-others //视频svg音频等
|
|       |-favicon.ico //  静态页的ico
|       |-index.html
|       |-README.md //  附上MD文档
|       |-此处根据项目需求，引入不用文件
|
|-----css //  样式表开发目录
|   |-less //  推荐使用lesssourcemap功能（注:2014年3月发布的Sass 3.3默认支持sourcemap）
|
|-----js //JavaScript相关
|   |-base.js // 基础样式在这里，最终压缩为min.v.js
|
|----- .node_modules / // npm安装依赖包所在文件夹
|
|-----.gitignore // 默认使用git，配置好gitignore文件
|-----.ftppass.json // 保存FTP帐号和密码的文件，请注意安全，建议添加到gitignore文件中
|-----Gruntfiles.js // grunt配置文件 建议先阅读配置
|-----package.json //g runt依赖包配置文件

````

####初始化

git clone下来后，可以将`StaticPage`文件夹修改成项目的文件名，建议初始化时可执行一次:

````
grunt bundle
````

####Grunt配置

######CSS编译&&压缩

对于`Less`可自动编译和纠错，使用`cssmin`对文件进行压缩，可有效减少文件大小.

使用

````
grunt sass
````

可进行Sass编译。若直接使用原生css，可直接执行`grunt`。

######JS文件

使用`concat`根据自己的需求对js进行压缩（一般简单静态页面使用一个`base.js`即可），默认使用`uglify`对js文件进行压缩，在最终的min.v.js文件前面加上时间戳（可以根据需求删除）。

######文件监听

使用

````
grunt watch
````
可监听所有的开发目录下`.scss`,`.css`,'.js'的变化，自动编译压缩。

可以单独使用`grunt watch:base`进行普通监听`js`目录下所有文件和`css/style.css`。

使用`grunt watch:sass`或者`grunt watch:css`分别监听`.scss`和`.css`文件。

######打包

使用`grunt bundle`可自动生成不包含开发时的杂乱文件压缩包，文件名为`项目名称-生成时间.zip`的压缩包。

执行`grunt bundle`实际上为依次执行'clean:pre', 'copy:main','cssmin','copy:archive', 'clean:post','compress'等命令，首先将先前`build`文件夹中的内容清空，然后生成、复制、压缩最新的代码(不包含`node_modules`文件夹、`.gitignore`、`Gruntfile.js`等配置文件)。

注意:打包后自动压缩html，默认清理掉注释，删除空格在Grunt配置中可选（追求极致可以勾选）。


######发布:上传到FTP服务器

支持直接发布上传到ftp服务器,对于没有使用git的项目做到一个线下版本管理、线上便捷发布。
```
grunt publish
```
注意:发布之前请先执行`grunt bundle`打包最终代码。

ftp帐号与密码保存在`.ftppass`文件中，请注意保密。


