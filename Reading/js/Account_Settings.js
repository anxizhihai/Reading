document.getElementById("mybutton").onclick = function() {
    //token
    var token = localStorage.token;
    //头像
    var avatar = document.getElementById("myfile").files[0];
    //星座
    var index = document.getElementById("myselect").selectedIndex;
    var indexx = document.getElementById("myselect").value;
    var constellation = document.getElementById("myselect").options[index].value;
    var constellation1 = document.getElementById("myselect").options[index].text;
    localStorage.const = constellation1;
    localStorage.cons = String(indexx);
    console.log(localStorage.cons);
    //省
    var myselect = document.getElementById("province");
    var index1 = document.getElementById("province").selectedIndex;
    var index4 = document.getElementById("province").value;
    var se1 = document.getElementById("province").options[index1].text;
    localStorage.sheng1 = String(index4);
    localStorage.sheng2 = se1;

    //市
    var myselect1 = document.getElementById("city");
    var index2 = document.getElementById("city").selectedIndex;
    var se2 = document.getElementById("city").options[index2].text;
    localStorage.shi1 = se2;

    //区
    var myselect2 = document.getElementById("area");
    var index3 = document.getElementById("area").selectedIndex;
    var se3 = document.getElementById("area").options[index3].text;

    var city = new Array();
    city[0] = String(index1);
    city[1] = String(index2);
    city[2] = String(index3);
    var st = '[' + String(city) + ']';
    //性别
    function getValue() {
        var radio = document.getElementsByName("sex");
        for (i = 0; i < radio.length; i++) {
            if (radio[i].checked) {
                return radio[i].value
            }
        }
    }
    var radio = document.getElementsByName("sex").innterHTML = getValue();
    //name
    var name = document.getElementById("yanzheng01").value;
    var fordata = new FormData();
    fordata.append("token", token);
    fordata.append("avatar", avatar);
    fordata.append("name", name);
    fordata.append("constellation", constellation);
    fordata.append("gender", radio);
    fordata.append("city", st);
    ajaxXHR1('POST', url + 'account/profile', function(data) {
        var btnclick = data.data.user;
        if (data.code == 'SUCCESS') {
            alert("提交成功");
        } else {
            alert("提交失败");
        }
        window.location.href = "personal.html";
    }, fordata)
}