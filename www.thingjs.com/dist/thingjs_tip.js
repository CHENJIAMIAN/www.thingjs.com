function createThingJsTip(text) {
	if ($('.warninfo3').length) return;
	var html = '<div id="all" class="alert alert-warning warninfo3" role="alert" style="max-width:500px;color: #8a6d3b;background-color: #ffffff;position: absolute;top: 50px;left: 50%;transform: translateX(-50%);z-index: 999;padding: 15px;margin-bottom: 20px;border: 1px solid transparent;border-radius: 4px;">' +
		'<span>' + text + '</span>' +
		'<div id="close_tjs" onclick="hideThingJsTip()" style="box-sizing: content-box;cursor: pointer;position: absolute;top: -7px;right: -8px;width: 16px;height: 16px;border-radius: 50%;background-color: #777777;border: 3px solid #ffffff;">' +
		'    <div style="position: absolute;width: 10px;height: 2px;background-color: #fff;transform: rotate(45deg);top: 7px;left: 3px;"></div>' +
		'    <div style="position: absolute;width: 10px;height: 2px;background-color: #fff;transform: rotate(-45deg);top: 7px;left: 3px;"></div>' +
		'</div>' +
		'</div>';
	$('#div2d').append($(html));

	$("#close_tjs").hover(
		function () {
			$(this).css("background-color", "#333333");
		},
		function () {
			$(this).css("background-color", "#777777");
		},
	)
}
function initThingJsTip(text) {
	if ($('.warninfo3').length) {
		$('.warninfo3>span').html(text);
	} else {
		createThingJsTip(text);
	}
}
function hideThingJsTip() {
	$('.warninfo3').hide();
}