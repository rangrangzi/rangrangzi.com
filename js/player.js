$(function () {
        songmsg.setMsg(0);
        songmsg.loadRotationChart();
        $("#volume").change(function () {
            if($(this).val() == 0){
                songmsg.songMuted(true);
            }else{
                songmsg.songMuted(false);
            }
            songmsg.setVolume($(this).val());
            volume = $(this).val();
        });
        $("#cover").click(function (){
            if($(this).hasClass('btn_pause')){
                songmsg.songPause();
            }else{
                var data_num = song.getAttribute("data-num");
                if(data_num == 0 && song.currentTime == 0){
                    song.src = song_list[data_num].song_url;
                    song.volume = 0.5;
                }
                songmsg.songPlay();
            }
        });
        $("#play_right").click(function () {
            songmsg.nextSong();
        });
        $("#play_left").click(function () {
            songmsg.prveSong();
        });
        $(".vlue-icon").click(function () {
            var isMuted,ele = $(this).children("i");
            if(ele.hasClass("v_o")){
                isMuted = true;
                $("#volume").val(0);
            }else {
                isMuted = false;
                $("#volume").val(volume);
            }
            songmsg.songMuted(isMuted);
        });
        $("#cmn-toggle-1").click(function () {
            if($(this).is(':checked')){
                open_lrc = true;
                $(".cover_container").fadeIn();
            }else{
                open_lrc = false;
                $(".cover_container").fadeOut();
            }
        });
        $("#progress  ").mousedown(function (e) {
            if(isNaN(song.duration)){
                return;
            }
            var  x = e.clientX-50;
            var total_width = $(this).width();
            var bar = (x/total_width)*100;
            bar = bar.toFixed(2);
            $("#play_on").css({"transform":"translateX("+bar+"%)"});
            time = parseInt(song.duration * bar/100);
            song.currentTime = time;
        });

    });