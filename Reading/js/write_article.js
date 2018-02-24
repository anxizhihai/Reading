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
    document.getElementById("my-filess").style.display = "";
    document.getElementById("mydiv-span").style.display = "none";
}
// document.getElementById("mybutton1").onclick = function() {
//     var file = document.getElementById("myfile").files[0];
// }

document.getElementById("aticle").onclick = function() {
    var token = localStorage.token;
    if (token == "") { alert("请先登录"); return false; }
    var title = document.getElementById("mytitle").value;
    var pic = document.getElementById("myfile").files[0];
    var body = document.getElementById("mybody").value;
    var mydata = new FormData();
    mydata.append("token", token);
    mydata.append("title", title);
    mydata.append("pic", pic);
    mydata.append("body", body);
    console.log(body);
    ajaxXHR1('POST', url + '/posts/add', function(data) {
        if (data.code = "SUCCESS") {
            alert("发表成功");
        }
        window.location.href = "personal.html";
    }, mydata)

}

window.onload = function() {
    check();
    TuiDeng();
    var img_touxiang = document.getElementById("myimgs");
    perLoad(img_touxiang);
}

function check() {
    var token = localStorage.token;
    var img_url = 'https://dev.apis.sh/9B2juYRk@/static/';
    if (token == '') {
        document.getElementById("head").style.display = "";
        document.getElementById("heads").style.display = "none";
    } else {
        document.getElementById("head").style.display = "none";
        document.getElementById("heads").style.display = "";
        document.getElementById('ximings').innerHTML = localStorage.name;

    }
}

function TuiDeng() {
    document.getElementById("tuideng").onclick = function() {
        localStorage.token = "";
        window.location.href = "yrtouone.html";
    }
}


//图片预加载
function perLoad(img) {
    var img_url = 'https://dev.apis.sh/9B2juYRk@/static/';
    var temp_img = new Image();
    //预加载图片
    temp_img.src = img_url + localStorage.avatar;
    //预加载成功后替换图片
    temp_img.onload = function() {
            img.src = img_url + localStorage.avatar;
        }
        //加载失败
    temp_img.onerror = function() {
        img.src = "img/2.png";
    }
}