window.onload = function() {
    check();
    var img_touxiang = document.getElementById("myimgs");
    perLoad1(img_touxiang);
    TuiDeng();
    var img_url = 'https://dev.apis.sh/9B2juYRk@/static/';
    document.getElementById("ajx3").src = img_url + localStorage.avatar;
    document.getElementById("ajx5").innerHTML = localStorage.name;
    document.getElementById("ajx6").innerHTML = localStorage.const;
    document.getElementById("ajx7").innerHTML = localStorage.sheng2;
    DongTai(1);
    window.addEventListener('scroll', _.throttle(lazyLoad, 100));
    window.addEventListener('scroll', _.throttle(CheckImg, 100));

}

function TuiDeng() {
    document.getElementById("tuichudenglu").onclick = function() {
        localStorage.token = "";
        window.location.href = "index.html";
    }
}

function DongTai(page) {
    ajaxXHR2('GET', url + 'posts/list?page=' + page + '&limit=' + 2 + '&user=' + localStorage.id, function(data) {
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
            str += '<a target = "_blank" href="article_details.html?user_id=' + dt[i]._id + '"><img width="396px" height="241px" class="imagespit" id="' + page + '' + i + '" data-src="' + dt[i].cover + '" src="img/timg.gif"></a>';
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
        window.location.href = "yrtouone.html";
    }
}

//图片预加载
function perLoad1(img) {
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