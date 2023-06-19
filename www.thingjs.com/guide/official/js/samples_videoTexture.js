/**
 * @version 2.0
 * @author ThingJS
 */
var app = new THING.App();
app.background = "#010120";

var plane = new THING.Plane(128, 80);
plane.rotateX(90);

// 创建视频纹理
var videoTexture = new THING.VideoTexture({
	url: 'https://cdn.thingjs.com/web/official/videos/UINO.mp4'
});

plane.style.sideType = THING.SideType.Double;
plane.style.image = videoTexture;

app.camera.position = [-8.692905643470565, 12.452192940181968, 176.12318496567764];