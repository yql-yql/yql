//转换播放量
export function changeCount(num) {
	if (num >= 100000000) {
		return (num / 100000000).toFixed(1) + "亿";
	} else {
		return (num / 10000).toFixed(1) + "万";
	}
}




