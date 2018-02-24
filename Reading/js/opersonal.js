window.onload = function() {
    check();
    var img_touxiang = document.getElementById("myimgs");
    perLoad2(img_touxiang);
    TuiDeng();
    var img_url = 'https://dev.apis.sh/9B2juYRk@/static/';


    var opersonal = getQueryString("otherid");
    DongTai(1, opersonal);
    window.addEventListener('scroll', _.throttle(lazyLoad, 100));
    window.addEventListener('scroll', _.throttle(CheckImg, 100));

}

function TuiDeng() {
    document.getElementById("tuichudenglu").onclick = function() {
        localStorage.token = "";
        window.location.href = "index.html";
    }
}

function DongTai(page, opersonal) {
    ajaxXHR2('GET', url + 'posts/list?page=' + page + '&limit=' + 2 + '&user=' + opersonal, function(data) {
        //错误时返回
        if (data.code !== "SUCCESS" || data.data.articles.length == 0) {
            document.getElementById('loading').innerHTML = '没有更多文章';
            return false;
        }
        document.getElementById("wenzhang").innerHTML = data.count;
        var dt = data.data.articles;
        var str = '';
        var img_url = 'https://dev.apis.sh/9B2juYRk@/static/';
        for (var i = 0; i < dt.length; i++) {
            str += '<section class = "article">';
            //大图片
            str += '<a target = "_blank" href="article_details.html?user_id=' + dt[i]._id + '"><img class="imagespit" id="' + page + '' + i + '"  data-src="' + dt[i].cover + '" src="img/timg.gif"></a>';
            str += '<div class="mydivdong">';
            //文章
            str += '<div calss="wrap">';
            //标题
            str += '<a target = "_blank" href="article_details.html?user_id=' + dt[i]._id + '" class="biaoti"><h2>' + dt[i].title + '</h2></a>';
            //内容
            str += '<p class="neirong">' + dt[i].abstract + '</p>';
            //头像，名字，日期
            str += '<div > <a href = "../user/other.html?user+id=' + dt[i].author._id + '" class="zuozhe"><div class="left">';
            str += '<img src="' + img_url + dt[i].author.avatar + '" class="touxiang">';
            str += '<span class="mingzi" >' + dt[i].author.name + '</span>';
            str += '<span class="shijianmom"> ' + moment(dt[i].create_time).format('YYYY-MM-DD') + '</span>';
            str += '</div></a>';
            //浏览数和点赞数
            str += '<div class="right1">';
            //点赞
            str += '<img src="img/icon_thumb_up_like_blue.png" class="like">';
            str += '<span class ="num">1</span>';
            var praise_sum = dt[i].praise_sum || 0;
            str += '<span >' + praise_sum + '</span>';
            //浏览
            var perview_sum = dt[i].look_sum || 0;
            str += '<img src = "img/icon_saw.png" class="yanjing">';
            str += '<span>' + perview_sum + '</span>';
            str += '</div>';
            str += '</div></div>';
            str += '</div></section>';
            // preLoad_images(dt[i].cover, page + '' + i);
            var img_url = 'https://dev.apis.sh/9B2juYRk@/static/';
            document.getElementById("ajx3").src = img_url + dt[i].cover;
            document.getElementById("ajx5").innerHTML = dt[i].author.name;
            document.getElementById("ajx6").innerHTML = dt[i].author.constellations;
            document.getElementById("ajx7").innerHTML = dt[i].author.city;


        }
        //写入文章内容
        var e = document.getElementById("main-content");
        e.insertAdjacentHTML('beforeend', str);

    })


}
var page = 2;

function lazyLoad() {

    var loading = document.getElementById("loading");
    if (loading.getBoundingClientRect().top + loading.offsetHeight < document.documentElement.clientHeight) {
        DongTai(page++);
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
        window.location.href = "index.html";
    }
}

//图片预加载
function perLoad1(img) {
    var img_url = 'https://dev.apis.sh/9B2juYRk@/static/';
    var temp_img = new Image();
    //预加载图片
    temp_img.src = img_url + localStorage.avata;
    //预加载成功后替换图片
    temp_img.onload = function() {
            img.src = img_url + localStorage.avata;
        }
        //加载失败
    temp_img.onerror = function() {
        img.src = "img/0.jpg";
    }
}

function perLoad2(img) {
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
        img.src = "img/0.jpg";
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

//验证图片是否需要懒加载
function CheckImg() {
    var img_url = 'https://dev.apis.sh/9B2juYRk@/static/';
    //图片懒加载
    var imgs = document.getElementsByClassName("imagespit");
    for (var i = 0; i < imgs.length; i++) {
        //返回距离顶部高度
        var imgHeight = imgs[i].offsetTop;
        if (imgHeight < document.documentElement.clientHeight + document.documentElement.scrollTop) {
            //图片预加载
            perLoad(imgs[i]);
            //重置已替换class
            imgs[i].className = imgs[i].className.replace('imagespit', '');

        }

    }
}

//预加载图片函数
function perLoad(img) {
    var img_url = 'https://dev.apis.sh/9B2juYRk@/static/';
    var temp_img = new Image()
        //预加载图片
    temp_img.src = img_url + img.dataset.src;
    //预加载成功后替换图片
    temp_img.onload = function() {
            img.src = img_url + img.dataset.src;
        }
        //加载失败
    temp_img.onerror = function() {
        img.src = 'img/0.jpg';
    }
}