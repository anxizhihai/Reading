//登陆事件

document.getElementById("btnreg24").onclick = function() {
    var zhanghao = document.getElementById("myphone24").value;
    var mima = document.getElementById("password24").value;
    ajaxXHR('POST', url + 'account/login', function(data) {
        if (data.code == "SUCCESS") {
            localStorage.token = data.data.user.token;
            localStorage.account = data.data.user.account;
            localStorage.avatar = data.data.user.avatar;
            localStorage.name = data.data.user.name;
            localStorage.id = data.data.user._id;
            localStorage.con = data.data.user.constellations;
            console.log(localStorage.id);
            // alert("登陆成功，正在跳转");
            window.location.href = "detail_list.html";
        } else {
            alert("用户名或者密码错误");
        }
    }, "account=" + zhanghao + "&password=" + mima);
}