/**
 * Created by admin on 2017/2/24.
 */
(function(root, factory){
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module unless amdModuleId is set
        define(["jquery"], function (a0) {
            return (factory(a0));
        });
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory(require("jquery"));
    } else {
        factory(root["jQuery"]);
    }
}(this,function(jQuery){
    (function($){
        $("#main textarea").html("我见过的最不求上进的人，既不是学霸又不全算学渣。" +
            "他们课听的迷迷糊糊，作业做一些抄一些。想逃课又心存顾忌，行为也不公开对抗规范纪律。为现状焦虑，又没有毅力践行决心去改变自己。" +
            "三分钟热度，时常憎恶自己的不争气，坚持最多的事情就是坚持不下去。" +
            "对感情抱有渴望，又疲于用心追寻与经营。" +
            "对曾经的珍视点到即止，直到渐渐松手，淡漠又疏离。" +
            "尚未拥有百毒不侵的内心，却提前丧失了热泪盈眶的能力。" +
            "偶尔闲暇时间想约人一起，更多时候无人可约就一个人且趴且趟窝上一天。" +
            "本想在有限的生命里体验很多种生活，却只会把同样的日子机械重复很多年。" +
            "刷着知乎想窥见别人的生活寻求激励，关闭客户端还是该干嘛干嘛去。" +
            "终日混迹社交网络，脸色蜡黄地对着手机和电脑的冷光屏，可以说上几句话的人却寥寥无几。" +
            "不曾经历过真正沧桑，却还失守了最后一点少年意气。" +
            "他们以最普通的身份埋没在人群中，却过着最最煎熬的日子。" +
            "作者：布衣卿" +
            "链接：https://www.zhihu.com/question/55791476/answer/146770144" +
            "来源：知乎著作权归作者所有，转载请联系作者获得授权。");
    })(jQuery)
}))
