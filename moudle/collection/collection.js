/**
 * Created by admin on 2017/2/15.
 */
$(function(){
    var Collection = function(){

    }

    Collection.prototype.appendContent = function(){
        var urls = [
            {"url":"http://www.kancloud.cn/jikeytang/qq/81134",name:"JS前端开发群规 - 492107297"},
            {"url":"https://lodash.com/docs",name:"lodash documentation"},
            {"url":"http://www.css88.com/doc/underscore/#groupBy",name:"Underscore.js"},
            {"url":"http://www.cnblogs.com/aaronjs/p/3279314.html",name:"jQuery源码分析系列"},
            {"url":"https://isux.tencent.com/css3/index.html",name:"动画手册[Guide] - CSS3动画参考 by Tencent ISUX | DMDC"},
            {"url":"http://www.114la.com/other/rgb.htm",name:"RGB颜色查询对照表"},
            {"url":"https://zhuanlan.zhihu.com/yanhaijing",name:"颜海镜的博客 - 知乎专栏"},
            {"url":"http://www.jq22.com/jquery-plugins%E8%83%8C%E6%99%AF-1-jq",name:"jQuery背景插件"},
            {"url":"http://www.cnblogs.com/longbaobao/articles/2000685.html",name:"[javascript基础]constructor与prototype - longbaobao - 博客园"},
            {"url":"http://www.cnblogs.com/hhstuhacker/p/zrender-source-painter-shape.html",name:"ZRender源码分析5：Shape绘图详解 - LonelyClick - 博客园"},
            {"url":"http://www.cnblogs.com/zichi/p/6020594.html",name:"Underscore 整体架构浅析 - 韩子迟 - 博客园"},
            {"url":"http://www.cnblogs.com/zhuzhenwei918/p/6025077.html",name:"深入理解JavaScript中的属性和特性 - 918之初 - 博客园"},
            {"url":"http://www.cnblogs.com/best/p/6112137.html",name:"CSS3与页面布局学习总结（二）——Box Model、边距折叠、内联与块标签、CSSReset - 张果 - 博客园"},
            {"url":"https://github.com/chokcoco/iCSS/issues/1",name:"谈谈一些有趣的CSS题目（1~5） · Issue #1 · chokcoco/iCSS"},
            {"url":"http://www.css88.com/book/css/properties/user-interface/outline.htm",name:"pointer-events - CSS3参考手册"},
            {"url":"http://www.cnblogs.com/TomXu/archive/2011/12/15/2288411.html",name:"深入理解JavaScript系列 - 汤姆大叔 - 博客园"},
            {"url":"http://www.w3cplus.com/",name:"w3cplus"},
            {"url":"http://www.cnblogs.com/coco1s/p/6253154.html",name:"谈谈一些有趣的CSS题目（十二）-- 你该知道的字体 font-family - ChokCoco - 博客园"},
            {"url":"http://www.cnblogs.com/grey-zhou/p/6377560.html",name:"《javascript设计模式与开发实践》阅读笔记（15）—— 装饰者模式 - 出世Sunny - 博客园"},
            {"url":"http://jo2.org/html5-canvas-tutorial-list/",name:"html5 Canvas画图教程2：最简单的画线条 - 脚儿网"},
            {"url":"https://zhuanlan.zhihu.com/vczh-nichijou",name:"vczh的日常 - 知乎专栏"},
            {"url":"https://github.com/llh911001/mostly-adequate-guide-chinese",name:"llh911001/mostly-adequate-guide-chinese: JS函数式编程指南中文版"},
            {"url":" http://www.wallpaperbetter.com/",name:"wallpaperbetter"},
            {"url":" https://output.jsbin.com/wubudog/",name:"练习"}
        ];
        var liStr = "";
        urls.forEach(function(d){
            liStr += "<li><h3><a href="+ d.url+" target='_blank'>"+ d.name+"</a></h3></li>";
        })
        $("#main .coll-urls").append(liStr);
    }
    new Collection().appendContent();
    window.Collection = Collection;
})