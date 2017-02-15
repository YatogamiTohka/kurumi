/**
 * Created by xiaobai on 2017/2/15.
 * 路由跳转
 */
$(function(){
    var Router = function(){

    }
    Router.prototype.getHtml = function(){
        var _this = this;
        var _html = "";
        $.ajax({
            url : _this.url,
            type:"get",
            async:false,
            success : function(data) {
                _this._html = data;
            }
        });
    }

    Router.prototype.assemble = function(url){
        this.url = "moudle/"+url+"/"+url+".html";
        this.con_selector = "js_"+url;
        this.controller = "moudle/"+url+"/"+url+".js";
    }

    Router.prototype.appendHtml = function(){
        $(".main_content").html(this._html);
        if($("#"+this.con_selector).length > 0 ){
            $("#"+this.con_selector).remove();
        }
        $("body").append("<script id="+this.con_selector+" src="+this.controller+"></script>");
    }

    Router.prototype.jump = function(){
        var _this = this;
        _this.url = $(".asidemenu li:first").data("url");
        _this.init();
        $(".asidemenu").on("click","li",function(){
            _this.url = $(this).data("url");
            _this.init();
        });
    }

    Router.prototype.init = function(){
        this.assemble(this.url);
        this.getHtml();
        this.appendHtml();
    }

    new Router().jump();
})
