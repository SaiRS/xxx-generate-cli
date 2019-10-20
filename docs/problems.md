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
     1. ~~npm link没有用，(npm link使得@xxx-generate-cli/init安装到了全局，这个路径跟global-import得出的路径不一致)~~
        
        > 之前我们使用了`global-import`这个库，得到的全局安装包的位置不对，现在我们换成了`global-dir`,也就不存在上边所说的路径不一致的问题，所以在调试中，npm link可是使用
     2. @xxx-generate-cli/init使用ts编写，使用前需要被编译成js
   3. 更加不能先发布@xxx-generate-cli/init模块
      

   目前采用的方法：
   
   1. 编译@xxx-generate-cli/init模块
   2. 本地node_modules文件夹下边创建一个软链，指向编译后的@xxx-generate-cli/init
      ```
      cd ./node_modules
      # 创建软链
      ln -s ../../dist/packages/init @xxx-generate-cli/init
      ```
   ```
   
   ```
  > 麻烦的就是每次@xxx-generate-cli/init发生变化时，都需要重新创建一下软链

4. vscode怎么调试带有prompt的node模块？
   我们的模块有跟shell交互的地方，使用了inquirer，但当调试代码执行到prompt方法时，就没办法进行下去了。
   
   > 暂时没有找到解决办法
5. lerna run command只包含packages, 根目录下的command没有执行
   在根目录下的package.json中新增一个npm脚本
   `"tsc:all": "npm run tsc:this && lerna run tsc"`
6. 根目录打包的配置为`files: ['dist']`, 其中dist为我们生成的代码，其中也包含了`package.json`(因为在ts代码中读取了它，在ts编译后这个文件也会存在于dist中)，此时的问题是我们就有了两个package.json文件。
    npm run pack后的结果为：
    
    ```
        npm notice 1.9kB dist/src/lib/bootstrap.js         
        npm notice 1.6kB dist/src/bin/cli.js               
        npm notice 7.4kB dist/src/lib/command-run.js       
        npm notice 343B  dist/src/utils/logger/index.js    
        npm notice 2.6kB dist/package.json                 
        npm notice 2.4kB package.json                      
        npm notice 1.2kB dist/src/lib/bootstrap.js.map     
        npm notice 985B  dist/src/bin/cli.js.map           
        npm notice 3.5kB dist/src/lib/command-run.js.map   
        npm notice 453B  dist/src/utils/logger/index.js.map
    ```
 根目录下的package.json用来找到对应的入口模块（main)
    dist目录下的package.json用来运行时使用

7. window安装husky失败
   这个版本的husky需要git的版本>=2.13.2
8. npm install可以安装本地模块
  ```
   npm install module_path
   // result:
   module: "file:../eslint-plugin-xxx-eslint"
  ```
9. 推荐只使用css-module,我们使用的`css-modules-typescript-loader`只针对css-module,这样子才能利用typescript检测的能力
10. 文件结构：
    
    > 方案一：
  ```
    // 源码
    |--src
    |  |--bin
    |  |--lib
    |  |--utils
    |--package.json
    
    // 编译后的代码
    |--dist
    |  |--src
    |  |  |--bin
    |  |  |--lib
    |  |  |--utils
    |  |--package.json
  ```

在方案一中，对于tsconfig.json只设置了`outDir: dist`,所以编译后生成了dist文件夹，剩余的层级结构跟源码一致。

> 方案二： 

  ```
    // 源码
    |--src
    |  |--bin
    |  |--lib
    |  |--utils
    |--package.json
    
    // 编译后的代码
    |--dist
    |  |--bin
    |  |--lib
    |  |--utils
    |--package.json
  ```
方案二同时设置了tsconfig.json中的`rootDir, outDir`， 所得到的dist文件层级跟源码一致。这两者将生成的代码放在了单独一个文件夹中，使得项目结构更清晰明了。不过因为我们在代码中使用了`import`读取package.json，所以在最后生成的代码中，package.json文件也被ts给复制过去了，当我们给根目录下的package.json添加
```
files: [
  "dist"
]
```
之后，这就造成了在运行`npm pack`,打包后的文件只有两个，一个是根目录下的package.json, 一个是dist/package.json。之所以出现这情况，是dist/package.json因为复制，所以它也```files:['dist']```的设置，而在dist目录下是没有dist子目录。

> 解决办法 
>
> 办法一：将import改成require，这会使得tsc不再复制我们根目录下的package.json，打包后就只有一份package.json，同时对于生成的代码的结构要采用上述方案二。
>
> 办法二：使用其他的方式来读取package.json
>
> 办法三：不适用outDir选项，使得生成的代码跟源码在一起。

目前我们采用的是方法一。
