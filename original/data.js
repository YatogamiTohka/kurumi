/**
 * Created by xiaobai on 2017/2/15.
 * 数据层
 */
$(function(){
    var Global = function(){

    }

    Global.prototype.asideMenu = function(){
        var urls = [
            {"url":"collection",name:"url"},
            {"url":"forget",name:"forget"},
            {"url":"tree",name:"tree"},
            {"url":"virtual",name:"virtual"}
        ];
        var liStr = "";
        urls.forEach(function(d){
            liStr += "<li data-url='"+ d.url+"'>"+ d.name+"</li>";
        })
        $(".asidemenu ul").append(liStr);
    }
    new Global().asideMenu();
    window.Global = Global;
})
