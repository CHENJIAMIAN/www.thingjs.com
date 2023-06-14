
// // To: LiangYaowen，下面的界面，都是需要整理一下，然后封装到thing.widget.min.js内的
// // 而且你注意要把thing.widget.min.js中的t3d换成THING

// 水面效果界面组件
THING.widget.WaterPanel = function (param) {
    param = param || {};
  
    const effect = param.effect;
    effect.name = '水面效果配置';
  
    const onChange = param.onChange;
  
    const panel = new THING.widget.Panel(param);
    panel.add(effect, 'name').caption(effect.name).setColor('#00F0F0');
    panel.add(effect, 'color').caption('颜色').isChangeValue(true).on('change', onChange);
    panel.add(effect, 'flowXDirection').step(0.01).min(-10).max(10)
      .caption('水平流速')
      .isChangeValue(true)
      .on('change', onChange);
    panel.add(effect, 'flowYDirection').step(0.01).min(-10).max(10)
      .caption('垂直流速')
      .isChangeValue(true)
      .on('change', onChange);
    panel.add(effect, 'scale').step(0.1).min(1).max(10)
      .caption('波纹系数')
      .isChangeValue(true)
      .on('change', onChange);
  
    return panel;
  };
  
  // 建筑效果界面组件
  THING.widget.BuildingPanel = function (param) {
    param = param || {};
  
    const effect = param.effect;
    effect.name = '效果配置';
  
    const height = param.height;
    const L2R = param.L2R;
    const onChange = param.onChange;
  
    // 界面组件
    const panel = new THING.widget.Panel({
      name: effect.name,
      isDrag: true,
      isClose: false,
      isRetract: true,
      opacity: 0.9,
      width: 280,
      hasTitle: true,
    });
  
    panel.add(effect, 'clippingPlane').caption('裁剪平面').on('change', onChange);
    if (L2R) {
      panel.add(effect, 'clippingL2R').caption('左右刨面').on('change', onChange);
      panel.add(effect, 'clippingF2B').caption('前后刨面').on('change', onChange);
    } else {
      panel.add(effect, 'clippingL2R').caption('前后刨面').on('change', onChange);
      panel.add(effect, 'clippingF2B').caption('左右刨面').on('change', onChange);
    }
    panel.add(effect, 'clippingPlaneHeight').step(0.1).min(-height).max(height)
      .caption('裁剪平面高度')
      .isChangeValue(true)
      .on('change', onChange);
  
    return panel;
  };
  
  // 天空效果界面组件
  THING.widget.SkyPanel = function (param) {
    param = param || {};
    param['domWidth'] = param['width'] || '245px';
    const effect = param.effect;
    effect.name = '效果配置';
  
    const onChange = param.onChange;
  
    const panel = new THING.widget.Panel(param);
    panel.add(effect, 'name').caption(effect.name).setColor('#00F0F0');
    panel.add(effect, 'showHelper').caption('显示光源位置').on('change', onChange);
    panel.add(effect, 'turbidity').step(0.1).min(1).max(20)
      .caption('光源扩散大小')
      .isChangeValue(true)
      .on('change', onChange);
    panel.add(effect, 'rayleigh').step(0.001).min(0).max(4)
      .caption('大气散射')
      .isChangeValue(true)
      .on('change', onChange);
    panel.add(effect, 'time').step(0.00001).min(0).max(24)
      .caption('时间')
      .isChangeValue(true)
      .on('change', onChange);
    panel.add(effect, 'beta').step(1).min(0).max(359)
      .caption('水平角度')
      .isChangeValue(true)
      .on('change', onChange);
    return panel;
  };
  
  // 场景雾效果界面组件
  THING.widget.FogPanel = function (param) {
    param = param || {};
    param['domWidth'] = param['width'] || '245px';
    delete param['width'];
    const effect = param.effect;
    effect.name = '雾效果配置';
  
    const onChange = param.onChange;
  
    const panel = new THING.widget.Panel(param);
    panel.add(effect, 'name').caption(effect.name).setColor('#00F0F0');
    panel.add(effect, 'exp2Mode').caption('非线性').on('change', onChange);
    panel.add(effect, 'color').caption('颜色').isChangeValue(true).on('change', onChange);
    panel.add(effect, 'near').step(0.1).min(0.1).max(100)
      .caption('最近距离')
      .isChangeValue(true)
      .on('change', onChange);
    panel.add(effect, 'far').step(0.1).min(1).max(200)
      .caption('最远距离')
      .isChangeValue(true)
      .on('change', onChange);
    panel.add(effect, 'density').step(0.0001).min(0.0001).max(0.05)
      .caption('密度')
      .isChangeValue(true)
      .on('change', onChange);
  
    return panel;
  };
  
  // 灯光配置界面组件
  THING.widget.LightPanel = function (param) {
    param = param || {};
    param.name = '灯光配置';
    param.hasTitle = true;
    param.isClose = true;
    param.isDrag = true;
    param.isRetract = true;
    param.opacity = 0.9;
    param['domWidth'] = param['width'] || '325px';
    delete param['width'];
    const ambientLight = param.ambientLight;
    ambientLight.name = '环境光';
  
    const mainLight = param.mainLight;
    mainLight.name = '主光源';
  
    const secondaryLight = param.secondaryLight;
    secondaryLight.name = '第二光源';
  
    const updateLight = param.onChange;
  
    const panel = new THING.widget.Panel(param);
    var tab = {
      "光源":{},
      "主光源": {},
      "第二光源": {}
    }
    const linkArr = ["光源", "主光源", "第二光源"];
    panel.addTab(tab);
    // 动态绑定物体
    panel.add(ambientLight, 'name').caption(ambientLight.name).link(linkArr[0]).setColor('#00F0F0');
    panel.add(ambientLight, 'color').caption('颜色').link(linkArr[0]).isChangeValue(true).on('change', updateLight);
    panel.add(ambientLight, 'intensity').step(0.1).min(0.0).max(1.0)
      .caption('强度').link(linkArr[0])
      .isChangeValue(true)
      .on('change', updateLight);
  
    // 动态绑定物体
    const directLights = [mainLight, secondaryLight];
    for (let i = 0; i < directLights.length; i++) {
      const linkObj = linkArr[i + 1];
      const directLight = directLights[i];
      panel.add(directLight, 'shadow').caption('影子').link(linkObj).on('change', updateLight);
      panel.add(directLight, 'color').caption('颜色').link(linkObj).isChangeValue(true).on('change', updateLight);
      panel.add(directLight, 'intensity').step(0.1).min(0.0).max(1.0)
        .caption('强度')
        .isChangeValue(true).link(linkObj)
        .on('change', updateLight);
      panel.add(directLight, 'alpha').step(1).min(0).max(359)
        .caption('垂直角度')
        .isChangeValue(true).link(linkObj)
        .on('change', updateLight);
      panel.add(directLight, 'beta').step(1).min(0).max(359)
        .caption('水平角度')
        .isChangeValue(true).link(linkObj)
        .on('change', updateLight);
    }
    panel.setPosition({
      left: 30,
      top: 30
    });
    return panel;
  };
  
  // 后期配置界面组件
  THING.widget.PostEffectPanel = function (param) {
    param = param || {};
    param.width = '616px';
    param.name = '后期设置';
    param.hasTitle = true;
    param.isClose = true;
    param.isDrag = true;
    param.isRetract = true;
    param.opacity = 0.9;
    const tab = {};
    const linkArr = ["超采样", "后期处理", "泛光", "环境光遮蔽", "颜色调整", "抗锯齿"];;
    for (let i = 0; i < linkArr.length; i++) {
      tab[linkArr[i]] = {};
    }
  
    const panel = new THING.widget.Panel(param);
  
    const config = param.config;
    const updatePostEffect = param.onChange;
  
    const temporalSuperSampling = config.temporalSuperSampling;
    temporalSuperSampling.name = '超采样';
  
    const postEffect = config.postEffect;
    postEffect.name = '后期处理';
    panel.addTab(tab);
    // 超采样
    panel.add(temporalSuperSampling, 'enable').caption('开启').link(linkArr[0]).on('change', updatePostEffect);
    panel.add(temporalSuperSampling, 'size').step(1).min(1).max(60)
      .caption('采样帧数')
      .isChangeValue(true)
      .link(linkArr[0])
      .on('change', updatePostEffect);
    // 后期处理
    if (postEffect) {
      const bloom = postEffect.bloom;
      bloom.name = '泛光';
      const screenSpaceAmbientOcclusion = postEffect.screenSpaceAmbientOcclusion;
      screenSpaceAmbientOcclusion.name = '环境光遮蔽';
  
      const colorCorrection = postEffect.colorCorrection;
      colorCorrection.name = '颜色调整';
  
      const FXAA = postEffect.FXAA;
      FXAA.FXAA = '抗锯齿';
  
      // 后期处理
      panel.add(postEffect, 'enable').caption('开启').link(linkArr[1]).on('change', updatePostEffect);
  
      // 泛光
      panel.add(bloom, 'enable').caption('开启').link(linkArr[2]).onChange(() => { updatePostEffect(); });
      panel.add(bloom, 'strength').step(0.001).min(0).max(1)
        .caption('强度')
        .link(linkArr[2])
        .isChangeValue(true)
        .on('change', updatePostEffect);
      panel.add(bloom, 'radius').step(0.1).min(0).max(5)
        .caption('半径')
        .link(linkArr[2])
        .isChangeValue(true)
        .on('change', updatePostEffect);
  
      // 环境光遮蔽
      panel.add(screenSpaceAmbientOcclusion, 'enable').caption('开启').link(linkArr[3]).onChange(() => { updatePostEffect(); });
      panel.add(screenSpaceAmbientOcclusion, 'radius').step(0.1).min(0).max(5)
        .caption('半径')
        .link(linkArr[3])
        .isChangeValue(true)
        .on('change', updatePostEffect);
      panel.add(screenSpaceAmbientOcclusion, 'intensity').step(0.01).min(0).max(5)
        .caption('强度')
        .link(linkArr[3])
        .isChangeValue(true)
        .on('change', updatePostEffect);
  
      // 颜色调整
      panel.add(colorCorrection, 'enable').caption('开启').link(linkArr[4]).on('change', updatePostEffect);
      panel.add(colorCorrection, 'exposure').step(0.1).min(0).max(1)
        .caption('曝光')
        .link(linkArr[4])
        .isChangeValue(true)
        .on('change', updatePostEffect);
      panel.add(colorCorrection, 'brightness').step(0.001).min(0).max(1)
        .caption('亮度')
        .link(linkArr[4])
        .isChangeValue(true)
        .on('change', updatePostEffect);
      panel.add(colorCorrection, 'contrast').step(0.1).min(0).max(5)
        .caption('对比度')
        .link(linkArr[4])
        .isChangeValue(true)
        .on('change', updatePostEffect);
      panel.add(colorCorrection, 'saturation').step(0.1).min(0).max(10)
        .caption('饱和度')
        .link(linkArr[4])
        .isChangeValue(true)
        .on('change', updatePostEffect);
      panel.add(colorCorrection, 'gamma').step(0.1).min(1).max(2)
        .caption('伽马矫正')
        .link(linkArr[4])
        .isChangeValue(true)
        .on('change', updatePostEffect);
  
      // 抗锯齿
      panel.add(FXAA, 'enable').caption('开启').link(linkArr[5]).on('change', updatePostEffect);
    }
  
    // 设置位置
    panel.setPosition({ left: 30, top: 30 });
    return panel;
  };
  