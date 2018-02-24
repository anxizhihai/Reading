function mypit() {
    var myfiles = document.getElementById("myfile"); //获取点击按钮的对象
    var ua = navigator.userAgent.toLowerCase(); //判断浏览器类型
    var url = '';
    if (/msie/.test(ua)) //判断当前浏览器是否为IE浏览器
    {
        url = myfiles.value;
    } else {
        url = window.URL.createObjectURL(myfiles.files[0]); //获取forms中的文件，并赋值给url，每次调用URL.crreateObjectURl方法时，都会创建一个对象。
    }
    document.getElementById("myimg").src = url; //获取img标签对象的src，并将url赋值给img标签的src属性，这是完成打印的一步。
}

function yanzheng1() {
    var nicheng = document.getElementById("yanzheng01").value;
    var ncts = document.getElementById("yanzheng1");
    if (nicheng.length == 0) {
        ncts.innerHTML = "昵称不能为空";
    } else if (nicheng.length < 2) {
        ncts.innerHTML = "昵称不得小于2个字符";
    } else if (nicheng.length >= 2 && nicheng.length < 6) {
        ncts.innerHTML = "";
        var zz = /^[\u4E00-\u9FA5A-Za-z]+$/;
        if (zz.test(nicheng)) {
            ncts.innerHTML = "昵称格式正确";
        } else {
            ncts.innerHTML = "昵称输入有误，请重新输入";
        }

    } else if (nicheng.length >= 12) {
        nct.innerHTML = "长度不能大于6个字符，请重新输入";
    }
}

function mimayanzheng() {
    var mima = document.getElementById("mima01").value;
    var sp = document.getElementById("mima1");
    if (mima.length == 0) {
        sp.innerHTML = "密码不能为空"
    } else if (mima.length < 6) {
        sp.innerHTML = "密码不能小于6个字符";
    } else if (mima.length >= 6 && mima.length < 16) {
        sp.innerHTML = "";
        var mmzz1 = /^[0-9]{6,16}$|^[a-zA-Z]{6,16}$/;
        var mmzz2 = /^[A-Za-z0-9]{6,16}$/;
        var mmzz3 = /^\w{6,16}$/;
        if (mima.match(mmzz1)) {
            sp.innerHTML = "密码等级'较弱'，建议字母+数字";
        } else if (mima.match(mmzz2)) {
            sp.innerHTML = "密码等级'中等'，建议字母+数字+特殊符";
        } else if (mima.match(mmzz3)) {
            sp.innerHTML = "密码等级'较强'";
        }
    } else if (mima.length >= 16) {
        sp.innerHTML = "长度大于16个字符，请重新输入";
    }
}