/**
 * Created by admin on 2017/2/27.
 */
$(function(){
    $("#main textarea").html("abc");
    var runzz = [
        {
            icon:"",
            checkBox:"",
            name:"个人信息管理",
            childNode:[
                {
                    icon:"",
                    checkBox:"",
                    name:"密码修改"
                },
                {
                    icon:"",
                    checkBox:"",
                    name:"个人信息修改"
                }
            ]
        },
        {
            icon:"",
            checkBox:"",
            name:"部门管理",
            childNode:[
                {
                    icon:"",
                    checkBox:"",
                    name:"系统信息设置"
                },
                {
                    icon:"",
                    checkBox:"",
                    name:"继续教育学院",
                    childNode:[
                        {
                            icon:"",
                            checkBox:"",
                            name:"新建部门"
                        }
                    ]
                }
            ]
        }
    ];

    var Mtree = function(options){
        this.options = options;
        this.init();
    }

    Mtree.prototype.init = function(){
        var _op = this.options;


    }

})