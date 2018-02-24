window.onload = function() {


    check();
    TuiDeng();
    var img_touxiang = document.getElementById("myimgs");
    perLoad(img_touxiang);
    //获取文章传递过来的id
    var id = getQueryString("user_id");
    //文章详情异步传输
    ajaxXHR('GET', url + 'posts/details?id=' + id, function(data) {
        var arr1 = data.data.article;
        document.getElementById("mynames1").innerHTML = arr1.author.name;
        document.getElementById("mytitle").innerHTML = arr1.title;
        document.getElementById("mynames3").innerHTML = arr1.look_sum;
        document.getElementById("body1").innerHTML = arr1.body;
        var img_url = 'https://dev.apis.sh/9B2juYRk@/static/';
        document.getElementById("myimg").src = img_url + arr1.author.avatar;


        document.getElementById("mynames2").innerHTML = moment(arr1.create_time).format('YYYY-MM-DD');
    })
    PingL(1);
    window.addEventListener('scroll', _.throttle(lazyLoad, 100));

    //发表评论
    document.getElementById("mybutton").onclick = function() {
        var token = localStorage.token;
        console.log(token);
        var body = document.getElementById("mybody1").value;
        console.log(body);
        var article = id;
        console.log(article);
        //异步请求，发表评论
        ajaxXHR('POST', url + 'comment/add', function(data) {

            if (data.code == "SUCCESS") {
                alert("评论发表成功");
            }
        }, 'token=' + token + '&body=' + body + '&article=' + article)
    }
}


//异步请求，评论列表
function PingL(page) {
    var id = getQueryString("user_id");
    ajaxXHR('GET', url + 'comment/list?page=' + page + '&limit=' + 3 + '&article=' + id, function(data) {
        //错误时返回
        if (data.code !== "SUCCESS" || data.data.comments.length == 0) {
            document.getElementById('loading').innerHTML = '没有更多评论';
            return false;
        }
        var img_url = 'https://dev.apis.sh/9B2juYRk@/static/';
        var dtt = data.data.comments;
        var str = '';
        for (var i = 0; i < dtt.length; i++) {
            str += '<div class=mydivpl>';
            str += '<div class=mydivpl1>';
            str += '<span><img class="divplimg" src="' + img_url + dtt[i].author.avatar + '"></span>';
            str += '<span class="xingming" id="xingming">' + dtt[i].author.name + '</span>';
            str += '<span class="times" id="times">09：22</span>';
            str += '<span class=imgs id="imgs"><img src="img/icon_thumb_up_like_blue.png"></span>';
            str += '<span class=dianzan id="dianzan">' + dtt[i].praise_sum + '</span>';
            str += '</div>';
            str += '<div class="pinglun" id="pinglun">' + dtt[i].body + '</div>';
            str += '</div>';
        }
        document.getElementById("main-content").insertAdjacentHTML('beforeend', str);

    })

}


var page = 2;

function lazyLoad() {

    var loading = document.getElementById("loading");
    if (loading.getBoundingClientRect().top + loading.offsetHeight < document.documentElement.clientHeight) {
        console.log(loading.getBoundingClientRect().top);
        PingL(page++);
    }
}



function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var reg_rewrite = new RegExp("(^|/)" + name + "/([^/]*)(/|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    var q = window.location.pathname.substr(1).match(reg_rewrite);
    if (r != null) {
        return unescape(r[2]);
    } else if (q != null) {
        return unescape(q[2]);
    } else {
        return null;
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