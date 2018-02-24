//获取验证码
document.getElementById("btnyz").onclick = function() {
    //获取输入的手机号码
    var phone = document.getElementById("myphone").value;

    //调用函数
    ajaxXHR('GET', url + 'captcha?type=register&phone=' + phone, function(data) {
        if (data.code == 'account_has_registered') {
            alert("该用户已经注册");
            return;
        }
    });
}

//注册事件
document.getElementById("btnreg").onclick = function() {
    var phone = document.getElementById("myphone").value;
    var textcod = document.getElementById("textcode").value;
    var password1 = document.getElementById("password1").value;
    var password2 = document.getElementById("password2").value;
    ajaxXHR('POST', url + 'account/register', function(data) {
        if (data.code == 'SUCCESS') {
            //跳转到登陆页面
            window.location.href = "";
        } else { console.log(data.message) }
    }, "account=" + phone + "&password=" + password1 + "&captcha=" + textcod);
}