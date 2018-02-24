var url = 'https://dev.apis.sh/9B2juYRk@/';
//封装原生ajax
function ajaxXHR1(type, url, cb, params) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.status == 200 && xhr.readyState == 4) {
            var data = JSON.parse(xhr.response); //解析返回的response
            cb(data);
        }
    }
    xhr.open(type, url, true);
    xhr.withCredentials = true;
    //xhr.responseType = 'json'; //将返回的类型转换成JSON格式
    // xhr.setRequestHeader("Content-Type", "multipart/form-data");
    xhr.send(params);
}