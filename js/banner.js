window.onload = function() {
	// 获取html对应标签
	var Awarp = document.getElementById('wrap'),
		Apic = document.getElementById('pic').getElementsByTagName('li'),
		Alist = document.getElementById('list').getElementsByTagName('li'),
		index = 0,
		timer = null;
		
	/*定义并调用自动播放函数*/
	timer = setInterval(autoPlay, 3000);
	/*鼠标划过整个容器时停止自动播放*/
	Awarp.onmouseover = function() {
		clearInterval(timer);
	}
	/*鼠标离开整个容器时继续播放下一张*/
	Awarp.onmouseout = function() {
		timer = setInterval(autoPlay, 3000);
	}
	/*遍历所有数字导航实现划过切换至对应的图片*/
	for (var i = 0; i < Alist.length; i++) {
		Alist[i].onmouseover = function() {
			clearInterval(timer);
			index = this.innerText - 1;
			/*执行图片切换函数*/
			changePic(index);
		};
	};
	
	/*index超出图片总量时归零*/
	function autoPlay() {
		if (++index >= Apic.length){
			index = 0;
		} 
		/*执行图片切换函数*/
		changePic(index)
	}
	
	/*定义图片切换函数*/
	function changePic(curIndex) {
		for (var i = 0; i < Apic.length; i++) {
			Apic[i].style.display = 'none';
			Alist[i].className = '';
		}
		Apic[curIndex].style.display = 'block';
		Alist[curIndex].className = 'on';
	}
}
