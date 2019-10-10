1. compat在遇到Promise的时候，总是报错
   eslint-plugin-xxx-eslint默认使用了compat，虽然我们是node环境。
   
   解决办法：
    * 添加browerslist配置
    * 添加setting的polyfill
2. vscode prettier不生效
  
   [github讨论](https://github.com/microsoft/vscode-eslint/issues/696)
   
   简单起见：将eslint版本降至5.x

3. 我们使用的命令如`xxx-generate-cli init react`，入口为`xxx-generate-cli`,通过`<command>`(这儿的init)来找到对应模块(`这里为：@xxx-generate-cli/init`), @xxx-generate-cli/init是我们的另一个npm模块，正在开发中。
  
     在`xxx-generate-cli`中我们需要读取到本地安装或者全局安装的`@xxx-generate-cli/init`,由几个问题：
     1. npm link没有用，(npm link使得@xxx-generate-cli/init安装到了全局，这个路径跟global-import得出的路径不一致)
     2. @xxx-generate-cli/init使用ts编写，使用前需要被编译成js
     3. 更加不能先发布@xxx-generate-cli/init模块
   
   目前采用的方法：

   1. 编译@xxx-generate-cli/init模块
   2. 本地node_modules文件夹下边创建一个软链，只想编译后的@xxx-generate-cli/init
      ```
      cd ./node_modules
      # 创建软链
      ln -s ../../dist/packages/init @xxx-generate-cli/init
      ```
   > 麻烦的就是每次@xxx-generate-cli/init发生变化时，都需要重新创建一下软链

4. vscode怎么调试带有prompt的node模块？
   我们的模块有跟shell交互的地方，使用了inquirer，但当调试代码执行到prompt方法时，就没办法进行下去了。
   > 暂时没有找到解决办法
5. 未完待续...
