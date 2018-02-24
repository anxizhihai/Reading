//登陆模块的js验证
//验证手机号码的js
var myphone = document.getElementById("myphone24");
myphone.onblur = function() {
    var myphone1 = document.getElementById("myphone24").value;
    var zzb = /^1[3|4|5|8][0-9]\d{4,8}$/;
    var myspan24 = document.getElementById("myspan24");
    if (myphone1 == "") {
        myspan24.innerHTML = "手机号码不能为空";
    } else if (zzb.test(myphone1)) {
        myspan24.innerHTML = "格式正确";
    } else {
        myspan24.innerHTML = "格式错误";
    }
}
myphone.onfocus = function() {
        var myspan24 = document.getElementById("myspan24");
        myspan24.innerHTML = "";
    }
    //验证密码的js
var mymima01 = document.getElementById("password24");
mymima01.onblur = function() {
    var mymima02 = document.getElementById("password24").value;
    var yzmm02 = document.getElementById("myspan25");
    if (mymima02 == "") {
        yzmm02.innerHTML = "密码不能为空";
    } else if (mymima02.length < 6) {
        yzmm02.innerHTML = "长度小于6位字符";

    }
}
mymima01.onfocus = function() {
    var yzmm02 = document.getElementById("myspan25");
    yzmm02.innerHTML = "";
}



//控制登录注册切换
var btn1 = document.getElementById("mya");
var btn2 = document.getElementById("myaa");
btn1.onclick = function() {
    document.getElementById("mya").classList.remove("newClassName1");
    document.getElementById("myaa").classList.remove("newClassName");
    // var mydiv10 = document.getElementById("mydiv2-1");
    // var mydiv20 = document.getElementById("mydiv2-2");
    // var mydiv30 = document.getElementById("mydiv2-3");
    document.getElementById("mydiv2-1").style.display = "";
    document.getElementById("mydiv2-3").style.display = "none";
}
btn2.onclick = function() {
    document.getElementById("mya").classList.add("newClassName1");
    document.getElementById("myaa").classList.add("newClassName");
    // var mydiv10 = document.getElementById("mydiv2-1");
    // var mydiv20 = document.getElementById("mydiv2-2");
    // var mydiv30 = document.getElementById("mydiv2-3");
    document.getElementById("mydiv2-1").style.display = "none";
    document.getElementById("mydiv2-3").style.display = "";


}



//注册js验证
//注册手机验证判断
var inputPH = document.getElementById("myphone");
inputPH.onblur = function() {
    var phone = document.getElementById("myphone").value;
    var span01 = document.getElementById("myspan1");
    var yanzheng = /^1[3|4|5|8][0-9]\d{4,8}$/;
    if (phone == "") {
        span01.innerHTML = "手机号码不能为空";
    } else if (yanzheng.test(phone)) {
        span01.innerHTML = "手机格式正确";
    } else {
        span01.innerHTML = "手机格式错误";
    }

}
inputPH.onfocus = function() {
        var span01 = document.getElementById("myspan1");
        span01.innerHTML = "";
    }
    //注册验证码判断
var yzmPH = document.getElementById("textcode");
yzmPH.onblur = function() {
    var yzm01 = document.getElementById("textcode").value;
    var zz01 = /^\d{6}$/;
    var myspan04 = document.getElementById("myspan4");
    if (zz01.test(yzm01)) {
        myspan04.innerHTML = "格式正确";
    } else {
        myspan04.innerHTML = "请输入收到的6位数字验证码";
    }
}
yzmPH.onfocus = function() {
    var myspan04 = document.getElementById("myspan4");
    myspan04.innerHTML = "";
}

//注册密码强弱判断
var pas1PH = document.getElementById("password1");
var myspan02 = document.getElementById("myspan2");
pas1PH.onblur = function() {
    var a = document.getElementById("password1").value;
    if (a.length == 0) {
        document.getElementById("myspan2").innerHTML = "密码不能为空！";
    } else if (a.length < 6) {
        document.getElementById("myspan2").innerHTML = "密码长度小于6个字符!";
    } else if (a.length >= 6 && a.length <= 16) {
        document.getElementById("myspan2").innerHTML = "";
        var reg = /^[0-9]{6,16}$|^[a-zA-Z]{6,16}$/; //全是数字或全是字母 6-16个字符
        var reg1 = /^[A-Za-z0-9]{6,16}$/; //数字、26个英文字母 6-16个字符
        var reg2 = /^\w{6,16}$/; // 由数字、26个英文字母或者下划线组成的字符串 6-16个字符
        if (a.match(reg)) {

            document.getElementById("myspan2").innerHTML = "密码强度'较弱'";
        } else if (a.match(reg1)) {

            document.getElementById("myspan2").innerHTML = "密码强度'中级'";
        } else if (a.match(reg2)) {

            document.getElementById("myspan2").innerHTML = "密码强度'较强'";
        }
    } else if (a.length > 16) {
        document.getElementById("myspan2").innerHTML = "密码长度大于16个字符!";
    }
}
pas1PH.onfocus = function() {
        document.getElementById("myspan2").innerHTML = "";
    }
    //注册重复密码
var psaPH = document.getElementById("password2");
psaPH.onblur = function() {
    var psa1 = document.getElementById("password1").value;
    var psa2 = document.getElementById("password2").value;
    var myspan03 = document.getElementById("myspan3");
    if (psa2 == "") {
        myspan03.innerHTML = "密码不能为空";

    } else if (psa1 == psa2) {
        myspan03.innerHTML = "两次密码输入一致";
    } else if (psa1 !== psa2) {
        myspan03.innerHTML = "与第一次密码不一致";
    }
}
psaPH.onfocus = function() {
    var myspan03 = document.getElementById("myspan3");
    myspan03.innerHTML = "";
}



//Ajax的异步传输
//封装函数
// function ajaxXHR(type, url, parm) {
//     var xhr = new XMLHttpRequest();
//     xhr.onreadystatechange = function() {
//         if (xhr.status == 200 && xhr.readyState == 4) {
//             console.log(xhr.responseText);
//             var data = JSON.parse(xhr.response) // 将JSON字符串转化为JSON对象
//             if (data.code == "SUCCESS") {
//                 window.location.href = "ZhaoHuiMiMa.html";
//             } else if (data.code == "account_has_registered") {
//                 alert("该用户已注册");
//             } else if (data.code == "account_password_error") {
//                 alert("用户名或密码错误");
//             }

//         }
//     }
//     xhr.open(type, url);
//     xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
//     xhr.send(parm);
// }


//获取验证码
// document.getElementById("btnyz").onclick = function() {
//         //获取输入的手机号码
//         var phone = document.getElementById("myphone").value;
//         var url = 'https://dev.apis.sh/9B2juYRk@/captcha?type=register&phone=' + phone;
//         //调用函数
//         ajaxXHR('GET', url);
//     }
//提交注册
// document.getElementById("btnreg").onclick = function() {
//     var phone = document.getElementById("myphone").value;
//     var textcod = document.getElementById("textcode").value;
//     var password1 = document.getElementById("password1").value;
//     var password2 = document.getElementById("password2").value;
//     var parm = "account=" + phone + "&password=" + password1 + "&captcha=" + textcod; //构造URL参数
//     var url = 'https://dev.apis.sh/9B2juYRk@/account/register';
//     ajaxXHR('POST', url, parm);
// }

//提交登陆
// document.getElementById("btnreg24").onclick = function() {
//     var zhanghao = document.getElementById("myphone24").value;
//     var mima = document.getElementById("password24").value;
//     var parm = "account=" + zhanghao + "&password=" + mima;
//     var url = 'https://dev.apis.sh/9B2juYRk@/account/login';
//     ajaxXHR('POST', url, parm);
// }