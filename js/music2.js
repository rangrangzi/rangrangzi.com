//创建一个音频播放器对象
var player = document.createElement('audio');
//记录当前正在播放的歌曲的索引
var currentIndex = 0;
//声明一个标记，记录歌曲的播放状态
var isplay = false;


(function f() {
//绑定数据到页面中
    var html = '';
//循环遍历歌曲列表，根据歌曲数目在页面中生成对应的html代码
    for (var i = 0; i < musics.length; i++) {
        var  m = musics[i];
        html +=`<tr class="music-item" id="music-item" data-index="${i}">
                                <td class="tb-space"></td>
                                <td class="tb-space"></td>
                                <td><a href="javascript:;">${m.name}</a></td>
                                <td><a href="javascript:;">${m.artist}</a></td>
                                <td><a href="javascript:;">${m.ablum}</a></td>
                                <td>${fmtSize(m.size)}</td>
                                <td class="tb-space"></td>
                            </tr>`;
    }


    //将生成的html插入指定位置
    document.getElementById('tbody').innerHTML=html;
    //初始化播放源
    player.src = musics[currentIndex].path;

})()


function fmtSize(size) {
    size = size/(1024*1024);
    size = size.toFixed(1);
    return size +'MB';
}


//为列表触发点击事件中
var trs = document.querySelectorAll('.music-item');
for (var i=0 ;i < trs.length ;i++) {
    trs[i].addEventListener('click',function () {
        clearStatus();
        //获取元素上data-index属性的属性值（获取需要播放的歌曲列表项）
        var index = this.dataset.index;
        //记录当前正在播放的歌曲
        currentIndex = index;
        //需要获取播放的歌曲对象
        var m = musics[index];
        //为播放设置播放器
        player.src = m.path;
        //播放
        startPlay();
    })
}

function  startPlay() {

    //将状态标记为正在播放
    isplay = true;
    //播放
    player.play();
    //设置颜色
    trs[currentIndex].style.backgroundColor='#f0f0f0';
    //设置播放图标
    trs[currentIndex].getElementsByTagName('td')[0].innerHTML='<img src="imgs/playing-list.gif" alt="">';
    //将播放按钮的背景图片设置为暂停图标
    document.getElementById('btnPlay').className = 'btn-pause';
    //将正在播放的歌曲名显示到底部控制区域
    document.getElementById('playingName').innerText = musics[currentIndex].name;

}
function clearStatus() {
    //还原上一首正在播放的歌曲列表背景项背景色
    trs[currentIndex].style.backgroundColor = '';
    //清除当前行下的第一个单元格的内容（清除图标）
    trs[currentIndex].getElementsByTagName('td')[0].innerHTML='<img src="" alt="">';
}

function pausePlay(){
    //将播放状态标记为false
    isplay = false;
    //暂停播放
    player.pause();
    document.getElementById('btnPlay').className='btn-play';
}

//播放控制
document.getElementById('btnPlay').addEventListener('click',function () {
    if(isplay){
        pausePlay();
    }else {
        startPlay();
    }
})

//记录歌曲的当前播放时间
var now = 0;
//记录歌曲的总播放时间
var total = 0;
//当播放器数据被加载时触发
player.addEventListener('loadeddata',function () {
    //获取当前播放器的播放位置和总播放时长
    now = player.currentTime;
    total = player.duration;
    //将歌曲的播放时间显示在控制区域
    document.querySelector('.play-current').innerText = fmtTime(now);
    document.querySelector('.play-duration').innerText = fmtTime(total);
});

//为播放器绑定播放进度改变事件
player.addEventListener("timeupdate",updateProgress);

function updateProgress () {
    //获取最新的播放进度
    now = player.currentTime;
    //计算进度的百分比
    var p = now/total * 100 +'%';
    //为进度条元素设置宽度：
    document.querySelector('.progress-control').style.width = p;
    //更新最新播放时间
    document.querySelector('.play-current').innerHTML = fmtTime(now);
}


//格式化歌曲的播放时间
function fmtTime(time) {
    //秒转化为毫秒
    time *= 1000;
    //使用毫秒数构建一个日期对象
    time = new Date(time);
    var min = time.getMinutes();
    var sec = time.getSeconds();
    min = min < 10? '0'+ min:min;
    sec = sec < 10? '0'+ sec:sec;
    return min+':'+sec;
}
//初始化播放状态为列表循环
var ps=0;
var played = new Array();

document.getElementById('play-state').addEventListener('click',function () {
    ps = ps +1;
    if(ps%3==0){
        ps = 0;
    }
    document.getElementById('play-state').innerHTML = '<img src="imgs/'+ps+'.png" alt="">';
})

//设置切到下一首歌事件
function nextMusic() {
    //记录播放的歌曲
    played[played.length++] = currentIndex;
    //将状态清空
    clearStatus();
    if(ps==0){
        currentIndex++;
        if(currentIndex >= musics.length){
            currentIndex = 0;
        }
    }
    if(ps==1){
        var ran = parseInt(Math.random()*musics.length);
        while(currentIndex==ran){
            ran = parseInt(Math.random()*musics.length);
        }
        currentIndex = ran;
    }
    if(ps==2){
    }
    //重新为播放器设置播放源
    player.src = musics[currentIndex].path;
    //继续播放
    startPlay();
}

//设置切到上一首歌事件
function lastMusic() {
    //将状态清空
    clearStatus();
    if(played.length>0){
        currentIndex = played[played.length-1];
        played.pop();
    }
    //重新为播放器设置播放源
    player.src = musics[currentIndex].path;
    //继续播放
    startPlay();
}

//设置当歌结束时事件
player.addEventListener('ended',nextMusic)
//切换到上一首歌
document.getElementById('btn-pre').addEventListener('click',lastMusic);
//切换到下一首歌
document.getElementById('btn-next').addEventListener('click',nextMusic);


var now = 0;
var total = 0;
player.addEventListener('loadeddata',function () {
    now = player.duration;
    total = player.duration;
    console.log(now,total);
});

//设置进度条拖动
(function(boxArea,bar) {
    var press = false;
    //鼠标按下监听(设置进度条区域)
    document.querySelector(boxArea,bar).addEventListener('mousedown',function (e) {
        //解除播放器的移动
        player.removeEventListener('timeupdate',updateProgress);
        //设置按下事件
        move(e);
    });
    //鼠标松开监听(设置进度条区域)
    document.querySelector(boxArea,bar).addEventListener('mouseup',function () {
        player.currentTime = now;
        player.addEventListener('timeupdate',updateProgress);
        press = false;
    });

    //鼠标拖动事件
    document.querySelector(boxArea,bar).addEventListener('mousemove',function (e) {
        if(press){
            move(e);
        }

    });

//设置按下事件时改变位置事件
function move(e) {
    //点击事件和左边缘的距离
    var eventLeft = e.offsetX;
    document.querySelector(bar).style.width = eventLeft+'px';
    //进度条的长度
    var w = window.getComputedStyle(document.getElementById('jdt')).width;
    //设置百分比
    now = eventLeft/parseInt(w) * total;
    press = true;
}
})('.play-length','.progress-control')
