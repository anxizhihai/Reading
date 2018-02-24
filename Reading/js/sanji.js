window.onload = function() {
    //调用省
    getPro();
    //星座
    constellation();
    //性别框美化
    radios();
    check();
    TuiDeng();
    var img_touxiang = document.getElementById("myimgs");
    perLoad(img_touxiang);
}

function getPro() {
    ajaxXHR('GET', url + 'city/province', function(data) {
        if (data.code !== 'SUCCESS') {
            document.getElementById("province").insertAdjacentHTML('afterbegin', '<option>无法加载信息</option>');
            return;
        }
        var dt = data.data.province;
        var str = '<option> 请选择 </option> ';
        for (var i = 0; i < dt.length; i++) {

            str += '<option value=' + dt[i].ProID + ' data-id=' + dt[i].ProID + '>';
            str += dt[i].name;
            str += '</option>';
        }
        document.getElementById("province").insertAdjacentHTML('afterbegin', str);
        // document.getElementById("province").innerHTML = str;
        // document.querySelectorAll("#province option").splice(0, 1);
        sheng();
    });

}
//市
function getCity(pro_id) {
    var str = '<select id="city" class="form-control">';
    ajaxXHR('GET', url + 'city/city?ProID=' + pro_id, function(data) {
        if (data.code !== 'SUCCESS') {
            str = '<select class="form-control">请求失败</select> ';
            return;
        }
        str += '<option>请选择</option>';
        var dt = data.data.city;
        for (var i = 0; i < dt.length; i++) {
            str += '<option data-id=' + dt[i].CityID + '>';
            str += dt[i].name;
            str += '</option>';
        }
        str += '</select>';
        document.getElementById("province").insertAdjacentHTML('afterend', str);
        //市改变时调用区
        document.getElementById("city").onchange = function() {
            if (document.getElementById("area") != null) {
                this.parentNode.removeChild(document.getElementById("area"));
            }
            var city_id = this.selectedOptions[0].dataset.id;
            var str1 = '<select id="area"  class="form-controlone">';
            ajaxXHR('GET', url + 'city/area?CityID=' + city_id, function(data) {
                if (data.code !== 'SUCCESS') {
                    str1 = '<select class="form-control">请求失败</select> ';
                    return;
                }
                str1 += '<option>请选择</option>';
                var dt1 = data.data.area;
                for (var i = 0; i < dt1.length; i++) {
                    str1 += '<option data-id=' + dt1[i].Id + '>';
                    str1 += dt1[i].DisName;
                    str1 += '</option>';
                }
                str1 += '</select>';
                document.getElementById("city").insertAdjacentHTML('afterend', str1);
            })
        }
    })
}
//改变省时调用市
document.getElementById("province").onchange = function() {
    if (document.getElementById("city") != null) {
        this.parentNode.removeChild(document.getElementById("city"));
    }
    var id = this.selectedOptions[0].dataset.id;
    if (id == undefined) return;
    getCity(id);
}

function constellation() {
    ajaxXHR('GET', url + 'constellations/query', function(data) {
        //创建数组
        var arr = data.data.constellations;
        str = "";
        for (var i = 0; i < arr.length; i++) {
            str += '<option value = ' + i + '>';
            str += '' + arr[i] + '';
            str += '</option>';
        }
        document.getElementById("myselect").insertAdjacentHTML('afterbegin', str);
        cons();
    });

}
var img_url = 'https://dev.apis.sh/9B2juYRk@/static/';
document.getElementById("myimg").src = img_url + localStorage.avatar;
document.getElementById("yanzheng01").placeholder = localStorage.name;

function radios() {
    document.getElementById("div-on").onclick = function() {
        document.getElementById("mydiv1").style.display = "";
        document.getElementById("mydiv2").style.display = "none";
        document.getElementById("mvdiv3").style.display = "none";
        document.getElementById("mydiv4").style.display = "";
    }
    document.getElementById("div-on1").onclick = function() {
        document.getElementById("mvdiv3").style.display = "";
        document.getElementById("mydiv4").style.display = "none";
        document.getElementById("mydiv1").style.display = "none";
        document.getElementById("mydiv2").style.display = "";
    }
}

function fun() {
    var obj = document.getElementById("myselect");
    console.log(obj);
    for (i = 0; i < obj.length; i++) {
        if (obj[i].value == localStorage.cons) {
            obj[i].selected = true;
        }


    }
}

function sheng() {
    var shengshi = document.getElementById("province");
    console.log(shengshi);
    for (i = 0; i < shengshi.length; i++) {
        if (shengshi[i].value == localStorage.sheng1) {
            console.log(localStorage.sheng1);
            shengshi[i].selected = true;
        }
    }
}

function cons() {
    var conss = document.getElementById("myselect");
    console.log(conss);
    for (i = 0; i < conss.length; i++) {
        if (conss[i].value == 3) {
            conss[i].selected = true;
        }
    }
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
        document.getElementById("myimgs").src = img_url + localStorage.avatar;
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