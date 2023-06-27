/**
 * <p>THINGJSX二开API命名空间</p>
 */
declare namespace THINGX {
    /**
     * <p>事件</p>
     */
    namespace Event {
        /**
         * @property target - <p>监听对象</p>
         * @property event - <p>监听事件</p>
         * @property [condition] - <p>物体类型选择条件</p>
         * @property [suffix] - <p>可变事件后缀</p>
         * @property callback - <p>监听回调函数</p>
         * @property [priority] - <p>监听优先级</p>
         * @property [tag] - <p>监听标签</p>
         */
        type ListenConfig = {
            target: THING.BaseObject;
            event: THINGX.Event.Type;
            condition?: string;
            suffix?: string;
            callback: (...params: any[]) => any;
            priority?: number;
            tag?: string;
        };
        /**
         * @property target - <p>监听对象</p>
         * @property event - <p>监听事件</p>
         * @property [condition] - <p>物体类型选择条件</p>
         * @property [suffix] - <p>可变事件后缀</p>
         * @property data - <p>事件信息，传递回调参数</p>
         * @property [compatibility = true] - <p>是否兼容遗产事件触发</p>
         * @property [tag] - <p>监听标签</p>
         */
        type TriggerConfig = {
            target: THING.BaseObject;
            event: THINGX.Event.Type;
            condition?: string;
            suffix?: string;
            data: any;
            compatibility?: boolean;
            tag?: string;
        };
        /**
         * @property target - <p>监听对象</p>
         * @property event - <p>监听事件</p>
         * @property [condition] - <p>物体类型选择条件</p>
         * @property [suffix] - <p>可变事件后缀</p>
         * @property [compatibility = true] - <p>是否兼容遗产事件触发</p>
         * @property [tag] - <p>监听标签</p>
         */
        type ResumeConfig = {
            target: THING.BaseObject;
            event: THINGX.Event.Type;
            condition?: string;
            suffix?: string;
            compatibility?: boolean;
            tag?: string;
        };
        /**
         * @property target - <p>监听对象</p>
         * @property event - <p>监听事件</p>
         * @property [condition] - <p>物体类型选择条件</p>
         * @property [suffix] - <p>可变事件后缀</p>
         * @property [compatibility = true] - <p>是否兼容遗产事件触发</p>
         * @property [tag] - <p>监听标签</p>
         */
        type PauseConfig = {
            target: THING.BaseObject;
            event: THINGX.Event.Type;
            condition?: string;
            suffix?: string;
            compatibility?: boolean;
            tag?: string;
        };
        /**
         * @property target - <p>监听对象</p>
         * @property event - <p>监听事件</p>
         * @property [condition] - <p>物体类型选择条件</p>
         * @property [suffix] - <p>可变事件后缀</p>
         * @property [tag] - <p>监听标签</p>
         * @property [compatibility = true] - <p>是否兼容遗产事件触发</p>
         * @property [callback] - <p>监听回调函数</p>
         */
        type OffConfig = {
            target: THING.BaseObject;
            event: THINGX.Event.Type;
            condition?: string;
            suffix?: string;
            tag?: string;
            compatibility?: boolean;
            callback?: (...params: any[]) => any;
        };
        /**
         * <p>监听事件</p>
         * @param config - <p>监听事件配置</p>
         * @returns <p>boolean 是否监听成功</p>
         */
        function on(config: THINGX.Event.ListenConfig): any;
        /**
         * <p>监听事件， 只触发一次</p>
         * @param config - <p>监听事件配置</p>
         * @returns <p>boolean 是否监听成功</p>
         */
        function one(config: THINGX.Event.ListenConfig): any;
        /**
         * <p>触发事件</p>
         * @param config - <p>监听事件配置</p>
         * @returns <p>boolean 是否触发成功</p>
         */
        function trigger(config: THINGX.Event.TriggerConfig): any;
        /**
         * <p>取消监听事件</p>
         * @param config - <p>监听事件配置</p>
         */
        function off(config: THINGX.Event.OffConfig): void;
        /**
         * <p>暂停注册事件</p>
         * @param config - <p>监听事件配置</p>
         */
        function pause(config: THINGX.Event.PauseConfig): void;
        /**
         * <p>恢复注册事件</p>
         * @param config - <p>监听事件配置</p>
         */
        function resume(config: THINGX.Event.ResumeConfig): void;
        /**
         * <p>新建事件</p>
         * @param val - <p>事件名称</p>
         * @param [legacyVal] - <p>遗产事件名称</p>
         * @param [withSuffix = false] - <p>是否有后缀</p>
         */
        function create(val: string, legacyVal?: string, withSuffix?: boolean): any;
        namespace Tag {
            /**
             * <p>显示孪生体面板</p>
             */
            var ShowDigitalTwinPanel: any;
            /**
             * <p>隐藏孪生体面板</p>
             */
            var HideDigitalTwinPanel: any;
            /**
             * <p>创建显示孪生体提示</p>
             */
            var CreateDigitalTwinTip: any;
            /**
             * <p>销毁孪生体提示</p>
             */
            var DestroyDigitalTwinTip: any;
            /**
             * <p>显示孪生体默认效果</p>
             */
            var ShowDigitalTwinDefaultEffect: any;
            /**
             * <p>隐藏孪生体默认效果</p>
             */
            var HideDigitalTwinDefaultEffect: any;
            /**
             * <p>设置选中默认效果</p>
             */
            var SetSelectDefaultEffect: any;
            /**
             * <p>取消设置选中默认效果</p>
             */
            var SetUnselectDefaultEffect: any;
            /**
             * <p>停止飞行</p>
             */
            var StopFly: any;
            /**
             * <p>设置兄弟房间透明</p>
             */
            var SetBrotherRoomsTransparency: any;
            /**
             * <p>设置兄弟房间不透明</p>
             */
            var SetBrotherRoomsNotTransparency: any;
            /**
             * <p>设置楼层透明</p>
             */
            var SetFloorTransparency: any;
            /**
             * <p>设置楼层不透明</p>
             */
            var SetFloorNotTransparency: any;
            /**
             * <p>设置兄弟孪生体透明</p>
             */
            var SetBrotherTwinsTransparency: any;
            /**
             * <p>设置兄弟孪生体不透明</p>
             */
            var SetBrotherTwinsNotTransparency: any;
            /**
             * <p>显示建筑告警</p>
             */
            var ShowAlarmForBuilding: any;
            /**
             * <p>为当前层级设置告警参数</p>
             */
            var SetAlarmParamsForCurrentLevel: any;
            /**
             * <p>创建图层</p>
             */
            var CreateLayer: any;
            /**
             * <p>更新监控效果</p>
             */
            var UpdateMonitorEffect: any;
            /**
             * <p>进入建筑后，只有一层楼则直接进入楼层</p>
             */
            var EnterFloorDirectAfterEnterBuildingIfOneFloorInBuilding: any;
            /**
             * <p>退出楼层后，只有一层楼则直接进入园区</p>
             */
            var EnterCampusDirectAfterLeaveFloorIfOneFloorInBuilding: any;
            /**
             * <p>进入楼层后，只有一间房则直接进入房间</p>
             */
            var EnterRoomDirectAfterEnterFloorIfOneRoomInFloor: any;
            /**
             * <p>退出房间后，只有一层楼则直接进入建筑</p>
             */
            var EnterBuildingDirectAfterLeaveRoomIfOneRoomInFloor: any;
        }
        /**
         * <p>事件类型</p>
         */
        namespace Type { }
    }
    /**
     * <p>告警模块</p>
     */
    namespace Alarm {
        /**
         * <p>告警查询配置</p>
         * @property [acknowledged] - <p>处理状态</p>
         * @property alarmLevel - <p>告警级别</p>
         * @property [classNames = [1, 2, 3, 4]] - <p>孪生体业务分类，默认为空数组代表所有</p>
         * @property dcIds - <p>场景的数据库ID数组（<em>DBID</em>）</p>
         * @property [enableGlobal = false/true] - <p>开启全局查询，当前层级是地图的话默认true，园区默认false。当为true时，需要设置dcIds</p>
         * @property fromCiId - <p>查询的起始层级的数据库ID（<em>DBID</em>）</p>
         * @property keyword - <p>搜索关键词，会匹配孪生体的名称，告警详情</p>
         * @property orAttrs - <p>孪生体属性条件筛选 默认空数组代表没有过滤条件</p>
         * @property [sortType = time-desc] - <p>告警排序方式 默认按时间倒序 time-asc 告警时间正序/time-desc 告警时间倒序/level-asc 告警级别正序/level-desc 告警级别倒序</p>
         */
        type QueryConfig = {
            acknowledged?: string;
            alarmLevel: number[];
            classNames?: string[];
            dcIds: string[];
            enableGlobal?: boolean;
            fromCiId: string;
            keyword: string;
            orAttrs: object[];
            sortType?: string;
        };
        /**
         * <p>告警等级配置</p>
         * @property color - <p>告警颜色，十六进制</p>
         * @property name - <p>告警级别名称</p>
         * @property sound - <p>告警声音配置</p>
         * @property sound.name - <p>告警声音名称</p>
         * @property sound.url - <p>告警声音资源url</p>
         */
        type LevelItemConfig = {
            color: string;
            name: string;
            sound: {
                name: string;
                url: string;
            };
        };
        /**
         * <p>激活告警系统</p>
         * @param purpose - <p>激活目的</p>
         */
        function activate(purpose: string): void;
        /**
         * <p>取消激活告警系统</p>
         * @param purpose - <p>取消激活目的</p>
         */
        function deactivate(purpose: string): void;
        /**
         * <p>告警系统是否激活</p>
         */
        function isActivated(): boolean;
        /**
         * <p>获取已存在的激活告警系统的目的</p>
         * @returns <ul>
         * <li>激活告警系统的目的</li>
         * </ul>
         */
        function getPurpose(): string[];
        /**
         * <p>激活3D告警效果</p>
         */
        function activateEffect(): void;
        /**
         * <p>取消激活3D告警效果</p>
         */
        function deactivateEffect(): void;
        /**
         * <p>3D告警效果是否被激活</p>
         */
        function isEffectActivated(): boolean;
        /**
         * <p>激活告警声音效果</p>
         */
        function activateSound(): void;
        /**
         * <p>取消激活告警声音效果</p>
         */
        function deactivateSound(): void;
        /**
         * <p>告警声音效果是否被激活</p>
         */
        function isSoundActivated(): boolean;
        /**
         * <p>告警系统是否初始化完成</p>
         */
        function isInitialized(): boolean;
        /**
         * <p>获取告警级别配置</p>
         * @returns <ul>
         * <li>告警级别配置</li>
         * </ul>
         */
        function getLevelConfig(): Map<number, THINGX.Alarm.LevelItemConfig>;
        /**
         * <p>获取告警查询配置</p>
         */
        function getQueryConfig(): AlarmQueryConfig;
        /**
         * <p>设置告警查询配置</p>
         * @example
         * // 设置查询告警级别为 1,2,3 级的告警
         * THINGX.Alarm.setQueryConfig({
         *     alarmLevel: [1,2,3]
         * });
         * // 设置查询孪生体业务分类为 '温湿度感应器' 的告警数据
         * THINGX.Alarm.setQueryConfig({
         *     classNames: ['温湿度感应器']
         * });
         * // 根据孪生体属性筛选告警
         * THINGX.Alarm.setQueryConfig({
         *     orAttrs:[{ "key": '业务分类', "value":"空调", "optType": 1 }]
         * });
         * @param config - <p>告警查询配置</p>
         * @param [isRemoteData = true] - <p>是否立即请求告警</p>
         */
        function setQueryConfig(config: THINGX.Alarm.QueryConfig, isRemoteData?: boolean): void;
        /**
         * <p>获取所有告警数据</p>
         */
        function getAllData(): any;
        /**
         * <p>获取全局告警数据最高告警级别 数值约小级别越高, 默认1为最高级，对应“严重”告警级别，依次向下排</p>
         */
        function getHighestLevel(): number | null;
        /**
         * <p>获取孪生体上最高告警级别数据</p>
         * @param digitalTwin - <p>孪生体对象</p>
         * @param isTraverse - <p>是否遍历该孪生体的孩子</p>
         */
        function getHighestLevelDataWithTwin(digitalTwin: THING.BaseObject, isTraverse: boolean): any | null;
        /**
         * <p>开始请求后台接口更新所有告警信息，activate后会自动调用，尽量使用activate来控制告警系统</p>
         */
        function startRequestData(): void;
        /**
         * <p>告警查询配置</p>
         * @property [acknowledged] - <p>处理状态</p>
         * @property alarmLevel - <p>告警级别</p>
         * @property [classNames = [1, 2, 3, 4]] - <p>孪生体业务分类，默认为空数组代表所有</p>
         * @property dcIds - <p>场景的数据库ID数组（<em>DBID</em>）</p>
         * @property [enableGlobal = false/true] - <p>开启全局查询，当前层级是地图的话默认true，园区默认false。当为true时，需要设置dcIds</p>
         * @property fromCiId - <p>查询的起始层级的数据库ID（<em>DBID</em>）</p>
         * @property keyword - <p>搜索关键词，会匹配孪生体的名称，告警详情</p>
         * @property orAttrs - <p>孪生体属性条件筛选 默认空数组代表没有过滤条件</p>
         * @property [sortType = time-desc] - <p>告警排序方式 默认按时间倒序 time-asc 告警时间正序/time-desc 告警时间倒序/level-asc 告警级别正序/level-desc 告警级别倒序</p>
         */
        type QueryConfig = {
            acknowledged?: string;
            alarmLevel: number[];
            classNames?: string[];
            dcIds: string[];
            enableGlobal?: boolean;
            fromCiId: string;
            keyword: string;
            orAttrs: object[];
            sortType?: string;
        };
        /**
         * <p>告警等级配置</p>
         * @property color - <p>告警颜色，十六进制</p>
         * @property name - <p>告警级别名称</p>
         * @property sound - <p>告警声音配置</p>
         * @property sound.name - <p>告警声音名称</p>
         * @property sound.url - <p>告警声音资源url</p>
         */
        type LevelItemConfig = {
            color: string;
            name: string;
            sound: {
                name: string;
                url: string;
            };
        };
        /**
         * <p>激活告警系统</p>
         * @param purpose - <p>激活目的</p>
         */
        function activate(purpose: string): void;
        /**
         * <p>取消激活告警系统</p>
         * @param purpose - <p>取消激活目的</p>
         */
        function deactivate(purpose: string): void;
        /**
         * <p>告警系统是否激活</p>
         */
        function isActivated(): boolean;
        /**
         * <p>获取已存在的激活告警系统的目的</p>
         * @returns <ul>
         * <li>激活告警系统的目的</li>
         * </ul>
         */
        function getPurpose(): string[];
        /**
         * <p>激活3D告警效果</p>
         */
        function activateEffect(): void;
        /**
         * <p>取消激活3D告警效果</p>
         */
        function deactivateEffect(): void;
        /**
         * <p>3D告警效果是否被激活</p>
         */
        function isEffectActivated(): boolean;
        /**
         * <p>激活告警声音效果</p>
         */
        function activateSound(): void;
        /**
         * <p>取消激活告警声音效果</p>
         */
        function deactivateSound(): void;
        /**
         * <p>告警声音效果是否被激活</p>
         */
        function isSoundActivated(): boolean;
        /**
         * <p>告警系统是否初始化完成</p>
         */
        function isInitialized(): boolean;
        /**
         * <p>获取告警级别配置</p>
         * @returns <ul>
         * <li>告警级别配置</li>
         * </ul>
         */
        function getLevelConfig(): Map<number, THINGX.Alarm.LevelItemConfig>;
        /**
         * <p>获取告警查询配置</p>
         */
        function getQueryConfig(): AlarmQueryConfig;
        /**
         * <p>设置告警查询配置</p>
         * @example
         * // 设置查询告警级别为 1,2,3 级的告警
         * THINGX.Alarm.setQueryConfig({
         *     alarmLevel: [1,2,3]
         * });
         * // 设置查询孪生体业务分类为 '温湿度感应器' 的告警数据
         * THINGX.Alarm.setQueryConfig({
         *     classNames: ['温湿度感应器']
         * });
         * // 根据孪生体属性筛选告警
         * THINGX.Alarm.setQueryConfig({
         *     orAttrs:[{ "key": '业务分类', "value":"空调", "optType": 1 }]
         * });
         * @param config - <p>告警查询配置</p>
         * @param [isRemoteData = true] - <p>是否立即请求告警</p>
         */
        function setQueryConfig(config: THINGX.Alarm.QueryConfig, isRemoteData?: boolean): void;
        /**
         * <p>获取所有告警数据</p>
         */
        function getAllData(): any;
        /**
         * <p>获取全局告警数据最高告警级别 数值约小级别越高, 默认1为最高级，对应“严重”告警级别，依次向下排</p>
         */
        function getHighestLevel(): number | null;
        /**
         * <p>获取孪生体上最高告警级别数据</p>
         * @param digitalTwin - <p>孪生体对象</p>
         * @param isTraverse - <p>是否遍历该孪生体的孩子</p>
         */
        function getHighestLevelDataWithTwin(digitalTwin: THING.BaseObject, isTraverse: boolean): any | null;
        /**
         * <p>开始请求后台接口更新所有告警信息，activate后会自动调用，尽量使用activate来控制告警系统</p>
         */
        function startRequestData(): void;
    }
    /**
     * <p>App模块</p>
     */
    namespace App {
        /**
         * <p>当前app</p>
         */
        var App.current: THING.App | undefined;
        /**
         * <p>当前层级孪生体对象</p>
         */
        var App.currentLevel: THING.BaseObject | undefined;
        /**
         * <p>当前app</p>
         */
        var App.current: THING.App | undefined;
        /**
         * <p>当前选择的第一个孪生体对象</p>
         */
        var App.currentSelected: THING.BaseObject | undefined;
        /**
         * <p>当前场景信息</p>
         */
        var App.sceneInfo: any;
        /**
         * <p>当前场景CICode</p>
         */
        var App.sceneCICode: string;
        /**
         * <p>通过ThingJS语法查询当前app下孪生体集合</p>
         * @param expression - <p>ThingJS语法表达式</p>
         * @returns <ul>
         * <li>查询到的孪生体</li>
         * </ul>
         */
        function App.queryWithThingJSExpression(expression: string): THING.BaseObject[];
        /**
         * <p>当前ThingJS-X版本号</p>
         */
        var App.version: string;
        /**
         * <p>当前使用的标记库版本号</p>
         */
        var App.vendorMarkerVersion: string;
        /**
         * <p>当前使用的ThingJS的版本号</p>
         */
        var App.vendorThingJSVersion: string;
        /**
         * <p>当前使用的地图的版本号</p>
         */
        var App.vendorGeoVersion: string;
        /**
         * <p>当前app</p>
         */
        var App.current: THING.App | undefined;
        /**
         * <p>当前层级孪生体对象</p>
         */
        var App.currentLevel: THING.BaseObject | undefined;
        /**
         * <p>当前app</p>
         */
        var App.current: THING.App | undefined;
        /**
         * <p>当前选择的第一个孪生体对象</p>
         */
        var App.currentSelected: THING.BaseObject | undefined;
        /**
         * <p>当前场景信息</p>
         */
        var App.sceneInfo: any;
        /**
         * <p>当前场景CICode</p>
         */
        var App.sceneCICode: string;
        /**
         * <p>通过ThingJS语法查询当前app下孪生体集合</p>
         * @param expression - <p>ThingJS语法表达式</p>
         * @returns <ul>
         * <li>查询到的孪生体</li>
         * </ul>
         */
        function App.queryWithThingJSExpression(expression: string): THING.BaseObject[];
        /**
         * <p>当前ThingJS-X版本号</p>
         */
        var App.version: string;
        /**
         * <p>当前使用的标记库版本号</p>
         */
        var App.vendorMarkerVersion: string;
        /**
         * <p>当前使用的ThingJS的版本号</p>
         */
        var App.vendorThingJSVersion: string;
        /**
         * <p>当前使用的地图的版本号</p>
         */
        var App.vendorGeoVersion: string;
    }
    /**
     * <p>业务模块</p>
     */
    namespace Business {
        /**
         * <p>显示业务模块</p>
         */
        function show(): void;
        /**
         * <p>隐藏业务模块</p>
         */
        function hide(): void;
        /**
         * <p>获取指定层级下指定名称业务</p>
         * @param [level = THINGX.App.currentLevel] - <p>指定层级</p>
         * @param [name=] - <p>业务名称，为空则获取指定层级下所有业务</p>
         * @returns <ul>
         * <li>业务实例</li>
         * </ul>
         */
        function get(level?: THING.BaseObject | THINGX.CONST.DEFAULT_DIGITAL_TWIN_CLASS, name=?: string): object[];
        /**
         * <p>激活业务</p>
         * @param name - <p>业务名称</p>
         */
        function activate(name: string): void;
        /**
         * <p>取消激活当前业务</p>
         */
        function deactivate(): void;
        /**
         * <p>获取当前激活的业务信息</p>
         */
        function getActivated(): any;
        /**
         * <p>重新读取可视化配置 并根据当前层级重新创建业务</p>
         * @returns <ul>
         * <li>是否刷新成功</li>
         * </ul>
         */
        function refresh(): Promise<boolean>;
        /**
         * <p>显示业务面板- 建议通过activate激活业务</p>
         * @param name - <p>业务名称</p>
         */
        function showPanel(name: string): void;
        /**
         * <p>隐藏业务面板 - 建议通过deactivate取消激活业务</p>
         * @param name - <p>业务名称</p>
         */
        function hidePanel(name: string): void;
        /**
         * <p>获取业务配置</p>
         * @param [level = THINGX.App.currentLevel] - <p>孪生体对象/孪生体分类</p>
         * @param [name=] - <p>业务名称，非空的话返回指定配置，否则返回所有配置</p>
         */
        function getConfig(level?: THING.BaseObject | THINGX.CONST.DEFAULT_DIGITAL_TWIN_CLASS, name=?: string): any | null;
        /**
         * <p>获取当前业务面板配置</p>
         */
        function getPanelConfig(): any | null;
        /**
         * <p>获取当前激活的业务名称</p>
         * @param [isFullName = false] - <p>是否获取业务全称</p>
         * @returns <ul>
         * <li>当前激活的业务名称/全称</li>
         * </ul>
         */
        function getCurrentName(isFullName?: boolean): string;
        /**
         * <p>显示业务模块</p>
         */
        function show(): void;
        /**
         * <p>隐藏业务模块</p>
         */
        function hide(): void;
        /**
         * <p>获取指定层级下指定名称业务</p>
         * @param [level = THINGX.App.currentLevel] - <p>指定层级</p>
         * @param [name=] - <p>业务名称，为空则获取指定层级下所有业务</p>
         * @returns <ul>
         * <li>业务实例</li>
         * </ul>
         */
        function get(level?: THING.BaseObject | THINGX.CONST.DEFAULT_DIGITAL_TWIN_CLASS, name=?: string): object[];
        /**
         * <p>激活业务</p>
         * @param name - <p>业务名称</p>
         */
        function activate(name: string): void;
        /**
         * <p>取消激活当前业务</p>
         */
        function deactivate(): void;
        /**
         * <p>获取当前激活的业务信息</p>
         */
        function getActivated(): any;
        /**
         * <p>重新读取可视化配置 并根据当前层级重新创建业务</p>
         * @returns <ul>
         * <li>是否刷新成功</li>
         * </ul>
         */
        function refresh(): Promise<boolean>;
        /**
         * <p>显示业务面板- 建议通过activate激活业务</p>
         * @param name - <p>业务名称</p>
         */
        function showPanel(name: string): void;
        /**
         * <p>隐藏业务面板 - 建议通过deactivate取消激活业务</p>
         * @param name - <p>业务名称</p>
         */
        function hidePanel(name: string): void;
        /**
         * <p>获取业务配置</p>
         * @param [level = THINGX.App.currentLevel] - <p>孪生体对象/孪生体分类</p>
         * @param [name=] - <p>业务名称，非空的话返回指定配置，否则返回所有配置</p>
         */
        function getConfig(level?: THING.BaseObject | THINGX.CONST.DEFAULT_DIGITAL_TWIN_CLASS, name=?: string): any | null;
        /**
         * <p>获取当前业务面板配置</p>
         */
        function getPanelConfig(): any | null;
        /**
         * <p>获取当前激活的业务名称</p>
         * @param [isFullName = false] - <p>是否获取业务全称</p>
         * @returns <ul>
         * <li>当前激活的业务名称/全称</li>
         * </ul>
         */
        function getCurrentName(isFullName?: boolean): string;
    }
    /**
     * <p>摄像机模块</p>
     */
    namespace Camera {
        /**
         * @property position - <p>摄相机位置</p>
         * @property target - <p>摄像机看点</p>
         */
        type Pose = {
            position: number[];
            target: number[];
        };
        /**
         * <p>飞到最佳视角查看孪生体</p>
         * @example
         * // 单个孪生体飞行
         * const currentLevel = THINGX.App.currentLevel;
         * cosnt pose = THINGX.Camera.getPoseWithDigitalTwin(currentLevel, {
         *     x: 30, y: 60, z: 1, tx: 0, ty: 0, tr: 0
         * });
         * THINGX.Camera.flyTo(currentLevel, {
         *     complete: (ev) => {
         *         console.log('飞行完毕')
         *     },
         *     pose: pose,
         *     time: 2000,
         * });
         *
         * // 孪生体集合飞行
         * let dir = THING.Math.scaleVector(THING.App.current.camera.direction, -1); // 默认方向向量
         * dir[0] += 1;
         * const pose = THINGX.Camera.getPoseWithDigitalTwinSet(THINGX.CONST.DEFAULT_DIGITAL_TWIN_CLASS.BUILDING, {
         *     useDir: dir,
         *     radiusScale: 1.5,
         * });
         * THINGX.Camera.flyTo(THINGX.CONST.DEFAULT_DIGITAL_TWIN_CLASS.BUILDING, {
         *     complete: (ev) => {
         *         console.log('飞行完毕')
         *     },
         *     pose: pose,
         *     time: 2000,
         * });
         * @param digitalTwin - <p>孪生体/孪生体集合/ThingJS查询表达式</p>
         * @param [config = {}] - <p>飞行指定配置</p>
         * @param [config.keepLevel = false] - <p>是否保持当前层级</p>
         * @param [config.complete] - <p>摄像机飞行完成回调函数</p>
         * @param [config.time] - <p>摄像机飞行时间，不传的话会根据摄像机姿势和孪生体对象计算一个最佳的飞行时间</p>
         * @param [config.pose] - <p>摄像机姿势，不传的话会计算最佳的摄像机姿势</p>
         */
        function flyTo(digitalTwin: THING.BaseObject | THING.BaseObject[] | string, config?: {
            keepLevel?: boolean;
            complete?: (...params: any[]) => any;
            time?: number;
            pose?: THINGX.Camera.Pose;
        }): void;
        /**
         * <p>通过孪生体获取摄像机姿势</p>
         * @example
         * const currentLevel = THINGX.App.currentLevel;
         * THINGX.Camera.getPoseWithDigitalTwin(currentLevel, {
         *     x: 30, y: 60, z: 1, tx: 0, ty: 0, tr: 0
         * });
         * @param digitalTwin - <p>孪生体</p>
         * @param [config = {}] - <p>飞到对象的参数，当digitalTwin为单个孪生体且opts.keepDir不为true时生效</p>
         * @param [config.x = 30] - <p>position yaw 摄像机位置沿x轴旋转角度</p>
         * @param [config.y = 45] - <p>position pitch 摄像机位置沿y轴旋转角度</p>
         * @param [config.z = 2] - <p>position radius factor 摄像机位置距离孪生体包围盒半径倍数，1是刚好看到飞到物体的整个包围盒</p>
         * @param [config.tx = 0] - <p>target yaw 摄像机看点沿x轴旋转角度</p>
         * @param [config.ty = 0] - <p>target pitch 摄像机看点沿y轴旋转角度</p>
         * @param [config.tr = 0] - <p>target radius factor 摄像机看点距离孪生体包围中心距离</p>
         * @param opts - <p>计算设置</p>
         * @param [opts.isRecursive = false] - <p>是否遍历子对象</p>
         * @param [opts.isForceReCalc = true] - <p>是否强制重新计算</p>
         */
        function getPoseWithDigitalTwin(digitalTwin: THING.BaseObject, config?: {
            x?: number;
            y?: number;
            z?: number;
            tx?: number;
            ty?: number;
            tr?: number;
        }, opts: {
            isRecursive?: boolean;
            isForceReCalc?: boolean;
        }): THINGX.Camera.Pose | null;
        /**
         * <p>通过孪生体集合获取摄像机姿势</p>
         * @example
         * let dir = THING.Math.scaleVector(THING.App.current.camera.direction, -1); // 默认方向向量
         * dir[0] += 1;
         * let pose = THINGX.Camera.getPoseWithDigitalTwinSet(THINGX.CONST.DEFAULT_DIGITAL_TWIN_CLASS.BUILDING, {
         *     useDir: dir,
         *     radiusScale: 1.5,
         * });
         * @param digitalTwin - <p>孪生体集合/ThingJS查询表达式</p>
         * @param [opts.isRecursive = false] - <p>是否遍历子对象</p>
         * @param [opts.radiusScale = 1] - <p>距离包围盒半径倍数，digitalTwin为孪生体集合时生效</p>
         * @param [opts.useDir = THING.App.current.camera.direction*-1] - <p>摄像机朝向，digitalTwin为孪生体集合时生效</p>
         */
        function getPoseWithDigitalTwinSet(digitalTwin: THING.BaseObject[] | string, opts: {
            isRecursive?: boolean;
            radiusScale?: number;
            useDir?: number[];
        }): THINGX.Camera.Pose | null;
        /**
         * <p>获取摄像机姿势 建议使用getPoseWithDigitalTwin和getPoseWithDigitalTwinSet获取摄像机姿势</p>
         * @param digitalTwin - <p>孪生体/孪生体集合/ThingJS查询表达式</p>
         * @param [flyToConfig = {}] - <p>飞到对象的参数，当digitalTwin为单个孪生体且opts.keepDir不为true时生效</p>
         * @param [flyToConfig.x = 30] - <p>position yaw 摄像机位置沿x轴旋转角度</p>
         * @param [flyToConfig.y = 45] - <p>position pitch 摄像机位置沿y轴旋转角度</p>
         * @param [flyToConfig.z = 2] - <p>position radius factor 摄像机位置距离孪生体包围盒半径倍数，1是刚好看到飞到物体的整个包围盒</p>
         * @param [flyToConfig.tx = 0] - <p>target yaw 摄像机看点沿x轴旋转角度</p>
         * @param [flyToConfig.ty = 0] - <p>target pitch 摄像机看点沿y轴旋转角度</p>
         * @param [flyToConfig.tr = 0] - <p>target radius factor 摄像机看点距离孪生体包围盒半径倍数</p>
         * @param [opts = {}] - <p>飞到最佳视角计算配置</p>
         * @param [opts.isForceReCalc = false] - <p>是否强制重新计算，当digitalTwin为单个孪生体生效</p>
         * @param [opts.isRecursive = false] - <p>是否遍历子对象</p>
         * @param [opts.radiusScale = 1] - <p>距离包围盒半径倍数，digitalTwin为孪生体集合时生效</p>
         * @param [opts.keepDir = false] - <p>保持当前朝向</p>
         * @param [opts.useDir = THING.App.current.camera.direction*-1] - <p>朝向vector3，digitalTwin为孪生体集合时生效</p>
         */
        function getPose(digitalTwin: THING.BaseObject | THING.BaseObject[] | string, flyToConfig?: {
            x?: number;
            y?: number;
            z?: number;
            tx?: number;
            ty?: number;
            tr?: number;
        }, opts?: {
            isForceReCalc?: boolean;
            isRecursive?: boolean;
            radiusScale?: number;
            keepDir?: boolean;
            useDir?: number[];
        }): THINGX.Camera.Pose | null;
        /**
         * <p>获取视点配置</p>
         */
        function getConfig(): any;
        /**
         * @property position - <p>摄相机位置</p>
         * @property target - <p>摄像机看点</p>
         */
        type Pose = {
            position: number[];
            target: number[];
        };
        /**
         * <p>飞到最佳视角查看孪生体</p>
         * @example
         * // 单个孪生体飞行
         * const currentLevel = THINGX.App.currentLevel;
         * cosnt pose = THINGX.Camera.getPoseWithDigitalTwin(currentLevel, {
         *     x: 30, y: 60, z: 1, tx: 0, ty: 0, tr: 0
         * });
         * THINGX.Camera.flyTo(currentLevel, {
         *     complete: (ev) => {
         *         console.log('飞行完毕')
         *     },
         *     pose: pose,
         *     time: 2000,
         * });
         *
         * // 孪生体集合飞行
         * let dir = THING.Math.scaleVector(THING.App.current.camera.direction, -1); // 默认方向向量
         * dir[0] += 1;
         * const pose = THINGX.Camera.getPoseWithDigitalTwinSet(THINGX.CONST.DEFAULT_DIGITAL_TWIN_CLASS.BUILDING, {
         *     useDir: dir,
         *     radiusScale: 1.5,
         * });
         * THINGX.Camera.flyTo(THINGX.CONST.DEFAULT_DIGITAL_TWIN_CLASS.BUILDING, {
         *     complete: (ev) => {
         *         console.log('飞行完毕')
         *     },
         *     pose: pose,
         *     time: 2000,
         * });
         * @param digitalTwin - <p>孪生体/孪生体集合/ThingJS查询表达式</p>
         * @param [config = {}] - <p>飞行指定配置</p>
         * @param [config.keepLevel = false] - <p>是否保持当前层级</p>
         * @param [config.complete] - <p>摄像机飞行完成回调函数</p>
         * @param [config.time] - <p>摄像机飞行时间，不传的话会根据摄像机姿势和孪生体对象计算一个最佳的飞行时间</p>
         * @param [config.pose] - <p>摄像机姿势，不传的话会计算最佳的摄像机姿势</p>
         */
        function flyTo(digitalTwin: THING.BaseObject | THING.BaseObject[] | string, config?: {
            keepLevel?: boolean;
            complete?: (...params: any[]) => any;
            time?: number;
            pose?: THINGX.Camera.Pose;
        }): void;
        /**
         * <p>通过孪生体获取摄像机姿势</p>
         * @example
         * const currentLevel = THINGX.App.currentLevel;
         * THINGX.Camera.getPoseWithDigitalTwin(currentLevel, {
         *     x: 30, y: 60, z: 1, tx: 0, ty: 0, tr: 0
         * });
         * @param digitalTwin - <p>孪生体</p>
         * @param [config = {}] - <p>飞到对象的参数，当digitalTwin为单个孪生体且opts.keepDir不为true时生效</p>
         * @param [config.x = 30] - <p>position yaw 摄像机位置沿x轴旋转角度</p>
         * @param [config.y = 45] - <p>position pitch 摄像机位置沿y轴旋转角度</p>
         * @param [config.z = 2] - <p>position radius factor 摄像机位置距离孪生体包围盒半径倍数，1是刚好看到飞到物体的整个包围盒</p>
         * @param [config.tx = 0] - <p>target yaw 摄像机看点沿x轴旋转角度</p>
         * @param [config.ty = 0] - <p>target pitch 摄像机看点沿y轴旋转角度</p>
         * @param [config.tr = 0] - <p>target radius factor 摄像机看点距离孪生体包围中心距离</p>
         * @param opts - <p>计算设置</p>
         * @param [opts.isRecursive = false] - <p>是否遍历子对象</p>
         * @param [opts.isForceReCalc = true] - <p>是否强制重新计算</p>
         */
        function getPoseWithDigitalTwin(digitalTwin: THING.BaseObject, config?: {
            x?: number;
            y?: number;
            z?: number;
            tx?: number;
            ty?: number;
            tr?: number;
        }, opts: {
            isRecursive?: boolean;
            isForceReCalc?: boolean;
        }): THINGX.Camera.Pose | null;
        /**
         * <p>通过孪生体集合获取摄像机姿势</p>
         * @example
         * let dir = THING.Math.scaleVector(THING.App.current.camera.direction, -1); // 默认方向向量
         * dir[0] += 1;
         * let pose = THINGX.Camera.getPoseWithDigitalTwinSet(THINGX.CONST.DEFAULT_DIGITAL_TWIN_CLASS.BUILDING, {
         *     useDir: dir,
         *     radiusScale: 1.5,
         * });
         * @param digitalTwin - <p>孪生体集合/ThingJS查询表达式</p>
         * @param [opts.isRecursive = false] - <p>是否遍历子对象</p>
         * @param [opts.radiusScale = 1] - <p>距离包围盒半径倍数，digitalTwin为孪生体集合时生效</p>
         * @param [opts.useDir = THING.App.current.camera.direction*-1] - <p>摄像机朝向，digitalTwin为孪生体集合时生效</p>
         */
        function getPoseWithDigitalTwinSet(digitalTwin: THING.BaseObject[] | string, opts: {
            isRecursive?: boolean;
            radiusScale?: number;
            useDir?: number[];
        }): THINGX.Camera.Pose | null;
        /**
         * <p>获取摄像机姿势 建议使用getPoseWithDigitalTwin和getPoseWithDigitalTwinSet获取摄像机姿势</p>
         * @param digitalTwin - <p>孪生体/孪生体集合/ThingJS查询表达式</p>
         * @param [flyToConfig = {}] - <p>飞到对象的参数，当digitalTwin为单个孪生体且opts.keepDir不为true时生效</p>
         * @param [flyToConfig.x = 30] - <p>position yaw 摄像机位置沿x轴旋转角度</p>
         * @param [flyToConfig.y = 45] - <p>position pitch 摄像机位置沿y轴旋转角度</p>
         * @param [flyToConfig.z = 2] - <p>position radius factor 摄像机位置距离孪生体包围盒半径倍数，1是刚好看到飞到物体的整个包围盒</p>
         * @param [flyToConfig.tx = 0] - <p>target yaw 摄像机看点沿x轴旋转角度</p>
         * @param [flyToConfig.ty = 0] - <p>target pitch 摄像机看点沿y轴旋转角度</p>
         * @param [flyToConfig.tr = 0] - <p>target radius factor 摄像机看点距离孪生体包围盒半径倍数</p>
         * @param [opts = {}] - <p>飞到最佳视角计算配置</p>
         * @param [opts.isForceReCalc = false] - <p>是否强制重新计算，当digitalTwin为单个孪生体生效</p>
         * @param [opts.isRecursive = false] - <p>是否遍历子对象</p>
         * @param [opts.radiusScale = 1] - <p>距离包围盒半径倍数，digitalTwin为孪生体集合时生效</p>
         * @param [opts.keepDir = false] - <p>保持当前朝向</p>
         * @param [opts.useDir = THING.App.current.camera.direction*-1] - <p>朝向vector3，digitalTwin为孪生体集合时生效</p>
         */
        function getPose(digitalTwin: THING.BaseObject | THING.BaseObject[] | string, flyToConfig?: {
            x?: number;
            y?: number;
            z?: number;
            tx?: number;
            ty?: number;
            tr?: number;
        }, opts?: {
            isForceReCalc?: boolean;
            isRecursive?: boolean;
            radiusScale?: number;
            keepDir?: boolean;
            useDir?: number[];
        }): THINGX.Camera.Pose | null;
        /**
         * <p>获取视点配置</p>
         */
        function getConfig(): any;
    }
    namespace CONST {
        /**
         * <p>默认孪生体分类</p>
         */
        enum DEFAULT_DIGITAL_TWIN_CLASS {
            /**
             * <p>园区</p>
             */
            CAMPUS = ".Campus",
            /**
             * <p>建筑</p>
             */
            BUILDING = ".Building",
            /**
             * <p>楼层</p>
             */
            FLOOR = ".Floor",
            /**
             * <p>房间</p>
             */
            ROOM = ".Room",
            /**
             * <p>地图</p>
             */
            GEO_CAMPUS = ".GeoCampus"
        }
        /**
         * <p>插件类型</p>
         */
        enum PLUGIN_TYPE {
            /**
             * <p>操作原子插件</p>
             */
            ACTION = "action",
            /**
             * <p>图表</p>
             */
            CHART = "chart",
            /**
             * <p>核心插件</p>
             */
            CORE = "core",
            /**
             * <p>扩展插件</p>
             */
            EXPAND = "expand",
            /**
             * <p>效果模版</p>
             */
            THEME = "theme"
        }
        /**
         * <p>加载javascript脚本类型</p>
         */
        enum JS_LOAD_TYPE {
            /**
             * <p>通过script标签加载</p>
             */
            TAG = "tag",
            /**
             * <p>以动态执行加载的脚本内容方式加载</p>
             */
            EXEC = "exec"
        }
        /**
         * <p>javascript资源类型</p>
         */
        enum JS_SRC_TYPE {
            /**
             * <p>url路径方式</p>
             */
            URL = "url",
            /**
             * <p>源脚本方式</p>
             */
            CONTENT = "content"
        }
        /**
         * <p>默认孪生体分类</p>
         */
        enum DEFAULT_DIGITAL_TWIN_CLASS {
            /**
             * <p>园区</p>
             */
            CAMPUS = ".Campus",
            /**
             * <p>建筑</p>
             */
            BUILDING = ".Building",
            /**
             * <p>楼层</p>
             */
            FLOOR = ".Floor",
            /**
             * <p>房间</p>
             */
            ROOM = ".Room",
            /**
             * <p>地图</p>
             */
            GEO_CAMPUS = ".GeoCampus"
        }
        /**
         * <p>插件类型</p>
         */
        enum PLUGIN_TYPE {
            /**
             * <p>操作原子插件</p>
             */
            ACTION = "action",
            /**
             * <p>图表</p>
             */
            CHART = "chart",
            /**
             * <p>核心插件</p>
             */
            CORE = "core",
            /**
             * <p>扩展插件</p>
             */
            EXPAND = "expand",
            /**
             * <p>效果模版</p>
             */
            THEME = "theme"
        }
        /**
         * <p>加载javascript脚本类型</p>
         */
        enum JS_LOAD_TYPE {
            /**
             * <p>通过script标签加载</p>
             */
            TAG = "tag",
            /**
             * <p>以动态执行加载的脚本内容方式加载</p>
             */
            EXEC = "exec"
        }
        /**
         * <p>javascript资源类型</p>
         */
        enum JS_SRC_TYPE {
            /**
             * <p>url路径方式</p>
             */
            URL = "url",
            /**
             * <p>源脚本方式</p>
             */
            CONTENT = "content"
        }
    }
    /**
     * <p>数据辅助模块</p>
     */
    namespace DataHelper {
        /**
         * <p>数组模块</p>
         */
        namespace Array {
            /**
             * <p>在数组末尾追加元素</p>
             * @param array - <p>目标数组</p>
             * @param val - <p>待增加的元素</p>
             * @param [isForce = false] - <p>是否强制增加，强制则不判断数组中是否已经存在</p>
             * @returns <ul>
             * <li>增加元素或已存在元素的索引</li>
             * </ul>
             */
            function push(array: any[], val: any, isForce?: boolean): number;
            /**
             * <p>根据索引数组删除数组元素</p>
             * @param array - <p>数组</p>
             * @param indexArray - <p>序列数组</p>
             */
            function removeWithIndexArray(array: any[], indexArray: number[]): any[];
            /**
             * <p>在数组中去除重复项，稳定的（保留第一个）</p>
             * @param array - <p>原始数组</p>
             * @returns <ul>
             * <li>删除了重复项的数组</li>
             * </ul>
             */
            function unique(array: any[]): any[];
            /**
             * <p>根据keys值，构造新数组只包含keys中包含的key</p>
             * @param array - <p>源数组</p>
             * @param keys - <p>要取的键值数组</p>
             * @param [isAllowNull = false] - <p>是否允许值为空，默认不允许</p>
             * @returns <p>[{key1:XX,key2:XX},{key1:XX,key2:XX}]</p>
             */
            function getWithKeys(array: any[], keys: string[], isAllowNull?: boolean): any[];
            /**
             * <p>删除数组中array1中存在与数值array2中相同的元素</p>
             * @param array1 - <p>原始数组</p>
             * @param array2 - <p>校样数组</p>
             * @returns <p>返回新数组</p>
             */
            function subtract(array1: any[], array2: any[]): any[];
            /**
             * <p>在数组末尾追加元素</p>
             * @param array - <p>目标数组</p>
             * @param val - <p>待增加的元素</p>
             * @param [isForce = false] - <p>是否强制增加，强制则不判断数组中是否已经存在</p>
             * @returns <ul>
             * <li>增加元素或已存在元素的索引</li>
             * </ul>
             */
            function push(array: any[], val: any, isForce?: boolean): number;
            /**
             * <p>根据索引数组删除数组元素</p>
             * @param array - <p>数组</p>
             * @param indexArray - <p>序列数组</p>
             */
            function removeWithIndexArray(array: any[], indexArray: number[]): any[];
            /**
             * <p>在数组中去除重复项，稳定的（保留第一个）</p>
             * @param array - <p>原始数组</p>
             * @returns <ul>
             * <li>删除了重复项的数组</li>
             * </ul>
             */
            function unique(array: any[]): any[];
            /**
             * <p>根据keys值，构造新数组只包含keys中包含的key</p>
             * @param array - <p>源数组</p>
             * @param keys - <p>要取的键值数组</p>
             * @param [isAllowNull = false] - <p>是否允许值为空，默认不允许</p>
             * @returns <p>[{key1:XX,key2:XX},{key1:XX,key2:XX}]</p>
             */
            function getWithKeys(array: any[], keys: string[], isAllowNull?: boolean): any[];
            /**
             * <p>删除数组中array1中存在与数值array2中相同的元素</p>
             * @param array1 - <p>原始数组</p>
             * @param array2 - <p>校样数组</p>
             * @returns <p>返回新数组</p>
             */
            function subtract(array1: any[], array2: any[]): any[];
        }
        /**
         * <p>对象模块</p>
         */
        namespace Object {
            /**
             * <p>合并两个对象</p>
             * @param srcObj - <p>源对象</p>
             * @param destObj - <p>目标对象</p>
             * @param [isDeep = true] - <p>是否深拷贝</p>
             * @param [isNew = false] - <p>是否返回新对象，否则影响源对象</p>
             * @returns <ul>
             * <li>合并后的对象</li>
             * </ul>
             */
            function merge(srcObj: any, destObj: any, isDeep?: boolean, isNew?: boolean): any;
            /**
             * <p>拷贝对象</p>
             * @example
             * const myclone = THINGX.Utils.clone(obj);
             * @param obj - <p>需要被拷贝的对象</p>
             * @param [isDeep = true] - <p>是否深拷贝</p>
             * @param [endCheck = () => {return false;}] - <p>停止拷贝的条件函数</p>
             */
            function clone(obj: any, isDeep?: boolean, endCheck?: (...params: any[]) => any): any;
            /**
             * <p>获取对象第一个key</p>
             * @param obj - <p>对象</p>
             */
            function getFirstKey(obj: any): any;
            /**
             * <p>获取对象第一个值</p>
             * @param obj - <p>对象</p>
             */
            function getFirstValue(obj: any): any;
            /**
             * <p>对象是否为空</p>
             * @param obj - <p>对象</p>
             */
            function isEmpty(obj: any): boolean;
            /**
             * <p>从obj1中删除obj2中已有的元素</p>
             * @param obj1 - <p>对象1</p>
             * @param obj2 - <p>对象2</p>
             * @param [isCheckVal = false] - <p>是否对比元素值一样</p>
             * @returns <ul>
             * <li>新对象，obj1的子集</li>
             * </ul>
             */
            function subtract(obj1: any, obj2: any, isCheckVal?: boolean): any;
            /**
             * <p>合并两个对象</p>
             * @param srcObj - <p>源对象</p>
             * @param destObj - <p>目标对象</p>
             * @param [isDeep = true] - <p>是否深拷贝</p>
             * @param [isNew = false] - <p>是否返回新对象，否则影响源对象</p>
             * @returns <ul>
             * <li>合并后的对象</li>
             * </ul>
             */
            function merge(srcObj: any, destObj: any, isDeep?: boolean, isNew?: boolean): any;
            /**
             * <p>拷贝对象</p>
             * @example
             * const myclone = THINGX.Utils.clone(obj);
             * @param obj - <p>需要被拷贝的对象</p>
             * @param [isDeep = true] - <p>是否深拷贝</p>
             * @param [endCheck = () => {return false;}] - <p>停止拷贝的条件函数</p>
             */
            function clone(obj: any, isDeep?: boolean, endCheck?: (...params: any[]) => any): any;
            /**
             * <p>获取对象第一个key</p>
             * @param obj - <p>对象</p>
             */
            function getFirstKey(obj: any): any;
            /**
             * <p>获取对象第一个值</p>
             * @param obj - <p>对象</p>
             */
            function getFirstValue(obj: any): any;
            /**
             * <p>对象是否为空</p>
             * @param obj - <p>对象</p>
             */
            function isEmpty(obj: any): boolean;
            /**
             * <p>从obj1中删除obj2中已有的元素</p>
             * @param obj1 - <p>对象1</p>
             * @param obj2 - <p>对象2</p>
             * @param [isCheckVal = false] - <p>是否对比元素值一样</p>
             * @returns <ul>
             * <li>新对象，obj1的子集</li>
             * </ul>
             */
            function subtract(obj1: any, obj2: any, isCheckVal?: boolean): any;
        }
        /**
         * <p>字符串模块</p>
         */
        namespace String { }
        /**
         * <p>字符串模块</p>
         */
        namespace Time {
            /**
             * <p>延时某段时间，只执行最后一次
             * 类似于requestAnimationFrame</p>
             * @param fn - <p>执行函数</p>
             */
            function delay(fn: any, _a: any): void;
            /**
             * <p>延时某段时间，只执行最后一次
             * 类似于requestAnimationFrame</p>
             * @param fn - <p>执行函数</p>
             */
            function delay(fn: any, _a: any): void;
        }
        /**
         * <p>vector3向量模块</p>
         */
        namespace Vector {
            /**
             * <p>两个向量加</p>
             * @param vec1 - <p>向量1</p>
             * @param vec2 - <p>向量2</p>
             */
            function add(vec1: number[], vec2: number[]): number[];
            /**
             * <p>向量与数值相乘</p>
             * @param vec - <p>向量</p>
             * @param num - <p>数值</p>
             */
            function multiplyNumber(vec: number[], num: number): number[];
            /**
             * <p>两个向量相减, vec1 - vec2</p>
             * @param vec1 - <p>向量1</p>
             * @param vec2 - <p>向量2</p>
             */
            function subtract(vec1: number[], vec2: number[]): number[];
            /**
             * <p>向量标准化</p>
             * @param vec - <p>向量</p>
             */
            function normalize(vec: number[]): number[];
            /**
             * <p>获取向量长度</p>
             * @param vec - <p>向量</p>
             */
            function length(vec: number[]): number;
            /**
             * <p>获取两个向量之间的距离</p>
             * @param vec1 - <p>向量1</p>
             * @param vec2 - <p>向量2</p>
             */
            function distance(vec1: number[], vec2: number[]): number;
            /**
             * <p>两个向量加</p>
             * @param vec1 - <p>向量1</p>
             * @param vec2 - <p>向量2</p>
             */
            function add(vec1: number[], vec2: number[]): number[];
            /**
             * <p>向量与数值相乘</p>
             * @param vec - <p>向量</p>
             * @param num - <p>数值</p>
             */
            function multiplyNumber(vec: number[], num: number): number[];
            /**
             * <p>两个向量相减, vec1 - vec2</p>
             * @param vec1 - <p>向量1</p>
             * @param vec2 - <p>向量2</p>
             */
            function subtract(vec1: number[], vec2: number[]): number[];
            /**
             * <p>向量标准化</p>
             * @param vec - <p>向量</p>
             */
            function normalize(vec: number[]): number[];
            /**
             * <p>获取向量长度</p>
             * @param vec - <p>向量</p>
             */
            function length(vec: number[]): number;
            /**
             * <p>获取两个向量之间的距离</p>
             * @param vec1 - <p>向量1</p>
             * @param vec2 - <p>向量2</p>
             */
            function distance(vec1: number[], vec2: number[]): number;
        }
        /**
         * <p>数组模块</p>
         */
        namespace Array {
            /**
             * <p>在数组末尾追加元素</p>
             * @param array - <p>目标数组</p>
             * @param val - <p>待增加的元素</p>
             * @param [isForce = false] - <p>是否强制增加，强制则不判断数组中是否已经存在</p>
             * @returns <ul>
             * <li>增加元素或已存在元素的索引</li>
             * </ul>
             */
            function push(array: any[], val: any, isForce?: boolean): number;
            /**
             * <p>根据索引数组删除数组元素</p>
             * @param array - <p>数组</p>
             * @param indexArray - <p>序列数组</p>
             */
            function removeWithIndexArray(array: any[], indexArray: number[]): any[];
            /**
             * <p>在数组中去除重复项，稳定的（保留第一个）</p>
             * @param array - <p>原始数组</p>
             * @returns <ul>
             * <li>删除了重复项的数组</li>
             * </ul>
             */
            function unique(array: any[]): any[];
            /**
             * <p>根据keys值，构造新数组只包含keys中包含的key</p>
             * @param array - <p>源数组</p>
             * @param keys - <p>要取的键值数组</p>
             * @param [isAllowNull = false] - <p>是否允许值为空，默认不允许</p>
             * @returns <p>[{key1:XX,key2:XX},{key1:XX,key2:XX}]</p>
             */
            function getWithKeys(array: any[], keys: string[], isAllowNull?: boolean): any[];
            /**
             * <p>删除数组中array1中存在与数值array2中相同的元素</p>
             * @param array1 - <p>原始数组</p>
             * @param array2 - <p>校样数组</p>
             * @returns <p>返回新数组</p>
             */
            function subtract(array1: any[], array2: any[]): any[];
            /**
             * <p>在数组末尾追加元素</p>
             * @param array - <p>目标数组</p>
             * @param val - <p>待增加的元素</p>
             * @param [isForce = false] - <p>是否强制增加，强制则不判断数组中是否已经存在</p>
             * @returns <ul>
             * <li>增加元素或已存在元素的索引</li>
             * </ul>
             */
            function push(array: any[], val: any, isForce?: boolean): number;
            /**
             * <p>根据索引数组删除数组元素</p>
             * @param array - <p>数组</p>
             * @param indexArray - <p>序列数组</p>
             */
            function removeWithIndexArray(array: any[], indexArray: number[]): any[];
            /**
             * <p>在数组中去除重复项，稳定的（保留第一个）</p>
             * @param array - <p>原始数组</p>
             * @returns <ul>
             * <li>删除了重复项的数组</li>
             * </ul>
             */
            function unique(array: any[]): any[];
            /**
             * <p>根据keys值，构造新数组只包含keys中包含的key</p>
             * @param array - <p>源数组</p>
             * @param keys - <p>要取的键值数组</p>
             * @param [isAllowNull = false] - <p>是否允许值为空，默认不允许</p>
             * @returns <p>[{key1:XX,key2:XX},{key1:XX,key2:XX}]</p>
             */
            function getWithKeys(array: any[], keys: string[], isAllowNull?: boolean): any[];
            /**
             * <p>删除数组中array1中存在与数值array2中相同的元素</p>
             * @param array1 - <p>原始数组</p>
             * @param array2 - <p>校样数组</p>
             * @returns <p>返回新数组</p>
             */
            function subtract(array1: any[], array2: any[]): any[];
        }
        /**
         * <p>对象模块</p>
         */
        namespace Object {
            /**
             * <p>合并两个对象</p>
             * @param srcObj - <p>源对象</p>
             * @param destObj - <p>目标对象</p>
             * @param [isDeep = true] - <p>是否深拷贝</p>
             * @param [isNew = false] - <p>是否返回新对象，否则影响源对象</p>
             * @returns <ul>
             * <li>合并后的对象</li>
             * </ul>
             */
            function merge(srcObj: any, destObj: any, isDeep?: boolean, isNew?: boolean): any;
            /**
             * <p>拷贝对象</p>
             * @example
             * const myclone = THINGX.Utils.clone(obj);
             * @param obj - <p>需要被拷贝的对象</p>
             * @param [isDeep = true] - <p>是否深拷贝</p>
             * @param [endCheck = () => {return false;}] - <p>停止拷贝的条件函数</p>
             */
            function clone(obj: any, isDeep?: boolean, endCheck?: (...params: any[]) => any): any;
            /**
             * <p>获取对象第一个key</p>
             * @param obj - <p>对象</p>
             */
            function getFirstKey(obj: any): any;
            /**
             * <p>获取对象第一个值</p>
             * @param obj - <p>对象</p>
             */
            function getFirstValue(obj: any): any;
            /**
             * <p>对象是否为空</p>
             * @param obj - <p>对象</p>
             */
            function isEmpty(obj: any): boolean;
            /**
             * <p>从obj1中删除obj2中已有的元素</p>
             * @param obj1 - <p>对象1</p>
             * @param obj2 - <p>对象2</p>
             * @param [isCheckVal = false] - <p>是否对比元素值一样</p>
             * @returns <ul>
             * <li>新对象，obj1的子集</li>
             * </ul>
             */
            function subtract(obj1: any, obj2: any, isCheckVal?: boolean): any;
            /**
             * <p>合并两个对象</p>
             * @param srcObj - <p>源对象</p>
             * @param destObj - <p>目标对象</p>
             * @param [isDeep = true] - <p>是否深拷贝</p>
             * @param [isNew = false] - <p>是否返回新对象，否则影响源对象</p>
             * @returns <ul>
             * <li>合并后的对象</li>
             * </ul>
             */
            function merge(srcObj: any, destObj: any, isDeep?: boolean, isNew?: boolean): any;
            /**
             * <p>拷贝对象</p>
             * @example
             * const myclone = THINGX.Utils.clone(obj);
             * @param obj - <p>需要被拷贝的对象</p>
             * @param [isDeep = true] - <p>是否深拷贝</p>
             * @param [endCheck = () => {return false;}] - <p>停止拷贝的条件函数</p>
             */
            function clone(obj: any, isDeep?: boolean, endCheck?: (...params: any[]) => any): any;
            /**
             * <p>获取对象第一个key</p>
             * @param obj - <p>对象</p>
             */
            function getFirstKey(obj: any): any;
            /**
             * <p>获取对象第一个值</p>
             * @param obj - <p>对象</p>
             */
            function getFirstValue(obj: any): any;
            /**
             * <p>对象是否为空</p>
             * @param obj - <p>对象</p>
             */
            function isEmpty(obj: any): boolean;
            /**
             * <p>从obj1中删除obj2中已有的元素</p>
             * @param obj1 - <p>对象1</p>
             * @param obj2 - <p>对象2</p>
             * @param [isCheckVal = false] - <p>是否对比元素值一样</p>
             * @returns <ul>
             * <li>新对象，obj1的子集</li>
             * </ul>
             */
            function subtract(obj1: any, obj2: any, isCheckVal?: boolean): any;
        }
        /**
         * <p>字符串模块</p>
         */
        namespace String { }
        /**
         * <p>字符串模块</p>
         */
        namespace Time {
            /**
             * <p>延时某段时间，只执行最后一次
             * 类似于requestAnimationFrame</p>
             * @param fn - <p>执行函数</p>
             */
            function delay(fn: any, _a: any): void;
            /**
             * <p>延时某段时间，只执行最后一次
             * 类似于requestAnimationFrame</p>
             * @param fn - <p>执行函数</p>
             */
            function delay(fn: any, _a: any): void;
        }
        /**
         * <p>vector3向量模块</p>
         */
        namespace Vector {
            /**
             * <p>两个向量加</p>
             * @param vec1 - <p>向量1</p>
             * @param vec2 - <p>向量2</p>
             */
            function add(vec1: number[], vec2: number[]): number[];
            /**
             * <p>向量与数值相乘</p>
             * @param vec - <p>向量</p>
             * @param num - <p>数值</p>
             */
            function multiplyNumber(vec: number[], num: number): number[];
            /**
             * <p>两个向量相减, vec1 - vec2</p>
             * @param vec1 - <p>向量1</p>
             * @param vec2 - <p>向量2</p>
             */
            function subtract(vec1: number[], vec2: number[]): number[];
            /**
             * <p>向量标准化</p>
             * @param vec - <p>向量</p>
             */
            function normalize(vec: number[]): number[];
            /**
             * <p>获取向量长度</p>
             * @param vec - <p>向量</p>
             */
            function length(vec: number[]): number;
            /**
             * <p>获取两个向量之间的距离</p>
             * @param vec1 - <p>向量1</p>
             * @param vec2 - <p>向量2</p>
             */
            function distance(vec1: number[], vec2: number[]): number;
            /**
             * <p>两个向量加</p>
             * @param vec1 - <p>向量1</p>
             * @param vec2 - <p>向量2</p>
             */
            function add(vec1: number[], vec2: number[]): number[];
            /**
             * <p>向量与数值相乘</p>
             * @param vec - <p>向量</p>
             * @param num - <p>数值</p>
             */
            function multiplyNumber(vec: number[], num: number): number[];
            /**
             * <p>两个向量相减, vec1 - vec2</p>
             * @param vec1 - <p>向量1</p>
             * @param vec2 - <p>向量2</p>
             */
            function subtract(vec1: number[], vec2: number[]): number[];
            /**
             * <p>向量标准化</p>
             * @param vec - <p>向量</p>
             */
            function normalize(vec: number[]): number[];
            /**
             * <p>获取向量长度</p>
             * @param vec - <p>向量</p>
             */
            function length(vec: number[]): number;
            /**
             * <p>获取两个向量之间的距离</p>
             * @param vec1 - <p>向量1</p>
             * @param vec2 - <p>向量2</p>
             */
            function distance(vec1: number[], vec2: number[]): number;
        }
    }
    /**
     * <p>孪生体模块</p>
     */
    namespace DigitalTwin {
        /**
         * <p>显示孪生体</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param [purpose = default] - <p>目的</p>
         * @returns <ul>
         * <li>执行过操作的孪生体集合</li>
         * </ul>
         */
        function show(digitalTwin: THING.BaseObject | string, purpose?: string): THING.BaseObject[];
        /**
         * <p>隐藏孪生体</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param [purpose = default] - <p>目的</p>
         * @returns <ul>
         * <li>执行过操作的孪生体集合</li>
         * </ul>
         */
        function hide(digitalTwin: THING.BaseObject | string, purpose?: string): THING.BaseObject[];
        /**
         * <p>判断孪生体是否带有某个显示目的</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param [purpose = default] - <p>目的</p>
         * @returns <ul>
         * <li>如果多个孪生体 则所有孪生体都包含显示目的才返回true</li>
         * </ul>
         */
        function hasShowPurpose(digitalTwin: THING.BaseObject | string, purpose?: string): boolean;
        /**
         * <p>平滑显示孪生体</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param opts - <p>缓动效果</p>
         * @param opts.lerpType - <p>淡入动画效果 默认Quartic.In</p>
         * @param opts.time - <p>动画时间 默认500ms</p>
         * @param opts.purpose - <p>显示目的</p>
         * @returns <ul>
         * <li>动画完成,孪生体集合</li>
         * </ul>
         */
        function showWithSmoothAnimation(digitalTwin: THING.BaseObject | string, opts: {
            lerpType: string;
            time: number;
            purpose: string;
        }): Promise<THING.BaseObject[]>;
        /**
         * <p>平滑隐藏孪生体</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param opts - <p>缓动效果</p>
         * @param opts.lerpType - <p>淡入动画效果 默认Quartic.Out</p>
         * @param opts.time - <p>动画时间 默认500ms</p>
         * @param opts.purpose - <p>隐藏目的</p>
         * @returns <ul>
         * <li>动画完成,孪生体集合</li>
         * </ul>
         */
        function hideWithSmoothAnimation(digitalTwin: THING.BaseObject | string, opts: {
            lerpType: string;
            time: number;
            purpose: string;
        }): Promise<THING.BaseObject[]>;
        /**
         * <p>添加孪生体颜色到栈中</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param purpose - <p>变色的目的（用于取消该次变色）</p>
         * @param color - <p>十六进制颜色字符串 如'#ff0000'</p>
         * @param [priority = 0] - <p>颜色设置的优先级</p>
         * @param [traverse = false] - <p>是否遍历子元素</p>
         * @param [intensity = 0.7] - <p>颜色强度，越高变色越明显</p>
         * @returns <ul>
         * <li>执行过操作的孪生体集合</li>
         * </ul>
         */
        function addColor(digitalTwin: THING.BaseObject | string, purpose: string, color: string, priority?: number, traverse?: boolean, intensity?: number): THING.BaseObject[];
        /**
         * <p>从孪生体颜色栈中移除指定颜色</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param purpose - <p>变色目的</p>
         * @param traverse - <p>是否遍历子元素</p>
         * @returns <ul>
         * <li>执行过操作的孪生体集合</li>
         * </ul>
         */
        function removeColor(digitalTwin: THING.BaseObject | string, purpose: string, traverse: boolean): THING.BaseObject[];
        /**
         * <p>添加孪生体透明到栈中</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param purpose - <p>透明的目的（用于取消该次透明）</p>
         * @param opacity - <p>透明度</p>
         * @param [priority = 0] - <p>透明设置的优先级</p>
         * @param [traverse = false] - <p>是否遍历子元素</p>
         * @param [ignoreTag = [inheritOpacity]] - <p>忽略的标签</p>
         * @returns <ul>
         * <li>执行过操作的孪生体集合</li>
         * </ul>
         */
        function addOpacity(digitalTwin: THING.BaseObject | string, purpose: string, opacity: number, priority?: number, traverse?: boolean, ignoreTag?: string): THING.BaseObject[];
        /**
         * <p>从孪生体透明栈中移除指定目的的透明</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param purpose - <p>透明目的</p>
         * @param [traverse = false] - <p>是否遍历子元素</p>
         * @param [ignoreTag = [inheritOpacity]] - <p>忽略的标签</p>
         * @returns <ul>
         * <li>执行过操作的孪生体集合</li>
         * </ul>
         */
        function removeOpacity(digitalTwin: THING.BaseObject | string, purpose: string, traverse?: boolean, ignoreTag?: string): THING.BaseObject[];
        /**
         * <p>显示孪生体面板</p>
         * @param [digitalTwin = THINGX.App.currentSelected] - <p>孪生体对象，默认值是当前选择的孪生体中的第一个</p>
         * @param [config = {}] - <p>显示位置配置</p>
         * @param config.popup - <p>面板类型 custom</p>
         * @param config.top - <p>距上偏移</p>
         * @param config.left - <p>距左偏移</p>
         */
        function showPanel(digitalTwin?: THING.BaseObject, config?: {
            popup: string;
            top: number;
            left: number;
        }, isShowed?: boolena): void;
        /**
         * <p>隐藏当前显示的孪生体面板</p>
         */
        function hidePanel(): void;
        /**
         * <p>激活当前孪生体面板上的tab</p>
         * @param name - <p>tab名称</p>
         */
        function activateTabOnPanel(name: string): void;
        /**
         * <p>获取当前在孪生体面板上激活的tab</p>
         * @returns <ul>
         * <li>tab名称，失败返回false</li>
         * </ul>
         */
        function getActivatedTabOnPanel(): string | boolean;
        /**
         * <p>重新读取孪生体面板可视化配置</p>
         */
        function refresh(): void;
        /**
         * <p>获取孪生体指定面板名称配置</p>
         * @param digitalTwin - <p>孪生体对象</p>
         * @param name - <p>面板名称</p>
         */
        function getPanelConfig(digitalTwin: THING.BaseObject, name: string): any;
        /**
         * <p>通过ci数据创建孪生体</p>
         * @param ciData - <p>孪生体ci数据</p>
         * @param [onlyEmptyNode = true] - <p>true:只创建空点,不加载模型; false:加载模型</p>
         */
        function createByCIData(ciData: any, options?: any, onlyEmptyNode?: boolean): Promise<THING.BaseObject>;
        /**
         * @param dtwins - <p>孪生体或孪生体组成的数组</p>
         * @param [Category = []] - <p>分类</p>
         * @param [queryChildren = false] - <p>false:获取Ci 不包含孩子</p>
         */
        function getCategoryCIData(dtwins: any | any[], Category?: any, queryChildren?: boolean): void;
        /**
         * @param dtwin - <p>孪生体或孪生体组成的数组</p>
         */
        function initializeCIData(dtwin: any): void;
        /**
         * <p>显示孪生体</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param [purpose = default] - <p>目的</p>
         * @returns <ul>
         * <li>执行过操作的孪生体集合</li>
         * </ul>
         */
        function show(digitalTwin: THING.BaseObject | string, purpose?: string): THING.BaseObject[];
        /**
         * <p>隐藏孪生体</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param [purpose = default] - <p>目的</p>
         * @returns <ul>
         * <li>执行过操作的孪生体集合</li>
         * </ul>
         */
        function hide(digitalTwin: THING.BaseObject | string, purpose?: string): THING.BaseObject[];
        /**
         * <p>判断孪生体是否带有某个显示目的</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param [purpose = default] - <p>目的</p>
         * @returns <ul>
         * <li>如果多个孪生体 则所有孪生体都包含显示目的才返回true</li>
         * </ul>
         */
        function hasShowPurpose(digitalTwin: THING.BaseObject | string, purpose?: string): boolean;
        /**
         * <p>平滑显示孪生体</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param opts - <p>缓动效果</p>
         * @param opts.lerpType - <p>淡入动画效果 默认Quartic.In</p>
         * @param opts.time - <p>动画时间 默认500ms</p>
         * @param opts.purpose - <p>显示目的</p>
         * @returns <ul>
         * <li>动画完成,孪生体集合</li>
         * </ul>
         */
        function showWithSmoothAnimation(digitalTwin: THING.BaseObject | string, opts: {
            lerpType: string;
            time: number;
            purpose: string;
        }): Promise<THING.BaseObject[]>;
        /**
         * <p>平滑隐藏孪生体</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param opts - <p>缓动效果</p>
         * @param opts.lerpType - <p>淡入动画效果 默认Quartic.Out</p>
         * @param opts.time - <p>动画时间 默认500ms</p>
         * @param opts.purpose - <p>隐藏目的</p>
         * @returns <ul>
         * <li>动画完成,孪生体集合</li>
         * </ul>
         */
        function hideWithSmoothAnimation(digitalTwin: THING.BaseObject | string, opts: {
            lerpType: string;
            time: number;
            purpose: string;
        }): Promise<THING.BaseObject[]>;
        /**
         * <p>添加孪生体颜色到栈中</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param purpose - <p>变色的目的（用于取消该次变色）</p>
         * @param color - <p>十六进制颜色字符串 如'#ff0000'</p>
         * @param [priority = 0] - <p>颜色设置的优先级</p>
         * @param [traverse = false] - <p>是否遍历子元素</p>
         * @param [intensity = 0.7] - <p>颜色强度，越高变色越明显</p>
         * @returns <ul>
         * <li>执行过操作的孪生体集合</li>
         * </ul>
         */
        function addColor(digitalTwin: THING.BaseObject | string, purpose: string, color: string, priority?: number, traverse?: boolean, intensity?: number): THING.BaseObject[];
        /**
         * <p>从孪生体颜色栈中移除指定颜色</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param purpose - <p>变色目的</p>
         * @param traverse - <p>是否遍历子元素</p>
         * @returns <ul>
         * <li>执行过操作的孪生体集合</li>
         * </ul>
         */
        function removeColor(digitalTwin: THING.BaseObject | string, purpose: string, traverse: boolean): THING.BaseObject[];
        /**
         * <p>添加孪生体透明到栈中</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param purpose - <p>透明的目的（用于取消该次透明）</p>
         * @param opacity - <p>透明度</p>
         * @param [priority = 0] - <p>透明设置的优先级</p>
         * @param [traverse = false] - <p>是否遍历子元素</p>
         * @param [ignoreTag = [inheritOpacity]] - <p>忽略的标签</p>
         * @returns <ul>
         * <li>执行过操作的孪生体集合</li>
         * </ul>
         */
        function addOpacity(digitalTwin: THING.BaseObject | string, purpose: string, opacity: number, priority?: number, traverse?: boolean, ignoreTag?: string): THING.BaseObject[];
        /**
         * <p>从孪生体透明栈中移除指定目的的透明</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param purpose - <p>透明目的</p>
         * @param [traverse = false] - <p>是否遍历子元素</p>
         * @param [ignoreTag = [inheritOpacity]] - <p>忽略的标签</p>
         * @returns <ul>
         * <li>执行过操作的孪生体集合</li>
         * </ul>
         */
        function removeOpacity(digitalTwin: THING.BaseObject | string, purpose: string, traverse?: boolean, ignoreTag?: string): THING.BaseObject[];
        /**
         * <p>显示孪生体面板</p>
         * @param [digitalTwin = THINGX.App.currentSelected] - <p>孪生体对象，默认值是当前选择的孪生体中的第一个</p>
         * @param [config = {}] - <p>显示位置配置</p>
         * @param config.popup - <p>面板类型 custom</p>
         * @param config.top - <p>距上偏移</p>
         * @param config.left - <p>距左偏移</p>
         */
        function showPanel(digitalTwin?: THING.BaseObject, config?: {
            popup: string;
            top: number;
            left: number;
        }, isShowed?: boolena): void;
        /**
         * <p>隐藏当前显示的孪生体面板</p>
         */
        function hidePanel(): void;
        /**
         * <p>激活当前孪生体面板上的tab</p>
         * @param name - <p>tab名称</p>
         */
        function activateTabOnPanel(name: string): void;
        /**
         * <p>获取当前在孪生体面板上激活的tab</p>
         * @returns <ul>
         * <li>tab名称，失败返回false</li>
         * </ul>
         */
        function getActivatedTabOnPanel(): string | boolean;
        /**
         * <p>重新读取孪生体面板可视化配置</p>
         */
        function refresh(): void;
        /**
         * <p>获取孪生体指定面板名称配置</p>
         * @param digitalTwin - <p>孪生体对象</p>
         * @param name - <p>面板名称</p>
         */
        function getPanelConfig(digitalTwin: THING.BaseObject, name: string): any;
        /**
         * <p>通过ci数据创建孪生体</p>
         * @param ciData - <p>孪生体ci数据</p>
         * @param [onlyEmptyNode = true] - <p>true:只创建空点,不加载模型; false:加载模型</p>
         */
        function createByCIData(ciData: any, options?: any, onlyEmptyNode?: boolean): Promise<THING.BaseObject>;
        /**
         * @param dtwins - <p>孪生体或孪生体组成的数组</p>
         * @param [Category = []] - <p>分类</p>
         * @param [queryChildren = false] - <p>false:获取Ci 不包含孩子</p>
         */
        function getCategoryCIData(dtwins: any | any[], Category?: any, queryChildren?: boolean): void;
        /**
         * @param dtwin - <p>孪生体或孪生体组成的数组</p>
         */
        function initializeCIData(dtwin: any): void;
    }
    /**
     * <p>Http请求模块</p>
     */
    namespace Http {
        /**
         * @property [timeout = 0] - <p>请求超时时间，0表示没超时限制</p>
         * @property [withCredentials = false] - <p>表示跨域请求时是否需要使用凭证</p>
         * @property headers - <p>发送的自定义请求头</p>
         * @property [responseType = json] - <p>示服务器响应的数据类型 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'</p>
         */
        type Config = {
            timeout?: number;
            withCredentials?: boolean;
            headers: Map<string, string>;
            responseType?: string;
        };
        /**
         * <p>http get请求</p>
         * @param url - <p>请求的url</p>
         * @param data - <p>请求数据</p>
         * @param config - <p>请求配置</p>
         */
        function get(url: string, data: any, config: THINGX.Http.Config): Promis<object>;
        /**
         * <p>http post请求</p>
         * @param url - <p>请求的url</p>
         * @param data - <p>请求数据</p>
         * @param config - <p>请求配置</p>
         */
        function post(url: string, data: any, config: THINGX.Http.Config): Promis<object>;
        /**
         * @property [timeout = 0] - <p>请求超时时间，0表示没超时限制</p>
         * @property [withCredentials = false] - <p>表示跨域请求时是否需要使用凭证</p>
         * @property headers - <p>发送的自定义请求头</p>
         * @property [responseType = json] - <p>示服务器响应的数据类型 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'</p>
         */
        type Config = {
            timeout?: number;
            withCredentials?: boolean;
            headers: Map<string, string>;
            responseType?: string;
        };
        /**
         * <p>http get请求</p>
         * @param url - <p>请求的url</p>
         * @param data - <p>请求数据</p>
         * @param config - <p>请求配置</p>
         */
        function get(url: string, data: any, config: THINGX.Http.Config): Promis<object>;
        /**
         * <p>http post请求</p>
         * @param url - <p>请求的url</p>
         * @param data - <p>请求数据</p>
         * @param config - <p>请求配置</p>
         */
        function post(url: string, data: any, config: THINGX.Http.Config): Promis<object>;
    }
    /**
     * <p>图层模块</p>
     */
    namespace Layer {
        /**
         * @property type - <p>图层显示方式: 0是一直显示, 1是业务激活时显示, 2隐藏</p>
         * @property subType - <p>子图层显示方式: 0是悬浮出现, 1是点击出现</p>
         * @property restoreEnable - <p>是否启用恢复按钮</p>
         */
        type GlobalConfig = {
            type: number;
            subType: number;
            restoreEnable: boolean;
        };
        /**
         * <p>显示图层模块</p>
         */
        function show(): void;
        /**
         * <p>隐藏图层模块</p>
         */
        function hide(): void;
        /**
         * <p>通过图层名称获取当前层级图层的实例</p>
         * @param name - <p>图层名称</p>
         * @returns <ul>
         * <li>图层实例</li>
         * </ul>
         */
        function get(name: string): any | null;
        /**
         * <p>激活图层</p>
         * @param name - <p>图层名称</p>
         * @param [purpose = _default_] - <p>激活目的</p>
         */
        function activate(name: string | string[], purpose?: string): void;
        /**
         * <p>取消激活图层</p>
         * @param name - <p>图层名称</p>
         * @param [purpose = _default_] - <p>取消激活目的</p>
         */
        function deactivate(name: string | string[], purpose?: string): void;
        /**
         * <p>取消激活所有图层</p>
         */
        function deactivateAll(): void;
        /**
         * <p>获取当前激活的图层数组</p>
         */
        function getActivated(): object[];
        /**
         * <p>重新读取可视化配置 并根据当前层级重新创建图层</p>
         */
        function refresh(): void;
        /**
         * <p>获取图层用户自定义配置</p>
         * @example
         * const curLevel = THINGX.App.currentLevel;
         * const config = THINGX.Layer.getCustomConfig('建筑信息', curLevel);
         * @param [name] - <p>图层名称，undefined表示所有图层</p>
         * @param [level = THINGX.App.currentLevel] - <p>孪生体对象/孪生体分类</p>
         */
        function getCustomConfig(name?: string | undefined, level?: THING.BaseObject | THINGX.CONST.DEFAULT_DIGITAL_TWIN_CLASS): any;
        /**
         * <p>获取指定层级所有图层配置</p>
         * @example
         * const curLevel = THINGX.App.currentLevel;
         * const config = THINGX.Layer.getConfig(curLevel);
         * @param [level = THINGX.App.currentLevel] - <p>孪生体对象/孪生体分类</p>
         */
        function getConfig(level?: THING.BaseObject | THINGX.CONST.DEFAULT_DIGITAL_TWIN_CLASS): object[];
        /**
         * <p>获取图层的全局配置</p>
         */
        function getGlobalConfig(): THINGX.Layer.GlobalConfig;
        /**
         * <p>获取图层面板配置</p>
         */
        function getPanelConfig(): any | null;
        /**
         * <p>获取图层互斥配置</p>
         */
        function getLayerMutexsConfig(): string[];
        /**
         * <p>获取原生的图层项，不是实例</p>
         * @param name - <p>图层名称</p>
         */
        function getNative(name: string): any;
        /**
         * <p>获取图层组</p>
         * @param name - <p>图层组名称</p>
         */
        function getGroup(name: string): any;
        /**
         * <p>将图层注册条件转换成ThingJS表达式语法</p>
         */
        function regConditonToThingJSQueryExpression(condition: object[] | any): string;
        /**
         * <p>返回当前层级图层树状层级结构</p>
         * @returns <ul>
         * <li>树状层级结构</li>
         * </ul>
         */
        function getTreeStruct(): any;
        /**
         * @property type - <p>图层显示方式: 0是一直显示, 1是业务激活时显示, 2隐藏</p>
         * @property subType - <p>子图层显示方式: 0是悬浮出现, 1是点击出现</p>
         * @property restoreEnable - <p>是否启用恢复按钮</p>
         */
        type GlobalConfig = {
            type: number;
            subType: number;
            restoreEnable: boolean;
        };
        /**
         * <p>显示图层模块</p>
         */
        function show(): void;
        /**
         * <p>隐藏图层模块</p>
         */
        function hide(): void;
        /**
         * <p>通过图层名称获取当前层级图层的实例</p>
         * @param name - <p>图层名称</p>
         * @returns <ul>
         * <li>图层实例</li>
         * </ul>
         */
        function get(name: string): any | null;
        /**
         * <p>激活图层</p>
         * @param name - <p>图层名称</p>
         * @param [purpose = _default_] - <p>激活目的</p>
         */
        function activate(name: string | string[], purpose?: string): void;
        /**
         * <p>取消激活图层</p>
         * @param name - <p>图层名称</p>
         * @param [purpose = _default_] - <p>取消激活目的</p>
         */
        function deactivate(name: string | string[], purpose?: string): void;
        /**
         * <p>取消激活所有图层</p>
         */
        function deactivateAll(): void;
        /**
         * <p>获取当前激活的图层数组</p>
         */
        function getActivated(): object[];
        /**
         * <p>重新读取可视化配置 并根据当前层级重新创建图层</p>
         */
        function refresh(): void;
        /**
         * <p>获取图层用户自定义配置</p>
         * @example
         * const curLevel = THINGX.App.currentLevel;
         * const config = THINGX.Layer.getCustomConfig('建筑信息', curLevel);
         * @param [name] - <p>图层名称，undefined表示所有图层</p>
         * @param [level = THINGX.App.currentLevel] - <p>孪生体对象/孪生体分类</p>
         */
        function getCustomConfig(name?: string | undefined, level?: THING.BaseObject | THINGX.CONST.DEFAULT_DIGITAL_TWIN_CLASS): any;
        /**
         * <p>获取指定层级所有图层配置</p>
         * @example
         * const curLevel = THINGX.App.currentLevel;
         * const config = THINGX.Layer.getConfig(curLevel);
         * @param [level = THINGX.App.currentLevel] - <p>孪生体对象/孪生体分类</p>
         */
        function getConfig(level?: THING.BaseObject | THINGX.CONST.DEFAULT_DIGITAL_TWIN_CLASS): object[];
        /**
         * <p>获取图层的全局配置</p>
         */
        function getGlobalConfig(): THINGX.Layer.GlobalConfig;
        /**
         * <p>获取图层面板配置</p>
         */
        function getPanelConfig(): any | null;
        /**
         * <p>获取图层互斥配置</p>
         */
        function getLayerMutexsConfig(): string[];
        /**
         * <p>获取原生的图层项，不是实例</p>
         * @param name - <p>图层名称</p>
         */
        function getNative(name: string): any;
        /**
         * <p>获取图层组</p>
         * @param name - <p>图层组名称</p>
         */
        function getGroup(name: string): any;
        /**
         * <p>将图层注册条件转换成ThingJS表达式语法</p>
         */
        function regConditonToThingJSQueryExpression(condition: object[] | any): string;
        /**
         * <p>返回当前层级图层树状层级结构</p>
         * @returns <ul>
         * <li>树状层级结构</li>
         * </ul>
         */
        function getTreeStruct(): any;
    }
    /**
     * <p>标记模块</p>
     */
    namespace Marker {
        /**
         * @property url - <p>标记使用图片路径</p>
         * @property width - <p>标记宽度</p>
         * @property height - <p>标记高度</p>
         * @property size - <p>像素大小</p>
         * @property getMethod - <p>取值方法</p>
         * @property pickable - <p>是否可被拾取</p>
         * @property keepSize - <p>是否保存像素大小</p>
         * @property inheritScale - <p>是否继承代理孪生体缩放</p>
         * @property inheritStyle - <p>是否继承代理孪生体样式</p>
         * @property alwaysOnTop - <p>是否始终处于最高层级渲染，无遮挡</p>
         * @property complete - <p>标记创建完成回调</p>
         * @property style - <p>标记样式 参考ThingJS</p>
         * @property businessName - <p>业务名称</p>
         */
        type CreateConfig = {
            url: string;
            width: number;
            height: number;
            size: number;
            getMethod: string;
            pickable: boolean;
            keepSize: boolean;
            inheritScale: boolean;
            inheritStyle: boolean;
            alwaysOnTop: boolean;
            complete: (...params: any[]) => any;
            style: any;
            businessName: string;
        };
        /**
         * <p>显示标记</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param name - <p>标记名称（在ThingJS-X中配置的对应的孪生体上的标记）</p>
         * @param [purpose = default] - <p>显示目的</p>
         * @returns <ul>
         * <li>返回操作过的标记列表</li>
         * </ul>
         */
        function show(digitalTwin: THING.BaseObject | string, name: string, purpose?: string): THING.BaseObject[];
        /**
         * <p>隐藏标记</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param name - <p>标记名称</p>
         * @param [purpose = default] - <p>隐藏目的</p>
         * @returns <ul>
         * <li>返回操作过的标记列表</li>
         * </ul>
         */
        function hide(digitalTwin: THING.BaseObject | string, name: string, purpose?: string): THING.BaseObject[];
        /**
         * <p>增加标记，增加后立即显示</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param name - <p>标记名称,可通过THINGX.Marker.getConfig获取孪生体上配置了哪些标记（在ThingJS-X中配置的对应的孪生体上的标记）</p>
         * @param isExcludeModel - <p>是否包含模型</p>
         * @returns <ul>
         * <li>成功返回标记对象</li>
         * </ul>
         */
        function add(digitalTwin: THING.BaseObject | string, name: string, isExcludeModel: boolean): THING.BaseObject[];
        /**
         * <p>获取已创建的标记</p>
         * @param digitalTwin - <p>孪生体对象</p>
         * @param name - <p>标记名称</p>
         * @returns <ul>
         * <li>成功返回标记对象</li>
         * </ul>
         */
        function get(digitalTwin: THING.BaseObject, name: string): THING.BaseObject | null;
        /**
         * <p>删除标记</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param name - <p>标记名称</p>
         * @returns <ul>
         * <li>是否删除成功</li>
         * </ul>
         */
        function remove(digitalTwin: THING.BaseObject | string, name: string): boolean;
        /**
         * <p>通过tag增加自定义标记</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param tag - <p>标签</p>
         * @param type - <p>标记类型</p>
         * @param config - <p>标记自定义配置</p>
         * @returns <ul>
         * <li>标记列表</li>
         * </ul>
         */
        function addWithTag(digitalTwin: THING.BaseObject | string, tag: string, type: string, config: THINGX.Marker.CreateConfig): THING.BaseObject[];
        /**
         * <p>通过标签删除标记</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param tag - <p>标签</p>
         * @returns <ul>
         * <li>是否删除成功</li>
         * </ul>
         */
        function removeWithTag(digitalTwin: THING.BaseObject | string, tag: string): boolean;
        /**
         * <p>获取孪生体标记配置数据</p>
         * @param digitalTwin - <p>孪生体对象</p>
         * @returns <ul>
         * <li>标记配置数据 业务名称:配置数据</li>
         * </ul>
         */
        function getConfig(digitalTwin: THING.BaseObject): Map<string, object>;
        /**
         * <p>获取孪生体上所有的标记</p>
         * @param digitalTwin - <p>孪生体对象</p>
         * @returns <ul>
         * <li>已经创建的标记 业务名称:标记对象</li>
         * </ul>
         */
        function getAll(digitalTwin: THING.BaseObject): Map<string, THING.BaseObject>;
        /**
         * <p>给符合条件的孪生体注册标记</p>
         * @param condition - <p>孪生体集合配置语法表达式 {REGTYPE_CLASSTYPE: 'Campus'}</p>
         * @param config - <p>标记配置</p>
         * @param [businessName = _default_] - <p>业务名称</p>
         */
        function addWithCondition(condition: string, config: any, businessName?: string): void;
        /**
         * <p>获取孪生体预加载的标记名称</p>
         * @param digitalTwin - <p>孪生体对象</p>
         * @returns <ul>
         * <li>预加载标记的名称,若没有则返回空值,可根据这个名称通过show或者hide方法来显示和影藏预加载标记</li>
         * </ul>
         */
        function getPreloadName(digitalTwin: THING.BaseObject): string;
        /**
         * @property url - <p>标记使用图片路径</p>
         * @property width - <p>标记宽度</p>
         * @property height - <p>标记高度</p>
         * @property size - <p>像素大小</p>
         * @property getMethod - <p>取值方法</p>
         * @property pickable - <p>是否可被拾取</p>
         * @property keepSize - <p>是否保存像素大小</p>
         * @property inheritScale - <p>是否继承代理孪生体缩放</p>
         * @property inheritStyle - <p>是否继承代理孪生体样式</p>
         * @property alwaysOnTop - <p>是否始终处于最高层级渲染，无遮挡</p>
         * @property complete - <p>标记创建完成回调</p>
         * @property style - <p>标记样式 参考ThingJS</p>
         * @property businessName - <p>业务名称</p>
         */
        type CreateConfig = {
            url: string;
            width: number;
            height: number;
            size: number;
            getMethod: string;
            pickable: boolean;
            keepSize: boolean;
            inheritScale: boolean;
            inheritStyle: boolean;
            alwaysOnTop: boolean;
            complete: (...params: any[]) => any;
            style: any;
            businessName: string;
        };
        /**
         * <p>显示标记</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param name - <p>标记名称（在ThingJS-X中配置的对应的孪生体上的标记）</p>
         * @param [purpose = default] - <p>显示目的</p>
         * @returns <ul>
         * <li>返回操作过的标记列表</li>
         * </ul>
         */
        function show(digitalTwin: THING.BaseObject | string, name: string, purpose?: string): THING.BaseObject[];
        /**
         * <p>隐藏标记</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param name - <p>标记名称</p>
         * @param [purpose = default] - <p>隐藏目的</p>
         * @returns <ul>
         * <li>返回操作过的标记列表</li>
         * </ul>
         */
        function hide(digitalTwin: THING.BaseObject | string, name: string, purpose?: string): THING.BaseObject[];
        /**
         * <p>增加标记，增加后立即显示</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param name - <p>标记名称,可通过THINGX.Marker.getConfig获取孪生体上配置了哪些标记（在ThingJS-X中配置的对应的孪生体上的标记）</p>
         * @param isExcludeModel - <p>是否包含模型</p>
         * @returns <ul>
         * <li>成功返回标记对象</li>
         * </ul>
         */
        function add(digitalTwin: THING.BaseObject | string, name: string, isExcludeModel: boolean): THING.BaseObject[];
        /**
         * <p>获取已创建的标记</p>
         * @param digitalTwin - <p>孪生体对象</p>
         * @param name - <p>标记名称</p>
         * @returns <ul>
         * <li>成功返回标记对象</li>
         * </ul>
         */
        function get(digitalTwin: THING.BaseObject, name: string): THING.BaseObject | null;
        /**
         * <p>删除标记</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param name - <p>标记名称</p>
         * @returns <ul>
         * <li>是否删除成功</li>
         * </ul>
         */
        function remove(digitalTwin: THING.BaseObject | string, name: string): boolean;
        /**
         * <p>通过tag增加自定义标记</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param tag - <p>标签</p>
         * @param type - <p>标记类型</p>
         * @param config - <p>标记自定义配置</p>
         * @returns <ul>
         * <li>标记列表</li>
         * </ul>
         */
        function addWithTag(digitalTwin: THING.BaseObject | string, tag: string, type: string, config: THINGX.Marker.CreateConfig): THING.BaseObject[];
        /**
         * <p>通过标签删除标记</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param tag - <p>标签</p>
         * @returns <ul>
         * <li>是否删除成功</li>
         * </ul>
         */
        function removeWithTag(digitalTwin: THING.BaseObject | string, tag: string): boolean;
        /**
         * <p>获取孪生体标记配置数据</p>
         * @param digitalTwin - <p>孪生体对象</p>
         * @returns <ul>
         * <li>标记配置数据 业务名称:配置数据</li>
         * </ul>
         */
        function getConfig(digitalTwin: THING.BaseObject): Map<string, object>;
        /**
         * <p>获取孪生体上所有的标记</p>
         * @param digitalTwin - <p>孪生体对象</p>
         * @returns <ul>
         * <li>已经创建的标记 业务名称:标记对象</li>
         * </ul>
         */
        function getAll(digitalTwin: THING.BaseObject): Map<string, THING.BaseObject>;
        /**
         * <p>给符合条件的孪生体注册标记</p>
         * @param condition - <p>孪生体集合配置语法表达式 {REGTYPE_CLASSTYPE: 'Campus'}</p>
         * @param config - <p>标记配置</p>
         * @param [businessName = _default_] - <p>业务名称</p>
         */
        function addWithCondition(condition: string, config: any, businessName?: string): void;
        /**
         * <p>获取孪生体预加载的标记名称</p>
         * @param digitalTwin - <p>孪生体对象</p>
         * @returns <ul>
         * <li>预加载标记的名称,若没有则返回空值,可根据这个名称通过show或者hide方法来显示和影藏预加载标记</li>
         * </ul>
         */
        function getPreloadName(digitalTwin: THING.BaseObject): string;
    }
    /**
     * <p>监控模块</p>
     */
    namespace Monitor {
        /**
         * <p>监控模块 设备内</p>
         */
        namespace ModuleInDevice {
            /**
             * <p>将孪生体添加到监控中</p>
             * @example
             * const objs = THINGX.App.queryWithThingJSExpression('[twinType=空调]');
             * objs.forEach(obj=>{
             *     THINGX.Monitor.ModuleInDevice.add(obj);
             * });
             *
             * THINGX.Monitor.ModuleInDevice.add('[twinType=温度传感器]', null, null, '温度云图')
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @param monitorName - <p>监控名称，用于代理监控</p>
             * @param monitorKeys - <p>监控指标, 如 [&quot;温度&quot;,&quot;湿度&quot;]</p>
             * @param [purpose = _default_] - <p>监控目的，可以理解为一个占位标识。当有一个监控目的（purpose）占用某个孪生体对象，使该孪生体对象处于监控队列中时，则该孪生体不可被移出监控队列</p>
             * @param config - <p>监控配置</p>
             * @param [config.isForceUpdate = false] - <p>是否更新监控效果，无论物体是否显示</p>
             * @param [config.isAddEffect = true] - <p>是否添加监控效果</p>
             * @param [config.effectoVisible] - <p>监控可视化效果是否显示，默认随孪生体显示状态，如果isAddEffect为false则该字段不生效</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function add(digitalTwin: THING.BaseObject | string, monitorName: string, monitorKeys: string[], purpose?: string, config: {
                isForceUpdate?: boolean;
                isAddEffect?: boolean;
                effectoVisible?: boolean;
            }): THING.BaseObject[];
            /**
             * <p>将孪生体从监控中移除</p>
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @param [purpose = _default_] - <p>移除目的</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function remove(digitalTwin: THING.BaseObject | string, purpose?: string): THING.BaseObject[];
            /**
             * <p>孪生体是否在监控集合中</p>
             * @param digitalTwin - <p>孪生体对象</p>
             * @param [type] - <p>传此参数则检测物体是否有当前监控类型</p>
             */
            function isDigitalTwinInMonitorSet(digitalTwin: THING.BaseObject, type?: string): boolean;
            /**
             * <p>通过接口向后端请求监控数据</p>
             * @example
             * // 对已经被加入到监控中的孪生体对象请求监控数据
             * THINGX.Monitor.ModuleInDevice.remoteData()
             */
            function remoteData(): void;
            /**
             * <p>刷新监控显示效果</p>
             */
            function refreshEffect(): void;
            /**
             * <p>注册设备内监控 注册完后就添加监控 和 监控效果</p>
             * @param condition - <p>要注册的条件，可以是物体，物体 id，物体 name,物体 类，物体属性，函数，物体方法，以及使用前面的类型进行与或非的组合。</p>
             * @param param - <p>要注册内容</p>
             * @param name - <p>注册的名称,可以不填，系统内部会默认指定name的值是“<em>NONAME</em>”</p>
             */
            function addWithCondition(condition: any | string, param: any, name: string): void;
            /**
             * <p>将孪生体添加到监控中</p>
             * @example
             * const objs = THINGX.App.queryWithThingJSExpression('[twinType=空调]');
             * objs.forEach(obj=>{
             *     THINGX.Monitor.ModuleInDevice.add(obj);
             * });
             *
             * THINGX.Monitor.ModuleInDevice.add('[twinType=温度传感器]', null, null, '温度云图')
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @param monitorName - <p>监控名称，用于代理监控</p>
             * @param monitorKeys - <p>监控指标, 如 [&quot;温度&quot;,&quot;湿度&quot;]</p>
             * @param [purpose = _default_] - <p>监控目的，可以理解为一个占位标识。当有一个监控目的（purpose）占用某个孪生体对象，使该孪生体对象处于监控队列中时，则该孪生体不可被移出监控队列</p>
             * @param config - <p>监控配置</p>
             * @param [config.isForceUpdate = false] - <p>是否更新监控效果，无论物体是否显示</p>
             * @param [config.isAddEffect = true] - <p>是否添加监控效果</p>
             * @param [config.effectoVisible] - <p>监控可视化效果是否显示，默认随孪生体显示状态，如果isAddEffect为false则该字段不生效</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function add(digitalTwin: THING.BaseObject | string, monitorName: string, monitorKeys: string[], purpose?: string, config: {
                isForceUpdate?: boolean;
                isAddEffect?: boolean;
                effectoVisible?: boolean;
            }): THING.BaseObject[];
            /**
             * <p>将孪生体从监控中移除</p>
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @param [purpose = _default_] - <p>移除目的</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function remove(digitalTwin: THING.BaseObject | string, purpose?: string): THING.BaseObject[];
            /**
             * <p>孪生体是否在监控集合中</p>
             * @param digitalTwin - <p>孪生体对象</p>
             * @param [type] - <p>传此参数则检测物体是否有当前监控类型</p>
             */
            function isDigitalTwinInMonitorSet(digitalTwin: THING.BaseObject, type?: string): boolean;
            /**
             * <p>通过接口向后端请求监控数据</p>
             * @example
             * // 对已经被加入到监控中的孪生体对象请求监控数据
             * THINGX.Monitor.ModuleInDevice.remoteData()
             */
            function remoteData(): void;
            /**
             * <p>刷新监控显示效果</p>
             */
            function refreshEffect(): void;
            /**
             * <p>注册设备内监控 注册完后就添加监控 和 监控效果</p>
             * @param condition - <p>要注册的条件，可以是物体，物体 id，物体 name,物体 类，物体属性，函数，物体方法，以及使用前面的类型进行与或非的组合。</p>
             * @param param - <p>要注册内容</p>
             * @param name - <p>注册的名称,可以不填，系统内部会默认指定name的值是“<em>NONAME</em>”</p>
             */
            function addWithCondition(condition: any | string, param: any, name: string): void;
        }
        /**
         * <p>监控模块 操作集</p>
         */
        namespace ModuleOpSet {
            /**
             * <p>将孪生体添加到监控中</p>
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @param monitorName - <p>监控名称，用于代理监控</p>
             * @param monitorKeys - <p>监控指标, 如 [&quot;温度&quot;,&quot;湿度&quot;]</p>
             * @param [purpose = _default_] - <p>监控目的，可以理解为一个占位标识。当有一个监控目的（purpose）占用某个孪生体对象，使该孪生体对象处于监控队列中时，则该孪生体不可被移出监控队列</p>
             * @param config - <p>监控配置</p>
             * @param [config.isForceUpdate = false] - <p>是否更新监控效果，无论物体是否显示</p>
             * @param [config.isAddEffect = true] - <p>是否添加监控效果</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function add(digitalTwin: THING.BaseObject | string, monitorName: string, monitorKeys: string[], purpose?: string, config: {
                isForceUpdate?: boolean;
                isAddEffect?: boolean;
            }): THING.BaseObject[];
            /**
             * <p>将孪生体从监控中移除</p>
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @param [purpose = _default_] - <p>移除目的</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function remove(digitalTwin: THING.BaseObject | string, purpose?: string): THING.BaseObject[];
            /**
             * <p>增加监控效果</p>
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function addEffect(digitalTwin: THING.BaseObject | string): THING.BaseObject[];
            /**
             * <p>移除监控效果</p>
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function removeEffect(digitalTwin: THING.BaseObject | string): THING.BaseObject[];
            /**
             * <p>将孪生体添加到监控中</p>
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @param monitorName - <p>监控名称，用于代理监控</p>
             * @param monitorKeys - <p>监控指标, 如 [&quot;温度&quot;,&quot;湿度&quot;]</p>
             * @param [purpose = _default_] - <p>监控目的，可以理解为一个占位标识。当有一个监控目的（purpose）占用某个孪生体对象，使该孪生体对象处于监控队列中时，则该孪生体不可被移出监控队列</p>
             * @param config - <p>监控配置</p>
             * @param [config.isForceUpdate = false] - <p>是否更新监控效果，无论物体是否显示</p>
             * @param [config.isAddEffect = true] - <p>是否添加监控效果</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function add(digitalTwin: THING.BaseObject | string, monitorName: string, monitorKeys: string[], purpose?: string, config: {
                isForceUpdate?: boolean;
                isAddEffect?: boolean;
            }): THING.BaseObject[];
            /**
             * <p>将孪生体从监控中移除</p>
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @param [purpose = _default_] - <p>移除目的</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function remove(digitalTwin: THING.BaseObject | string, purpose?: string): THING.BaseObject[];
            /**
             * <p>增加监控效果</p>
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function addEffect(digitalTwin: THING.BaseObject | string): THING.BaseObject[];
            /**
             * <p>移除监控效果</p>
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function removeEffect(digitalTwin: THING.BaseObject | string): THING.BaseObject[];
        }
        /**
         * <p>将孪生体添加到监控中</p>
         * @example
         * const objs = THINGX.App.queryWithThingJSExpression('[twinType=空调]');
         * objs.forEach(obj=>{
         *     THINGX.Monitor.add(obj);
         * });
         *
         * THINGX.Monitor.add('[twinType=温度传感器]', null, null, '温度云图')
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param monitorName - <p>监控名称，用于代理监控</p>
         * @param monitorKeys - <p>监控指标, 如 [&quot;温度&quot;,&quot;湿度&quot;]</p>
         * @param [purpose = _default_] - <p>监控目的，可以理解为一个占位标识。当有一个监控目的（purpose）占用某个孪生体对象，使该孪生体对象处于监控队列中时，则该孪生体不可被移出监控队列</p>
         * @param config - <p>监控配置</p>
         * @param [config.isForceUpdate = false] - <p>是否更新监控效果，无论物体是否显示</p>
         * @param [config.isAddEffect = true] - <p>是否添加监控效果</p>
         * @param [config.effectoVisible] - <p>监控可视化效果是否显示，默认随孪生体显示状态，如果isAddEffect为false则该字段不生效</p>
         * @returns <ul>
         * <li>执行过操作的孪生体集合</li>
         * </ul>
         */
        function add(digitalTwin: THING.BaseObject | string, monitorName: string, monitorKeys: string[], purpose?: string, config: {
            isForceUpdate?: boolean;
            isAddEffect?: boolean;
            effectoVisible?: boolean;
        }): THING.BaseObject[];
        /**
         * <p>将孪生体从监控中移除</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param [purpose = _default_] - <p>移除目的</p>
         * @returns <ul>
         * <li>执行过操作的孪生体集合</li>
         * </ul>
         */
        function remove(digitalTwin: THING.BaseObject | string, purpose?: string): THING.BaseObject[];
        /**
         * <p>孪生体是否在监控集合中</p>
         * @param digitalTwin - <p>孪生体对象</p>
         * @param [type] - <p>传此参数则检测物体是否有当前监控类型</p>
         */
        function isDigitalTwinInMonitorSet(digitalTwin: THING.BaseObject, type?: string): boolean;
        /**
         * <p>增加监控标记</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param business - <p>相关业务名称，通过业务名称查询相关配置，下面配置会覆盖通过业务查询出的配置</p>
         * @param [type] - <p>DEFAULT 默认没有效果/BACKGROUND_AND_CANVAS 标记/HTMLELEMENT 标记/SELF_OBJECT 默认孪生体自身效果</p>
         * @param config - <p>标记创建配置</p>
         * @returns <ul>
         * <li>执行过操作的孪生体集合</li>
         * </ul>
         */
        function addMarker(digitalTwin: THING.BaseObject | string, business: string, type?: string, config: THINGX.Marker.CreateConfig): THING.BaseObject[];
        /**
         * <p>移除监控标记</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @returns <ul>
         * <li>执行过操作的孪生体集合</li>
         * </ul>
         */
        function removeMarker(digitalTwin: THING.BaseObject | string): THING.BaseObject[];
        /**
         * <p>获取监控标记</p>
         * @param digitalTwin - <p>孪生体对象</p>
         */
        function getMarker(digitalTwin: THING.BaseObject): THING.BaseObject | null;
        /**
         * <p>设置监控接口请求间隔时间</p>
         * @param time - <p>间隔时间，单位秒</p>
         */
        function setRemoteInterval(time: number): void;
        /**
         * <p>设置监控接口请求超时时间</p>
         * @param time - <p>超时时间，单位秒</p>
         */
        function setRemoteTimeout(time: number): void;
        /**
         * <p>通过接口向后端请求监控数据</p>
         * @example
         * const dbid = obj.userData._DBID_;
         * // 对已经被加入到监控中的孪生体对象请求监控数据
         * THINGX.Monitor.remoteData()
         * // 对单一物体进行刷新dbid
         * THINGX.Monitor.remoteData(dbid);
         * // 对对多个物体进行刷新dbids
         * THINGX.Monitor.remoteData([...dbids]);
         * @param [ids = null] - <p>孪生体属性中的dbid 默认对所有孪生体监控进行请求</p>
         */
        function remoteData(ids?: string[] | string | null): void;
        /**
         * <p>注册设备内监控 注册完后就添加监控 和 监控效果</p>
         * @param condition - <p>要注册的条件，可以是物体，物体 id，物体 name,物体 类，物体属性，函数，物体方法，以及使用前面的类型进行与或非的组合。</p>
         * @param config - <p>要注册内容</p>
         * @param config.business - <p>业务名称</p>
         * @param name - <p>注册的名称,可以不填，系统内部会默认指定name的值是“<em>NONAME</em>”</p>
         */
        function addWithCondition(condition: any | string, config: {
            business: string;
        }, name: string): void;
        /**
         * <p>监控模块 设备内</p>
         */
        namespace ModuleInDevice {
            /**
             * <p>将孪生体添加到监控中</p>
             * @example
             * const objs = THINGX.App.queryWithThingJSExpression('[twinType=空调]');
             * objs.forEach(obj=>{
             *     THINGX.Monitor.ModuleInDevice.add(obj);
             * });
             *
             * THINGX.Monitor.ModuleInDevice.add('[twinType=温度传感器]', null, null, '温度云图')
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @param monitorName - <p>监控名称，用于代理监控</p>
             * @param monitorKeys - <p>监控指标, 如 [&quot;温度&quot;,&quot;湿度&quot;]</p>
             * @param [purpose = _default_] - <p>监控目的，可以理解为一个占位标识。当有一个监控目的（purpose）占用某个孪生体对象，使该孪生体对象处于监控队列中时，则该孪生体不可被移出监控队列</p>
             * @param config - <p>监控配置</p>
             * @param [config.isForceUpdate = false] - <p>是否更新监控效果，无论物体是否显示</p>
             * @param [config.isAddEffect = true] - <p>是否添加监控效果</p>
             * @param [config.effectoVisible] - <p>监控可视化效果是否显示，默认随孪生体显示状态，如果isAddEffect为false则该字段不生效</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function add(digitalTwin: THING.BaseObject | string, monitorName: string, monitorKeys: string[], purpose?: string, config: {
                isForceUpdate?: boolean;
                isAddEffect?: boolean;
                effectoVisible?: boolean;
            }): THING.BaseObject[];
            /**
             * <p>将孪生体从监控中移除</p>
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @param [purpose = _default_] - <p>移除目的</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function remove(digitalTwin: THING.BaseObject | string, purpose?: string): THING.BaseObject[];
            /**
             * <p>孪生体是否在监控集合中</p>
             * @param digitalTwin - <p>孪生体对象</p>
             * @param [type] - <p>传此参数则检测物体是否有当前监控类型</p>
             */
            function isDigitalTwinInMonitorSet(digitalTwin: THING.BaseObject, type?: string): boolean;
            /**
             * <p>通过接口向后端请求监控数据</p>
             * @example
             * // 对已经被加入到监控中的孪生体对象请求监控数据
             * THINGX.Monitor.ModuleInDevice.remoteData()
             */
            function remoteData(): void;
            /**
             * <p>刷新监控显示效果</p>
             */
            function refreshEffect(): void;
            /**
             * <p>注册设备内监控 注册完后就添加监控 和 监控效果</p>
             * @param condition - <p>要注册的条件，可以是物体，物体 id，物体 name,物体 类，物体属性，函数，物体方法，以及使用前面的类型进行与或非的组合。</p>
             * @param param - <p>要注册内容</p>
             * @param name - <p>注册的名称,可以不填，系统内部会默认指定name的值是“<em>NONAME</em>”</p>
             */
            function addWithCondition(condition: any | string, param: any, name: string): void;
            /**
             * <p>将孪生体添加到监控中</p>
             * @example
             * const objs = THINGX.App.queryWithThingJSExpression('[twinType=空调]');
             * objs.forEach(obj=>{
             *     THINGX.Monitor.ModuleInDevice.add(obj);
             * });
             *
             * THINGX.Monitor.ModuleInDevice.add('[twinType=温度传感器]', null, null, '温度云图')
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @param monitorName - <p>监控名称，用于代理监控</p>
             * @param monitorKeys - <p>监控指标, 如 [&quot;温度&quot;,&quot;湿度&quot;]</p>
             * @param [purpose = _default_] - <p>监控目的，可以理解为一个占位标识。当有一个监控目的（purpose）占用某个孪生体对象，使该孪生体对象处于监控队列中时，则该孪生体不可被移出监控队列</p>
             * @param config - <p>监控配置</p>
             * @param [config.isForceUpdate = false] - <p>是否更新监控效果，无论物体是否显示</p>
             * @param [config.isAddEffect = true] - <p>是否添加监控效果</p>
             * @param [config.effectoVisible] - <p>监控可视化效果是否显示，默认随孪生体显示状态，如果isAddEffect为false则该字段不生效</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function add(digitalTwin: THING.BaseObject | string, monitorName: string, monitorKeys: string[], purpose?: string, config: {
                isForceUpdate?: boolean;
                isAddEffect?: boolean;
                effectoVisible?: boolean;
            }): THING.BaseObject[];
            /**
             * <p>将孪生体从监控中移除</p>
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @param [purpose = _default_] - <p>移除目的</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function remove(digitalTwin: THING.BaseObject | string, purpose?: string): THING.BaseObject[];
            /**
             * <p>孪生体是否在监控集合中</p>
             * @param digitalTwin - <p>孪生体对象</p>
             * @param [type] - <p>传此参数则检测物体是否有当前监控类型</p>
             */
            function isDigitalTwinInMonitorSet(digitalTwin: THING.BaseObject, type?: string): boolean;
            /**
             * <p>通过接口向后端请求监控数据</p>
             * @example
             * // 对已经被加入到监控中的孪生体对象请求监控数据
             * THINGX.Monitor.ModuleInDevice.remoteData()
             */
            function remoteData(): void;
            /**
             * <p>刷新监控显示效果</p>
             */
            function refreshEffect(): void;
            /**
             * <p>注册设备内监控 注册完后就添加监控 和 监控效果</p>
             * @param condition - <p>要注册的条件，可以是物体，物体 id，物体 name,物体 类，物体属性，函数，物体方法，以及使用前面的类型进行与或非的组合。</p>
             * @param param - <p>要注册内容</p>
             * @param name - <p>注册的名称,可以不填，系统内部会默认指定name的值是“<em>NONAME</em>”</p>
             */
            function addWithCondition(condition: any | string, param: any, name: string): void;
        }
        /**
         * <p>监控模块 操作集</p>
         */
        namespace ModuleOpSet {
            /**
             * <p>将孪生体添加到监控中</p>
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @param monitorName - <p>监控名称，用于代理监控</p>
             * @param monitorKeys - <p>监控指标, 如 [&quot;温度&quot;,&quot;湿度&quot;]</p>
             * @param [purpose = _default_] - <p>监控目的，可以理解为一个占位标识。当有一个监控目的（purpose）占用某个孪生体对象，使该孪生体对象处于监控队列中时，则该孪生体不可被移出监控队列</p>
             * @param config - <p>监控配置</p>
             * @param [config.isForceUpdate = false] - <p>是否更新监控效果，无论物体是否显示</p>
             * @param [config.isAddEffect = true] - <p>是否添加监控效果</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function add(digitalTwin: THING.BaseObject | string, monitorName: string, monitorKeys: string[], purpose?: string, config: {
                isForceUpdate?: boolean;
                isAddEffect?: boolean;
            }): THING.BaseObject[];
            /**
             * <p>将孪生体从监控中移除</p>
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @param [purpose = _default_] - <p>移除目的</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function remove(digitalTwin: THING.BaseObject | string, purpose?: string): THING.BaseObject[];
            /**
             * <p>增加监控效果</p>
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function addEffect(digitalTwin: THING.BaseObject | string): THING.BaseObject[];
            /**
             * <p>移除监控效果</p>
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function removeEffect(digitalTwin: THING.BaseObject | string): THING.BaseObject[];
            /**
             * <p>将孪生体添加到监控中</p>
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @param monitorName - <p>监控名称，用于代理监控</p>
             * @param monitorKeys - <p>监控指标, 如 [&quot;温度&quot;,&quot;湿度&quot;]</p>
             * @param [purpose = _default_] - <p>监控目的，可以理解为一个占位标识。当有一个监控目的（purpose）占用某个孪生体对象，使该孪生体对象处于监控队列中时，则该孪生体不可被移出监控队列</p>
             * @param config - <p>监控配置</p>
             * @param [config.isForceUpdate = false] - <p>是否更新监控效果，无论物体是否显示</p>
             * @param [config.isAddEffect = true] - <p>是否添加监控效果</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function add(digitalTwin: THING.BaseObject | string, monitorName: string, monitorKeys: string[], purpose?: string, config: {
                isForceUpdate?: boolean;
                isAddEffect?: boolean;
            }): THING.BaseObject[];
            /**
             * <p>将孪生体从监控中移除</p>
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @param [purpose = _default_] - <p>移除目的</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function remove(digitalTwin: THING.BaseObject | string, purpose?: string): THING.BaseObject[];
            /**
             * <p>增加监控效果</p>
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function addEffect(digitalTwin: THING.BaseObject | string): THING.BaseObject[];
            /**
             * <p>移除监控效果</p>
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function removeEffect(digitalTwin: THING.BaseObject | string): THING.BaseObject[];
        }
        /**
         * <p>将孪生体添加到监控中</p>
         * @example
         * const objs = THINGX.App.queryWithThingJSExpression('[twinType=空调]');
         * objs.forEach(obj=>{
         *     THINGX.Monitor.add(obj);
         * });
         *
         * THINGX.Monitor.add('[twinType=温度传感器]', null, null, '温度云图')
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param monitorName - <p>监控名称，用于代理监控</p>
         * @param monitorKeys - <p>监控指标, 如 [&quot;温度&quot;,&quot;湿度&quot;]</p>
         * @param [purpose = _default_] - <p>监控目的，可以理解为一个占位标识。当有一个监控目的（purpose）占用某个孪生体对象，使该孪生体对象处于监控队列中时，则该孪生体不可被移出监控队列</p>
         * @param config - <p>监控配置</p>
         * @param [config.isForceUpdate = false] - <p>是否更新监控效果，无论物体是否显示</p>
         * @param [config.isAddEffect = true] - <p>是否添加监控效果</p>
         * @param [config.effectoVisible] - <p>监控可视化效果是否显示，默认随孪生体显示状态，如果isAddEffect为false则该字段不生效</p>
         * @returns <ul>
         * <li>执行过操作的孪生体集合</li>
         * </ul>
         */
        function add(digitalTwin: THING.BaseObject | string, monitorName: string, monitorKeys: string[], purpose?: string, config: {
            isForceUpdate?: boolean;
            isAddEffect?: boolean;
            effectoVisible?: boolean;
        }): THING.BaseObject[];
        /**
         * <p>将孪生体从监控中移除</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param [purpose = _default_] - <p>移除目的</p>
         * @returns <ul>
         * <li>执行过操作的孪生体集合</li>
         * </ul>
         */
        function remove(digitalTwin: THING.BaseObject | string, purpose?: string): THING.BaseObject[];
        /**
         * <p>孪生体是否在监控集合中</p>
         * @param digitalTwin - <p>孪生体对象</p>
         * @param [type] - <p>传此参数则检测物体是否有当前监控类型</p>
         */
        function isDigitalTwinInMonitorSet(digitalTwin: THING.BaseObject, type?: string): boolean;
        /**
         * <p>增加监控标记</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param business - <p>相关业务名称，通过业务名称查询相关配置，下面配置会覆盖通过业务查询出的配置</p>
         * @param [type] - <p>DEFAULT 默认没有效果/BACKGROUND_AND_CANVAS 标记/HTMLELEMENT 标记/SELF_OBJECT 默认孪生体自身效果</p>
         * @param config - <p>标记创建配置</p>
         * @returns <ul>
         * <li>执行过操作的孪生体集合</li>
         * </ul>
         */
        function addMarker(digitalTwin: THING.BaseObject | string, business: string, type?: string, config: THINGX.Marker.CreateConfig): THING.BaseObject[];
        /**
         * <p>移除监控标记</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @returns <ul>
         * <li>执行过操作的孪生体集合</li>
         * </ul>
         */
        function removeMarker(digitalTwin: THING.BaseObject | string): THING.BaseObject[];
        /**
         * <p>获取监控标记</p>
         * @param digitalTwin - <p>孪生体对象</p>
         */
        function getMarker(digitalTwin: THING.BaseObject): THING.BaseObject | null;
        /**
         * <p>设置监控接口请求间隔时间</p>
         * @param time - <p>间隔时间，单位秒</p>
         */
        function setRemoteInterval(time: number): void;
        /**
         * <p>设置监控接口请求超时时间</p>
         * @param time - <p>超时时间，单位秒</p>
         */
        function setRemoteTimeout(time: number): void;
        /**
         * <p>通过接口向后端请求监控数据</p>
         * @example
         * const dbid = obj.userData._DBID_;
         * // 对已经被加入到监控中的孪生体对象请求监控数据
         * THINGX.Monitor.remoteData()
         * // 对单一物体进行刷新dbid
         * THINGX.Monitor.remoteData(dbid);
         * // 对对多个物体进行刷新dbids
         * THINGX.Monitor.remoteData([...dbids]);
         * @param [ids = null] - <p>孪生体属性中的dbid 默认对所有孪生体监控进行请求</p>
         */
        function remoteData(ids?: string[] | string | null): void;
        /**
         * <p>注册设备内监控 注册完后就添加监控 和 监控效果</p>
         * @param condition - <p>要注册的条件，可以是物体，物体 id，物体 name,物体 类，物体属性，函数，物体方法，以及使用前面的类型进行与或非的组合。</p>
         * @param config - <p>要注册内容</p>
         * @param config.business - <p>业务名称</p>
         * @param name - <p>注册的名称,可以不填，系统内部会默认指定name的值是“<em>NONAME</em>”</p>
         */
        function addWithCondition(condition: any | string, config: {
            business: string;
        }, name: string): void;
    }
    /**
     * <p>操作集模块</p>
     */
    namespace OpSet {
        /**
         * <p>运行操作集</p>
         * @param name - <p>操作集名称</p>
         * @param runObj - <p>运行对象</p>
         * @param [runParams = {}] - <p>运行中存储单元传参</p>
         */
        function run(name: string, runObj: any, runParams?: Map<string, any>): void;
        /**
         * <p>获取指定操作集</p>
         * @param name - <p>操作集名称</p>
         * @returns <p>操作集</p>
         */
        function get(name: string): any | null;
        /**
         * <p>停止指定操作集</p>
         * @param name - <p>操作集名称</p>
         */
        function stop(name: string): void;
        /**
         * <p>设置指定操作集的运行速度</p>
         * @param name - <p>操作集名称</p>
         * @param [speed = 1] - <p>运行速度</p>
         */
        function changeSpeed(name: string, speed?: number): void;
        /**
         * <p>挂起指定操作集</p>
         * @param name - <p>操作集名称</p>
         */
        function suspend(name: string): void;
        /**
         * <p>恢复指定操作集</p>
         * @param name - <p>操作集名称</p>
         */
        function resume(name: string): void;
        /**
         * <p>重新读取操作集可视化配置</p>
         */
        function refresh(): void;
        /**
         * <p>获取操作集的存储单元</p>
         * @example
         * let vals = THINGX.OpSet.getStorageCell('test');
         * vals.name = 'console.error(123)';
         * THINGX.OpSet.run('test');
         * @param name - <p>操作集名称</p>
         * @returns <ul>
         * <li>存储单元集合，可直接修改，运行时生效</li>
         * </ul>
         */
        function getStorageCell(name: string): Map<string, any> | null;
        /**
         * <p>运行操作集</p>
         * @param name - <p>操作集名称</p>
         * @param runObj - <p>运行对象</p>
         * @param [runParams = {}] - <p>运行中存储单元传参</p>
         */
        function run(name: string, runObj: any, runParams?: Map<string, any>): void;
        /**
         * <p>获取指定操作集</p>
         * @param name - <p>操作集名称</p>
         * @returns <p>操作集</p>
         */
        function get(name: string): any | null;
        /**
         * <p>停止指定操作集</p>
         * @param name - <p>操作集名称</p>
         */
        function stop(name: string): void;
        /**
         * <p>设置指定操作集的运行速度</p>
         * @param name - <p>操作集名称</p>
         * @param [speed = 1] - <p>运行速度</p>
         */
        function changeSpeed(name: string, speed?: number): void;
        /**
         * <p>挂起指定操作集</p>
         * @param name - <p>操作集名称</p>
         */
        function suspend(name: string): void;
        /**
         * <p>恢复指定操作集</p>
         * @param name - <p>操作集名称</p>
         */
        function resume(name: string): void;
        /**
         * <p>重新读取操作集可视化配置</p>
         */
        function refresh(): void;
        /**
         * <p>获取操作集的存储单元</p>
         * @example
         * let vals = THINGX.OpSet.getStorageCell('test');
         * vals.name = 'console.error(123)';
         * THINGX.OpSet.run('test');
         * @param name - <p>操作集名称</p>
         * @returns <ul>
         * <li>存储单元集合，可直接修改，运行时生效</li>
         * </ul>
         */
        function getStorageCell(name: string): Map<string, any> | null;
    }
    /**
     * <p>场景控制模块</p>
     */
    namespace SceneControl {
        /**
         * <p>显示场景控制模块</p>
         */
        function show(): void;
        /**
         * <p>隐藏场景控制模块</p>
         */
        function hide(): void;
        /**
         * <p>激活指定场景控制功能</p>
         * @param name - <p>场景控制功能名称或ID</p>
         * @returns <ul>
         * <li>是否激活成功</li>
         * </ul>
         */
        function activate(name: string | string[]): boolean;
        /**
         * <p>取消激活指定场景控制功能</p>
         * @param name - <p>场景控制功能名称或ID</p>
         * @returns <ul>
         * <li>是否激活成功</li>
         * </ul>
         */
        function deactivate(name: string | string[]): boolean;
        /**
         * <p>获取已经激活的场景控制功能</p>
         * @returns <ul>
         * <li>已经激活的场景控制功能</li>
         * </ul>
         */
        function getActivated(): object[];
        /**
         * <p>刷新当前层级的场景控制功能</p>
         */
        function refresh(): Promise<boolean>;
        /**
         * <p>获取场景控制功能配置</p>
         * @param [name=] - <p>场景控制功能名称, 非空的话返回指定配置，否则返回所有配置</p>
         * @param [level = THINGX.App.currentLevel] - <p>孪生体对象/孪生体分类</p>
         * @returns <ul>
         * <li>场景控制配置</li>
         * </ul>
         */
        function getConfig(name=?: string, level?: THING.BaseObject | THINGX.CONST.DEFAULT_DIGITAL_TWIN_CLASS): object[] | any | null;
        /**
         * <p>显示场景控制模块</p>
         */
        function show(): void;
        /**
         * <p>隐藏场景控制模块</p>
         */
        function hide(): void;
        /**
         * <p>激活指定场景控制功能</p>
         * @param name - <p>场景控制功能名称或ID</p>
         * @returns <ul>
         * <li>是否激活成功</li>
         * </ul>
         */
        function activate(name: string | string[]): boolean;
        /**
         * <p>取消激活指定场景控制功能</p>
         * @param name - <p>场景控制功能名称或ID</p>
         * @returns <ul>
         * <li>是否激活成功</li>
         * </ul>
         */
        function deactivate(name: string | string[]): boolean;
        /**
         * <p>获取已经激活的场景控制功能</p>
         * @returns <ul>
         * <li>已经激活的场景控制功能</li>
         * </ul>
         */
        function getActivated(): object[];
        /**
         * <p>刷新当前层级的场景控制功能</p>
         */
        function refresh(): Promise<boolean>;
        /**
         * <p>获取场景控制功能配置</p>
         * @param [name=] - <p>场景控制功能名称, 非空的话返回指定配置，否则返回所有配置</p>
         * @param [level = THINGX.App.currentLevel] - <p>孪生体对象/孪生体分类</p>
         * @returns <ul>
         * <li>场景控制配置</li>
         * </ul>
         */
        function getConfig(name=?: string, level?: THING.BaseObject | THINGX.CONST.DEFAULT_DIGITAL_TWIN_CLASS): object[] | any | null;
    }
    /**
     * <p>后端请求模块</p>
     */
    namespace ServerInterface {
        /**
         * <p>资源数据</p>
         * @property pageNum - <p>当前的页码</p>
         * @property pageSize - <p>当前页码中数据条数</p>
         * @property totalRows - <p>数据总条数</p>
         * @property totalPages - <p>数据总页数</p>
         * @property data - <p>当前页的数据</p>
         */
        type ResourceData = {
            pageNum: number;
            pageSize: number;
            totalRows: number;
            totalPages: number;
            data: object[];
        };
        /**
         * @property INNER - <p>场景资源内部路径</p>
         * @property SCENE - <p>场景资源路径</p>
         * @property SCENE_VERSION - <p>场景版本</p>
         * @property TEXTURE - <p>贴图路径</p>
         */
        type SceneResourceData = {
            INNER: string;
            SCENE: string;
            SCENE_VERSION: string;
            TEXTURE: string;
        };
        /**
         * <p>用户信息</p>
         * @property domainId - <p>域ID</p>
         * @property id - <p>用户ID</p>
         * @property kind - <p>用户类型</p>
         * @property language - <p>本地化语言</p>
         * @property loginCode - <p>登录类型</p>
         * @property userCode - <p>用户类型</p>
         * @property userName - <p>用户名称</p>
         * @property tokenCreateTime - <p>token创建时间戳</p>
         * @property tokenValidTime - <p>token校验时间</p>
         */
        type UserData = {
            domainId: number;
            id: number;
            kind: number;
            language: string;
            loginCode: string;
            userCode: string;
            userName: string;
            tokenCreateTime: number;
            tokenValidTime: number;
        };
        /**
         * <p>查询资源列表数据</p>
         * @param params - <p>查询参数</p>
         * @param params.type - <p>资源类型/插件类型 action/chart/core/expand/theme</p>
         * @param params.pageNum - <p>分页页码</p>
         * @param params.pageSize - <p>每页条数</p>
         * @param params.searchKeyword - <p>搜索关键字</p>
         * @returns <p>返回的资源数据</p>
         */
        function getResources(params: {
            type: string | THINGX.CONST.PLUGIN_TYPE;
            pageNum: number;
            pageSize: number;
            searchKeyword: string;
        }): Promise<THINGX.ServerInterface.ResourceData>;
        /**
         * <p>查询系统配置</p>
         * @param params - <p>查询参数</p>
         * @param params.keys - <p>关键字</p>
         * @param params.type - <p>类型</p>
         * @param params.field - <p>区域</p>
         * @returns <p>返回的系统配置数据</p>
         */
        function getSystemSettings(params: {
            keys: string | string[];
            type: string;
            field: string;
        }): Promise<object>;
        /**
         * <p>通过场景CiCode获取园区数据</p>
         * @param params - <p>查询参数</p>
         * @param params.sc - <p>场景CiCode</p>
         * @returns <p>孪生体数据</p>
         */
        function getParkDataByScene(params: {
            sc: string;
        }): Promise<object[]>;
        /**
         * <p>通过分类模板代码获取孪生体</p>
         * @param params - <p>查询参数-分类模板代码 DATACENTER/PARK/BUILDING/FLOOR/ROOM/EARTH/DISTRIBUTION/STANDALONEDEVICE</p>
         * @returns <p>孪生体数据</p>
         */
        function getTwinsByTemplateCode(params: any[]): Promise<object[]>;
        /**
         * <p>通过场景CiCode获取模型库数据</p>
         * @param id - <p>场景CiCode</p>
         * @returns <p>模型库数据</p>
         */
        function getModelLibrary(id: string): Promise<Map<string, object>>;
        /**
         * <p>通过指定孪生体ID获取孪生体及下层级结构数据</p>
         * @param params - <p>查询参数</p>
         * @param params.id - <p>孪生体ID/CiCode</p>
         * @param params.depth - <p>查询深度 -1代表不限制</p>
         * @param params.endfilters - <p>结束过滤对象类型条件</p>
         * @returns <p>孪生体数据结构数据</p>
         */
        function getDigitalTwinsStructureData(params: {
            id: string;
            depth: number;
            endfilters: string[];
        }): Promise<Map<object>>;
        /**
         * <p>获取场景资源数据</p>
         * @param id - <p>场景ID/CICODE</p>
         * @returns <p>资源数据</p>
         */
        function getSceneResource(id: number): Promise<THINGX.ServerInterface.SceneResourceData>;
        /**
         * <p>获取所有logo数据</p>
         * @returns <ul>
         * <li>logo数据</li>
         * </ul>
         */
        function getLogos(): Promise<Map<object>>;
        /**
         * <p>获取场景信息</p>
         * @param identify - <p>场景ID/场景名称</p>
         * @returns <ul>
         * <li>场景信息</li>
         * </ul>
         */
        function getSceneInfo(identify: string): Promise<object>;
        /**
         * <p>获取用户信息详细</p>
         * @returns <p>用户信息</p>
         */
        function getUserDetailInfo(用户ID: number): Promise<object>;
        /**
         * <p>资源数据</p>
         * @property pageNum - <p>当前的页码</p>
         * @property pageSize - <p>当前页码中数据条数</p>
         * @property totalRows - <p>数据总条数</p>
         * @property totalPages - <p>数据总页数</p>
         * @property data - <p>当前页的数据</p>
         */
        type ResourceData = {
            pageNum: number;
            pageSize: number;
            totalRows: number;
            totalPages: number;
            data: object[];
        };
        /**
         * @property INNER - <p>场景资源内部路径</p>
         * @property SCENE - <p>场景资源路径</p>
         * @property SCENE_VERSION - <p>场景版本</p>
         * @property TEXTURE - <p>贴图路径</p>
         */
        type SceneResourceData = {
            INNER: string;
            SCENE: string;
            SCENE_VERSION: string;
            TEXTURE: string;
        };
        /**
         * <p>用户信息</p>
         * @property domainId - <p>域ID</p>
         * @property id - <p>用户ID</p>
         * @property kind - <p>用户类型</p>
         * @property language - <p>本地化语言</p>
         * @property loginCode - <p>登录类型</p>
         * @property userCode - <p>用户类型</p>
         * @property userName - <p>用户名称</p>
         * @property tokenCreateTime - <p>token创建时间戳</p>
         * @property tokenValidTime - <p>token校验时间</p>
         */
        type UserData = {
            domainId: number;
            id: number;
            kind: number;
            language: string;
            loginCode: string;
            userCode: string;
            userName: string;
            tokenCreateTime: number;
            tokenValidTime: number;
        };
        /**
         * <p>查询资源列表数据</p>
         * @param params - <p>查询参数</p>
         * @param params.type - <p>资源类型/插件类型 action/chart/core/expand/theme</p>
         * @param params.pageNum - <p>分页页码</p>
         * @param params.pageSize - <p>每页条数</p>
         * @param params.searchKeyword - <p>搜索关键字</p>
         * @returns <p>返回的资源数据</p>
         */
        function getResources(params: {
            type: string | THINGX.CONST.PLUGIN_TYPE;
            pageNum: number;
            pageSize: number;
            searchKeyword: string;
        }): Promise<THINGX.ServerInterface.ResourceData>;
        /**
         * <p>查询系统配置</p>
         * @param params - <p>查询参数</p>
         * @param params.keys - <p>关键字</p>
         * @param params.type - <p>类型</p>
         * @param params.field - <p>区域</p>
         * @returns <p>返回的系统配置数据</p>
         */
        function getSystemSettings(params: {
            keys: string | string[];
            type: string;
            field: string;
        }): Promise<object>;
        /**
         * <p>通过场景CiCode获取园区数据</p>
         * @param params - <p>查询参数</p>
         * @param params.sc - <p>场景CiCode</p>
         * @returns <p>孪生体数据</p>
         */
        function getParkDataByScene(params: {
            sc: string;
        }): Promise<object[]>;
        /**
         * <p>通过分类模板代码获取孪生体</p>
         * @param params - <p>查询参数-分类模板代码 DATACENTER/PARK/BUILDING/FLOOR/ROOM/EARTH/DISTRIBUTION/STANDALONEDEVICE</p>
         * @returns <p>孪生体数据</p>
         */
        function getTwinsByTemplateCode(params: any[]): Promise<object[]>;
        /**
         * <p>通过场景CiCode获取模型库数据</p>
         * @param id - <p>场景CiCode</p>
         * @returns <p>模型库数据</p>
         */
        function getModelLibrary(id: string): Promise<Map<string, object>>;
        /**
         * <p>通过指定孪生体ID获取孪生体及下层级结构数据</p>
         * @param params - <p>查询参数</p>
         * @param params.id - <p>孪生体ID/CiCode</p>
         * @param params.depth - <p>查询深度 -1代表不限制</p>
         * @param params.endfilters - <p>结束过滤对象类型条件</p>
         * @returns <p>孪生体数据结构数据</p>
         */
        function getDigitalTwinsStructureData(params: {
            id: string;
            depth: number;
            endfilters: string[];
        }): Promise<Map<object>>;
        /**
         * <p>获取场景资源数据</p>
         * @param id - <p>场景ID/CICODE</p>
         * @returns <p>资源数据</p>
         */
        function getSceneResource(id: number): Promise<THINGX.ServerInterface.SceneResourceData>;
        /**
         * <p>获取所有logo数据</p>
         * @returns <ul>
         * <li>logo数据</li>
         * </ul>
         */
        function getLogos(): Promise<Map<object>>;
        /**
         * <p>获取场景信息</p>
         * @param identify - <p>场景ID/场景名称</p>
         * @returns <ul>
         * <li>场景信息</li>
         * </ul>
         */
        function getSceneInfo(identify: string): Promise<object>;
        /**
         * <p>获取用户信息详细</p>
         * @returns <p>用户信息</p>
         */
        function getUserDetailInfo(用户ID: number): Promise<object>;
    }
    /**
     * <p>定时器模块</p>
     */
    namespace Timer {
        /**
         * <p>增加全局延时执行函数</p>
         * @example
         * THINGX.Timer.add("test", 1, false, () => {} );
         * @param name - <p>延时执行函数标识</p>
         * @param func - <p>需要执行的函数</p>
         * @param [delay = 0] - <p>延时多久，单位秒</p>
         * @param [isLoop = false] - <p>是否循环执行函数</p>
         * @param [list = []] - <p>执行函数传参</p>
         */
        function add(name: string, func: (...params: any[]) => any, delay?: number, isLoop?: boolean, list?: any[]): void;
        /**
         * <p>删除全局延时执行函数</p>
         * @example
         * THINGX.Timer.remove("test");
         * @param name - <p>延时执行函数标识</p>
         */
        function remove(name: string): void;
        /**
         * <p>移除全局所有延时执行函数</p>
         */
        function clear(): void;
        /**
         * <p>获取全局延时函数配置</p>
         * @example
         * THINGX.Timer.has("test");
         * @param name - <p>延时执行函数标识</p>
         * @returns <ul>
         * <li>有则返回增加时配置，否则返回undefined</li>
         * </ul>
         */
        function get(name: string): any[] | null;
        /**
         * <p>为对象添加延时执行函数</p>
         * @example
         * let obj = {
         count: 0
         add: function(val) {
           this.count += val;
         }
        }
        // 实现每一秒obj.mycount加1
        THINGX.Timer.addWithObject('example', obj, 'add', 1, false, [5]);
         * @param name - <p>延时执行函数标识，作用域为添加的所有对象</p>
         * @param obj - <p>延时对象</p>
         * @param methodName - <p>需要延时的方法名</p>
         * @param [delay = 0] - <p>延时执行的时间,单位秒</p>
         * @param [isLoop = false] - <p>是否循环</p>
         * @param [list = []] - <p>执行函数传参</p>
         */
        function addWithObject(name: any, obj: any, methodName: string, delay?: number, isLoop?: boolean, list?: any[]): void;
        /**
         * <p>移除对象上延时函数</p>
         * @example
         * THINGX.Timer.removeWithObject('example');
         * @param name - <p>延时执行函数标识，作用域为添加的所有对象</p>
         */
        function removeWithObject(name: string): void;
        /**
         * <p>移除所有对象上的延时函数</p>
         */
        function clearWithObject(): void;
        /**
         * <p>获取在对象上增加的延时函数配置</p>
         * @param name - <p>延时执行函数标识，作用域为添加的所有对象</p>
         * @returns <ul>
         * <li>有则返回增加时配置，否则返回undefined</li>
         * </ul>
         */
        function getWithObject(name: string): any[] | null;
        /**
         * <p>增加全局延时执行函数</p>
         * @example
         * THINGX.Timer.add("test", 1, false, () => {} );
         * @param name - <p>延时执行函数标识</p>
         * @param func - <p>需要执行的函数</p>
         * @param [delay = 0] - <p>延时多久，单位秒</p>
         * @param [isLoop = false] - <p>是否循环执行函数</p>
         * @param [list = []] - <p>执行函数传参</p>
         */
        function add(name: string, func: (...params: any[]) => any, delay?: number, isLoop?: boolean, list?: any[]): void;
        /**
         * <p>删除全局延时执行函数</p>
         * @example
         * THINGX.Timer.remove("test");
         * @param name - <p>延时执行函数标识</p>
         */
        function remove(name: string): void;
        /**
         * <p>移除全局所有延时执行函数</p>
         */
        function clear(): void;
        /**
         * <p>获取全局延时函数配置</p>
         * @example
         * THINGX.Timer.has("test");
         * @param name - <p>延时执行函数标识</p>
         * @returns <ul>
         * <li>有则返回增加时配置，否则返回undefined</li>
         * </ul>
         */
        function get(name: string): any[] | null;
        /**
         * <p>为对象添加延时执行函数</p>
         * @example
         * let obj = {
         count: 0
         add: function(val) {
           this.count += val;
         }
        }
        // 实现每一秒obj.mycount加1
        THINGX.Timer.addWithObject('example', obj, 'add', 1, false, [5]);
         * @param name - <p>延时执行函数标识，作用域为添加的所有对象</p>
         * @param obj - <p>延时对象</p>
         * @param methodName - <p>需要延时的方法名</p>
         * @param [delay = 0] - <p>延时执行的时间,单位秒</p>
         * @param [isLoop = false] - <p>是否循环</p>
         * @param [list = []] - <p>执行函数传参</p>
         */
        function addWithObject(name: any, obj: any, methodName: string, delay?: number, isLoop?: boolean, list?: any[]): void;
        /**
         * <p>移除对象上延时函数</p>
         * @example
         * THINGX.Timer.removeWithObject('example');
         * @param name - <p>延时执行函数标识，作用域为添加的所有对象</p>
         */
        function removeWithObject(name: string): void;
        /**
         * <p>移除所有对象上的延时函数</p>
         */
        function clearWithObject(): void;
        /**
         * <p>获取在对象上增加的延时函数配置</p>
         * @param name - <p>延时执行函数标识，作用域为添加的所有对象</p>
         * @returns <ul>
         * <li>有则返回增加时配置，否则返回undefined</li>
         * </ul>
         */
        function getWithObject(name: string): any[] | null;
    }
    /**
     * <p>UI模块</p>
     */
    namespace UI {
        /**
         * <p>加载UI模块</p>
         */
        namespace Loading {
            /**
             * <p>创建并显示应用loading ui</p>
             * @param [url] - <p>资源url路径，默认使用系统自带</p>
             * @param [type = gif] - <p>类型 gif/sequence/video</p>
             */
            function show(url?: string, type?: string): void;
            /**
             * <p>隐藏并销毁应用loading ui</p>
             */
            function hide(): void;
            /**
             * <p>创建并显示应用loading ui</p>
             * @param [url] - <p>资源url路径，默认使用系统自带</p>
             * @param [type = gif] - <p>类型 gif/sequence/video</p>
             */
            function show(url?: string, type?: string): void;
            /**
             * <p>隐藏并销毁应用loading ui</p>
             */
            function hide(): void;
        }
        /**
         * <p>信息模块</p>
         */
        namespace Message {
            /**
             * <p>信息配置</p>
             * @property [content] - <p>提示内容</p>
             * @property [onClose] - <p>关闭时的回调</p>
             * @property [closable = false] - <p>是否显示关闭按钮</p>
             * @property [duration = 1.5] - <p>默认自动关闭的延时，单位秒</p>
             */
            type Config = {
                content?: string;
                onClose?: (...params: any[]) => any;
                closable?: boolean;
                duration?: number;
            };
            /**
             * <p>信息配置</p>
             * @property [content] - <p>提示内容</p>
             * @property [onClose] - <p>关闭时的回调</p>
             * @property [closable = false] - <p>是否显示关闭按钮</p>
             * @property [duration = 1.5] - <p>默认自动关闭的延时，单位秒</p>
             */
            type Config = {
                content?: string;
                onClose?: (...params: any[]) => any;
                closable?: boolean;
                duration?: number;
            };
            /**
             * <p>显示提示信息</p>
             * @example
             * THINGX.Message.info('提示信息');
             * @param config - <p>MessageConfig为相关配置,string为待显示的内容</p>
             */
            function info(config: THINGX.Message.Config | string): void;
            /**
             * <p>显示成功信息</p>
             * @param config - <p>MessageConfig为相关配置,string为待显示的内容</p>
             */
            function success(config: THINGX.Message.Config | string): void;
            /**
             * <p>显示警告信息</p>
             * @param config - <p>MessageConfig为相关配置,string为待显示的内容</p>
             */
            function warning(config: THINGX.Message.Config | string): void;
            /**
             * <p>显示错误信息</p>
             * @example
             * THINGX.Message.error({
             content: '错误信息',
             onClose: () => {console.error('错误信息 end')},
             duration: 100,
             closable: true,
            });
             * @param config - <p>MessageConfig为相关配置,string为待显示的内容</p>
             */
            function error(config: THINGX.Message.Config | string): void;
            /**
             * <p>显示加载信息</p>
             * @param config - <p>MessageConfig为相关配置,string为待显示的内容</p>
             */
            function loading(config: THINGX.Message.Config | string): void;
            /**
             * <p>配置信息提示</p>
             * @param config - <p>MessageConfig为相关配置</p>
             */
            function config(config: THINGX.Message.Config): void;
            /**
             * <p>信息配置</p>
             * @property [content] - <p>提示内容</p>
             * @property [onClose] - <p>关闭时的回调</p>
             * @property [closable = false] - <p>是否显示关闭按钮</p>
             * @property [duration = 1.5] - <p>默认自动关闭的延时，单位秒</p>
             */
            type Config = {
                content?: string;
                onClose?: (...params: any[]) => any;
                closable?: boolean;
                duration?: number;
            };
            /**
             * <p>信息配置</p>
             * @property [content] - <p>提示内容</p>
             * @property [onClose] - <p>关闭时的回调</p>
             * @property [closable = false] - <p>是否显示关闭按钮</p>
             * @property [duration = 1.5] - <p>默认自动关闭的延时，单位秒</p>
             */
            type Config = {
                content?: string;
                onClose?: (...params: any[]) => any;
                closable?: boolean;
                duration?: number;
            };
            /**
             * <p>显示提示信息</p>
             * @example
             * THINGX.Message.info('提示信息');
             * @param config - <p>MessageConfig为相关配置,string为待显示的内容</p>
             */
            function info(config: THINGX.Message.Config | string): void;
            /**
             * <p>显示成功信息</p>
             * @param config - <p>MessageConfig为相关配置,string为待显示的内容</p>
             */
            function success(config: THINGX.Message.Config | string): void;
            /**
             * <p>显示警告信息</p>
             * @param config - <p>MessageConfig为相关配置,string为待显示的内容</p>
             */
            function warning(config: THINGX.Message.Config | string): void;
            /**
             * <p>显示错误信息</p>
             * @example
             * THINGX.Message.error({
             content: '错误信息',
             onClose: () => {console.error('错误信息 end')},
             duration: 100,
             closable: true,
            });
             * @param config - <p>MessageConfig为相关配置,string为待显示的内容</p>
             */
            function error(config: THINGX.Message.Config | string): void;
            /**
             * <p>显示加载信息</p>
             * @param config - <p>MessageConfig为相关配置,string为待显示的内容</p>
             */
            function loading(config: THINGX.Message.Config | string): void;
            /**
             * <p>配置信息提示</p>
             * @param config - <p>MessageConfig为相关配置</p>
             */
            function config(config: THINGX.Message.Config): void;
        }
        /**
         * <p>加载UI模块</p>
         */
        namespace Loading {
            /**
             * <p>创建并显示应用loading ui</p>
             * @param [url] - <p>资源url路径，默认使用系统自带</p>
             * @param [type = gif] - <p>类型 gif/sequence/video</p>
             */
            function show(url?: string, type?: string): void;
            /**
             * <p>隐藏并销毁应用loading ui</p>
             */
            function hide(): void;
            /**
             * <p>创建并显示应用loading ui</p>
             * @param [url] - <p>资源url路径，默认使用系统自带</p>
             * @param [type = gif] - <p>类型 gif/sequence/video</p>
             */
            function show(url?: string, type?: string): void;
            /**
             * <p>隐藏并销毁应用loading ui</p>
             */
            function hide(): void;
        }
        /**
         * <p>信息模块</p>
         */
        namespace Message {
            /**
             * <p>信息配置</p>
             * @property [content] - <p>提示内容</p>
             * @property [onClose] - <p>关闭时的回调</p>
             * @property [closable = false] - <p>是否显示关闭按钮</p>
             * @property [duration = 1.5] - <p>默认自动关闭的延时，单位秒</p>
             */
            type Config = {
                content?: string;
                onClose?: (...params: any[]) => any;
                closable?: boolean;
                duration?: number;
            };
            /**
             * <p>信息配置</p>
             * @property [content] - <p>提示内容</p>
             * @property [onClose] - <p>关闭时的回调</p>
             * @property [closable = false] - <p>是否显示关闭按钮</p>
             * @property [duration = 1.5] - <p>默认自动关闭的延时，单位秒</p>
             */
            type Config = {
                content?: string;
                onClose?: (...params: any[]) => any;
                closable?: boolean;
                duration?: number;
            };
            /**
             * <p>显示提示信息</p>
             * @example
             * THINGX.Message.info('提示信息');
             * @param config - <p>MessageConfig为相关配置,string为待显示的内容</p>
             */
            function info(config: THINGX.Message.Config | string): void;
            /**
             * <p>显示成功信息</p>
             * @param config - <p>MessageConfig为相关配置,string为待显示的内容</p>
             */
            function success(config: THINGX.Message.Config | string): void;
            /**
             * <p>显示警告信息</p>
             * @param config - <p>MessageConfig为相关配置,string为待显示的内容</p>
             */
            function warning(config: THINGX.Message.Config | string): void;
            /**
             * <p>显示错误信息</p>
             * @example
             * THINGX.Message.error({
             content: '错误信息',
             onClose: () => {console.error('错误信息 end')},
             duration: 100,
             closable: true,
            });
             * @param config - <p>MessageConfig为相关配置,string为待显示的内容</p>
             */
            function error(config: THINGX.Message.Config | string): void;
            /**
             * <p>显示加载信息</p>
             * @param config - <p>MessageConfig为相关配置,string为待显示的内容</p>
             */
            function loading(config: THINGX.Message.Config | string): void;
            /**
             * <p>配置信息提示</p>
             * @param config - <p>MessageConfig为相关配置</p>
             */
            function config(config: THINGX.Message.Config): void;
            /**
             * <p>信息配置</p>
             * @property [content] - <p>提示内容</p>
             * @property [onClose] - <p>关闭时的回调</p>
             * @property [closable = false] - <p>是否显示关闭按钮</p>
             * @property [duration = 1.5] - <p>默认自动关闭的延时，单位秒</p>
             */
            type Config = {
                content?: string;
                onClose?: (...params: any[]) => any;
                closable?: boolean;
                duration?: number;
            };
            /**
             * <p>信息配置</p>
             * @property [content] - <p>提示内容</p>
             * @property [onClose] - <p>关闭时的回调</p>
             * @property [closable = false] - <p>是否显示关闭按钮</p>
             * @property [duration = 1.5] - <p>默认自动关闭的延时，单位秒</p>
             */
            type Config = {
                content?: string;
                onClose?: (...params: any[]) => any;
                closable?: boolean;
                duration?: number;
            };
            /**
             * <p>显示提示信息</p>
             * @example
             * THINGX.Message.info('提示信息');
             * @param config - <p>MessageConfig为相关配置,string为待显示的内容</p>
             */
            function info(config: THINGX.Message.Config | string): void;
            /**
             * <p>显示成功信息</p>
             * @param config - <p>MessageConfig为相关配置,string为待显示的内容</p>
             */
            function success(config: THINGX.Message.Config | string): void;
            /**
             * <p>显示警告信息</p>
             * @param config - <p>MessageConfig为相关配置,string为待显示的内容</p>
             */
            function warning(config: THINGX.Message.Config | string): void;
            /**
             * <p>显示错误信息</p>
             * @example
             * THINGX.Message.error({
             content: '错误信息',
             onClose: () => {console.error('错误信息 end')},
             duration: 100,
             closable: true,
            });
             * @param config - <p>MessageConfig为相关配置,string为待显示的内容</p>
             */
            function error(config: THINGX.Message.Config | string): void;
            /**
             * <p>显示加载信息</p>
             * @param config - <p>MessageConfig为相关配置,string为待显示的内容</p>
             */
            function loading(config: THINGX.Message.Config | string): void;
            /**
             * <p>配置信息提示</p>
             * @param config - <p>MessageConfig为相关配置</p>
             */
            function config(config: THINGX.Message.Config): void;
        }
    }
    /**
     * <p>工具模块</p>
     */
    namespace Utils {
        /**
         * <p>DOM相关操作</p>
         */
        namespace DOM {
            /**
             * <p>动态创建style标签</p>
             * @param styleText - <p>style 标签内容</p>
             * @param id - <p>style标签id</p>
             */
            function addStyleTag(styleText: string, id: string): void;
            /**
             * <p>删除style标签</p>
             * @param id - <p>style标签id</p>
             */
            function removeStyleTag(id: string): void;
            /**
             * <p>动态加载js文件</p>
             * @param data - <p>加载源</p>
             * @param config - <p>加载配置</p>
             * @param [config.loadType = THINGX.CONST.JS_LOAD_TYPE.EXEC] - <p>加载脚本方式</p>
             * @param [config.srcType = THINGX.CONST.JS_SRC_TYPE.URL] - <p>加载脚本源类型</p>
             * @param undefined - <p>是否加载成功</p>
             */
            function dynamicLoadJS(data: string, config: {
                loadType?: THINGX.CONST.JS_LOAD_YPE;
                srcType?: THINGX.CONST.JS_SRC_TYPE;
            }): void;
            /**
             * <p>动态创建style标签</p>
             * @param styleText - <p>style 标签内容</p>
             * @param id - <p>style标签id</p>
             */
            function addStyleTag(styleText: string, id: string): void;
            /**
             * <p>删除style标签</p>
             * @param id - <p>style标签id</p>
             */
            function removeStyleTag(id: string): void;
            /**
             * <p>动态加载js文件</p>
             * @param data - <p>加载源</p>
             * @param config - <p>加载配置</p>
             * @param [config.loadType = THINGX.CONST.JS_LOAD_TYPE.EXEC] - <p>加载脚本方式</p>
             * @param [config.srcType = THINGX.CONST.JS_SRC_TYPE.URL] - <p>加载脚本源类型</p>
             * @param undefined - <p>是否加载成功</p>
             */
            function dynamicLoadJS(data: string, config: {
                loadType?: THINGX.CONST.JS_LOAD_YPE;
                srcType?: THINGX.CONST.JS_SRC_TYPE;
            }): void;
        }
        /**
         * <p>孪生体搜索模块</p>
         */
        namespace Search {
            /**
             * <p>显示搜索物体</p>
             * @param [digitalTwins = []] - <p>孪生体列表</p>
             * @param [unknownObjects = []] - <p>未知物体列表</p>
             */
            function show(digitalTwins?: THING.BaseObject[], unknownObjects?: any[]): void;
            /**
             * <p>清空搜索结果</p>
             * @param [config = {}] - <p>清空配置</p>
             * @param config.continueSearch - <p>是否继续搜索</p>
             */
            function clear(config?: {
                continueSearch: boolean;
            }): void;
            /**
             * <p>显示搜索物体</p>
             * @param [digitalTwins = []] - <p>孪生体列表</p>
             * @param [unknownObjects = []] - <p>未知物体列表</p>
             */
            function show(digitalTwins?: THING.BaseObject[], unknownObjects?: any[]): void;
            /**
             * <p>清空搜索结果</p>
             * @param [config = {}] - <p>清空配置</p>
             * @param config.continueSearch - <p>是否继续搜索</p>
             */
            function clear(config?: {
                continueSearch: boolean;
            }): void;
        }
        /**
         * <p>三维空间相关操作模块</p>
         */
        namespace Space {
            /**
             * <p>查询在以center为球心,radius为半径的球内的目标对象</p>
             * @param filter - <p>筛选条件</p>
             * @param center - <p>球心坐标</p>
             * @param radius - <p>球半径</p>
             * @param [queryLevel = THINGX.App.currentLevel] - <p>查询层级</p>
             */
            function queryBySphere(filter: string, center: number[], radius: number, queryLevel?: THING.BaseObject): THING.Selector;
            /**
             * <p>计算孪生体到摄像机的距离</p>
             * @param digitalTwin - <p>目标孪生体</p>
             * @param isRecursive - <p>是否遍历孩子</p>
             */
            function getDistanceFromCamera(digitalTwin: THING.BaseObject, isRecursive: boolean): number;
            /**
             * <p>查询在以center为球心,radius为半径的球内的目标对象</p>
             * @param filter - <p>筛选条件</p>
             * @param center - <p>球心坐标</p>
             * @param radius - <p>球半径</p>
             * @param [queryLevel = THINGX.App.currentLevel] - <p>查询层级</p>
             */
            function queryBySphere(filter: string, center: number[], radius: number, queryLevel?: THING.BaseObject): THING.Selector;
            /**
             * <p>计算孪生体到摄像机的距离</p>
             * @param digitalTwin - <p>目标孪生体</p>
             * @param isRecursive - <p>是否遍历孩子</p>
             */
            function getDistanceFromCamera(digitalTwin: THING.BaseObject, isRecursive: boolean): number;
        }
        /**
         * <p>获取资源全路径</p>
         */
        function getResourceFullUrl(url: string): string;
        /**
         * <p>通过模型型号获取模型库信息</p>
         */
        function getModelProductInfo(模型型号: string): any | null;
        /**
         * <p>加载孪生体资源</p>
         */
        function loadResources(digitalTwins: THING.BaseObject[] | THING.BaseObject): Promise<undefined>;
        /**
         * <p>将孪生体注册条件转换成ThingJS表达式语法</p>
         */
        function regConditonToThingJSQueryExpression(condition: any): string;
        /**
         * <p>获取所有孪生体集合以及其查询条件</p>
         * @param [isReload = false] - <p>是否重新请求后端接口刷新</p>
         */
        function getAllDigitalTwinCollect(isReload?: boolean): Promise<Map<string, object>>;
        /**
         * <p>生成uuid</p>
         * @param [separator] - <p>分隔符</p>
         */
        function createUUID(separator?: string): string;
        /**
         * <p>DOM相关操作</p>
         */
        namespace DOM {
            /**
             * <p>动态创建style标签</p>
             * @param styleText - <p>style 标签内容</p>
             * @param id - <p>style标签id</p>
             */
            function addStyleTag(styleText: string, id: string): void;
            /**
             * <p>删除style标签</p>
             * @param id - <p>style标签id</p>
             */
            function removeStyleTag(id: string): void;
            /**
             * <p>动态加载js文件</p>
             * @param data - <p>加载源</p>
             * @param config - <p>加载配置</p>
             * @param [config.loadType = THINGX.CONST.JS_LOAD_TYPE.EXEC] - <p>加载脚本方式</p>
             * @param [config.srcType = THINGX.CONST.JS_SRC_TYPE.URL] - <p>加载脚本源类型</p>
             * @param undefined - <p>是否加载成功</p>
             */
            function dynamicLoadJS(data: string, config: {
                loadType?: THINGX.CONST.JS_LOAD_YPE;
                srcType?: THINGX.CONST.JS_SRC_TYPE;
            }): void;
            /**
             * <p>动态创建style标签</p>
             * @param styleText - <p>style 标签内容</p>
             * @param id - <p>style标签id</p>
             */
            function addStyleTag(styleText: string, id: string): void;
            /**
             * <p>删除style标签</p>
             * @param id - <p>style标签id</p>
             */
            function removeStyleTag(id: string): void;
            /**
             * <p>动态加载js文件</p>
             * @param data - <p>加载源</p>
             * @param config - <p>加载配置</p>
             * @param [config.loadType = THINGX.CONST.JS_LOAD_TYPE.EXEC] - <p>加载脚本方式</p>
             * @param [config.srcType = THINGX.CONST.JS_SRC_TYPE.URL] - <p>加载脚本源类型</p>
             * @param undefined - <p>是否加载成功</p>
             */
            function dynamicLoadJS(data: string, config: {
                loadType?: THINGX.CONST.JS_LOAD_YPE;
                srcType?: THINGX.CONST.JS_SRC_TYPE;
            }): void;
        }
        /**
         * <p>孪生体搜索模块</p>
         */
        namespace Search {
            /**
             * <p>显示搜索物体</p>
             * @param [digitalTwins = []] - <p>孪生体列表</p>
             * @param [unknownObjects = []] - <p>未知物体列表</p>
             */
            function show(digitalTwins?: THING.BaseObject[], unknownObjects?: any[]): void;
            /**
             * <p>清空搜索结果</p>
             * @param [config = {}] - <p>清空配置</p>
             * @param config.continueSearch - <p>是否继续搜索</p>
             */
            function clear(config?: {
                continueSearch: boolean;
            }): void;
            /**
             * <p>显示搜索物体</p>
             * @param [digitalTwins = []] - <p>孪生体列表</p>
             * @param [unknownObjects = []] - <p>未知物体列表</p>
             */
            function show(digitalTwins?: THING.BaseObject[], unknownObjects?: any[]): void;
            /**
             * <p>清空搜索结果</p>
             * @param [config = {}] - <p>清空配置</p>
             * @param config.continueSearch - <p>是否继续搜索</p>
             */
            function clear(config?: {
                continueSearch: boolean;
            }): void;
        }
        /**
         * <p>三维空间相关操作模块</p>
         */
        namespace Space {
            /**
             * <p>查询在以center为球心,radius为半径的球内的目标对象</p>
             * @param filter - <p>筛选条件</p>
             * @param center - <p>球心坐标</p>
             * @param radius - <p>球半径</p>
             * @param [queryLevel = THINGX.App.currentLevel] - <p>查询层级</p>
             */
            function queryBySphere(filter: string, center: number[], radius: number, queryLevel?: THING.BaseObject): THING.Selector;
            /**
             * <p>计算孪生体到摄像机的距离</p>
             * @param digitalTwin - <p>目标孪生体</p>
             * @param isRecursive - <p>是否遍历孩子</p>
             */
            function getDistanceFromCamera(digitalTwin: THING.BaseObject, isRecursive: boolean): number;
            /**
             * <p>查询在以center为球心,radius为半径的球内的目标对象</p>
             * @param filter - <p>筛选条件</p>
             * @param center - <p>球心坐标</p>
             * @param radius - <p>球半径</p>
             * @param [queryLevel = THINGX.App.currentLevel] - <p>查询层级</p>
             */
            function queryBySphere(filter: string, center: number[], radius: number, queryLevel?: THING.BaseObject): THING.Selector;
            /**
             * <p>计算孪生体到摄像机的距离</p>
             * @param digitalTwin - <p>目标孪生体</p>
             * @param isRecursive - <p>是否遍历孩子</p>
             */
            function getDistanceFromCamera(digitalTwin: THING.BaseObject, isRecursive: boolean): number;
        }
        /**
         * <p>获取资源全路径</p>
         */
        function getResourceFullUrl(url: string): string;
        /**
         * <p>通过模型型号获取模型库信息</p>
         */
        function getModelProductInfo(模型型号: string): any | null;
        /**
         * <p>加载孪生体资源</p>
         */
        function loadResources(digitalTwins: THING.BaseObject[] | THING.BaseObject): Promise<undefined>;
        /**
         * <p>将孪生体注册条件转换成ThingJS表达式语法</p>
         */
        function regConditonToThingJSQueryExpression(condition: any): string;
        /**
         * <p>获取所有孪生体集合以及其查询条件</p>
         * @param [isReload = false] - <p>是否重新请求后端接口刷新</p>
         */
        function getAllDigitalTwinCollect(isReload?: boolean): Promise<Map<string, object>>;
        /**
         * <p>生成uuid</p>
         * @param [separator] - <p>分隔符</p>
         */
        function createUUID(separator?: string): string;
    }
    /**
     * <p>视频流模块</p>
     */
    namespace VideoStream {
        /**
         * <p>获取视频流服务集合</p>
         */
        function getServices(): Map<string, object>;
        /**
         * <p>通过视频流服务创建激活一个监视</p>
         * @returns <ul>
         * <li>监视实例</li>
         * </ul>
         */
        function activateSurveillance(config: any, serial: string, code: string, uri: string, width: string, height: height): any;
        /**
         * <p>取消激活监视</p>
         * @param surveillance - <p>监视实例</p>
         */
        function deactivateSurveillance(surveillance: any): void;
        /**
         * <p>获取视频流服务集合</p>
         */
        function getServices(): Map<string, object>;
        /**
         * <p>通过视频流服务创建激活一个监视</p>
         * @returns <ul>
         * <li>监视实例</li>
         * </ul>
         */
        function activateSurveillance(config: any, serial: string, code: string, uri: string, width: string, height: height): any;
        /**
         * <p>取消激活监视</p>
         * @param surveillance - <p>监视实例</p>
         */
        function deactivateSurveillance(surveillance: any): void;
    }
    /**
     * <p>视点动画模块</p>
     */
    namespace ViewPoint {
        /**
         * <p>显示视点动画</p>
         */
        function show(): void;
        /**
         * <p>隐藏视点动画</p>
         */
        function hide(): void;
        /**
         * <p>播放视点动画</p>
         * @param name - <p>视点动画名称</p>
         * @returns <ul>
         * <li>视点播放是否成功</li>
         * </ul>
         */
        function play(name: string): Promise<boolean>;
        /**
         * <p>挂起当前视点动画</p>
         */
        function suspend(): void;
        /**
         * <p>恢复当前视点动画</p>
         */
        function resume(): void;
        /**
         * <p>停止播放当前视点动画</p>
         */
        function stop(): void;
        /**
         * <p>增加视点动画</p>
         * @param name - <p>视点动画名称</p>
         * @returns <ul>
         * <li>是否增加成功</li>
         * </ul>
         */
        function add(name: string): Promise<boolean>;
        /**
         * <p>获取视点动画</p>
         * @param name - <p>视点动画名称</p>
         */
        function get(name: string): any;
        /**
         * <p>删除视点动画</p>
         * @param name - <p>视点动画名称</p>
         * @returns <ul>
         * <li>是否删除成功</li>
         * </ul>
         */
        function remove(name: string): Promise<boolean>;
        /**
         * <p>修改视点动画名称</p>
         * @param oldName - <p>视点动画旧名称</p>
         * @param newName - <p>视点动画新名称</p>
         * @returns <ul>
         * <li>是否重命名成功</li>
         * </ul>
         */
        function reName(oldName: string, newName: string): Promise<boolean>;
        /**
         * <p>增加视点动画节点</p>
         * @param name - <p>视点动画名称</p>
         * @param [params] - <p>节点参数</p>
         * @returns <ul>
         * <li>是否增加成功</li>
         * </ul>
         */
        function addNode(name: string, params?: any): Promise<boolean>;
        /**
         * <p>更新视点动画节点</p>
         * @param name - <p>视点动画名称</p>
         * @param index - <p>被更新节点索引</p>
         * @param params - <p>节点参数</p>
         * @returns <ul>
         * <li>是否更新成功</li>
         * </ul>
         */
        function updateNode(name: string, index: number, params: any): Promise<boolean>;
        /**
         * <p>截取视点动画节点视角</p>
         * @param name - <p>视点动画名称</p>
         * @param index - <p>节点索引</p>
         * @returns <ul>
         * <li>是否截取成功</li>
         * </ul>
         */
        function snippingNodeView(name: string, index: number): Promise<boolean>;
        /**
         * <p>删除视点动画中节点</p>
         * @param name - <p>视点动画名称</p>
         * @param index - <p>节点索引</p>
         * @returns <ul>
         * <li>是否删除成功</li>
         * </ul>
         */
        function removeNode(name: string, index: number): Promise<boolean>;
        /**
         * <p>预览视点动画节点</p>
         * @param name - <p>视点动画名称</p>
         * @param index - <p>节点索引</p>
         */
        function previewNode(name: string, index: number): void;
        /**
         * <p>设置视点动画循环模式</p>
         */
        function setLoopPlayMode(type: string): void;
        /**
         * <p>激活视点动画声音</p>
         */
        function activateSound(): void;
        /**
         * <p>取消激活视点动画声音</p>
         */
        function deactivatedSound(): void;
        /**
         * <p>增加视点模块</p>
         * @example
         * let module = {};
         * module.snapshot = () => {
         *     // 记录的数据
         *     return {name: 'name'}
         * };
         * // 恢复执行动作
         * module.recover = (data) => {};
         * module.isRecoverOk = () => {
         *     return true;
         * };
         * module.recoverCleardata) => {};
         * THINGX.ViewPoint.addModule('add-module', module);
         * @param name - <p>模块名称</p>
         * @param module - <p>模块实现，需实现方法 snapshot-记录视点/recover-恢复视点/isRecoverOk-是否恢复完成/recoverClear-恢复清理</p>
         * @param [index] - <p>增加位置，默认增加到当前视点模块末尾</p>
         * @returns <ul>
         * <li>是否增加成功</li>
         * </ul>
         */
        function addModule(name: string, module: any, index?: number): boolean;
        /**
         * <p>获取所有的视点动画列表</p>
         */
        function getList(): Promise<object[]>;
        /**
         * <p>展示视点动画列表，需要在视点动画模块显示状态</p>
         * @param name - <p>视点动画名称</p>
         */
        function showList(name: string): object[];
        /**
         * <p>获取视点动画编辑列表</p>
         * @param name - <p>视点动画名称</p>
         */
        function getEditList(name: string): Promise<object[]>;
        /**
         * <p>展示视点动画编辑列表，需要在视点动画模块显示状态</p>
         * @param name - <p>视点动画名称</p>
         */
        function showEditList(name: string): object[];
        /**
         * <p>显示视点动画</p>
         */
        function show(): void;
        /**
         * <p>隐藏视点动画</p>
         */
        function hide(): void;
        /**
         * <p>播放视点动画</p>
         * @param name - <p>视点动画名称</p>
         * @returns <ul>
         * <li>视点播放是否成功</li>
         * </ul>
         */
        function play(name: string): Promise<boolean>;
        /**
         * <p>挂起当前视点动画</p>
         */
        function suspend(): void;
        /**
         * <p>恢复当前视点动画</p>
         */
        function resume(): void;
        /**
         * <p>停止播放当前视点动画</p>
         */
        function stop(): void;
        /**
         * <p>增加视点动画</p>
         * @param name - <p>视点动画名称</p>
         * @returns <ul>
         * <li>是否增加成功</li>
         * </ul>
         */
        function add(name: string): Promise<boolean>;
        /**
         * <p>获取视点动画</p>
         * @param name - <p>视点动画名称</p>
         */
        function get(name: string): any;
        /**
         * <p>删除视点动画</p>
         * @param name - <p>视点动画名称</p>
         * @returns <ul>
         * <li>是否删除成功</li>
         * </ul>
         */
        function remove(name: string): Promise<boolean>;
        /**
         * <p>修改视点动画名称</p>
         * @param oldName - <p>视点动画旧名称</p>
         * @param newName - <p>视点动画新名称</p>
         * @returns <ul>
         * <li>是否重命名成功</li>
         * </ul>
         */
        function reName(oldName: string, newName: string): Promise<boolean>;
        /**
         * <p>增加视点动画节点</p>
         * @param name - <p>视点动画名称</p>
         * @param [params] - <p>节点参数</p>
         * @returns <ul>
         * <li>是否增加成功</li>
         * </ul>
         */
        function addNode(name: string, params?: any): Promise<boolean>;
        /**
         * <p>更新视点动画节点</p>
         * @param name - <p>视点动画名称</p>
         * @param index - <p>被更新节点索引</p>
         * @param params - <p>节点参数</p>
         * @returns <ul>
         * <li>是否更新成功</li>
         * </ul>
         */
        function updateNode(name: string, index: number, params: any): Promise<boolean>;
        /**
         * <p>截取视点动画节点视角</p>
         * @param name - <p>视点动画名称</p>
         * @param index - <p>节点索引</p>
         * @returns <ul>
         * <li>是否截取成功</li>
         * </ul>
         */
        function snippingNodeView(name: string, index: number): Promise<boolean>;
        /**
         * <p>删除视点动画中节点</p>
         * @param name - <p>视点动画名称</p>
         * @param index - <p>节点索引</p>
         * @returns <ul>
         * <li>是否删除成功</li>
         * </ul>
         */
        function removeNode(name: string, index: number): Promise<boolean>;
        /**
         * <p>预览视点动画节点</p>
         * @param name - <p>视点动画名称</p>
         * @param index - <p>节点索引</p>
         */
        function previewNode(name: string, index: number): void;
        /**
         * <p>设置视点动画循环模式</p>
         */
        function setLoopPlayMode(type: string): void;
        /**
         * <p>激活视点动画声音</p>
         */
        function activateSound(): void;
        /**
         * <p>取消激活视点动画声音</p>
         */
        function deactivatedSound(): void;
        /**
         * <p>增加视点模块</p>
         * @example
         * let module = {};
         * module.snapshot = () => {
         *     // 记录的数据
         *     return {name: 'name'}
         * };
         * // 恢复执行动作
         * module.recover = (data) => {};
         * module.isRecoverOk = () => {
         *     return true;
         * };
         * module.recoverCleardata) => {};
         * THINGX.ViewPoint.addModule('add-module', module);
         * @param name - <p>模块名称</p>
         * @param module - <p>模块实现，需实现方法 snapshot-记录视点/recover-恢复视点/isRecoverOk-是否恢复完成/recoverClear-恢复清理</p>
         * @param [index] - <p>增加位置，默认增加到当前视点模块末尾</p>
         * @returns <ul>
         * <li>是否增加成功</li>
         * </ul>
         */
        function addModule(name: string, module: any, index?: number): boolean;
        /**
         * <p>获取所有的视点动画列表</p>
         */
        function getList(): Promise<object[]>;
        /**
         * <p>展示视点动画列表，需要在视点动画模块显示状态</p>
         * @param name - <p>视点动画名称</p>
         */
        function showList(name: string): object[];
        /**
         * <p>获取视点动画编辑列表</p>
         * @param name - <p>视点动画名称</p>
         */
        function getEditList(name: string): Promise<object[]>;
        /**
         * <p>展示视点动画编辑列表，需要在视点动画模块显示状态</p>
         * @param name - <p>视点动画名称</p>
         */
        function showEditList(name: string): object[];
    }
    /**
     * <p>事件</p>
     */
    namespace Event {
        /**
         * @property target - <p>监听对象</p>
         * @property event - <p>监听事件</p>
         * @property [condition] - <p>物体类型选择条件</p>
         * @property [suffix] - <p>可变事件后缀</p>
         * @property callback - <p>监听回调函数</p>
         * @property [priority] - <p>监听优先级</p>
         * @property [tag] - <p>监听标签</p>
         */
        type ListenConfig = {
            target: THING.BaseObject;
            event: THINGX.Event.Type;
            condition?: string;
            suffix?: string;
            callback: (...params: any[]) => any;
            priority?: number;
            tag?: string;
        };
        /**
         * @property target - <p>监听对象</p>
         * @property event - <p>监听事件</p>
         * @property [condition] - <p>物体类型选择条件</p>
         * @property [suffix] - <p>可变事件后缀</p>
         * @property data - <p>事件信息，传递回调参数</p>
         * @property [compatibility = true] - <p>是否兼容遗产事件触发</p>
         * @property [tag] - <p>监听标签</p>
         */
        type TriggerConfig = {
            target: THING.BaseObject;
            event: THINGX.Event.Type;
            condition?: string;
            suffix?: string;
            data: any;
            compatibility?: boolean;
            tag?: string;
        };
        /**
         * @property target - <p>监听对象</p>
         * @property event - <p>监听事件</p>
         * @property [condition] - <p>物体类型选择条件</p>
         * @property [suffix] - <p>可变事件后缀</p>
         * @property [compatibility = true] - <p>是否兼容遗产事件触发</p>
         * @property [tag] - <p>监听标签</p>
         */
        type ResumeConfig = {
            target: THING.BaseObject;
            event: THINGX.Event.Type;
            condition?: string;
            suffix?: string;
            compatibility?: boolean;
            tag?: string;
        };
        /**
         * @property target - <p>监听对象</p>
         * @property event - <p>监听事件</p>
         * @property [condition] - <p>物体类型选择条件</p>
         * @property [suffix] - <p>可变事件后缀</p>
         * @property [compatibility = true] - <p>是否兼容遗产事件触发</p>
         * @property [tag] - <p>监听标签</p>
         */
        type PauseConfig = {
            target: THING.BaseObject;
            event: THINGX.Event.Type;
            condition?: string;
            suffix?: string;
            compatibility?: boolean;
            tag?: string;
        };
        /**
         * @property target - <p>监听对象</p>
         * @property event - <p>监听事件</p>
         * @property [condition] - <p>物体类型选择条件</p>
         * @property [suffix] - <p>可变事件后缀</p>
         * @property [tag] - <p>监听标签</p>
         * @property [compatibility = true] - <p>是否兼容遗产事件触发</p>
         * @property [callback] - <p>监听回调函数</p>
         */
        type OffConfig = {
            target: THING.BaseObject;
            event: THINGX.Event.Type;
            condition?: string;
            suffix?: string;
            tag?: string;
            compatibility?: boolean;
            callback?: (...params: any[]) => any;
        };
        /**
         * <p>监听事件</p>
         * @param config - <p>监听事件配置</p>
         * @returns <p>boolean 是否监听成功</p>
         */
        function on(config: THINGX.Event.ListenConfig): any;
        /**
         * <p>监听事件， 只触发一次</p>
         * @param config - <p>监听事件配置</p>
         * @returns <p>boolean 是否监听成功</p>
         */
        function one(config: THINGX.Event.ListenConfig): any;
        /**
         * <p>触发事件</p>
         * @param config - <p>监听事件配置</p>
         * @returns <p>boolean 是否触发成功</p>
         */
        function trigger(config: THINGX.Event.TriggerConfig): any;
        /**
         * <p>取消监听事件</p>
         * @param config - <p>监听事件配置</p>
         */
        function off(config: THINGX.Event.OffConfig): void;
        /**
         * <p>暂停注册事件</p>
         * @param config - <p>监听事件配置</p>
         */
        function pause(config: THINGX.Event.PauseConfig): void;
        /**
         * <p>恢复注册事件</p>
         * @param config - <p>监听事件配置</p>
         */
        function resume(config: THINGX.Event.ResumeConfig): void;
        /**
         * <p>新建事件</p>
         * @param val - <p>事件名称</p>
         * @param [legacyVal] - <p>遗产事件名称</p>
         * @param [withSuffix = false] - <p>是否有后缀</p>
         */
        function create(val: string, legacyVal?: string, withSuffix?: boolean): any;
        namespace Tag {
            /**
             * <p>显示孪生体面板</p>
             */
            var ShowDigitalTwinPanel: any;
            /**
             * <p>隐藏孪生体面板</p>
             */
            var HideDigitalTwinPanel: any;
            /**
             * <p>创建显示孪生体提示</p>
             */
            var CreateDigitalTwinTip: any;
            /**
             * <p>销毁孪生体提示</p>
             */
            var DestroyDigitalTwinTip: any;
            /**
             * <p>显示孪生体默认效果</p>
             */
            var ShowDigitalTwinDefaultEffect: any;
            /**
             * <p>隐藏孪生体默认效果</p>
             */
            var HideDigitalTwinDefaultEffect: any;
            /**
             * <p>设置选中默认效果</p>
             */
            var SetSelectDefaultEffect: any;
            /**
             * <p>取消设置选中默认效果</p>
             */
            var SetUnselectDefaultEffect: any;
            /**
             * <p>停止飞行</p>
             */
            var StopFly: any;
            /**
             * <p>设置兄弟房间透明</p>
             */
            var SetBrotherRoomsTransparency: any;
            /**
             * <p>设置兄弟房间不透明</p>
             */
            var SetBrotherRoomsNotTransparency: any;
            /**
             * <p>设置楼层透明</p>
             */
            var SetFloorTransparency: any;
            /**
             * <p>设置楼层不透明</p>
             */
            var SetFloorNotTransparency: any;
            /**
             * <p>设置兄弟孪生体透明</p>
             */
            var SetBrotherTwinsTransparency: any;
            /**
             * <p>设置兄弟孪生体不透明</p>
             */
            var SetBrotherTwinsNotTransparency: any;
            /**
             * <p>显示建筑告警</p>
             */
            var ShowAlarmForBuilding: any;
            /**
             * <p>为当前层级设置告警参数</p>
             */
            var SetAlarmParamsForCurrentLevel: any;
            /**
             * <p>创建图层</p>
             */
            var CreateLayer: any;
            /**
             * <p>更新监控效果</p>
             */
            var UpdateMonitorEffect: any;
            /**
             * <p>进入建筑后，只有一层楼则直接进入楼层</p>
             */
            var EnterFloorDirectAfterEnterBuildingIfOneFloorInBuilding: any;
            /**
             * <p>退出楼层后，只有一层楼则直接进入园区</p>
             */
            var EnterCampusDirectAfterLeaveFloorIfOneFloorInBuilding: any;
            /**
             * <p>进入楼层后，只有一间房则直接进入房间</p>
             */
            var EnterRoomDirectAfterEnterFloorIfOneRoomInFloor: any;
            /**
             * <p>退出房间后，只有一层楼则直接进入建筑</p>
             */
            var EnterBuildingDirectAfterLeaveRoomIfOneRoomInFloor: any;
        }
        /**
         * <p>事件类型</p>
         */
        namespace Type { }
    }
    /**
     * <p>告警模块</p>
     */
    namespace Alarm {
        /**
         * <p>告警查询配置</p>
         * @property [acknowledged] - <p>处理状态</p>
         * @property alarmLevel - <p>告警级别</p>
         * @property [classNames = [1, 2, 3, 4]] - <p>孪生体业务分类，默认为空数组代表所有</p>
         * @property dcIds - <p>场景的数据库ID数组（<em>DBID</em>）</p>
         * @property [enableGlobal = false/true] - <p>开启全局查询，当前层级是地图的话默认true，园区默认false。当为true时，需要设置dcIds</p>
         * @property fromCiId - <p>查询的起始层级的数据库ID（<em>DBID</em>）</p>
         * @property keyword - <p>搜索关键词，会匹配孪生体的名称，告警详情</p>
         * @property orAttrs - <p>孪生体属性条件筛选 默认空数组代表没有过滤条件</p>
         * @property [sortType = time-desc] - <p>告警排序方式 默认按时间倒序 time-asc 告警时间正序/time-desc 告警时间倒序/level-asc 告警级别正序/level-desc 告警级别倒序</p>
         */
        type QueryConfig = {
            acknowledged?: string;
            alarmLevel: number[];
            classNames?: string[];
            dcIds: string[];
            enableGlobal?: boolean;
            fromCiId: string;
            keyword: string;
            orAttrs: object[];
            sortType?: string;
        };
        /**
         * <p>告警等级配置</p>
         * @property color - <p>告警颜色，十六进制</p>
         * @property name - <p>告警级别名称</p>
         * @property sound - <p>告警声音配置</p>
         * @property sound.name - <p>告警声音名称</p>
         * @property sound.url - <p>告警声音资源url</p>
         */
        type LevelItemConfig = {
            color: string;
            name: string;
            sound: {
                name: string;
                url: string;
            };
        };
        /**
         * <p>激活告警系统</p>
         * @param purpose - <p>激活目的</p>
         */
        function activate(purpose: string): void;
        /**
         * <p>取消激活告警系统</p>
         * @param purpose - <p>取消激活目的</p>
         */
        function deactivate(purpose: string): void;
        /**
         * <p>告警系统是否激活</p>
         */
        function isActivated(): boolean;
        /**
         * <p>获取已存在的激活告警系统的目的</p>
         * @returns <ul>
         * <li>激活告警系统的目的</li>
         * </ul>
         */
        function getPurpose(): string[];
        /**
         * <p>激活3D告警效果</p>
         */
        function activateEffect(): void;
        /**
         * <p>取消激活3D告警效果</p>
         */
        function deactivateEffect(): void;
        /**
         * <p>3D告警效果是否被激活</p>
         */
        function isEffectActivated(): boolean;
        /**
         * <p>激活告警声音效果</p>
         */
        function activateSound(): void;
        /**
         * <p>取消激活告警声音效果</p>
         */
        function deactivateSound(): void;
        /**
         * <p>告警声音效果是否被激活</p>
         */
        function isSoundActivated(): boolean;
        /**
         * <p>告警系统是否初始化完成</p>
         */
        function isInitialized(): boolean;
        /**
         * <p>获取告警级别配置</p>
         * @returns <ul>
         * <li>告警级别配置</li>
         * </ul>
         */
        function getLevelConfig(): Map<number, THINGX.Alarm.LevelItemConfig>;
        /**
         * <p>获取告警查询配置</p>
         */
        function getQueryConfig(): AlarmQueryConfig;
        /**
         * <p>设置告警查询配置</p>
         * @example
         * // 设置查询告警级别为 1,2,3 级的告警
         * THINGX.Alarm.setQueryConfig({
         *     alarmLevel: [1,2,3]
         * });
         * // 设置查询孪生体业务分类为 '温湿度感应器' 的告警数据
         * THINGX.Alarm.setQueryConfig({
         *     classNames: ['温湿度感应器']
         * });
         * // 根据孪生体属性筛选告警
         * THINGX.Alarm.setQueryConfig({
         *     orAttrs:[{ "key": '业务分类', "value":"空调", "optType": 1 }]
         * });
         * @param config - <p>告警查询配置</p>
         * @param [isRemoteData = true] - <p>是否立即请求告警</p>
         */
        function setQueryConfig(config: THINGX.Alarm.QueryConfig, isRemoteData?: boolean): void;
        /**
         * <p>获取所有告警数据</p>
         */
        function getAllData(): any;
        /**
         * <p>获取全局告警数据最高告警级别 数值约小级别越高, 默认1为最高级，对应“严重”告警级别，依次向下排</p>
         */
        function getHighestLevel(): number | null;
        /**
         * <p>获取孪生体上最高告警级别数据</p>
         * @param digitalTwin - <p>孪生体对象</p>
         * @param isTraverse - <p>是否遍历该孪生体的孩子</p>
         */
        function getHighestLevelDataWithTwin(digitalTwin: THING.BaseObject, isTraverse: boolean): any | null;
        /**
         * <p>开始请求后台接口更新所有告警信息，activate后会自动调用，尽量使用activate来控制告警系统</p>
         */
        function startRequestData(): void;
        /**
         * <p>告警查询配置</p>
         * @property [acknowledged] - <p>处理状态</p>
         * @property alarmLevel - <p>告警级别</p>
         * @property [classNames = [1, 2, 3, 4]] - <p>孪生体业务分类，默认为空数组代表所有</p>
         * @property dcIds - <p>场景的数据库ID数组（<em>DBID</em>）</p>
         * @property [enableGlobal = false/true] - <p>开启全局查询，当前层级是地图的话默认true，园区默认false。当为true时，需要设置dcIds</p>
         * @property fromCiId - <p>查询的起始层级的数据库ID（<em>DBID</em>）</p>
         * @property keyword - <p>搜索关键词，会匹配孪生体的名称，告警详情</p>
         * @property orAttrs - <p>孪生体属性条件筛选 默认空数组代表没有过滤条件</p>
         * @property [sortType = time-desc] - <p>告警排序方式 默认按时间倒序 time-asc 告警时间正序/time-desc 告警时间倒序/level-asc 告警级别正序/level-desc 告警级别倒序</p>
         */
        type QueryConfig = {
            acknowledged?: string;
            alarmLevel: number[];
            classNames?: string[];
            dcIds: string[];
            enableGlobal?: boolean;
            fromCiId: string;
            keyword: string;
            orAttrs: object[];
            sortType?: string;
        };
        /**
         * <p>告警等级配置</p>
         * @property color - <p>告警颜色，十六进制</p>
         * @property name - <p>告警级别名称</p>
         * @property sound - <p>告警声音配置</p>
         * @property sound.name - <p>告警声音名称</p>
         * @property sound.url - <p>告警声音资源url</p>
         */
        type LevelItemConfig = {
            color: string;
            name: string;
            sound: {
                name: string;
                url: string;
            };
        };
        /**
         * <p>激活告警系统</p>
         * @param purpose - <p>激活目的</p>
         */
        function activate(purpose: string): void;
        /**
         * <p>取消激活告警系统</p>
         * @param purpose - <p>取消激活目的</p>
         */
        function deactivate(purpose: string): void;
        /**
         * <p>告警系统是否激活</p>
         */
        function isActivated(): boolean;
        /**
         * <p>获取已存在的激活告警系统的目的</p>
         * @returns <ul>
         * <li>激活告警系统的目的</li>
         * </ul>
         */
        function getPurpose(): string[];
        /**
         * <p>激活3D告警效果</p>
         */
        function activateEffect(): void;
        /**
         * <p>取消激活3D告警效果</p>
         */
        function deactivateEffect(): void;
        /**
         * <p>3D告警效果是否被激活</p>
         */
        function isEffectActivated(): boolean;
        /**
         * <p>激活告警声音效果</p>
         */
        function activateSound(): void;
        /**
         * <p>取消激活告警声音效果</p>
         */
        function deactivateSound(): void;
        /**
         * <p>告警声音效果是否被激活</p>
         */
        function isSoundActivated(): boolean;
        /**
         * <p>告警系统是否初始化完成</p>
         */
        function isInitialized(): boolean;
        /**
         * <p>获取告警级别配置</p>
         * @returns <ul>
         * <li>告警级别配置</li>
         * </ul>
         */
        function getLevelConfig(): Map<number, THINGX.Alarm.LevelItemConfig>;
        /**
         * <p>获取告警查询配置</p>
         */
        function getQueryConfig(): AlarmQueryConfig;
        /**
         * <p>设置告警查询配置</p>
         * @example
         * // 设置查询告警级别为 1,2,3 级的告警
         * THINGX.Alarm.setQueryConfig({
         *     alarmLevel: [1,2,3]
         * });
         * // 设置查询孪生体业务分类为 '温湿度感应器' 的告警数据
         * THINGX.Alarm.setQueryConfig({
         *     classNames: ['温湿度感应器']
         * });
         * // 根据孪生体属性筛选告警
         * THINGX.Alarm.setQueryConfig({
         *     orAttrs:[{ "key": '业务分类', "value":"空调", "optType": 1 }]
         * });
         * @param config - <p>告警查询配置</p>
         * @param [isRemoteData = true] - <p>是否立即请求告警</p>
         */
        function setQueryConfig(config: THINGX.Alarm.QueryConfig, isRemoteData?: boolean): void;
        /**
         * <p>获取所有告警数据</p>
         */
        function getAllData(): any;
        /**
         * <p>获取全局告警数据最高告警级别 数值约小级别越高, 默认1为最高级，对应“严重”告警级别，依次向下排</p>
         */
        function getHighestLevel(): number | null;
        /**
         * <p>获取孪生体上最高告警级别数据</p>
         * @param digitalTwin - <p>孪生体对象</p>
         * @param isTraverse - <p>是否遍历该孪生体的孩子</p>
         */
        function getHighestLevelDataWithTwin(digitalTwin: THING.BaseObject, isTraverse: boolean): any | null;
        /**
         * <p>开始请求后台接口更新所有告警信息，activate后会自动调用，尽量使用activate来控制告警系统</p>
         */
        function startRequestData(): void;
    }
    /**
     * <p>App模块</p>
     */
    namespace App {
        /**
         * <p>当前app</p>
         */
        var App.current: THING.App | undefined;
        /**
         * <p>当前层级孪生体对象</p>
         */
        var App.currentLevel: THING.BaseObject | undefined;
        /**
         * <p>当前app</p>
         */
        var App.current: THING.App | undefined;
        /**
         * <p>当前选择的第一个孪生体对象</p>
         */
        var App.currentSelected: THING.BaseObject | undefined;
        /**
         * <p>当前场景信息</p>
         */
        var App.sceneInfo: any;
        /**
         * <p>当前场景CICode</p>
         */
        var App.sceneCICode: string;
        /**
         * <p>通过ThingJS语法查询当前app下孪生体集合</p>
         * @param expression - <p>ThingJS语法表达式</p>
         * @returns <ul>
         * <li>查询到的孪生体</li>
         * </ul>
         */
        function App.queryWithThingJSExpression(expression: string): THING.BaseObject[];
        /**
         * <p>当前ThingJS-X版本号</p>
         */
        var App.version: string;
        /**
         * <p>当前使用的标记库版本号</p>
         */
        var App.vendorMarkerVersion: string;
        /**
         * <p>当前使用的ThingJS的版本号</p>
         */
        var App.vendorThingJSVersion: string;
        /**
         * <p>当前使用的地图的版本号</p>
         */
        var App.vendorGeoVersion: string;
        /**
         * <p>当前app</p>
         */
        var App.current: THING.App | undefined;
        /**
         * <p>当前层级孪生体对象</p>
         */
        var App.currentLevel: THING.BaseObject | undefined;
        /**
         * <p>当前app</p>
         */
        var App.current: THING.App | undefined;
        /**
         * <p>当前选择的第一个孪生体对象</p>
         */
        var App.currentSelected: THING.BaseObject | undefined;
        /**
         * <p>当前场景信息</p>
         */
        var App.sceneInfo: any;
        /**
         * <p>当前场景CICode</p>
         */
        var App.sceneCICode: string;
        /**
         * <p>通过ThingJS语法查询当前app下孪生体集合</p>
         * @param expression - <p>ThingJS语法表达式</p>
         * @returns <ul>
         * <li>查询到的孪生体</li>
         * </ul>
         */
        function App.queryWithThingJSExpression(expression: string): THING.BaseObject[];
        /**
         * <p>当前ThingJS-X版本号</p>
         */
        var App.version: string;
        /**
         * <p>当前使用的标记库版本号</p>
         */
        var App.vendorMarkerVersion: string;
        /**
         * <p>当前使用的ThingJS的版本号</p>
         */
        var App.vendorThingJSVersion: string;
        /**
         * <p>当前使用的地图的版本号</p>
         */
        var App.vendorGeoVersion: string;
    }
    /**
     * <p>业务模块</p>
     */
    namespace Business {
        /**
         * <p>显示业务模块</p>
         */
        function show(): void;
        /**
         * <p>隐藏业务模块</p>
         */
        function hide(): void;
        /**
         * <p>获取指定层级下指定名称业务</p>
         * @param [level = THINGX.App.currentLevel] - <p>指定层级</p>
         * @param [name=] - <p>业务名称，为空则获取指定层级下所有业务</p>
         * @returns <ul>
         * <li>业务实例</li>
         * </ul>
         */
        function get(level?: THING.BaseObject | THINGX.CONST.DEFAULT_DIGITAL_TWIN_CLASS, name=?: string): object[];
        /**
         * <p>激活业务</p>
         * @param name - <p>业务名称</p>
         */
        function activate(name: string): void;
        /**
         * <p>取消激活当前业务</p>
         */
        function deactivate(): void;
        /**
         * <p>获取当前激活的业务信息</p>
         */
        function getActivated(): any;
        /**
         * <p>重新读取可视化配置 并根据当前层级重新创建业务</p>
         * @returns <ul>
         * <li>是否刷新成功</li>
         * </ul>
         */
        function refresh(): Promise<boolean>;
        /**
         * <p>显示业务面板- 建议通过activate激活业务</p>
         * @param name - <p>业务名称</p>
         */
        function showPanel(name: string): void;
        /**
         * <p>隐藏业务面板 - 建议通过deactivate取消激活业务</p>
         * @param name - <p>业务名称</p>
         */
        function hidePanel(name: string): void;
        /**
         * <p>获取业务配置</p>
         * @param [level = THINGX.App.currentLevel] - <p>孪生体对象/孪生体分类</p>
         * @param [name=] - <p>业务名称，非空的话返回指定配置，否则返回所有配置</p>
         */
        function getConfig(level?: THING.BaseObject | THINGX.CONST.DEFAULT_DIGITAL_TWIN_CLASS, name=?: string): any | null;
        /**
         * <p>获取当前业务面板配置</p>
         */
        function getPanelConfig(): any | null;
        /**
         * <p>获取当前激活的业务名称</p>
         * @param [isFullName = false] - <p>是否获取业务全称</p>
         * @returns <ul>
         * <li>当前激活的业务名称/全称</li>
         * </ul>
         */
        function getCurrentName(isFullName?: boolean): string;
        /**
         * <p>显示业务模块</p>
         */
        function show(): void;
        /**
         * <p>隐藏业务模块</p>
         */
        function hide(): void;
        /**
         * <p>获取指定层级下指定名称业务</p>
         * @param [level = THINGX.App.currentLevel] - <p>指定层级</p>
         * @param [name=] - <p>业务名称，为空则获取指定层级下所有业务</p>
         * @returns <ul>
         * <li>业务实例</li>
         * </ul>
         */
        function get(level?: THING.BaseObject | THINGX.CONST.DEFAULT_DIGITAL_TWIN_CLASS, name=?: string): object[];
        /**
         * <p>激活业务</p>
         * @param name - <p>业务名称</p>
         */
        function activate(name: string): void;
        /**
         * <p>取消激活当前业务</p>
         */
        function deactivate(): void;
        /**
         * <p>获取当前激活的业务信息</p>
         */
        function getActivated(): any;
        /**
         * <p>重新读取可视化配置 并根据当前层级重新创建业务</p>
         * @returns <ul>
         * <li>是否刷新成功</li>
         * </ul>
         */
        function refresh(): Promise<boolean>;
        /**
         * <p>显示业务面板- 建议通过activate激活业务</p>
         * @param name - <p>业务名称</p>
         */
        function showPanel(name: string): void;
        /**
         * <p>隐藏业务面板 - 建议通过deactivate取消激活业务</p>
         * @param name - <p>业务名称</p>
         */
        function hidePanel(name: string): void;
        /**
         * <p>获取业务配置</p>
         * @param [level = THINGX.App.currentLevel] - <p>孪生体对象/孪生体分类</p>
         * @param [name=] - <p>业务名称，非空的话返回指定配置，否则返回所有配置</p>
         */
        function getConfig(level?: THING.BaseObject | THINGX.CONST.DEFAULT_DIGITAL_TWIN_CLASS, name=?: string): any | null;
        /**
         * <p>获取当前业务面板配置</p>
         */
        function getPanelConfig(): any | null;
        /**
         * <p>获取当前激活的业务名称</p>
         * @param [isFullName = false] - <p>是否获取业务全称</p>
         * @returns <ul>
         * <li>当前激活的业务名称/全称</li>
         * </ul>
         */
        function getCurrentName(isFullName?: boolean): string;
    }
    /**
     * <p>摄像机模块</p>
     */
    namespace Camera {
        /**
         * @property position - <p>摄相机位置</p>
         * @property target - <p>摄像机看点</p>
         */
        type Pose = {
            position: number[];
            target: number[];
        };
        /**
         * <p>飞到最佳视角查看孪生体</p>
         * @example
         * // 单个孪生体飞行
         * const currentLevel = THINGX.App.currentLevel;
         * cosnt pose = THINGX.Camera.getPoseWithDigitalTwin(currentLevel, {
         *     x: 30, y: 60, z: 1, tx: 0, ty: 0, tr: 0
         * });
         * THINGX.Camera.flyTo(currentLevel, {
         *     complete: (ev) => {
         *         console.log('飞行完毕')
         *     },
         *     pose: pose,
         *     time: 2000,
         * });
         *
         * // 孪生体集合飞行
         * let dir = THING.Math.scaleVector(THING.App.current.camera.direction, -1); // 默认方向向量
         * dir[0] += 1;
         * const pose = THINGX.Camera.getPoseWithDigitalTwinSet(THINGX.CONST.DEFAULT_DIGITAL_TWIN_CLASS.BUILDING, {
         *     useDir: dir,
         *     radiusScale: 1.5,
         * });
         * THINGX.Camera.flyTo(THINGX.CONST.DEFAULT_DIGITAL_TWIN_CLASS.BUILDING, {
         *     complete: (ev) => {
         *         console.log('飞行完毕')
         *     },
         *     pose: pose,
         *     time: 2000,
         * });
         * @param digitalTwin - <p>孪生体/孪生体集合/ThingJS查询表达式</p>
         * @param [config = {}] - <p>飞行指定配置</p>
         * @param [config.keepLevel = false] - <p>是否保持当前层级</p>
         * @param [config.complete] - <p>摄像机飞行完成回调函数</p>
         * @param [config.time] - <p>摄像机飞行时间，不传的话会根据摄像机姿势和孪生体对象计算一个最佳的飞行时间</p>
         * @param [config.pose] - <p>摄像机姿势，不传的话会计算最佳的摄像机姿势</p>
         */
        function flyTo(digitalTwin: THING.BaseObject | THING.BaseObject[] | string, config?: {
            keepLevel?: boolean;
            complete?: (...params: any[]) => any;
            time?: number;
            pose?: THINGX.Camera.Pose;
        }): void;
        /**
         * <p>通过孪生体获取摄像机姿势</p>
         * @example
         * const currentLevel = THINGX.App.currentLevel;
         * THINGX.Camera.getPoseWithDigitalTwin(currentLevel, {
         *     x: 30, y: 60, z: 1, tx: 0, ty: 0, tr: 0
         * });
         * @param digitalTwin - <p>孪生体</p>
         * @param [config = {}] - <p>飞到对象的参数，当digitalTwin为单个孪生体且opts.keepDir不为true时生效</p>
         * @param [config.x = 30] - <p>position yaw 摄像机位置沿x轴旋转角度</p>
         * @param [config.y = 45] - <p>position pitch 摄像机位置沿y轴旋转角度</p>
         * @param [config.z = 2] - <p>position radius factor 摄像机位置距离孪生体包围盒半径倍数，1是刚好看到飞到物体的整个包围盒</p>
         * @param [config.tx = 0] - <p>target yaw 摄像机看点沿x轴旋转角度</p>
         * @param [config.ty = 0] - <p>target pitch 摄像机看点沿y轴旋转角度</p>
         * @param [config.tr = 0] - <p>target radius factor 摄像机看点距离孪生体包围中心距离</p>
         * @param opts - <p>计算设置</p>
         * @param [opts.isRecursive = false] - <p>是否遍历子对象</p>
         * @param [opts.isForceReCalc = true] - <p>是否强制重新计算</p>
         */
        function getPoseWithDigitalTwin(digitalTwin: THING.BaseObject, config?: {
            x?: number;
            y?: number;
            z?: number;
            tx?: number;
            ty?: number;
            tr?: number;
        }, opts: {
            isRecursive?: boolean;
            isForceReCalc?: boolean;
        }): THINGX.Camera.Pose | null;
        /**
         * <p>通过孪生体集合获取摄像机姿势</p>
         * @example
         * let dir = THING.Math.scaleVector(THING.App.current.camera.direction, -1); // 默认方向向量
         * dir[0] += 1;
         * let pose = THINGX.Camera.getPoseWithDigitalTwinSet(THINGX.CONST.DEFAULT_DIGITAL_TWIN_CLASS.BUILDING, {
         *     useDir: dir,
         *     radiusScale: 1.5,
         * });
         * @param digitalTwin - <p>孪生体集合/ThingJS查询表达式</p>
         * @param [opts.isRecursive = false] - <p>是否遍历子对象</p>
         * @param [opts.radiusScale = 1] - <p>距离包围盒半径倍数，digitalTwin为孪生体集合时生效</p>
         * @param [opts.useDir = THING.App.current.camera.direction*-1] - <p>摄像机朝向，digitalTwin为孪生体集合时生效</p>
         */
        function getPoseWithDigitalTwinSet(digitalTwin: THING.BaseObject[] | string, opts: {
            isRecursive?: boolean;
            radiusScale?: number;
            useDir?: number[];
        }): THINGX.Camera.Pose | null;
        /**
         * <p>获取摄像机姿势 建议使用getPoseWithDigitalTwin和getPoseWithDigitalTwinSet获取摄像机姿势</p>
         * @param digitalTwin - <p>孪生体/孪生体集合/ThingJS查询表达式</p>
         * @param [flyToConfig = {}] - <p>飞到对象的参数，当digitalTwin为单个孪生体且opts.keepDir不为true时生效</p>
         * @param [flyToConfig.x = 30] - <p>position yaw 摄像机位置沿x轴旋转角度</p>
         * @param [flyToConfig.y = 45] - <p>position pitch 摄像机位置沿y轴旋转角度</p>
         * @param [flyToConfig.z = 2] - <p>position radius factor 摄像机位置距离孪生体包围盒半径倍数，1是刚好看到飞到物体的整个包围盒</p>
         * @param [flyToConfig.tx = 0] - <p>target yaw 摄像机看点沿x轴旋转角度</p>
         * @param [flyToConfig.ty = 0] - <p>target pitch 摄像机看点沿y轴旋转角度</p>
         * @param [flyToConfig.tr = 0] - <p>target radius factor 摄像机看点距离孪生体包围盒半径倍数</p>
         * @param [opts = {}] - <p>飞到最佳视角计算配置</p>
         * @param [opts.isForceReCalc = false] - <p>是否强制重新计算，当digitalTwin为单个孪生体生效</p>
         * @param [opts.isRecursive = false] - <p>是否遍历子对象</p>
         * @param [opts.radiusScale = 1] - <p>距离包围盒半径倍数，digitalTwin为孪生体集合时生效</p>
         * @param [opts.keepDir = false] - <p>保持当前朝向</p>
         * @param [opts.useDir = THING.App.current.camera.direction*-1] - <p>朝向vector3，digitalTwin为孪生体集合时生效</p>
         */
        function getPose(digitalTwin: THING.BaseObject | THING.BaseObject[] | string, flyToConfig?: {
            x?: number;
            y?: number;
            z?: number;
            tx?: number;
            ty?: number;
            tr?: number;
        }, opts?: {
            isForceReCalc?: boolean;
            isRecursive?: boolean;
            radiusScale?: number;
            keepDir?: boolean;
            useDir?: number[];
        }): THINGX.Camera.Pose | null;
        /**
         * <p>获取视点配置</p>
         */
        function getConfig(): any;
        /**
         * @property position - <p>摄相机位置</p>
         * @property target - <p>摄像机看点</p>
         */
        type Pose = {
            position: number[];
            target: number[];
        };
        /**
         * <p>飞到最佳视角查看孪生体</p>
         * @example
         * // 单个孪生体飞行
         * const currentLevel = THINGX.App.currentLevel;
         * cosnt pose = THINGX.Camera.getPoseWithDigitalTwin(currentLevel, {
         *     x: 30, y: 60, z: 1, tx: 0, ty: 0, tr: 0
         * });
         * THINGX.Camera.flyTo(currentLevel, {
         *     complete: (ev) => {
         *         console.log('飞行完毕')
         *     },
         *     pose: pose,
         *     time: 2000,
         * });
         *
         * // 孪生体集合飞行
         * let dir = THING.Math.scaleVector(THING.App.current.camera.direction, -1); // 默认方向向量
         * dir[0] += 1;
         * const pose = THINGX.Camera.getPoseWithDigitalTwinSet(THINGX.CONST.DEFAULT_DIGITAL_TWIN_CLASS.BUILDING, {
         *     useDir: dir,
         *     radiusScale: 1.5,
         * });
         * THINGX.Camera.flyTo(THINGX.CONST.DEFAULT_DIGITAL_TWIN_CLASS.BUILDING, {
         *     complete: (ev) => {
         *         console.log('飞行完毕')
         *     },
         *     pose: pose,
         *     time: 2000,
         * });
         * @param digitalTwin - <p>孪生体/孪生体集合/ThingJS查询表达式</p>
         * @param [config = {}] - <p>飞行指定配置</p>
         * @param [config.keepLevel = false] - <p>是否保持当前层级</p>
         * @param [config.complete] - <p>摄像机飞行完成回调函数</p>
         * @param [config.time] - <p>摄像机飞行时间，不传的话会根据摄像机姿势和孪生体对象计算一个最佳的飞行时间</p>
         * @param [config.pose] - <p>摄像机姿势，不传的话会计算最佳的摄像机姿势</p>
         */
        function flyTo(digitalTwin: THING.BaseObject | THING.BaseObject[] | string, config?: {
            keepLevel?: boolean;
            complete?: (...params: any[]) => any;
            time?: number;
            pose?: THINGX.Camera.Pose;
        }): void;
        /**
         * <p>通过孪生体获取摄像机姿势</p>
         * @example
         * const currentLevel = THINGX.App.currentLevel;
         * THINGX.Camera.getPoseWithDigitalTwin(currentLevel, {
         *     x: 30, y: 60, z: 1, tx: 0, ty: 0, tr: 0
         * });
         * @param digitalTwin - <p>孪生体</p>
         * @param [config = {}] - <p>飞到对象的参数，当digitalTwin为单个孪生体且opts.keepDir不为true时生效</p>
         * @param [config.x = 30] - <p>position yaw 摄像机位置沿x轴旋转角度</p>
         * @param [config.y = 45] - <p>position pitch 摄像机位置沿y轴旋转角度</p>
         * @param [config.z = 2] - <p>position radius factor 摄像机位置距离孪生体包围盒半径倍数，1是刚好看到飞到物体的整个包围盒</p>
         * @param [config.tx = 0] - <p>target yaw 摄像机看点沿x轴旋转角度</p>
         * @param [config.ty = 0] - <p>target pitch 摄像机看点沿y轴旋转角度</p>
         * @param [config.tr = 0] - <p>target radius factor 摄像机看点距离孪生体包围中心距离</p>
         * @param opts - <p>计算设置</p>
         * @param [opts.isRecursive = false] - <p>是否遍历子对象</p>
         * @param [opts.isForceReCalc = true] - <p>是否强制重新计算</p>
         */
        function getPoseWithDigitalTwin(digitalTwin: THING.BaseObject, config?: {
            x?: number;
            y?: number;
            z?: number;
            tx?: number;
            ty?: number;
            tr?: number;
        }, opts: {
            isRecursive?: boolean;
            isForceReCalc?: boolean;
        }): THINGX.Camera.Pose | null;
        /**
         * <p>通过孪生体集合获取摄像机姿势</p>
         * @example
         * let dir = THING.Math.scaleVector(THING.App.current.camera.direction, -1); // 默认方向向量
         * dir[0] += 1;
         * let pose = THINGX.Camera.getPoseWithDigitalTwinSet(THINGX.CONST.DEFAULT_DIGITAL_TWIN_CLASS.BUILDING, {
         *     useDir: dir,
         *     radiusScale: 1.5,
         * });
         * @param digitalTwin - <p>孪生体集合/ThingJS查询表达式</p>
         * @param [opts.isRecursive = false] - <p>是否遍历子对象</p>
         * @param [opts.radiusScale = 1] - <p>距离包围盒半径倍数，digitalTwin为孪生体集合时生效</p>
         * @param [opts.useDir = THING.App.current.camera.direction*-1] - <p>摄像机朝向，digitalTwin为孪生体集合时生效</p>
         */
        function getPoseWithDigitalTwinSet(digitalTwin: THING.BaseObject[] | string, opts: {
            isRecursive?: boolean;
            radiusScale?: number;
            useDir?: number[];
        }): THINGX.Camera.Pose | null;
        /**
         * <p>获取摄像机姿势 建议使用getPoseWithDigitalTwin和getPoseWithDigitalTwinSet获取摄像机姿势</p>
         * @param digitalTwin - <p>孪生体/孪生体集合/ThingJS查询表达式</p>
         * @param [flyToConfig = {}] - <p>飞到对象的参数，当digitalTwin为单个孪生体且opts.keepDir不为true时生效</p>
         * @param [flyToConfig.x = 30] - <p>position yaw 摄像机位置沿x轴旋转角度</p>
         * @param [flyToConfig.y = 45] - <p>position pitch 摄像机位置沿y轴旋转角度</p>
         * @param [flyToConfig.z = 2] - <p>position radius factor 摄像机位置距离孪生体包围盒半径倍数，1是刚好看到飞到物体的整个包围盒</p>
         * @param [flyToConfig.tx = 0] - <p>target yaw 摄像机看点沿x轴旋转角度</p>
         * @param [flyToConfig.ty = 0] - <p>target pitch 摄像机看点沿y轴旋转角度</p>
         * @param [flyToConfig.tr = 0] - <p>target radius factor 摄像机看点距离孪生体包围盒半径倍数</p>
         * @param [opts = {}] - <p>飞到最佳视角计算配置</p>
         * @param [opts.isForceReCalc = false] - <p>是否强制重新计算，当digitalTwin为单个孪生体生效</p>
         * @param [opts.isRecursive = false] - <p>是否遍历子对象</p>
         * @param [opts.radiusScale = 1] - <p>距离包围盒半径倍数，digitalTwin为孪生体集合时生效</p>
         * @param [opts.keepDir = false] - <p>保持当前朝向</p>
         * @param [opts.useDir = THING.App.current.camera.direction*-1] - <p>朝向vector3，digitalTwin为孪生体集合时生效</p>
         */
        function getPose(digitalTwin: THING.BaseObject | THING.BaseObject[] | string, flyToConfig?: {
            x?: number;
            y?: number;
            z?: number;
            tx?: number;
            ty?: number;
            tr?: number;
        }, opts?: {
            isForceReCalc?: boolean;
            isRecursive?: boolean;
            radiusScale?: number;
            keepDir?: boolean;
            useDir?: number[];
        }): THINGX.Camera.Pose | null;
        /**
         * <p>获取视点配置</p>
         */
        function getConfig(): any;
    }
    namespace CONST {
        /**
         * <p>默认孪生体分类</p>
         */
        enum DEFAULT_DIGITAL_TWIN_CLASS {
            /**
             * <p>园区</p>
             */
            CAMPUS = ".Campus",
            /**
             * <p>建筑</p>
             */
            BUILDING = ".Building",
            /**
             * <p>楼层</p>
             */
            FLOOR = ".Floor",
            /**
             * <p>房间</p>
             */
            ROOM = ".Room",
            /**
             * <p>地图</p>
             */
            GEO_CAMPUS = ".GeoCampus"
        }
        /**
         * <p>插件类型</p>
         */
        enum PLUGIN_TYPE {
            /**
             * <p>操作原子插件</p>
             */
            ACTION = "action",
            /**
             * <p>图表</p>
             */
            CHART = "chart",
            /**
             * <p>核心插件</p>
             */
            CORE = "core",
            /**
             * <p>扩展插件</p>
             */
            EXPAND = "expand",
            /**
             * <p>效果模版</p>
             */
            THEME = "theme"
        }
        /**
         * <p>加载javascript脚本类型</p>
         */
        enum JS_LOAD_TYPE {
            /**
             * <p>通过script标签加载</p>
             */
            TAG = "tag",
            /**
             * <p>以动态执行加载的脚本内容方式加载</p>
             */
            EXEC = "exec"
        }
        /**
         * <p>javascript资源类型</p>
         */
        enum JS_SRC_TYPE {
            /**
             * <p>url路径方式</p>
             */
            URL = "url",
            /**
             * <p>源脚本方式</p>
             */
            CONTENT = "content"
        }
        /**
         * <p>默认孪生体分类</p>
         */
        enum DEFAULT_DIGITAL_TWIN_CLASS {
            /**
             * <p>园区</p>
             */
            CAMPUS = ".Campus",
            /**
             * <p>建筑</p>
             */
            BUILDING = ".Building",
            /**
             * <p>楼层</p>
             */
            FLOOR = ".Floor",
            /**
             * <p>房间</p>
             */
            ROOM = ".Room",
            /**
             * <p>地图</p>
             */
            GEO_CAMPUS = ".GeoCampus"
        }
        /**
         * <p>插件类型</p>
         */
        enum PLUGIN_TYPE {
            /**
             * <p>操作原子插件</p>
             */
            ACTION = "action",
            /**
             * <p>图表</p>
             */
            CHART = "chart",
            /**
             * <p>核心插件</p>
             */
            CORE = "core",
            /**
             * <p>扩展插件</p>
             */
            EXPAND = "expand",
            /**
             * <p>效果模版</p>
             */
            THEME = "theme"
        }
        /**
         * <p>加载javascript脚本类型</p>
         */
        enum JS_LOAD_TYPE {
            /**
             * <p>通过script标签加载</p>
             */
            TAG = "tag",
            /**
             * <p>以动态执行加载的脚本内容方式加载</p>
             */
            EXEC = "exec"
        }
        /**
         * <p>javascript资源类型</p>
         */
        enum JS_SRC_TYPE {
            /**
             * <p>url路径方式</p>
             */
            URL = "url",
            /**
             * <p>源脚本方式</p>
             */
            CONTENT = "content"
        }
    }
    /**
     * <p>数据辅助模块</p>
     */
    namespace DataHelper {
        /**
         * <p>数组模块</p>
         */
        namespace Array {
            /**
             * <p>在数组末尾追加元素</p>
             * @param array - <p>目标数组</p>
             * @param val - <p>待增加的元素</p>
             * @param [isForce = false] - <p>是否强制增加，强制则不判断数组中是否已经存在</p>
             * @returns <ul>
             * <li>增加元素或已存在元素的索引</li>
             * </ul>
             */
            function push(array: any[], val: any, isForce?: boolean): number;
            /**
             * <p>根据索引数组删除数组元素</p>
             * @param array - <p>数组</p>
             * @param indexArray - <p>序列数组</p>
             */
            function removeWithIndexArray(array: any[], indexArray: number[]): any[];
            /**
             * <p>在数组中去除重复项，稳定的（保留第一个）</p>
             * @param array - <p>原始数组</p>
             * @returns <ul>
             * <li>删除了重复项的数组</li>
             * </ul>
             */
            function unique(array: any[]): any[];
            /**
             * <p>根据keys值，构造新数组只包含keys中包含的key</p>
             * @param array - <p>源数组</p>
             * @param keys - <p>要取的键值数组</p>
             * @param [isAllowNull = false] - <p>是否允许值为空，默认不允许</p>
             * @returns <p>[{key1:XX,key2:XX},{key1:XX,key2:XX}]</p>
             */
            function getWithKeys(array: any[], keys: string[], isAllowNull?: boolean): any[];
            /**
             * <p>删除数组中array1中存在与数值array2中相同的元素</p>
             * @param array1 - <p>原始数组</p>
             * @param array2 - <p>校样数组</p>
             * @returns <p>返回新数组</p>
             */
            function subtract(array1: any[], array2: any[]): any[];
            /**
             * <p>在数组末尾追加元素</p>
             * @param array - <p>目标数组</p>
             * @param val - <p>待增加的元素</p>
             * @param [isForce = false] - <p>是否强制增加，强制则不判断数组中是否已经存在</p>
             * @returns <ul>
             * <li>增加元素或已存在元素的索引</li>
             * </ul>
             */
            function push(array: any[], val: any, isForce?: boolean): number;
            /**
             * <p>根据索引数组删除数组元素</p>
             * @param array - <p>数组</p>
             * @param indexArray - <p>序列数组</p>
             */
            function removeWithIndexArray(array: any[], indexArray: number[]): any[];
            /**
             * <p>在数组中去除重复项，稳定的（保留第一个）</p>
             * @param array - <p>原始数组</p>
             * @returns <ul>
             * <li>删除了重复项的数组</li>
             * </ul>
             */
            function unique(array: any[]): any[];
            /**
             * <p>根据keys值，构造新数组只包含keys中包含的key</p>
             * @param array - <p>源数组</p>
             * @param keys - <p>要取的键值数组</p>
             * @param [isAllowNull = false] - <p>是否允许值为空，默认不允许</p>
             * @returns <p>[{key1:XX,key2:XX},{key1:XX,key2:XX}]</p>
             */
            function getWithKeys(array: any[], keys: string[], isAllowNull?: boolean): any[];
            /**
             * <p>删除数组中array1中存在与数值array2中相同的元素</p>
             * @param array1 - <p>原始数组</p>
             * @param array2 - <p>校样数组</p>
             * @returns <p>返回新数组</p>
             */
            function subtract(array1: any[], array2: any[]): any[];
        }
        /**
         * <p>对象模块</p>
         */
        namespace Object {
            /**
             * <p>合并两个对象</p>
             * @param srcObj - <p>源对象</p>
             * @param destObj - <p>目标对象</p>
             * @param [isDeep = true] - <p>是否深拷贝</p>
             * @param [isNew = false] - <p>是否返回新对象，否则影响源对象</p>
             * @returns <ul>
             * <li>合并后的对象</li>
             * </ul>
             */
            function merge(srcObj: any, destObj: any, isDeep?: boolean, isNew?: boolean): any;
            /**
             * <p>拷贝对象</p>
             * @example
             * const myclone = THINGX.Utils.clone(obj);
             * @param obj - <p>需要被拷贝的对象</p>
             * @param [isDeep = true] - <p>是否深拷贝</p>
             * @param [endCheck = () => {return false;}] - <p>停止拷贝的条件函数</p>
             */
            function clone(obj: any, isDeep?: boolean, endCheck?: (...params: any[]) => any): any;
            /**
             * <p>获取对象第一个key</p>
             * @param obj - <p>对象</p>
             */
            function getFirstKey(obj: any): any;
            /**
             * <p>获取对象第一个值</p>
             * @param obj - <p>对象</p>
             */
            function getFirstValue(obj: any): any;
            /**
             * <p>对象是否为空</p>
             * @param obj - <p>对象</p>
             */
            function isEmpty(obj: any): boolean;
            /**
             * <p>从obj1中删除obj2中已有的元素</p>
             * @param obj1 - <p>对象1</p>
             * @param obj2 - <p>对象2</p>
             * @param [isCheckVal = false] - <p>是否对比元素值一样</p>
             * @returns <ul>
             * <li>新对象，obj1的子集</li>
             * </ul>
             */
            function subtract(obj1: any, obj2: any, isCheckVal?: boolean): any;
            /**
             * <p>合并两个对象</p>
             * @param srcObj - <p>源对象</p>
             * @param destObj - <p>目标对象</p>
             * @param [isDeep = true] - <p>是否深拷贝</p>
             * @param [isNew = false] - <p>是否返回新对象，否则影响源对象</p>
             * @returns <ul>
             * <li>合并后的对象</li>
             * </ul>
             */
            function merge(srcObj: any, destObj: any, isDeep?: boolean, isNew?: boolean): any;
            /**
             * <p>拷贝对象</p>
             * @example
             * const myclone = THINGX.Utils.clone(obj);
             * @param obj - <p>需要被拷贝的对象</p>
             * @param [isDeep = true] - <p>是否深拷贝</p>
             * @param [endCheck = () => {return false;}] - <p>停止拷贝的条件函数</p>
             */
            function clone(obj: any, isDeep?: boolean, endCheck?: (...params: any[]) => any): any;
            /**
             * <p>获取对象第一个key</p>
             * @param obj - <p>对象</p>
             */
            function getFirstKey(obj: any): any;
            /**
             * <p>获取对象第一个值</p>
             * @param obj - <p>对象</p>
             */
            function getFirstValue(obj: any): any;
            /**
             * <p>对象是否为空</p>
             * @param obj - <p>对象</p>
             */
            function isEmpty(obj: any): boolean;
            /**
             * <p>从obj1中删除obj2中已有的元素</p>
             * @param obj1 - <p>对象1</p>
             * @param obj2 - <p>对象2</p>
             * @param [isCheckVal = false] - <p>是否对比元素值一样</p>
             * @returns <ul>
             * <li>新对象，obj1的子集</li>
             * </ul>
             */
            function subtract(obj1: any, obj2: any, isCheckVal?: boolean): any;
        }
        /**
         * <p>字符串模块</p>
         */
        namespace String { }
        /**
         * <p>字符串模块</p>
         */
        namespace Time {
            /**
             * <p>延时某段时间，只执行最后一次
             * 类似于requestAnimationFrame</p>
             * @param fn - <p>执行函数</p>
             */
            function delay(fn: any, _a: any): void;
            /**
             * <p>延时某段时间，只执行最后一次
             * 类似于requestAnimationFrame</p>
             * @param fn - <p>执行函数</p>
             */
            function delay(fn: any, _a: any): void;
        }
        /**
         * <p>vector3向量模块</p>
         */
        namespace Vector {
            /**
             * <p>两个向量加</p>
             * @param vec1 - <p>向量1</p>
             * @param vec2 - <p>向量2</p>
             */
            function add(vec1: number[], vec2: number[]): number[];
            /**
             * <p>向量与数值相乘</p>
             * @param vec - <p>向量</p>
             * @param num - <p>数值</p>
             */
            function multiplyNumber(vec: number[], num: number): number[];
            /**
             * <p>两个向量相减, vec1 - vec2</p>
             * @param vec1 - <p>向量1</p>
             * @param vec2 - <p>向量2</p>
             */
            function subtract(vec1: number[], vec2: number[]): number[];
            /**
             * <p>向量标准化</p>
             * @param vec - <p>向量</p>
             */
            function normalize(vec: number[]): number[];
            /**
             * <p>获取向量长度</p>
             * @param vec - <p>向量</p>
             */
            function length(vec: number[]): number;
            /**
             * <p>获取两个向量之间的距离</p>
             * @param vec1 - <p>向量1</p>
             * @param vec2 - <p>向量2</p>
             */
            function distance(vec1: number[], vec2: number[]): number;
            /**
             * <p>两个向量加</p>
             * @param vec1 - <p>向量1</p>
             * @param vec2 - <p>向量2</p>
             */
            function add(vec1: number[], vec2: number[]): number[];
            /**
             * <p>向量与数值相乘</p>
             * @param vec - <p>向量</p>
             * @param num - <p>数值</p>
             */
            function multiplyNumber(vec: number[], num: number): number[];
            /**
             * <p>两个向量相减, vec1 - vec2</p>
             * @param vec1 - <p>向量1</p>
             * @param vec2 - <p>向量2</p>
             */
            function subtract(vec1: number[], vec2: number[]): number[];
            /**
             * <p>向量标准化</p>
             * @param vec - <p>向量</p>
             */
            function normalize(vec: number[]): number[];
            /**
             * <p>获取向量长度</p>
             * @param vec - <p>向量</p>
             */
            function length(vec: number[]): number;
            /**
             * <p>获取两个向量之间的距离</p>
             * @param vec1 - <p>向量1</p>
             * @param vec2 - <p>向量2</p>
             */
            function distance(vec1: number[], vec2: number[]): number;
        }
        /**
         * <p>数组模块</p>
         */
        namespace Array {
            /**
             * <p>在数组末尾追加元素</p>
             * @param array - <p>目标数组</p>
             * @param val - <p>待增加的元素</p>
             * @param [isForce = false] - <p>是否强制增加，强制则不判断数组中是否已经存在</p>
             * @returns <ul>
             * <li>增加元素或已存在元素的索引</li>
             * </ul>
             */
            function push(array: any[], val: any, isForce?: boolean): number;
            /**
             * <p>根据索引数组删除数组元素</p>
             * @param array - <p>数组</p>
             * @param indexArray - <p>序列数组</p>
             */
            function removeWithIndexArray(array: any[], indexArray: number[]): any[];
            /**
             * <p>在数组中去除重复项，稳定的（保留第一个）</p>
             * @param array - <p>原始数组</p>
             * @returns <ul>
             * <li>删除了重复项的数组</li>
             * </ul>
             */
            function unique(array: any[]): any[];
            /**
             * <p>根据keys值，构造新数组只包含keys中包含的key</p>
             * @param array - <p>源数组</p>
             * @param keys - <p>要取的键值数组</p>
             * @param [isAllowNull = false] - <p>是否允许值为空，默认不允许</p>
             * @returns <p>[{key1:XX,key2:XX},{key1:XX,key2:XX}]</p>
             */
            function getWithKeys(array: any[], keys: string[], isAllowNull?: boolean): any[];
            /**
             * <p>删除数组中array1中存在与数值array2中相同的元素</p>
             * @param array1 - <p>原始数组</p>
             * @param array2 - <p>校样数组</p>
             * @returns <p>返回新数组</p>
             */
            function subtract(array1: any[], array2: any[]): any[];
            /**
             * <p>在数组末尾追加元素</p>
             * @param array - <p>目标数组</p>
             * @param val - <p>待增加的元素</p>
             * @param [isForce = false] - <p>是否强制增加，强制则不判断数组中是否已经存在</p>
             * @returns <ul>
             * <li>增加元素或已存在元素的索引</li>
             * </ul>
             */
            function push(array: any[], val: any, isForce?: boolean): number;
            /**
             * <p>根据索引数组删除数组元素</p>
             * @param array - <p>数组</p>
             * @param indexArray - <p>序列数组</p>
             */
            function removeWithIndexArray(array: any[], indexArray: number[]): any[];
            /**
             * <p>在数组中去除重复项，稳定的（保留第一个）</p>
             * @param array - <p>原始数组</p>
             * @returns <ul>
             * <li>删除了重复项的数组</li>
             * </ul>
             */
            function unique(array: any[]): any[];
            /**
             * <p>根据keys值，构造新数组只包含keys中包含的key</p>
             * @param array - <p>源数组</p>
             * @param keys - <p>要取的键值数组</p>
             * @param [isAllowNull = false] - <p>是否允许值为空，默认不允许</p>
             * @returns <p>[{key1:XX,key2:XX},{key1:XX,key2:XX}]</p>
             */
            function getWithKeys(array: any[], keys: string[], isAllowNull?: boolean): any[];
            /**
             * <p>删除数组中array1中存在与数值array2中相同的元素</p>
             * @param array1 - <p>原始数组</p>
             * @param array2 - <p>校样数组</p>
             * @returns <p>返回新数组</p>
             */
            function subtract(array1: any[], array2: any[]): any[];
        }
        /**
         * <p>对象模块</p>
         */
        namespace Object {
            /**
             * <p>合并两个对象</p>
             * @param srcObj - <p>源对象</p>
             * @param destObj - <p>目标对象</p>
             * @param [isDeep = true] - <p>是否深拷贝</p>
             * @param [isNew = false] - <p>是否返回新对象，否则影响源对象</p>
             * @returns <ul>
             * <li>合并后的对象</li>
             * </ul>
             */
            function merge(srcObj: any, destObj: any, isDeep?: boolean, isNew?: boolean): any;
            /**
             * <p>拷贝对象</p>
             * @example
             * const myclone = THINGX.Utils.clone(obj);
             * @param obj - <p>需要被拷贝的对象</p>
             * @param [isDeep = true] - <p>是否深拷贝</p>
             * @param [endCheck = () => {return false;}] - <p>停止拷贝的条件函数</p>
             */
            function clone(obj: any, isDeep?: boolean, endCheck?: (...params: any[]) => any): any;
            /**
             * <p>获取对象第一个key</p>
             * @param obj - <p>对象</p>
             */
            function getFirstKey(obj: any): any;
            /**
             * <p>获取对象第一个值</p>
             * @param obj - <p>对象</p>
             */
            function getFirstValue(obj: any): any;
            /**
             * <p>对象是否为空</p>
             * @param obj - <p>对象</p>
             */
            function isEmpty(obj: any): boolean;
            /**
             * <p>从obj1中删除obj2中已有的元素</p>
             * @param obj1 - <p>对象1</p>
             * @param obj2 - <p>对象2</p>
             * @param [isCheckVal = false] - <p>是否对比元素值一样</p>
             * @returns <ul>
             * <li>新对象，obj1的子集</li>
             * </ul>
             */
            function subtract(obj1: any, obj2: any, isCheckVal?: boolean): any;
            /**
             * <p>合并两个对象</p>
             * @param srcObj - <p>源对象</p>
             * @param destObj - <p>目标对象</p>
             * @param [isDeep = true] - <p>是否深拷贝</p>
             * @param [isNew = false] - <p>是否返回新对象，否则影响源对象</p>
             * @returns <ul>
             * <li>合并后的对象</li>
             * </ul>
             */
            function merge(srcObj: any, destObj: any, isDeep?: boolean, isNew?: boolean): any;
            /**
             * <p>拷贝对象</p>
             * @example
             * const myclone = THINGX.Utils.clone(obj);
             * @param obj - <p>需要被拷贝的对象</p>
             * @param [isDeep = true] - <p>是否深拷贝</p>
             * @param [endCheck = () => {return false;}] - <p>停止拷贝的条件函数</p>
             */
            function clone(obj: any, isDeep?: boolean, endCheck?: (...params: any[]) => any): any;
            /**
             * <p>获取对象第一个key</p>
             * @param obj - <p>对象</p>
             */
            function getFirstKey(obj: any): any;
            /**
             * <p>获取对象第一个值</p>
             * @param obj - <p>对象</p>
             */
            function getFirstValue(obj: any): any;
            /**
             * <p>对象是否为空</p>
             * @param obj - <p>对象</p>
             */
            function isEmpty(obj: any): boolean;
            /**
             * <p>从obj1中删除obj2中已有的元素</p>
             * @param obj1 - <p>对象1</p>
             * @param obj2 - <p>对象2</p>
             * @param [isCheckVal = false] - <p>是否对比元素值一样</p>
             * @returns <ul>
             * <li>新对象，obj1的子集</li>
             * </ul>
             */
            function subtract(obj1: any, obj2: any, isCheckVal?: boolean): any;
        }
        /**
         * <p>字符串模块</p>
         */
        namespace String { }
        /**
         * <p>字符串模块</p>
         */
        namespace Time {
            /**
             * <p>延时某段时间，只执行最后一次
             * 类似于requestAnimationFrame</p>
             * @param fn - <p>执行函数</p>
             */
            function delay(fn: any, _a: any): void;
            /**
             * <p>延时某段时间，只执行最后一次
             * 类似于requestAnimationFrame</p>
             * @param fn - <p>执行函数</p>
             */
            function delay(fn: any, _a: any): void;
        }
        /**
         * <p>vector3向量模块</p>
         */
        namespace Vector {
            /**
             * <p>两个向量加</p>
             * @param vec1 - <p>向量1</p>
             * @param vec2 - <p>向量2</p>
             */
            function add(vec1: number[], vec2: number[]): number[];
            /**
             * <p>向量与数值相乘</p>
             * @param vec - <p>向量</p>
             * @param num - <p>数值</p>
             */
            function multiplyNumber(vec: number[], num: number): number[];
            /**
             * <p>两个向量相减, vec1 - vec2</p>
             * @param vec1 - <p>向量1</p>
             * @param vec2 - <p>向量2</p>
             */
            function subtract(vec1: number[], vec2: number[]): number[];
            /**
             * <p>向量标准化</p>
             * @param vec - <p>向量</p>
             */
            function normalize(vec: number[]): number[];
            /**
             * <p>获取向量长度</p>
             * @param vec - <p>向量</p>
             */
            function length(vec: number[]): number;
            /**
             * <p>获取两个向量之间的距离</p>
             * @param vec1 - <p>向量1</p>
             * @param vec2 - <p>向量2</p>
             */
            function distance(vec1: number[], vec2: number[]): number;
            /**
             * <p>两个向量加</p>
             * @param vec1 - <p>向量1</p>
             * @param vec2 - <p>向量2</p>
             */
            function add(vec1: number[], vec2: number[]): number[];
            /**
             * <p>向量与数值相乘</p>
             * @param vec - <p>向量</p>
             * @param num - <p>数值</p>
             */
            function multiplyNumber(vec: number[], num: number): number[];
            /**
             * <p>两个向量相减, vec1 - vec2</p>
             * @param vec1 - <p>向量1</p>
             * @param vec2 - <p>向量2</p>
             */
            function subtract(vec1: number[], vec2: number[]): number[];
            /**
             * <p>向量标准化</p>
             * @param vec - <p>向量</p>
             */
            function normalize(vec: number[]): number[];
            /**
             * <p>获取向量长度</p>
             * @param vec - <p>向量</p>
             */
            function length(vec: number[]): number;
            /**
             * <p>获取两个向量之间的距离</p>
             * @param vec1 - <p>向量1</p>
             * @param vec2 - <p>向量2</p>
             */
            function distance(vec1: number[], vec2: number[]): number;
        }
    }
    /**
     * <p>孪生体模块</p>
     */
    namespace DigitalTwin {
        /**
         * <p>显示孪生体</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param [purpose = default] - <p>目的</p>
         * @returns <ul>
         * <li>执行过操作的孪生体集合</li>
         * </ul>
         */
        function show(digitalTwin: THING.BaseObject | string, purpose?: string): THING.BaseObject[];
        /**
         * <p>隐藏孪生体</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param [purpose = default] - <p>目的</p>
         * @returns <ul>
         * <li>执行过操作的孪生体集合</li>
         * </ul>
         */
        function hide(digitalTwin: THING.BaseObject | string, purpose?: string): THING.BaseObject[];
        /**
         * <p>判断孪生体是否带有某个显示目的</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param [purpose = default] - <p>目的</p>
         * @returns <ul>
         * <li>如果多个孪生体 则所有孪生体都包含显示目的才返回true</li>
         * </ul>
         */
        function hasShowPurpose(digitalTwin: THING.BaseObject | string, purpose?: string): boolean;
        /**
         * <p>平滑显示孪生体</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param opts - <p>缓动效果</p>
         * @param opts.lerpType - <p>淡入动画效果 默认Quartic.In</p>
         * @param opts.time - <p>动画时间 默认500ms</p>
         * @param opts.purpose - <p>显示目的</p>
         * @returns <ul>
         * <li>动画完成,孪生体集合</li>
         * </ul>
         */
        function showWithSmoothAnimation(digitalTwin: THING.BaseObject | string, opts: {
            lerpType: string;
            time: number;
            purpose: string;
        }): Promise<THING.BaseObject[]>;
        /**
         * <p>平滑隐藏孪生体</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param opts - <p>缓动效果</p>
         * @param opts.lerpType - <p>淡入动画效果 默认Quartic.Out</p>
         * @param opts.time - <p>动画时间 默认500ms</p>
         * @param opts.purpose - <p>隐藏目的</p>
         * @returns <ul>
         * <li>动画完成,孪生体集合</li>
         * </ul>
         */
        function hideWithSmoothAnimation(digitalTwin: THING.BaseObject | string, opts: {
            lerpType: string;
            time: number;
            purpose: string;
        }): Promise<THING.BaseObject[]>;
        /**
         * <p>添加孪生体颜色到栈中</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param purpose - <p>变色的目的（用于取消该次变色）</p>
         * @param color - <p>十六进制颜色字符串 如'#ff0000'</p>
         * @param [priority = 0] - <p>颜色设置的优先级</p>
         * @param [traverse = false] - <p>是否遍历子元素</p>
         * @param [intensity = 0.7] - <p>颜色强度，越高变色越明显</p>
         * @returns <ul>
         * <li>执行过操作的孪生体集合</li>
         * </ul>
         */
        function addColor(digitalTwin: THING.BaseObject | string, purpose: string, color: string, priority?: number, traverse?: boolean, intensity?: number): THING.BaseObject[];
        /**
         * <p>从孪生体颜色栈中移除指定颜色</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param purpose - <p>变色目的</p>
         * @param traverse - <p>是否遍历子元素</p>
         * @returns <ul>
         * <li>执行过操作的孪生体集合</li>
         * </ul>
         */
        function removeColor(digitalTwin: THING.BaseObject | string, purpose: string, traverse: boolean): THING.BaseObject[];
        /**
         * <p>添加孪生体透明到栈中</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param purpose - <p>透明的目的（用于取消该次透明）</p>
         * @param opacity - <p>透明度</p>
         * @param [priority = 0] - <p>透明设置的优先级</p>
         * @param [traverse = false] - <p>是否遍历子元素</p>
         * @param [ignoreTag = [inheritOpacity]] - <p>忽略的标签</p>
         * @returns <ul>
         * <li>执行过操作的孪生体集合</li>
         * </ul>
         */
        function addOpacity(digitalTwin: THING.BaseObject | string, purpose: string, opacity: number, priority?: number, traverse?: boolean, ignoreTag?: string): THING.BaseObject[];
        /**
         * <p>从孪生体透明栈中移除指定目的的透明</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param purpose - <p>透明目的</p>
         * @param [traverse = false] - <p>是否遍历子元素</p>
         * @param [ignoreTag = [inheritOpacity]] - <p>忽略的标签</p>
         * @returns <ul>
         * <li>执行过操作的孪生体集合</li>
         * </ul>
         */
        function removeOpacity(digitalTwin: THING.BaseObject | string, purpose: string, traverse?: boolean, ignoreTag?: string): THING.BaseObject[];
        /**
         * <p>显示孪生体面板</p>
         * @param [digitalTwin = THINGX.App.currentSelected] - <p>孪生体对象，默认值是当前选择的孪生体中的第一个</p>
         * @param [config = {}] - <p>显示位置配置</p>
         * @param config.popup - <p>面板类型 custom</p>
         * @param config.top - <p>距上偏移</p>
         * @param config.left - <p>距左偏移</p>
         */
        function showPanel(digitalTwin?: THING.BaseObject, config?: {
            popup: string;
            top: number;
            left: number;
        }, isShowed?: boolena): void;
        /**
         * <p>隐藏当前显示的孪生体面板</p>
         */
        function hidePanel(): void;
        /**
         * <p>激活当前孪生体面板上的tab</p>
         * @param name - <p>tab名称</p>
         */
        function activateTabOnPanel(name: string): void;
        /**
         * <p>获取当前在孪生体面板上激活的tab</p>
         * @returns <ul>
         * <li>tab名称，失败返回false</li>
         * </ul>
         */
        function getActivatedTabOnPanel(): string | boolean;
        /**
         * <p>重新读取孪生体面板可视化配置</p>
         */
        function refresh(): void;
        /**
         * <p>获取孪生体指定面板名称配置</p>
         * @param digitalTwin - <p>孪生体对象</p>
         * @param name - <p>面板名称</p>
         */
        function getPanelConfig(digitalTwin: THING.BaseObject, name: string): any;
        /**
         * <p>通过ci数据创建孪生体</p>
         * @param ciData - <p>孪生体ci数据</p>
         * @param [onlyEmptyNode = true] - <p>true:只创建空点,不加载模型; false:加载模型</p>
         */
        function createByCIData(ciData: any, options?: any, onlyEmptyNode?: boolean): Promise<THING.BaseObject>;
        /**
         * @param dtwins - <p>孪生体或孪生体组成的数组</p>
         * @param [Category = []] - <p>分类</p>
         * @param [queryChildren = false] - <p>false:获取Ci 不包含孩子</p>
         */
        function getCategoryCIData(dtwins: any | any[], Category?: any, queryChildren?: boolean): void;
        /**
         * @param dtwin - <p>孪生体或孪生体组成的数组</p>
         */
        function initializeCIData(dtwin: any): void;
        /**
         * <p>显示孪生体</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param [purpose = default] - <p>目的</p>
         * @returns <ul>
         * <li>执行过操作的孪生体集合</li>
         * </ul>
         */
        function show(digitalTwin: THING.BaseObject | string, purpose?: string): THING.BaseObject[];
        /**
         * <p>隐藏孪生体</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param [purpose = default] - <p>目的</p>
         * @returns <ul>
         * <li>执行过操作的孪生体集合</li>
         * </ul>
         */
        function hide(digitalTwin: THING.BaseObject | string, purpose?: string): THING.BaseObject[];
        /**
         * <p>判断孪生体是否带有某个显示目的</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param [purpose = default] - <p>目的</p>
         * @returns <ul>
         * <li>如果多个孪生体 则所有孪生体都包含显示目的才返回true</li>
         * </ul>
         */
        function hasShowPurpose(digitalTwin: THING.BaseObject | string, purpose?: string): boolean;
        /**
         * <p>平滑显示孪生体</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param opts - <p>缓动效果</p>
         * @param opts.lerpType - <p>淡入动画效果 默认Quartic.In</p>
         * @param opts.time - <p>动画时间 默认500ms</p>
         * @param opts.purpose - <p>显示目的</p>
         * @returns <ul>
         * <li>动画完成,孪生体集合</li>
         * </ul>
         */
        function showWithSmoothAnimation(digitalTwin: THING.BaseObject | string, opts: {
            lerpType: string;
            time: number;
            purpose: string;
        }): Promise<THING.BaseObject[]>;
        /**
         * <p>平滑隐藏孪生体</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param opts - <p>缓动效果</p>
         * @param opts.lerpType - <p>淡入动画效果 默认Quartic.Out</p>
         * @param opts.time - <p>动画时间 默认500ms</p>
         * @param opts.purpose - <p>隐藏目的</p>
         * @returns <ul>
         * <li>动画完成,孪生体集合</li>
         * </ul>
         */
        function hideWithSmoothAnimation(digitalTwin: THING.BaseObject | string, opts: {
            lerpType: string;
            time: number;
            purpose: string;
        }): Promise<THING.BaseObject[]>;
        /**
         * <p>添加孪生体颜色到栈中</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param purpose - <p>变色的目的（用于取消该次变色）</p>
         * @param color - <p>十六进制颜色字符串 如'#ff0000'</p>
         * @param [priority = 0] - <p>颜色设置的优先级</p>
         * @param [traverse = false] - <p>是否遍历子元素</p>
         * @param [intensity = 0.7] - <p>颜色强度，越高变色越明显</p>
         * @returns <ul>
         * <li>执行过操作的孪生体集合</li>
         * </ul>
         */
        function addColor(digitalTwin: THING.BaseObject | string, purpose: string, color: string, priority?: number, traverse?: boolean, intensity?: number): THING.BaseObject[];
        /**
         * <p>从孪生体颜色栈中移除指定颜色</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param purpose - <p>变色目的</p>
         * @param traverse - <p>是否遍历子元素</p>
         * @returns <ul>
         * <li>执行过操作的孪生体集合</li>
         * </ul>
         */
        function removeColor(digitalTwin: THING.BaseObject | string, purpose: string, traverse: boolean): THING.BaseObject[];
        /**
         * <p>添加孪生体透明到栈中</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param purpose - <p>透明的目的（用于取消该次透明）</p>
         * @param opacity - <p>透明度</p>
         * @param [priority = 0] - <p>透明设置的优先级</p>
         * @param [traverse = false] - <p>是否遍历子元素</p>
         * @param [ignoreTag = [inheritOpacity]] - <p>忽略的标签</p>
         * @returns <ul>
         * <li>执行过操作的孪生体集合</li>
         * </ul>
         */
        function addOpacity(digitalTwin: THING.BaseObject | string, purpose: string, opacity: number, priority?: number, traverse?: boolean, ignoreTag?: string): THING.BaseObject[];
        /**
         * <p>从孪生体透明栈中移除指定目的的透明</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param purpose - <p>透明目的</p>
         * @param [traverse = false] - <p>是否遍历子元素</p>
         * @param [ignoreTag = [inheritOpacity]] - <p>忽略的标签</p>
         * @returns <ul>
         * <li>执行过操作的孪生体集合</li>
         * </ul>
         */
        function removeOpacity(digitalTwin: THING.BaseObject | string, purpose: string, traverse?: boolean, ignoreTag?: string): THING.BaseObject[];
        /**
         * <p>显示孪生体面板</p>
         * @param [digitalTwin = THINGX.App.currentSelected] - <p>孪生体对象，默认值是当前选择的孪生体中的第一个</p>
         * @param [config = {}] - <p>显示位置配置</p>
         * @param config.popup - <p>面板类型 custom</p>
         * @param config.top - <p>距上偏移</p>
         * @param config.left - <p>距左偏移</p>
         */
        function showPanel(digitalTwin?: THING.BaseObject, config?: {
            popup: string;
            top: number;
            left: number;
        }, isShowed?: boolena): void;
        /**
         * <p>隐藏当前显示的孪生体面板</p>
         */
        function hidePanel(): void;
        /**
         * <p>激活当前孪生体面板上的tab</p>
         * @param name - <p>tab名称</p>
         */
        function activateTabOnPanel(name: string): void;
        /**
         * <p>获取当前在孪生体面板上激活的tab</p>
         * @returns <ul>
         * <li>tab名称，失败返回false</li>
         * </ul>
         */
        function getActivatedTabOnPanel(): string | boolean;
        /**
         * <p>重新读取孪生体面板可视化配置</p>
         */
        function refresh(): void;
        /**
         * <p>获取孪生体指定面板名称配置</p>
         * @param digitalTwin - <p>孪生体对象</p>
         * @param name - <p>面板名称</p>
         */
        function getPanelConfig(digitalTwin: THING.BaseObject, name: string): any;
        /**
         * <p>通过ci数据创建孪生体</p>
         * @param ciData - <p>孪生体ci数据</p>
         * @param [onlyEmptyNode = true] - <p>true:只创建空点,不加载模型; false:加载模型</p>
         */
        function createByCIData(ciData: any, options?: any, onlyEmptyNode?: boolean): Promise<THING.BaseObject>;
        /**
         * @param dtwins - <p>孪生体或孪生体组成的数组</p>
         * @param [Category = []] - <p>分类</p>
         * @param [queryChildren = false] - <p>false:获取Ci 不包含孩子</p>
         */
        function getCategoryCIData(dtwins: any | any[], Category?: any, queryChildren?: boolean): void;
        /**
         * @param dtwin - <p>孪生体或孪生体组成的数组</p>
         */
        function initializeCIData(dtwin: any): void;
    }
    /**
     * <p>Http请求模块</p>
     */
    namespace Http {
        /**
         * @property [timeout = 0] - <p>请求超时时间，0表示没超时限制</p>
         * @property [withCredentials = false] - <p>表示跨域请求时是否需要使用凭证</p>
         * @property headers - <p>发送的自定义请求头</p>
         * @property [responseType = json] - <p>示服务器响应的数据类型 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'</p>
         */
        type Config = {
            timeout?: number;
            withCredentials?: boolean;
            headers: Map<string, string>;
            responseType?: string;
        };
        /**
         * <p>http get请求</p>
         * @param url - <p>请求的url</p>
         * @param data - <p>请求数据</p>
         * @param config - <p>请求配置</p>
         */
        function get(url: string, data: any, config: THINGX.Http.Config): Promis<object>;
        /**
         * <p>http post请求</p>
         * @param url - <p>请求的url</p>
         * @param data - <p>请求数据</p>
         * @param config - <p>请求配置</p>
         */
        function post(url: string, data: any, config: THINGX.Http.Config): Promis<object>;
        /**
         * @property [timeout = 0] - <p>请求超时时间，0表示没超时限制</p>
         * @property [withCredentials = false] - <p>表示跨域请求时是否需要使用凭证</p>
         * @property headers - <p>发送的自定义请求头</p>
         * @property [responseType = json] - <p>示服务器响应的数据类型 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'</p>
         */
        type Config = {
            timeout?: number;
            withCredentials?: boolean;
            headers: Map<string, string>;
            responseType?: string;
        };
        /**
         * <p>http get请求</p>
         * @param url - <p>请求的url</p>
         * @param data - <p>请求数据</p>
         * @param config - <p>请求配置</p>
         */
        function get(url: string, data: any, config: THINGX.Http.Config): Promis<object>;
        /**
         * <p>http post请求</p>
         * @param url - <p>请求的url</p>
         * @param data - <p>请求数据</p>
         * @param config - <p>请求配置</p>
         */
        function post(url: string, data: any, config: THINGX.Http.Config): Promis<object>;
    }
    /**
     * <p>图层模块</p>
     */
    namespace Layer {
        /**
         * @property type - <p>图层显示方式: 0是一直显示, 1是业务激活时显示, 2隐藏</p>
         * @property subType - <p>子图层显示方式: 0是悬浮出现, 1是点击出现</p>
         * @property restoreEnable - <p>是否启用恢复按钮</p>
         */
        type GlobalConfig = {
            type: number;
            subType: number;
            restoreEnable: boolean;
        };
        /**
         * <p>显示图层模块</p>
         */
        function show(): void;
        /**
         * <p>隐藏图层模块</p>
         */
        function hide(): void;
        /**
         * <p>通过图层名称获取当前层级图层的实例</p>
         * @param name - <p>图层名称</p>
         * @returns <ul>
         * <li>图层实例</li>
         * </ul>
         */
        function get(name: string): any | null;
        /**
         * <p>激活图层</p>
         * @param name - <p>图层名称</p>
         * @param [purpose = _default_] - <p>激活目的</p>
         */
        function activate(name: string | string[], purpose?: string): void;
        /**
         * <p>取消激活图层</p>
         * @param name - <p>图层名称</p>
         * @param [purpose = _default_] - <p>取消激活目的</p>
         */
        function deactivate(name: string | string[], purpose?: string): void;
        /**
         * <p>取消激活所有图层</p>
         */
        function deactivateAll(): void;
        /**
         * <p>获取当前激活的图层数组</p>
         */
        function getActivated(): object[];
        /**
         * <p>重新读取可视化配置 并根据当前层级重新创建图层</p>
         */
        function refresh(): void;
        /**
         * <p>获取图层用户自定义配置</p>
         * @example
         * const curLevel = THINGX.App.currentLevel;
         * const config = THINGX.Layer.getCustomConfig('建筑信息', curLevel);
         * @param [name] - <p>图层名称，undefined表示所有图层</p>
         * @param [level = THINGX.App.currentLevel] - <p>孪生体对象/孪生体分类</p>
         */
        function getCustomConfig(name?: string | undefined, level?: THING.BaseObject | THINGX.CONST.DEFAULT_DIGITAL_TWIN_CLASS): any;
        /**
         * <p>获取指定层级所有图层配置</p>
         * @example
         * const curLevel = THINGX.App.currentLevel;
         * const config = THINGX.Layer.getConfig(curLevel);
         * @param [level = THINGX.App.currentLevel] - <p>孪生体对象/孪生体分类</p>
         */
        function getConfig(level?: THING.BaseObject | THINGX.CONST.DEFAULT_DIGITAL_TWIN_CLASS): object[];
        /**
         * <p>获取图层的全局配置</p>
         */
        function getGlobalConfig(): THINGX.Layer.GlobalConfig;
        /**
         * <p>获取图层面板配置</p>
         */
        function getPanelConfig(): any | null;
        /**
         * <p>获取图层互斥配置</p>
         */
        function getLayerMutexsConfig(): string[];
        /**
         * <p>获取原生的图层项，不是实例</p>
         * @param name - <p>图层名称</p>
         */
        function getNative(name: string): any;
        /**
         * <p>获取图层组</p>
         * @param name - <p>图层组名称</p>
         */
        function getGroup(name: string): any;
        /**
         * <p>将图层注册条件转换成ThingJS表达式语法</p>
         */
        function regConditonToThingJSQueryExpression(condition: object[] | any): string;
        /**
         * <p>返回当前层级图层树状层级结构</p>
         * @returns <ul>
         * <li>树状层级结构</li>
         * </ul>
         */
        function getTreeStruct(): any;
        /**
         * @property type - <p>图层显示方式: 0是一直显示, 1是业务激活时显示, 2隐藏</p>
         * @property subType - <p>子图层显示方式: 0是悬浮出现, 1是点击出现</p>
         * @property restoreEnable - <p>是否启用恢复按钮</p>
         */
        type GlobalConfig = {
            type: number;
            subType: number;
            restoreEnable: boolean;
        };
        /**
         * <p>显示图层模块</p>
         */
        function show(): void;
        /**
         * <p>隐藏图层模块</p>
         */
        function hide(): void;
        /**
         * <p>通过图层名称获取当前层级图层的实例</p>
         * @param name - <p>图层名称</p>
         * @returns <ul>
         * <li>图层实例</li>
         * </ul>
         */
        function get(name: string): any | null;
        /**
         * <p>激活图层</p>
         * @param name - <p>图层名称</p>
         * @param [purpose = _default_] - <p>激活目的</p>
         */
        function activate(name: string | string[], purpose?: string): void;
        /**
         * <p>取消激活图层</p>
         * @param name - <p>图层名称</p>
         * @param [purpose = _default_] - <p>取消激活目的</p>
         */
        function deactivate(name: string | string[], purpose?: string): void;
        /**
         * <p>取消激活所有图层</p>
         */
        function deactivateAll(): void;
        /**
         * <p>获取当前激活的图层数组</p>
         */
        function getActivated(): object[];
        /**
         * <p>重新读取可视化配置 并根据当前层级重新创建图层</p>
         */
        function refresh(): void;
        /**
         * <p>获取图层用户自定义配置</p>
         * @example
         * const curLevel = THINGX.App.currentLevel;
         * const config = THINGX.Layer.getCustomConfig('建筑信息', curLevel);
         * @param [name] - <p>图层名称，undefined表示所有图层</p>
         * @param [level = THINGX.App.currentLevel] - <p>孪生体对象/孪生体分类</p>
         */
        function getCustomConfig(name?: string | undefined, level?: THING.BaseObject | THINGX.CONST.DEFAULT_DIGITAL_TWIN_CLASS): any;
        /**
         * <p>获取指定层级所有图层配置</p>
         * @example
         * const curLevel = THINGX.App.currentLevel;
         * const config = THINGX.Layer.getConfig(curLevel);
         * @param [level = THINGX.App.currentLevel] - <p>孪生体对象/孪生体分类</p>
         */
        function getConfig(level?: THING.BaseObject | THINGX.CONST.DEFAULT_DIGITAL_TWIN_CLASS): object[];
        /**
         * <p>获取图层的全局配置</p>
         */
        function getGlobalConfig(): THINGX.Layer.GlobalConfig;
        /**
         * <p>获取图层面板配置</p>
         */
        function getPanelConfig(): any | null;
        /**
         * <p>获取图层互斥配置</p>
         */
        function getLayerMutexsConfig(): string[];
        /**
         * <p>获取原生的图层项，不是实例</p>
         * @param name - <p>图层名称</p>
         */
        function getNative(name: string): any;
        /**
         * <p>获取图层组</p>
         * @param name - <p>图层组名称</p>
         */
        function getGroup(name: string): any;
        /**
         * <p>将图层注册条件转换成ThingJS表达式语法</p>
         */
        function regConditonToThingJSQueryExpression(condition: object[] | any): string;
        /**
         * <p>返回当前层级图层树状层级结构</p>
         * @returns <ul>
         * <li>树状层级结构</li>
         * </ul>
         */
        function getTreeStruct(): any;
    }
    /**
     * <p>标记模块</p>
     */
    namespace Marker {
        /**
         * @property url - <p>标记使用图片路径</p>
         * @property width - <p>标记宽度</p>
         * @property height - <p>标记高度</p>
         * @property size - <p>像素大小</p>
         * @property getMethod - <p>取值方法</p>
         * @property pickable - <p>是否可被拾取</p>
         * @property keepSize - <p>是否保存像素大小</p>
         * @property inheritScale - <p>是否继承代理孪生体缩放</p>
         * @property inheritStyle - <p>是否继承代理孪生体样式</p>
         * @property alwaysOnTop - <p>是否始终处于最高层级渲染，无遮挡</p>
         * @property complete - <p>标记创建完成回调</p>
         * @property style - <p>标记样式 参考ThingJS</p>
         * @property businessName - <p>业务名称</p>
         */
        type CreateConfig = {
            url: string;
            width: number;
            height: number;
            size: number;
            getMethod: string;
            pickable: boolean;
            keepSize: boolean;
            inheritScale: boolean;
            inheritStyle: boolean;
            alwaysOnTop: boolean;
            complete: (...params: any[]) => any;
            style: any;
            businessName: string;
        };
        /**
         * <p>显示标记</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param name - <p>标记名称（在ThingJS-X中配置的对应的孪生体上的标记）</p>
         * @param [purpose = default] - <p>显示目的</p>
         * @returns <ul>
         * <li>返回操作过的标记列表</li>
         * </ul>
         */
        function show(digitalTwin: THING.BaseObject | string, name: string, purpose?: string): THING.BaseObject[];
        /**
         * <p>隐藏标记</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param name - <p>标记名称</p>
         * @param [purpose = default] - <p>隐藏目的</p>
         * @returns <ul>
         * <li>返回操作过的标记列表</li>
         * </ul>
         */
        function hide(digitalTwin: THING.BaseObject | string, name: string, purpose?: string): THING.BaseObject[];
        /**
         * <p>增加标记，增加后立即显示</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param name - <p>标记名称,可通过THINGX.Marker.getConfig获取孪生体上配置了哪些标记（在ThingJS-X中配置的对应的孪生体上的标记）</p>
         * @param isExcludeModel - <p>是否包含模型</p>
         * @returns <ul>
         * <li>成功返回标记对象</li>
         * </ul>
         */
        function add(digitalTwin: THING.BaseObject | string, name: string, isExcludeModel: boolean): THING.BaseObject[];
        /**
         * <p>获取已创建的标记</p>
         * @param digitalTwin - <p>孪生体对象</p>
         * @param name - <p>标记名称</p>
         * @returns <ul>
         * <li>成功返回标记对象</li>
         * </ul>
         */
        function get(digitalTwin: THING.BaseObject, name: string): THING.BaseObject | null;
        /**
         * <p>删除标记</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param name - <p>标记名称</p>
         * @returns <ul>
         * <li>是否删除成功</li>
         * </ul>
         */
        function remove(digitalTwin: THING.BaseObject | string, name: string): boolean;
        /**
         * <p>通过tag增加自定义标记</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param tag - <p>标签</p>
         * @param type - <p>标记类型</p>
         * @param config - <p>标记自定义配置</p>
         * @returns <ul>
         * <li>标记列表</li>
         * </ul>
         */
        function addWithTag(digitalTwin: THING.BaseObject | string, tag: string, type: string, config: THINGX.Marker.CreateConfig): THING.BaseObject[];
        /**
         * <p>通过标签删除标记</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param tag - <p>标签</p>
         * @returns <ul>
         * <li>是否删除成功</li>
         * </ul>
         */
        function removeWithTag(digitalTwin: THING.BaseObject | string, tag: string): boolean;
        /**
         * <p>获取孪生体标记配置数据</p>
         * @param digitalTwin - <p>孪生体对象</p>
         * @returns <ul>
         * <li>标记配置数据 业务名称:配置数据</li>
         * </ul>
         */
        function getConfig(digitalTwin: THING.BaseObject): Map<string, object>;
        /**
         * <p>获取孪生体上所有的标记</p>
         * @param digitalTwin - <p>孪生体对象</p>
         * @returns <ul>
         * <li>已经创建的标记 业务名称:标记对象</li>
         * </ul>
         */
        function getAll(digitalTwin: THING.BaseObject): Map<string, THING.BaseObject>;
        /**
         * <p>给符合条件的孪生体注册标记</p>
         * @param condition - <p>孪生体集合配置语法表达式 {REGTYPE_CLASSTYPE: 'Campus'}</p>
         * @param config - <p>标记配置</p>
         * @param [businessName = _default_] - <p>业务名称</p>
         */
        function addWithCondition(condition: string, config: any, businessName?: string): void;
        /**
         * <p>获取孪生体预加载的标记名称</p>
         * @param digitalTwin - <p>孪生体对象</p>
         * @returns <ul>
         * <li>预加载标记的名称,若没有则返回空值,可根据这个名称通过show或者hide方法来显示和影藏预加载标记</li>
         * </ul>
         */
        function getPreloadName(digitalTwin: THING.BaseObject): string;
        /**
         * @property url - <p>标记使用图片路径</p>
         * @property width - <p>标记宽度</p>
         * @property height - <p>标记高度</p>
         * @property size - <p>像素大小</p>
         * @property getMethod - <p>取值方法</p>
         * @property pickable - <p>是否可被拾取</p>
         * @property keepSize - <p>是否保存像素大小</p>
         * @property inheritScale - <p>是否继承代理孪生体缩放</p>
         * @property inheritStyle - <p>是否继承代理孪生体样式</p>
         * @property alwaysOnTop - <p>是否始终处于最高层级渲染，无遮挡</p>
         * @property complete - <p>标记创建完成回调</p>
         * @property style - <p>标记样式 参考ThingJS</p>
         * @property businessName - <p>业务名称</p>
         */
        type CreateConfig = {
            url: string;
            width: number;
            height: number;
            size: number;
            getMethod: string;
            pickable: boolean;
            keepSize: boolean;
            inheritScale: boolean;
            inheritStyle: boolean;
            alwaysOnTop: boolean;
            complete: (...params: any[]) => any;
            style: any;
            businessName: string;
        };
        /**
         * <p>显示标记</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param name - <p>标记名称（在ThingJS-X中配置的对应的孪生体上的标记）</p>
         * @param [purpose = default] - <p>显示目的</p>
         * @returns <ul>
         * <li>返回操作过的标记列表</li>
         * </ul>
         */
        function show(digitalTwin: THING.BaseObject | string, name: string, purpose?: string): THING.BaseObject[];
        /**
         * <p>隐藏标记</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param name - <p>标记名称</p>
         * @param [purpose = default] - <p>隐藏目的</p>
         * @returns <ul>
         * <li>返回操作过的标记列表</li>
         * </ul>
         */
        function hide(digitalTwin: THING.BaseObject | string, name: string, purpose?: string): THING.BaseObject[];
        /**
         * <p>增加标记，增加后立即显示</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param name - <p>标记名称,可通过THINGX.Marker.getConfig获取孪生体上配置了哪些标记（在ThingJS-X中配置的对应的孪生体上的标记）</p>
         * @param isExcludeModel - <p>是否包含模型</p>
         * @returns <ul>
         * <li>成功返回标记对象</li>
         * </ul>
         */
        function add(digitalTwin: THING.BaseObject | string, name: string, isExcludeModel: boolean): THING.BaseObject[];
        /**
         * <p>获取已创建的标记</p>
         * @param digitalTwin - <p>孪生体对象</p>
         * @param name - <p>标记名称</p>
         * @returns <ul>
         * <li>成功返回标记对象</li>
         * </ul>
         */
        function get(digitalTwin: THING.BaseObject, name: string): THING.BaseObject | null;
        /**
         * <p>删除标记</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param name - <p>标记名称</p>
         * @returns <ul>
         * <li>是否删除成功</li>
         * </ul>
         */
        function remove(digitalTwin: THING.BaseObject | string, name: string): boolean;
        /**
         * <p>通过tag增加自定义标记</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param tag - <p>标签</p>
         * @param type - <p>标记类型</p>
         * @param config - <p>标记自定义配置</p>
         * @returns <ul>
         * <li>标记列表</li>
         * </ul>
         */
        function addWithTag(digitalTwin: THING.BaseObject | string, tag: string, type: string, config: THINGX.Marker.CreateConfig): THING.BaseObject[];
        /**
         * <p>通过标签删除标记</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param tag - <p>标签</p>
         * @returns <ul>
         * <li>是否删除成功</li>
         * </ul>
         */
        function removeWithTag(digitalTwin: THING.BaseObject | string, tag: string): boolean;
        /**
         * <p>获取孪生体标记配置数据</p>
         * @param digitalTwin - <p>孪生体对象</p>
         * @returns <ul>
         * <li>标记配置数据 业务名称:配置数据</li>
         * </ul>
         */
        function getConfig(digitalTwin: THING.BaseObject): Map<string, object>;
        /**
         * <p>获取孪生体上所有的标记</p>
         * @param digitalTwin - <p>孪生体对象</p>
         * @returns <ul>
         * <li>已经创建的标记 业务名称:标记对象</li>
         * </ul>
         */
        function getAll(digitalTwin: THING.BaseObject): Map<string, THING.BaseObject>;
        /**
         * <p>给符合条件的孪生体注册标记</p>
         * @param condition - <p>孪生体集合配置语法表达式 {REGTYPE_CLASSTYPE: 'Campus'}</p>
         * @param config - <p>标记配置</p>
         * @param [businessName = _default_] - <p>业务名称</p>
         */
        function addWithCondition(condition: string, config: any, businessName?: string): void;
        /**
         * <p>获取孪生体预加载的标记名称</p>
         * @param digitalTwin - <p>孪生体对象</p>
         * @returns <ul>
         * <li>预加载标记的名称,若没有则返回空值,可根据这个名称通过show或者hide方法来显示和影藏预加载标记</li>
         * </ul>
         */
        function getPreloadName(digitalTwin: THING.BaseObject): string;
    }
    /**
     * <p>监控模块</p>
     */
    namespace Monitor {
        /**
         * <p>监控模块 设备内</p>
         */
        namespace ModuleInDevice {
            /**
             * <p>将孪生体添加到监控中</p>
             * @example
             * const objs = THINGX.App.queryWithThingJSExpression('[twinType=空调]');
             * objs.forEach(obj=>{
             *     THINGX.Monitor.ModuleInDevice.add(obj);
             * });
             *
             * THINGX.Monitor.ModuleInDevice.add('[twinType=温度传感器]', null, null, '温度云图')
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @param monitorName - <p>监控名称，用于代理监控</p>
             * @param monitorKeys - <p>监控指标, 如 [&quot;温度&quot;,&quot;湿度&quot;]</p>
             * @param [purpose = _default_] - <p>监控目的，可以理解为一个占位标识。当有一个监控目的（purpose）占用某个孪生体对象，使该孪生体对象处于监控队列中时，则该孪生体不可被移出监控队列</p>
             * @param config - <p>监控配置</p>
             * @param [config.isForceUpdate = false] - <p>是否更新监控效果，无论物体是否显示</p>
             * @param [config.isAddEffect = true] - <p>是否添加监控效果</p>
             * @param [config.effectoVisible] - <p>监控可视化效果是否显示，默认随孪生体显示状态，如果isAddEffect为false则该字段不生效</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function add(digitalTwin: THING.BaseObject | string, monitorName: string, monitorKeys: string[], purpose?: string, config: {
                isForceUpdate?: boolean;
                isAddEffect?: boolean;
                effectoVisible?: boolean;
            }): THING.BaseObject[];
            /**
             * <p>将孪生体从监控中移除</p>
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @param [purpose = _default_] - <p>移除目的</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function remove(digitalTwin: THING.BaseObject | string, purpose?: string): THING.BaseObject[];
            /**
             * <p>孪生体是否在监控集合中</p>
             * @param digitalTwin - <p>孪生体对象</p>
             * @param [type] - <p>传此参数则检测物体是否有当前监控类型</p>
             */
            function isDigitalTwinInMonitorSet(digitalTwin: THING.BaseObject, type?: string): boolean;
            /**
             * <p>通过接口向后端请求监控数据</p>
             * @example
             * // 对已经被加入到监控中的孪生体对象请求监控数据
             * THINGX.Monitor.ModuleInDevice.remoteData()
             */
            function remoteData(): void;
            /**
             * <p>刷新监控显示效果</p>
             */
            function refreshEffect(): void;
            /**
             * <p>注册设备内监控 注册完后就添加监控 和 监控效果</p>
             * @param condition - <p>要注册的条件，可以是物体，物体 id，物体 name,物体 类，物体属性，函数，物体方法，以及使用前面的类型进行与或非的组合。</p>
             * @param param - <p>要注册内容</p>
             * @param name - <p>注册的名称,可以不填，系统内部会默认指定name的值是“<em>NONAME</em>”</p>
             */
            function addWithCondition(condition: any | string, param: any, name: string): void;
            /**
             * <p>将孪生体添加到监控中</p>
             * @example
             * const objs = THINGX.App.queryWithThingJSExpression('[twinType=空调]');
             * objs.forEach(obj=>{
             *     THINGX.Monitor.ModuleInDevice.add(obj);
             * });
             *
             * THINGX.Monitor.ModuleInDevice.add('[twinType=温度传感器]', null, null, '温度云图')
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @param monitorName - <p>监控名称，用于代理监控</p>
             * @param monitorKeys - <p>监控指标, 如 [&quot;温度&quot;,&quot;湿度&quot;]</p>
             * @param [purpose = _default_] - <p>监控目的，可以理解为一个占位标识。当有一个监控目的（purpose）占用某个孪生体对象，使该孪生体对象处于监控队列中时，则该孪生体不可被移出监控队列</p>
             * @param config - <p>监控配置</p>
             * @param [config.isForceUpdate = false] - <p>是否更新监控效果，无论物体是否显示</p>
             * @param [config.isAddEffect = true] - <p>是否添加监控效果</p>
             * @param [config.effectoVisible] - <p>监控可视化效果是否显示，默认随孪生体显示状态，如果isAddEffect为false则该字段不生效</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function add(digitalTwin: THING.BaseObject | string, monitorName: string, monitorKeys: string[], purpose?: string, config: {
                isForceUpdate?: boolean;
                isAddEffect?: boolean;
                effectoVisible?: boolean;
            }): THING.BaseObject[];
            /**
             * <p>将孪生体从监控中移除</p>
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @param [purpose = _default_] - <p>移除目的</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function remove(digitalTwin: THING.BaseObject | string, purpose?: string): THING.BaseObject[];
            /**
             * <p>孪生体是否在监控集合中</p>
             * @param digitalTwin - <p>孪生体对象</p>
             * @param [type] - <p>传此参数则检测物体是否有当前监控类型</p>
             */
            function isDigitalTwinInMonitorSet(digitalTwin: THING.BaseObject, type?: string): boolean;
            /**
             * <p>通过接口向后端请求监控数据</p>
             * @example
             * // 对已经被加入到监控中的孪生体对象请求监控数据
             * THINGX.Monitor.ModuleInDevice.remoteData()
             */
            function remoteData(): void;
            /**
             * <p>刷新监控显示效果</p>
             */
            function refreshEffect(): void;
            /**
             * <p>注册设备内监控 注册完后就添加监控 和 监控效果</p>
             * @param condition - <p>要注册的条件，可以是物体，物体 id，物体 name,物体 类，物体属性，函数，物体方法，以及使用前面的类型进行与或非的组合。</p>
             * @param param - <p>要注册内容</p>
             * @param name - <p>注册的名称,可以不填，系统内部会默认指定name的值是“<em>NONAME</em>”</p>
             */
            function addWithCondition(condition: any | string, param: any, name: string): void;
        }
        /**
         * <p>监控模块 操作集</p>
         */
        namespace ModuleOpSet {
            /**
             * <p>将孪生体添加到监控中</p>
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @param monitorName - <p>监控名称，用于代理监控</p>
             * @param monitorKeys - <p>监控指标, 如 [&quot;温度&quot;,&quot;湿度&quot;]</p>
             * @param [purpose = _default_] - <p>监控目的，可以理解为一个占位标识。当有一个监控目的（purpose）占用某个孪生体对象，使该孪生体对象处于监控队列中时，则该孪生体不可被移出监控队列</p>
             * @param config - <p>监控配置</p>
             * @param [config.isForceUpdate = false] - <p>是否更新监控效果，无论物体是否显示</p>
             * @param [config.isAddEffect = true] - <p>是否添加监控效果</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function add(digitalTwin: THING.BaseObject | string, monitorName: string, monitorKeys: string[], purpose?: string, config: {
                isForceUpdate?: boolean;
                isAddEffect?: boolean;
            }): THING.BaseObject[];
            /**
             * <p>将孪生体从监控中移除</p>
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @param [purpose = _default_] - <p>移除目的</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function remove(digitalTwin: THING.BaseObject | string, purpose?: string): THING.BaseObject[];
            /**
             * <p>增加监控效果</p>
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function addEffect(digitalTwin: THING.BaseObject | string): THING.BaseObject[];
            /**
             * <p>移除监控效果</p>
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function removeEffect(digitalTwin: THING.BaseObject | string): THING.BaseObject[];
            /**
             * <p>将孪生体添加到监控中</p>
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @param monitorName - <p>监控名称，用于代理监控</p>
             * @param monitorKeys - <p>监控指标, 如 [&quot;温度&quot;,&quot;湿度&quot;]</p>
             * @param [purpose = _default_] - <p>监控目的，可以理解为一个占位标识。当有一个监控目的（purpose）占用某个孪生体对象，使该孪生体对象处于监控队列中时，则该孪生体不可被移出监控队列</p>
             * @param config - <p>监控配置</p>
             * @param [config.isForceUpdate = false] - <p>是否更新监控效果，无论物体是否显示</p>
             * @param [config.isAddEffect = true] - <p>是否添加监控效果</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function add(digitalTwin: THING.BaseObject | string, monitorName: string, monitorKeys: string[], purpose?: string, config: {
                isForceUpdate?: boolean;
                isAddEffect?: boolean;
            }): THING.BaseObject[];
            /**
             * <p>将孪生体从监控中移除</p>
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @param [purpose = _default_] - <p>移除目的</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function remove(digitalTwin: THING.BaseObject | string, purpose?: string): THING.BaseObject[];
            /**
             * <p>增加监控效果</p>
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function addEffect(digitalTwin: THING.BaseObject | string): THING.BaseObject[];
            /**
             * <p>移除监控效果</p>
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function removeEffect(digitalTwin: THING.BaseObject | string): THING.BaseObject[];
        }
        /**
         * <p>将孪生体添加到监控中</p>
         * @example
         * const objs = THINGX.App.queryWithThingJSExpression('[twinType=空调]');
         * objs.forEach(obj=>{
         *     THINGX.Monitor.add(obj);
         * });
         *
         * THINGX.Monitor.add('[twinType=温度传感器]', null, null, '温度云图')
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param monitorName - <p>监控名称，用于代理监控</p>
         * @param monitorKeys - <p>监控指标, 如 [&quot;温度&quot;,&quot;湿度&quot;]</p>
         * @param [purpose = _default_] - <p>监控目的，可以理解为一个占位标识。当有一个监控目的（purpose）占用某个孪生体对象，使该孪生体对象处于监控队列中时，则该孪生体不可被移出监控队列</p>
         * @param config - <p>监控配置</p>
         * @param [config.isForceUpdate = false] - <p>是否更新监控效果，无论物体是否显示</p>
         * @param [config.isAddEffect = true] - <p>是否添加监控效果</p>
         * @param [config.effectoVisible] - <p>监控可视化效果是否显示，默认随孪生体显示状态，如果isAddEffect为false则该字段不生效</p>
         * @returns <ul>
         * <li>执行过操作的孪生体集合</li>
         * </ul>
         */
        function add(digitalTwin: THING.BaseObject | string, monitorName: string, monitorKeys: string[], purpose?: string, config: {
            isForceUpdate?: boolean;
            isAddEffect?: boolean;
            effectoVisible?: boolean;
        }): THING.BaseObject[];
        /**
         * <p>将孪生体从监控中移除</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param [purpose = _default_] - <p>移除目的</p>
         * @returns <ul>
         * <li>执行过操作的孪生体集合</li>
         * </ul>
         */
        function remove(digitalTwin: THING.BaseObject | string, purpose?: string): THING.BaseObject[];
        /**
         * <p>孪生体是否在监控集合中</p>
         * @param digitalTwin - <p>孪生体对象</p>
         * @param [type] - <p>传此参数则检测物体是否有当前监控类型</p>
         */
        function isDigitalTwinInMonitorSet(digitalTwin: THING.BaseObject, type?: string): boolean;
        /**
         * <p>增加监控标记</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param business - <p>相关业务名称，通过业务名称查询相关配置，下面配置会覆盖通过业务查询出的配置</p>
         * @param [type] - <p>DEFAULT 默认没有效果/BACKGROUND_AND_CANVAS 标记/HTMLELEMENT 标记/SELF_OBJECT 默认孪生体自身效果</p>
         * @param config - <p>标记创建配置</p>
         * @returns <ul>
         * <li>执行过操作的孪生体集合</li>
         * </ul>
         */
        function addMarker(digitalTwin: THING.BaseObject | string, business: string, type?: string, config: THINGX.Marker.CreateConfig): THING.BaseObject[];
        /**
         * <p>移除监控标记</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @returns <ul>
         * <li>执行过操作的孪生体集合</li>
         * </ul>
         */
        function removeMarker(digitalTwin: THING.BaseObject | string): THING.BaseObject[];
        /**
         * <p>获取监控标记</p>
         * @param digitalTwin - <p>孪生体对象</p>
         */
        function getMarker(digitalTwin: THING.BaseObject): THING.BaseObject | null;
        /**
         * <p>设置监控接口请求间隔时间</p>
         * @param time - <p>间隔时间，单位秒</p>
         */
        function setRemoteInterval(time: number): void;
        /**
         * <p>设置监控接口请求超时时间</p>
         * @param time - <p>超时时间，单位秒</p>
         */
        function setRemoteTimeout(time: number): void;
        /**
         * <p>通过接口向后端请求监控数据</p>
         * @example
         * const dbid = obj.userData._DBID_;
         * // 对已经被加入到监控中的孪生体对象请求监控数据
         * THINGX.Monitor.remoteData()
         * // 对单一物体进行刷新dbid
         * THINGX.Monitor.remoteData(dbid);
         * // 对对多个物体进行刷新dbids
         * THINGX.Monitor.remoteData([...dbids]);
         * @param [ids = null] - <p>孪生体属性中的dbid 默认对所有孪生体监控进行请求</p>
         */
        function remoteData(ids?: string[] | string | null): void;
        /**
         * <p>注册设备内监控 注册完后就添加监控 和 监控效果</p>
         * @param condition - <p>要注册的条件，可以是物体，物体 id，物体 name,物体 类，物体属性，函数，物体方法，以及使用前面的类型进行与或非的组合。</p>
         * @param config - <p>要注册内容</p>
         * @param config.business - <p>业务名称</p>
         * @param name - <p>注册的名称,可以不填，系统内部会默认指定name的值是“<em>NONAME</em>”</p>
         */
        function addWithCondition(condition: any | string, config: {
            business: string;
        }, name: string): void;
        /**
         * <p>监控模块 设备内</p>
         */
        namespace ModuleInDevice {
            /**
             * <p>将孪生体添加到监控中</p>
             * @example
             * const objs = THINGX.App.queryWithThingJSExpression('[twinType=空调]');
             * objs.forEach(obj=>{
             *     THINGX.Monitor.ModuleInDevice.add(obj);
             * });
             *
             * THINGX.Monitor.ModuleInDevice.add('[twinType=温度传感器]', null, null, '温度云图')
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @param monitorName - <p>监控名称，用于代理监控</p>
             * @param monitorKeys - <p>监控指标, 如 [&quot;温度&quot;,&quot;湿度&quot;]</p>
             * @param [purpose = _default_] - <p>监控目的，可以理解为一个占位标识。当有一个监控目的（purpose）占用某个孪生体对象，使该孪生体对象处于监控队列中时，则该孪生体不可被移出监控队列</p>
             * @param config - <p>监控配置</p>
             * @param [config.isForceUpdate = false] - <p>是否更新监控效果，无论物体是否显示</p>
             * @param [config.isAddEffect = true] - <p>是否添加监控效果</p>
             * @param [config.effectoVisible] - <p>监控可视化效果是否显示，默认随孪生体显示状态，如果isAddEffect为false则该字段不生效</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function add(digitalTwin: THING.BaseObject | string, monitorName: string, monitorKeys: string[], purpose?: string, config: {
                isForceUpdate?: boolean;
                isAddEffect?: boolean;
                effectoVisible?: boolean;
            }): THING.BaseObject[];
            /**
             * <p>将孪生体从监控中移除</p>
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @param [purpose = _default_] - <p>移除目的</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function remove(digitalTwin: THING.BaseObject | string, purpose?: string): THING.BaseObject[];
            /**
             * <p>孪生体是否在监控集合中</p>
             * @param digitalTwin - <p>孪生体对象</p>
             * @param [type] - <p>传此参数则检测物体是否有当前监控类型</p>
             */
            function isDigitalTwinInMonitorSet(digitalTwin: THING.BaseObject, type?: string): boolean;
            /**
             * <p>通过接口向后端请求监控数据</p>
             * @example
             * // 对已经被加入到监控中的孪生体对象请求监控数据
             * THINGX.Monitor.ModuleInDevice.remoteData()
             */
            function remoteData(): void;
            /**
             * <p>刷新监控显示效果</p>
             */
            function refreshEffect(): void;
            /**
             * <p>注册设备内监控 注册完后就添加监控 和 监控效果</p>
             * @param condition - <p>要注册的条件，可以是物体，物体 id，物体 name,物体 类，物体属性，函数，物体方法，以及使用前面的类型进行与或非的组合。</p>
             * @param param - <p>要注册内容</p>
             * @param name - <p>注册的名称,可以不填，系统内部会默认指定name的值是“<em>NONAME</em>”</p>
             */
            function addWithCondition(condition: any | string, param: any, name: string): void;
            /**
             * <p>将孪生体添加到监控中</p>
             * @example
             * const objs = THINGX.App.queryWithThingJSExpression('[twinType=空调]');
             * objs.forEach(obj=>{
             *     THINGX.Monitor.ModuleInDevice.add(obj);
             * });
             *
             * THINGX.Monitor.ModuleInDevice.add('[twinType=温度传感器]', null, null, '温度云图')
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @param monitorName - <p>监控名称，用于代理监控</p>
             * @param monitorKeys - <p>监控指标, 如 [&quot;温度&quot;,&quot;湿度&quot;]</p>
             * @param [purpose = _default_] - <p>监控目的，可以理解为一个占位标识。当有一个监控目的（purpose）占用某个孪生体对象，使该孪生体对象处于监控队列中时，则该孪生体不可被移出监控队列</p>
             * @param config - <p>监控配置</p>
             * @param [config.isForceUpdate = false] - <p>是否更新监控效果，无论物体是否显示</p>
             * @param [config.isAddEffect = true] - <p>是否添加监控效果</p>
             * @param [config.effectoVisible] - <p>监控可视化效果是否显示，默认随孪生体显示状态，如果isAddEffect为false则该字段不生效</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function add(digitalTwin: THING.BaseObject | string, monitorName: string, monitorKeys: string[], purpose?: string, config: {
                isForceUpdate?: boolean;
                isAddEffect?: boolean;
                effectoVisible?: boolean;
            }): THING.BaseObject[];
            /**
             * <p>将孪生体从监控中移除</p>
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @param [purpose = _default_] - <p>移除目的</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function remove(digitalTwin: THING.BaseObject | string, purpose?: string): THING.BaseObject[];
            /**
             * <p>孪生体是否在监控集合中</p>
             * @param digitalTwin - <p>孪生体对象</p>
             * @param [type] - <p>传此参数则检测物体是否有当前监控类型</p>
             */
            function isDigitalTwinInMonitorSet(digitalTwin: THING.BaseObject, type?: string): boolean;
            /**
             * <p>通过接口向后端请求监控数据</p>
             * @example
             * // 对已经被加入到监控中的孪生体对象请求监控数据
             * THINGX.Monitor.ModuleInDevice.remoteData()
             */
            function remoteData(): void;
            /**
             * <p>刷新监控显示效果</p>
             */
            function refreshEffect(): void;
            /**
             * <p>注册设备内监控 注册完后就添加监控 和 监控效果</p>
             * @param condition - <p>要注册的条件，可以是物体，物体 id，物体 name,物体 类，物体属性，函数，物体方法，以及使用前面的类型进行与或非的组合。</p>
             * @param param - <p>要注册内容</p>
             * @param name - <p>注册的名称,可以不填，系统内部会默认指定name的值是“<em>NONAME</em>”</p>
             */
            function addWithCondition(condition: any | string, param: any, name: string): void;
        }
        /**
         * <p>监控模块 操作集</p>
         */
        namespace ModuleOpSet {
            /**
             * <p>将孪生体添加到监控中</p>
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @param monitorName - <p>监控名称，用于代理监控</p>
             * @param monitorKeys - <p>监控指标, 如 [&quot;温度&quot;,&quot;湿度&quot;]</p>
             * @param [purpose = _default_] - <p>监控目的，可以理解为一个占位标识。当有一个监控目的（purpose）占用某个孪生体对象，使该孪生体对象处于监控队列中时，则该孪生体不可被移出监控队列</p>
             * @param config - <p>监控配置</p>
             * @param [config.isForceUpdate = false] - <p>是否更新监控效果，无论物体是否显示</p>
             * @param [config.isAddEffect = true] - <p>是否添加监控效果</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function add(digitalTwin: THING.BaseObject | string, monitorName: string, monitorKeys: string[], purpose?: string, config: {
                isForceUpdate?: boolean;
                isAddEffect?: boolean;
            }): THING.BaseObject[];
            /**
             * <p>将孪生体从监控中移除</p>
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @param [purpose = _default_] - <p>移除目的</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function remove(digitalTwin: THING.BaseObject | string, purpose?: string): THING.BaseObject[];
            /**
             * <p>增加监控效果</p>
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function addEffect(digitalTwin: THING.BaseObject | string): THING.BaseObject[];
            /**
             * <p>移除监控效果</p>
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function removeEffect(digitalTwin: THING.BaseObject | string): THING.BaseObject[];
            /**
             * <p>将孪生体添加到监控中</p>
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @param monitorName - <p>监控名称，用于代理监控</p>
             * @param monitorKeys - <p>监控指标, 如 [&quot;温度&quot;,&quot;湿度&quot;]</p>
             * @param [purpose = _default_] - <p>监控目的，可以理解为一个占位标识。当有一个监控目的（purpose）占用某个孪生体对象，使该孪生体对象处于监控队列中时，则该孪生体不可被移出监控队列</p>
             * @param config - <p>监控配置</p>
             * @param [config.isForceUpdate = false] - <p>是否更新监控效果，无论物体是否显示</p>
             * @param [config.isAddEffect = true] - <p>是否添加监控效果</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function add(digitalTwin: THING.BaseObject | string, monitorName: string, monitorKeys: string[], purpose?: string, config: {
                isForceUpdate?: boolean;
                isAddEffect?: boolean;
            }): THING.BaseObject[];
            /**
             * <p>将孪生体从监控中移除</p>
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @param [purpose = _default_] - <p>移除目的</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function remove(digitalTwin: THING.BaseObject | string, purpose?: string): THING.BaseObject[];
            /**
             * <p>增加监控效果</p>
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function addEffect(digitalTwin: THING.BaseObject | string): THING.BaseObject[];
            /**
             * <p>移除监控效果</p>
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function removeEffect(digitalTwin: THING.BaseObject | string): THING.BaseObject[];
        }
        /**
         * <p>将孪生体添加到监控中</p>
         * @example
         * const objs = THINGX.App.queryWithThingJSExpression('[twinType=空调]');
         * objs.forEach(obj=>{
         *     THINGX.Monitor.add(obj);
         * });
         *
         * THINGX.Monitor.add('[twinType=温度传感器]', null, null, '温度云图')
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param monitorName - <p>监控名称，用于代理监控</p>
         * @param monitorKeys - <p>监控指标, 如 [&quot;温度&quot;,&quot;湿度&quot;]</p>
         * @param [purpose = _default_] - <p>监控目的，可以理解为一个占位标识。当有一个监控目的（purpose）占用某个孪生体对象，使该孪生体对象处于监控队列中时，则该孪生体不可被移出监控队列</p>
         * @param config - <p>监控配置</p>
         * @param [config.isForceUpdate = false] - <p>是否更新监控效果，无论物体是否显示</p>
         * @param [config.isAddEffect = true] - <p>是否添加监控效果</p>
         * @param [config.effectoVisible] - <p>监控可视化效果是否显示，默认随孪生体显示状态，如果isAddEffect为false则该字段不生效</p>
         * @returns <ul>
         * <li>执行过操作的孪生体集合</li>
         * </ul>
         */
        function add(digitalTwin: THING.BaseObject | string, monitorName: string, monitorKeys: string[], purpose?: string, config: {
            isForceUpdate?: boolean;
            isAddEffect?: boolean;
            effectoVisible?: boolean;
        }): THING.BaseObject[];
        /**
         * <p>将孪生体从监控中移除</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param [purpose = _default_] - <p>移除目的</p>
         * @returns <ul>
         * <li>执行过操作的孪生体集合</li>
         * </ul>
         */
        function remove(digitalTwin: THING.BaseObject | string, purpose?: string): THING.BaseObject[];
        /**
         * <p>孪生体是否在监控集合中</p>
         * @param digitalTwin - <p>孪生体对象</p>
         * @param [type] - <p>传此参数则检测物体是否有当前监控类型</p>
         */
        function isDigitalTwinInMonitorSet(digitalTwin: THING.BaseObject, type?: string): boolean;
        /**
         * <p>增加监控标记</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param business - <p>相关业务名称，通过业务名称查询相关配置，下面配置会覆盖通过业务查询出的配置</p>
         * @param [type] - <p>DEFAULT 默认没有效果/BACKGROUND_AND_CANVAS 标记/HTMLELEMENT 标记/SELF_OBJECT 默认孪生体自身效果</p>
         * @param config - <p>标记创建配置</p>
         * @returns <ul>
         * <li>执行过操作的孪生体集合</li>
         * </ul>
         */
        function addMarker(digitalTwin: THING.BaseObject | string, business: string, type?: string, config: THINGX.Marker.CreateConfig): THING.BaseObject[];
        /**
         * <p>移除监控标记</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @returns <ul>
         * <li>执行过操作的孪生体集合</li>
         * </ul>
         */
        function removeMarker(digitalTwin: THING.BaseObject | string): THING.BaseObject[];
        /**
         * <p>获取监控标记</p>
         * @param digitalTwin - <p>孪生体对象</p>
         */
        function getMarker(digitalTwin: THING.BaseObject): THING.BaseObject | null;
        /**
         * <p>设置监控接口请求间隔时间</p>
         * @param time - <p>间隔时间，单位秒</p>
         */
        function setRemoteInterval(time: number): void;
        /**
         * <p>设置监控接口请求超时时间</p>
         * @param time - <p>超时时间，单位秒</p>
         */
        function setRemoteTimeout(time: number): void;
        /**
         * <p>通过接口向后端请求监控数据</p>
         * @example
         * const dbid = obj.userData._DBID_;
         * // 对已经被加入到监控中的孪生体对象请求监控数据
         * THINGX.Monitor.remoteData()
         * // 对单一物体进行刷新dbid
         * THINGX.Monitor.remoteData(dbid);
         * // 对对多个物体进行刷新dbids
         * THINGX.Monitor.remoteData([...dbids]);
         * @param [ids = null] - <p>孪生体属性中的dbid 默认对所有孪生体监控进行请求</p>
         */
        function remoteData(ids?: string[] | string | null): void;
        /**
         * <p>注册设备内监控 注册完后就添加监控 和 监控效果</p>
         * @param condition - <p>要注册的条件，可以是物体，物体 id，物体 name,物体 类，物体属性，函数，物体方法，以及使用前面的类型进行与或非的组合。</p>
         * @param config - <p>要注册内容</p>
         * @param config.business - <p>业务名称</p>
         * @param name - <p>注册的名称,可以不填，系统内部会默认指定name的值是“<em>NONAME</em>”</p>
         */
        function addWithCondition(condition: any | string, config: {
            business: string;
        }, name: string): void;
    }
    /**
     * <p>操作集模块</p>
     */
    namespace OpSet {
        /**
         * <p>运行操作集</p>
         * @param name - <p>操作集名称</p>
         * @param runObj - <p>运行对象</p>
         * @param [runParams = {}] - <p>运行中存储单元传参</p>
         */
        function run(name: string, runObj: any, runParams?: Map<string, any>): void;
        /**
         * <p>获取指定操作集</p>
         * @param name - <p>操作集名称</p>
         * @returns <p>操作集</p>
         */
        function get(name: string): any | null;
        /**
         * <p>停止指定操作集</p>
         * @param name - <p>操作集名称</p>
         */
        function stop(name: string): void;
        /**
         * <p>设置指定操作集的运行速度</p>
         * @param name - <p>操作集名称</p>
         * @param [speed = 1] - <p>运行速度</p>
         */
        function changeSpeed(name: string, speed?: number): void;
        /**
         * <p>挂起指定操作集</p>
         * @param name - <p>操作集名称</p>
         */
        function suspend(name: string): void;
        /**
         * <p>恢复指定操作集</p>
         * @param name - <p>操作集名称</p>
         */
        function resume(name: string): void;
        /**
         * <p>重新读取操作集可视化配置</p>
         */
        function refresh(): void;
        /**
         * <p>获取操作集的存储单元</p>
         * @example
         * let vals = THINGX.OpSet.getStorageCell('test');
         * vals.name = 'console.error(123)';
         * THINGX.OpSet.run('test');
         * @param name - <p>操作集名称</p>
         * @returns <ul>
         * <li>存储单元集合，可直接修改，运行时生效</li>
         * </ul>
         */
        function getStorageCell(name: string): Map<string, any> | null;
        /**
         * <p>运行操作集</p>
         * @param name - <p>操作集名称</p>
         * @param runObj - <p>运行对象</p>
         * @param [runParams = {}] - <p>运行中存储单元传参</p>
         */
        function run(name: string, runObj: any, runParams?: Map<string, any>): void;
        /**
         * <p>获取指定操作集</p>
         * @param name - <p>操作集名称</p>
         * @returns <p>操作集</p>
         */
        function get(name: string): any | null;
        /**
         * <p>停止指定操作集</p>
         * @param name - <p>操作集名称</p>
         */
        function stop(name: string): void;
        /**
         * <p>设置指定操作集的运行速度</p>
         * @param name - <p>操作集名称</p>
         * @param [speed = 1] - <p>运行速度</p>
         */
        function changeSpeed(name: string, speed?: number): void;
        /**
         * <p>挂起指定操作集</p>
         * @param name - <p>操作集名称</p>
         */
        function suspend(name: string): void;
        /**
         * <p>恢复指定操作集</p>
         * @param name - <p>操作集名称</p>
         */
        function resume(name: string): void;
        /**
         * <p>重新读取操作集可视化配置</p>
         */
        function refresh(): void;
        /**
         * <p>获取操作集的存储单元</p>
         * @example
         * let vals = THINGX.OpSet.getStorageCell('test');
         * vals.name = 'console.error(123)';
         * THINGX.OpSet.run('test');
         * @param name - <p>操作集名称</p>
         * @returns <ul>
         * <li>存储单元集合，可直接修改，运行时生效</li>
         * </ul>
         */
        function getStorageCell(name: string): Map<string, any> | null;
    }
    /**
     * <p>场景控制模块</p>
     */
    namespace SceneControl {
        /**
         * <p>显示场景控制模块</p>
         */
        function show(): void;
        /**
         * <p>隐藏场景控制模块</p>
         */
        function hide(): void;
        /**
         * <p>激活指定场景控制功能</p>
         * @param name - <p>场景控制功能名称或ID</p>
         * @returns <ul>
         * <li>是否激活成功</li>
         * </ul>
         */
        function activate(name: string | string[]): boolean;
        /**
         * <p>取消激活指定场景控制功能</p>
         * @param name - <p>场景控制功能名称或ID</p>
         * @returns <ul>
         * <li>是否激活成功</li>
         * </ul>
         */
        function deactivate(name: string | string[]): boolean;
        /**
         * <p>获取已经激活的场景控制功能</p>
         * @returns <ul>
         * <li>已经激活的场景控制功能</li>
         * </ul>
         */
        function getActivated(): object[];
        /**
         * <p>刷新当前层级的场景控制功能</p>
         */
        function refresh(): Promise<boolean>;
        /**
         * <p>获取场景控制功能配置</p>
         * @param [name=] - <p>场景控制功能名称, 非空的话返回指定配置，否则返回所有配置</p>
         * @param [level = THINGX.App.currentLevel] - <p>孪生体对象/孪生体分类</p>
         * @returns <ul>
         * <li>场景控制配置</li>
         * </ul>
         */
        function getConfig(name=?: string, level?: THING.BaseObject | THINGX.CONST.DEFAULT_DIGITAL_TWIN_CLASS): object[] | any | null;
        /**
         * <p>显示场景控制模块</p>
         */
        function show(): void;
        /**
         * <p>隐藏场景控制模块</p>
         */
        function hide(): void;
        /**
         * <p>激活指定场景控制功能</p>
         * @param name - <p>场景控制功能名称或ID</p>
         * @returns <ul>
         * <li>是否激活成功</li>
         * </ul>
         */
        function activate(name: string | string[]): boolean;
        /**
         * <p>取消激活指定场景控制功能</p>
         * @param name - <p>场景控制功能名称或ID</p>
         * @returns <ul>
         * <li>是否激活成功</li>
         * </ul>
         */
        function deactivate(name: string | string[]): boolean;
        /**
         * <p>获取已经激活的场景控制功能</p>
         * @returns <ul>
         * <li>已经激活的场景控制功能</li>
         * </ul>
         */
        function getActivated(): object[];
        /**
         * <p>刷新当前层级的场景控制功能</p>
         */
        function refresh(): Promise<boolean>;
        /**
         * <p>获取场景控制功能配置</p>
         * @param [name=] - <p>场景控制功能名称, 非空的话返回指定配置，否则返回所有配置</p>
         * @param [level = THINGX.App.currentLevel] - <p>孪生体对象/孪生体分类</p>
         * @returns <ul>
         * <li>场景控制配置</li>
         * </ul>
         */
        function getConfig(name=?: string, level?: THING.BaseObject | THINGX.CONST.DEFAULT_DIGITAL_TWIN_CLASS): object[] | any | null;
    }
    /**
     * <p>后端请求模块</p>
     */
    namespace ServerInterface {
        /**
         * <p>资源数据</p>
         * @property pageNum - <p>当前的页码</p>
         * @property pageSize - <p>当前页码中数据条数</p>
         * @property totalRows - <p>数据总条数</p>
         * @property totalPages - <p>数据总页数</p>
         * @property data - <p>当前页的数据</p>
         */
        type ResourceData = {
            pageNum: number;
            pageSize: number;
            totalRows: number;
            totalPages: number;
            data: object[];
        };
        /**
         * @property INNER - <p>场景资源内部路径</p>
         * @property SCENE - <p>场景资源路径</p>
         * @property SCENE_VERSION - <p>场景版本</p>
         * @property TEXTURE - <p>贴图路径</p>
         */
        type SceneResourceData = {
            INNER: string;
            SCENE: string;
            SCENE_VERSION: string;
            TEXTURE: string;
        };
        /**
         * <p>用户信息</p>
         * @property domainId - <p>域ID</p>
         * @property id - <p>用户ID</p>
         * @property kind - <p>用户类型</p>
         * @property language - <p>本地化语言</p>
         * @property loginCode - <p>登录类型</p>
         * @property userCode - <p>用户类型</p>
         * @property userName - <p>用户名称</p>
         * @property tokenCreateTime - <p>token创建时间戳</p>
         * @property tokenValidTime - <p>token校验时间</p>
         */
        type UserData = {
            domainId: number;
            id: number;
            kind: number;
            language: string;
            loginCode: string;
            userCode: string;
            userName: string;
            tokenCreateTime: number;
            tokenValidTime: number;
        };
        /**
         * <p>查询资源列表数据</p>
         * @param params - <p>查询参数</p>
         * @param params.type - <p>资源类型/插件类型 action/chart/core/expand/theme</p>
         * @param params.pageNum - <p>分页页码</p>
         * @param params.pageSize - <p>每页条数</p>
         * @param params.searchKeyword - <p>搜索关键字</p>
         * @returns <p>返回的资源数据</p>
         */
        function getResources(params: {
            type: string | THINGX.CONST.PLUGIN_TYPE;
            pageNum: number;
            pageSize: number;
            searchKeyword: string;
        }): Promise<THINGX.ServerInterface.ResourceData>;
        /**
         * <p>查询系统配置</p>
         * @param params - <p>查询参数</p>
         * @param params.keys - <p>关键字</p>
         * @param params.type - <p>类型</p>
         * @param params.field - <p>区域</p>
         * @returns <p>返回的系统配置数据</p>
         */
        function getSystemSettings(params: {
            keys: string | string[];
            type: string;
            field: string;
        }): Promise<object>;
        /**
         * <p>通过场景CiCode获取园区数据</p>
         * @param params - <p>查询参数</p>
         * @param params.sc - <p>场景CiCode</p>
         * @returns <p>孪生体数据</p>
         */
        function getParkDataByScene(params: {
            sc: string;
        }): Promise<object[]>;
        /**
         * <p>通过分类模板代码获取孪生体</p>
         * @param params - <p>查询参数-分类模板代码 DATACENTER/PARK/BUILDING/FLOOR/ROOM/EARTH/DISTRIBUTION/STANDALONEDEVICE</p>
         * @returns <p>孪生体数据</p>
         */
        function getTwinsByTemplateCode(params: any[]): Promise<object[]>;
        /**
         * <p>通过场景CiCode获取模型库数据</p>
         * @param id - <p>场景CiCode</p>
         * @returns <p>模型库数据</p>
         */
        function getModelLibrary(id: string): Promise<Map<string, object>>;
        /**
         * <p>通过指定孪生体ID获取孪生体及下层级结构数据</p>
         * @param params - <p>查询参数</p>
         * @param params.id - <p>孪生体ID/CiCode</p>
         * @param params.depth - <p>查询深度 -1代表不限制</p>
         * @param params.endfilters - <p>结束过滤对象类型条件</p>
         * @returns <p>孪生体数据结构数据</p>
         */
        function getDigitalTwinsStructureData(params: {
            id: string;
            depth: number;
            endfilters: string[];
        }): Promise<Map<object>>;
        /**
         * <p>获取场景资源数据</p>
         * @param id - <p>场景ID/CICODE</p>
         * @returns <p>资源数据</p>
         */
        function getSceneResource(id: number): Promise<THINGX.ServerInterface.SceneResourceData>;
        /**
         * <p>获取所有logo数据</p>
         * @returns <ul>
         * <li>logo数据</li>
         * </ul>
         */
        function getLogos(): Promise<Map<object>>;
        /**
         * <p>获取场景信息</p>
         * @param identify - <p>场景ID/场景名称</p>
         * @returns <ul>
         * <li>场景信息</li>
         * </ul>
         */
        function getSceneInfo(identify: string): Promise<object>;
        /**
         * <p>获取用户信息详细</p>
         * @returns <p>用户信息</p>
         */
        function getUserDetailInfo(用户ID: number): Promise<object>;
        /**
         * <p>资源数据</p>
         * @property pageNum - <p>当前的页码</p>
         * @property pageSize - <p>当前页码中数据条数</p>
         * @property totalRows - <p>数据总条数</p>
         * @property totalPages - <p>数据总页数</p>
         * @property data - <p>当前页的数据</p>
         */
        type ResourceData = {
            pageNum: number;
            pageSize: number;
            totalRows: number;
            totalPages: number;
            data: object[];
        };
        /**
         * @property INNER - <p>场景资源内部路径</p>
         * @property SCENE - <p>场景资源路径</p>
         * @property SCENE_VERSION - <p>场景版本</p>
         * @property TEXTURE - <p>贴图路径</p>
         */
        type SceneResourceData = {
            INNER: string;
            SCENE: string;
            SCENE_VERSION: string;
            TEXTURE: string;
        };
        /**
         * <p>用户信息</p>
         * @property domainId - <p>域ID</p>
         * @property id - <p>用户ID</p>
         * @property kind - <p>用户类型</p>
         * @property language - <p>本地化语言</p>
         * @property loginCode - <p>登录类型</p>
         * @property userCode - <p>用户类型</p>
         * @property userName - <p>用户名称</p>
         * @property tokenCreateTime - <p>token创建时间戳</p>
         * @property tokenValidTime - <p>token校验时间</p>
         */
        type UserData = {
            domainId: number;
            id: number;
            kind: number;
            language: string;
            loginCode: string;
            userCode: string;
            userName: string;
            tokenCreateTime: number;
            tokenValidTime: number;
        };
        /**
         * <p>查询资源列表数据</p>
         * @param params - <p>查询参数</p>
         * @param params.type - <p>资源类型/插件类型 action/chart/core/expand/theme</p>
         * @param params.pageNum - <p>分页页码</p>
         * @param params.pageSize - <p>每页条数</p>
         * @param params.searchKeyword - <p>搜索关键字</p>
         * @returns <p>返回的资源数据</p>
         */
        function getResources(params: {
            type: string | THINGX.CONST.PLUGIN_TYPE;
            pageNum: number;
            pageSize: number;
            searchKeyword: string;
        }): Promise<THINGX.ServerInterface.ResourceData>;
        /**
         * <p>查询系统配置</p>
         * @param params - <p>查询参数</p>
         * @param params.keys - <p>关键字</p>
         * @param params.type - <p>类型</p>
         * @param params.field - <p>区域</p>
         * @returns <p>返回的系统配置数据</p>
         */
        function getSystemSettings(params: {
            keys: string | string[];
            type: string;
            field: string;
        }): Promise<object>;
        /**
         * <p>通过场景CiCode获取园区数据</p>
         * @param params - <p>查询参数</p>
         * @param params.sc - <p>场景CiCode</p>
         * @returns <p>孪生体数据</p>
         */
        function getParkDataByScene(params: {
            sc: string;
        }): Promise<object[]>;
        /**
         * <p>通过分类模板代码获取孪生体</p>
         * @param params - <p>查询参数-分类模板代码 DATACENTER/PARK/BUILDING/FLOOR/ROOM/EARTH/DISTRIBUTION/STANDALONEDEVICE</p>
         * @returns <p>孪生体数据</p>
         */
        function getTwinsByTemplateCode(params: any[]): Promise<object[]>;
        /**
         * <p>通过场景CiCode获取模型库数据</p>
         * @param id - <p>场景CiCode</p>
         * @returns <p>模型库数据</p>
         */
        function getModelLibrary(id: string): Promise<Map<string, object>>;
        /**
         * <p>通过指定孪生体ID获取孪生体及下层级结构数据</p>
         * @param params - <p>查询参数</p>
         * @param params.id - <p>孪生体ID/CiCode</p>
         * @param params.depth - <p>查询深度 -1代表不限制</p>
         * @param params.endfilters - <p>结束过滤对象类型条件</p>
         * @returns <p>孪生体数据结构数据</p>
         */
        function getDigitalTwinsStructureData(params: {
            id: string;
            depth: number;
            endfilters: string[];
        }): Promise<Map<object>>;
        /**
         * <p>获取场景资源数据</p>
         * @param id - <p>场景ID/CICODE</p>
         * @returns <p>资源数据</p>
         */
        function getSceneResource(id: number): Promise<THINGX.ServerInterface.SceneResourceData>;
        /**
         * <p>获取所有logo数据</p>
         * @returns <ul>
         * <li>logo数据</li>
         * </ul>
         */
        function getLogos(): Promise<Map<object>>;
        /**
         * <p>获取场景信息</p>
         * @param identify - <p>场景ID/场景名称</p>
         * @returns <ul>
         * <li>场景信息</li>
         * </ul>
         */
        function getSceneInfo(identify: string): Promise<object>;
        /**
         * <p>获取用户信息详细</p>
         * @returns <p>用户信息</p>
         */
        function getUserDetailInfo(用户ID: number): Promise<object>;
    }
    /**
     * <p>定时器模块</p>
     */
    namespace Timer {
        /**
         * <p>增加全局延时执行函数</p>
         * @example
         * THINGX.Timer.add("test", 1, false, () => {} );
         * @param name - <p>延时执行函数标识</p>
         * @param func - <p>需要执行的函数</p>
         * @param [delay = 0] - <p>延时多久，单位秒</p>
         * @param [isLoop = false] - <p>是否循环执行函数</p>
         * @param [list = []] - <p>执行函数传参</p>
         */
        function add(name: string, func: (...params: any[]) => any, delay?: number, isLoop?: boolean, list?: any[]): void;
        /**
         * <p>删除全局延时执行函数</p>
         * @example
         * THINGX.Timer.remove("test");
         * @param name - <p>延时执行函数标识</p>
         */
        function remove(name: string): void;
        /**
         * <p>移除全局所有延时执行函数</p>
         */
        function clear(): void;
        /**
         * <p>获取全局延时函数配置</p>
         * @example
         * THINGX.Timer.has("test");
         * @param name - <p>延时执行函数标识</p>
         * @returns <ul>
         * <li>有则返回增加时配置，否则返回undefined</li>
         * </ul>
         */
        function get(name: string): any[] | null;
        /**
         * <p>为对象添加延时执行函数</p>
         * @example
         * let obj = {
         count: 0
         add: function(val) {
           this.count += val;
         }
        }
        // 实现每一秒obj.mycount加1
        THINGX.Timer.addWithObject('example', obj, 'add', 1, false, [5]);
         * @param name - <p>延时执行函数标识，作用域为添加的所有对象</p>
         * @param obj - <p>延时对象</p>
         * @param methodName - <p>需要延时的方法名</p>
         * @param [delay = 0] - <p>延时执行的时间,单位秒</p>
         * @param [isLoop = false] - <p>是否循环</p>
         * @param [list = []] - <p>执行函数传参</p>
         */
        function addWithObject(name: any, obj: any, methodName: string, delay?: number, isLoop?: boolean, list?: any[]): void;
        /**
         * <p>移除对象上延时函数</p>
         * @example
         * THINGX.Timer.removeWithObject('example');
         * @param name - <p>延时执行函数标识，作用域为添加的所有对象</p>
         */
        function removeWithObject(name: string): void;
        /**
         * <p>移除所有对象上的延时函数</p>
         */
        function clearWithObject(): void;
        /**
         * <p>获取在对象上增加的延时函数配置</p>
         * @param name - <p>延时执行函数标识，作用域为添加的所有对象</p>
         * @returns <ul>
         * <li>有则返回增加时配置，否则返回undefined</li>
         * </ul>
         */
        function getWithObject(name: string): any[] | null;
        /**
         * <p>增加全局延时执行函数</p>
         * @example
         * THINGX.Timer.add("test", 1, false, () => {} );
         * @param name - <p>延时执行函数标识</p>
         * @param func - <p>需要执行的函数</p>
         * @param [delay = 0] - <p>延时多久，单位秒</p>
         * @param [isLoop = false] - <p>是否循环执行函数</p>
         * @param [list = []] - <p>执行函数传参</p>
         */
        function add(name: string, func: (...params: any[]) => any, delay?: number, isLoop?: boolean, list?: any[]): void;
        /**
         * <p>删除全局延时执行函数</p>
         * @example
         * THINGX.Timer.remove("test");
         * @param name - <p>延时执行函数标识</p>
         */
        function remove(name: string): void;
        /**
         * <p>移除全局所有延时执行函数</p>
         */
        function clear(): void;
        /**
         * <p>获取全局延时函数配置</p>
         * @example
         * THINGX.Timer.has("test");
         * @param name - <p>延时执行函数标识</p>
         * @returns <ul>
         * <li>有则返回增加时配置，否则返回undefined</li>
         * </ul>
         */
        function get(name: string): any[] | null;
        /**
         * <p>为对象添加延时执行函数</p>
         * @example
         * let obj = {
         count: 0
         add: function(val) {
           this.count += val;
         }
        }
        // 实现每一秒obj.mycount加1
        THINGX.Timer.addWithObject('example', obj, 'add', 1, false, [5]);
         * @param name - <p>延时执行函数标识，作用域为添加的所有对象</p>
         * @param obj - <p>延时对象</p>
         * @param methodName - <p>需要延时的方法名</p>
         * @param [delay = 0] - <p>延时执行的时间,单位秒</p>
         * @param [isLoop = false] - <p>是否循环</p>
         * @param [list = []] - <p>执行函数传参</p>
         */
        function addWithObject(name: any, obj: any, methodName: string, delay?: number, isLoop?: boolean, list?: any[]): void;
        /**
         * <p>移除对象上延时函数</p>
         * @example
         * THINGX.Timer.removeWithObject('example');
         * @param name - <p>延时执行函数标识，作用域为添加的所有对象</p>
         */
        function removeWithObject(name: string): void;
        /**
         * <p>移除所有对象上的延时函数</p>
         */
        function clearWithObject(): void;
        /**
         * <p>获取在对象上增加的延时函数配置</p>
         * @param name - <p>延时执行函数标识，作用域为添加的所有对象</p>
         * @returns <ul>
         * <li>有则返回增加时配置，否则返回undefined</li>
         * </ul>
         */
        function getWithObject(name: string): any[] | null;
    }
    /**
     * <p>UI模块</p>
     */
    namespace UI {
        /**
         * <p>加载UI模块</p>
         */
        namespace Loading {
            /**
             * <p>创建并显示应用loading ui</p>
             * @param [url] - <p>资源url路径，默认使用系统自带</p>
             * @param [type = gif] - <p>类型 gif/sequence/video</p>
             */
            function show(url?: string, type?: string): void;
            /**
             * <p>隐藏并销毁应用loading ui</p>
             */
            function hide(): void;
            /**
             * <p>创建并显示应用loading ui</p>
             * @param [url] - <p>资源url路径，默认使用系统自带</p>
             * @param [type = gif] - <p>类型 gif/sequence/video</p>
             */
            function show(url?: string, type?: string): void;
            /**
             * <p>隐藏并销毁应用loading ui</p>
             */
            function hide(): void;
        }
        /**
         * <p>信息模块</p>
         */
        namespace Message {
            /**
             * <p>信息配置</p>
             * @property [content] - <p>提示内容</p>
             * @property [onClose] - <p>关闭时的回调</p>
             * @property [closable = false] - <p>是否显示关闭按钮</p>
             * @property [duration = 1.5] - <p>默认自动关闭的延时，单位秒</p>
             */
            type Config = {
                content?: string;
                onClose?: (...params: any[]) => any;
                closable?: boolean;
                duration?: number;
            };
            /**
             * <p>信息配置</p>
             * @property [content] - <p>提示内容</p>
             * @property [onClose] - <p>关闭时的回调</p>
             * @property [closable = false] - <p>是否显示关闭按钮</p>
             * @property [duration = 1.5] - <p>默认自动关闭的延时，单位秒</p>
             */
            type Config = {
                content?: string;
                onClose?: (...params: any[]) => any;
                closable?: boolean;
                duration?: number;
            };
            /**
             * <p>显示提示信息</p>
             * @example
             * THINGX.Message.info('提示信息');
             * @param config - <p>MessageConfig为相关配置,string为待显示的内容</p>
             */
            function info(config: THINGX.Message.Config | string): void;
            /**
             * <p>显示成功信息</p>
             * @param config - <p>MessageConfig为相关配置,string为待显示的内容</p>
             */
            function success(config: THINGX.Message.Config | string): void;
            /**
             * <p>显示警告信息</p>
             * @param config - <p>MessageConfig为相关配置,string为待显示的内容</p>
             */
            function warning(config: THINGX.Message.Config | string): void;
            /**
             * <p>显示错误信息</p>
             * @example
             * THINGX.Message.error({
             content: '错误信息',
             onClose: () => {console.error('错误信息 end')},
             duration: 100,
             closable: true,
            });
             * @param config - <p>MessageConfig为相关配置,string为待显示的内容</p>
             */
            function error(config: THINGX.Message.Config | string): void;
            /**
             * <p>显示加载信息</p>
             * @param config - <p>MessageConfig为相关配置,string为待显示的内容</p>
             */
            function loading(config: THINGX.Message.Config | string): void;
            /**
             * <p>配置信息提示</p>
             * @param config - <p>MessageConfig为相关配置</p>
             */
            function config(config: THINGX.Message.Config): void;
            /**
             * <p>信息配置</p>
             * @property [content] - <p>提示内容</p>
             * @property [onClose] - <p>关闭时的回调</p>
             * @property [closable = false] - <p>是否显示关闭按钮</p>
             * @property [duration = 1.5] - <p>默认自动关闭的延时，单位秒</p>
             */
            type Config = {
                content?: string;
                onClose?: (...params: any[]) => any;
                closable?: boolean;
                duration?: number;
            };
            /**
             * <p>信息配置</p>
             * @property [content] - <p>提示内容</p>
             * @property [onClose] - <p>关闭时的回调</p>
             * @property [closable = false] - <p>是否显示关闭按钮</p>
             * @property [duration = 1.5] - <p>默认自动关闭的延时，单位秒</p>
             */
            type Config = {
                content?: string;
                onClose?: (...params: any[]) => any;
                closable?: boolean;
                duration?: number;
            };
            /**
             * <p>显示提示信息</p>
             * @example
             * THINGX.Message.info('提示信息');
             * @param config - <p>MessageConfig为相关配置,string为待显示的内容</p>
             */
            function info(config: THINGX.Message.Config | string): void;
            /**
             * <p>显示成功信息</p>
             * @param config - <p>MessageConfig为相关配置,string为待显示的内容</p>
             */
            function success(config: THINGX.Message.Config | string): void;
            /**
             * <p>显示警告信息</p>
             * @param config - <p>MessageConfig为相关配置,string为待显示的内容</p>
             */
            function warning(config: THINGX.Message.Config | string): void;
            /**
             * <p>显示错误信息</p>
             * @example
             * THINGX.Message.error({
             content: '错误信息',
             onClose: () => {console.error('错误信息 end')},
             duration: 100,
             closable: true,
            });
             * @param config - <p>MessageConfig为相关配置,string为待显示的内容</p>
             */
            function error(config: THINGX.Message.Config | string): void;
            /**
             * <p>显示加载信息</p>
             * @param config - <p>MessageConfig为相关配置,string为待显示的内容</p>
             */
            function loading(config: THINGX.Message.Config | string): void;
            /**
             * <p>配置信息提示</p>
             * @param config - <p>MessageConfig为相关配置</p>
             */
            function config(config: THINGX.Message.Config): void;
        }
        /**
         * <p>加载UI模块</p>
         */
        namespace Loading {
            /**
             * <p>创建并显示应用loading ui</p>
             * @param [url] - <p>资源url路径，默认使用系统自带</p>
             * @param [type = gif] - <p>类型 gif/sequence/video</p>
             */
            function show(url?: string, type?: string): void;
            /**
             * <p>隐藏并销毁应用loading ui</p>
             */
            function hide(): void;
            /**
             * <p>创建并显示应用loading ui</p>
             * @param [url] - <p>资源url路径，默认使用系统自带</p>
             * @param [type = gif] - <p>类型 gif/sequence/video</p>
             */
            function show(url?: string, type?: string): void;
            /**
             * <p>隐藏并销毁应用loading ui</p>
             */
            function hide(): void;
        }
        /**
         * <p>信息模块</p>
         */
        namespace Message {
            /**
             * <p>信息配置</p>
             * @property [content] - <p>提示内容</p>
             * @property [onClose] - <p>关闭时的回调</p>
             * @property [closable = false] - <p>是否显示关闭按钮</p>
             * @property [duration = 1.5] - <p>默认自动关闭的延时，单位秒</p>
             */
            type Config = {
                content?: string;
                onClose?: (...params: any[]) => any;
                closable?: boolean;
                duration?: number;
            };
            /**
             * <p>信息配置</p>
             * @property [content] - <p>提示内容</p>
             * @property [onClose] - <p>关闭时的回调</p>
             * @property [closable = false] - <p>是否显示关闭按钮</p>
             * @property [duration = 1.5] - <p>默认自动关闭的延时，单位秒</p>
             */
            type Config = {
                content?: string;
                onClose?: (...params: any[]) => any;
                closable?: boolean;
                duration?: number;
            };
            /**
             * <p>显示提示信息</p>
             * @example
             * THINGX.Message.info('提示信息');
             * @param config - <p>MessageConfig为相关配置,string为待显示的内容</p>
             */
            function info(config: THINGX.Message.Config | string): void;
            /**
             * <p>显示成功信息</p>
             * @param config - <p>MessageConfig为相关配置,string为待显示的内容</p>
             */
            function success(config: THINGX.Message.Config | string): void;
            /**
             * <p>显示警告信息</p>
             * @param config - <p>MessageConfig为相关配置,string为待显示的内容</p>
             */
            function warning(config: THINGX.Message.Config | string): void;
            /**
             * <p>显示错误信息</p>
             * @example
             * THINGX.Message.error({
             content: '错误信息',
             onClose: () => {console.error('错误信息 end')},
             duration: 100,
             closable: true,
            });
             * @param config - <p>MessageConfig为相关配置,string为待显示的内容</p>
             */
            function error(config: THINGX.Message.Config | string): void;
            /**
             * <p>显示加载信息</p>
             * @param config - <p>MessageConfig为相关配置,string为待显示的内容</p>
             */
            function loading(config: THINGX.Message.Config | string): void;
            /**
             * <p>配置信息提示</p>
             * @param config - <p>MessageConfig为相关配置</p>
             */
            function config(config: THINGX.Message.Config): void;
            /**
             * <p>信息配置</p>
             * @property [content] - <p>提示内容</p>
             * @property [onClose] - <p>关闭时的回调</p>
             * @property [closable = false] - <p>是否显示关闭按钮</p>
             * @property [duration = 1.5] - <p>默认自动关闭的延时，单位秒</p>
             */
            type Config = {
                content?: string;
                onClose?: (...params: any[]) => any;
                closable?: boolean;
                duration?: number;
            };
            /**
             * <p>信息配置</p>
             * @property [content] - <p>提示内容</p>
             * @property [onClose] - <p>关闭时的回调</p>
             * @property [closable = false] - <p>是否显示关闭按钮</p>
             * @property [duration = 1.5] - <p>默认自动关闭的延时，单位秒</p>
             */
            type Config = {
                content?: string;
                onClose?: (...params: any[]) => any;
                closable?: boolean;
                duration?: number;
            };
            /**
             * <p>显示提示信息</p>
             * @example
             * THINGX.Message.info('提示信息');
             * @param config - <p>MessageConfig为相关配置,string为待显示的内容</p>
             */
            function info(config: THINGX.Message.Config | string): void;
            /**
             * <p>显示成功信息</p>
             * @param config - <p>MessageConfig为相关配置,string为待显示的内容</p>
             */
            function success(config: THINGX.Message.Config | string): void;
            /**
             * <p>显示警告信息</p>
             * @param config - <p>MessageConfig为相关配置,string为待显示的内容</p>
             */
            function warning(config: THINGX.Message.Config | string): void;
            /**
             * <p>显示错误信息</p>
             * @example
             * THINGX.Message.error({
             content: '错误信息',
             onClose: () => {console.error('错误信息 end')},
             duration: 100,
             closable: true,
            });
             * @param config - <p>MessageConfig为相关配置,string为待显示的内容</p>
             */
            function error(config: THINGX.Message.Config | string): void;
            /**
             * <p>显示加载信息</p>
             * @param config - <p>MessageConfig为相关配置,string为待显示的内容</p>
             */
            function loading(config: THINGX.Message.Config | string): void;
            /**
             * <p>配置信息提示</p>
             * @param config - <p>MessageConfig为相关配置</p>
             */
            function config(config: THINGX.Message.Config): void;
        }
    }
    /**
     * <p>工具模块</p>
     */
    namespace Utils {
        /**
         * <p>DOM相关操作</p>
         */
        namespace DOM {
            /**
             * <p>动态创建style标签</p>
             * @param styleText - <p>style 标签内容</p>
             * @param id - <p>style标签id</p>
             */
            function addStyleTag(styleText: string, id: string): void;
            /**
             * <p>删除style标签</p>
             * @param id - <p>style标签id</p>
             */
            function removeStyleTag(id: string): void;
            /**
             * <p>动态加载js文件</p>
             * @param data - <p>加载源</p>
             * @param config - <p>加载配置</p>
             * @param [config.loadType = THINGX.CONST.JS_LOAD_TYPE.EXEC] - <p>加载脚本方式</p>
             * @param [config.srcType = THINGX.CONST.JS_SRC_TYPE.URL] - <p>加载脚本源类型</p>
             * @param undefined - <p>是否加载成功</p>
             */
            function dynamicLoadJS(data: string, config: {
                loadType?: THINGX.CONST.JS_LOAD_YPE;
                srcType?: THINGX.CONST.JS_SRC_TYPE;
            }): void;
            /**
             * <p>动态创建style标签</p>
             * @param styleText - <p>style 标签内容</p>
             * @param id - <p>style标签id</p>
             */
            function addStyleTag(styleText: string, id: string): void;
            /**
             * <p>删除style标签</p>
             * @param id - <p>style标签id</p>
             */
            function removeStyleTag(id: string): void;
            /**
             * <p>动态加载js文件</p>
             * @param data - <p>加载源</p>
             * @param config - <p>加载配置</p>
             * @param [config.loadType = THINGX.CONST.JS_LOAD_TYPE.EXEC] - <p>加载脚本方式</p>
             * @param [config.srcType = THINGX.CONST.JS_SRC_TYPE.URL] - <p>加载脚本源类型</p>
             * @param undefined - <p>是否加载成功</p>
             */
            function dynamicLoadJS(data: string, config: {
                loadType?: THINGX.CONST.JS_LOAD_YPE;
                srcType?: THINGX.CONST.JS_SRC_TYPE;
            }): void;
        }
        /**
         * <p>孪生体搜索模块</p>
         */
        namespace Search {
            /**
             * <p>显示搜索物体</p>
             * @param [digitalTwins = []] - <p>孪生体列表</p>
             * @param [unknownObjects = []] - <p>未知物体列表</p>
             */
            function show(digitalTwins?: THING.BaseObject[], unknownObjects?: any[]): void;
            /**
             * <p>清空搜索结果</p>
             * @param [config = {}] - <p>清空配置</p>
             * @param config.continueSearch - <p>是否继续搜索</p>
             */
            function clear(config?: {
                continueSearch: boolean;
            }): void;
            /**
             * <p>显示搜索物体</p>
             * @param [digitalTwins = []] - <p>孪生体列表</p>
             * @param [unknownObjects = []] - <p>未知物体列表</p>
             */
            function show(digitalTwins?: THING.BaseObject[], unknownObjects?: any[]): void;
            /**
             * <p>清空搜索结果</p>
             * @param [config = {}] - <p>清空配置</p>
             * @param config.continueSearch - <p>是否继续搜索</p>
             */
            function clear(config?: {
                continueSearch: boolean;
            }): void;
        }
        /**
         * <p>三维空间相关操作模块</p>
         */
        namespace Space {
            /**
             * <p>查询在以center为球心,radius为半径的球内的目标对象</p>
             * @param filter - <p>筛选条件</p>
             * @param center - <p>球心坐标</p>
             * @param radius - <p>球半径</p>
             * @param [queryLevel = THINGX.App.currentLevel] - <p>查询层级</p>
             */
            function queryBySphere(filter: string, center: number[], radius: number, queryLevel?: THING.BaseObject): THING.Selector;
            /**
             * <p>计算孪生体到摄像机的距离</p>
             * @param digitalTwin - <p>目标孪生体</p>
             * @param isRecursive - <p>是否遍历孩子</p>
             */
            function getDistanceFromCamera(digitalTwin: THING.BaseObject, isRecursive: boolean): number;
            /**
             * <p>查询在以center为球心,radius为半径的球内的目标对象</p>
             * @param filter - <p>筛选条件</p>
             * @param center - <p>球心坐标</p>
             * @param radius - <p>球半径</p>
             * @param [queryLevel = THINGX.App.currentLevel] - <p>查询层级</p>
             */
            function queryBySphere(filter: string, center: number[], radius: number, queryLevel?: THING.BaseObject): THING.Selector;
            /**
             * <p>计算孪生体到摄像机的距离</p>
             * @param digitalTwin - <p>目标孪生体</p>
             * @param isRecursive - <p>是否遍历孩子</p>
             */
            function getDistanceFromCamera(digitalTwin: THING.BaseObject, isRecursive: boolean): number;
        }
        /**
         * <p>获取资源全路径</p>
         */
        function getResourceFullUrl(url: string): string;
        /**
         * <p>通过模型型号获取模型库信息</p>
         */
        function getModelProductInfo(模型型号: string): any | null;
        /**
         * <p>加载孪生体资源</p>
         */
        function loadResources(digitalTwins: THING.BaseObject[] | THING.BaseObject): Promise<undefined>;
        /**
         * <p>将孪生体注册条件转换成ThingJS表达式语法</p>
         */
        function regConditonToThingJSQueryExpression(condition: any): string;
        /**
         * <p>获取所有孪生体集合以及其查询条件</p>
         * @param [isReload = false] - <p>是否重新请求后端接口刷新</p>
         */
        function getAllDigitalTwinCollect(isReload?: boolean): Promise<Map<string, object>>;
        /**
         * <p>生成uuid</p>
         * @param [separator] - <p>分隔符</p>
         */
        function createUUID(separator?: string): string;
        /**
         * <p>DOM相关操作</p>
         */
        namespace DOM {
            /**
             * <p>动态创建style标签</p>
             * @param styleText - <p>style 标签内容</p>
             * @param id - <p>style标签id</p>
             */
            function addStyleTag(styleText: string, id: string): void;
            /**
             * <p>删除style标签</p>
             * @param id - <p>style标签id</p>
             */
            function removeStyleTag(id: string): void;
            /**
             * <p>动态加载js文件</p>
             * @param data - <p>加载源</p>
             * @param config - <p>加载配置</p>
             * @param [config.loadType = THINGX.CONST.JS_LOAD_TYPE.EXEC] - <p>加载脚本方式</p>
             * @param [config.srcType = THINGX.CONST.JS_SRC_TYPE.URL] - <p>加载脚本源类型</p>
             * @param undefined - <p>是否加载成功</p>
             */
            function dynamicLoadJS(data: string, config: {
                loadType?: THINGX.CONST.JS_LOAD_YPE;
                srcType?: THINGX.CONST.JS_SRC_TYPE;
            }): void;
            /**
             * <p>动态创建style标签</p>
             * @param styleText - <p>style 标签内容</p>
             * @param id - <p>style标签id</p>
             */
            function addStyleTag(styleText: string, id: string): void;
            /**
             * <p>删除style标签</p>
             * @param id - <p>style标签id</p>
             */
            function removeStyleTag(id: string): void;
            /**
             * <p>动态加载js文件</p>
             * @param data - <p>加载源</p>
             * @param config - <p>加载配置</p>
             * @param [config.loadType = THINGX.CONST.JS_LOAD_TYPE.EXEC] - <p>加载脚本方式</p>
             * @param [config.srcType = THINGX.CONST.JS_SRC_TYPE.URL] - <p>加载脚本源类型</p>
             * @param undefined - <p>是否加载成功</p>
             */
            function dynamicLoadJS(data: string, config: {
                loadType?: THINGX.CONST.JS_LOAD_YPE;
                srcType?: THINGX.CONST.JS_SRC_TYPE;
            }): void;
        }
        /**
         * <p>孪生体搜索模块</p>
         */
        namespace Search {
            /**
             * <p>显示搜索物体</p>
             * @param [digitalTwins = []] - <p>孪生体列表</p>
             * @param [unknownObjects = []] - <p>未知物体列表</p>
             */
            function show(digitalTwins?: THING.BaseObject[], unknownObjects?: any[]): void;
            /**
             * <p>清空搜索结果</p>
             * @param [config = {}] - <p>清空配置</p>
             * @param config.continueSearch - <p>是否继续搜索</p>
             */
            function clear(config?: {
                continueSearch: boolean;
            }): void;
            /**
             * <p>显示搜索物体</p>
             * @param [digitalTwins = []] - <p>孪生体列表</p>
             * @param [unknownObjects = []] - <p>未知物体列表</p>
             */
            function show(digitalTwins?: THING.BaseObject[], unknownObjects?: any[]): void;
            /**
             * <p>清空搜索结果</p>
             * @param [config = {}] - <p>清空配置</p>
             * @param config.continueSearch - <p>是否继续搜索</p>
             */
            function clear(config?: {
                continueSearch: boolean;
            }): void;
        }
        /**
         * <p>三维空间相关操作模块</p>
         */
        namespace Space {
            /**
             * <p>查询在以center为球心,radius为半径的球内的目标对象</p>
             * @param filter - <p>筛选条件</p>
             * @param center - <p>球心坐标</p>
             * @param radius - <p>球半径</p>
             * @param [queryLevel = THINGX.App.currentLevel] - <p>查询层级</p>
             */
            function queryBySphere(filter: string, center: number[], radius: number, queryLevel?: THING.BaseObject): THING.Selector;
            /**
             * <p>计算孪生体到摄像机的距离</p>
             * @param digitalTwin - <p>目标孪生体</p>
             * @param isRecursive - <p>是否遍历孩子</p>
             */
            function getDistanceFromCamera(digitalTwin: THING.BaseObject, isRecursive: boolean): number;
            /**
             * <p>查询在以center为球心,radius为半径的球内的目标对象</p>
             * @param filter - <p>筛选条件</p>
             * @param center - <p>球心坐标</p>
             * @param radius - <p>球半径</p>
             * @param [queryLevel = THINGX.App.currentLevel] - <p>查询层级</p>
             */
            function queryBySphere(filter: string, center: number[], radius: number, queryLevel?: THING.BaseObject): THING.Selector;
            /**
             * <p>计算孪生体到摄像机的距离</p>
             * @param digitalTwin - <p>目标孪生体</p>
             * @param isRecursive - <p>是否遍历孩子</p>
             */
            function getDistanceFromCamera(digitalTwin: THING.BaseObject, isRecursive: boolean): number;
        }
        /**
         * <p>获取资源全路径</p>
         */
        function getResourceFullUrl(url: string): string;
        /**
         * <p>通过模型型号获取模型库信息</p>
         */
        function getModelProductInfo(模型型号: string): any | null;
        /**
         * <p>加载孪生体资源</p>
         */
        function loadResources(digitalTwins: THING.BaseObject[] | THING.BaseObject): Promise<undefined>;
        /**
         * <p>将孪生体注册条件转换成ThingJS表达式语法</p>
         */
        function regConditonToThingJSQueryExpression(condition: any): string;
        /**
         * <p>获取所有孪生体集合以及其查询条件</p>
         * @param [isReload = false] - <p>是否重新请求后端接口刷新</p>
         */
        function getAllDigitalTwinCollect(isReload?: boolean): Promise<Map<string, object>>;
        /**
         * <p>生成uuid</p>
         * @param [separator] - <p>分隔符</p>
         */
        function createUUID(separator?: string): string;
    }
    /**
     * <p>视频流模块</p>
     */
    namespace VideoStream {
        /**
         * <p>获取视频流服务集合</p>
         */
        function getServices(): Map<string, object>;
        /**
         * <p>通过视频流服务创建激活一个监视</p>
         * @returns <ul>
         * <li>监视实例</li>
         * </ul>
         */
        function activateSurveillance(config: any, serial: string, code: string, uri: string, width: string, height: height): any;
        /**
         * <p>取消激活监视</p>
         * @param surveillance - <p>监视实例</p>
         */
        function deactivateSurveillance(surveillance: any): void;
        /**
         * <p>获取视频流服务集合</p>
         */
        function getServices(): Map<string, object>;
        /**
         * <p>通过视频流服务创建激活一个监视</p>
         * @returns <ul>
         * <li>监视实例</li>
         * </ul>
         */
        function activateSurveillance(config: any, serial: string, code: string, uri: string, width: string, height: height): any;
        /**
         * <p>取消激活监视</p>
         * @param surveillance - <p>监视实例</p>
         */
        function deactivateSurveillance(surveillance: any): void;
    }
    /**
     * <p>视点动画模块</p>
     */
    namespace ViewPoint {
        /**
         * <p>显示视点动画</p>
         */
        function show(): void;
        /**
         * <p>隐藏视点动画</p>
         */
        function hide(): void;
        /**
         * <p>播放视点动画</p>
         * @param name - <p>视点动画名称</p>
         * @returns <ul>
         * <li>视点播放是否成功</li>
         * </ul>
         */
        function play(name: string): Promise<boolean>;
        /**
         * <p>挂起当前视点动画</p>
         */
        function suspend(): void;
        /**
         * <p>恢复当前视点动画</p>
         */
        function resume(): void;
        /**
         * <p>停止播放当前视点动画</p>
         */
        function stop(): void;
        /**
         * <p>增加视点动画</p>
         * @param name - <p>视点动画名称</p>
         * @returns <ul>
         * <li>是否增加成功</li>
         * </ul>
         */
        function add(name: string): Promise<boolean>;
        /**
         * <p>获取视点动画</p>
         * @param name - <p>视点动画名称</p>
         */
        function get(name: string): any;
        /**
         * <p>删除视点动画</p>
         * @param name - <p>视点动画名称</p>
         * @returns <ul>
         * <li>是否删除成功</li>
         * </ul>
         */
        function remove(name: string): Promise<boolean>;
        /**
         * <p>修改视点动画名称</p>
         * @param oldName - <p>视点动画旧名称</p>
         * @param newName - <p>视点动画新名称</p>
         * @returns <ul>
         * <li>是否重命名成功</li>
         * </ul>
         */
        function reName(oldName: string, newName: string): Promise<boolean>;
        /**
         * <p>增加视点动画节点</p>
         * @param name - <p>视点动画名称</p>
         * @param [params] - <p>节点参数</p>
         * @returns <ul>
         * <li>是否增加成功</li>
         * </ul>
         */
        function addNode(name: string, params?: any): Promise<boolean>;
        /**
         * <p>更新视点动画节点</p>
         * @param name - <p>视点动画名称</p>
         * @param index - <p>被更新节点索引</p>
         * @param params - <p>节点参数</p>
         * @returns <ul>
         * <li>是否更新成功</li>
         * </ul>
         */
        function updateNode(name: string, index: number, params: any): Promise<boolean>;
        /**
         * <p>截取视点动画节点视角</p>
         * @param name - <p>视点动画名称</p>
         * @param index - <p>节点索引</p>
         * @returns <ul>
         * <li>是否截取成功</li>
         * </ul>
         */
        function snippingNodeView(name: string, index: number): Promise<boolean>;
        /**
         * <p>删除视点动画中节点</p>
         * @param name - <p>视点动画名称</p>
         * @param index - <p>节点索引</p>
         * @returns <ul>
         * <li>是否删除成功</li>
         * </ul>
         */
        function removeNode(name: string, index: number): Promise<boolean>;
        /**
         * <p>预览视点动画节点</p>
         * @param name - <p>视点动画名称</p>
         * @param index - <p>节点索引</p>
         */
        function previewNode(name: string, index: number): void;
        /**
         * <p>设置视点动画循环模式</p>
         */
        function setLoopPlayMode(type: string): void;
        /**
         * <p>激活视点动画声音</p>
         */
        function activateSound(): void;
        /**
         * <p>取消激活视点动画声音</p>
         */
        function deactivatedSound(): void;
        /**
         * <p>增加视点模块</p>
         * @example
         * let module = {};
         * module.snapshot = () => {
         *     // 记录的数据
         *     return {name: 'name'}
         * };
         * // 恢复执行动作
         * module.recover = (data) => {};
         * module.isRecoverOk = () => {
         *     return true;
         * };
         * module.recoverCleardata) => {};
         * THINGX.ViewPoint.addModule('add-module', module);
         * @param name - <p>模块名称</p>
         * @param module - <p>模块实现，需实现方法 snapshot-记录视点/recover-恢复视点/isRecoverOk-是否恢复完成/recoverClear-恢复清理</p>
         * @param [index] - <p>增加位置，默认增加到当前视点模块末尾</p>
         * @returns <ul>
         * <li>是否增加成功</li>
         * </ul>
         */
        function addModule(name: string, module: any, index?: number): boolean;
        /**
         * <p>获取所有的视点动画列表</p>
         */
        function getList(): Promise<object[]>;
        /**
         * <p>展示视点动画列表，需要在视点动画模块显示状态</p>
         * @param name - <p>视点动画名称</p>
         */
        function showList(name: string): object[];
        /**
         * <p>获取视点动画编辑列表</p>
         * @param name - <p>视点动画名称</p>
         */
        function getEditList(name: string): Promise<object[]>;
        /**
         * <p>展示视点动画编辑列表，需要在视点动画模块显示状态</p>
         * @param name - <p>视点动画名称</p>
         */
        function showEditList(name: string): object[];
        /**
         * <p>显示视点动画</p>
         */
        function show(): void;
        /**
         * <p>隐藏视点动画</p>
         */
        function hide(): void;
        /**
         * <p>播放视点动画</p>
         * @param name - <p>视点动画名称</p>
         * @returns <ul>
         * <li>视点播放是否成功</li>
         * </ul>
         */
        function play(name: string): Promise<boolean>;
        /**
         * <p>挂起当前视点动画</p>
         */
        function suspend(): void;
        /**
         * <p>恢复当前视点动画</p>
         */
        function resume(): void;
        /**
         * <p>停止播放当前视点动画</p>
         */
        function stop(): void;
        /**
         * <p>增加视点动画</p>
         * @param name - <p>视点动画名称</p>
         * @returns <ul>
         * <li>是否增加成功</li>
         * </ul>
         */
        function add(name: string): Promise<boolean>;
        /**
         * <p>获取视点动画</p>
         * @param name - <p>视点动画名称</p>
         */
        function get(name: string): any;
        /**
         * <p>删除视点动画</p>
         * @param name - <p>视点动画名称</p>
         * @returns <ul>
         * <li>是否删除成功</li>
         * </ul>
         */
        function remove(name: string): Promise<boolean>;
        /**
         * <p>修改视点动画名称</p>
         * @param oldName - <p>视点动画旧名称</p>
         * @param newName - <p>视点动画新名称</p>
         * @returns <ul>
         * <li>是否重命名成功</li>
         * </ul>
         */
        function reName(oldName: string, newName: string): Promise<boolean>;
        /**
         * <p>增加视点动画节点</p>
         * @param name - <p>视点动画名称</p>
         * @param [params] - <p>节点参数</p>
         * @returns <ul>
         * <li>是否增加成功</li>
         * </ul>
         */
        function addNode(name: string, params?: any): Promise<boolean>;
        /**
         * <p>更新视点动画节点</p>
         * @param name - <p>视点动画名称</p>
         * @param index - <p>被更新节点索引</p>
         * @param params - <p>节点参数</p>
         * @returns <ul>
         * <li>是否更新成功</li>
         * </ul>
         */
        function updateNode(name: string, index: number, params: any): Promise<boolean>;
        /**
         * <p>截取视点动画节点视角</p>
         * @param name - <p>视点动画名称</p>
         * @param index - <p>节点索引</p>
         * @returns <ul>
         * <li>是否截取成功</li>
         * </ul>
         */
        function snippingNodeView(name: string, index: number): Promise<boolean>;
        /**
         * <p>删除视点动画中节点</p>
         * @param name - <p>视点动画名称</p>
         * @param index - <p>节点索引</p>
         * @returns <ul>
         * <li>是否删除成功</li>
         * </ul>
         */
        function removeNode(name: string, index: number): Promise<boolean>;
        /**
         * <p>预览视点动画节点</p>
         * @param name - <p>视点动画名称</p>
         * @param index - <p>节点索引</p>
         */
        function previewNode(name: string, index: number): void;
        /**
         * <p>设置视点动画循环模式</p>
         */
        function setLoopPlayMode(type: string): void;
        /**
         * <p>激活视点动画声音</p>
         */
        function activateSound(): void;
        /**
         * <p>取消激活视点动画声音</p>
         */
        function deactivatedSound(): void;
        /**
         * <p>增加视点模块</p>
         * @example
         * let module = {};
         * module.snapshot = () => {
         *     // 记录的数据
         *     return {name: 'name'}
         * };
         * // 恢复执行动作
         * module.recover = (data) => {};
         * module.isRecoverOk = () => {
         *     return true;
         * };
         * module.recoverCleardata) => {};
         * THINGX.ViewPoint.addModule('add-module', module);
         * @param name - <p>模块名称</p>
         * @param module - <p>模块实现，需实现方法 snapshot-记录视点/recover-恢复视点/isRecoverOk-是否恢复完成/recoverClear-恢复清理</p>
         * @param [index] - <p>增加位置，默认增加到当前视点模块末尾</p>
         * @returns <ul>
         * <li>是否增加成功</li>
         * </ul>
         */
        function addModule(name: string, module: any, index?: number): boolean;
        /**
         * <p>获取所有的视点动画列表</p>
         */
        function getList(): Promise<object[]>;
        /**
         * <p>展示视点动画列表，需要在视点动画模块显示状态</p>
         * @param name - <p>视点动画名称</p>
         */
        function showList(name: string): object[];
        /**
         * <p>获取视点动画编辑列表</p>
         * @param name - <p>视点动画名称</p>
         */
        function getEditList(name: string): Promise<object[]>;
        /**
         * <p>展示视点动画编辑列表，需要在视点动画模块显示状态</p>
         * @param name - <p>视点动画名称</p>
         */
        function showEditList(name: string): object[];
    }
    /**
     * <p>调试</p>
     */
    namespace Debug {
        /**
         * <p>设置debug等级</p>
         * @param level - <p>console打印等级 debug/log/info/warn/error</p>
         * @param [storage = false] - <p>是否存储到local storage中，下次刷新直接生效</p>
         */
        function setLevel(level: string, storage?: boolean): void;
        /**
         * <p>获取debug等级</p>
         */
        function getLevel(): string;
        /**
         * <p>是否重写console debug/log/info/warn/error，默认为true</p>
         */
        var overwriteConsole: boolean;
        /**
         * <p>console 过滤白名单，默认为['debug', 'log', 'info', 'warn', 'error']</p>
         */
        var consoleWhiteList: string[];
    }
}

/**
 * <p>THINGJSX二开API命名空间</p>
 */
declare namespace THINGX {
    /**
     * <p>事件</p>
     */
    namespace Event {
        /**
         * @property target - <p>监听对象</p>
         * @property event - <p>监听事件</p>
         * @property [condition] - <p>物体类型选择条件</p>
         * @property [suffix] - <p>可变事件后缀</p>
         * @property callback - <p>监听回调函数</p>
         * @property [priority] - <p>监听优先级</p>
         * @property [tag] - <p>监听标签</p>
         */
        type ListenConfig = {
            target: THING.BaseObject;
            event: THINGX.Event.Type;
            condition?: string;
            suffix?: string;
            callback: (...params: any[]) => any;
            priority?: number;
            tag?: string;
        };
        /**
         * @property target - <p>监听对象</p>
         * @property event - <p>监听事件</p>
         * @property [condition] - <p>物体类型选择条件</p>
         * @property [suffix] - <p>可变事件后缀</p>
         * @property data - <p>事件信息，传递回调参数</p>
         * @property [compatibility = true] - <p>是否兼容遗产事件触发</p>
         * @property [tag] - <p>监听标签</p>
         */
        type TriggerConfig = {
            target: THING.BaseObject;
            event: THINGX.Event.Type;
            condition?: string;
            suffix?: string;
            data: any;
            compatibility?: boolean;
            tag?: string;
        };
        /**
         * @property target - <p>监听对象</p>
         * @property event - <p>监听事件</p>
         * @property [condition] - <p>物体类型选择条件</p>
         * @property [suffix] - <p>可变事件后缀</p>
         * @property [compatibility = true] - <p>是否兼容遗产事件触发</p>
         * @property [tag] - <p>监听标签</p>
         */
        type ResumeConfig = {
            target: THING.BaseObject;
            event: THINGX.Event.Type;
            condition?: string;
            suffix?: string;
            compatibility?: boolean;
            tag?: string;
        };
        /**
         * @property target - <p>监听对象</p>
         * @property event - <p>监听事件</p>
         * @property [condition] - <p>物体类型选择条件</p>
         * @property [suffix] - <p>可变事件后缀</p>
         * @property [compatibility = true] - <p>是否兼容遗产事件触发</p>
         * @property [tag] - <p>监听标签</p>
         */
        type PauseConfig = {
            target: THING.BaseObject;
            event: THINGX.Event.Type;
            condition?: string;
            suffix?: string;
            compatibility?: boolean;
            tag?: string;
        };
        /**
         * @property target - <p>监听对象</p>
         * @property event - <p>监听事件</p>
         * @property [condition] - <p>物体类型选择条件</p>
         * @property [suffix] - <p>可变事件后缀</p>
         * @property [tag] - <p>监听标签</p>
         * @property [compatibility = true] - <p>是否兼容遗产事件触发</p>
         * @property [callback] - <p>监听回调函数</p>
         */
        type OffConfig = {
            target: THING.BaseObject;
            event: THINGX.Event.Type;
            condition?: string;
            suffix?: string;
            tag?: string;
            compatibility?: boolean;
            callback?: (...params: any[]) => any;
        };
        /**
         * <p>监听事件</p>
         * @param config - <p>监听事件配置</p>
         * @returns <p>boolean 是否监听成功</p>
         */
        function on(config: THINGX.Event.ListenConfig): any;
        /**
         * <p>监听事件， 只触发一次</p>
         * @param config - <p>监听事件配置</p>
         * @returns <p>boolean 是否监听成功</p>
         */
        function one(config: THINGX.Event.ListenConfig): any;
        /**
         * <p>触发事件</p>
         * @param config - <p>监听事件配置</p>
         * @returns <p>boolean 是否触发成功</p>
         */
        function trigger(config: THINGX.Event.TriggerConfig): any;
        /**
         * <p>取消监听事件</p>
         * @param config - <p>监听事件配置</p>
         */
        function off(config: THINGX.Event.OffConfig): void;
        /**
         * <p>暂停注册事件</p>
         * @param config - <p>监听事件配置</p>
         */
        function pause(config: THINGX.Event.PauseConfig): void;
        /**
         * <p>恢复注册事件</p>
         * @param config - <p>监听事件配置</p>
         */
        function resume(config: THINGX.Event.ResumeConfig): void;
        /**
         * <p>新建事件</p>
         * @param val - <p>事件名称</p>
         * @param [legacyVal] - <p>遗产事件名称</p>
         * @param [withSuffix = false] - <p>是否有后缀</p>
         */
        function create(val: string, legacyVal?: string, withSuffix?: boolean): any;
        namespace Tag {
            /**
             * <p>显示孪生体面板</p>
             */
            var ShowDigitalTwinPanel: any;
            /**
             * <p>隐藏孪生体面板</p>
             */
            var HideDigitalTwinPanel: any;
            /**
             * <p>创建显示孪生体提示</p>
             */
            var CreateDigitalTwinTip: any;
            /**
             * <p>销毁孪生体提示</p>
             */
            var DestroyDigitalTwinTip: any;
            /**
             * <p>显示孪生体默认效果</p>
             */
            var ShowDigitalTwinDefaultEffect: any;
            /**
             * <p>隐藏孪生体默认效果</p>
             */
            var HideDigitalTwinDefaultEffect: any;
            /**
             * <p>设置选中默认效果</p>
             */
            var SetSelectDefaultEffect: any;
            /**
             * <p>取消设置选中默认效果</p>
             */
            var SetUnselectDefaultEffect: any;
            /**
             * <p>停止飞行</p>
             */
            var StopFly: any;
            /**
             * <p>设置兄弟房间透明</p>
             */
            var SetBrotherRoomsTransparency: any;
            /**
             * <p>设置兄弟房间不透明</p>
             */
            var SetBrotherRoomsNotTransparency: any;
            /**
             * <p>设置楼层透明</p>
             */
            var SetFloorTransparency: any;
            /**
             * <p>设置楼层不透明</p>
             */
            var SetFloorNotTransparency: any;
            /**
             * <p>设置兄弟孪生体透明</p>
             */
            var SetBrotherTwinsTransparency: any;
            /**
             * <p>设置兄弟孪生体不透明</p>
             */
            var SetBrotherTwinsNotTransparency: any;
            /**
             * <p>显示建筑告警</p>
             */
            var ShowAlarmForBuilding: any;
            /**
             * <p>为当前层级设置告警参数</p>
             */
            var SetAlarmParamsForCurrentLevel: any;
            /**
             * <p>创建图层</p>
             */
            var CreateLayer: any;
            /**
             * <p>更新监控效果</p>
             */
            var UpdateMonitorEffect: any;
            /**
             * <p>进入建筑后，只有一层楼则直接进入楼层</p>
             */
            var EnterFloorDirectAfterEnterBuildingIfOneFloorInBuilding: any;
            /**
             * <p>退出楼层后，只有一层楼则直接进入园区</p>
             */
            var EnterCampusDirectAfterLeaveFloorIfOneFloorInBuilding: any;
            /**
             * <p>进入楼层后，只有一间房则直接进入房间</p>
             */
            var EnterRoomDirectAfterEnterFloorIfOneRoomInFloor: any;
            /**
             * <p>退出房间后，只有一层楼则直接进入建筑</p>
             */
            var EnterBuildingDirectAfterLeaveRoomIfOneRoomInFloor: any;
        }
        /**
         * <p>事件类型</p>
         */
        namespace Type { }
    }
    /**
     * <p>告警模块</p>
     */
    namespace Alarm {
        /**
         * <p>告警查询配置</p>
         * @property [acknowledged] - <p>处理状态</p>
         * @property alarmLevel - <p>告警级别</p>
         * @property [classNames = [1, 2, 3, 4]] - <p>孪生体业务分类，默认为空数组代表所有</p>
         * @property dcIds - <p>场景的数据库ID数组（<em>DBID</em>）</p>
         * @property [enableGlobal = false/true] - <p>开启全局查询，当前层级是地图的话默认true，园区默认false。当为true时，需要设置dcIds</p>
         * @property fromCiId - <p>查询的起始层级的数据库ID（<em>DBID</em>）</p>
         * @property keyword - <p>搜索关键词，会匹配孪生体的名称，告警详情</p>
         * @property orAttrs - <p>孪生体属性条件筛选 默认空数组代表没有过滤条件</p>
         * @property [sortType = time-desc] - <p>告警排序方式 默认按时间倒序 time-asc 告警时间正序/time-desc 告警时间倒序/level-asc 告警级别正序/level-desc 告警级别倒序</p>
         */
        type QueryConfig = {
            acknowledged?: string;
            alarmLevel: number[];
            classNames?: string[];
            dcIds: string[];
            enableGlobal?: boolean;
            fromCiId: string;
            keyword: string;
            orAttrs: object[];
            sortType?: string;
        };
        /**
         * <p>告警等级配置</p>
         * @property color - <p>告警颜色，十六进制</p>
         * @property name - <p>告警级别名称</p>
         * @property sound - <p>告警声音配置</p>
         * @property sound.name - <p>告警声音名称</p>
         * @property sound.url - <p>告警声音资源url</p>
         */
        type LevelItemConfig = {
            color: string;
            name: string;
            sound: {
                name: string;
                url: string;
            };
        };
        /**
         * <p>激活告警系统</p>
         * @param purpose - <p>激活目的</p>
         */
        function activate(purpose: string): void;
        /**
         * <p>取消激活告警系统</p>
         * @param purpose - <p>取消激活目的</p>
         */
        function deactivate(purpose: string): void;
        /**
         * <p>告警系统是否激活</p>
         */
        function isActivated(): boolean;
        /**
         * <p>获取已存在的激活告警系统的目的</p>
         * @returns <ul>
         * <li>激活告警系统的目的</li>
         * </ul>
         */
        function getPurpose(): string[];
        /**
         * <p>激活3D告警效果</p>
         */
        function activateEffect(): void;
        /**
         * <p>取消激活3D告警效果</p>
         */
        function deactivateEffect(): void;
        /**
         * <p>3D告警效果是否被激活</p>
         */
        function isEffectActivated(): boolean;
        /**
         * <p>激活告警声音效果</p>
         */
        function activateSound(): void;
        /**
         * <p>取消激活告警声音效果</p>
         */
        function deactivateSound(): void;
        /**
         * <p>告警声音效果是否被激活</p>
         */
        function isSoundActivated(): boolean;
        /**
         * <p>告警系统是否初始化完成</p>
         */
        function isInitialized(): boolean;
        /**
         * <p>获取告警级别配置</p>
         * @returns <ul>
         * <li>告警级别配置</li>
         * </ul>
         */
        function getLevelConfig(): Map<number, THINGX.Alarm.LevelItemConfig>;
        /**
         * <p>获取告警查询配置</p>
         */
        function getQueryConfig(): AlarmQueryConfig;
        /**
         * <p>设置告警查询配置</p>
         * @example
         * // 设置查询告警级别为 1,2,3 级的告警
         * THINGX.Alarm.setQueryConfig({
         *     alarmLevel: [1,2,3]
         * });
         * // 设置查询孪生体业务分类为 '温湿度感应器' 的告警数据
         * THINGX.Alarm.setQueryConfig({
         *     classNames: ['温湿度感应器']
         * });
         * // 根据孪生体属性筛选告警
         * THINGX.Alarm.setQueryConfig({
         *     orAttrs:[{ "key": '业务分类', "value":"空调", "optType": 1 }]
         * });
         * @param config - <p>告警查询配置</p>
         * @param [isRemoteData = true] - <p>是否立即请求告警</p>
         */
        function setQueryConfig(config: THINGX.Alarm.QueryConfig, isRemoteData?: boolean): void;
        /**
         * <p>获取所有告警数据</p>
         */
        function getAllData(): any;
        /**
         * <p>获取全局告警数据最高告警级别 数值约小级别越高, 默认1为最高级，对应“严重”告警级别，依次向下排</p>
         */
        function getHighestLevel(): number | null;
        /**
         * <p>获取孪生体上最高告警级别数据</p>
         * @param digitalTwin - <p>孪生体对象</p>
         * @param isTraverse - <p>是否遍历该孪生体的孩子</p>
         */
        function getHighestLevelDataWithTwin(digitalTwin: THING.BaseObject, isTraverse: boolean): any | null;
        /**
         * <p>开始请求后台接口更新所有告警信息，activate后会自动调用，尽量使用activate来控制告警系统</p>
         */
        function startRequestData(): void;
        /**
         * <p>告警查询配置</p>
         * @property [acknowledged] - <p>处理状态</p>
         * @property alarmLevel - <p>告警级别</p>
         * @property [classNames = [1, 2, 3, 4]] - <p>孪生体业务分类，默认为空数组代表所有</p>
         * @property dcIds - <p>场景的数据库ID数组（<em>DBID</em>）</p>
         * @property [enableGlobal = false/true] - <p>开启全局查询，当前层级是地图的话默认true，园区默认false。当为true时，需要设置dcIds</p>
         * @property fromCiId - <p>查询的起始层级的数据库ID（<em>DBID</em>）</p>
         * @property keyword - <p>搜索关键词，会匹配孪生体的名称，告警详情</p>
         * @property orAttrs - <p>孪生体属性条件筛选 默认空数组代表没有过滤条件</p>
         * @property [sortType = time-desc] - <p>告警排序方式 默认按时间倒序 time-asc 告警时间正序/time-desc 告警时间倒序/level-asc 告警级别正序/level-desc 告警级别倒序</p>
         */
        type QueryConfig = {
            acknowledged?: string;
            alarmLevel: number[];
            classNames?: string[];
            dcIds: string[];
            enableGlobal?: boolean;
            fromCiId: string;
            keyword: string;
            orAttrs: object[];
            sortType?: string;
        };
        /**
         * <p>告警等级配置</p>
         * @property color - <p>告警颜色，十六进制</p>
         * @property name - <p>告警级别名称</p>
         * @property sound - <p>告警声音配置</p>
         * @property sound.name - <p>告警声音名称</p>
         * @property sound.url - <p>告警声音资源url</p>
         */
        type LevelItemConfig = {
            color: string;
            name: string;
            sound: {
                name: string;
                url: string;
            };
        };
        /**
         * <p>激活告警系统</p>
         * @param purpose - <p>激活目的</p>
         */
        function activate(purpose: string): void;
        /**
         * <p>取消激活告警系统</p>
         * @param purpose - <p>取消激活目的</p>
         */
        function deactivate(purpose: string): void;
        /**
         * <p>告警系统是否激活</p>
         */
        function isActivated(): boolean;
        /**
         * <p>获取已存在的激活告警系统的目的</p>
         * @returns <ul>
         * <li>激活告警系统的目的</li>
         * </ul>
         */
        function getPurpose(): string[];
        /**
         * <p>激活3D告警效果</p>
         */
        function activateEffect(): void;
        /**
         * <p>取消激活3D告警效果</p>
         */
        function deactivateEffect(): void;
        /**
         * <p>3D告警效果是否被激活</p>
         */
        function isEffectActivated(): boolean;
        /**
         * <p>激活告警声音效果</p>
         */
        function activateSound(): void;
        /**
         * <p>取消激活告警声音效果</p>
         */
        function deactivateSound(): void;
        /**
         * <p>告警声音效果是否被激活</p>
         */
        function isSoundActivated(): boolean;
        /**
         * <p>告警系统是否初始化完成</p>
         */
        function isInitialized(): boolean;
        /**
         * <p>获取告警级别配置</p>
         * @returns <ul>
         * <li>告警级别配置</li>
         * </ul>
         */
        function getLevelConfig(): Map<number, THINGX.Alarm.LevelItemConfig>;
        /**
         * <p>获取告警查询配置</p>
         */
        function getQueryConfig(): AlarmQueryConfig;
        /**
         * <p>设置告警查询配置</p>
         * @example
         * // 设置查询告警级别为 1,2,3 级的告警
         * THINGX.Alarm.setQueryConfig({
         *     alarmLevel: [1,2,3]
         * });
         * // 设置查询孪生体业务分类为 '温湿度感应器' 的告警数据
         * THINGX.Alarm.setQueryConfig({
         *     classNames: ['温湿度感应器']
         * });
         * // 根据孪生体属性筛选告警
         * THINGX.Alarm.setQueryConfig({
         *     orAttrs:[{ "key": '业务分类', "value":"空调", "optType": 1 }]
         * });
         * @param config - <p>告警查询配置</p>
         * @param [isRemoteData = true] - <p>是否立即请求告警</p>
         */
        function setQueryConfig(config: THINGX.Alarm.QueryConfig, isRemoteData?: boolean): void;
        /**
         * <p>获取所有告警数据</p>
         */
        function getAllData(): any;
        /**
         * <p>获取全局告警数据最高告警级别 数值约小级别越高, 默认1为最高级，对应“严重”告警级别，依次向下排</p>
         */
        function getHighestLevel(): number | null;
        /**
         * <p>获取孪生体上最高告警级别数据</p>
         * @param digitalTwin - <p>孪生体对象</p>
         * @param isTraverse - <p>是否遍历该孪生体的孩子</p>
         */
        function getHighestLevelDataWithTwin(digitalTwin: THING.BaseObject, isTraverse: boolean): any | null;
        /**
         * <p>开始请求后台接口更新所有告警信息，activate后会自动调用，尽量使用activate来控制告警系统</p>
         */
        function startRequestData(): void;
    }
    /**
     * <p>App模块</p>
     */
    namespace App {
        /**
         * <p>当前app</p>
         */
        var App.current: THING.App | undefined;
        /**
         * <p>当前层级孪生体对象</p>
         */
        var App.currentLevel: THING.BaseObject | undefined;
        /**
         * <p>当前app</p>
         */
        var App.current: THING.App | undefined;
        /**
         * <p>当前选择的第一个孪生体对象</p>
         */
        var App.currentSelected: THING.BaseObject | undefined;
        /**
         * <p>当前场景信息</p>
         */
        var App.sceneInfo: any;
        /**
         * <p>当前场景CICode</p>
         */
        var App.sceneCICode: string;
        /**
         * <p>通过ThingJS语法查询当前app下孪生体集合</p>
         * @param expression - <p>ThingJS语法表达式</p>
         * @returns <ul>
         * <li>查询到的孪生体</li>
         * </ul>
         */
        function App.queryWithThingJSExpression(expression: string): THING.BaseObject[];
        /**
         * <p>当前ThingJS-X版本号</p>
         */
        var App.version: string;
        /**
         * <p>当前使用的标记库版本号</p>
         */
        var App.vendorMarkerVersion: string;
        /**
         * <p>当前使用的ThingJS的版本号</p>
         */
        var App.vendorThingJSVersion: string;
        /**
         * <p>当前使用的地图的版本号</p>
         */
        var App.vendorGeoVersion: string;
        /**
         * <p>当前app</p>
         */
        var App.current: THING.App | undefined;
        /**
         * <p>当前层级孪生体对象</p>
         */
        var App.currentLevel: THING.BaseObject | undefined;
        /**
         * <p>当前app</p>
         */
        var App.current: THING.App | undefined;
        /**
         * <p>当前选择的第一个孪生体对象</p>
         */
        var App.currentSelected: THING.BaseObject | undefined;
        /**
         * <p>当前场景信息</p>
         */
        var App.sceneInfo: any;
        /**
         * <p>当前场景CICode</p>
         */
        var App.sceneCICode: string;
        /**
         * <p>通过ThingJS语法查询当前app下孪生体集合</p>
         * @param expression - <p>ThingJS语法表达式</p>
         * @returns <ul>
         * <li>查询到的孪生体</li>
         * </ul>
         */
        function App.queryWithThingJSExpression(expression: string): THING.BaseObject[];
        /**
         * <p>当前ThingJS-X版本号</p>
         */
        var App.version: string;
        /**
         * <p>当前使用的标记库版本号</p>
         */
        var App.vendorMarkerVersion: string;
        /**
         * <p>当前使用的ThingJS的版本号</p>
         */
        var App.vendorThingJSVersion: string;
        /**
         * <p>当前使用的地图的版本号</p>
         */
        var App.vendorGeoVersion: string;
    }
    /**
     * <p>业务模块</p>
     */
    namespace Business {
        /**
         * <p>显示业务模块</p>
         */
        function show(): void;
        /**
         * <p>隐藏业务模块</p>
         */
        function hide(): void;
        /**
         * <p>获取指定层级下指定名称业务</p>
         * @param [level = THINGX.App.currentLevel] - <p>指定层级</p>
         * @param [name=] - <p>业务名称，为空则获取指定层级下所有业务</p>
         * @returns <ul>
         * <li>业务实例</li>
         * </ul>
         */
        function get(level?: THING.BaseObject | THINGX.CONST.DEFAULT_DIGITAL_TWIN_CLASS, name=?: string): object[];
        /**
         * <p>激活业务</p>
         * @param name - <p>业务名称</p>
         */
        function activate(name: string): void;
        /**
         * <p>取消激活当前业务</p>
         */
        function deactivate(): void;
        /**
         * <p>获取当前激活的业务信息</p>
         */
        function getActivated(): any;
        /**
         * <p>重新读取可视化配置 并根据当前层级重新创建业务</p>
         * @returns <ul>
         * <li>是否刷新成功</li>
         * </ul>
         */
        function refresh(): Promise<boolean>;
        /**
         * <p>显示业务面板- 建议通过activate激活业务</p>
         * @param name - <p>业务名称</p>
         */
        function showPanel(name: string): void;
        /**
         * <p>隐藏业务面板 - 建议通过deactivate取消激活业务</p>
         * @param name - <p>业务名称</p>
         */
        function hidePanel(name: string): void;
        /**
         * <p>获取业务配置</p>
         * @param [level = THINGX.App.currentLevel] - <p>孪生体对象/孪生体分类</p>
         * @param [name=] - <p>业务名称，非空的话返回指定配置，否则返回所有配置</p>
         */
        function getConfig(level?: THING.BaseObject | THINGX.CONST.DEFAULT_DIGITAL_TWIN_CLASS, name=?: string): any | null;
        /**
         * <p>获取当前业务面板配置</p>
         */
        function getPanelConfig(): any | null;
        /**
         * <p>获取当前激活的业务名称</p>
         * @param [isFullName = false] - <p>是否获取业务全称</p>
         * @returns <ul>
         * <li>当前激活的业务名称/全称</li>
         * </ul>
         */
        function getCurrentName(isFullName?: boolean): string;
        /**
         * <p>显示业务模块</p>
         */
        function show(): void;
        /**
         * <p>隐藏业务模块</p>
         */
        function hide(): void;
        /**
         * <p>获取指定层级下指定名称业务</p>
         * @param [level = THINGX.App.currentLevel] - <p>指定层级</p>
         * @param [name=] - <p>业务名称，为空则获取指定层级下所有业务</p>
         * @returns <ul>
         * <li>业务实例</li>
         * </ul>
         */
        function get(level?: THING.BaseObject | THINGX.CONST.DEFAULT_DIGITAL_TWIN_CLASS, name=?: string): object[];
        /**
         * <p>激活业务</p>
         * @param name - <p>业务名称</p>
         */
        function activate(name: string): void;
        /**
         * <p>取消激活当前业务</p>
         */
        function deactivate(): void;
        /**
         * <p>获取当前激活的业务信息</p>
         */
        function getActivated(): any;
        /**
         * <p>重新读取可视化配置 并根据当前层级重新创建业务</p>
         * @returns <ul>
         * <li>是否刷新成功</li>
         * </ul>
         */
        function refresh(): Promise<boolean>;
        /**
         * <p>显示业务面板- 建议通过activate激活业务</p>
         * @param name - <p>业务名称</p>
         */
        function showPanel(name: string): void;
        /**
         * <p>隐藏业务面板 - 建议通过deactivate取消激活业务</p>
         * @param name - <p>业务名称</p>
         */
        function hidePanel(name: string): void;
        /**
         * <p>获取业务配置</p>
         * @param [level = THINGX.App.currentLevel] - <p>孪生体对象/孪生体分类</p>
         * @param [name=] - <p>业务名称，非空的话返回指定配置，否则返回所有配置</p>
         */
        function getConfig(level?: THING.BaseObject | THINGX.CONST.DEFAULT_DIGITAL_TWIN_CLASS, name=?: string): any | null;
        /**
         * <p>获取当前业务面板配置</p>
         */
        function getPanelConfig(): any | null;
        /**
         * <p>获取当前激活的业务名称</p>
         * @param [isFullName = false] - <p>是否获取业务全称</p>
         * @returns <ul>
         * <li>当前激活的业务名称/全称</li>
         * </ul>
         */
        function getCurrentName(isFullName?: boolean): string;
    }
    /**
     * <p>摄像机模块</p>
     */
    namespace Camera {
        /**
         * @property position - <p>摄相机位置</p>
         * @property target - <p>摄像机看点</p>
         */
        type Pose = {
            position: number[];
            target: number[];
        };
        /**
         * <p>飞到最佳视角查看孪生体</p>
         * @example
         * // 单个孪生体飞行
         * const currentLevel = THINGX.App.currentLevel;
         * cosnt pose = THINGX.Camera.getPoseWithDigitalTwin(currentLevel, {
         *     x: 30, y: 60, z: 1, tx: 0, ty: 0, tr: 0
         * });
         * THINGX.Camera.flyTo(currentLevel, {
         *     complete: (ev) => {
         *         console.log('飞行完毕')
         *     },
         *     pose: pose,
         *     time: 2000,
         * });
         *
         * // 孪生体集合飞行
         * let dir = THING.Math.scaleVector(THING.App.current.camera.direction, -1); // 默认方向向量
         * dir[0] += 1;
         * const pose = THINGX.Camera.getPoseWithDigitalTwinSet(THINGX.CONST.DEFAULT_DIGITAL_TWIN_CLASS.BUILDING, {
         *     useDir: dir,
         *     radiusScale: 1.5,
         * });
         * THINGX.Camera.flyTo(THINGX.CONST.DEFAULT_DIGITAL_TWIN_CLASS.BUILDING, {
         *     complete: (ev) => {
         *         console.log('飞行完毕')
         *     },
         *     pose: pose,
         *     time: 2000,
         * });
         * @param digitalTwin - <p>孪生体/孪生体集合/ThingJS查询表达式</p>
         * @param [config = {}] - <p>飞行指定配置</p>
         * @param [config.keepLevel = false] - <p>是否保持当前层级</p>
         * @param [config.complete] - <p>摄像机飞行完成回调函数</p>
         * @param [config.time] - <p>摄像机飞行时间，不传的话会根据摄像机姿势和孪生体对象计算一个最佳的飞行时间</p>
         * @param [config.pose] - <p>摄像机姿势，不传的话会计算最佳的摄像机姿势</p>
         */
        function flyTo(digitalTwin: THING.BaseObject | THING.BaseObject[] | string, config?: {
            keepLevel?: boolean;
            complete?: (...params: any[]) => any;
            time?: number;
            pose?: THINGX.Camera.Pose;
        }): void;
        /**
         * <p>通过孪生体获取摄像机姿势</p>
         * @example
         * const currentLevel = THINGX.App.currentLevel;
         * THINGX.Camera.getPoseWithDigitalTwin(currentLevel, {
         *     x: 30, y: 60, z: 1, tx: 0, ty: 0, tr: 0
         * });
         * @param digitalTwin - <p>孪生体</p>
         * @param [config = {}] - <p>飞到对象的参数，当digitalTwin为单个孪生体且opts.keepDir不为true时生效</p>
         * @param [config.x = 30] - <p>position yaw 摄像机位置沿x轴旋转角度</p>
         * @param [config.y = 45] - <p>position pitch 摄像机位置沿y轴旋转角度</p>
         * @param [config.z = 2] - <p>position radius factor 摄像机位置距离孪生体包围盒半径倍数，1是刚好看到飞到物体的整个包围盒</p>
         * @param [config.tx = 0] - <p>target yaw 摄像机看点沿x轴旋转角度</p>
         * @param [config.ty = 0] - <p>target pitch 摄像机看点沿y轴旋转角度</p>
         * @param [config.tr = 0] - <p>target radius factor 摄像机看点距离孪生体包围中心距离</p>
         * @param opts - <p>计算设置</p>
         * @param [opts.isRecursive = false] - <p>是否遍历子对象</p>
         * @param [opts.isForceReCalc = true] - <p>是否强制重新计算</p>
         */
        function getPoseWithDigitalTwin(digitalTwin: THING.BaseObject, config?: {
            x?: number;
            y?: number;
            z?: number;
            tx?: number;
            ty?: number;
            tr?: number;
        }, opts: {
            isRecursive?: boolean;
            isForceReCalc?: boolean;
        }): THINGX.Camera.Pose | null;
        /**
         * <p>通过孪生体集合获取摄像机姿势</p>
         * @example
         * let dir = THING.Math.scaleVector(THING.App.current.camera.direction, -1); // 默认方向向量
         * dir[0] += 1;
         * let pose = THINGX.Camera.getPoseWithDigitalTwinSet(THINGX.CONST.DEFAULT_DIGITAL_TWIN_CLASS.BUILDING, {
         *     useDir: dir,
         *     radiusScale: 1.5,
         * });
         * @param digitalTwin - <p>孪生体集合/ThingJS查询表达式</p>
         * @param [opts.isRecursive = false] - <p>是否遍历子对象</p>
         * @param [opts.radiusScale = 1] - <p>距离包围盒半径倍数，digitalTwin为孪生体集合时生效</p>
         * @param [opts.useDir = THING.App.current.camera.direction*-1] - <p>摄像机朝向，digitalTwin为孪生体集合时生效</p>
         */
        function getPoseWithDigitalTwinSet(digitalTwin: THING.BaseObject[] | string, opts: {
            isRecursive?: boolean;
            radiusScale?: number;
            useDir?: number[];
        }): THINGX.Camera.Pose | null;
        /**
         * <p>获取摄像机姿势 建议使用getPoseWithDigitalTwin和getPoseWithDigitalTwinSet获取摄像机姿势</p>
         * @param digitalTwin - <p>孪生体/孪生体集合/ThingJS查询表达式</p>
         * @param [flyToConfig = {}] - <p>飞到对象的参数，当digitalTwin为单个孪生体且opts.keepDir不为true时生效</p>
         * @param [flyToConfig.x = 30] - <p>position yaw 摄像机位置沿x轴旋转角度</p>
         * @param [flyToConfig.y = 45] - <p>position pitch 摄像机位置沿y轴旋转角度</p>
         * @param [flyToConfig.z = 2] - <p>position radius factor 摄像机位置距离孪生体包围盒半径倍数，1是刚好看到飞到物体的整个包围盒</p>
         * @param [flyToConfig.tx = 0] - <p>target yaw 摄像机看点沿x轴旋转角度</p>
         * @param [flyToConfig.ty = 0] - <p>target pitch 摄像机看点沿y轴旋转角度</p>
         * @param [flyToConfig.tr = 0] - <p>target radius factor 摄像机看点距离孪生体包围盒半径倍数</p>
         * @param [opts = {}] - <p>飞到最佳视角计算配置</p>
         * @param [opts.isForceReCalc = false] - <p>是否强制重新计算，当digitalTwin为单个孪生体生效</p>
         * @param [opts.isRecursive = false] - <p>是否遍历子对象</p>
         * @param [opts.radiusScale = 1] - <p>距离包围盒半径倍数，digitalTwin为孪生体集合时生效</p>
         * @param [opts.keepDir = false] - <p>保持当前朝向</p>
         * @param [opts.useDir = THING.App.current.camera.direction*-1] - <p>朝向vector3，digitalTwin为孪生体集合时生效</p>
         */
        function getPose(digitalTwin: THING.BaseObject | THING.BaseObject[] | string, flyToConfig?: {
            x?: number;
            y?: number;
            z?: number;
            tx?: number;
            ty?: number;
            tr?: number;
        }, opts?: {
            isForceReCalc?: boolean;
            isRecursive?: boolean;
            radiusScale?: number;
            keepDir?: boolean;
            useDir?: number[];
        }): THINGX.Camera.Pose | null;
        /**
         * <p>获取视点配置</p>
         */
        function getConfig(): any;
        /**
         * @property position - <p>摄相机位置</p>
         * @property target - <p>摄像机看点</p>
         */
        type Pose = {
            position: number[];
            target: number[];
        };
        /**
         * <p>飞到最佳视角查看孪生体</p>
         * @example
         * // 单个孪生体飞行
         * const currentLevel = THINGX.App.currentLevel;
         * cosnt pose = THINGX.Camera.getPoseWithDigitalTwin(currentLevel, {
         *     x: 30, y: 60, z: 1, tx: 0, ty: 0, tr: 0
         * });
         * THINGX.Camera.flyTo(currentLevel, {
         *     complete: (ev) => {
         *         console.log('飞行完毕')
         *     },
         *     pose: pose,
         *     time: 2000,
         * });
         *
         * // 孪生体集合飞行
         * let dir = THING.Math.scaleVector(THING.App.current.camera.direction, -1); // 默认方向向量
         * dir[0] += 1;
         * const pose = THINGX.Camera.getPoseWithDigitalTwinSet(THINGX.CONST.DEFAULT_DIGITAL_TWIN_CLASS.BUILDING, {
         *     useDir: dir,
         *     radiusScale: 1.5,
         * });
         * THINGX.Camera.flyTo(THINGX.CONST.DEFAULT_DIGITAL_TWIN_CLASS.BUILDING, {
         *     complete: (ev) => {
         *         console.log('飞行完毕')
         *     },
         *     pose: pose,
         *     time: 2000,
         * });
         * @param digitalTwin - <p>孪生体/孪生体集合/ThingJS查询表达式</p>
         * @param [config = {}] - <p>飞行指定配置</p>
         * @param [config.keepLevel = false] - <p>是否保持当前层级</p>
         * @param [config.complete] - <p>摄像机飞行完成回调函数</p>
         * @param [config.time] - <p>摄像机飞行时间，不传的话会根据摄像机姿势和孪生体对象计算一个最佳的飞行时间</p>
         * @param [config.pose] - <p>摄像机姿势，不传的话会计算最佳的摄像机姿势</p>
         */
        function flyTo(digitalTwin: THING.BaseObject | THING.BaseObject[] | string, config?: {
            keepLevel?: boolean;
            complete?: (...params: any[]) => any;
            time?: number;
            pose?: THINGX.Camera.Pose;
        }): void;
        /**
         * <p>通过孪生体获取摄像机姿势</p>
         * @example
         * const currentLevel = THINGX.App.currentLevel;
         * THINGX.Camera.getPoseWithDigitalTwin(currentLevel, {
         *     x: 30, y: 60, z: 1, tx: 0, ty: 0, tr: 0
         * });
         * @param digitalTwin - <p>孪生体</p>
         * @param [config = {}] - <p>飞到对象的参数，当digitalTwin为单个孪生体且opts.keepDir不为true时生效</p>
         * @param [config.x = 30] - <p>position yaw 摄像机位置沿x轴旋转角度</p>
         * @param [config.y = 45] - <p>position pitch 摄像机位置沿y轴旋转角度</p>
         * @param [config.z = 2] - <p>position radius factor 摄像机位置距离孪生体包围盒半径倍数，1是刚好看到飞到物体的整个包围盒</p>
         * @param [config.tx = 0] - <p>target yaw 摄像机看点沿x轴旋转角度</p>
         * @param [config.ty = 0] - <p>target pitch 摄像机看点沿y轴旋转角度</p>
         * @param [config.tr = 0] - <p>target radius factor 摄像机看点距离孪生体包围中心距离</p>
         * @param opts - <p>计算设置</p>
         * @param [opts.isRecursive = false] - <p>是否遍历子对象</p>
         * @param [opts.isForceReCalc = true] - <p>是否强制重新计算</p>
         */
        function getPoseWithDigitalTwin(digitalTwin: THING.BaseObject, config?: {
            x?: number;
            y?: number;
            z?: number;
            tx?: number;
            ty?: number;
            tr?: number;
        }, opts: {
            isRecursive?: boolean;
            isForceReCalc?: boolean;
        }): THINGX.Camera.Pose | null;
        /**
         * <p>通过孪生体集合获取摄像机姿势</p>
         * @example
         * let dir = THING.Math.scaleVector(THING.App.current.camera.direction, -1); // 默认方向向量
         * dir[0] += 1;
         * let pose = THINGX.Camera.getPoseWithDigitalTwinSet(THINGX.CONST.DEFAULT_DIGITAL_TWIN_CLASS.BUILDING, {
         *     useDir: dir,
         *     radiusScale: 1.5,
         * });
         * @param digitalTwin - <p>孪生体集合/ThingJS查询表达式</p>
         * @param [opts.isRecursive = false] - <p>是否遍历子对象</p>
         * @param [opts.radiusScale = 1] - <p>距离包围盒半径倍数，digitalTwin为孪生体集合时生效</p>
         * @param [opts.useDir = THING.App.current.camera.direction*-1] - <p>摄像机朝向，digitalTwin为孪生体集合时生效</p>
         */
        function getPoseWithDigitalTwinSet(digitalTwin: THING.BaseObject[] | string, opts: {
            isRecursive?: boolean;
            radiusScale?: number;
            useDir?: number[];
        }): THINGX.Camera.Pose | null;
        /**
         * <p>获取摄像机姿势 建议使用getPoseWithDigitalTwin和getPoseWithDigitalTwinSet获取摄像机姿势</p>
         * @param digitalTwin - <p>孪生体/孪生体集合/ThingJS查询表达式</p>
         * @param [flyToConfig = {}] - <p>飞到对象的参数，当digitalTwin为单个孪生体且opts.keepDir不为true时生效</p>
         * @param [flyToConfig.x = 30] - <p>position yaw 摄像机位置沿x轴旋转角度</p>
         * @param [flyToConfig.y = 45] - <p>position pitch 摄像机位置沿y轴旋转角度</p>
         * @param [flyToConfig.z = 2] - <p>position radius factor 摄像机位置距离孪生体包围盒半径倍数，1是刚好看到飞到物体的整个包围盒</p>
         * @param [flyToConfig.tx = 0] - <p>target yaw 摄像机看点沿x轴旋转角度</p>
         * @param [flyToConfig.ty = 0] - <p>target pitch 摄像机看点沿y轴旋转角度</p>
         * @param [flyToConfig.tr = 0] - <p>target radius factor 摄像机看点距离孪生体包围盒半径倍数</p>
         * @param [opts = {}] - <p>飞到最佳视角计算配置</p>
         * @param [opts.isForceReCalc = false] - <p>是否强制重新计算，当digitalTwin为单个孪生体生效</p>
         * @param [opts.isRecursive = false] - <p>是否遍历子对象</p>
         * @param [opts.radiusScale = 1] - <p>距离包围盒半径倍数，digitalTwin为孪生体集合时生效</p>
         * @param [opts.keepDir = false] - <p>保持当前朝向</p>
         * @param [opts.useDir = THING.App.current.camera.direction*-1] - <p>朝向vector3，digitalTwin为孪生体集合时生效</p>
         */
        function getPose(digitalTwin: THING.BaseObject | THING.BaseObject[] | string, flyToConfig?: {
            x?: number;
            y?: number;
            z?: number;
            tx?: number;
            ty?: number;
            tr?: number;
        }, opts?: {
            isForceReCalc?: boolean;
            isRecursive?: boolean;
            radiusScale?: number;
            keepDir?: boolean;
            useDir?: number[];
        }): THINGX.Camera.Pose | null;
        /**
         * <p>获取视点配置</p>
         */
        function getConfig(): any;
    }
    namespace CONST {
        /**
         * <p>默认孪生体分类</p>
         */
        enum DEFAULT_DIGITAL_TWIN_CLASS {
            /**
             * <p>园区</p>
             */
            CAMPUS = ".Campus",
            /**
             * <p>建筑</p>
             */
            BUILDING = ".Building",
            /**
             * <p>楼层</p>
             */
            FLOOR = ".Floor",
            /**
             * <p>房间</p>
             */
            ROOM = ".Room",
            /**
             * <p>地图</p>
             */
            GEO_CAMPUS = ".GeoCampus"
        }
        /**
         * <p>插件类型</p>
         */
        enum PLUGIN_TYPE {
            /**
             * <p>操作原子插件</p>
             */
            ACTION = "action",
            /**
             * <p>图表</p>
             */
            CHART = "chart",
            /**
             * <p>核心插件</p>
             */
            CORE = "core",
            /**
             * <p>扩展插件</p>
             */
            EXPAND = "expand",
            /**
             * <p>效果模版</p>
             */
            THEME = "theme"
        }
        /**
         * <p>加载javascript脚本类型</p>
         */
        enum JS_LOAD_TYPE {
            /**
             * <p>通过script标签加载</p>
             */
            TAG = "tag",
            /**
             * <p>以动态执行加载的脚本内容方式加载</p>
             */
            EXEC = "exec"
        }
        /**
         * <p>javascript资源类型</p>
         */
        enum JS_SRC_TYPE {
            /**
             * <p>url路径方式</p>
             */
            URL = "url",
            /**
             * <p>源脚本方式</p>
             */
            CONTENT = "content"
        }
        /**
         * <p>默认孪生体分类</p>
         */
        enum DEFAULT_DIGITAL_TWIN_CLASS {
            /**
             * <p>园区</p>
             */
            CAMPUS = ".Campus",
            /**
             * <p>建筑</p>
             */
            BUILDING = ".Building",
            /**
             * <p>楼层</p>
             */
            FLOOR = ".Floor",
            /**
             * <p>房间</p>
             */
            ROOM = ".Room",
            /**
             * <p>地图</p>
             */
            GEO_CAMPUS = ".GeoCampus"
        }
        /**
         * <p>插件类型</p>
         */
        enum PLUGIN_TYPE {
            /**
             * <p>操作原子插件</p>
             */
            ACTION = "action",
            /**
             * <p>图表</p>
             */
            CHART = "chart",
            /**
             * <p>核心插件</p>
             */
            CORE = "core",
            /**
             * <p>扩展插件</p>
             */
            EXPAND = "expand",
            /**
             * <p>效果模版</p>
             */
            THEME = "theme"
        }
        /**
         * <p>加载javascript脚本类型</p>
         */
        enum JS_LOAD_TYPE {
            /**
             * <p>通过script标签加载</p>
             */
            TAG = "tag",
            /**
             * <p>以动态执行加载的脚本内容方式加载</p>
             */
            EXEC = "exec"
        }
        /**
         * <p>javascript资源类型</p>
         */
        enum JS_SRC_TYPE {
            /**
             * <p>url路径方式</p>
             */
            URL = "url",
            /**
             * <p>源脚本方式</p>
             */
            CONTENT = "content"
        }
    }
    /**
     * <p>数据辅助模块</p>
     */
    namespace DataHelper {
        /**
         * <p>数组模块</p>
         */
        namespace Array {
            /**
             * <p>在数组末尾追加元素</p>
             * @param array - <p>目标数组</p>
             * @param val - <p>待增加的元素</p>
             * @param [isForce = false] - <p>是否强制增加，强制则不判断数组中是否已经存在</p>
             * @returns <ul>
             * <li>增加元素或已存在元素的索引</li>
             * </ul>
             */
            function push(array: any[], val: any, isForce?: boolean): number;
            /**
             * <p>根据索引数组删除数组元素</p>
             * @param array - <p>数组</p>
             * @param indexArray - <p>序列数组</p>
             */
            function removeWithIndexArray(array: any[], indexArray: number[]): any[];
            /**
             * <p>在数组中去除重复项，稳定的（保留第一个）</p>
             * @param array - <p>原始数组</p>
             * @returns <ul>
             * <li>删除了重复项的数组</li>
             * </ul>
             */
            function unique(array: any[]): any[];
            /**
             * <p>根据keys值，构造新数组只包含keys中包含的key</p>
             * @param array - <p>源数组</p>
             * @param keys - <p>要取的键值数组</p>
             * @param [isAllowNull = false] - <p>是否允许值为空，默认不允许</p>
             * @returns <p>[{key1:XX,key2:XX},{key1:XX,key2:XX}]</p>
             */
            function getWithKeys(array: any[], keys: string[], isAllowNull?: boolean): any[];
            /**
             * <p>删除数组中array1中存在与数值array2中相同的元素</p>
             * @param array1 - <p>原始数组</p>
             * @param array2 - <p>校样数组</p>
             * @returns <p>返回新数组</p>
             */
            function subtract(array1: any[], array2: any[]): any[];
            /**
             * <p>在数组末尾追加元素</p>
             * @param array - <p>目标数组</p>
             * @param val - <p>待增加的元素</p>
             * @param [isForce = false] - <p>是否强制增加，强制则不判断数组中是否已经存在</p>
             * @returns <ul>
             * <li>增加元素或已存在元素的索引</li>
             * </ul>
             */
            function push(array: any[], val: any, isForce?: boolean): number;
            /**
             * <p>根据索引数组删除数组元素</p>
             * @param array - <p>数组</p>
             * @param indexArray - <p>序列数组</p>
             */
            function removeWithIndexArray(array: any[], indexArray: number[]): any[];
            /**
             * <p>在数组中去除重复项，稳定的（保留第一个）</p>
             * @param array - <p>原始数组</p>
             * @returns <ul>
             * <li>删除了重复项的数组</li>
             * </ul>
             */
            function unique(array: any[]): any[];
            /**
             * <p>根据keys值，构造新数组只包含keys中包含的key</p>
             * @param array - <p>源数组</p>
             * @param keys - <p>要取的键值数组</p>
             * @param [isAllowNull = false] - <p>是否允许值为空，默认不允许</p>
             * @returns <p>[{key1:XX,key2:XX},{key1:XX,key2:XX}]</p>
             */
            function getWithKeys(array: any[], keys: string[], isAllowNull?: boolean): any[];
            /**
             * <p>删除数组中array1中存在与数值array2中相同的元素</p>
             * @param array1 - <p>原始数组</p>
             * @param array2 - <p>校样数组</p>
             * @returns <p>返回新数组</p>
             */
            function subtract(array1: any[], array2: any[]): any[];
        }
        /**
         * <p>对象模块</p>
         */
        namespace Object {
            /**
             * <p>合并两个对象</p>
             * @param srcObj - <p>源对象</p>
             * @param destObj - <p>目标对象</p>
             * @param [isDeep = true] - <p>是否深拷贝</p>
             * @param [isNew = false] - <p>是否返回新对象，否则影响源对象</p>
             * @returns <ul>
             * <li>合并后的对象</li>
             * </ul>
             */
            function merge(srcObj: any, destObj: any, isDeep?: boolean, isNew?: boolean): any;
            /**
             * <p>拷贝对象</p>
             * @example
             * const myclone = THINGX.Utils.clone(obj);
             * @param obj - <p>需要被拷贝的对象</p>
             * @param [isDeep = true] - <p>是否深拷贝</p>
             * @param [endCheck = () => {return false;}] - <p>停止拷贝的条件函数</p>
             */
            function clone(obj: any, isDeep?: boolean, endCheck?: (...params: any[]) => any): any;
            /**
             * <p>获取对象第一个key</p>
             * @param obj - <p>对象</p>
             */
            function getFirstKey(obj: any): any;
            /**
             * <p>获取对象第一个值</p>
             * @param obj - <p>对象</p>
             */
            function getFirstValue(obj: any): any;
            /**
             * <p>对象是否为空</p>
             * @param obj - <p>对象</p>
             */
            function isEmpty(obj: any): boolean;
            /**
             * <p>从obj1中删除obj2中已有的元素</p>
             * @param obj1 - <p>对象1</p>
             * @param obj2 - <p>对象2</p>
             * @param [isCheckVal = false] - <p>是否对比元素值一样</p>
             * @returns <ul>
             * <li>新对象，obj1的子集</li>
             * </ul>
             */
            function subtract(obj1: any, obj2: any, isCheckVal?: boolean): any;
            /**
             * <p>合并两个对象</p>
             * @param srcObj - <p>源对象</p>
             * @param destObj - <p>目标对象</p>
             * @param [isDeep = true] - <p>是否深拷贝</p>
             * @param [isNew = false] - <p>是否返回新对象，否则影响源对象</p>
             * @returns <ul>
             * <li>合并后的对象</li>
             * </ul>
             */
            function merge(srcObj: any, destObj: any, isDeep?: boolean, isNew?: boolean): any;
            /**
             * <p>拷贝对象</p>
             * @example
             * const myclone = THINGX.Utils.clone(obj);
             * @param obj - <p>需要被拷贝的对象</p>
             * @param [isDeep = true] - <p>是否深拷贝</p>
             * @param [endCheck = () => {return false;}] - <p>停止拷贝的条件函数</p>
             */
            function clone(obj: any, isDeep?: boolean, endCheck?: (...params: any[]) => any): any;
            /**
             * <p>获取对象第一个key</p>
             * @param obj - <p>对象</p>
             */
            function getFirstKey(obj: any): any;
            /**
             * <p>获取对象第一个值</p>
             * @param obj - <p>对象</p>
             */
            function getFirstValue(obj: any): any;
            /**
             * <p>对象是否为空</p>
             * @param obj - <p>对象</p>
             */
            function isEmpty(obj: any): boolean;
            /**
             * <p>从obj1中删除obj2中已有的元素</p>
             * @param obj1 - <p>对象1</p>
             * @param obj2 - <p>对象2</p>
             * @param [isCheckVal = false] - <p>是否对比元素值一样</p>
             * @returns <ul>
             * <li>新对象，obj1的子集</li>
             * </ul>
             */
            function subtract(obj1: any, obj2: any, isCheckVal?: boolean): any;
        }
        /**
         * <p>字符串模块</p>
         */
        namespace String { }
        /**
         * <p>字符串模块</p>
         */
        namespace Time {
            /**
             * <p>延时某段时间，只执行最后一次
             * 类似于requestAnimationFrame</p>
             * @param fn - <p>执行函数</p>
             */
            function delay(fn: any, _a: any): void;
            /**
             * <p>延时某段时间，只执行最后一次
             * 类似于requestAnimationFrame</p>
             * @param fn - <p>执行函数</p>
             */
            function delay(fn: any, _a: any): void;
        }
        /**
         * <p>vector3向量模块</p>
         */
        namespace Vector {
            /**
             * <p>两个向量加</p>
             * @param vec1 - <p>向量1</p>
             * @param vec2 - <p>向量2</p>
             */
            function add(vec1: number[], vec2: number[]): number[];
            /**
             * <p>向量与数值相乘</p>
             * @param vec - <p>向量</p>
             * @param num - <p>数值</p>
             */
            function multiplyNumber(vec: number[], num: number): number[];
            /**
             * <p>两个向量相减, vec1 - vec2</p>
             * @param vec1 - <p>向量1</p>
             * @param vec2 - <p>向量2</p>
             */
            function subtract(vec1: number[], vec2: number[]): number[];
            /**
             * <p>向量标准化</p>
             * @param vec - <p>向量</p>
             */
            function normalize(vec: number[]): number[];
            /**
             * <p>获取向量长度</p>
             * @param vec - <p>向量</p>
             */
            function length(vec: number[]): number;
            /**
             * <p>获取两个向量之间的距离</p>
             * @param vec1 - <p>向量1</p>
             * @param vec2 - <p>向量2</p>
             */
            function distance(vec1: number[], vec2: number[]): number;
            /**
             * <p>两个向量加</p>
             * @param vec1 - <p>向量1</p>
             * @param vec2 - <p>向量2</p>
             */
            function add(vec1: number[], vec2: number[]): number[];
            /**
             * <p>向量与数值相乘</p>
             * @param vec - <p>向量</p>
             * @param num - <p>数值</p>
             */
            function multiplyNumber(vec: number[], num: number): number[];
            /**
             * <p>两个向量相减, vec1 - vec2</p>
             * @param vec1 - <p>向量1</p>
             * @param vec2 - <p>向量2</p>
             */
            function subtract(vec1: number[], vec2: number[]): number[];
            /**
             * <p>向量标准化</p>
             * @param vec - <p>向量</p>
             */
            function normalize(vec: number[]): number[];
            /**
             * <p>获取向量长度</p>
             * @param vec - <p>向量</p>
             */
            function length(vec: number[]): number;
            /**
             * <p>获取两个向量之间的距离</p>
             * @param vec1 - <p>向量1</p>
             * @param vec2 - <p>向量2</p>
             */
            function distance(vec1: number[], vec2: number[]): number;
        }
        /**
         * <p>数组模块</p>
         */
        namespace Array {
            /**
             * <p>在数组末尾追加元素</p>
             * @param array - <p>目标数组</p>
             * @param val - <p>待增加的元素</p>
             * @param [isForce = false] - <p>是否强制增加，强制则不判断数组中是否已经存在</p>
             * @returns <ul>
             * <li>增加元素或已存在元素的索引</li>
             * </ul>
             */
            function push(array: any[], val: any, isForce?: boolean): number;
            /**
             * <p>根据索引数组删除数组元素</p>
             * @param array - <p>数组</p>
             * @param indexArray - <p>序列数组</p>
             */
            function removeWithIndexArray(array: any[], indexArray: number[]): any[];
            /**
             * <p>在数组中去除重复项，稳定的（保留第一个）</p>
             * @param array - <p>原始数组</p>
             * @returns <ul>
             * <li>删除了重复项的数组</li>
             * </ul>
             */
            function unique(array: any[]): any[];
            /**
             * <p>根据keys值，构造新数组只包含keys中包含的key</p>
             * @param array - <p>源数组</p>
             * @param keys - <p>要取的键值数组</p>
             * @param [isAllowNull = false] - <p>是否允许值为空，默认不允许</p>
             * @returns <p>[{key1:XX,key2:XX},{key1:XX,key2:XX}]</p>
             */
            function getWithKeys(array: any[], keys: string[], isAllowNull?: boolean): any[];
            /**
             * <p>删除数组中array1中存在与数值array2中相同的元素</p>
             * @param array1 - <p>原始数组</p>
             * @param array2 - <p>校样数组</p>
             * @returns <p>返回新数组</p>
             */
            function subtract(array1: any[], array2: any[]): any[];
            /**
             * <p>在数组末尾追加元素</p>
             * @param array - <p>目标数组</p>
             * @param val - <p>待增加的元素</p>
             * @param [isForce = false] - <p>是否强制增加，强制则不判断数组中是否已经存在</p>
             * @returns <ul>
             * <li>增加元素或已存在元素的索引</li>
             * </ul>
             */
            function push(array: any[], val: any, isForce?: boolean): number;
            /**
             * <p>根据索引数组删除数组元素</p>
             * @param array - <p>数组</p>
             * @param indexArray - <p>序列数组</p>
             */
            function removeWithIndexArray(array: any[], indexArray: number[]): any[];
            /**
             * <p>在数组中去除重复项，稳定的（保留第一个）</p>
             * @param array - <p>原始数组</p>
             * @returns <ul>
             * <li>删除了重复项的数组</li>
             * </ul>
             */
            function unique(array: any[]): any[];
            /**
             * <p>根据keys值，构造新数组只包含keys中包含的key</p>
             * @param array - <p>源数组</p>
             * @param keys - <p>要取的键值数组</p>
             * @param [isAllowNull = false] - <p>是否允许值为空，默认不允许</p>
             * @returns <p>[{key1:XX,key2:XX},{key1:XX,key2:XX}]</p>
             */
            function getWithKeys(array: any[], keys: string[], isAllowNull?: boolean): any[];
            /**
             * <p>删除数组中array1中存在与数值array2中相同的元素</p>
             * @param array1 - <p>原始数组</p>
             * @param array2 - <p>校样数组</p>
             * @returns <p>返回新数组</p>
             */
            function subtract(array1: any[], array2: any[]): any[];
        }
        /**
         * <p>对象模块</p>
         */
        namespace Object {
            /**
             * <p>合并两个对象</p>
             * @param srcObj - <p>源对象</p>
             * @param destObj - <p>目标对象</p>
             * @param [isDeep = true] - <p>是否深拷贝</p>
             * @param [isNew = false] - <p>是否返回新对象，否则影响源对象</p>
             * @returns <ul>
             * <li>合并后的对象</li>
             * </ul>
             */
            function merge(srcObj: any, destObj: any, isDeep?: boolean, isNew?: boolean): any;
            /**
             * <p>拷贝对象</p>
             * @example
             * const myclone = THINGX.Utils.clone(obj);
             * @param obj - <p>需要被拷贝的对象</p>
             * @param [isDeep = true] - <p>是否深拷贝</p>
             * @param [endCheck = () => {return false;}] - <p>停止拷贝的条件函数</p>
             */
            function clone(obj: any, isDeep?: boolean, endCheck?: (...params: any[]) => any): any;
            /**
             * <p>获取对象第一个key</p>
             * @param obj - <p>对象</p>
             */
            function getFirstKey(obj: any): any;
            /**
             * <p>获取对象第一个值</p>
             * @param obj - <p>对象</p>
             */
            function getFirstValue(obj: any): any;
            /**
             * <p>对象是否为空</p>
             * @param obj - <p>对象</p>
             */
            function isEmpty(obj: any): boolean;
            /**
             * <p>从obj1中删除obj2中已有的元素</p>
             * @param obj1 - <p>对象1</p>
             * @param obj2 - <p>对象2</p>
             * @param [isCheckVal = false] - <p>是否对比元素值一样</p>
             * @returns <ul>
             * <li>新对象，obj1的子集</li>
             * </ul>
             */
            function subtract(obj1: any, obj2: any, isCheckVal?: boolean): any;
            /**
             * <p>合并两个对象</p>
             * @param srcObj - <p>源对象</p>
             * @param destObj - <p>目标对象</p>
             * @param [isDeep = true] - <p>是否深拷贝</p>
             * @param [isNew = false] - <p>是否返回新对象，否则影响源对象</p>
             * @returns <ul>
             * <li>合并后的对象</li>
             * </ul>
             */
            function merge(srcObj: any, destObj: any, isDeep?: boolean, isNew?: boolean): any;
            /**
             * <p>拷贝对象</p>
             * @example
             * const myclone = THINGX.Utils.clone(obj);
             * @param obj - <p>需要被拷贝的对象</p>
             * @param [isDeep = true] - <p>是否深拷贝</p>
             * @param [endCheck = () => {return false;}] - <p>停止拷贝的条件函数</p>
             */
            function clone(obj: any, isDeep?: boolean, endCheck?: (...params: any[]) => any): any;
            /**
             * <p>获取对象第一个key</p>
             * @param obj - <p>对象</p>
             */
            function getFirstKey(obj: any): any;
            /**
             * <p>获取对象第一个值</p>
             * @param obj - <p>对象</p>
             */
            function getFirstValue(obj: any): any;
            /**
             * <p>对象是否为空</p>
             * @param obj - <p>对象</p>
             */
            function isEmpty(obj: any): boolean;
            /**
             * <p>从obj1中删除obj2中已有的元素</p>
             * @param obj1 - <p>对象1</p>
             * @param obj2 - <p>对象2</p>
             * @param [isCheckVal = false] - <p>是否对比元素值一样</p>
             * @returns <ul>
             * <li>新对象，obj1的子集</li>
             * </ul>
             */
            function subtract(obj1: any, obj2: any, isCheckVal?: boolean): any;
        }
        /**
         * <p>字符串模块</p>
         */
        namespace String { }
        /**
         * <p>字符串模块</p>
         */
        namespace Time {
            /**
             * <p>延时某段时间，只执行最后一次
             * 类似于requestAnimationFrame</p>
             * @param fn - <p>执行函数</p>
             */
            function delay(fn: any, _a: any): void;
            /**
             * <p>延时某段时间，只执行最后一次
             * 类似于requestAnimationFrame</p>
             * @param fn - <p>执行函数</p>
             */
            function delay(fn: any, _a: any): void;
        }
        /**
         * <p>vector3向量模块</p>
         */
        namespace Vector {
            /**
             * <p>两个向量加</p>
             * @param vec1 - <p>向量1</p>
             * @param vec2 - <p>向量2</p>
             */
            function add(vec1: number[], vec2: number[]): number[];
            /**
             * <p>向量与数值相乘</p>
             * @param vec - <p>向量</p>
             * @param num - <p>数值</p>
             */
            function multiplyNumber(vec: number[], num: number): number[];
            /**
             * <p>两个向量相减, vec1 - vec2</p>
             * @param vec1 - <p>向量1</p>
             * @param vec2 - <p>向量2</p>
             */
            function subtract(vec1: number[], vec2: number[]): number[];
            /**
             * <p>向量标准化</p>
             * @param vec - <p>向量</p>
             */
            function normalize(vec: number[]): number[];
            /**
             * <p>获取向量长度</p>
             * @param vec - <p>向量</p>
             */
            function length(vec: number[]): number;
            /**
             * <p>获取两个向量之间的距离</p>
             * @param vec1 - <p>向量1</p>
             * @param vec2 - <p>向量2</p>
             */
            function distance(vec1: number[], vec2: number[]): number;
            /**
             * <p>两个向量加</p>
             * @param vec1 - <p>向量1</p>
             * @param vec2 - <p>向量2</p>
             */
            function add(vec1: number[], vec2: number[]): number[];
            /**
             * <p>向量与数值相乘</p>
             * @param vec - <p>向量</p>
             * @param num - <p>数值</p>
             */
            function multiplyNumber(vec: number[], num: number): number[];
            /**
             * <p>两个向量相减, vec1 - vec2</p>
             * @param vec1 - <p>向量1</p>
             * @param vec2 - <p>向量2</p>
             */
            function subtract(vec1: number[], vec2: number[]): number[];
            /**
             * <p>向量标准化</p>
             * @param vec - <p>向量</p>
             */
            function normalize(vec: number[]): number[];
            /**
             * <p>获取向量长度</p>
             * @param vec - <p>向量</p>
             */
            function length(vec: number[]): number;
            /**
             * <p>获取两个向量之间的距离</p>
             * @param vec1 - <p>向量1</p>
             * @param vec2 - <p>向量2</p>
             */
            function distance(vec1: number[], vec2: number[]): number;
        }
    }
    /**
     * <p>孪生体模块</p>
     */
    namespace DigitalTwin {
        /**
         * <p>显示孪生体</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param [purpose = default] - <p>目的</p>
         * @returns <ul>
         * <li>执行过操作的孪生体集合</li>
         * </ul>
         */
        function show(digitalTwin: THING.BaseObject | string, purpose?: string): THING.BaseObject[];
        /**
         * <p>隐藏孪生体</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param [purpose = default] - <p>目的</p>
         * @returns <ul>
         * <li>执行过操作的孪生体集合</li>
         * </ul>
         */
        function hide(digitalTwin: THING.BaseObject | string, purpose?: string): THING.BaseObject[];
        /**
         * <p>判断孪生体是否带有某个显示目的</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param [purpose = default] - <p>目的</p>
         * @returns <ul>
         * <li>如果多个孪生体 则所有孪生体都包含显示目的才返回true</li>
         * </ul>
         */
        function hasShowPurpose(digitalTwin: THING.BaseObject | string, purpose?: string): boolean;
        /**
         * <p>平滑显示孪生体</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param opts - <p>缓动效果</p>
         * @param opts.lerpType - <p>淡入动画效果 默认Quartic.In</p>
         * @param opts.time - <p>动画时间 默认500ms</p>
         * @param opts.purpose - <p>显示目的</p>
         * @returns <ul>
         * <li>动画完成,孪生体集合</li>
         * </ul>
         */
        function showWithSmoothAnimation(digitalTwin: THING.BaseObject | string, opts: {
            lerpType: string;
            time: number;
            purpose: string;
        }): Promise<THING.BaseObject[]>;
        /**
         * <p>平滑隐藏孪生体</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param opts - <p>缓动效果</p>
         * @param opts.lerpType - <p>淡入动画效果 默认Quartic.Out</p>
         * @param opts.time - <p>动画时间 默认500ms</p>
         * @param opts.purpose - <p>隐藏目的</p>
         * @returns <ul>
         * <li>动画完成,孪生体集合</li>
         * </ul>
         */
        function hideWithSmoothAnimation(digitalTwin: THING.BaseObject | string, opts: {
            lerpType: string;
            time: number;
            purpose: string;
        }): Promise<THING.BaseObject[]>;
        /**
         * <p>添加孪生体颜色到栈中</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param purpose - <p>变色的目的（用于取消该次变色）</p>
         * @param color - <p>十六进制颜色字符串 如'#ff0000'</p>
         * @param [priority = 0] - <p>颜色设置的优先级</p>
         * @param [traverse = false] - <p>是否遍历子元素</p>
         * @param [intensity = 0.7] - <p>颜色强度，越高变色越明显</p>
         * @returns <ul>
         * <li>执行过操作的孪生体集合</li>
         * </ul>
         */
        function addColor(digitalTwin: THING.BaseObject | string, purpose: string, color: string, priority?: number, traverse?: boolean, intensity?: number): THING.BaseObject[];
        /**
         * <p>从孪生体颜色栈中移除指定颜色</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param purpose - <p>变色目的</p>
         * @param traverse - <p>是否遍历子元素</p>
         * @returns <ul>
         * <li>执行过操作的孪生体集合</li>
         * </ul>
         */
        function removeColor(digitalTwin: THING.BaseObject | string, purpose: string, traverse: boolean): THING.BaseObject[];
        /**
         * <p>添加孪生体透明到栈中</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param purpose - <p>透明的目的（用于取消该次透明）</p>
         * @param opacity - <p>透明度</p>
         * @param [priority = 0] - <p>透明设置的优先级</p>
         * @param [traverse = false] - <p>是否遍历子元素</p>
         * @param [ignoreTag = [inheritOpacity]] - <p>忽略的标签</p>
         * @returns <ul>
         * <li>执行过操作的孪生体集合</li>
         * </ul>
         */
        function addOpacity(digitalTwin: THING.BaseObject | string, purpose: string, opacity: number, priority?: number, traverse?: boolean, ignoreTag?: string): THING.BaseObject[];
        /**
         * <p>从孪生体透明栈中移除指定目的的透明</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param purpose - <p>透明目的</p>
         * @param [traverse = false] - <p>是否遍历子元素</p>
         * @param [ignoreTag = [inheritOpacity]] - <p>忽略的标签</p>
         * @returns <ul>
         * <li>执行过操作的孪生体集合</li>
         * </ul>
         */
        function removeOpacity(digitalTwin: THING.BaseObject | string, purpose: string, traverse?: boolean, ignoreTag?: string): THING.BaseObject[];
        /**
         * <p>显示孪生体面板</p>
         * @param [digitalTwin = THINGX.App.currentSelected] - <p>孪生体对象，默认值是当前选择的孪生体中的第一个</p>
         * @param [config = {}] - <p>显示位置配置</p>
         * @param config.popup - <p>面板类型 custom</p>
         * @param config.top - <p>距上偏移</p>
         * @param config.left - <p>距左偏移</p>
         */
        function showPanel(digitalTwin?: THING.BaseObject, config?: {
            popup: string;
            top: number;
            left: number;
        }, isShowed?: boolena): void;
        /**
         * <p>隐藏当前显示的孪生体面板</p>
         */
        function hidePanel(): void;
        /**
         * <p>激活当前孪生体面板上的tab</p>
         * @param name - <p>tab名称</p>
         */
        function activateTabOnPanel(name: string): void;
        /**
         * <p>获取当前在孪生体面板上激活的tab</p>
         * @returns <ul>
         * <li>tab名称，失败返回false</li>
         * </ul>
         */
        function getActivatedTabOnPanel(): string | boolean;
        /**
         * <p>重新读取孪生体面板可视化配置</p>
         */
        function refresh(): void;
        /**
         * <p>获取孪生体指定面板名称配置</p>
         * @param digitalTwin - <p>孪生体对象</p>
         * @param name - <p>面板名称</p>
         */
        function getPanelConfig(digitalTwin: THING.BaseObject, name: string): any;
        /**
         * <p>通过ci数据创建孪生体</p>
         * @param ciData - <p>孪生体ci数据</p>
         * @param [onlyEmptyNode = true] - <p>true:只创建空点,不加载模型; false:加载模型</p>
         */
        function createByCIData(ciData: any, options?: any, onlyEmptyNode?: boolean): Promise<THING.BaseObject>;
        /**
         * @param dtwins - <p>孪生体或孪生体组成的数组</p>
         * @param [Category = []] - <p>分类</p>
         * @param [queryChildren = false] - <p>false:获取Ci 不包含孩子</p>
         */
        function getCategoryCIData(dtwins: any | any[], Category?: any, queryChildren?: boolean): void;
        /**
         * @param dtwin - <p>孪生体或孪生体组成的数组</p>
         */
        function initializeCIData(dtwin: any): void;
        /**
         * <p>显示孪生体</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param [purpose = default] - <p>目的</p>
         * @returns <ul>
         * <li>执行过操作的孪生体集合</li>
         * </ul>
         */
        function show(digitalTwin: THING.BaseObject | string, purpose?: string): THING.BaseObject[];
        /**
         * <p>隐藏孪生体</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param [purpose = default] - <p>目的</p>
         * @returns <ul>
         * <li>执行过操作的孪生体集合</li>
         * </ul>
         */
        function hide(digitalTwin: THING.BaseObject | string, purpose?: string): THING.BaseObject[];
        /**
         * <p>判断孪生体是否带有某个显示目的</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param [purpose = default] - <p>目的</p>
         * @returns <ul>
         * <li>如果多个孪生体 则所有孪生体都包含显示目的才返回true</li>
         * </ul>
         */
        function hasShowPurpose(digitalTwin: THING.BaseObject | string, purpose?: string): boolean;
        /**
         * <p>平滑显示孪生体</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param opts - <p>缓动效果</p>
         * @param opts.lerpType - <p>淡入动画效果 默认Quartic.In</p>
         * @param opts.time - <p>动画时间 默认500ms</p>
         * @param opts.purpose - <p>显示目的</p>
         * @returns <ul>
         * <li>动画完成,孪生体集合</li>
         * </ul>
         */
        function showWithSmoothAnimation(digitalTwin: THING.BaseObject | string, opts: {
            lerpType: string;
            time: number;
            purpose: string;
        }): Promise<THING.BaseObject[]>;
        /**
         * <p>平滑隐藏孪生体</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param opts - <p>缓动效果</p>
         * @param opts.lerpType - <p>淡入动画效果 默认Quartic.Out</p>
         * @param opts.time - <p>动画时间 默认500ms</p>
         * @param opts.purpose - <p>隐藏目的</p>
         * @returns <ul>
         * <li>动画完成,孪生体集合</li>
         * </ul>
         */
        function hideWithSmoothAnimation(digitalTwin: THING.BaseObject | string, opts: {
            lerpType: string;
            time: number;
            purpose: string;
        }): Promise<THING.BaseObject[]>;
        /**
         * <p>添加孪生体颜色到栈中</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param purpose - <p>变色的目的（用于取消该次变色）</p>
         * @param color - <p>十六进制颜色字符串 如'#ff0000'</p>
         * @param [priority = 0] - <p>颜色设置的优先级</p>
         * @param [traverse = false] - <p>是否遍历子元素</p>
         * @param [intensity = 0.7] - <p>颜色强度，越高变色越明显</p>
         * @returns <ul>
         * <li>执行过操作的孪生体集合</li>
         * </ul>
         */
        function addColor(digitalTwin: THING.BaseObject | string, purpose: string, color: string, priority?: number, traverse?: boolean, intensity?: number): THING.BaseObject[];
        /**
         * <p>从孪生体颜色栈中移除指定颜色</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param purpose - <p>变色目的</p>
         * @param traverse - <p>是否遍历子元素</p>
         * @returns <ul>
         * <li>执行过操作的孪生体集合</li>
         * </ul>
         */
        function removeColor(digitalTwin: THING.BaseObject | string, purpose: string, traverse: boolean): THING.BaseObject[];
        /**
         * <p>添加孪生体透明到栈中</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param purpose - <p>透明的目的（用于取消该次透明）</p>
         * @param opacity - <p>透明度</p>
         * @param [priority = 0] - <p>透明设置的优先级</p>
         * @param [traverse = false] - <p>是否遍历子元素</p>
         * @param [ignoreTag = [inheritOpacity]] - <p>忽略的标签</p>
         * @returns <ul>
         * <li>执行过操作的孪生体集合</li>
         * </ul>
         */
        function addOpacity(digitalTwin: THING.BaseObject | string, purpose: string, opacity: number, priority?: number, traverse?: boolean, ignoreTag?: string): THING.BaseObject[];
        /**
         * <p>从孪生体透明栈中移除指定目的的透明</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param purpose - <p>透明目的</p>
         * @param [traverse = false] - <p>是否遍历子元素</p>
         * @param [ignoreTag = [inheritOpacity]] - <p>忽略的标签</p>
         * @returns <ul>
         * <li>执行过操作的孪生体集合</li>
         * </ul>
         */
        function removeOpacity(digitalTwin: THING.BaseObject | string, purpose: string, traverse?: boolean, ignoreTag?: string): THING.BaseObject[];
        /**
         * <p>显示孪生体面板</p>
         * @param [digitalTwin = THINGX.App.currentSelected] - <p>孪生体对象，默认值是当前选择的孪生体中的第一个</p>
         * @param [config = {}] - <p>显示位置配置</p>
         * @param config.popup - <p>面板类型 custom</p>
         * @param config.top - <p>距上偏移</p>
         * @param config.left - <p>距左偏移</p>
         */
        function showPanel(digitalTwin?: THING.BaseObject, config?: {
            popup: string;
            top: number;
            left: number;
        }, isShowed?: boolena): void;
        /**
         * <p>隐藏当前显示的孪生体面板</p>
         */
        function hidePanel(): void;
        /**
         * <p>激活当前孪生体面板上的tab</p>
         * @param name - <p>tab名称</p>
         */
        function activateTabOnPanel(name: string): void;
        /**
         * <p>获取当前在孪生体面板上激活的tab</p>
         * @returns <ul>
         * <li>tab名称，失败返回false</li>
         * </ul>
         */
        function getActivatedTabOnPanel(): string | boolean;
        /**
         * <p>重新读取孪生体面板可视化配置</p>
         */
        function refresh(): void;
        /**
         * <p>获取孪生体指定面板名称配置</p>
         * @param digitalTwin - <p>孪生体对象</p>
         * @param name - <p>面板名称</p>
         */
        function getPanelConfig(digitalTwin: THING.BaseObject, name: string): any;
        /**
         * <p>通过ci数据创建孪生体</p>
         * @param ciData - <p>孪生体ci数据</p>
         * @param [onlyEmptyNode = true] - <p>true:只创建空点,不加载模型; false:加载模型</p>
         */
        function createByCIData(ciData: any, options?: any, onlyEmptyNode?: boolean): Promise<THING.BaseObject>;
        /**
         * @param dtwins - <p>孪生体或孪生体组成的数组</p>
         * @param [Category = []] - <p>分类</p>
         * @param [queryChildren = false] - <p>false:获取Ci 不包含孩子</p>
         */
        function getCategoryCIData(dtwins: any | any[], Category?: any, queryChildren?: boolean): void;
        /**
         * @param dtwin - <p>孪生体或孪生体组成的数组</p>
         */
        function initializeCIData(dtwin: any): void;
    }
    /**
     * <p>Http请求模块</p>
     */
    namespace Http {
        /**
         * @property [timeout = 0] - <p>请求超时时间，0表示没超时限制</p>
         * @property [withCredentials = false] - <p>表示跨域请求时是否需要使用凭证</p>
         * @property headers - <p>发送的自定义请求头</p>
         * @property [responseType = json] - <p>示服务器响应的数据类型 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'</p>
         */
        type Config = {
            timeout?: number;
            withCredentials?: boolean;
            headers: Map<string, string>;
            responseType?: string;
        };
        /**
         * <p>http get请求</p>
         * @param url - <p>请求的url</p>
         * @param data - <p>请求数据</p>
         * @param config - <p>请求配置</p>
         */
        function get(url: string, data: any, config: THINGX.Http.Config): Promis<object>;
        /**
         * <p>http post请求</p>
         * @param url - <p>请求的url</p>
         * @param data - <p>请求数据</p>
         * @param config - <p>请求配置</p>
         */
        function post(url: string, data: any, config: THINGX.Http.Config): Promis<object>;
        /**
         * @property [timeout = 0] - <p>请求超时时间，0表示没超时限制</p>
         * @property [withCredentials = false] - <p>表示跨域请求时是否需要使用凭证</p>
         * @property headers - <p>发送的自定义请求头</p>
         * @property [responseType = json] - <p>示服务器响应的数据类型 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'</p>
         */
        type Config = {
            timeout?: number;
            withCredentials?: boolean;
            headers: Map<string, string>;
            responseType?: string;
        };
        /**
         * <p>http get请求</p>
         * @param url - <p>请求的url</p>
         * @param data - <p>请求数据</p>
         * @param config - <p>请求配置</p>
         */
        function get(url: string, data: any, config: THINGX.Http.Config): Promis<object>;
        /**
         * <p>http post请求</p>
         * @param url - <p>请求的url</p>
         * @param data - <p>请求数据</p>
         * @param config - <p>请求配置</p>
         */
        function post(url: string, data: any, config: THINGX.Http.Config): Promis<object>;
    }
    /**
     * <p>图层模块</p>
     */
    namespace Layer {
        /**
         * @property type - <p>图层显示方式: 0是一直显示, 1是业务激活时显示, 2隐藏</p>
         * @property subType - <p>子图层显示方式: 0是悬浮出现, 1是点击出现</p>
         * @property restoreEnable - <p>是否启用恢复按钮</p>
         */
        type GlobalConfig = {
            type: number;
            subType: number;
            restoreEnable: boolean;
        };
        /**
         * <p>显示图层模块</p>
         */
        function show(): void;
        /**
         * <p>隐藏图层模块</p>
         */
        function hide(): void;
        /**
         * <p>通过图层名称获取当前层级图层的实例</p>
         * @param name - <p>图层名称</p>
         * @returns <ul>
         * <li>图层实例</li>
         * </ul>
         */
        function get(name: string): any | null;
        /**
         * <p>激活图层</p>
         * @param name - <p>图层名称</p>
         * @param [purpose = _default_] - <p>激活目的</p>
         */
        function activate(name: string | string[], purpose?: string): void;
        /**
         * <p>取消激活图层</p>
         * @param name - <p>图层名称</p>
         * @param [purpose = _default_] - <p>取消激活目的</p>
         */
        function deactivate(name: string | string[], purpose?: string): void;
        /**
         * <p>取消激活所有图层</p>
         */
        function deactivateAll(): void;
        /**
         * <p>获取当前激活的图层数组</p>
         */
        function getActivated(): object[];
        /**
         * <p>重新读取可视化配置 并根据当前层级重新创建图层</p>
         */
        function refresh(): void;
        /**
         * <p>获取图层用户自定义配置</p>
         * @example
         * const curLevel = THINGX.App.currentLevel;
         * const config = THINGX.Layer.getCustomConfig('建筑信息', curLevel);
         * @param [name] - <p>图层名称，undefined表示所有图层</p>
         * @param [level = THINGX.App.currentLevel] - <p>孪生体对象/孪生体分类</p>
         */
        function getCustomConfig(name?: string | undefined, level?: THING.BaseObject | THINGX.CONST.DEFAULT_DIGITAL_TWIN_CLASS): any;
        /**
         * <p>获取指定层级所有图层配置</p>
         * @example
         * const curLevel = THINGX.App.currentLevel;
         * const config = THINGX.Layer.getConfig(curLevel);
         * @param [level = THINGX.App.currentLevel] - <p>孪生体对象/孪生体分类</p>
         */
        function getConfig(level?: THING.BaseObject | THINGX.CONST.DEFAULT_DIGITAL_TWIN_CLASS): object[];
        /**
         * <p>获取图层的全局配置</p>
         */
        function getGlobalConfig(): THINGX.Layer.GlobalConfig;
        /**
         * <p>获取图层面板配置</p>
         */
        function getPanelConfig(): any | null;
        /**
         * <p>获取图层互斥配置</p>
         */
        function getLayerMutexsConfig(): string[];
        /**
         * <p>获取原生的图层项，不是实例</p>
         * @param name - <p>图层名称</p>
         */
        function getNative(name: string): any;
        /**
         * <p>获取图层组</p>
         * @param name - <p>图层组名称</p>
         */
        function getGroup(name: string): any;
        /**
         * <p>将图层注册条件转换成ThingJS表达式语法</p>
         */
        function regConditonToThingJSQueryExpression(condition: object[] | any): string;
        /**
         * <p>返回当前层级图层树状层级结构</p>
         * @returns <ul>
         * <li>树状层级结构</li>
         * </ul>
         */
        function getTreeStruct(): any;
        /**
         * @property type - <p>图层显示方式: 0是一直显示, 1是业务激活时显示, 2隐藏</p>
         * @property subType - <p>子图层显示方式: 0是悬浮出现, 1是点击出现</p>
         * @property restoreEnable - <p>是否启用恢复按钮</p>
         */
        type GlobalConfig = {
            type: number;
            subType: number;
            restoreEnable: boolean;
        };
        /**
         * <p>显示图层模块</p>
         */
        function show(): void;
        /**
         * <p>隐藏图层模块</p>
         */
        function hide(): void;
        /**
         * <p>通过图层名称获取当前层级图层的实例</p>
         * @param name - <p>图层名称</p>
         * @returns <ul>
         * <li>图层实例</li>
         * </ul>
         */
        function get(name: string): any | null;
        /**
         * <p>激活图层</p>
         * @param name - <p>图层名称</p>
         * @param [purpose = _default_] - <p>激活目的</p>
         */
        function activate(name: string | string[], purpose?: string): void;
        /**
         * <p>取消激活图层</p>
         * @param name - <p>图层名称</p>
         * @param [purpose = _default_] - <p>取消激活目的</p>
         */
        function deactivate(name: string | string[], purpose?: string): void;
        /**
         * <p>取消激活所有图层</p>
         */
        function deactivateAll(): void;
        /**
         * <p>获取当前激活的图层数组</p>
         */
        function getActivated(): object[];
        /**
         * <p>重新读取可视化配置 并根据当前层级重新创建图层</p>
         */
        function refresh(): void;
        /**
         * <p>获取图层用户自定义配置</p>
         * @example
         * const curLevel = THINGX.App.currentLevel;
         * const config = THINGX.Layer.getCustomConfig('建筑信息', curLevel);
         * @param [name] - <p>图层名称，undefined表示所有图层</p>
         * @param [level = THINGX.App.currentLevel] - <p>孪生体对象/孪生体分类</p>
         */
        function getCustomConfig(name?: string | undefined, level?: THING.BaseObject | THINGX.CONST.DEFAULT_DIGITAL_TWIN_CLASS): any;
        /**
         * <p>获取指定层级所有图层配置</p>
         * @example
         * const curLevel = THINGX.App.currentLevel;
         * const config = THINGX.Layer.getConfig(curLevel);
         * @param [level = THINGX.App.currentLevel] - <p>孪生体对象/孪生体分类</p>
         */
        function getConfig(level?: THING.BaseObject | THINGX.CONST.DEFAULT_DIGITAL_TWIN_CLASS): object[];
        /**
         * <p>获取图层的全局配置</p>
         */
        function getGlobalConfig(): THINGX.Layer.GlobalConfig;
        /**
         * <p>获取图层面板配置</p>
         */
        function getPanelConfig(): any | null;
        /**
         * <p>获取图层互斥配置</p>
         */
        function getLayerMutexsConfig(): string[];
        /**
         * <p>获取原生的图层项，不是实例</p>
         * @param name - <p>图层名称</p>
         */
        function getNative(name: string): any;
        /**
         * <p>获取图层组</p>
         * @param name - <p>图层组名称</p>
         */
        function getGroup(name: string): any;
        /**
         * <p>将图层注册条件转换成ThingJS表达式语法</p>
         */
        function regConditonToThingJSQueryExpression(condition: object[] | any): string;
        /**
         * <p>返回当前层级图层树状层级结构</p>
         * @returns <ul>
         * <li>树状层级结构</li>
         * </ul>
         */
        function getTreeStruct(): any;
    }
    /**
     * <p>标记模块</p>
     */
    namespace Marker {
        /**
         * @property url - <p>标记使用图片路径</p>
         * @property width - <p>标记宽度</p>
         * @property height - <p>标记高度</p>
         * @property size - <p>像素大小</p>
         * @property getMethod - <p>取值方法</p>
         * @property pickable - <p>是否可被拾取</p>
         * @property keepSize - <p>是否保存像素大小</p>
         * @property inheritScale - <p>是否继承代理孪生体缩放</p>
         * @property inheritStyle - <p>是否继承代理孪生体样式</p>
         * @property alwaysOnTop - <p>是否始终处于最高层级渲染，无遮挡</p>
         * @property complete - <p>标记创建完成回调</p>
         * @property style - <p>标记样式 参考ThingJS</p>
         * @property businessName - <p>业务名称</p>
         */
        type CreateConfig = {
            url: string;
            width: number;
            height: number;
            size: number;
            getMethod: string;
            pickable: boolean;
            keepSize: boolean;
            inheritScale: boolean;
            inheritStyle: boolean;
            alwaysOnTop: boolean;
            complete: (...params: any[]) => any;
            style: any;
            businessName: string;
        };
        /**
         * <p>显示标记</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param name - <p>标记名称（在ThingJS-X中配置的对应的孪生体上的标记）</p>
         * @param [purpose = default] - <p>显示目的</p>
         * @returns <ul>
         * <li>返回操作过的标记列表</li>
         * </ul>
         */
        function show(digitalTwin: THING.BaseObject | string, name: string, purpose?: string): THING.BaseObject[];
        /**
         * <p>隐藏标记</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param name - <p>标记名称</p>
         * @param [purpose = default] - <p>隐藏目的</p>
         * @returns <ul>
         * <li>返回操作过的标记列表</li>
         * </ul>
         */
        function hide(digitalTwin: THING.BaseObject | string, name: string, purpose?: string): THING.BaseObject[];
        /**
         * <p>增加标记，增加后立即显示</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param name - <p>标记名称,可通过THINGX.Marker.getConfig获取孪生体上配置了哪些标记（在ThingJS-X中配置的对应的孪生体上的标记）</p>
         * @param isExcludeModel - <p>是否包含模型</p>
         * @returns <ul>
         * <li>成功返回标记对象</li>
         * </ul>
         */
        function add(digitalTwin: THING.BaseObject | string, name: string, isExcludeModel: boolean): THING.BaseObject[];
        /**
         * <p>获取已创建的标记</p>
         * @param digitalTwin - <p>孪生体对象</p>
         * @param name - <p>标记名称</p>
         * @returns <ul>
         * <li>成功返回标记对象</li>
         * </ul>
         */
        function get(digitalTwin: THING.BaseObject, name: string): THING.BaseObject | null;
        /**
         * <p>删除标记</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param name - <p>标记名称</p>
         * @returns <ul>
         * <li>是否删除成功</li>
         * </ul>
         */
        function remove(digitalTwin: THING.BaseObject | string, name: string): boolean;
        /**
         * <p>通过tag增加自定义标记</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param tag - <p>标签</p>
         * @param type - <p>标记类型</p>
         * @param config - <p>标记自定义配置</p>
         * @returns <ul>
         * <li>标记列表</li>
         * </ul>
         */
        function addWithTag(digitalTwin: THING.BaseObject | string, tag: string, type: string, config: THINGX.Marker.CreateConfig): THING.BaseObject[];
        /**
         * <p>通过标签删除标记</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param tag - <p>标签</p>
         * @returns <ul>
         * <li>是否删除成功</li>
         * </ul>
         */
        function removeWithTag(digitalTwin: THING.BaseObject | string, tag: string): boolean;
        /**
         * <p>获取孪生体标记配置数据</p>
         * @param digitalTwin - <p>孪生体对象</p>
         * @returns <ul>
         * <li>标记配置数据 业务名称:配置数据</li>
         * </ul>
         */
        function getConfig(digitalTwin: THING.BaseObject): Map<string, object>;
        /**
         * <p>获取孪生体上所有的标记</p>
         * @param digitalTwin - <p>孪生体对象</p>
         * @returns <ul>
         * <li>已经创建的标记 业务名称:标记对象</li>
         * </ul>
         */
        function getAll(digitalTwin: THING.BaseObject): Map<string, THING.BaseObject>;
        /**
         * <p>给符合条件的孪生体注册标记</p>
         * @param condition - <p>孪生体集合配置语法表达式 {REGTYPE_CLASSTYPE: 'Campus'}</p>
         * @param config - <p>标记配置</p>
         * @param [businessName = _default_] - <p>业务名称</p>
         */
        function addWithCondition(condition: string, config: any, businessName?: string): void;
        /**
         * <p>获取孪生体预加载的标记名称</p>
         * @param digitalTwin - <p>孪生体对象</p>
         * @returns <ul>
         * <li>预加载标记的名称,若没有则返回空值,可根据这个名称通过show或者hide方法来显示和影藏预加载标记</li>
         * </ul>
         */
        function getPreloadName(digitalTwin: THING.BaseObject): string;
        /**
         * @property url - <p>标记使用图片路径</p>
         * @property width - <p>标记宽度</p>
         * @property height - <p>标记高度</p>
         * @property size - <p>像素大小</p>
         * @property getMethod - <p>取值方法</p>
         * @property pickable - <p>是否可被拾取</p>
         * @property keepSize - <p>是否保存像素大小</p>
         * @property inheritScale - <p>是否继承代理孪生体缩放</p>
         * @property inheritStyle - <p>是否继承代理孪生体样式</p>
         * @property alwaysOnTop - <p>是否始终处于最高层级渲染，无遮挡</p>
         * @property complete - <p>标记创建完成回调</p>
         * @property style - <p>标记样式 参考ThingJS</p>
         * @property businessName - <p>业务名称</p>
         */
        type CreateConfig = {
            url: string;
            width: number;
            height: number;
            size: number;
            getMethod: string;
            pickable: boolean;
            keepSize: boolean;
            inheritScale: boolean;
            inheritStyle: boolean;
            alwaysOnTop: boolean;
            complete: (...params: any[]) => any;
            style: any;
            businessName: string;
        };
        /**
         * <p>显示标记</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param name - <p>标记名称（在ThingJS-X中配置的对应的孪生体上的标记）</p>
         * @param [purpose = default] - <p>显示目的</p>
         * @returns <ul>
         * <li>返回操作过的标记列表</li>
         * </ul>
         */
        function show(digitalTwin: THING.BaseObject | string, name: string, purpose?: string): THING.BaseObject[];
        /**
         * <p>隐藏标记</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param name - <p>标记名称</p>
         * @param [purpose = default] - <p>隐藏目的</p>
         * @returns <ul>
         * <li>返回操作过的标记列表</li>
         * </ul>
         */
        function hide(digitalTwin: THING.BaseObject | string, name: string, purpose?: string): THING.BaseObject[];
        /**
         * <p>增加标记，增加后立即显示</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param name - <p>标记名称,可通过THINGX.Marker.getConfig获取孪生体上配置了哪些标记（在ThingJS-X中配置的对应的孪生体上的标记）</p>
         * @param isExcludeModel - <p>是否包含模型</p>
         * @returns <ul>
         * <li>成功返回标记对象</li>
         * </ul>
         */
        function add(digitalTwin: THING.BaseObject | string, name: string, isExcludeModel: boolean): THING.BaseObject[];
        /**
         * <p>获取已创建的标记</p>
         * @param digitalTwin - <p>孪生体对象</p>
         * @param name - <p>标记名称</p>
         * @returns <ul>
         * <li>成功返回标记对象</li>
         * </ul>
         */
        function get(digitalTwin: THING.BaseObject, name: string): THING.BaseObject | null;
        /**
         * <p>删除标记</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param name - <p>标记名称</p>
         * @returns <ul>
         * <li>是否删除成功</li>
         * </ul>
         */
        function remove(digitalTwin: THING.BaseObject | string, name: string): boolean;
        /**
         * <p>通过tag增加自定义标记</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param tag - <p>标签</p>
         * @param type - <p>标记类型</p>
         * @param config - <p>标记自定义配置</p>
         * @returns <ul>
         * <li>标记列表</li>
         * </ul>
         */
        function addWithTag(digitalTwin: THING.BaseObject | string, tag: string, type: string, config: THINGX.Marker.CreateConfig): THING.BaseObject[];
        /**
         * <p>通过标签删除标记</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param tag - <p>标签</p>
         * @returns <ul>
         * <li>是否删除成功</li>
         * </ul>
         */
        function removeWithTag(digitalTwin: THING.BaseObject | string, tag: string): boolean;
        /**
         * <p>获取孪生体标记配置数据</p>
         * @param digitalTwin - <p>孪生体对象</p>
         * @returns <ul>
         * <li>标记配置数据 业务名称:配置数据</li>
         * </ul>
         */
        function getConfig(digitalTwin: THING.BaseObject): Map<string, object>;
        /**
         * <p>获取孪生体上所有的标记</p>
         * @param digitalTwin - <p>孪生体对象</p>
         * @returns <ul>
         * <li>已经创建的标记 业务名称:标记对象</li>
         * </ul>
         */
        function getAll(digitalTwin: THING.BaseObject): Map<string, THING.BaseObject>;
        /**
         * <p>给符合条件的孪生体注册标记</p>
         * @param condition - <p>孪生体集合配置语法表达式 {REGTYPE_CLASSTYPE: 'Campus'}</p>
         * @param config - <p>标记配置</p>
         * @param [businessName = _default_] - <p>业务名称</p>
         */
        function addWithCondition(condition: string, config: any, businessName?: string): void;
        /**
         * <p>获取孪生体预加载的标记名称</p>
         * @param digitalTwin - <p>孪生体对象</p>
         * @returns <ul>
         * <li>预加载标记的名称,若没有则返回空值,可根据这个名称通过show或者hide方法来显示和影藏预加载标记</li>
         * </ul>
         */
        function getPreloadName(digitalTwin: THING.BaseObject): string;
    }
    /**
     * <p>监控模块</p>
     */
    namespace Monitor {
        /**
         * <p>监控模块 设备内</p>
         */
        namespace ModuleInDevice {
            /**
             * <p>将孪生体添加到监控中</p>
             * @example
             * const objs = THINGX.App.queryWithThingJSExpression('[twinType=空调]');
             * objs.forEach(obj=>{
             *     THINGX.Monitor.ModuleInDevice.add(obj);
             * });
             *
             * THINGX.Monitor.ModuleInDevice.add('[twinType=温度传感器]', null, null, '温度云图')
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @param monitorName - <p>监控名称，用于代理监控</p>
             * @param monitorKeys - <p>监控指标, 如 [&quot;温度&quot;,&quot;湿度&quot;]</p>
             * @param [purpose = _default_] - <p>监控目的，可以理解为一个占位标识。当有一个监控目的（purpose）占用某个孪生体对象，使该孪生体对象处于监控队列中时，则该孪生体不可被移出监控队列</p>
             * @param config - <p>监控配置</p>
             * @param [config.isForceUpdate = false] - <p>是否更新监控效果，无论物体是否显示</p>
             * @param [config.isAddEffect = true] - <p>是否添加监控效果</p>
             * @param [config.effectoVisible] - <p>监控可视化效果是否显示，默认随孪生体显示状态，如果isAddEffect为false则该字段不生效</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function add(digitalTwin: THING.BaseObject | string, monitorName: string, monitorKeys: string[], purpose?: string, config: {
                isForceUpdate?: boolean;
                isAddEffect?: boolean;
                effectoVisible?: boolean;
            }): THING.BaseObject[];
            /**
             * <p>将孪生体从监控中移除</p>
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @param [purpose = _default_] - <p>移除目的</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function remove(digitalTwin: THING.BaseObject | string, purpose?: string): THING.BaseObject[];
            /**
             * <p>孪生体是否在监控集合中</p>
             * @param digitalTwin - <p>孪生体对象</p>
             * @param [type] - <p>传此参数则检测物体是否有当前监控类型</p>
             */
            function isDigitalTwinInMonitorSet(digitalTwin: THING.BaseObject, type?: string): boolean;
            /**
             * <p>通过接口向后端请求监控数据</p>
             * @example
             * // 对已经被加入到监控中的孪生体对象请求监控数据
             * THINGX.Monitor.ModuleInDevice.remoteData()
             */
            function remoteData(): void;
            /**
             * <p>刷新监控显示效果</p>
             */
            function refreshEffect(): void;
            /**
             * <p>注册设备内监控 注册完后就添加监控 和 监控效果</p>
             * @param condition - <p>要注册的条件，可以是物体，物体 id，物体 name,物体 类，物体属性，函数，物体方法，以及使用前面的类型进行与或非的组合。</p>
             * @param param - <p>要注册内容</p>
             * @param name - <p>注册的名称,可以不填，系统内部会默认指定name的值是“<em>NONAME</em>”</p>
             */
            function addWithCondition(condition: any | string, param: any, name: string): void;
            /**
             * <p>将孪生体添加到监控中</p>
             * @example
             * const objs = THINGX.App.queryWithThingJSExpression('[twinType=空调]');
             * objs.forEach(obj=>{
             *     THINGX.Monitor.ModuleInDevice.add(obj);
             * });
             *
             * THINGX.Monitor.ModuleInDevice.add('[twinType=温度传感器]', null, null, '温度云图')
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @param monitorName - <p>监控名称，用于代理监控</p>
             * @param monitorKeys - <p>监控指标, 如 [&quot;温度&quot;,&quot;湿度&quot;]</p>
             * @param [purpose = _default_] - <p>监控目的，可以理解为一个占位标识。当有一个监控目的（purpose）占用某个孪生体对象，使该孪生体对象处于监控队列中时，则该孪生体不可被移出监控队列</p>
             * @param config - <p>监控配置</p>
             * @param [config.isForceUpdate = false] - <p>是否更新监控效果，无论物体是否显示</p>
             * @param [config.isAddEffect = true] - <p>是否添加监控效果</p>
             * @param [config.effectoVisible] - <p>监控可视化效果是否显示，默认随孪生体显示状态，如果isAddEffect为false则该字段不生效</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function add(digitalTwin: THING.BaseObject | string, monitorName: string, monitorKeys: string[], purpose?: string, config: {
                isForceUpdate?: boolean;
                isAddEffect?: boolean;
                effectoVisible?: boolean;
            }): THING.BaseObject[];
            /**
             * <p>将孪生体从监控中移除</p>
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @param [purpose = _default_] - <p>移除目的</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function remove(digitalTwin: THING.BaseObject | string, purpose?: string): THING.BaseObject[];
            /**
             * <p>孪生体是否在监控集合中</p>
             * @param digitalTwin - <p>孪生体对象</p>
             * @param [type] - <p>传此参数则检测物体是否有当前监控类型</p>
             */
            function isDigitalTwinInMonitorSet(digitalTwin: THING.BaseObject, type?: string): boolean;
            /**
             * <p>通过接口向后端请求监控数据</p>
             * @example
             * // 对已经被加入到监控中的孪生体对象请求监控数据
             * THINGX.Monitor.ModuleInDevice.remoteData()
             */
            function remoteData(): void;
            /**
             * <p>刷新监控显示效果</p>
             */
            function refreshEffect(): void;
            /**
             * <p>注册设备内监控 注册完后就添加监控 和 监控效果</p>
             * @param condition - <p>要注册的条件，可以是物体，物体 id，物体 name,物体 类，物体属性，函数，物体方法，以及使用前面的类型进行与或非的组合。</p>
             * @param param - <p>要注册内容</p>
             * @param name - <p>注册的名称,可以不填，系统内部会默认指定name的值是“<em>NONAME</em>”</p>
             */
            function addWithCondition(condition: any | string, param: any, name: string): void;
        }
        /**
         * <p>监控模块 操作集</p>
         */
        namespace ModuleOpSet {
            /**
             * <p>将孪生体添加到监控中</p>
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @param monitorName - <p>监控名称，用于代理监控</p>
             * @param monitorKeys - <p>监控指标, 如 [&quot;温度&quot;,&quot;湿度&quot;]</p>
             * @param [purpose = _default_] - <p>监控目的，可以理解为一个占位标识。当有一个监控目的（purpose）占用某个孪生体对象，使该孪生体对象处于监控队列中时，则该孪生体不可被移出监控队列</p>
             * @param config - <p>监控配置</p>
             * @param [config.isForceUpdate = false] - <p>是否更新监控效果，无论物体是否显示</p>
             * @param [config.isAddEffect = true] - <p>是否添加监控效果</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function add(digitalTwin: THING.BaseObject | string, monitorName: string, monitorKeys: string[], purpose?: string, config: {
                isForceUpdate?: boolean;
                isAddEffect?: boolean;
            }): THING.BaseObject[];
            /**
             * <p>将孪生体从监控中移除</p>
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @param [purpose = _default_] - <p>移除目的</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function remove(digitalTwin: THING.BaseObject | string, purpose?: string): THING.BaseObject[];
            /**
             * <p>增加监控效果</p>
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function addEffect(digitalTwin: THING.BaseObject | string): THING.BaseObject[];
            /**
             * <p>移除监控效果</p>
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function removeEffect(digitalTwin: THING.BaseObject | string): THING.BaseObject[];
            /**
             * <p>将孪生体添加到监控中</p>
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @param monitorName - <p>监控名称，用于代理监控</p>
             * @param monitorKeys - <p>监控指标, 如 [&quot;温度&quot;,&quot;湿度&quot;]</p>
             * @param [purpose = _default_] - <p>监控目的，可以理解为一个占位标识。当有一个监控目的（purpose）占用某个孪生体对象，使该孪生体对象处于监控队列中时，则该孪生体不可被移出监控队列</p>
             * @param config - <p>监控配置</p>
             * @param [config.isForceUpdate = false] - <p>是否更新监控效果，无论物体是否显示</p>
             * @param [config.isAddEffect = true] - <p>是否添加监控效果</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function add(digitalTwin: THING.BaseObject | string, monitorName: string, monitorKeys: string[], purpose?: string, config: {
                isForceUpdate?: boolean;
                isAddEffect?: boolean;
            }): THING.BaseObject[];
            /**
             * <p>将孪生体从监控中移除</p>
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @param [purpose = _default_] - <p>移除目的</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function remove(digitalTwin: THING.BaseObject | string, purpose?: string): THING.BaseObject[];
            /**
             * <p>增加监控效果</p>
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function addEffect(digitalTwin: THING.BaseObject | string): THING.BaseObject[];
            /**
             * <p>移除监控效果</p>
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function removeEffect(digitalTwin: THING.BaseObject | string): THING.BaseObject[];
        }
        /**
         * <p>将孪生体添加到监控中</p>
         * @example
         * const objs = THINGX.App.queryWithThingJSExpression('[twinType=空调]');
         * objs.forEach(obj=>{
         *     THINGX.Monitor.add(obj);
         * });
         *
         * THINGX.Monitor.add('[twinType=温度传感器]', null, null, '温度云图')
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param monitorName - <p>监控名称，用于代理监控</p>
         * @param monitorKeys - <p>监控指标, 如 [&quot;温度&quot;,&quot;湿度&quot;]</p>
         * @param [purpose = _default_] - <p>监控目的，可以理解为一个占位标识。当有一个监控目的（purpose）占用某个孪生体对象，使该孪生体对象处于监控队列中时，则该孪生体不可被移出监控队列</p>
         * @param config - <p>监控配置</p>
         * @param [config.isForceUpdate = false] - <p>是否更新监控效果，无论物体是否显示</p>
         * @param [config.isAddEffect = true] - <p>是否添加监控效果</p>
         * @param [config.effectoVisible] - <p>监控可视化效果是否显示，默认随孪生体显示状态，如果isAddEffect为false则该字段不生效</p>
         * @returns <ul>
         * <li>执行过操作的孪生体集合</li>
         * </ul>
         */
        function add(digitalTwin: THING.BaseObject | string, monitorName: string, monitorKeys: string[], purpose?: string, config: {
            isForceUpdate?: boolean;
            isAddEffect?: boolean;
            effectoVisible?: boolean;
        }): THING.BaseObject[];
        /**
         * <p>将孪生体从监控中移除</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param [purpose = _default_] - <p>移除目的</p>
         * @returns <ul>
         * <li>执行过操作的孪生体集合</li>
         * </ul>
         */
        function remove(digitalTwin: THING.BaseObject | string, purpose?: string): THING.BaseObject[];
        /**
         * <p>孪生体是否在监控集合中</p>
         * @param digitalTwin - <p>孪生体对象</p>
         * @param [type] - <p>传此参数则检测物体是否有当前监控类型</p>
         */
        function isDigitalTwinInMonitorSet(digitalTwin: THING.BaseObject, type?: string): boolean;
        /**
         * <p>增加监控标记</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param business - <p>相关业务名称，通过业务名称查询相关配置，下面配置会覆盖通过业务查询出的配置</p>
         * @param [type] - <p>DEFAULT 默认没有效果/BACKGROUND_AND_CANVAS 标记/HTMLELEMENT 标记/SELF_OBJECT 默认孪生体自身效果</p>
         * @param config - <p>标记创建配置</p>
         * @returns <ul>
         * <li>执行过操作的孪生体集合</li>
         * </ul>
         */
        function addMarker(digitalTwin: THING.BaseObject | string, business: string, type?: string, config: THINGX.Marker.CreateConfig): THING.BaseObject[];
        /**
         * <p>移除监控标记</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @returns <ul>
         * <li>执行过操作的孪生体集合</li>
         * </ul>
         */
        function removeMarker(digitalTwin: THING.BaseObject | string): THING.BaseObject[];
        /**
         * <p>获取监控标记</p>
         * @param digitalTwin - <p>孪生体对象</p>
         */
        function getMarker(digitalTwin: THING.BaseObject): THING.BaseObject | null;
        /**
         * <p>设置监控接口请求间隔时间</p>
         * @param time - <p>间隔时间，单位秒</p>
         */
        function setRemoteInterval(time: number): void;
        /**
         * <p>设置监控接口请求超时时间</p>
         * @param time - <p>超时时间，单位秒</p>
         */
        function setRemoteTimeout(time: number): void;
        /**
         * <p>通过接口向后端请求监控数据</p>
         * @example
         * const dbid = obj.userData._DBID_;
         * // 对已经被加入到监控中的孪生体对象请求监控数据
         * THINGX.Monitor.remoteData()
         * // 对单一物体进行刷新dbid
         * THINGX.Monitor.remoteData(dbid);
         * // 对对多个物体进行刷新dbids
         * THINGX.Monitor.remoteData([...dbids]);
         * @param [ids = null] - <p>孪生体属性中的dbid 默认对所有孪生体监控进行请求</p>
         */
        function remoteData(ids?: string[] | string | null): void;
        /**
         * <p>注册设备内监控 注册完后就添加监控 和 监控效果</p>
         * @param condition - <p>要注册的条件，可以是物体，物体 id，物体 name,物体 类，物体属性，函数，物体方法，以及使用前面的类型进行与或非的组合。</p>
         * @param config - <p>要注册内容</p>
         * @param config.business - <p>业务名称</p>
         * @param name - <p>注册的名称,可以不填，系统内部会默认指定name的值是“<em>NONAME</em>”</p>
         */
        function addWithCondition(condition: any | string, config: {
            business: string;
        }, name: string): void;
        /**
         * <p>监控模块 设备内</p>
         */
        namespace ModuleInDevice {
            /**
             * <p>将孪生体添加到监控中</p>
             * @example
             * const objs = THINGX.App.queryWithThingJSExpression('[twinType=空调]');
             * objs.forEach(obj=>{
             *     THINGX.Monitor.ModuleInDevice.add(obj);
             * });
             *
             * THINGX.Monitor.ModuleInDevice.add('[twinType=温度传感器]', null, null, '温度云图')
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @param monitorName - <p>监控名称，用于代理监控</p>
             * @param monitorKeys - <p>监控指标, 如 [&quot;温度&quot;,&quot;湿度&quot;]</p>
             * @param [purpose = _default_] - <p>监控目的，可以理解为一个占位标识。当有一个监控目的（purpose）占用某个孪生体对象，使该孪生体对象处于监控队列中时，则该孪生体不可被移出监控队列</p>
             * @param config - <p>监控配置</p>
             * @param [config.isForceUpdate = false] - <p>是否更新监控效果，无论物体是否显示</p>
             * @param [config.isAddEffect = true] - <p>是否添加监控效果</p>
             * @param [config.effectoVisible] - <p>监控可视化效果是否显示，默认随孪生体显示状态，如果isAddEffect为false则该字段不生效</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function add(digitalTwin: THING.BaseObject | string, monitorName: string, monitorKeys: string[], purpose?: string, config: {
                isForceUpdate?: boolean;
                isAddEffect?: boolean;
                effectoVisible?: boolean;
            }): THING.BaseObject[];
            /**
             * <p>将孪生体从监控中移除</p>
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @param [purpose = _default_] - <p>移除目的</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function remove(digitalTwin: THING.BaseObject | string, purpose?: string): THING.BaseObject[];
            /**
             * <p>孪生体是否在监控集合中</p>
             * @param digitalTwin - <p>孪生体对象</p>
             * @param [type] - <p>传此参数则检测物体是否有当前监控类型</p>
             */
            function isDigitalTwinInMonitorSet(digitalTwin: THING.BaseObject, type?: string): boolean;
            /**
             * <p>通过接口向后端请求监控数据</p>
             * @example
             * // 对已经被加入到监控中的孪生体对象请求监控数据
             * THINGX.Monitor.ModuleInDevice.remoteData()
             */
            function remoteData(): void;
            /**
             * <p>刷新监控显示效果</p>
             */
            function refreshEffect(): void;
            /**
             * <p>注册设备内监控 注册完后就添加监控 和 监控效果</p>
             * @param condition - <p>要注册的条件，可以是物体，物体 id，物体 name,物体 类，物体属性，函数，物体方法，以及使用前面的类型进行与或非的组合。</p>
             * @param param - <p>要注册内容</p>
             * @param name - <p>注册的名称,可以不填，系统内部会默认指定name的值是“<em>NONAME</em>”</p>
             */
            function addWithCondition(condition: any | string, param: any, name: string): void;
            /**
             * <p>将孪生体添加到监控中</p>
             * @example
             * const objs = THINGX.App.queryWithThingJSExpression('[twinType=空调]');
             * objs.forEach(obj=>{
             *     THINGX.Monitor.ModuleInDevice.add(obj);
             * });
             *
             * THINGX.Monitor.ModuleInDevice.add('[twinType=温度传感器]', null, null, '温度云图')
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @param monitorName - <p>监控名称，用于代理监控</p>
             * @param monitorKeys - <p>监控指标, 如 [&quot;温度&quot;,&quot;湿度&quot;]</p>
             * @param [purpose = _default_] - <p>监控目的，可以理解为一个占位标识。当有一个监控目的（purpose）占用某个孪生体对象，使该孪生体对象处于监控队列中时，则该孪生体不可被移出监控队列</p>
             * @param config - <p>监控配置</p>
             * @param [config.isForceUpdate = false] - <p>是否更新监控效果，无论物体是否显示</p>
             * @param [config.isAddEffect = true] - <p>是否添加监控效果</p>
             * @param [config.effectoVisible] - <p>监控可视化效果是否显示，默认随孪生体显示状态，如果isAddEffect为false则该字段不生效</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function add(digitalTwin: THING.BaseObject | string, monitorName: string, monitorKeys: string[], purpose?: string, config: {
                isForceUpdate?: boolean;
                isAddEffect?: boolean;
                effectoVisible?: boolean;
            }): THING.BaseObject[];
            /**
             * <p>将孪生体从监控中移除</p>
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @param [purpose = _default_] - <p>移除目的</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function remove(digitalTwin: THING.BaseObject | string, purpose?: string): THING.BaseObject[];
            /**
             * <p>孪生体是否在监控集合中</p>
             * @param digitalTwin - <p>孪生体对象</p>
             * @param [type] - <p>传此参数则检测物体是否有当前监控类型</p>
             */
            function isDigitalTwinInMonitorSet(digitalTwin: THING.BaseObject, type?: string): boolean;
            /**
             * <p>通过接口向后端请求监控数据</p>
             * @example
             * // 对已经被加入到监控中的孪生体对象请求监控数据
             * THINGX.Monitor.ModuleInDevice.remoteData()
             */
            function remoteData(): void;
            /**
             * <p>刷新监控显示效果</p>
             */
            function refreshEffect(): void;
            /**
             * <p>注册设备内监控 注册完后就添加监控 和 监控效果</p>
             * @param condition - <p>要注册的条件，可以是物体，物体 id，物体 name,物体 类，物体属性，函数，物体方法，以及使用前面的类型进行与或非的组合。</p>
             * @param param - <p>要注册内容</p>
             * @param name - <p>注册的名称,可以不填，系统内部会默认指定name的值是“<em>NONAME</em>”</p>
             */
            function addWithCondition(condition: any | string, param: any, name: string): void;
        }
        /**
         * <p>监控模块 操作集</p>
         */
        namespace ModuleOpSet {
            /**
             * <p>将孪生体添加到监控中</p>
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @param monitorName - <p>监控名称，用于代理监控</p>
             * @param monitorKeys - <p>监控指标, 如 [&quot;温度&quot;,&quot;湿度&quot;]</p>
             * @param [purpose = _default_] - <p>监控目的，可以理解为一个占位标识。当有一个监控目的（purpose）占用某个孪生体对象，使该孪生体对象处于监控队列中时，则该孪生体不可被移出监控队列</p>
             * @param config - <p>监控配置</p>
             * @param [config.isForceUpdate = false] - <p>是否更新监控效果，无论物体是否显示</p>
             * @param [config.isAddEffect = true] - <p>是否添加监控效果</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function add(digitalTwin: THING.BaseObject | string, monitorName: string, monitorKeys: string[], purpose?: string, config: {
                isForceUpdate?: boolean;
                isAddEffect?: boolean;
            }): THING.BaseObject[];
            /**
             * <p>将孪生体从监控中移除</p>
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @param [purpose = _default_] - <p>移除目的</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function remove(digitalTwin: THING.BaseObject | string, purpose?: string): THING.BaseObject[];
            /**
             * <p>增加监控效果</p>
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function addEffect(digitalTwin: THING.BaseObject | string): THING.BaseObject[];
            /**
             * <p>移除监控效果</p>
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function removeEffect(digitalTwin: THING.BaseObject | string): THING.BaseObject[];
            /**
             * <p>将孪生体添加到监控中</p>
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @param monitorName - <p>监控名称，用于代理监控</p>
             * @param monitorKeys - <p>监控指标, 如 [&quot;温度&quot;,&quot;湿度&quot;]</p>
             * @param [purpose = _default_] - <p>监控目的，可以理解为一个占位标识。当有一个监控目的（purpose）占用某个孪生体对象，使该孪生体对象处于监控队列中时，则该孪生体不可被移出监控队列</p>
             * @param config - <p>监控配置</p>
             * @param [config.isForceUpdate = false] - <p>是否更新监控效果，无论物体是否显示</p>
             * @param [config.isAddEffect = true] - <p>是否添加监控效果</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function add(digitalTwin: THING.BaseObject | string, monitorName: string, monitorKeys: string[], purpose?: string, config: {
                isForceUpdate?: boolean;
                isAddEffect?: boolean;
            }): THING.BaseObject[];
            /**
             * <p>将孪生体从监控中移除</p>
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @param [purpose = _default_] - <p>移除目的</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function remove(digitalTwin: THING.BaseObject | string, purpose?: string): THING.BaseObject[];
            /**
             * <p>增加监控效果</p>
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function addEffect(digitalTwin: THING.BaseObject | string): THING.BaseObject[];
            /**
             * <p>移除监控效果</p>
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function removeEffect(digitalTwin: THING.BaseObject | string): THING.BaseObject[];
        }
        /**
         * <p>将孪生体添加到监控中</p>
         * @example
         * const objs = THINGX.App.queryWithThingJSExpression('[twinType=空调]');
         * objs.forEach(obj=>{
         *     THINGX.Monitor.add(obj);
         * });
         *
         * THINGX.Monitor.add('[twinType=温度传感器]', null, null, '温度云图')
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param monitorName - <p>监控名称，用于代理监控</p>
         * @param monitorKeys - <p>监控指标, 如 [&quot;温度&quot;,&quot;湿度&quot;]</p>
         * @param [purpose = _default_] - <p>监控目的，可以理解为一个占位标识。当有一个监控目的（purpose）占用某个孪生体对象，使该孪生体对象处于监控队列中时，则该孪生体不可被移出监控队列</p>
         * @param config - <p>监控配置</p>
         * @param [config.isForceUpdate = false] - <p>是否更新监控效果，无论物体是否显示</p>
         * @param [config.isAddEffect = true] - <p>是否添加监控效果</p>
         * @param [config.effectoVisible] - <p>监控可视化效果是否显示，默认随孪生体显示状态，如果isAddEffect为false则该字段不生效</p>
         * @returns <ul>
         * <li>执行过操作的孪生体集合</li>
         * </ul>
         */
        function add(digitalTwin: THING.BaseObject | string, monitorName: string, monitorKeys: string[], purpose?: string, config: {
            isForceUpdate?: boolean;
            isAddEffect?: boolean;
            effectoVisible?: boolean;
        }): THING.BaseObject[];
        /**
         * <p>将孪生体从监控中移除</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param [purpose = _default_] - <p>移除目的</p>
         * @returns <ul>
         * <li>执行过操作的孪生体集合</li>
         * </ul>
         */
        function remove(digitalTwin: THING.BaseObject | string, purpose?: string): THING.BaseObject[];
        /**
         * <p>孪生体是否在监控集合中</p>
         * @param digitalTwin - <p>孪生体对象</p>
         * @param [type] - <p>传此参数则检测物体是否有当前监控类型</p>
         */
        function isDigitalTwinInMonitorSet(digitalTwin: THING.BaseObject, type?: string): boolean;
        /**
         * <p>增加监控标记</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param business - <p>相关业务名称，通过业务名称查询相关配置，下面配置会覆盖通过业务查询出的配置</p>
         * @param [type] - <p>DEFAULT 默认没有效果/BACKGROUND_AND_CANVAS 标记/HTMLELEMENT 标记/SELF_OBJECT 默认孪生体自身效果</p>
         * @param config - <p>标记创建配置</p>
         * @returns <ul>
         * <li>执行过操作的孪生体集合</li>
         * </ul>
         */
        function addMarker(digitalTwin: THING.BaseObject | string, business: string, type?: string, config: THINGX.Marker.CreateConfig): THING.BaseObject[];
        /**
         * <p>移除监控标记</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @returns <ul>
         * <li>执行过操作的孪生体集合</li>
         * </ul>
         */
        function removeMarker(digitalTwin: THING.BaseObject | string): THING.BaseObject[];
        /**
         * <p>获取监控标记</p>
         * @param digitalTwin - <p>孪生体对象</p>
         */
        function getMarker(digitalTwin: THING.BaseObject): THING.BaseObject | null;
        /**
         * <p>设置监控接口请求间隔时间</p>
         * @param time - <p>间隔时间，单位秒</p>
         */
        function setRemoteInterval(time: number): void;
        /**
         * <p>设置监控接口请求超时时间</p>
         * @param time - <p>超时时间，单位秒</p>
         */
        function setRemoteTimeout(time: number): void;
        /**
         * <p>通过接口向后端请求监控数据</p>
         * @example
         * const dbid = obj.userData._DBID_;
         * // 对已经被加入到监控中的孪生体对象请求监控数据
         * THINGX.Monitor.remoteData()
         * // 对单一物体进行刷新dbid
         * THINGX.Monitor.remoteData(dbid);
         * // 对对多个物体进行刷新dbids
         * THINGX.Monitor.remoteData([...dbids]);
         * @param [ids = null] - <p>孪生体属性中的dbid 默认对所有孪生体监控进行请求</p>
         */
        function remoteData(ids?: string[] | string | null): void;
        /**
         * <p>注册设备内监控 注册完后就添加监控 和 监控效果</p>
         * @param condition - <p>要注册的条件，可以是物体，物体 id，物体 name,物体 类，物体属性，函数，物体方法，以及使用前面的类型进行与或非的组合。</p>
         * @param config - <p>要注册内容</p>
         * @param config.business - <p>业务名称</p>
         * @param name - <p>注册的名称,可以不填，系统内部会默认指定name的值是“<em>NONAME</em>”</p>
         */
        function addWithCondition(condition: any | string, config: {
            business: string;
        }, name: string): void;
    }
    /**
     * <p>操作集模块</p>
     */
    namespace OpSet {
        /**
         * <p>运行操作集</p>
         * @param name - <p>操作集名称</p>
         * @param runObj - <p>运行对象</p>
         * @param [runParams = {}] - <p>运行中存储单元传参</p>
         */
        function run(name: string, runObj: any, runParams?: Map<string, any>): void;
        /**
         * <p>获取指定操作集</p>
         * @param name - <p>操作集名称</p>
         * @returns <p>操作集</p>
         */
        function get(name: string): any | null;
        /**
         * <p>停止指定操作集</p>
         * @param name - <p>操作集名称</p>
         */
        function stop(name: string): void;
        /**
         * <p>设置指定操作集的运行速度</p>
         * @param name - <p>操作集名称</p>
         * @param [speed = 1] - <p>运行速度</p>
         */
        function changeSpeed(name: string, speed?: number): void;
        /**
         * <p>挂起指定操作集</p>
         * @param name - <p>操作集名称</p>
         */
        function suspend(name: string): void;
        /**
         * <p>恢复指定操作集</p>
         * @param name - <p>操作集名称</p>
         */
        function resume(name: string): void;
        /**
         * <p>重新读取操作集可视化配置</p>
         */
        function refresh(): void;
        /**
         * <p>获取操作集的存储单元</p>
         * @example
         * let vals = THINGX.OpSet.getStorageCell('test');
         * vals.name = 'console.error(123)';
         * THINGX.OpSet.run('test');
         * @param name - <p>操作集名称</p>
         * @returns <ul>
         * <li>存储单元集合，可直接修改，运行时生效</li>
         * </ul>
         */
        function getStorageCell(name: string): Map<string, any> | null;
        /**
         * <p>运行操作集</p>
         * @param name - <p>操作集名称</p>
         * @param runObj - <p>运行对象</p>
         * @param [runParams = {}] - <p>运行中存储单元传参</p>
         */
        function run(name: string, runObj: any, runParams?: Map<string, any>): void;
        /**
         * <p>获取指定操作集</p>
         * @param name - <p>操作集名称</p>
         * @returns <p>操作集</p>
         */
        function get(name: string): any | null;
        /**
         * <p>停止指定操作集</p>
         * @param name - <p>操作集名称</p>
         */
        function stop(name: string): void;
        /**
         * <p>设置指定操作集的运行速度</p>
         * @param name - <p>操作集名称</p>
         * @param [speed = 1] - <p>运行速度</p>
         */
        function changeSpeed(name: string, speed?: number): void;
        /**
         * <p>挂起指定操作集</p>
         * @param name - <p>操作集名称</p>
         */
        function suspend(name: string): void;
        /**
         * <p>恢复指定操作集</p>
         * @param name - <p>操作集名称</p>
         */
        function resume(name: string): void;
        /**
         * <p>重新读取操作集可视化配置</p>
         */
        function refresh(): void;
        /**
         * <p>获取操作集的存储单元</p>
         * @example
         * let vals = THINGX.OpSet.getStorageCell('test');
         * vals.name = 'console.error(123)';
         * THINGX.OpSet.run('test');
         * @param name - <p>操作集名称</p>
         * @returns <ul>
         * <li>存储单元集合，可直接修改，运行时生效</li>
         * </ul>
         */
        function getStorageCell(name: string): Map<string, any> | null;
    }
    /**
     * <p>场景控制模块</p>
     */
    namespace SceneControl {
        /**
         * <p>显示场景控制模块</p>
         */
        function show(): void;
        /**
         * <p>隐藏场景控制模块</p>
         */
        function hide(): void;
        /**
         * <p>激活指定场景控制功能</p>
         * @param name - <p>场景控制功能名称或ID</p>
         * @returns <ul>
         * <li>是否激活成功</li>
         * </ul>
         */
        function activate(name: string | string[]): boolean;
        /**
         * <p>取消激活指定场景控制功能</p>
         * @param name - <p>场景控制功能名称或ID</p>
         * @returns <ul>
         * <li>是否激活成功</li>
         * </ul>
         */
        function deactivate(name: string | string[]): boolean;
        /**
         * <p>获取已经激活的场景控制功能</p>
         * @returns <ul>
         * <li>已经激活的场景控制功能</li>
         * </ul>
         */
        function getActivated(): object[];
        /**
         * <p>刷新当前层级的场景控制功能</p>
         */
        function refresh(): Promise<boolean>;
        /**
         * <p>获取场景控制功能配置</p>
         * @param [name=] - <p>场景控制功能名称, 非空的话返回指定配置，否则返回所有配置</p>
         * @param [level = THINGX.App.currentLevel] - <p>孪生体对象/孪生体分类</p>
         * @returns <ul>
         * <li>场景控制配置</li>
         * </ul>
         */
        function getConfig(name=?: string, level?: THING.BaseObject | THINGX.CONST.DEFAULT_DIGITAL_TWIN_CLASS): object[] | any | null;
        /**
         * <p>显示场景控制模块</p>
         */
        function show(): void;
        /**
         * <p>隐藏场景控制模块</p>
         */
        function hide(): void;
        /**
         * <p>激活指定场景控制功能</p>
         * @param name - <p>场景控制功能名称或ID</p>
         * @returns <ul>
         * <li>是否激活成功</li>
         * </ul>
         */
        function activate(name: string | string[]): boolean;
        /**
         * <p>取消激活指定场景控制功能</p>
         * @param name - <p>场景控制功能名称或ID</p>
         * @returns <ul>
         * <li>是否激活成功</li>
         * </ul>
         */
        function deactivate(name: string | string[]): boolean;
        /**
         * <p>获取已经激活的场景控制功能</p>
         * @returns <ul>
         * <li>已经激活的场景控制功能</li>
         * </ul>
         */
        function getActivated(): object[];
        /**
         * <p>刷新当前层级的场景控制功能</p>
         */
        function refresh(): Promise<boolean>;
        /**
         * <p>获取场景控制功能配置</p>
         * @param [name=] - <p>场景控制功能名称, 非空的话返回指定配置，否则返回所有配置</p>
         * @param [level = THINGX.App.currentLevel] - <p>孪生体对象/孪生体分类</p>
         * @returns <ul>
         * <li>场景控制配置</li>
         * </ul>
         */
        function getConfig(name=?: string, level?: THING.BaseObject | THINGX.CONST.DEFAULT_DIGITAL_TWIN_CLASS): object[] | any | null;
    }
    /**
     * <p>后端请求模块</p>
     */
    namespace ServerInterface {
        /**
         * <p>资源数据</p>
         * @property pageNum - <p>当前的页码</p>
         * @property pageSize - <p>当前页码中数据条数</p>
         * @property totalRows - <p>数据总条数</p>
         * @property totalPages - <p>数据总页数</p>
         * @property data - <p>当前页的数据</p>
         */
        type ResourceData = {
            pageNum: number;
            pageSize: number;
            totalRows: number;
            totalPages: number;
            data: object[];
        };
        /**
         * @property INNER - <p>场景资源内部路径</p>
         * @property SCENE - <p>场景资源路径</p>
         * @property SCENE_VERSION - <p>场景版本</p>
         * @property TEXTURE - <p>贴图路径</p>
         */
        type SceneResourceData = {
            INNER: string;
            SCENE: string;
            SCENE_VERSION: string;
            TEXTURE: string;
        };
        /**
         * <p>用户信息</p>
         * @property domainId - <p>域ID</p>
         * @property id - <p>用户ID</p>
         * @property kind - <p>用户类型</p>
         * @property language - <p>本地化语言</p>
         * @property loginCode - <p>登录类型</p>
         * @property userCode - <p>用户类型</p>
         * @property userName - <p>用户名称</p>
         * @property tokenCreateTime - <p>token创建时间戳</p>
         * @property tokenValidTime - <p>token校验时间</p>
         */
        type UserData = {
            domainId: number;
            id: number;
            kind: number;
            language: string;
            loginCode: string;
            userCode: string;
            userName: string;
            tokenCreateTime: number;
            tokenValidTime: number;
        };
        /**
         * <p>查询资源列表数据</p>
         * @param params - <p>查询参数</p>
         * @param params.type - <p>资源类型/插件类型 action/chart/core/expand/theme</p>
         * @param params.pageNum - <p>分页页码</p>
         * @param params.pageSize - <p>每页条数</p>
         * @param params.searchKeyword - <p>搜索关键字</p>
         * @returns <p>返回的资源数据</p>
         */
        function getResources(params: {
            type: string | THINGX.CONST.PLUGIN_TYPE;
            pageNum: number;
            pageSize: number;
            searchKeyword: string;
        }): Promise<THINGX.ServerInterface.ResourceData>;
        /**
         * <p>查询系统配置</p>
         * @param params - <p>查询参数</p>
         * @param params.keys - <p>关键字</p>
         * @param params.type - <p>类型</p>
         * @param params.field - <p>区域</p>
         * @returns <p>返回的系统配置数据</p>
         */
        function getSystemSettings(params: {
            keys: string | string[];
            type: string;
            field: string;
        }): Promise<object>;
        /**
         * <p>通过场景CiCode获取园区数据</p>
         * @param params - <p>查询参数</p>
         * @param params.sc - <p>场景CiCode</p>
         * @returns <p>孪生体数据</p>
         */
        function getParkDataByScene(params: {
            sc: string;
        }): Promise<object[]>;
        /**
         * <p>通过分类模板代码获取孪生体</p>
         * @param params - <p>查询参数-分类模板代码 DATACENTER/PARK/BUILDING/FLOOR/ROOM/EARTH/DISTRIBUTION/STANDALONEDEVICE</p>
         * @returns <p>孪生体数据</p>
         */
        function getTwinsByTemplateCode(params: any[]): Promise<object[]>;
        /**
         * <p>通过场景CiCode获取模型库数据</p>
         * @param id - <p>场景CiCode</p>
         * @returns <p>模型库数据</p>
         */
        function getModelLibrary(id: string): Promise<Map<string, object>>;
        /**
         * <p>通过指定孪生体ID获取孪生体及下层级结构数据</p>
         * @param params - <p>查询参数</p>
         * @param params.id - <p>孪生体ID/CiCode</p>
         * @param params.depth - <p>查询深度 -1代表不限制</p>
         * @param params.endfilters - <p>结束过滤对象类型条件</p>
         * @returns <p>孪生体数据结构数据</p>
         */
        function getDigitalTwinsStructureData(params: {
            id: string;
            depth: number;
            endfilters: string[];
        }): Promise<Map<object>>;
        /**
         * <p>获取场景资源数据</p>
         * @param id - <p>场景ID/CICODE</p>
         * @returns <p>资源数据</p>
         */
        function getSceneResource(id: number): Promise<THINGX.ServerInterface.SceneResourceData>;
        /**
         * <p>获取所有logo数据</p>
         * @returns <ul>
         * <li>logo数据</li>
         * </ul>
         */
        function getLogos(): Promise<Map<object>>;
        /**
         * <p>获取场景信息</p>
         * @param identify - <p>场景ID/场景名称</p>
         * @returns <ul>
         * <li>场景信息</li>
         * </ul>
         */
        function getSceneInfo(identify: string): Promise<object>;
        /**
         * <p>获取用户信息详细</p>
         * @returns <p>用户信息</p>
         */
        function getUserDetailInfo(用户ID: number): Promise<object>;
        /**
         * <p>资源数据</p>
         * @property pageNum - <p>当前的页码</p>
         * @property pageSize - <p>当前页码中数据条数</p>
         * @property totalRows - <p>数据总条数</p>
         * @property totalPages - <p>数据总页数</p>
         * @property data - <p>当前页的数据</p>
         */
        type ResourceData = {
            pageNum: number;
            pageSize: number;
            totalRows: number;
            totalPages: number;
            data: object[];
        };
        /**
         * @property INNER - <p>场景资源内部路径</p>
         * @property SCENE - <p>场景资源路径</p>
         * @property SCENE_VERSION - <p>场景版本</p>
         * @property TEXTURE - <p>贴图路径</p>
         */
        type SceneResourceData = {
            INNER: string;
            SCENE: string;
            SCENE_VERSION: string;
            TEXTURE: string;
        };
        /**
         * <p>用户信息</p>
         * @property domainId - <p>域ID</p>
         * @property id - <p>用户ID</p>
         * @property kind - <p>用户类型</p>
         * @property language - <p>本地化语言</p>
         * @property loginCode - <p>登录类型</p>
         * @property userCode - <p>用户类型</p>
         * @property userName - <p>用户名称</p>
         * @property tokenCreateTime - <p>token创建时间戳</p>
         * @property tokenValidTime - <p>token校验时间</p>
         */
        type UserData = {
            domainId: number;
            id: number;
            kind: number;
            language: string;
            loginCode: string;
            userCode: string;
            userName: string;
            tokenCreateTime: number;
            tokenValidTime: number;
        };
        /**
         * <p>查询资源列表数据</p>
         * @param params - <p>查询参数</p>
         * @param params.type - <p>资源类型/插件类型 action/chart/core/expand/theme</p>
         * @param params.pageNum - <p>分页页码</p>
         * @param params.pageSize - <p>每页条数</p>
         * @param params.searchKeyword - <p>搜索关键字</p>
         * @returns <p>返回的资源数据</p>
         */
        function getResources(params: {
            type: string | THINGX.CONST.PLUGIN_TYPE;
            pageNum: number;
            pageSize: number;
            searchKeyword: string;
        }): Promise<THINGX.ServerInterface.ResourceData>;
        /**
         * <p>查询系统配置</p>
         * @param params - <p>查询参数</p>
         * @param params.keys - <p>关键字</p>
         * @param params.type - <p>类型</p>
         * @param params.field - <p>区域</p>
         * @returns <p>返回的系统配置数据</p>
         */
        function getSystemSettings(params: {
            keys: string | string[];
            type: string;
            field: string;
        }): Promise<object>;
        /**
         * <p>通过场景CiCode获取园区数据</p>
         * @param params - <p>查询参数</p>
         * @param params.sc - <p>场景CiCode</p>
         * @returns <p>孪生体数据</p>
         */
        function getParkDataByScene(params: {
            sc: string;
        }): Promise<object[]>;
        /**
         * <p>通过分类模板代码获取孪生体</p>
         * @param params - <p>查询参数-分类模板代码 DATACENTER/PARK/BUILDING/FLOOR/ROOM/EARTH/DISTRIBUTION/STANDALONEDEVICE</p>
         * @returns <p>孪生体数据</p>
         */
        function getTwinsByTemplateCode(params: any[]): Promise<object[]>;
        /**
         * <p>通过场景CiCode获取模型库数据</p>
         * @param id - <p>场景CiCode</p>
         * @returns <p>模型库数据</p>
         */
        function getModelLibrary(id: string): Promise<Map<string, object>>;
        /**
         * <p>通过指定孪生体ID获取孪生体及下层级结构数据</p>
         * @param params - <p>查询参数</p>
         * @param params.id - <p>孪生体ID/CiCode</p>
         * @param params.depth - <p>查询深度 -1代表不限制</p>
         * @param params.endfilters - <p>结束过滤对象类型条件</p>
         * @returns <p>孪生体数据结构数据</p>
         */
        function getDigitalTwinsStructureData(params: {
            id: string;
            depth: number;
            endfilters: string[];
        }): Promise<Map<object>>;
        /**
         * <p>获取场景资源数据</p>
         * @param id - <p>场景ID/CICODE</p>
         * @returns <p>资源数据</p>
         */
        function getSceneResource(id: number): Promise<THINGX.ServerInterface.SceneResourceData>;
        /**
         * <p>获取所有logo数据</p>
         * @returns <ul>
         * <li>logo数据</li>
         * </ul>
         */
        function getLogos(): Promise<Map<object>>;
        /**
         * <p>获取场景信息</p>
         * @param identify - <p>场景ID/场景名称</p>
         * @returns <ul>
         * <li>场景信息</li>
         * </ul>
         */
        function getSceneInfo(identify: string): Promise<object>;
        /**
         * <p>获取用户信息详细</p>
         * @returns <p>用户信息</p>
         */
        function getUserDetailInfo(用户ID: number): Promise<object>;
    }
    /**
     * <p>定时器模块</p>
     */
    namespace Timer {
        /**
         * <p>增加全局延时执行函数</p>
         * @example
         * THINGX.Timer.add("test", 1, false, () => {} );
         * @param name - <p>延时执行函数标识</p>
         * @param func - <p>需要执行的函数</p>
         * @param [delay = 0] - <p>延时多久，单位秒</p>
         * @param [isLoop = false] - <p>是否循环执行函数</p>
         * @param [list = []] - <p>执行函数传参</p>
         */
        function add(name: string, func: (...params: any[]) => any, delay?: number, isLoop?: boolean, list?: any[]): void;
        /**
         * <p>删除全局延时执行函数</p>
         * @example
         * THINGX.Timer.remove("test");
         * @param name - <p>延时执行函数标识</p>
         */
        function remove(name: string): void;
        /**
         * <p>移除全局所有延时执行函数</p>
         */
        function clear(): void;
        /**
         * <p>获取全局延时函数配置</p>
         * @example
         * THINGX.Timer.has("test");
         * @param name - <p>延时执行函数标识</p>
         * @returns <ul>
         * <li>有则返回增加时配置，否则返回undefined</li>
         * </ul>
         */
        function get(name: string): any[] | null;
        /**
         * <p>为对象添加延时执行函数</p>
         * @example
         * let obj = {
         count: 0
         add: function(val) {
           this.count += val;
         }
        }
        // 实现每一秒obj.mycount加1
        THINGX.Timer.addWithObject('example', obj, 'add', 1, false, [5]);
         * @param name - <p>延时执行函数标识，作用域为添加的所有对象</p>
         * @param obj - <p>延时对象</p>
         * @param methodName - <p>需要延时的方法名</p>
         * @param [delay = 0] - <p>延时执行的时间,单位秒</p>
         * @param [isLoop = false] - <p>是否循环</p>
         * @param [list = []] - <p>执行函数传参</p>
         */
        function addWithObject(name: any, obj: any, methodName: string, delay?: number, isLoop?: boolean, list?: any[]): void;
        /**
         * <p>移除对象上延时函数</p>
         * @example
         * THINGX.Timer.removeWithObject('example');
         * @param name - <p>延时执行函数标识，作用域为添加的所有对象</p>
         */
        function removeWithObject(name: string): void;
        /**
         * <p>移除所有对象上的延时函数</p>
         */
        function clearWithObject(): void;
        /**
         * <p>获取在对象上增加的延时函数配置</p>
         * @param name - <p>延时执行函数标识，作用域为添加的所有对象</p>
         * @returns <ul>
         * <li>有则返回增加时配置，否则返回undefined</li>
         * </ul>
         */
        function getWithObject(name: string): any[] | null;
        /**
         * <p>增加全局延时执行函数</p>
         * @example
         * THINGX.Timer.add("test", 1, false, () => {} );
         * @param name - <p>延时执行函数标识</p>
         * @param func - <p>需要执行的函数</p>
         * @param [delay = 0] - <p>延时多久，单位秒</p>
         * @param [isLoop = false] - <p>是否循环执行函数</p>
         * @param [list = []] - <p>执行函数传参</p>
         */
        function add(name: string, func: (...params: any[]) => any, delay?: number, isLoop?: boolean, list?: any[]): void;
        /**
         * <p>删除全局延时执行函数</p>
         * @example
         * THINGX.Timer.remove("test");
         * @param name - <p>延时执行函数标识</p>
         */
        function remove(name: string): void;
        /**
         * <p>移除全局所有延时执行函数</p>
         */
        function clear(): void;
        /**
         * <p>获取全局延时函数配置</p>
         * @example
         * THINGX.Timer.has("test");
         * @param name - <p>延时执行函数标识</p>
         * @returns <ul>
         * <li>有则返回增加时配置，否则返回undefined</li>
         * </ul>
         */
        function get(name: string): any[] | null;
        /**
         * <p>为对象添加延时执行函数</p>
         * @example
         * let obj = {
         count: 0
         add: function(val) {
           this.count += val;
         }
        }
        // 实现每一秒obj.mycount加1
        THINGX.Timer.addWithObject('example', obj, 'add', 1, false, [5]);
         * @param name - <p>延时执行函数标识，作用域为添加的所有对象</p>
         * @param obj - <p>延时对象</p>
         * @param methodName - <p>需要延时的方法名</p>
         * @param [delay = 0] - <p>延时执行的时间,单位秒</p>
         * @param [isLoop = false] - <p>是否循环</p>
         * @param [list = []] - <p>执行函数传参</p>
         */
        function addWithObject(name: any, obj: any, methodName: string, delay?: number, isLoop?: boolean, list?: any[]): void;
        /**
         * <p>移除对象上延时函数</p>
         * @example
         * THINGX.Timer.removeWithObject('example');
         * @param name - <p>延时执行函数标识，作用域为添加的所有对象</p>
         */
        function removeWithObject(name: string): void;
        /**
         * <p>移除所有对象上的延时函数</p>
         */
        function clearWithObject(): void;
        /**
         * <p>获取在对象上增加的延时函数配置</p>
         * @param name - <p>延时执行函数标识，作用域为添加的所有对象</p>
         * @returns <ul>
         * <li>有则返回增加时配置，否则返回undefined</li>
         * </ul>
         */
        function getWithObject(name: string): any[] | null;
    }
    /**
     * <p>UI模块</p>
     */
    namespace UI {
        /**
         * <p>加载UI模块</p>
         */
        namespace Loading {
            /**
             * <p>创建并显示应用loading ui</p>
             * @param [url] - <p>资源url路径，默认使用系统自带</p>
             * @param [type = gif] - <p>类型 gif/sequence/video</p>
             */
            function show(url?: string, type?: string): void;
            /**
             * <p>隐藏并销毁应用loading ui</p>
             */
            function hide(): void;
            /**
             * <p>创建并显示应用loading ui</p>
             * @param [url] - <p>资源url路径，默认使用系统自带</p>
             * @param [type = gif] - <p>类型 gif/sequence/video</p>
             */
            function show(url?: string, type?: string): void;
            /**
             * <p>隐藏并销毁应用loading ui</p>
             */
            function hide(): void;
        }
        /**
         * <p>信息模块</p>
         */
        namespace Message {
            /**
             * <p>信息配置</p>
             * @property [content] - <p>提示内容</p>
             * @property [onClose] - <p>关闭时的回调</p>
             * @property [closable = false] - <p>是否显示关闭按钮</p>
             * @property [duration = 1.5] - <p>默认自动关闭的延时，单位秒</p>
             */
            type Config = {
                content?: string;
                onClose?: (...params: any[]) => any;
                closable?: boolean;
                duration?: number;
            };
            /**
             * <p>信息配置</p>
             * @property [content] - <p>提示内容</p>
             * @property [onClose] - <p>关闭时的回调</p>
             * @property [closable = false] - <p>是否显示关闭按钮</p>
             * @property [duration = 1.5] - <p>默认自动关闭的延时，单位秒</p>
             */
            type Config = {
                content?: string;
                onClose?: (...params: any[]) => any;
                closable?: boolean;
                duration?: number;
            };
            /**
             * <p>显示提示信息</p>
             * @example
             * THINGX.Message.info('提示信息');
             * @param config - <p>MessageConfig为相关配置,string为待显示的内容</p>
             */
            function info(config: THINGX.Message.Config | string): void;
            /**
             * <p>显示成功信息</p>
             * @param config - <p>MessageConfig为相关配置,string为待显示的内容</p>
             */
            function success(config: THINGX.Message.Config | string): void;
            /**
             * <p>显示警告信息</p>
             * @param config - <p>MessageConfig为相关配置,string为待显示的内容</p>
             */
            function warning(config: THINGX.Message.Config | string): void;
            /**
             * <p>显示错误信息</p>
             * @example
             * THINGX.Message.error({
             content: '错误信息',
             onClose: () => {console.error('错误信息 end')},
             duration: 100,
             closable: true,
            });
             * @param config - <p>MessageConfig为相关配置,string为待显示的内容</p>
             */
            function error(config: THINGX.Message.Config | string): void;
            /**
             * <p>显示加载信息</p>
             * @param config - <p>MessageConfig为相关配置,string为待显示的内容</p>
             */
            function loading(config: THINGX.Message.Config | string): void;
            /**
             * <p>配置信息提示</p>
             * @param config - <p>MessageConfig为相关配置</p>
             */
            function config(config: THINGX.Message.Config): void;
            /**
             * <p>信息配置</p>
             * @property [content] - <p>提示内容</p>
             * @property [onClose] - <p>关闭时的回调</p>
             * @property [closable = false] - <p>是否显示关闭按钮</p>
             * @property [duration = 1.5] - <p>默认自动关闭的延时，单位秒</p>
             */
            type Config = {
                content?: string;
                onClose?: (...params: any[]) => any;
                closable?: boolean;
                duration?: number;
            };
            /**
             * <p>信息配置</p>
             * @property [content] - <p>提示内容</p>
             * @property [onClose] - <p>关闭时的回调</p>
             * @property [closable = false] - <p>是否显示关闭按钮</p>
             * @property [duration = 1.5] - <p>默认自动关闭的延时，单位秒</p>
             */
            type Config = {
                content?: string;
                onClose?: (...params: any[]) => any;
                closable?: boolean;
                duration?: number;
            };
            /**
             * <p>显示提示信息</p>
             * @example
             * THINGX.Message.info('提示信息');
             * @param config - <p>MessageConfig为相关配置,string为待显示的内容</p>
             */
            function info(config: THINGX.Message.Config | string): void;
            /**
             * <p>显示成功信息</p>
             * @param config - <p>MessageConfig为相关配置,string为待显示的内容</p>
             */
            function success(config: THINGX.Message.Config | string): void;
            /**
             * <p>显示警告信息</p>
             * @param config - <p>MessageConfig为相关配置,string为待显示的内容</p>
             */
            function warning(config: THINGX.Message.Config | string): void;
            /**
             * <p>显示错误信息</p>
             * @example
             * THINGX.Message.error({
             content: '错误信息',
             onClose: () => {console.error('错误信息 end')},
             duration: 100,
             closable: true,
            });
             * @param config - <p>MessageConfig为相关配置,string为待显示的内容</p>
             */
            function error(config: THINGX.Message.Config | string): void;
            /**
             * <p>显示加载信息</p>
             * @param config - <p>MessageConfig为相关配置,string为待显示的内容</p>
             */
            function loading(config: THINGX.Message.Config | string): void;
            /**
             * <p>配置信息提示</p>
             * @param config - <p>MessageConfig为相关配置</p>
             */
            function config(config: THINGX.Message.Config): void;
        }
        /**
         * <p>加载UI模块</p>
         */
        namespace Loading {
            /**
             * <p>创建并显示应用loading ui</p>
             * @param [url] - <p>资源url路径，默认使用系统自带</p>
             * @param [type = gif] - <p>类型 gif/sequence/video</p>
             */
            function show(url?: string, type?: string): void;
            /**
             * <p>隐藏并销毁应用loading ui</p>
             */
            function hide(): void;
            /**
             * <p>创建并显示应用loading ui</p>
             * @param [url] - <p>资源url路径，默认使用系统自带</p>
             * @param [type = gif] - <p>类型 gif/sequence/video</p>
             */
            function show(url?: string, type?: string): void;
            /**
             * <p>隐藏并销毁应用loading ui</p>
             */
            function hide(): void;
        }
        /**
         * <p>信息模块</p>
         */
        namespace Message {
            /**
             * <p>信息配置</p>
             * @property [content] - <p>提示内容</p>
             * @property [onClose] - <p>关闭时的回调</p>
             * @property [closable = false] - <p>是否显示关闭按钮</p>
             * @property [duration = 1.5] - <p>默认自动关闭的延时，单位秒</p>
             */
            type Config = {
                content?: string;
                onClose?: (...params: any[]) => any;
                closable?: boolean;
                duration?: number;
            };
            /**
             * <p>信息配置</p>
             * @property [content] - <p>提示内容</p>
             * @property [onClose] - <p>关闭时的回调</p>
             * @property [closable = false] - <p>是否显示关闭按钮</p>
             * @property [duration = 1.5] - <p>默认自动关闭的延时，单位秒</p>
             */
            type Config = {
                content?: string;
                onClose?: (...params: any[]) => any;
                closable?: boolean;
                duration?: number;
            };
            /**
             * <p>显示提示信息</p>
             * @example
             * THINGX.Message.info('提示信息');
             * @param config - <p>MessageConfig为相关配置,string为待显示的内容</p>
             */
            function info(config: THINGX.Message.Config | string): void;
            /**
             * <p>显示成功信息</p>
             * @param config - <p>MessageConfig为相关配置,string为待显示的内容</p>
             */
            function success(config: THINGX.Message.Config | string): void;
            /**
             * <p>显示警告信息</p>
             * @param config - <p>MessageConfig为相关配置,string为待显示的内容</p>
             */
            function warning(config: THINGX.Message.Config | string): void;
            /**
             * <p>显示错误信息</p>
             * @example
             * THINGX.Message.error({
             content: '错误信息',
             onClose: () => {console.error('错误信息 end')},
             duration: 100,
             closable: true,
            });
             * @param config - <p>MessageConfig为相关配置,string为待显示的内容</p>
             */
            function error(config: THINGX.Message.Config | string): void;
            /**
             * <p>显示加载信息</p>
             * @param config - <p>MessageConfig为相关配置,string为待显示的内容</p>
             */
            function loading(config: THINGX.Message.Config | string): void;
            /**
             * <p>配置信息提示</p>
             * @param config - <p>MessageConfig为相关配置</p>
             */
            function config(config: THINGX.Message.Config): void;
            /**
             * <p>信息配置</p>
             * @property [content] - <p>提示内容</p>
             * @property [onClose] - <p>关闭时的回调</p>
             * @property [closable = false] - <p>是否显示关闭按钮</p>
             * @property [duration = 1.5] - <p>默认自动关闭的延时，单位秒</p>
             */
            type Config = {
                content?: string;
                onClose?: (...params: any[]) => any;
                closable?: boolean;
                duration?: number;
            };
            /**
             * <p>信息配置</p>
             * @property [content] - <p>提示内容</p>
             * @property [onClose] - <p>关闭时的回调</p>
             * @property [closable = false] - <p>是否显示关闭按钮</p>
             * @property [duration = 1.5] - <p>默认自动关闭的延时，单位秒</p>
             */
            type Config = {
                content?: string;
                onClose?: (...params: any[]) => any;
                closable?: boolean;
                duration?: number;
            };
            /**
             * <p>显示提示信息</p>
             * @example
             * THINGX.Message.info('提示信息');
             * @param config - <p>MessageConfig为相关配置,string为待显示的内容</p>
             */
            function info(config: THINGX.Message.Config | string): void;
            /**
             * <p>显示成功信息</p>
             * @param config - <p>MessageConfig为相关配置,string为待显示的内容</p>
             */
            function success(config: THINGX.Message.Config | string): void;
            /**
             * <p>显示警告信息</p>
             * @param config - <p>MessageConfig为相关配置,string为待显示的内容</p>
             */
            function warning(config: THINGX.Message.Config | string): void;
            /**
             * <p>显示错误信息</p>
             * @example
             * THINGX.Message.error({
             content: '错误信息',
             onClose: () => {console.error('错误信息 end')},
             duration: 100,
             closable: true,
            });
             * @param config - <p>MessageConfig为相关配置,string为待显示的内容</p>
             */
            function error(config: THINGX.Message.Config | string): void;
            /**
             * <p>显示加载信息</p>
             * @param config - <p>MessageConfig为相关配置,string为待显示的内容</p>
             */
            function loading(config: THINGX.Message.Config | string): void;
            /**
             * <p>配置信息提示</p>
             * @param config - <p>MessageConfig为相关配置</p>
             */
            function config(config: THINGX.Message.Config): void;
        }
    }
    /**
     * <p>工具模块</p>
     */
    namespace Utils {
        /**
         * <p>DOM相关操作</p>
         */
        namespace DOM {
            /**
             * <p>动态创建style标签</p>
             * @param styleText - <p>style 标签内容</p>
             * @param id - <p>style标签id</p>
             */
            function addStyleTag(styleText: string, id: string): void;
            /**
             * <p>删除style标签</p>
             * @param id - <p>style标签id</p>
             */
            function removeStyleTag(id: string): void;
            /**
             * <p>动态加载js文件</p>
             * @param data - <p>加载源</p>
             * @param config - <p>加载配置</p>
             * @param [config.loadType = THINGX.CONST.JS_LOAD_TYPE.EXEC] - <p>加载脚本方式</p>
             * @param [config.srcType = THINGX.CONST.JS_SRC_TYPE.URL] - <p>加载脚本源类型</p>
             * @param undefined - <p>是否加载成功</p>
             */
            function dynamicLoadJS(data: string, config: {
                loadType?: THINGX.CONST.JS_LOAD_YPE;
                srcType?: THINGX.CONST.JS_SRC_TYPE;
            }): void;
            /**
             * <p>动态创建style标签</p>
             * @param styleText - <p>style 标签内容</p>
             * @param id - <p>style标签id</p>
             */
            function addStyleTag(styleText: string, id: string): void;
            /**
             * <p>删除style标签</p>
             * @param id - <p>style标签id</p>
             */
            function removeStyleTag(id: string): void;
            /**
             * <p>动态加载js文件</p>
             * @param data - <p>加载源</p>
             * @param config - <p>加载配置</p>
             * @param [config.loadType = THINGX.CONST.JS_LOAD_TYPE.EXEC] - <p>加载脚本方式</p>
             * @param [config.srcType = THINGX.CONST.JS_SRC_TYPE.URL] - <p>加载脚本源类型</p>
             * @param undefined - <p>是否加载成功</p>
             */
            function dynamicLoadJS(data: string, config: {
                loadType?: THINGX.CONST.JS_LOAD_YPE;
                srcType?: THINGX.CONST.JS_SRC_TYPE;
            }): void;
        }
        /**
         * <p>孪生体搜索模块</p>
         */
        namespace Search {
            /**
             * <p>显示搜索物体</p>
             * @param [digitalTwins = []] - <p>孪生体列表</p>
             * @param [unknownObjects = []] - <p>未知物体列表</p>
             */
            function show(digitalTwins?: THING.BaseObject[], unknownObjects?: any[]): void;
            /**
             * <p>清空搜索结果</p>
             * @param [config = {}] - <p>清空配置</p>
             * @param config.continueSearch - <p>是否继续搜索</p>
             */
            function clear(config?: {
                continueSearch: boolean;
            }): void;
            /**
             * <p>显示搜索物体</p>
             * @param [digitalTwins = []] - <p>孪生体列表</p>
             * @param [unknownObjects = []] - <p>未知物体列表</p>
             */
            function show(digitalTwins?: THING.BaseObject[], unknownObjects?: any[]): void;
            /**
             * <p>清空搜索结果</p>
             * @param [config = {}] - <p>清空配置</p>
             * @param config.continueSearch - <p>是否继续搜索</p>
             */
            function clear(config?: {
                continueSearch: boolean;
            }): void;
        }
        /**
         * <p>三维空间相关操作模块</p>
         */
        namespace Space {
            /**
             * <p>查询在以center为球心,radius为半径的球内的目标对象</p>
             * @param filter - <p>筛选条件</p>
             * @param center - <p>球心坐标</p>
             * @param radius - <p>球半径</p>
             * @param [queryLevel = THINGX.App.currentLevel] - <p>查询层级</p>
             */
            function queryBySphere(filter: string, center: number[], radius: number, queryLevel?: THING.BaseObject): THING.Selector;
            /**
             * <p>计算孪生体到摄像机的距离</p>
             * @param digitalTwin - <p>目标孪生体</p>
             * @param isRecursive - <p>是否遍历孩子</p>
             */
            function getDistanceFromCamera(digitalTwin: THING.BaseObject, isRecursive: boolean): number;
            /**
             * <p>查询在以center为球心,radius为半径的球内的目标对象</p>
             * @param filter - <p>筛选条件</p>
             * @param center - <p>球心坐标</p>
             * @param radius - <p>球半径</p>
             * @param [queryLevel = THINGX.App.currentLevel] - <p>查询层级</p>
             */
            function queryBySphere(filter: string, center: number[], radius: number, queryLevel?: THING.BaseObject): THING.Selector;
            /**
             * <p>计算孪生体到摄像机的距离</p>
             * @param digitalTwin - <p>目标孪生体</p>
             * @param isRecursive - <p>是否遍历孩子</p>
             */
            function getDistanceFromCamera(digitalTwin: THING.BaseObject, isRecursive: boolean): number;
        }
        /**
         * <p>获取资源全路径</p>
         */
        function getResourceFullUrl(url: string): string;
        /**
         * <p>通过模型型号获取模型库信息</p>
         */
        function getModelProductInfo(模型型号: string): any | null;
        /**
         * <p>加载孪生体资源</p>
         */
        function loadResources(digitalTwins: THING.BaseObject[] | THING.BaseObject): Promise<undefined>;
        /**
         * <p>将孪生体注册条件转换成ThingJS表达式语法</p>
         */
        function regConditonToThingJSQueryExpression(condition: any): string;
        /**
         * <p>获取所有孪生体集合以及其查询条件</p>
         * @param [isReload = false] - <p>是否重新请求后端接口刷新</p>
         */
        function getAllDigitalTwinCollect(isReload?: boolean): Promise<Map<string, object>>;
        /**
         * <p>生成uuid</p>
         * @param [separator] - <p>分隔符</p>
         */
        function createUUID(separator?: string): string;
        /**
         * <p>DOM相关操作</p>
         */
        namespace DOM {
            /**
             * <p>动态创建style标签</p>
             * @param styleText - <p>style 标签内容</p>
             * @param id - <p>style标签id</p>
             */
            function addStyleTag(styleText: string, id: string): void;
            /**
             * <p>删除style标签</p>
             * @param id - <p>style标签id</p>
             */
            function removeStyleTag(id: string): void;
            /**
             * <p>动态加载js文件</p>
             * @param data - <p>加载源</p>
             * @param config - <p>加载配置</p>
             * @param [config.loadType = THINGX.CONST.JS_LOAD_TYPE.EXEC] - <p>加载脚本方式</p>
             * @param [config.srcType = THINGX.CONST.JS_SRC_TYPE.URL] - <p>加载脚本源类型</p>
             * @param undefined - <p>是否加载成功</p>
             */
            function dynamicLoadJS(data: string, config: {
                loadType?: THINGX.CONST.JS_LOAD_YPE;
                srcType?: THINGX.CONST.JS_SRC_TYPE;
            }): void;
            /**
             * <p>动态创建style标签</p>
             * @param styleText - <p>style 标签内容</p>
             * @param id - <p>style标签id</p>
             */
            function addStyleTag(styleText: string, id: string): void;
            /**
             * <p>删除style标签</p>
             * @param id - <p>style标签id</p>
             */
            function removeStyleTag(id: string): void;
            /**
             * <p>动态加载js文件</p>
             * @param data - <p>加载源</p>
             * @param config - <p>加载配置</p>
             * @param [config.loadType = THINGX.CONST.JS_LOAD_TYPE.EXEC] - <p>加载脚本方式</p>
             * @param [config.srcType = THINGX.CONST.JS_SRC_TYPE.URL] - <p>加载脚本源类型</p>
             * @param undefined - <p>是否加载成功</p>
             */
            function dynamicLoadJS(data: string, config: {
                loadType?: THINGX.CONST.JS_LOAD_YPE;
                srcType?: THINGX.CONST.JS_SRC_TYPE;
            }): void;
        }
        /**
         * <p>孪生体搜索模块</p>
         */
        namespace Search {
            /**
             * <p>显示搜索物体</p>
             * @param [digitalTwins = []] - <p>孪生体列表</p>
             * @param [unknownObjects = []] - <p>未知物体列表</p>
             */
            function show(digitalTwins?: THING.BaseObject[], unknownObjects?: any[]): void;
            /**
             * <p>清空搜索结果</p>
             * @param [config = {}] - <p>清空配置</p>
             * @param config.continueSearch - <p>是否继续搜索</p>
             */
            function clear(config?: {
                continueSearch: boolean;
            }): void;
            /**
             * <p>显示搜索物体</p>
             * @param [digitalTwins = []] - <p>孪生体列表</p>
             * @param [unknownObjects = []] - <p>未知物体列表</p>
             */
            function show(digitalTwins?: THING.BaseObject[], unknownObjects?: any[]): void;
            /**
             * <p>清空搜索结果</p>
             * @param [config = {}] - <p>清空配置</p>
             * @param config.continueSearch - <p>是否继续搜索</p>
             */
            function clear(config?: {
                continueSearch: boolean;
            }): void;
        }
        /**
         * <p>三维空间相关操作模块</p>
         */
        namespace Space {
            /**
             * <p>查询在以center为球心,radius为半径的球内的目标对象</p>
             * @param filter - <p>筛选条件</p>
             * @param center - <p>球心坐标</p>
             * @param radius - <p>球半径</p>
             * @param [queryLevel = THINGX.App.currentLevel] - <p>查询层级</p>
             */
            function queryBySphere(filter: string, center: number[], radius: number, queryLevel?: THING.BaseObject): THING.Selector;
            /**
             * <p>计算孪生体到摄像机的距离</p>
             * @param digitalTwin - <p>目标孪生体</p>
             * @param isRecursive - <p>是否遍历孩子</p>
             */
            function getDistanceFromCamera(digitalTwin: THING.BaseObject, isRecursive: boolean): number;
            /**
             * <p>查询在以center为球心,radius为半径的球内的目标对象</p>
             * @param filter - <p>筛选条件</p>
             * @param center - <p>球心坐标</p>
             * @param radius - <p>球半径</p>
             * @param [queryLevel = THINGX.App.currentLevel] - <p>查询层级</p>
             */
            function queryBySphere(filter: string, center: number[], radius: number, queryLevel?: THING.BaseObject): THING.Selector;
            /**
             * <p>计算孪生体到摄像机的距离</p>
             * @param digitalTwin - <p>目标孪生体</p>
             * @param isRecursive - <p>是否遍历孩子</p>
             */
            function getDistanceFromCamera(digitalTwin: THING.BaseObject, isRecursive: boolean): number;
        }
        /**
         * <p>获取资源全路径</p>
         */
        function getResourceFullUrl(url: string): string;
        /**
         * <p>通过模型型号获取模型库信息</p>
         */
        function getModelProductInfo(模型型号: string): any | null;
        /**
         * <p>加载孪生体资源</p>
         */
        function loadResources(digitalTwins: THING.BaseObject[] | THING.BaseObject): Promise<undefined>;
        /**
         * <p>将孪生体注册条件转换成ThingJS表达式语法</p>
         */
        function regConditonToThingJSQueryExpression(condition: any): string;
        /**
         * <p>获取所有孪生体集合以及其查询条件</p>
         * @param [isReload = false] - <p>是否重新请求后端接口刷新</p>
         */
        function getAllDigitalTwinCollect(isReload?: boolean): Promise<Map<string, object>>;
        /**
         * <p>生成uuid</p>
         * @param [separator] - <p>分隔符</p>
         */
        function createUUID(separator?: string): string;
    }
    /**
     * <p>视频流模块</p>
     */
    namespace VideoStream {
        /**
         * <p>获取视频流服务集合</p>
         */
        function getServices(): Map<string, object>;
        /**
         * <p>通过视频流服务创建激活一个监视</p>
         * @returns <ul>
         * <li>监视实例</li>
         * </ul>
         */
        function activateSurveillance(config: any, serial: string, code: string, uri: string, width: string, height: height): any;
        /**
         * <p>取消激活监视</p>
         * @param surveillance - <p>监视实例</p>
         */
        function deactivateSurveillance(surveillance: any): void;
        /**
         * <p>获取视频流服务集合</p>
         */
        function getServices(): Map<string, object>;
        /**
         * <p>通过视频流服务创建激活一个监视</p>
         * @returns <ul>
         * <li>监视实例</li>
         * </ul>
         */
        function activateSurveillance(config: any, serial: string, code: string, uri: string, width: string, height: height): any;
        /**
         * <p>取消激活监视</p>
         * @param surveillance - <p>监视实例</p>
         */
        function deactivateSurveillance(surveillance: any): void;
    }
    /**
     * <p>视点动画模块</p>
     */
    namespace ViewPoint {
        /**
         * <p>显示视点动画</p>
         */
        function show(): void;
        /**
         * <p>隐藏视点动画</p>
         */
        function hide(): void;
        /**
         * <p>播放视点动画</p>
         * @param name - <p>视点动画名称</p>
         * @returns <ul>
         * <li>视点播放是否成功</li>
         * </ul>
         */
        function play(name: string): Promise<boolean>;
        /**
         * <p>挂起当前视点动画</p>
         */
        function suspend(): void;
        /**
         * <p>恢复当前视点动画</p>
         */
        function resume(): void;
        /**
         * <p>停止播放当前视点动画</p>
         */
        function stop(): void;
        /**
         * <p>增加视点动画</p>
         * @param name - <p>视点动画名称</p>
         * @returns <ul>
         * <li>是否增加成功</li>
         * </ul>
         */
        function add(name: string): Promise<boolean>;
        /**
         * <p>获取视点动画</p>
         * @param name - <p>视点动画名称</p>
         */
        function get(name: string): any;
        /**
         * <p>删除视点动画</p>
         * @param name - <p>视点动画名称</p>
         * @returns <ul>
         * <li>是否删除成功</li>
         * </ul>
         */
        function remove(name: string): Promise<boolean>;
        /**
         * <p>修改视点动画名称</p>
         * @param oldName - <p>视点动画旧名称</p>
         * @param newName - <p>视点动画新名称</p>
         * @returns <ul>
         * <li>是否重命名成功</li>
         * </ul>
         */
        function reName(oldName: string, newName: string): Promise<boolean>;
        /**
         * <p>增加视点动画节点</p>
         * @param name - <p>视点动画名称</p>
         * @param [params] - <p>节点参数</p>
         * @returns <ul>
         * <li>是否增加成功</li>
         * </ul>
         */
        function addNode(name: string, params?: any): Promise<boolean>;
        /**
         * <p>更新视点动画节点</p>
         * @param name - <p>视点动画名称</p>
         * @param index - <p>被更新节点索引</p>
         * @param params - <p>节点参数</p>
         * @returns <ul>
         * <li>是否更新成功</li>
         * </ul>
         */
        function updateNode(name: string, index: number, params: any): Promise<boolean>;
        /**
         * <p>截取视点动画节点视角</p>
         * @param name - <p>视点动画名称</p>
         * @param index - <p>节点索引</p>
         * @returns <ul>
         * <li>是否截取成功</li>
         * </ul>
         */
        function snippingNodeView(name: string, index: number): Promise<boolean>;
        /**
         * <p>删除视点动画中节点</p>
         * @param name - <p>视点动画名称</p>
         * @param index - <p>节点索引</p>
         * @returns <ul>
         * <li>是否删除成功</li>
         * </ul>
         */
        function removeNode(name: string, index: number): Promise<boolean>;
        /**
         * <p>预览视点动画节点</p>
         * @param name - <p>视点动画名称</p>
         * @param index - <p>节点索引</p>
         */
        function previewNode(name: string, index: number): void;
        /**
         * <p>设置视点动画循环模式</p>
         */
        function setLoopPlayMode(type: string): void;
        /**
         * <p>激活视点动画声音</p>
         */
        function activateSound(): void;
        /**
         * <p>取消激活视点动画声音</p>
         */
        function deactivatedSound(): void;
        /**
         * <p>增加视点模块</p>
         * @example
         * let module = {};
         * module.snapshot = () => {
         *     // 记录的数据
         *     return {name: 'name'}
         * };
         * // 恢复执行动作
         * module.recover = (data) => {};
         * module.isRecoverOk = () => {
         *     return true;
         * };
         * module.recoverCleardata) => {};
         * THINGX.ViewPoint.addModule('add-module', module);
         * @param name - <p>模块名称</p>
         * @param module - <p>模块实现，需实现方法 snapshot-记录视点/recover-恢复视点/isRecoverOk-是否恢复完成/recoverClear-恢复清理</p>
         * @param [index] - <p>增加位置，默认增加到当前视点模块末尾</p>
         * @returns <ul>
         * <li>是否增加成功</li>
         * </ul>
         */
        function addModule(name: string, module: any, index?: number): boolean;
        /**
         * <p>获取所有的视点动画列表</p>
         */
        function getList(): Promise<object[]>;
        /**
         * <p>展示视点动画列表，需要在视点动画模块显示状态</p>
         * @param name - <p>视点动画名称</p>
         */
        function showList(name: string): object[];
        /**
         * <p>获取视点动画编辑列表</p>
         * @param name - <p>视点动画名称</p>
         */
        function getEditList(name: string): Promise<object[]>;
        /**
         * <p>展示视点动画编辑列表，需要在视点动画模块显示状态</p>
         * @param name - <p>视点动画名称</p>
         */
        function showEditList(name: string): object[];
        /**
         * <p>显示视点动画</p>
         */
        function show(): void;
        /**
         * <p>隐藏视点动画</p>
         */
        function hide(): void;
        /**
         * <p>播放视点动画</p>
         * @param name - <p>视点动画名称</p>
         * @returns <ul>
         * <li>视点播放是否成功</li>
         * </ul>
         */
        function play(name: string): Promise<boolean>;
        /**
         * <p>挂起当前视点动画</p>
         */
        function suspend(): void;
        /**
         * <p>恢复当前视点动画</p>
         */
        function resume(): void;
        /**
         * <p>停止播放当前视点动画</p>
         */
        function stop(): void;
        /**
         * <p>增加视点动画</p>
         * @param name - <p>视点动画名称</p>
         * @returns <ul>
         * <li>是否增加成功</li>
         * </ul>
         */
        function add(name: string): Promise<boolean>;
        /**
         * <p>获取视点动画</p>
         * @param name - <p>视点动画名称</p>
         */
        function get(name: string): any;
        /**
         * <p>删除视点动画</p>
         * @param name - <p>视点动画名称</p>
         * @returns <ul>
         * <li>是否删除成功</li>
         * </ul>
         */
        function remove(name: string): Promise<boolean>;
        /**
         * <p>修改视点动画名称</p>
         * @param oldName - <p>视点动画旧名称</p>
         * @param newName - <p>视点动画新名称</p>
         * @returns <ul>
         * <li>是否重命名成功</li>
         * </ul>
         */
        function reName(oldName: string, newName: string): Promise<boolean>;
        /**
         * <p>增加视点动画节点</p>
         * @param name - <p>视点动画名称</p>
         * @param [params] - <p>节点参数</p>
         * @returns <ul>
         * <li>是否增加成功</li>
         * </ul>
         */
        function addNode(name: string, params?: any): Promise<boolean>;
        /**
         * <p>更新视点动画节点</p>
         * @param name - <p>视点动画名称</p>
         * @param index - <p>被更新节点索引</p>
         * @param params - <p>节点参数</p>
         * @returns <ul>
         * <li>是否更新成功</li>
         * </ul>
         */
        function updateNode(name: string, index: number, params: any): Promise<boolean>;
        /**
         * <p>截取视点动画节点视角</p>
         * @param name - <p>视点动画名称</p>
         * @param index - <p>节点索引</p>
         * @returns <ul>
         * <li>是否截取成功</li>
         * </ul>
         */
        function snippingNodeView(name: string, index: number): Promise<boolean>;
        /**
         * <p>删除视点动画中节点</p>
         * @param name - <p>视点动画名称</p>
         * @param index - <p>节点索引</p>
         * @returns <ul>
         * <li>是否删除成功</li>
         * </ul>
         */
        function removeNode(name: string, index: number): Promise<boolean>;
        /**
         * <p>预览视点动画节点</p>
         * @param name - <p>视点动画名称</p>
         * @param index - <p>节点索引</p>
         */
        function previewNode(name: string, index: number): void;
        /**
         * <p>设置视点动画循环模式</p>
         */
        function setLoopPlayMode(type: string): void;
        /**
         * <p>激活视点动画声音</p>
         */
        function activateSound(): void;
        /**
         * <p>取消激活视点动画声音</p>
         */
        function deactivatedSound(): void;
        /**
         * <p>增加视点模块</p>
         * @example
         * let module = {};
         * module.snapshot = () => {
         *     // 记录的数据
         *     return {name: 'name'}
         * };
         * // 恢复执行动作
         * module.recover = (data) => {};
         * module.isRecoverOk = () => {
         *     return true;
         * };
         * module.recoverCleardata) => {};
         * THINGX.ViewPoint.addModule('add-module', module);
         * @param name - <p>模块名称</p>
         * @param module - <p>模块实现，需实现方法 snapshot-记录视点/recover-恢复视点/isRecoverOk-是否恢复完成/recoverClear-恢复清理</p>
         * @param [index] - <p>增加位置，默认增加到当前视点模块末尾</p>
         * @returns <ul>
         * <li>是否增加成功</li>
         * </ul>
         */
        function addModule(name: string, module: any, index?: number): boolean;
        /**
         * <p>获取所有的视点动画列表</p>
         */
        function getList(): Promise<object[]>;
        /**
         * <p>展示视点动画列表，需要在视点动画模块显示状态</p>
         * @param name - <p>视点动画名称</p>
         */
        function showList(name: string): object[];
        /**
         * <p>获取视点动画编辑列表</p>
         * @param name - <p>视点动画名称</p>
         */
        function getEditList(name: string): Promise<object[]>;
        /**
         * <p>展示视点动画编辑列表，需要在视点动画模块显示状态</p>
         * @param name - <p>视点动画名称</p>
         */
        function showEditList(name: string): object[];
    }
    /**
     * <p>事件</p>
     */
    namespace Event {
        /**
         * @property target - <p>监听对象</p>
         * @property event - <p>监听事件</p>
         * @property [condition] - <p>物体类型选择条件</p>
         * @property [suffix] - <p>可变事件后缀</p>
         * @property callback - <p>监听回调函数</p>
         * @property [priority] - <p>监听优先级</p>
         * @property [tag] - <p>监听标签</p>
         */
        type ListenConfig = {
            target: THING.BaseObject;
            event: THINGX.Event.Type;
            condition?: string;
            suffix?: string;
            callback: (...params: any[]) => any;
            priority?: number;
            tag?: string;
        };
        /**
         * @property target - <p>监听对象</p>
         * @property event - <p>监听事件</p>
         * @property [condition] - <p>物体类型选择条件</p>
         * @property [suffix] - <p>可变事件后缀</p>
         * @property data - <p>事件信息，传递回调参数</p>
         * @property [compatibility = true] - <p>是否兼容遗产事件触发</p>
         * @property [tag] - <p>监听标签</p>
         */
        type TriggerConfig = {
            target: THING.BaseObject;
            event: THINGX.Event.Type;
            condition?: string;
            suffix?: string;
            data: any;
            compatibility?: boolean;
            tag?: string;
        };
        /**
         * @property target - <p>监听对象</p>
         * @property event - <p>监听事件</p>
         * @property [condition] - <p>物体类型选择条件</p>
         * @property [suffix] - <p>可变事件后缀</p>
         * @property [compatibility = true] - <p>是否兼容遗产事件触发</p>
         * @property [tag] - <p>监听标签</p>
         */
        type ResumeConfig = {
            target: THING.BaseObject;
            event: THINGX.Event.Type;
            condition?: string;
            suffix?: string;
            compatibility?: boolean;
            tag?: string;
        };
        /**
         * @property target - <p>监听对象</p>
         * @property event - <p>监听事件</p>
         * @property [condition] - <p>物体类型选择条件</p>
         * @property [suffix] - <p>可变事件后缀</p>
         * @property [compatibility = true] - <p>是否兼容遗产事件触发</p>
         * @property [tag] - <p>监听标签</p>
         */
        type PauseConfig = {
            target: THING.BaseObject;
            event: THINGX.Event.Type;
            condition?: string;
            suffix?: string;
            compatibility?: boolean;
            tag?: string;
        };
        /**
         * @property target - <p>监听对象</p>
         * @property event - <p>监听事件</p>
         * @property [condition] - <p>物体类型选择条件</p>
         * @property [suffix] - <p>可变事件后缀</p>
         * @property [tag] - <p>监听标签</p>
         * @property [compatibility = true] - <p>是否兼容遗产事件触发</p>
         * @property [callback] - <p>监听回调函数</p>
         */
        type OffConfig = {
            target: THING.BaseObject;
            event: THINGX.Event.Type;
            condition?: string;
            suffix?: string;
            tag?: string;
            compatibility?: boolean;
            callback?: (...params: any[]) => any;
        };
        /**
         * <p>监听事件</p>
         * @param config - <p>监听事件配置</p>
         * @returns <p>boolean 是否监听成功</p>
         */
        function on(config: THINGX.Event.ListenConfig): any;
        /**
         * <p>监听事件， 只触发一次</p>
         * @param config - <p>监听事件配置</p>
         * @returns <p>boolean 是否监听成功</p>
         */
        function one(config: THINGX.Event.ListenConfig): any;
        /**
         * <p>触发事件</p>
         * @param config - <p>监听事件配置</p>
         * @returns <p>boolean 是否触发成功</p>
         */
        function trigger(config: THINGX.Event.TriggerConfig): any;
        /**
         * <p>取消监听事件</p>
         * @param config - <p>监听事件配置</p>
         */
        function off(config: THINGX.Event.OffConfig): void;
        /**
         * <p>暂停注册事件</p>
         * @param config - <p>监听事件配置</p>
         */
        function pause(config: THINGX.Event.PauseConfig): void;
        /**
         * <p>恢复注册事件</p>
         * @param config - <p>监听事件配置</p>
         */
        function resume(config: THINGX.Event.ResumeConfig): void;
        /**
         * <p>新建事件</p>
         * @param val - <p>事件名称</p>
         * @param [legacyVal] - <p>遗产事件名称</p>
         * @param [withSuffix = false] - <p>是否有后缀</p>
         */
        function create(val: string, legacyVal?: string, withSuffix?: boolean): any;
        namespace Tag {
            /**
             * <p>显示孪生体面板</p>
             */
            var ShowDigitalTwinPanel: any;
            /**
             * <p>隐藏孪生体面板</p>
             */
            var HideDigitalTwinPanel: any;
            /**
             * <p>创建显示孪生体提示</p>
             */
            var CreateDigitalTwinTip: any;
            /**
             * <p>销毁孪生体提示</p>
             */
            var DestroyDigitalTwinTip: any;
            /**
             * <p>显示孪生体默认效果</p>
             */
            var ShowDigitalTwinDefaultEffect: any;
            /**
             * <p>隐藏孪生体默认效果</p>
             */
            var HideDigitalTwinDefaultEffect: any;
            /**
             * <p>设置选中默认效果</p>
             */
            var SetSelectDefaultEffect: any;
            /**
             * <p>取消设置选中默认效果</p>
             */
            var SetUnselectDefaultEffect: any;
            /**
             * <p>停止飞行</p>
             */
            var StopFly: any;
            /**
             * <p>设置兄弟房间透明</p>
             */
            var SetBrotherRoomsTransparency: any;
            /**
             * <p>设置兄弟房间不透明</p>
             */
            var SetBrotherRoomsNotTransparency: any;
            /**
             * <p>设置楼层透明</p>
             */
            var SetFloorTransparency: any;
            /**
             * <p>设置楼层不透明</p>
             */
            var SetFloorNotTransparency: any;
            /**
             * <p>设置兄弟孪生体透明</p>
             */
            var SetBrotherTwinsTransparency: any;
            /**
             * <p>设置兄弟孪生体不透明</p>
             */
            var SetBrotherTwinsNotTransparency: any;
            /**
             * <p>显示建筑告警</p>
             */
            var ShowAlarmForBuilding: any;
            /**
             * <p>为当前层级设置告警参数</p>
             */
            var SetAlarmParamsForCurrentLevel: any;
            /**
             * <p>创建图层</p>
             */
            var CreateLayer: any;
            /**
             * <p>更新监控效果</p>
             */
            var UpdateMonitorEffect: any;
            /**
             * <p>进入建筑后，只有一层楼则直接进入楼层</p>
             */
            var EnterFloorDirectAfterEnterBuildingIfOneFloorInBuilding: any;
            /**
             * <p>退出楼层后，只有一层楼则直接进入园区</p>
             */
            var EnterCampusDirectAfterLeaveFloorIfOneFloorInBuilding: any;
            /**
             * <p>进入楼层后，只有一间房则直接进入房间</p>
             */
            var EnterRoomDirectAfterEnterFloorIfOneRoomInFloor: any;
            /**
             * <p>退出房间后，只有一层楼则直接进入建筑</p>
             */
            var EnterBuildingDirectAfterLeaveRoomIfOneRoomInFloor: any;
        }
        /**
         * <p>事件类型</p>
         */
        namespace Type { }
    }
    /**
     * <p>告警模块</p>
     */
    namespace Alarm {
        /**
         * <p>告警查询配置</p>
         * @property [acknowledged] - <p>处理状态</p>
         * @property alarmLevel - <p>告警级别</p>
         * @property [classNames = [1, 2, 3, 4]] - <p>孪生体业务分类，默认为空数组代表所有</p>
         * @property dcIds - <p>场景的数据库ID数组（<em>DBID</em>）</p>
         * @property [enableGlobal = false/true] - <p>开启全局查询，当前层级是地图的话默认true，园区默认false。当为true时，需要设置dcIds</p>
         * @property fromCiId - <p>查询的起始层级的数据库ID（<em>DBID</em>）</p>
         * @property keyword - <p>搜索关键词，会匹配孪生体的名称，告警详情</p>
         * @property orAttrs - <p>孪生体属性条件筛选 默认空数组代表没有过滤条件</p>
         * @property [sortType = time-desc] - <p>告警排序方式 默认按时间倒序 time-asc 告警时间正序/time-desc 告警时间倒序/level-asc 告警级别正序/level-desc 告警级别倒序</p>
         */
        type QueryConfig = {
            acknowledged?: string;
            alarmLevel: number[];
            classNames?: string[];
            dcIds: string[];
            enableGlobal?: boolean;
            fromCiId: string;
            keyword: string;
            orAttrs: object[];
            sortType?: string;
        };
        /**
         * <p>告警等级配置</p>
         * @property color - <p>告警颜色，十六进制</p>
         * @property name - <p>告警级别名称</p>
         * @property sound - <p>告警声音配置</p>
         * @property sound.name - <p>告警声音名称</p>
         * @property sound.url - <p>告警声音资源url</p>
         */
        type LevelItemConfig = {
            color: string;
            name: string;
            sound: {
                name: string;
                url: string;
            };
        };
        /**
         * <p>激活告警系统</p>
         * @param purpose - <p>激活目的</p>
         */
        function activate(purpose: string): void;
        /**
         * <p>取消激活告警系统</p>
         * @param purpose - <p>取消激活目的</p>
         */
        function deactivate(purpose: string): void;
        /**
         * <p>告警系统是否激活</p>
         */
        function isActivated(): boolean;
        /**
         * <p>获取已存在的激活告警系统的目的</p>
         * @returns <ul>
         * <li>激活告警系统的目的</li>
         * </ul>
         */
        function getPurpose(): string[];
        /**
         * <p>激活3D告警效果</p>
         */
        function activateEffect(): void;
        /**
         * <p>取消激活3D告警效果</p>
         */
        function deactivateEffect(): void;
        /**
         * <p>3D告警效果是否被激活</p>
         */
        function isEffectActivated(): boolean;
        /**
         * <p>激活告警声音效果</p>
         */
        function activateSound(): void;
        /**
         * <p>取消激活告警声音效果</p>
         */
        function deactivateSound(): void;
        /**
         * <p>告警声音效果是否被激活</p>
         */
        function isSoundActivated(): boolean;
        /**
         * <p>告警系统是否初始化完成</p>
         */
        function isInitialized(): boolean;
        /**
         * <p>获取告警级别配置</p>
         * @returns <ul>
         * <li>告警级别配置</li>
         * </ul>
         */
        function getLevelConfig(): Map<number, THINGX.Alarm.LevelItemConfig>;
        /**
         * <p>获取告警查询配置</p>
         */
        function getQueryConfig(): AlarmQueryConfig;
        /**
         * <p>设置告警查询配置</p>
         * @example
         * // 设置查询告警级别为 1,2,3 级的告警
         * THINGX.Alarm.setQueryConfig({
         *     alarmLevel: [1,2,3]
         * });
         * // 设置查询孪生体业务分类为 '温湿度感应器' 的告警数据
         * THINGX.Alarm.setQueryConfig({
         *     classNames: ['温湿度感应器']
         * });
         * // 根据孪生体属性筛选告警
         * THINGX.Alarm.setQueryConfig({
         *     orAttrs:[{ "key": '业务分类', "value":"空调", "optType": 1 }]
         * });
         * @param config - <p>告警查询配置</p>
         * @param [isRemoteData = true] - <p>是否立即请求告警</p>
         */
        function setQueryConfig(config: THINGX.Alarm.QueryConfig, isRemoteData?: boolean): void;
        /**
         * <p>获取所有告警数据</p>
         */
        function getAllData(): any;
        /**
         * <p>获取全局告警数据最高告警级别 数值约小级别越高, 默认1为最高级，对应“严重”告警级别，依次向下排</p>
         */
        function getHighestLevel(): number | null;
        /**
         * <p>获取孪生体上最高告警级别数据</p>
         * @param digitalTwin - <p>孪生体对象</p>
         * @param isTraverse - <p>是否遍历该孪生体的孩子</p>
         */
        function getHighestLevelDataWithTwin(digitalTwin: THING.BaseObject, isTraverse: boolean): any | null;
        /**
         * <p>开始请求后台接口更新所有告警信息，activate后会自动调用，尽量使用activate来控制告警系统</p>
         */
        function startRequestData(): void;
        /**
         * <p>告警查询配置</p>
         * @property [acknowledged] - <p>处理状态</p>
         * @property alarmLevel - <p>告警级别</p>
         * @property [classNames = [1, 2, 3, 4]] - <p>孪生体业务分类，默认为空数组代表所有</p>
         * @property dcIds - <p>场景的数据库ID数组（<em>DBID</em>）</p>
         * @property [enableGlobal = false/true] - <p>开启全局查询，当前层级是地图的话默认true，园区默认false。当为true时，需要设置dcIds</p>
         * @property fromCiId - <p>查询的起始层级的数据库ID（<em>DBID</em>）</p>
         * @property keyword - <p>搜索关键词，会匹配孪生体的名称，告警详情</p>
         * @property orAttrs - <p>孪生体属性条件筛选 默认空数组代表没有过滤条件</p>
         * @property [sortType = time-desc] - <p>告警排序方式 默认按时间倒序 time-asc 告警时间正序/time-desc 告警时间倒序/level-asc 告警级别正序/level-desc 告警级别倒序</p>
         */
        type QueryConfig = {
            acknowledged?: string;
            alarmLevel: number[];
            classNames?: string[];
            dcIds: string[];
            enableGlobal?: boolean;
            fromCiId: string;
            keyword: string;
            orAttrs: object[];
            sortType?: string;
        };
        /**
         * <p>告警等级配置</p>
         * @property color - <p>告警颜色，十六进制</p>
         * @property name - <p>告警级别名称</p>
         * @property sound - <p>告警声音配置</p>
         * @property sound.name - <p>告警声音名称</p>
         * @property sound.url - <p>告警声音资源url</p>
         */
        type LevelItemConfig = {
            color: string;
            name: string;
            sound: {
                name: string;
                url: string;
            };
        };
        /**
         * <p>激活告警系统</p>
         * @param purpose - <p>激活目的</p>
         */
        function activate(purpose: string): void;
        /**
         * <p>取消激活告警系统</p>
         * @param purpose - <p>取消激活目的</p>
         */
        function deactivate(purpose: string): void;
        /**
         * <p>告警系统是否激活</p>
         */
        function isActivated(): boolean;
        /**
         * <p>获取已存在的激活告警系统的目的</p>
         * @returns <ul>
         * <li>激活告警系统的目的</li>
         * </ul>
         */
        function getPurpose(): string[];
        /**
         * <p>激活3D告警效果</p>
         */
        function activateEffect(): void;
        /**
         * <p>取消激活3D告警效果</p>
         */
        function deactivateEffect(): void;
        /**
         * <p>3D告警效果是否被激活</p>
         */
        function isEffectActivated(): boolean;
        /**
         * <p>激活告警声音效果</p>
         */
        function activateSound(): void;
        /**
         * <p>取消激活告警声音效果</p>
         */
        function deactivateSound(): void;
        /**
         * <p>告警声音效果是否被激活</p>
         */
        function isSoundActivated(): boolean;
        /**
         * <p>告警系统是否初始化完成</p>
         */
        function isInitialized(): boolean;
        /**
         * <p>获取告警级别配置</p>
         * @returns <ul>
         * <li>告警级别配置</li>
         * </ul>
         */
        function getLevelConfig(): Map<number, THINGX.Alarm.LevelItemConfig>;
        /**
         * <p>获取告警查询配置</p>
         */
        function getQueryConfig(): AlarmQueryConfig;
        /**
         * <p>设置告警查询配置</p>
         * @example
         * // 设置查询告警级别为 1,2,3 级的告警
         * THINGX.Alarm.setQueryConfig({
         *     alarmLevel: [1,2,3]
         * });
         * // 设置查询孪生体业务分类为 '温湿度感应器' 的告警数据
         * THINGX.Alarm.setQueryConfig({
         *     classNames: ['温湿度感应器']
         * });
         * // 根据孪生体属性筛选告警
         * THINGX.Alarm.setQueryConfig({
         *     orAttrs:[{ "key": '业务分类', "value":"空调", "optType": 1 }]
         * });
         * @param config - <p>告警查询配置</p>
         * @param [isRemoteData = true] - <p>是否立即请求告警</p>
         */
        function setQueryConfig(config: THINGX.Alarm.QueryConfig, isRemoteData?: boolean): void;
        /**
         * <p>获取所有告警数据</p>
         */
        function getAllData(): any;
        /**
         * <p>获取全局告警数据最高告警级别 数值约小级别越高, 默认1为最高级，对应“严重”告警级别，依次向下排</p>
         */
        function getHighestLevel(): number | null;
        /**
         * <p>获取孪生体上最高告警级别数据</p>
         * @param digitalTwin - <p>孪生体对象</p>
         * @param isTraverse - <p>是否遍历该孪生体的孩子</p>
         */
        function getHighestLevelDataWithTwin(digitalTwin: THING.BaseObject, isTraverse: boolean): any | null;
        /**
         * <p>开始请求后台接口更新所有告警信息，activate后会自动调用，尽量使用activate来控制告警系统</p>
         */
        function startRequestData(): void;
    }
    /**
     * <p>App模块</p>
     */
    namespace App {
        /**
         * <p>当前app</p>
         */
        var App.current: THING.App | undefined;
        /**
         * <p>当前层级孪生体对象</p>
         */
        var App.currentLevel: THING.BaseObject | undefined;
        /**
         * <p>当前app</p>
         */
        var App.current: THING.App | undefined;
        /**
         * <p>当前选择的第一个孪生体对象</p>
         */
        var App.currentSelected: THING.BaseObject | undefined;
        /**
         * <p>当前场景信息</p>
         */
        var App.sceneInfo: any;
        /**
         * <p>当前场景CICode</p>
         */
        var App.sceneCICode: string;
        /**
         * <p>通过ThingJS语法查询当前app下孪生体集合</p>
         * @param expression - <p>ThingJS语法表达式</p>
         * @returns <ul>
         * <li>查询到的孪生体</li>
         * </ul>
         */
        function App.queryWithThingJSExpression(expression: string): THING.BaseObject[];
        /**
         * <p>当前ThingJS-X版本号</p>
         */
        var App.version: string;
        /**
         * <p>当前使用的标记库版本号</p>
         */
        var App.vendorMarkerVersion: string;
        /**
         * <p>当前使用的ThingJS的版本号</p>
         */
        var App.vendorThingJSVersion: string;
        /**
         * <p>当前使用的地图的版本号</p>
         */
        var App.vendorGeoVersion: string;
        /**
         * <p>当前app</p>
         */
        var App.current: THING.App | undefined;
        /**
         * <p>当前层级孪生体对象</p>
         */
        var App.currentLevel: THING.BaseObject | undefined;
        /**
         * <p>当前app</p>
         */
        var App.current: THING.App | undefined;
        /**
         * <p>当前选择的第一个孪生体对象</p>
         */
        var App.currentSelected: THING.BaseObject | undefined;
        /**
         * <p>当前场景信息</p>
         */
        var App.sceneInfo: any;
        /**
         * <p>当前场景CICode</p>
         */
        var App.sceneCICode: string;
        /**
         * <p>通过ThingJS语法查询当前app下孪生体集合</p>
         * @param expression - <p>ThingJS语法表达式</p>
         * @returns <ul>
         * <li>查询到的孪生体</li>
         * </ul>
         */
        function App.queryWithThingJSExpression(expression: string): THING.BaseObject[];
        /**
         * <p>当前ThingJS-X版本号</p>
         */
        var App.version: string;
        /**
         * <p>当前使用的标记库版本号</p>
         */
        var App.vendorMarkerVersion: string;
        /**
         * <p>当前使用的ThingJS的版本号</p>
         */
        var App.vendorThingJSVersion: string;
        /**
         * <p>当前使用的地图的版本号</p>
         */
        var App.vendorGeoVersion: string;
    }
    /**
     * <p>业务模块</p>
     */
    namespace Business {
        /**
         * <p>显示业务模块</p>
         */
        function show(): void;
        /**
         * <p>隐藏业务模块</p>
         */
        function hide(): void;
        /**
         * <p>获取指定层级下指定名称业务</p>
         * @param [level = THINGX.App.currentLevel] - <p>指定层级</p>
         * @param [name=] - <p>业务名称，为空则获取指定层级下所有业务</p>
         * @returns <ul>
         * <li>业务实例</li>
         * </ul>
         */
        function get(level?: THING.BaseObject | THINGX.CONST.DEFAULT_DIGITAL_TWIN_CLASS, name=?: string): object[];
        /**
         * <p>激活业务</p>
         * @param name - <p>业务名称</p>
         */
        function activate(name: string): void;
        /**
         * <p>取消激活当前业务</p>
         */
        function deactivate(): void;
        /**
         * <p>获取当前激活的业务信息</p>
         */
        function getActivated(): any;
        /**
         * <p>重新读取可视化配置 并根据当前层级重新创建业务</p>
         * @returns <ul>
         * <li>是否刷新成功</li>
         * </ul>
         */
        function refresh(): Promise<boolean>;
        /**
         * <p>显示业务面板- 建议通过activate激活业务</p>
         * @param name - <p>业务名称</p>
         */
        function showPanel(name: string): void;
        /**
         * <p>隐藏业务面板 - 建议通过deactivate取消激活业务</p>
         * @param name - <p>业务名称</p>
         */
        function hidePanel(name: string): void;
        /**
         * <p>获取业务配置</p>
         * @param [level = THINGX.App.currentLevel] - <p>孪生体对象/孪生体分类</p>
         * @param [name=] - <p>业务名称，非空的话返回指定配置，否则返回所有配置</p>
         */
        function getConfig(level?: THING.BaseObject | THINGX.CONST.DEFAULT_DIGITAL_TWIN_CLASS, name=?: string): any | null;
        /**
         * <p>获取当前业务面板配置</p>
         */
        function getPanelConfig(): any | null;
        /**
         * <p>获取当前激活的业务名称</p>
         * @param [isFullName = false] - <p>是否获取业务全称</p>
         * @returns <ul>
         * <li>当前激活的业务名称/全称</li>
         * </ul>
         */
        function getCurrentName(isFullName?: boolean): string;
        /**
         * <p>显示业务模块</p>
         */
        function show(): void;
        /**
         * <p>隐藏业务模块</p>
         */
        function hide(): void;
        /**
         * <p>获取指定层级下指定名称业务</p>
         * @param [level = THINGX.App.currentLevel] - <p>指定层级</p>
         * @param [name=] - <p>业务名称，为空则获取指定层级下所有业务</p>
         * @returns <ul>
         * <li>业务实例</li>
         * </ul>
         */
        function get(level?: THING.BaseObject | THINGX.CONST.DEFAULT_DIGITAL_TWIN_CLASS, name=?: string): object[];
        /**
         * <p>激活业务</p>
         * @param name - <p>业务名称</p>
         */
        function activate(name: string): void;
        /**
         * <p>取消激活当前业务</p>
         */
        function deactivate(): void;
        /**
         * <p>获取当前激活的业务信息</p>
         */
        function getActivated(): any;
        /**
         * <p>重新读取可视化配置 并根据当前层级重新创建业务</p>
         * @returns <ul>
         * <li>是否刷新成功</li>
         * </ul>
         */
        function refresh(): Promise<boolean>;
        /**
         * <p>显示业务面板- 建议通过activate激活业务</p>
         * @param name - <p>业务名称</p>
         */
        function showPanel(name: string): void;
        /**
         * <p>隐藏业务面板 - 建议通过deactivate取消激活业务</p>
         * @param name - <p>业务名称</p>
         */
        function hidePanel(name: string): void;
        /**
         * <p>获取业务配置</p>
         * @param [level = THINGX.App.currentLevel] - <p>孪生体对象/孪生体分类</p>
         * @param [name=] - <p>业务名称，非空的话返回指定配置，否则返回所有配置</p>
         */
        function getConfig(level?: THING.BaseObject | THINGX.CONST.DEFAULT_DIGITAL_TWIN_CLASS, name=?: string): any | null;
        /**
         * <p>获取当前业务面板配置</p>
         */
        function getPanelConfig(): any | null;
        /**
         * <p>获取当前激活的业务名称</p>
         * @param [isFullName = false] - <p>是否获取业务全称</p>
         * @returns <ul>
         * <li>当前激活的业务名称/全称</li>
         * </ul>
         */
        function getCurrentName(isFullName?: boolean): string;
    }
    /**
     * <p>摄像机模块</p>
     */
    namespace Camera {
        /**
         * @property position - <p>摄相机位置</p>
         * @property target - <p>摄像机看点</p>
         */
        type Pose = {
            position: number[];
            target: number[];
        };
        /**
         * <p>飞到最佳视角查看孪生体</p>
         * @example
         * // 单个孪生体飞行
         * const currentLevel = THINGX.App.currentLevel;
         * cosnt pose = THINGX.Camera.getPoseWithDigitalTwin(currentLevel, {
         *     x: 30, y: 60, z: 1, tx: 0, ty: 0, tr: 0
         * });
         * THINGX.Camera.flyTo(currentLevel, {
         *     complete: (ev) => {
         *         console.log('飞行完毕')
         *     },
         *     pose: pose,
         *     time: 2000,
         * });
         *
         * // 孪生体集合飞行
         * let dir = THING.Math.scaleVector(THING.App.current.camera.direction, -1); // 默认方向向量
         * dir[0] += 1;
         * const pose = THINGX.Camera.getPoseWithDigitalTwinSet(THINGX.CONST.DEFAULT_DIGITAL_TWIN_CLASS.BUILDING, {
         *     useDir: dir,
         *     radiusScale: 1.5,
         * });
         * THINGX.Camera.flyTo(THINGX.CONST.DEFAULT_DIGITAL_TWIN_CLASS.BUILDING, {
         *     complete: (ev) => {
         *         console.log('飞行完毕')
         *     },
         *     pose: pose,
         *     time: 2000,
         * });
         * @param digitalTwin - <p>孪生体/孪生体集合/ThingJS查询表达式</p>
         * @param [config = {}] - <p>飞行指定配置</p>
         * @param [config.keepLevel = false] - <p>是否保持当前层级</p>
         * @param [config.complete] - <p>摄像机飞行完成回调函数</p>
         * @param [config.time] - <p>摄像机飞行时间，不传的话会根据摄像机姿势和孪生体对象计算一个最佳的飞行时间</p>
         * @param [config.pose] - <p>摄像机姿势，不传的话会计算最佳的摄像机姿势</p>
         */
        function flyTo(digitalTwin: THING.BaseObject | THING.BaseObject[] | string, config?: {
            keepLevel?: boolean;
            complete?: (...params: any[]) => any;
            time?: number;
            pose?: THINGX.Camera.Pose;
        }): void;
        /**
         * <p>通过孪生体获取摄像机姿势</p>
         * @example
         * const currentLevel = THINGX.App.currentLevel;
         * THINGX.Camera.getPoseWithDigitalTwin(currentLevel, {
         *     x: 30, y: 60, z: 1, tx: 0, ty: 0, tr: 0
         * });
         * @param digitalTwin - <p>孪生体</p>
         * @param [config = {}] - <p>飞到对象的参数，当digitalTwin为单个孪生体且opts.keepDir不为true时生效</p>
         * @param [config.x = 30] - <p>position yaw 摄像机位置沿x轴旋转角度</p>
         * @param [config.y = 45] - <p>position pitch 摄像机位置沿y轴旋转角度</p>
         * @param [config.z = 2] - <p>position radius factor 摄像机位置距离孪生体包围盒半径倍数，1是刚好看到飞到物体的整个包围盒</p>
         * @param [config.tx = 0] - <p>target yaw 摄像机看点沿x轴旋转角度</p>
         * @param [config.ty = 0] - <p>target pitch 摄像机看点沿y轴旋转角度</p>
         * @param [config.tr = 0] - <p>target radius factor 摄像机看点距离孪生体包围中心距离</p>
         * @param opts - <p>计算设置</p>
         * @param [opts.isRecursive = false] - <p>是否遍历子对象</p>
         * @param [opts.isForceReCalc = true] - <p>是否强制重新计算</p>
         */
        function getPoseWithDigitalTwin(digitalTwin: THING.BaseObject, config?: {
            x?: number;
            y?: number;
            z?: number;
            tx?: number;
            ty?: number;
            tr?: number;
        }, opts: {
            isRecursive?: boolean;
            isForceReCalc?: boolean;
        }): THINGX.Camera.Pose | null;
        /**
         * <p>通过孪生体集合获取摄像机姿势</p>
         * @example
         * let dir = THING.Math.scaleVector(THING.App.current.camera.direction, -1); // 默认方向向量
         * dir[0] += 1;
         * let pose = THINGX.Camera.getPoseWithDigitalTwinSet(THINGX.CONST.DEFAULT_DIGITAL_TWIN_CLASS.BUILDING, {
         *     useDir: dir,
         *     radiusScale: 1.5,
         * });
         * @param digitalTwin - <p>孪生体集合/ThingJS查询表达式</p>
         * @param [opts.isRecursive = false] - <p>是否遍历子对象</p>
         * @param [opts.radiusScale = 1] - <p>距离包围盒半径倍数，digitalTwin为孪生体集合时生效</p>
         * @param [opts.useDir = THING.App.current.camera.direction*-1] - <p>摄像机朝向，digitalTwin为孪生体集合时生效</p>
         */
        function getPoseWithDigitalTwinSet(digitalTwin: THING.BaseObject[] | string, opts: {
            isRecursive?: boolean;
            radiusScale?: number;
            useDir?: number[];
        }): THINGX.Camera.Pose | null;
        /**
         * <p>获取摄像机姿势 建议使用getPoseWithDigitalTwin和getPoseWithDigitalTwinSet获取摄像机姿势</p>
         * @param digitalTwin - <p>孪生体/孪生体集合/ThingJS查询表达式</p>
         * @param [flyToConfig = {}] - <p>飞到对象的参数，当digitalTwin为单个孪生体且opts.keepDir不为true时生效</p>
         * @param [flyToConfig.x = 30] - <p>position yaw 摄像机位置沿x轴旋转角度</p>
         * @param [flyToConfig.y = 45] - <p>position pitch 摄像机位置沿y轴旋转角度</p>
         * @param [flyToConfig.z = 2] - <p>position radius factor 摄像机位置距离孪生体包围盒半径倍数，1是刚好看到飞到物体的整个包围盒</p>
         * @param [flyToConfig.tx = 0] - <p>target yaw 摄像机看点沿x轴旋转角度</p>
         * @param [flyToConfig.ty = 0] - <p>target pitch 摄像机看点沿y轴旋转角度</p>
         * @param [flyToConfig.tr = 0] - <p>target radius factor 摄像机看点距离孪生体包围盒半径倍数</p>
         * @param [opts = {}] - <p>飞到最佳视角计算配置</p>
         * @param [opts.isForceReCalc = false] - <p>是否强制重新计算，当digitalTwin为单个孪生体生效</p>
         * @param [opts.isRecursive = false] - <p>是否遍历子对象</p>
         * @param [opts.radiusScale = 1] - <p>距离包围盒半径倍数，digitalTwin为孪生体集合时生效</p>
         * @param [opts.keepDir = false] - <p>保持当前朝向</p>
         * @param [opts.useDir = THING.App.current.camera.direction*-1] - <p>朝向vector3，digitalTwin为孪生体集合时生效</p>
         */
        function getPose(digitalTwin: THING.BaseObject | THING.BaseObject[] | string, flyToConfig?: {
            x?: number;
            y?: number;
            z?: number;
            tx?: number;
            ty?: number;
            tr?: number;
        }, opts?: {
            isForceReCalc?: boolean;
            isRecursive?: boolean;
            radiusScale?: number;
            keepDir?: boolean;
            useDir?: number[];
        }): THINGX.Camera.Pose | null;
        /**
         * <p>获取视点配置</p>
         */
        function getConfig(): any;
        /**
         * @property position - <p>摄相机位置</p>
         * @property target - <p>摄像机看点</p>
         */
        type Pose = {
            position: number[];
            target: number[];
        };
        /**
         * <p>飞到最佳视角查看孪生体</p>
         * @example
         * // 单个孪生体飞行
         * const currentLevel = THINGX.App.currentLevel;
         * cosnt pose = THINGX.Camera.getPoseWithDigitalTwin(currentLevel, {
         *     x: 30, y: 60, z: 1, tx: 0, ty: 0, tr: 0
         * });
         * THINGX.Camera.flyTo(currentLevel, {
         *     complete: (ev) => {
         *         console.log('飞行完毕')
         *     },
         *     pose: pose,
         *     time: 2000,
         * });
         *
         * // 孪生体集合飞行
         * let dir = THING.Math.scaleVector(THING.App.current.camera.direction, -1); // 默认方向向量
         * dir[0] += 1;
         * const pose = THINGX.Camera.getPoseWithDigitalTwinSet(THINGX.CONST.DEFAULT_DIGITAL_TWIN_CLASS.BUILDING, {
         *     useDir: dir,
         *     radiusScale: 1.5,
         * });
         * THINGX.Camera.flyTo(THINGX.CONST.DEFAULT_DIGITAL_TWIN_CLASS.BUILDING, {
         *     complete: (ev) => {
         *         console.log('飞行完毕')
         *     },
         *     pose: pose,
         *     time: 2000,
         * });
         * @param digitalTwin - <p>孪生体/孪生体集合/ThingJS查询表达式</p>
         * @param [config = {}] - <p>飞行指定配置</p>
         * @param [config.keepLevel = false] - <p>是否保持当前层级</p>
         * @param [config.complete] - <p>摄像机飞行完成回调函数</p>
         * @param [config.time] - <p>摄像机飞行时间，不传的话会根据摄像机姿势和孪生体对象计算一个最佳的飞行时间</p>
         * @param [config.pose] - <p>摄像机姿势，不传的话会计算最佳的摄像机姿势</p>
         */
        function flyTo(digitalTwin: THING.BaseObject | THING.BaseObject[] | string, config?: {
            keepLevel?: boolean;
            complete?: (...params: any[]) => any;
            time?: number;
            pose?: THINGX.Camera.Pose;
        }): void;
        /**
         * <p>通过孪生体获取摄像机姿势</p>
         * @example
         * const currentLevel = THINGX.App.currentLevel;
         * THINGX.Camera.getPoseWithDigitalTwin(currentLevel, {
         *     x: 30, y: 60, z: 1, tx: 0, ty: 0, tr: 0
         * });
         * @param digitalTwin - <p>孪生体</p>
         * @param [config = {}] - <p>飞到对象的参数，当digitalTwin为单个孪生体且opts.keepDir不为true时生效</p>
         * @param [config.x = 30] - <p>position yaw 摄像机位置沿x轴旋转角度</p>
         * @param [config.y = 45] - <p>position pitch 摄像机位置沿y轴旋转角度</p>
         * @param [config.z = 2] - <p>position radius factor 摄像机位置距离孪生体包围盒半径倍数，1是刚好看到飞到物体的整个包围盒</p>
         * @param [config.tx = 0] - <p>target yaw 摄像机看点沿x轴旋转角度</p>
         * @param [config.ty = 0] - <p>target pitch 摄像机看点沿y轴旋转角度</p>
         * @param [config.tr = 0] - <p>target radius factor 摄像机看点距离孪生体包围中心距离</p>
         * @param opts - <p>计算设置</p>
         * @param [opts.isRecursive = false] - <p>是否遍历子对象</p>
         * @param [opts.isForceReCalc = true] - <p>是否强制重新计算</p>
         */
        function getPoseWithDigitalTwin(digitalTwin: THING.BaseObject, config?: {
            x?: number;
            y?: number;
            z?: number;
            tx?: number;
            ty?: number;
            tr?: number;
        }, opts: {
            isRecursive?: boolean;
            isForceReCalc?: boolean;
        }): THINGX.Camera.Pose | null;
        /**
         * <p>通过孪生体集合获取摄像机姿势</p>
         * @example
         * let dir = THING.Math.scaleVector(THING.App.current.camera.direction, -1); // 默认方向向量
         * dir[0] += 1;
         * let pose = THINGX.Camera.getPoseWithDigitalTwinSet(THINGX.CONST.DEFAULT_DIGITAL_TWIN_CLASS.BUILDING, {
         *     useDir: dir,
         *     radiusScale: 1.5,
         * });
         * @param digitalTwin - <p>孪生体集合/ThingJS查询表达式</p>
         * @param [opts.isRecursive = false] - <p>是否遍历子对象</p>
         * @param [opts.radiusScale = 1] - <p>距离包围盒半径倍数，digitalTwin为孪生体集合时生效</p>
         * @param [opts.useDir = THING.App.current.camera.direction*-1] - <p>摄像机朝向，digitalTwin为孪生体集合时生效</p>
         */
        function getPoseWithDigitalTwinSet(digitalTwin: THING.BaseObject[] | string, opts: {
            isRecursive?: boolean;
            radiusScale?: number;
            useDir?: number[];
        }): THINGX.Camera.Pose | null;
        /**
         * <p>获取摄像机姿势 建议使用getPoseWithDigitalTwin和getPoseWithDigitalTwinSet获取摄像机姿势</p>
         * @param digitalTwin - <p>孪生体/孪生体集合/ThingJS查询表达式</p>
         * @param [flyToConfig = {}] - <p>飞到对象的参数，当digitalTwin为单个孪生体且opts.keepDir不为true时生效</p>
         * @param [flyToConfig.x = 30] - <p>position yaw 摄像机位置沿x轴旋转角度</p>
         * @param [flyToConfig.y = 45] - <p>position pitch 摄像机位置沿y轴旋转角度</p>
         * @param [flyToConfig.z = 2] - <p>position radius factor 摄像机位置距离孪生体包围盒半径倍数，1是刚好看到飞到物体的整个包围盒</p>
         * @param [flyToConfig.tx = 0] - <p>target yaw 摄像机看点沿x轴旋转角度</p>
         * @param [flyToConfig.ty = 0] - <p>target pitch 摄像机看点沿y轴旋转角度</p>
         * @param [flyToConfig.tr = 0] - <p>target radius factor 摄像机看点距离孪生体包围盒半径倍数</p>
         * @param [opts = {}] - <p>飞到最佳视角计算配置</p>
         * @param [opts.isForceReCalc = false] - <p>是否强制重新计算，当digitalTwin为单个孪生体生效</p>
         * @param [opts.isRecursive = false] - <p>是否遍历子对象</p>
         * @param [opts.radiusScale = 1] - <p>距离包围盒半径倍数，digitalTwin为孪生体集合时生效</p>
         * @param [opts.keepDir = false] - <p>保持当前朝向</p>
         * @param [opts.useDir = THING.App.current.camera.direction*-1] - <p>朝向vector3，digitalTwin为孪生体集合时生效</p>
         */
        function getPose(digitalTwin: THING.BaseObject | THING.BaseObject[] | string, flyToConfig?: {
            x?: number;
            y?: number;
            z?: number;
            tx?: number;
            ty?: number;
            tr?: number;
        }, opts?: {
            isForceReCalc?: boolean;
            isRecursive?: boolean;
            radiusScale?: number;
            keepDir?: boolean;
            useDir?: number[];
        }): THINGX.Camera.Pose | null;
        /**
         * <p>获取视点配置</p>
         */
        function getConfig(): any;
    }
    namespace CONST {
        /**
         * <p>默认孪生体分类</p>
         */
        enum DEFAULT_DIGITAL_TWIN_CLASS {
            /**
             * <p>园区</p>
             */
            CAMPUS = ".Campus",
            /**
             * <p>建筑</p>
             */
            BUILDING = ".Building",
            /**
             * <p>楼层</p>
             */
            FLOOR = ".Floor",
            /**
             * <p>房间</p>
             */
            ROOM = ".Room",
            /**
             * <p>地图</p>
             */
            GEO_CAMPUS = ".GeoCampus"
        }
        /**
         * <p>插件类型</p>
         */
        enum PLUGIN_TYPE {
            /**
             * <p>操作原子插件</p>
             */
            ACTION = "action",
            /**
             * <p>图表</p>
             */
            CHART = "chart",
            /**
             * <p>核心插件</p>
             */
            CORE = "core",
            /**
             * <p>扩展插件</p>
             */
            EXPAND = "expand",
            /**
             * <p>效果模版</p>
             */
            THEME = "theme"
        }
        /**
         * <p>加载javascript脚本类型</p>
         */
        enum JS_LOAD_TYPE {
            /**
             * <p>通过script标签加载</p>
             */
            TAG = "tag",
            /**
             * <p>以动态执行加载的脚本内容方式加载</p>
             */
            EXEC = "exec"
        }
        /**
         * <p>javascript资源类型</p>
         */
        enum JS_SRC_TYPE {
            /**
             * <p>url路径方式</p>
             */
            URL = "url",
            /**
             * <p>源脚本方式</p>
             */
            CONTENT = "content"
        }
        /**
         * <p>默认孪生体分类</p>
         */
        enum DEFAULT_DIGITAL_TWIN_CLASS {
            /**
             * <p>园区</p>
             */
            CAMPUS = ".Campus",
            /**
             * <p>建筑</p>
             */
            BUILDING = ".Building",
            /**
             * <p>楼层</p>
             */
            FLOOR = ".Floor",
            /**
             * <p>房间</p>
             */
            ROOM = ".Room",
            /**
             * <p>地图</p>
             */
            GEO_CAMPUS = ".GeoCampus"
        }
        /**
         * <p>插件类型</p>
         */
        enum PLUGIN_TYPE {
            /**
             * <p>操作原子插件</p>
             */
            ACTION = "action",
            /**
             * <p>图表</p>
             */
            CHART = "chart",
            /**
             * <p>核心插件</p>
             */
            CORE = "core",
            /**
             * <p>扩展插件</p>
             */
            EXPAND = "expand",
            /**
             * <p>效果模版</p>
             */
            THEME = "theme"
        }
        /**
         * <p>加载javascript脚本类型</p>
         */
        enum JS_LOAD_TYPE {
            /**
             * <p>通过script标签加载</p>
             */
            TAG = "tag",
            /**
             * <p>以动态执行加载的脚本内容方式加载</p>
             */
            EXEC = "exec"
        }
        /**
         * <p>javascript资源类型</p>
         */
        enum JS_SRC_TYPE {
            /**
             * <p>url路径方式</p>
             */
            URL = "url",
            /**
             * <p>源脚本方式</p>
             */
            CONTENT = "content"
        }
    }
    /**
     * <p>数据辅助模块</p>
     */
    namespace DataHelper {
        /**
         * <p>数组模块</p>
         */
        namespace Array {
            /**
             * <p>在数组末尾追加元素</p>
             * @param array - <p>目标数组</p>
             * @param val - <p>待增加的元素</p>
             * @param [isForce = false] - <p>是否强制增加，强制则不判断数组中是否已经存在</p>
             * @returns <ul>
             * <li>增加元素或已存在元素的索引</li>
             * </ul>
             */
            function push(array: any[], val: any, isForce?: boolean): number;
            /**
             * <p>根据索引数组删除数组元素</p>
             * @param array - <p>数组</p>
             * @param indexArray - <p>序列数组</p>
             */
            function removeWithIndexArray(array: any[], indexArray: number[]): any[];
            /**
             * <p>在数组中去除重复项，稳定的（保留第一个）</p>
             * @param array - <p>原始数组</p>
             * @returns <ul>
             * <li>删除了重复项的数组</li>
             * </ul>
             */
            function unique(array: any[]): any[];
            /**
             * <p>根据keys值，构造新数组只包含keys中包含的key</p>
             * @param array - <p>源数组</p>
             * @param keys - <p>要取的键值数组</p>
             * @param [isAllowNull = false] - <p>是否允许值为空，默认不允许</p>
             * @returns <p>[{key1:XX,key2:XX},{key1:XX,key2:XX}]</p>
             */
            function getWithKeys(array: any[], keys: string[], isAllowNull?: boolean): any[];
            /**
             * <p>删除数组中array1中存在与数值array2中相同的元素</p>
             * @param array1 - <p>原始数组</p>
             * @param array2 - <p>校样数组</p>
             * @returns <p>返回新数组</p>
             */
            function subtract(array1: any[], array2: any[]): any[];
            /**
             * <p>在数组末尾追加元素</p>
             * @param array - <p>目标数组</p>
             * @param val - <p>待增加的元素</p>
             * @param [isForce = false] - <p>是否强制增加，强制则不判断数组中是否已经存在</p>
             * @returns <ul>
             * <li>增加元素或已存在元素的索引</li>
             * </ul>
             */
            function push(array: any[], val: any, isForce?: boolean): number;
            /**
             * <p>根据索引数组删除数组元素</p>
             * @param array - <p>数组</p>
             * @param indexArray - <p>序列数组</p>
             */
            function removeWithIndexArray(array: any[], indexArray: number[]): any[];
            /**
             * <p>在数组中去除重复项，稳定的（保留第一个）</p>
             * @param array - <p>原始数组</p>
             * @returns <ul>
             * <li>删除了重复项的数组</li>
             * </ul>
             */
            function unique(array: any[]): any[];
            /**
             * <p>根据keys值，构造新数组只包含keys中包含的key</p>
             * @param array - <p>源数组</p>
             * @param keys - <p>要取的键值数组</p>
             * @param [isAllowNull = false] - <p>是否允许值为空，默认不允许</p>
             * @returns <p>[{key1:XX,key2:XX},{key1:XX,key2:XX}]</p>
             */
            function getWithKeys(array: any[], keys: string[], isAllowNull?: boolean): any[];
            /**
             * <p>删除数组中array1中存在与数值array2中相同的元素</p>
             * @param array1 - <p>原始数组</p>
             * @param array2 - <p>校样数组</p>
             * @returns <p>返回新数组</p>
             */
            function subtract(array1: any[], array2: any[]): any[];
        }
        /**
         * <p>对象模块</p>
         */
        namespace Object {
            /**
             * <p>合并两个对象</p>
             * @param srcObj - <p>源对象</p>
             * @param destObj - <p>目标对象</p>
             * @param [isDeep = true] - <p>是否深拷贝</p>
             * @param [isNew = false] - <p>是否返回新对象，否则影响源对象</p>
             * @returns <ul>
             * <li>合并后的对象</li>
             * </ul>
             */
            function merge(srcObj: any, destObj: any, isDeep?: boolean, isNew?: boolean): any;
            /**
             * <p>拷贝对象</p>
             * @example
             * const myclone = THINGX.Utils.clone(obj);
             * @param obj - <p>需要被拷贝的对象</p>
             * @param [isDeep = true] - <p>是否深拷贝</p>
             * @param [endCheck = () => {return false;}] - <p>停止拷贝的条件函数</p>
             */
            function clone(obj: any, isDeep?: boolean, endCheck?: (...params: any[]) => any): any;
            /**
             * <p>获取对象第一个key</p>
             * @param obj - <p>对象</p>
             */
            function getFirstKey(obj: any): any;
            /**
             * <p>获取对象第一个值</p>
             * @param obj - <p>对象</p>
             */
            function getFirstValue(obj: any): any;
            /**
             * <p>对象是否为空</p>
             * @param obj - <p>对象</p>
             */
            function isEmpty(obj: any): boolean;
            /**
             * <p>从obj1中删除obj2中已有的元素</p>
             * @param obj1 - <p>对象1</p>
             * @param obj2 - <p>对象2</p>
             * @param [isCheckVal = false] - <p>是否对比元素值一样</p>
             * @returns <ul>
             * <li>新对象，obj1的子集</li>
             * </ul>
             */
            function subtract(obj1: any, obj2: any, isCheckVal?: boolean): any;
            /**
             * <p>合并两个对象</p>
             * @param srcObj - <p>源对象</p>
             * @param destObj - <p>目标对象</p>
             * @param [isDeep = true] - <p>是否深拷贝</p>
             * @param [isNew = false] - <p>是否返回新对象，否则影响源对象</p>
             * @returns <ul>
             * <li>合并后的对象</li>
             * </ul>
             */
            function merge(srcObj: any, destObj: any, isDeep?: boolean, isNew?: boolean): any;
            /**
             * <p>拷贝对象</p>
             * @example
             * const myclone = THINGX.Utils.clone(obj);
             * @param obj - <p>需要被拷贝的对象</p>
             * @param [isDeep = true] - <p>是否深拷贝</p>
             * @param [endCheck = () => {return false;}] - <p>停止拷贝的条件函数</p>
             */
            function clone(obj: any, isDeep?: boolean, endCheck?: (...params: any[]) => any): any;
            /**
             * <p>获取对象第一个key</p>
             * @param obj - <p>对象</p>
             */
            function getFirstKey(obj: any): any;
            /**
             * <p>获取对象第一个值</p>
             * @param obj - <p>对象</p>
             */
            function getFirstValue(obj: any): any;
            /**
             * <p>对象是否为空</p>
             * @param obj - <p>对象</p>
             */
            function isEmpty(obj: any): boolean;
            /**
             * <p>从obj1中删除obj2中已有的元素</p>
             * @param obj1 - <p>对象1</p>
             * @param obj2 - <p>对象2</p>
             * @param [isCheckVal = false] - <p>是否对比元素值一样</p>
             * @returns <ul>
             * <li>新对象，obj1的子集</li>
             * </ul>
             */
            function subtract(obj1: any, obj2: any, isCheckVal?: boolean): any;
        }
        /**
         * <p>字符串模块</p>
         */
        namespace String { }
        /**
         * <p>字符串模块</p>
         */
        namespace Time {
            /**
             * <p>延时某段时间，只执行最后一次
             * 类似于requestAnimationFrame</p>
             * @param fn - <p>执行函数</p>
             */
            function delay(fn: any, _a: any): void;
            /**
             * <p>延时某段时间，只执行最后一次
             * 类似于requestAnimationFrame</p>
             * @param fn - <p>执行函数</p>
             */
            function delay(fn: any, _a: any): void;
        }
        /**
         * <p>vector3向量模块</p>
         */
        namespace Vector {
            /**
             * <p>两个向量加</p>
             * @param vec1 - <p>向量1</p>
             * @param vec2 - <p>向量2</p>
             */
            function add(vec1: number[], vec2: number[]): number[];
            /**
             * <p>向量与数值相乘</p>
             * @param vec - <p>向量</p>
             * @param num - <p>数值</p>
             */
            function multiplyNumber(vec: number[], num: number): number[];
            /**
             * <p>两个向量相减, vec1 - vec2</p>
             * @param vec1 - <p>向量1</p>
             * @param vec2 - <p>向量2</p>
             */
            function subtract(vec1: number[], vec2: number[]): number[];
            /**
             * <p>向量标准化</p>
             * @param vec - <p>向量</p>
             */
            function normalize(vec: number[]): number[];
            /**
             * <p>获取向量长度</p>
             * @param vec - <p>向量</p>
             */
            function length(vec: number[]): number;
            /**
             * <p>获取两个向量之间的距离</p>
             * @param vec1 - <p>向量1</p>
             * @param vec2 - <p>向量2</p>
             */
            function distance(vec1: number[], vec2: number[]): number;
            /**
             * <p>两个向量加</p>
             * @param vec1 - <p>向量1</p>
             * @param vec2 - <p>向量2</p>
             */
            function add(vec1: number[], vec2: number[]): number[];
            /**
             * <p>向量与数值相乘</p>
             * @param vec - <p>向量</p>
             * @param num - <p>数值</p>
             */
            function multiplyNumber(vec: number[], num: number): number[];
            /**
             * <p>两个向量相减, vec1 - vec2</p>
             * @param vec1 - <p>向量1</p>
             * @param vec2 - <p>向量2</p>
             */
            function subtract(vec1: number[], vec2: number[]): number[];
            /**
             * <p>向量标准化</p>
             * @param vec - <p>向量</p>
             */
            function normalize(vec: number[]): number[];
            /**
             * <p>获取向量长度</p>
             * @param vec - <p>向量</p>
             */
            function length(vec: number[]): number;
            /**
             * <p>获取两个向量之间的距离</p>
             * @param vec1 - <p>向量1</p>
             * @param vec2 - <p>向量2</p>
             */
            function distance(vec1: number[], vec2: number[]): number;
        }
        /**
         * <p>数组模块</p>
         */
        namespace Array {
            /**
             * <p>在数组末尾追加元素</p>
             * @param array - <p>目标数组</p>
             * @param val - <p>待增加的元素</p>
             * @param [isForce = false] - <p>是否强制增加，强制则不判断数组中是否已经存在</p>
             * @returns <ul>
             * <li>增加元素或已存在元素的索引</li>
             * </ul>
             */
            function push(array: any[], val: any, isForce?: boolean): number;
            /**
             * <p>根据索引数组删除数组元素</p>
             * @param array - <p>数组</p>
             * @param indexArray - <p>序列数组</p>
             */
            function removeWithIndexArray(array: any[], indexArray: number[]): any[];
            /**
             * <p>在数组中去除重复项，稳定的（保留第一个）</p>
             * @param array - <p>原始数组</p>
             * @returns <ul>
             * <li>删除了重复项的数组</li>
             * </ul>
             */
            function unique(array: any[]): any[];
            /**
             * <p>根据keys值，构造新数组只包含keys中包含的key</p>
             * @param array - <p>源数组</p>
             * @param keys - <p>要取的键值数组</p>
             * @param [isAllowNull = false] - <p>是否允许值为空，默认不允许</p>
             * @returns <p>[{key1:XX,key2:XX},{key1:XX,key2:XX}]</p>
             */
            function getWithKeys(array: any[], keys: string[], isAllowNull?: boolean): any[];
            /**
             * <p>删除数组中array1中存在与数值array2中相同的元素</p>
             * @param array1 - <p>原始数组</p>
             * @param array2 - <p>校样数组</p>
             * @returns <p>返回新数组</p>
             */
            function subtract(array1: any[], array2: any[]): any[];
            /**
             * <p>在数组末尾追加元素</p>
             * @param array - <p>目标数组</p>
             * @param val - <p>待增加的元素</p>
             * @param [isForce = false] - <p>是否强制增加，强制则不判断数组中是否已经存在</p>
             * @returns <ul>
             * <li>增加元素或已存在元素的索引</li>
             * </ul>
             */
            function push(array: any[], val: any, isForce?: boolean): number;
            /**
             * <p>根据索引数组删除数组元素</p>
             * @param array - <p>数组</p>
             * @param indexArray - <p>序列数组</p>
             */
            function removeWithIndexArray(array: any[], indexArray: number[]): any[];
            /**
             * <p>在数组中去除重复项，稳定的（保留第一个）</p>
             * @param array - <p>原始数组</p>
             * @returns <ul>
             * <li>删除了重复项的数组</li>
             * </ul>
             */
            function unique(array: any[]): any[];
            /**
             * <p>根据keys值，构造新数组只包含keys中包含的key</p>
             * @param array - <p>源数组</p>
             * @param keys - <p>要取的键值数组</p>
             * @param [isAllowNull = false] - <p>是否允许值为空，默认不允许</p>
             * @returns <p>[{key1:XX,key2:XX},{key1:XX,key2:XX}]</p>
             */
            function getWithKeys(array: any[], keys: string[], isAllowNull?: boolean): any[];
            /**
             * <p>删除数组中array1中存在与数值array2中相同的元素</p>
             * @param array1 - <p>原始数组</p>
             * @param array2 - <p>校样数组</p>
             * @returns <p>返回新数组</p>
             */
            function subtract(array1: any[], array2: any[]): any[];
        }
        /**
         * <p>对象模块</p>
         */
        namespace Object {
            /**
             * <p>合并两个对象</p>
             * @param srcObj - <p>源对象</p>
             * @param destObj - <p>目标对象</p>
             * @param [isDeep = true] - <p>是否深拷贝</p>
             * @param [isNew = false] - <p>是否返回新对象，否则影响源对象</p>
             * @returns <ul>
             * <li>合并后的对象</li>
             * </ul>
             */
            function merge(srcObj: any, destObj: any, isDeep?: boolean, isNew?: boolean): any;
            /**
             * <p>拷贝对象</p>
             * @example
             * const myclone = THINGX.Utils.clone(obj);
             * @param obj - <p>需要被拷贝的对象</p>
             * @param [isDeep = true] - <p>是否深拷贝</p>
             * @param [endCheck = () => {return false;}] - <p>停止拷贝的条件函数</p>
             */
            function clone(obj: any, isDeep?: boolean, endCheck?: (...params: any[]) => any): any;
            /**
             * <p>获取对象第一个key</p>
             * @param obj - <p>对象</p>
             */
            function getFirstKey(obj: any): any;
            /**
             * <p>获取对象第一个值</p>
             * @param obj - <p>对象</p>
             */
            function getFirstValue(obj: any): any;
            /**
             * <p>对象是否为空</p>
             * @param obj - <p>对象</p>
             */
            function isEmpty(obj: any): boolean;
            /**
             * <p>从obj1中删除obj2中已有的元素</p>
             * @param obj1 - <p>对象1</p>
             * @param obj2 - <p>对象2</p>
             * @param [isCheckVal = false] - <p>是否对比元素值一样</p>
             * @returns <ul>
             * <li>新对象，obj1的子集</li>
             * </ul>
             */
            function subtract(obj1: any, obj2: any, isCheckVal?: boolean): any;
            /**
             * <p>合并两个对象</p>
             * @param srcObj - <p>源对象</p>
             * @param destObj - <p>目标对象</p>
             * @param [isDeep = true] - <p>是否深拷贝</p>
             * @param [isNew = false] - <p>是否返回新对象，否则影响源对象</p>
             * @returns <ul>
             * <li>合并后的对象</li>
             * </ul>
             */
            function merge(srcObj: any, destObj: any, isDeep?: boolean, isNew?: boolean): any;
            /**
             * <p>拷贝对象</p>
             * @example
             * const myclone = THINGX.Utils.clone(obj);
             * @param obj - <p>需要被拷贝的对象</p>
             * @param [isDeep = true] - <p>是否深拷贝</p>
             * @param [endCheck = () => {return false;}] - <p>停止拷贝的条件函数</p>
             */
            function clone(obj: any, isDeep?: boolean, endCheck?: (...params: any[]) => any): any;
            /**
             * <p>获取对象第一个key</p>
             * @param obj - <p>对象</p>
             */
            function getFirstKey(obj: any): any;
            /**
             * <p>获取对象第一个值</p>
             * @param obj - <p>对象</p>
             */
            function getFirstValue(obj: any): any;
            /**
             * <p>对象是否为空</p>
             * @param obj - <p>对象</p>
             */
            function isEmpty(obj: any): boolean;
            /**
             * <p>从obj1中删除obj2中已有的元素</p>
             * @param obj1 - <p>对象1</p>
             * @param obj2 - <p>对象2</p>
             * @param [isCheckVal = false] - <p>是否对比元素值一样</p>
             * @returns <ul>
             * <li>新对象，obj1的子集</li>
             * </ul>
             */
            function subtract(obj1: any, obj2: any, isCheckVal?: boolean): any;
        }
        /**
         * <p>字符串模块</p>
         */
        namespace String { }
        /**
         * <p>字符串模块</p>
         */
        namespace Time {
            /**
             * <p>延时某段时间，只执行最后一次
             * 类似于requestAnimationFrame</p>
             * @param fn - <p>执行函数</p>
             */
            function delay(fn: any, _a: any): void;
            /**
             * <p>延时某段时间，只执行最后一次
             * 类似于requestAnimationFrame</p>
             * @param fn - <p>执行函数</p>
             */
            function delay(fn: any, _a: any): void;
        }
        /**
         * <p>vector3向量模块</p>
         */
        namespace Vector {
            /**
             * <p>两个向量加</p>
             * @param vec1 - <p>向量1</p>
             * @param vec2 - <p>向量2</p>
             */
            function add(vec1: number[], vec2: number[]): number[];
            /**
             * <p>向量与数值相乘</p>
             * @param vec - <p>向量</p>
             * @param num - <p>数值</p>
             */
            function multiplyNumber(vec: number[], num: number): number[];
            /**
             * <p>两个向量相减, vec1 - vec2</p>
             * @param vec1 - <p>向量1</p>
             * @param vec2 - <p>向量2</p>
             */
            function subtract(vec1: number[], vec2: number[]): number[];
            /**
             * <p>向量标准化</p>
             * @param vec - <p>向量</p>
             */
            function normalize(vec: number[]): number[];
            /**
             * <p>获取向量长度</p>
             * @param vec - <p>向量</p>
             */
            function length(vec: number[]): number;
            /**
             * <p>获取两个向量之间的距离</p>
             * @param vec1 - <p>向量1</p>
             * @param vec2 - <p>向量2</p>
             */
            function distance(vec1: number[], vec2: number[]): number;
            /**
             * <p>两个向量加</p>
             * @param vec1 - <p>向量1</p>
             * @param vec2 - <p>向量2</p>
             */
            function add(vec1: number[], vec2: number[]): number[];
            /**
             * <p>向量与数值相乘</p>
             * @param vec - <p>向量</p>
             * @param num - <p>数值</p>
             */
            function multiplyNumber(vec: number[], num: number): number[];
            /**
             * <p>两个向量相减, vec1 - vec2</p>
             * @param vec1 - <p>向量1</p>
             * @param vec2 - <p>向量2</p>
             */
            function subtract(vec1: number[], vec2: number[]): number[];
            /**
             * <p>向量标准化</p>
             * @param vec - <p>向量</p>
             */
            function normalize(vec: number[]): number[];
            /**
             * <p>获取向量长度</p>
             * @param vec - <p>向量</p>
             */
            function length(vec: number[]): number;
            /**
             * <p>获取两个向量之间的距离</p>
             * @param vec1 - <p>向量1</p>
             * @param vec2 - <p>向量2</p>
             */
            function distance(vec1: number[], vec2: number[]): number;
        }
    }
    /**
     * <p>孪生体模块</p>
     */
    namespace DigitalTwin {
        /**
         * <p>显示孪生体</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param [purpose = default] - <p>目的</p>
         * @returns <ul>
         * <li>执行过操作的孪生体集合</li>
         * </ul>
         */
        function show(digitalTwin: THING.BaseObject | string, purpose?: string): THING.BaseObject[];
        /**
         * <p>隐藏孪生体</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param [purpose = default] - <p>目的</p>
         * @returns <ul>
         * <li>执行过操作的孪生体集合</li>
         * </ul>
         */
        function hide(digitalTwin: THING.BaseObject | string, purpose?: string): THING.BaseObject[];
        /**
         * <p>判断孪生体是否带有某个显示目的</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param [purpose = default] - <p>目的</p>
         * @returns <ul>
         * <li>如果多个孪生体 则所有孪生体都包含显示目的才返回true</li>
         * </ul>
         */
        function hasShowPurpose(digitalTwin: THING.BaseObject | string, purpose?: string): boolean;
        /**
         * <p>平滑显示孪生体</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param opts - <p>缓动效果</p>
         * @param opts.lerpType - <p>淡入动画效果 默认Quartic.In</p>
         * @param opts.time - <p>动画时间 默认500ms</p>
         * @param opts.purpose - <p>显示目的</p>
         * @returns <ul>
         * <li>动画完成,孪生体集合</li>
         * </ul>
         */
        function showWithSmoothAnimation(digitalTwin: THING.BaseObject | string, opts: {
            lerpType: string;
            time: number;
            purpose: string;
        }): Promise<THING.BaseObject[]>;
        /**
         * <p>平滑隐藏孪生体</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param opts - <p>缓动效果</p>
         * @param opts.lerpType - <p>淡入动画效果 默认Quartic.Out</p>
         * @param opts.time - <p>动画时间 默认500ms</p>
         * @param opts.purpose - <p>隐藏目的</p>
         * @returns <ul>
         * <li>动画完成,孪生体集合</li>
         * </ul>
         */
        function hideWithSmoothAnimation(digitalTwin: THING.BaseObject | string, opts: {
            lerpType: string;
            time: number;
            purpose: string;
        }): Promise<THING.BaseObject[]>;
        /**
         * <p>添加孪生体颜色到栈中</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param purpose - <p>变色的目的（用于取消该次变色）</p>
         * @param color - <p>十六进制颜色字符串 如'#ff0000'</p>
         * @param [priority = 0] - <p>颜色设置的优先级</p>
         * @param [traverse = false] - <p>是否遍历子元素</p>
         * @param [intensity = 0.7] - <p>颜色强度，越高变色越明显</p>
         * @returns <ul>
         * <li>执行过操作的孪生体集合</li>
         * </ul>
         */
        function addColor(digitalTwin: THING.BaseObject | string, purpose: string, color: string, priority?: number, traverse?: boolean, intensity?: number): THING.BaseObject[];
        /**
         * <p>从孪生体颜色栈中移除指定颜色</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param purpose - <p>变色目的</p>
         * @param traverse - <p>是否遍历子元素</p>
         * @returns <ul>
         * <li>执行过操作的孪生体集合</li>
         * </ul>
         */
        function removeColor(digitalTwin: THING.BaseObject | string, purpose: string, traverse: boolean): THING.BaseObject[];
        /**
         * <p>添加孪生体透明到栈中</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param purpose - <p>透明的目的（用于取消该次透明）</p>
         * @param opacity - <p>透明度</p>
         * @param [priority = 0] - <p>透明设置的优先级</p>
         * @param [traverse = false] - <p>是否遍历子元素</p>
         * @param [ignoreTag = [inheritOpacity]] - <p>忽略的标签</p>
         * @returns <ul>
         * <li>执行过操作的孪生体集合</li>
         * </ul>
         */
        function addOpacity(digitalTwin: THING.BaseObject | string, purpose: string, opacity: number, priority?: number, traverse?: boolean, ignoreTag?: string): THING.BaseObject[];
        /**
         * <p>从孪生体透明栈中移除指定目的的透明</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param purpose - <p>透明目的</p>
         * @param [traverse = false] - <p>是否遍历子元素</p>
         * @param [ignoreTag = [inheritOpacity]] - <p>忽略的标签</p>
         * @returns <ul>
         * <li>执行过操作的孪生体集合</li>
         * </ul>
         */
        function removeOpacity(digitalTwin: THING.BaseObject | string, purpose: string, traverse?: boolean, ignoreTag?: string): THING.BaseObject[];
        /**
         * <p>显示孪生体面板</p>
         * @param [digitalTwin = THINGX.App.currentSelected] - <p>孪生体对象，默认值是当前选择的孪生体中的第一个</p>
         * @param [config = {}] - <p>显示位置配置</p>
         * @param config.popup - <p>面板类型 custom</p>
         * @param config.top - <p>距上偏移</p>
         * @param config.left - <p>距左偏移</p>
         */
        function showPanel(digitalTwin?: THING.BaseObject, config?: {
            popup: string;
            top: number;
            left: number;
        }, isShowed?: boolena): void;
        /**
         * <p>隐藏当前显示的孪生体面板</p>
         */
        function hidePanel(): void;
        /**
         * <p>激活当前孪生体面板上的tab</p>
         * @param name - <p>tab名称</p>
         */
        function activateTabOnPanel(name: string): void;
        /**
         * <p>获取当前在孪生体面板上激活的tab</p>
         * @returns <ul>
         * <li>tab名称，失败返回false</li>
         * </ul>
         */
        function getActivatedTabOnPanel(): string | boolean;
        /**
         * <p>重新读取孪生体面板可视化配置</p>
         */
        function refresh(): void;
        /**
         * <p>获取孪生体指定面板名称配置</p>
         * @param digitalTwin - <p>孪生体对象</p>
         * @param name - <p>面板名称</p>
         */
        function getPanelConfig(digitalTwin: THING.BaseObject, name: string): any;
        /**
         * <p>通过ci数据创建孪生体</p>
         * @param ciData - <p>孪生体ci数据</p>
         * @param [onlyEmptyNode = true] - <p>true:只创建空点,不加载模型; false:加载模型</p>
         */
        function createByCIData(ciData: any, options?: any, onlyEmptyNode?: boolean): Promise<THING.BaseObject>;
        /**
         * @param dtwins - <p>孪生体或孪生体组成的数组</p>
         * @param [Category = []] - <p>分类</p>
         * @param [queryChildren = false] - <p>false:获取Ci 不包含孩子</p>
         */
        function getCategoryCIData(dtwins: any | any[], Category?: any, queryChildren?: boolean): void;
        /**
         * @param dtwin - <p>孪生体或孪生体组成的数组</p>
         */
        function initializeCIData(dtwin: any): void;
        /**
         * <p>显示孪生体</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param [purpose = default] - <p>目的</p>
         * @returns <ul>
         * <li>执行过操作的孪生体集合</li>
         * </ul>
         */
        function show(digitalTwin: THING.BaseObject | string, purpose?: string): THING.BaseObject[];
        /**
         * <p>隐藏孪生体</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param [purpose = default] - <p>目的</p>
         * @returns <ul>
         * <li>执行过操作的孪生体集合</li>
         * </ul>
         */
        function hide(digitalTwin: THING.BaseObject | string, purpose?: string): THING.BaseObject[];
        /**
         * <p>判断孪生体是否带有某个显示目的</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param [purpose = default] - <p>目的</p>
         * @returns <ul>
         * <li>如果多个孪生体 则所有孪生体都包含显示目的才返回true</li>
         * </ul>
         */
        function hasShowPurpose(digitalTwin: THING.BaseObject | string, purpose?: string): boolean;
        /**
         * <p>平滑显示孪生体</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param opts - <p>缓动效果</p>
         * @param opts.lerpType - <p>淡入动画效果 默认Quartic.In</p>
         * @param opts.time - <p>动画时间 默认500ms</p>
         * @param opts.purpose - <p>显示目的</p>
         * @returns <ul>
         * <li>动画完成,孪生体集合</li>
         * </ul>
         */
        function showWithSmoothAnimation(digitalTwin: THING.BaseObject | string, opts: {
            lerpType: string;
            time: number;
            purpose: string;
        }): Promise<THING.BaseObject[]>;
        /**
         * <p>平滑隐藏孪生体</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param opts - <p>缓动效果</p>
         * @param opts.lerpType - <p>淡入动画效果 默认Quartic.Out</p>
         * @param opts.time - <p>动画时间 默认500ms</p>
         * @param opts.purpose - <p>隐藏目的</p>
         * @returns <ul>
         * <li>动画完成,孪生体集合</li>
         * </ul>
         */
        function hideWithSmoothAnimation(digitalTwin: THING.BaseObject | string, opts: {
            lerpType: string;
            time: number;
            purpose: string;
        }): Promise<THING.BaseObject[]>;
        /**
         * <p>添加孪生体颜色到栈中</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param purpose - <p>变色的目的（用于取消该次变色）</p>
         * @param color - <p>十六进制颜色字符串 如'#ff0000'</p>
         * @param [priority = 0] - <p>颜色设置的优先级</p>
         * @param [traverse = false] - <p>是否遍历子元素</p>
         * @param [intensity = 0.7] - <p>颜色强度，越高变色越明显</p>
         * @returns <ul>
         * <li>执行过操作的孪生体集合</li>
         * </ul>
         */
        function addColor(digitalTwin: THING.BaseObject | string, purpose: string, color: string, priority?: number, traverse?: boolean, intensity?: number): THING.BaseObject[];
        /**
         * <p>从孪生体颜色栈中移除指定颜色</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param purpose - <p>变色目的</p>
         * @param traverse - <p>是否遍历子元素</p>
         * @returns <ul>
         * <li>执行过操作的孪生体集合</li>
         * </ul>
         */
        function removeColor(digitalTwin: THING.BaseObject | string, purpose: string, traverse: boolean): THING.BaseObject[];
        /**
         * <p>添加孪生体透明到栈中</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param purpose - <p>透明的目的（用于取消该次透明）</p>
         * @param opacity - <p>透明度</p>
         * @param [priority = 0] - <p>透明设置的优先级</p>
         * @param [traverse = false] - <p>是否遍历子元素</p>
         * @param [ignoreTag = [inheritOpacity]] - <p>忽略的标签</p>
         * @returns <ul>
         * <li>执行过操作的孪生体集合</li>
         * </ul>
         */
        function addOpacity(digitalTwin: THING.BaseObject | string, purpose: string, opacity: number, priority?: number, traverse?: boolean, ignoreTag?: string): THING.BaseObject[];
        /**
         * <p>从孪生体透明栈中移除指定目的的透明</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param purpose - <p>透明目的</p>
         * @param [traverse = false] - <p>是否遍历子元素</p>
         * @param [ignoreTag = [inheritOpacity]] - <p>忽略的标签</p>
         * @returns <ul>
         * <li>执行过操作的孪生体集合</li>
         * </ul>
         */
        function removeOpacity(digitalTwin: THING.BaseObject | string, purpose: string, traverse?: boolean, ignoreTag?: string): THING.BaseObject[];
        /**
         * <p>显示孪生体面板</p>
         * @param [digitalTwin = THINGX.App.currentSelected] - <p>孪生体对象，默认值是当前选择的孪生体中的第一个</p>
         * @param [config = {}] - <p>显示位置配置</p>
         * @param config.popup - <p>面板类型 custom</p>
         * @param config.top - <p>距上偏移</p>
         * @param config.left - <p>距左偏移</p>
         */
        function showPanel(digitalTwin?: THING.BaseObject, config?: {
            popup: string;
            top: number;
            left: number;
        }, isShowed?: boolena): void;
        /**
         * <p>隐藏当前显示的孪生体面板</p>
         */
        function hidePanel(): void;
        /**
         * <p>激活当前孪生体面板上的tab</p>
         * @param name - <p>tab名称</p>
         */
        function activateTabOnPanel(name: string): void;
        /**
         * <p>获取当前在孪生体面板上激活的tab</p>
         * @returns <ul>
         * <li>tab名称，失败返回false</li>
         * </ul>
         */
        function getActivatedTabOnPanel(): string | boolean;
        /**
         * <p>重新读取孪生体面板可视化配置</p>
         */
        function refresh(): void;
        /**
         * <p>获取孪生体指定面板名称配置</p>
         * @param digitalTwin - <p>孪生体对象</p>
         * @param name - <p>面板名称</p>
         */
        function getPanelConfig(digitalTwin: THING.BaseObject, name: string): any;
        /**
         * <p>通过ci数据创建孪生体</p>
         * @param ciData - <p>孪生体ci数据</p>
         * @param [onlyEmptyNode = true] - <p>true:只创建空点,不加载模型; false:加载模型</p>
         */
        function createByCIData(ciData: any, options?: any, onlyEmptyNode?: boolean): Promise<THING.BaseObject>;
        /**
         * @param dtwins - <p>孪生体或孪生体组成的数组</p>
         * @param [Category = []] - <p>分类</p>
         * @param [queryChildren = false] - <p>false:获取Ci 不包含孩子</p>
         */
        function getCategoryCIData(dtwins: any | any[], Category?: any, queryChildren?: boolean): void;
        /**
         * @param dtwin - <p>孪生体或孪生体组成的数组</p>
         */
        function initializeCIData(dtwin: any): void;
    }
    /**
     * <p>Http请求模块</p>
     */
    namespace Http {
        /**
         * @property [timeout = 0] - <p>请求超时时间，0表示没超时限制</p>
         * @property [withCredentials = false] - <p>表示跨域请求时是否需要使用凭证</p>
         * @property headers - <p>发送的自定义请求头</p>
         * @property [responseType = json] - <p>示服务器响应的数据类型 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'</p>
         */
        type Config = {
            timeout?: number;
            withCredentials?: boolean;
            headers: Map<string, string>;
            responseType?: string;
        };
        /**
         * <p>http get请求</p>
         * @param url - <p>请求的url</p>
         * @param data - <p>请求数据</p>
         * @param config - <p>请求配置</p>
         */
        function get(url: string, data: any, config: THINGX.Http.Config): Promis<object>;
        /**
         * <p>http post请求</p>
         * @param url - <p>请求的url</p>
         * @param data - <p>请求数据</p>
         * @param config - <p>请求配置</p>
         */
        function post(url: string, data: any, config: THINGX.Http.Config): Promis<object>;
        /**
         * @property [timeout = 0] - <p>请求超时时间，0表示没超时限制</p>
         * @property [withCredentials = false] - <p>表示跨域请求时是否需要使用凭证</p>
         * @property headers - <p>发送的自定义请求头</p>
         * @property [responseType = json] - <p>示服务器响应的数据类型 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'</p>
         */
        type Config = {
            timeout?: number;
            withCredentials?: boolean;
            headers: Map<string, string>;
            responseType?: string;
        };
        /**
         * <p>http get请求</p>
         * @param url - <p>请求的url</p>
         * @param data - <p>请求数据</p>
         * @param config - <p>请求配置</p>
         */
        function get(url: string, data: any, config: THINGX.Http.Config): Promis<object>;
        /**
         * <p>http post请求</p>
         * @param url - <p>请求的url</p>
         * @param data - <p>请求数据</p>
         * @param config - <p>请求配置</p>
         */
        function post(url: string, data: any, config: THINGX.Http.Config): Promis<object>;
    }
    /**
     * <p>图层模块</p>
     */
    namespace Layer {
        /**
         * @property type - <p>图层显示方式: 0是一直显示, 1是业务激活时显示, 2隐藏</p>
         * @property subType - <p>子图层显示方式: 0是悬浮出现, 1是点击出现</p>
         * @property restoreEnable - <p>是否启用恢复按钮</p>
         */
        type GlobalConfig = {
            type: number;
            subType: number;
            restoreEnable: boolean;
        };
        /**
         * <p>显示图层模块</p>
         */
        function show(): void;
        /**
         * <p>隐藏图层模块</p>
         */
        function hide(): void;
        /**
         * <p>通过图层名称获取当前层级图层的实例</p>
         * @param name - <p>图层名称</p>
         * @returns <ul>
         * <li>图层实例</li>
         * </ul>
         */
        function get(name: string): any | null;
        /**
         * <p>激活图层</p>
         * @param name - <p>图层名称</p>
         * @param [purpose = _default_] - <p>激活目的</p>
         */
        function activate(name: string | string[], purpose?: string): void;
        /**
         * <p>取消激活图层</p>
         * @param name - <p>图层名称</p>
         * @param [purpose = _default_] - <p>取消激活目的</p>
         */
        function deactivate(name: string | string[], purpose?: string): void;
        /**
         * <p>取消激活所有图层</p>
         */
        function deactivateAll(): void;
        /**
         * <p>获取当前激活的图层数组</p>
         */
        function getActivated(): object[];
        /**
         * <p>重新读取可视化配置 并根据当前层级重新创建图层</p>
         */
        function refresh(): void;
        /**
         * <p>获取图层用户自定义配置</p>
         * @example
         * const curLevel = THINGX.App.currentLevel;
         * const config = THINGX.Layer.getCustomConfig('建筑信息', curLevel);
         * @param [name] - <p>图层名称，undefined表示所有图层</p>
         * @param [level = THINGX.App.currentLevel] - <p>孪生体对象/孪生体分类</p>
         */
        function getCustomConfig(name?: string | undefined, level?: THING.BaseObject | THINGX.CONST.DEFAULT_DIGITAL_TWIN_CLASS): any;
        /**
         * <p>获取指定层级所有图层配置</p>
         * @example
         * const curLevel = THINGX.App.currentLevel;
         * const config = THINGX.Layer.getConfig(curLevel);
         * @param [level = THINGX.App.currentLevel] - <p>孪生体对象/孪生体分类</p>
         */
        function getConfig(level?: THING.BaseObject | THINGX.CONST.DEFAULT_DIGITAL_TWIN_CLASS): object[];
        /**
         * <p>获取图层的全局配置</p>
         */
        function getGlobalConfig(): THINGX.Layer.GlobalConfig;
        /**
         * <p>获取图层面板配置</p>
         */
        function getPanelConfig(): any | null;
        /**
         * <p>获取图层互斥配置</p>
         */
        function getLayerMutexsConfig(): string[];
        /**
         * <p>获取原生的图层项，不是实例</p>
         * @param name - <p>图层名称</p>
         */
        function getNative(name: string): any;
        /**
         * <p>获取图层组</p>
         * @param name - <p>图层组名称</p>
         */
        function getGroup(name: string): any;
        /**
         * <p>将图层注册条件转换成ThingJS表达式语法</p>
         */
        function regConditonToThingJSQueryExpression(condition: object[] | any): string;
        /**
         * <p>返回当前层级图层树状层级结构</p>
         * @returns <ul>
         * <li>树状层级结构</li>
         * </ul>
         */
        function getTreeStruct(): any;
        /**
         * @property type - <p>图层显示方式: 0是一直显示, 1是业务激活时显示, 2隐藏</p>
         * @property subType - <p>子图层显示方式: 0是悬浮出现, 1是点击出现</p>
         * @property restoreEnable - <p>是否启用恢复按钮</p>
         */
        type GlobalConfig = {
            type: number;
            subType: number;
            restoreEnable: boolean;
        };
        /**
         * <p>显示图层模块</p>
         */
        function show(): void;
        /**
         * <p>隐藏图层模块</p>
         */
        function hide(): void;
        /**
         * <p>通过图层名称获取当前层级图层的实例</p>
         * @param name - <p>图层名称</p>
         * @returns <ul>
         * <li>图层实例</li>
         * </ul>
         */
        function get(name: string): any | null;
        /**
         * <p>激活图层</p>
         * @param name - <p>图层名称</p>
         * @param [purpose = _default_] - <p>激活目的</p>
         */
        function activate(name: string | string[], purpose?: string): void;
        /**
         * <p>取消激活图层</p>
         * @param name - <p>图层名称</p>
         * @param [purpose = _default_] - <p>取消激活目的</p>
         */
        function deactivate(name: string | string[], purpose?: string): void;
        /**
         * <p>取消激活所有图层</p>
         */
        function deactivateAll(): void;
        /**
         * <p>获取当前激活的图层数组</p>
         */
        function getActivated(): object[];
        /**
         * <p>重新读取可视化配置 并根据当前层级重新创建图层</p>
         */
        function refresh(): void;
        /**
         * <p>获取图层用户自定义配置</p>
         * @example
         * const curLevel = THINGX.App.currentLevel;
         * const config = THINGX.Layer.getCustomConfig('建筑信息', curLevel);
         * @param [name] - <p>图层名称，undefined表示所有图层</p>
         * @param [level = THINGX.App.currentLevel] - <p>孪生体对象/孪生体分类</p>
         */
        function getCustomConfig(name?: string | undefined, level?: THING.BaseObject | THINGX.CONST.DEFAULT_DIGITAL_TWIN_CLASS): any;
        /**
         * <p>获取指定层级所有图层配置</p>
         * @example
         * const curLevel = THINGX.App.currentLevel;
         * const config = THINGX.Layer.getConfig(curLevel);
         * @param [level = THINGX.App.currentLevel] - <p>孪生体对象/孪生体分类</p>
         */
        function getConfig(level?: THING.BaseObject | THINGX.CONST.DEFAULT_DIGITAL_TWIN_CLASS): object[];
        /**
         * <p>获取图层的全局配置</p>
         */
        function getGlobalConfig(): THINGX.Layer.GlobalConfig;
        /**
         * <p>获取图层面板配置</p>
         */
        function getPanelConfig(): any | null;
        /**
         * <p>获取图层互斥配置</p>
         */
        function getLayerMutexsConfig(): string[];
        /**
         * <p>获取原生的图层项，不是实例</p>
         * @param name - <p>图层名称</p>
         */
        function getNative(name: string): any;
        /**
         * <p>获取图层组</p>
         * @param name - <p>图层组名称</p>
         */
        function getGroup(name: string): any;
        /**
         * <p>将图层注册条件转换成ThingJS表达式语法</p>
         */
        function regConditonToThingJSQueryExpression(condition: object[] | any): string;
        /**
         * <p>返回当前层级图层树状层级结构</p>
         * @returns <ul>
         * <li>树状层级结构</li>
         * </ul>
         */
        function getTreeStruct(): any;
    }
    /**
     * <p>标记模块</p>
     */
    namespace Marker {
        /**
         * @property url - <p>标记使用图片路径</p>
         * @property width - <p>标记宽度</p>
         * @property height - <p>标记高度</p>
         * @property size - <p>像素大小</p>
         * @property getMethod - <p>取值方法</p>
         * @property pickable - <p>是否可被拾取</p>
         * @property keepSize - <p>是否保存像素大小</p>
         * @property inheritScale - <p>是否继承代理孪生体缩放</p>
         * @property inheritStyle - <p>是否继承代理孪生体样式</p>
         * @property alwaysOnTop - <p>是否始终处于最高层级渲染，无遮挡</p>
         * @property complete - <p>标记创建完成回调</p>
         * @property style - <p>标记样式 参考ThingJS</p>
         * @property businessName - <p>业务名称</p>
         */
        type CreateConfig = {
            url: string;
            width: number;
            height: number;
            size: number;
            getMethod: string;
            pickable: boolean;
            keepSize: boolean;
            inheritScale: boolean;
            inheritStyle: boolean;
            alwaysOnTop: boolean;
            complete: (...params: any[]) => any;
            style: any;
            businessName: string;
        };
        /**
         * <p>显示标记</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param name - <p>标记名称（在ThingJS-X中配置的对应的孪生体上的标记）</p>
         * @param [purpose = default] - <p>显示目的</p>
         * @returns <ul>
         * <li>返回操作过的标记列表</li>
         * </ul>
         */
        function show(digitalTwin: THING.BaseObject | string, name: string, purpose?: string): THING.BaseObject[];
        /**
         * <p>隐藏标记</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param name - <p>标记名称</p>
         * @param [purpose = default] - <p>隐藏目的</p>
         * @returns <ul>
         * <li>返回操作过的标记列表</li>
         * </ul>
         */
        function hide(digitalTwin: THING.BaseObject | string, name: string, purpose?: string): THING.BaseObject[];
        /**
         * <p>增加标记，增加后立即显示</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param name - <p>标记名称,可通过THINGX.Marker.getConfig获取孪生体上配置了哪些标记（在ThingJS-X中配置的对应的孪生体上的标记）</p>
         * @param isExcludeModel - <p>是否包含模型</p>
         * @returns <ul>
         * <li>成功返回标记对象</li>
         * </ul>
         */
        function add(digitalTwin: THING.BaseObject | string, name: string, isExcludeModel: boolean): THING.BaseObject[];
        /**
         * <p>获取已创建的标记</p>
         * @param digitalTwin - <p>孪生体对象</p>
         * @param name - <p>标记名称</p>
         * @returns <ul>
         * <li>成功返回标记对象</li>
         * </ul>
         */
        function get(digitalTwin: THING.BaseObject, name: string): THING.BaseObject | null;
        /**
         * <p>删除标记</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param name - <p>标记名称</p>
         * @returns <ul>
         * <li>是否删除成功</li>
         * </ul>
         */
        function remove(digitalTwin: THING.BaseObject | string, name: string): boolean;
        /**
         * <p>通过tag增加自定义标记</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param tag - <p>标签</p>
         * @param type - <p>标记类型</p>
         * @param config - <p>标记自定义配置</p>
         * @returns <ul>
         * <li>标记列表</li>
         * </ul>
         */
        function addWithTag(digitalTwin: THING.BaseObject | string, tag: string, type: string, config: THINGX.Marker.CreateConfig): THING.BaseObject[];
        /**
         * <p>通过标签删除标记</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param tag - <p>标签</p>
         * @returns <ul>
         * <li>是否删除成功</li>
         * </ul>
         */
        function removeWithTag(digitalTwin: THING.BaseObject | string, tag: string): boolean;
        /**
         * <p>获取孪生体标记配置数据</p>
         * @param digitalTwin - <p>孪生体对象</p>
         * @returns <ul>
         * <li>标记配置数据 业务名称:配置数据</li>
         * </ul>
         */
        function getConfig(digitalTwin: THING.BaseObject): Map<string, object>;
        /**
         * <p>获取孪生体上所有的标记</p>
         * @param digitalTwin - <p>孪生体对象</p>
         * @returns <ul>
         * <li>已经创建的标记 业务名称:标记对象</li>
         * </ul>
         */
        function getAll(digitalTwin: THING.BaseObject): Map<string, THING.BaseObject>;
        /**
         * <p>给符合条件的孪生体注册标记</p>
         * @param condition - <p>孪生体集合配置语法表达式 {REGTYPE_CLASSTYPE: 'Campus'}</p>
         * @param config - <p>标记配置</p>
         * @param [businessName = _default_] - <p>业务名称</p>
         */
        function addWithCondition(condition: string, config: any, businessName?: string): void;
        /**
         * <p>获取孪生体预加载的标记名称</p>
         * @param digitalTwin - <p>孪生体对象</p>
         * @returns <ul>
         * <li>预加载标记的名称,若没有则返回空值,可根据这个名称通过show或者hide方法来显示和影藏预加载标记</li>
         * </ul>
         */
        function getPreloadName(digitalTwin: THING.BaseObject): string;
        /**
         * @property url - <p>标记使用图片路径</p>
         * @property width - <p>标记宽度</p>
         * @property height - <p>标记高度</p>
         * @property size - <p>像素大小</p>
         * @property getMethod - <p>取值方法</p>
         * @property pickable - <p>是否可被拾取</p>
         * @property keepSize - <p>是否保存像素大小</p>
         * @property inheritScale - <p>是否继承代理孪生体缩放</p>
         * @property inheritStyle - <p>是否继承代理孪生体样式</p>
         * @property alwaysOnTop - <p>是否始终处于最高层级渲染，无遮挡</p>
         * @property complete - <p>标记创建完成回调</p>
         * @property style - <p>标记样式 参考ThingJS</p>
         * @property businessName - <p>业务名称</p>
         */
        type CreateConfig = {
            url: string;
            width: number;
            height: number;
            size: number;
            getMethod: string;
            pickable: boolean;
            keepSize: boolean;
            inheritScale: boolean;
            inheritStyle: boolean;
            alwaysOnTop: boolean;
            complete: (...params: any[]) => any;
            style: any;
            businessName: string;
        };
        /**
         * <p>显示标记</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param name - <p>标记名称（在ThingJS-X中配置的对应的孪生体上的标记）</p>
         * @param [purpose = default] - <p>显示目的</p>
         * @returns <ul>
         * <li>返回操作过的标记列表</li>
         * </ul>
         */
        function show(digitalTwin: THING.BaseObject | string, name: string, purpose?: string): THING.BaseObject[];
        /**
         * <p>隐藏标记</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param name - <p>标记名称</p>
         * @param [purpose = default] - <p>隐藏目的</p>
         * @returns <ul>
         * <li>返回操作过的标记列表</li>
         * </ul>
         */
        function hide(digitalTwin: THING.BaseObject | string, name: string, purpose?: string): THING.BaseObject[];
        /**
         * <p>增加标记，增加后立即显示</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param name - <p>标记名称,可通过THINGX.Marker.getConfig获取孪生体上配置了哪些标记（在ThingJS-X中配置的对应的孪生体上的标记）</p>
         * @param isExcludeModel - <p>是否包含模型</p>
         * @returns <ul>
         * <li>成功返回标记对象</li>
         * </ul>
         */
        function add(digitalTwin: THING.BaseObject | string, name: string, isExcludeModel: boolean): THING.BaseObject[];
        /**
         * <p>获取已创建的标记</p>
         * @param digitalTwin - <p>孪生体对象</p>
         * @param name - <p>标记名称</p>
         * @returns <ul>
         * <li>成功返回标记对象</li>
         * </ul>
         */
        function get(digitalTwin: THING.BaseObject, name: string): THING.BaseObject | null;
        /**
         * <p>删除标记</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param name - <p>标记名称</p>
         * @returns <ul>
         * <li>是否删除成功</li>
         * </ul>
         */
        function remove(digitalTwin: THING.BaseObject | string, name: string): boolean;
        /**
         * <p>通过tag增加自定义标记</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param tag - <p>标签</p>
         * @param type - <p>标记类型</p>
         * @param config - <p>标记自定义配置</p>
         * @returns <ul>
         * <li>标记列表</li>
         * </ul>
         */
        function addWithTag(digitalTwin: THING.BaseObject | string, tag: string, type: string, config: THINGX.Marker.CreateConfig): THING.BaseObject[];
        /**
         * <p>通过标签删除标记</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param tag - <p>标签</p>
         * @returns <ul>
         * <li>是否删除成功</li>
         * </ul>
         */
        function removeWithTag(digitalTwin: THING.BaseObject | string, tag: string): boolean;
        /**
         * <p>获取孪生体标记配置数据</p>
         * @param digitalTwin - <p>孪生体对象</p>
         * @returns <ul>
         * <li>标记配置数据 业务名称:配置数据</li>
         * </ul>
         */
        function getConfig(digitalTwin: THING.BaseObject): Map<string, object>;
        /**
         * <p>获取孪生体上所有的标记</p>
         * @param digitalTwin - <p>孪生体对象</p>
         * @returns <ul>
         * <li>已经创建的标记 业务名称:标记对象</li>
         * </ul>
         */
        function getAll(digitalTwin: THING.BaseObject): Map<string, THING.BaseObject>;
        /**
         * <p>给符合条件的孪生体注册标记</p>
         * @param condition - <p>孪生体集合配置语法表达式 {REGTYPE_CLASSTYPE: 'Campus'}</p>
         * @param config - <p>标记配置</p>
         * @param [businessName = _default_] - <p>业务名称</p>
         */
        function addWithCondition(condition: string, config: any, businessName?: string): void;
        /**
         * <p>获取孪生体预加载的标记名称</p>
         * @param digitalTwin - <p>孪生体对象</p>
         * @returns <ul>
         * <li>预加载标记的名称,若没有则返回空值,可根据这个名称通过show或者hide方法来显示和影藏预加载标记</li>
         * </ul>
         */
        function getPreloadName(digitalTwin: THING.BaseObject): string;
    }
    /**
     * <p>监控模块</p>
     */
    namespace Monitor {
        /**
         * <p>监控模块 设备内</p>
         */
        namespace ModuleInDevice {
            /**
             * <p>将孪生体添加到监控中</p>
             * @example
             * const objs = THINGX.App.queryWithThingJSExpression('[twinType=空调]');
             * objs.forEach(obj=>{
             *     THINGX.Monitor.ModuleInDevice.add(obj);
             * });
             *
             * THINGX.Monitor.ModuleInDevice.add('[twinType=温度传感器]', null, null, '温度云图')
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @param monitorName - <p>监控名称，用于代理监控</p>
             * @param monitorKeys - <p>监控指标, 如 [&quot;温度&quot;,&quot;湿度&quot;]</p>
             * @param [purpose = _default_] - <p>监控目的，可以理解为一个占位标识。当有一个监控目的（purpose）占用某个孪生体对象，使该孪生体对象处于监控队列中时，则该孪生体不可被移出监控队列</p>
             * @param config - <p>监控配置</p>
             * @param [config.isForceUpdate = false] - <p>是否更新监控效果，无论物体是否显示</p>
             * @param [config.isAddEffect = true] - <p>是否添加监控效果</p>
             * @param [config.effectoVisible] - <p>监控可视化效果是否显示，默认随孪生体显示状态，如果isAddEffect为false则该字段不生效</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function add(digitalTwin: THING.BaseObject | string, monitorName: string, monitorKeys: string[], purpose?: string, config: {
                isForceUpdate?: boolean;
                isAddEffect?: boolean;
                effectoVisible?: boolean;
            }): THING.BaseObject[];
            /**
             * <p>将孪生体从监控中移除</p>
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @param [purpose = _default_] - <p>移除目的</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function remove(digitalTwin: THING.BaseObject | string, purpose?: string): THING.BaseObject[];
            /**
             * <p>孪生体是否在监控集合中</p>
             * @param digitalTwin - <p>孪生体对象</p>
             * @param [type] - <p>传此参数则检测物体是否有当前监控类型</p>
             */
            function isDigitalTwinInMonitorSet(digitalTwin: THING.BaseObject, type?: string): boolean;
            /**
             * <p>通过接口向后端请求监控数据</p>
             * @example
             * // 对已经被加入到监控中的孪生体对象请求监控数据
             * THINGX.Monitor.ModuleInDevice.remoteData()
             */
            function remoteData(): void;
            /**
             * <p>刷新监控显示效果</p>
             */
            function refreshEffect(): void;
            /**
             * <p>注册设备内监控 注册完后就添加监控 和 监控效果</p>
             * @param condition - <p>要注册的条件，可以是物体，物体 id，物体 name,物体 类，物体属性，函数，物体方法，以及使用前面的类型进行与或非的组合。</p>
             * @param param - <p>要注册内容</p>
             * @param name - <p>注册的名称,可以不填，系统内部会默认指定name的值是“<em>NONAME</em>”</p>
             */
            function addWithCondition(condition: any | string, param: any, name: string): void;
            /**
             * <p>将孪生体添加到监控中</p>
             * @example
             * const objs = THINGX.App.queryWithThingJSExpression('[twinType=空调]');
             * objs.forEach(obj=>{
             *     THINGX.Monitor.ModuleInDevice.add(obj);
             * });
             *
             * THINGX.Monitor.ModuleInDevice.add('[twinType=温度传感器]', null, null, '温度云图')
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @param monitorName - <p>监控名称，用于代理监控</p>
             * @param monitorKeys - <p>监控指标, 如 [&quot;温度&quot;,&quot;湿度&quot;]</p>
             * @param [purpose = _default_] - <p>监控目的，可以理解为一个占位标识。当有一个监控目的（purpose）占用某个孪生体对象，使该孪生体对象处于监控队列中时，则该孪生体不可被移出监控队列</p>
             * @param config - <p>监控配置</p>
             * @param [config.isForceUpdate = false] - <p>是否更新监控效果，无论物体是否显示</p>
             * @param [config.isAddEffect = true] - <p>是否添加监控效果</p>
             * @param [config.effectoVisible] - <p>监控可视化效果是否显示，默认随孪生体显示状态，如果isAddEffect为false则该字段不生效</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function add(digitalTwin: THING.BaseObject | string, monitorName: string, monitorKeys: string[], purpose?: string, config: {
                isForceUpdate?: boolean;
                isAddEffect?: boolean;
                effectoVisible?: boolean;
            }): THING.BaseObject[];
            /**
             * <p>将孪生体从监控中移除</p>
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @param [purpose = _default_] - <p>移除目的</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function remove(digitalTwin: THING.BaseObject | string, purpose?: string): THING.BaseObject[];
            /**
             * <p>孪生体是否在监控集合中</p>
             * @param digitalTwin - <p>孪生体对象</p>
             * @param [type] - <p>传此参数则检测物体是否有当前监控类型</p>
             */
            function isDigitalTwinInMonitorSet(digitalTwin: THING.BaseObject, type?: string): boolean;
            /**
             * <p>通过接口向后端请求监控数据</p>
             * @example
             * // 对已经被加入到监控中的孪生体对象请求监控数据
             * THINGX.Monitor.ModuleInDevice.remoteData()
             */
            function remoteData(): void;
            /**
             * <p>刷新监控显示效果</p>
             */
            function refreshEffect(): void;
            /**
             * <p>注册设备内监控 注册完后就添加监控 和 监控效果</p>
             * @param condition - <p>要注册的条件，可以是物体，物体 id，物体 name,物体 类，物体属性，函数，物体方法，以及使用前面的类型进行与或非的组合。</p>
             * @param param - <p>要注册内容</p>
             * @param name - <p>注册的名称,可以不填，系统内部会默认指定name的值是“<em>NONAME</em>”</p>
             */
            function addWithCondition(condition: any | string, param: any, name: string): void;
        }
        /**
         * <p>监控模块 操作集</p>
         */
        namespace ModuleOpSet {
            /**
             * <p>将孪生体添加到监控中</p>
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @param monitorName - <p>监控名称，用于代理监控</p>
             * @param monitorKeys - <p>监控指标, 如 [&quot;温度&quot;,&quot;湿度&quot;]</p>
             * @param [purpose = _default_] - <p>监控目的，可以理解为一个占位标识。当有一个监控目的（purpose）占用某个孪生体对象，使该孪生体对象处于监控队列中时，则该孪生体不可被移出监控队列</p>
             * @param config - <p>监控配置</p>
             * @param [config.isForceUpdate = false] - <p>是否更新监控效果，无论物体是否显示</p>
             * @param [config.isAddEffect = true] - <p>是否添加监控效果</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function add(digitalTwin: THING.BaseObject | string, monitorName: string, monitorKeys: string[], purpose?: string, config: {
                isForceUpdate?: boolean;
                isAddEffect?: boolean;
            }): THING.BaseObject[];
            /**
             * <p>将孪生体从监控中移除</p>
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @param [purpose = _default_] - <p>移除目的</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function remove(digitalTwin: THING.BaseObject | string, purpose?: string): THING.BaseObject[];
            /**
             * <p>增加监控效果</p>
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function addEffect(digitalTwin: THING.BaseObject | string): THING.BaseObject[];
            /**
             * <p>移除监控效果</p>
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function removeEffect(digitalTwin: THING.BaseObject | string): THING.BaseObject[];
            /**
             * <p>将孪生体添加到监控中</p>
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @param monitorName - <p>监控名称，用于代理监控</p>
             * @param monitorKeys - <p>监控指标, 如 [&quot;温度&quot;,&quot;湿度&quot;]</p>
             * @param [purpose = _default_] - <p>监控目的，可以理解为一个占位标识。当有一个监控目的（purpose）占用某个孪生体对象，使该孪生体对象处于监控队列中时，则该孪生体不可被移出监控队列</p>
             * @param config - <p>监控配置</p>
             * @param [config.isForceUpdate = false] - <p>是否更新监控效果，无论物体是否显示</p>
             * @param [config.isAddEffect = true] - <p>是否添加监控效果</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function add(digitalTwin: THING.BaseObject | string, monitorName: string, monitorKeys: string[], purpose?: string, config: {
                isForceUpdate?: boolean;
                isAddEffect?: boolean;
            }): THING.BaseObject[];
            /**
             * <p>将孪生体从监控中移除</p>
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @param [purpose = _default_] - <p>移除目的</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function remove(digitalTwin: THING.BaseObject | string, purpose?: string): THING.BaseObject[];
            /**
             * <p>增加监控效果</p>
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function addEffect(digitalTwin: THING.BaseObject | string): THING.BaseObject[];
            /**
             * <p>移除监控效果</p>
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function removeEffect(digitalTwin: THING.BaseObject | string): THING.BaseObject[];
        }
        /**
         * <p>将孪生体添加到监控中</p>
         * @example
         * const objs = THINGX.App.queryWithThingJSExpression('[twinType=空调]');
         * objs.forEach(obj=>{
         *     THINGX.Monitor.add(obj);
         * });
         *
         * THINGX.Monitor.add('[twinType=温度传感器]', null, null, '温度云图')
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param monitorName - <p>监控名称，用于代理监控</p>
         * @param monitorKeys - <p>监控指标, 如 [&quot;温度&quot;,&quot;湿度&quot;]</p>
         * @param [purpose = _default_] - <p>监控目的，可以理解为一个占位标识。当有一个监控目的（purpose）占用某个孪生体对象，使该孪生体对象处于监控队列中时，则该孪生体不可被移出监控队列</p>
         * @param config - <p>监控配置</p>
         * @param [config.isForceUpdate = false] - <p>是否更新监控效果，无论物体是否显示</p>
         * @param [config.isAddEffect = true] - <p>是否添加监控效果</p>
         * @param [config.effectoVisible] - <p>监控可视化效果是否显示，默认随孪生体显示状态，如果isAddEffect为false则该字段不生效</p>
         * @returns <ul>
         * <li>执行过操作的孪生体集合</li>
         * </ul>
         */
        function add(digitalTwin: THING.BaseObject | string, monitorName: string, monitorKeys: string[], purpose?: string, config: {
            isForceUpdate?: boolean;
            isAddEffect?: boolean;
            effectoVisible?: boolean;
        }): THING.BaseObject[];
        /**
         * <p>将孪生体从监控中移除</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param [purpose = _default_] - <p>移除目的</p>
         * @returns <ul>
         * <li>执行过操作的孪生体集合</li>
         * </ul>
         */
        function remove(digitalTwin: THING.BaseObject | string, purpose?: string): THING.BaseObject[];
        /**
         * <p>孪生体是否在监控集合中</p>
         * @param digitalTwin - <p>孪生体对象</p>
         * @param [type] - <p>传此参数则检测物体是否有当前监控类型</p>
         */
        function isDigitalTwinInMonitorSet(digitalTwin: THING.BaseObject, type?: string): boolean;
        /**
         * <p>增加监控标记</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param business - <p>相关业务名称，通过业务名称查询相关配置，下面配置会覆盖通过业务查询出的配置</p>
         * @param [type] - <p>DEFAULT 默认没有效果/BACKGROUND_AND_CANVAS 标记/HTMLELEMENT 标记/SELF_OBJECT 默认孪生体自身效果</p>
         * @param config - <p>标记创建配置</p>
         * @returns <ul>
         * <li>执行过操作的孪生体集合</li>
         * </ul>
         */
        function addMarker(digitalTwin: THING.BaseObject | string, business: string, type?: string, config: THINGX.Marker.CreateConfig): THING.BaseObject[];
        /**
         * <p>移除监控标记</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @returns <ul>
         * <li>执行过操作的孪生体集合</li>
         * </ul>
         */
        function removeMarker(digitalTwin: THING.BaseObject | string): THING.BaseObject[];
        /**
         * <p>获取监控标记</p>
         * @param digitalTwin - <p>孪生体对象</p>
         */
        function getMarker(digitalTwin: THING.BaseObject): THING.BaseObject | null;
        /**
         * <p>设置监控接口请求间隔时间</p>
         * @param time - <p>间隔时间，单位秒</p>
         */
        function setRemoteInterval(time: number): void;
        /**
         * <p>设置监控接口请求超时时间</p>
         * @param time - <p>超时时间，单位秒</p>
         */
        function setRemoteTimeout(time: number): void;
        /**
         * <p>通过接口向后端请求监控数据</p>
         * @example
         * const dbid = obj.userData._DBID_;
         * // 对已经被加入到监控中的孪生体对象请求监控数据
         * THINGX.Monitor.remoteData()
         * // 对单一物体进行刷新dbid
         * THINGX.Monitor.remoteData(dbid);
         * // 对对多个物体进行刷新dbids
         * THINGX.Monitor.remoteData([...dbids]);
         * @param [ids = null] - <p>孪生体属性中的dbid 默认对所有孪生体监控进行请求</p>
         */
        function remoteData(ids?: string[] | string | null): void;
        /**
         * <p>注册设备内监控 注册完后就添加监控 和 监控效果</p>
         * @param condition - <p>要注册的条件，可以是物体，物体 id，物体 name,物体 类，物体属性，函数，物体方法，以及使用前面的类型进行与或非的组合。</p>
         * @param config - <p>要注册内容</p>
         * @param config.business - <p>业务名称</p>
         * @param name - <p>注册的名称,可以不填，系统内部会默认指定name的值是“<em>NONAME</em>”</p>
         */
        function addWithCondition(condition: any | string, config: {
            business: string;
        }, name: string): void;
        /**
         * <p>监控模块 设备内</p>
         */
        namespace ModuleInDevice {
            /**
             * <p>将孪生体添加到监控中</p>
             * @example
             * const objs = THINGX.App.queryWithThingJSExpression('[twinType=空调]');
             * objs.forEach(obj=>{
             *     THINGX.Monitor.ModuleInDevice.add(obj);
             * });
             *
             * THINGX.Monitor.ModuleInDevice.add('[twinType=温度传感器]', null, null, '温度云图')
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @param monitorName - <p>监控名称，用于代理监控</p>
             * @param monitorKeys - <p>监控指标, 如 [&quot;温度&quot;,&quot;湿度&quot;]</p>
             * @param [purpose = _default_] - <p>监控目的，可以理解为一个占位标识。当有一个监控目的（purpose）占用某个孪生体对象，使该孪生体对象处于监控队列中时，则该孪生体不可被移出监控队列</p>
             * @param config - <p>监控配置</p>
             * @param [config.isForceUpdate = false] - <p>是否更新监控效果，无论物体是否显示</p>
             * @param [config.isAddEffect = true] - <p>是否添加监控效果</p>
             * @param [config.effectoVisible] - <p>监控可视化效果是否显示，默认随孪生体显示状态，如果isAddEffect为false则该字段不生效</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function add(digitalTwin: THING.BaseObject | string, monitorName: string, monitorKeys: string[], purpose?: string, config: {
                isForceUpdate?: boolean;
                isAddEffect?: boolean;
                effectoVisible?: boolean;
            }): THING.BaseObject[];
            /**
             * <p>将孪生体从监控中移除</p>
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @param [purpose = _default_] - <p>移除目的</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function remove(digitalTwin: THING.BaseObject | string, purpose?: string): THING.BaseObject[];
            /**
             * <p>孪生体是否在监控集合中</p>
             * @param digitalTwin - <p>孪生体对象</p>
             * @param [type] - <p>传此参数则检测物体是否有当前监控类型</p>
             */
            function isDigitalTwinInMonitorSet(digitalTwin: THING.BaseObject, type?: string): boolean;
            /**
             * <p>通过接口向后端请求监控数据</p>
             * @example
             * // 对已经被加入到监控中的孪生体对象请求监控数据
             * THINGX.Monitor.ModuleInDevice.remoteData()
             */
            function remoteData(): void;
            /**
             * <p>刷新监控显示效果</p>
             */
            function refreshEffect(): void;
            /**
             * <p>注册设备内监控 注册完后就添加监控 和 监控效果</p>
             * @param condition - <p>要注册的条件，可以是物体，物体 id，物体 name,物体 类，物体属性，函数，物体方法，以及使用前面的类型进行与或非的组合。</p>
             * @param param - <p>要注册内容</p>
             * @param name - <p>注册的名称,可以不填，系统内部会默认指定name的值是“<em>NONAME</em>”</p>
             */
            function addWithCondition(condition: any | string, param: any, name: string): void;
            /**
             * <p>将孪生体添加到监控中</p>
             * @example
             * const objs = THINGX.App.queryWithThingJSExpression('[twinType=空调]');
             * objs.forEach(obj=>{
             *     THINGX.Monitor.ModuleInDevice.add(obj);
             * });
             *
             * THINGX.Monitor.ModuleInDevice.add('[twinType=温度传感器]', null, null, '温度云图')
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @param monitorName - <p>监控名称，用于代理监控</p>
             * @param monitorKeys - <p>监控指标, 如 [&quot;温度&quot;,&quot;湿度&quot;]</p>
             * @param [purpose = _default_] - <p>监控目的，可以理解为一个占位标识。当有一个监控目的（purpose）占用某个孪生体对象，使该孪生体对象处于监控队列中时，则该孪生体不可被移出监控队列</p>
             * @param config - <p>监控配置</p>
             * @param [config.isForceUpdate = false] - <p>是否更新监控效果，无论物体是否显示</p>
             * @param [config.isAddEffect = true] - <p>是否添加监控效果</p>
             * @param [config.effectoVisible] - <p>监控可视化效果是否显示，默认随孪生体显示状态，如果isAddEffect为false则该字段不生效</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function add(digitalTwin: THING.BaseObject | string, monitorName: string, monitorKeys: string[], purpose?: string, config: {
                isForceUpdate?: boolean;
                isAddEffect?: boolean;
                effectoVisible?: boolean;
            }): THING.BaseObject[];
            /**
             * <p>将孪生体从监控中移除</p>
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @param [purpose = _default_] - <p>移除目的</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function remove(digitalTwin: THING.BaseObject | string, purpose?: string): THING.BaseObject[];
            /**
             * <p>孪生体是否在监控集合中</p>
             * @param digitalTwin - <p>孪生体对象</p>
             * @param [type] - <p>传此参数则检测物体是否有当前监控类型</p>
             */
            function isDigitalTwinInMonitorSet(digitalTwin: THING.BaseObject, type?: string): boolean;
            /**
             * <p>通过接口向后端请求监控数据</p>
             * @example
             * // 对已经被加入到监控中的孪生体对象请求监控数据
             * THINGX.Monitor.ModuleInDevice.remoteData()
             */
            function remoteData(): void;
            /**
             * <p>刷新监控显示效果</p>
             */
            function refreshEffect(): void;
            /**
             * <p>注册设备内监控 注册完后就添加监控 和 监控效果</p>
             * @param condition - <p>要注册的条件，可以是物体，物体 id，物体 name,物体 类，物体属性，函数，物体方法，以及使用前面的类型进行与或非的组合。</p>
             * @param param - <p>要注册内容</p>
             * @param name - <p>注册的名称,可以不填，系统内部会默认指定name的值是“<em>NONAME</em>”</p>
             */
            function addWithCondition(condition: any | string, param: any, name: string): void;
        }
        /**
         * <p>监控模块 操作集</p>
         */
        namespace ModuleOpSet {
            /**
             * <p>将孪生体添加到监控中</p>
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @param monitorName - <p>监控名称，用于代理监控</p>
             * @param monitorKeys - <p>监控指标, 如 [&quot;温度&quot;,&quot;湿度&quot;]</p>
             * @param [purpose = _default_] - <p>监控目的，可以理解为一个占位标识。当有一个监控目的（purpose）占用某个孪生体对象，使该孪生体对象处于监控队列中时，则该孪生体不可被移出监控队列</p>
             * @param config - <p>监控配置</p>
             * @param [config.isForceUpdate = false] - <p>是否更新监控效果，无论物体是否显示</p>
             * @param [config.isAddEffect = true] - <p>是否添加监控效果</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function add(digitalTwin: THING.BaseObject | string, monitorName: string, monitorKeys: string[], purpose?: string, config: {
                isForceUpdate?: boolean;
                isAddEffect?: boolean;
            }): THING.BaseObject[];
            /**
             * <p>将孪生体从监控中移除</p>
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @param [purpose = _default_] - <p>移除目的</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function remove(digitalTwin: THING.BaseObject | string, purpose?: string): THING.BaseObject[];
            /**
             * <p>增加监控效果</p>
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function addEffect(digitalTwin: THING.BaseObject | string): THING.BaseObject[];
            /**
             * <p>移除监控效果</p>
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function removeEffect(digitalTwin: THING.BaseObject | string): THING.BaseObject[];
            /**
             * <p>将孪生体添加到监控中</p>
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @param monitorName - <p>监控名称，用于代理监控</p>
             * @param monitorKeys - <p>监控指标, 如 [&quot;温度&quot;,&quot;湿度&quot;]</p>
             * @param [purpose = _default_] - <p>监控目的，可以理解为一个占位标识。当有一个监控目的（purpose）占用某个孪生体对象，使该孪生体对象处于监控队列中时，则该孪生体不可被移出监控队列</p>
             * @param config - <p>监控配置</p>
             * @param [config.isForceUpdate = false] - <p>是否更新监控效果，无论物体是否显示</p>
             * @param [config.isAddEffect = true] - <p>是否添加监控效果</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function add(digitalTwin: THING.BaseObject | string, monitorName: string, monitorKeys: string[], purpose?: string, config: {
                isForceUpdate?: boolean;
                isAddEffect?: boolean;
            }): THING.BaseObject[];
            /**
             * <p>将孪生体从监控中移除</p>
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @param [purpose = _default_] - <p>移除目的</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function remove(digitalTwin: THING.BaseObject | string, purpose?: string): THING.BaseObject[];
            /**
             * <p>增加监控效果</p>
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function addEffect(digitalTwin: THING.BaseObject | string): THING.BaseObject[];
            /**
             * <p>移除监控效果</p>
             * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
             * @returns <ul>
             * <li>执行过操作的孪生体集合</li>
             * </ul>
             */
            function removeEffect(digitalTwin: THING.BaseObject | string): THING.BaseObject[];
        }
        /**
         * <p>将孪生体添加到监控中</p>
         * @example
         * const objs = THINGX.App.queryWithThingJSExpression('[twinType=空调]');
         * objs.forEach(obj=>{
         *     THINGX.Monitor.add(obj);
         * });
         *
         * THINGX.Monitor.add('[twinType=温度传感器]', null, null, '温度云图')
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param monitorName - <p>监控名称，用于代理监控</p>
         * @param monitorKeys - <p>监控指标, 如 [&quot;温度&quot;,&quot;湿度&quot;]</p>
         * @param [purpose = _default_] - <p>监控目的，可以理解为一个占位标识。当有一个监控目的（purpose）占用某个孪生体对象，使该孪生体对象处于监控队列中时，则该孪生体不可被移出监控队列</p>
         * @param config - <p>监控配置</p>
         * @param [config.isForceUpdate = false] - <p>是否更新监控效果，无论物体是否显示</p>
         * @param [config.isAddEffect = true] - <p>是否添加监控效果</p>
         * @param [config.effectoVisible] - <p>监控可视化效果是否显示，默认随孪生体显示状态，如果isAddEffect为false则该字段不生效</p>
         * @returns <ul>
         * <li>执行过操作的孪生体集合</li>
         * </ul>
         */
        function add(digitalTwin: THING.BaseObject | string, monitorName: string, monitorKeys: string[], purpose?: string, config: {
            isForceUpdate?: boolean;
            isAddEffect?: boolean;
            effectoVisible?: boolean;
        }): THING.BaseObject[];
        /**
         * <p>将孪生体从监控中移除</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param [purpose = _default_] - <p>移除目的</p>
         * @returns <ul>
         * <li>执行过操作的孪生体集合</li>
         * </ul>
         */
        function remove(digitalTwin: THING.BaseObject | string, purpose?: string): THING.BaseObject[];
        /**
         * <p>孪生体是否在监控集合中</p>
         * @param digitalTwin - <p>孪生体对象</p>
         * @param [type] - <p>传此参数则检测物体是否有当前监控类型</p>
         */
        function isDigitalTwinInMonitorSet(digitalTwin: THING.BaseObject, type?: string): boolean;
        /**
         * <p>增加监控标记</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @param business - <p>相关业务名称，通过业务名称查询相关配置，下面配置会覆盖通过业务查询出的配置</p>
         * @param [type] - <p>DEFAULT 默认没有效果/BACKGROUND_AND_CANVAS 标记/HTMLELEMENT 标记/SELF_OBJECT 默认孪生体自身效果</p>
         * @param config - <p>标记创建配置</p>
         * @returns <ul>
         * <li>执行过操作的孪生体集合</li>
         * </ul>
         */
        function addMarker(digitalTwin: THING.BaseObject | string, business: string, type?: string, config: THINGX.Marker.CreateConfig): THING.BaseObject[];
        /**
         * <p>移除监控标记</p>
         * @param digitalTwin - <p>孪生体对象/ThingJS查询语法</p>
         * @returns <ul>
         * <li>执行过操作的孪生体集合</li>
         * </ul>
         */
        function removeMarker(digitalTwin: THING.BaseObject | string): THING.BaseObject[];
        /**
         * <p>获取监控标记</p>
         * @param digitalTwin - <p>孪生体对象</p>
         */
        function getMarker(digitalTwin: THING.BaseObject): THING.BaseObject | null;
        /**
         * <p>设置监控接口请求间隔时间</p>
         * @param time - <p>间隔时间，单位秒</p>
         */
        function setRemoteInterval(time: number): void;
        /**
         * <p>设置监控接口请求超时时间</p>
         * @param time - <p>超时时间，单位秒</p>
         */
        function setRemoteTimeout(time: number): void;
        /**
         * <p>通过接口向后端请求监控数据</p>
         * @example
         * const dbid = obj.userData._DBID_;
         * // 对已经被加入到监控中的孪生体对象请求监控数据
         * THINGX.Monitor.remoteData()
         * // 对单一物体进行刷新dbid
         * THINGX.Monitor.remoteData(dbid);
         * // 对对多个物体进行刷新dbids
         * THINGX.Monitor.remoteData([...dbids]);
         * @param [ids = null] - <p>孪生体属性中的dbid 默认对所有孪生体监控进行请求</p>
         */
        function remoteData(ids?: string[] | string | null): void;
        /**
         * <p>注册设备内监控 注册完后就添加监控 和 监控效果</p>
         * @param condition - <p>要注册的条件，可以是物体，物体 id，物体 name,物体 类，物体属性，函数，物体方法，以及使用前面的类型进行与或非的组合。</p>
         * @param config - <p>要注册内容</p>
         * @param config.business - <p>业务名称</p>
         * @param name - <p>注册的名称,可以不填，系统内部会默认指定name的值是“<em>NONAME</em>”</p>
         */
        function addWithCondition(condition: any | string, config: {
            business: string;
        }, name: string): void;
    }
    /**
     * <p>操作集模块</p>
     */
    namespace OpSet {
        /**
         * <p>运行操作集</p>
         * @param name - <p>操作集名称</p>
         * @param runObj - <p>运行对象</p>
         * @param [runParams = {}] - <p>运行中存储单元传参</p>
         */
        function run(name: string, runObj: any, runParams?: Map<string, any>): void;
        /**
         * <p>获取指定操作集</p>
         * @param name - <p>操作集名称</p>
         * @returns <p>操作集</p>
         */
        function get(name: string): any | null;
        /**
         * <p>停止指定操作集</p>
         * @param name - <p>操作集名称</p>
         */
        function stop(name: string): void;
        /**
         * <p>设置指定操作集的运行速度</p>
         * @param name - <p>操作集名称</p>
         * @param [speed = 1] - <p>运行速度</p>
         */
        function changeSpeed(name: string, speed?: number): void;
        /**
         * <p>挂起指定操作集</p>
         * @param name - <p>操作集名称</p>
         */
        function suspend(name: string): void;
        /**
         * <p>恢复指定操作集</p>
         * @param name - <p>操作集名称</p>
         */
        function resume(name: string): void;
        /**
         * <p>重新读取操作集可视化配置</p>
         */
        function refresh(): void;
        /**
         * <p>获取操作集的存储单元</p>
         * @example
         * let vals = THINGX.OpSet.getStorageCell('test');
         * vals.name = 'console.error(123)';
         * THINGX.OpSet.run('test');
         * @param name - <p>操作集名称</p>
         * @returns <ul>
         * <li>存储单元集合，可直接修改，运行时生效</li>
         * </ul>
         */
        function getStorageCell(name: string): Map<string, any> | null;
        /**
         * <p>运行操作集</p>
         * @param name - <p>操作集名称</p>
         * @param runObj - <p>运行对象</p>
         * @param [runParams = {}] - <p>运行中存储单元传参</p>
         */
        function run(name: string, runObj: any, runParams?: Map<string, any>): void;
        /**
         * <p>获取指定操作集</p>
         * @param name - <p>操作集名称</p>
         * @returns <p>操作集</p>
         */
        function get(name: string): any | null;
        /**
         * <p>停止指定操作集</p>
         * @param name - <p>操作集名称</p>
         */
        function stop(name: string): void;
        /**
         * <p>设置指定操作集的运行速度</p>
         * @param name - <p>操作集名称</p>
         * @param [speed = 1] - <p>运行速度</p>
         */
        function changeSpeed(name: string, speed?: number): void;
        /**
         * <p>挂起指定操作集</p>
         * @param name - <p>操作集名称</p>
         */
        function suspend(name: string): void;
        /**
         * <p>恢复指定操作集</p>
         * @param name - <p>操作集名称</p>
         */
        function resume(name: string): void;
        /**
         * <p>重新读取操作集可视化配置</p>
         */
        function refresh(): void;
        /**
         * <p>获取操作集的存储单元</p>
         * @example
         * let vals = THINGX.OpSet.getStorageCell('test');
         * vals.name = 'console.error(123)';
         * THINGX.OpSet.run('test');
         * @param name - <p>操作集名称</p>
         * @returns <ul>
         * <li>存储单元集合，可直接修改，运行时生效</li>
         * </ul>
         */
        function getStorageCell(name: string): Map<string, any> | null;
    }
    /**
     * <p>场景控制模块</p>
     */
    namespace SceneControl {
        /**
         * <p>显示场景控制模块</p>
         */
        function show(): void;
        /**
         * <p>隐藏场景控制模块</p>
         */
        function hide(): void;
        /**
         * <p>激活指定场景控制功能</p>
         * @param name - <p>场景控制功能名称或ID</p>
         * @returns <ul>
         * <li>是否激活成功</li>
         * </ul>
         */
        function activate(name: string | string[]): boolean;
        /**
         * <p>取消激活指定场景控制功能</p>
         * @param name - <p>场景控制功能名称或ID</p>
         * @returns <ul>
         * <li>是否激活成功</li>
         * </ul>
         */
        function deactivate(name: string | string[]): boolean;
        /**
         * <p>获取已经激活的场景控制功能</p>
         * @returns <ul>
         * <li>已经激活的场景控制功能</li>
         * </ul>
         */
        function getActivated(): object[];
        /**
         * <p>刷新当前层级的场景控制功能</p>
         */
        function refresh(): Promise<boolean>;
        /**
         * <p>获取场景控制功能配置</p>
         * @param [name=] - <p>场景控制功能名称, 非空的话返回指定配置，否则返回所有配置</p>
         * @param [level = THINGX.App.currentLevel] - <p>孪生体对象/孪生体分类</p>
         * @returns <ul>
         * <li>场景控制配置</li>
         * </ul>
         */
        function getConfig(name=?: string, level?: THING.BaseObject | THINGX.CONST.DEFAULT_DIGITAL_TWIN_CLASS): object[] | any | null;
        /**
         * <p>显示场景控制模块</p>
         */
        function show(): void;
        /**
         * <p>隐藏场景控制模块</p>
         */
        function hide(): void;
        /**
         * <p>激活指定场景控制功能</p>
         * @param name - <p>场景控制功能名称或ID</p>
         * @returns <ul>
         * <li>是否激活成功</li>
         * </ul>
         */
        function activate(name: string | string[]): boolean;
        /**
         * <p>取消激活指定场景控制功能</p>
         * @param name - <p>场景控制功能名称或ID</p>
         * @returns <ul>
         * <li>是否激活成功</li>
         * </ul>
         */
        function deactivate(name: string | string[]): boolean;
        /**
         * <p>获取已经激活的场景控制功能</p>
         * @returns <ul>
         * <li>已经激活的场景控制功能</li>
         * </ul>
         */
        function getActivated(): object[];
        /**
         * <p>刷新当前层级的场景控制功能</p>
         */
        function refresh(): Promise<boolean>;
        /**
         * <p>获取场景控制功能配置</p>
         * @param [name=] - <p>场景控制功能名称, 非空的话返回指定配置，否则返回所有配置</p>
         * @param [level = THINGX.App.currentLevel] - <p>孪生体对象/孪生体分类</p>
         * @returns <ul>
         * <li>场景控制配置</li>
         * </ul>
         */
        function getConfig(name=?: string, level?: THING.BaseObject | THINGX.CONST.DEFAULT_DIGITAL_TWIN_CLASS): object[] | any | null;
    }
    /**
     * <p>后端请求模块</p>
     */
    namespace ServerInterface {
        /**
         * <p>资源数据</p>
         * @property pageNum - <p>当前的页码</p>
         * @property pageSize - <p>当前页码中数据条数</p>
         * @property totalRows - <p>数据总条数</p>
         * @property totalPages - <p>数据总页数</p>
         * @property data - <p>当前页的数据</p>
         */
        type ResourceData = {
            pageNum: number;
            pageSize: number;
            totalRows: number;
            totalPages: number;
            data: object[];
        };
        /**
         * @property INNER - <p>场景资源内部路径</p>
         * @property SCENE - <p>场景资源路径</p>
         * @property SCENE_VERSION - <p>场景版本</p>
         * @property TEXTURE - <p>贴图路径</p>
         */
        type SceneResourceData = {
            INNER: string;
            SCENE: string;
            SCENE_VERSION: string;
            TEXTURE: string;
        };
        /**
         * <p>用户信息</p>
         * @property domainId - <p>域ID</p>
         * @property id - <p>用户ID</p>
         * @property kind - <p>用户类型</p>
         * @property language - <p>本地化语言</p>
         * @property loginCode - <p>登录类型</p>
         * @property userCode - <p>用户类型</p>
         * @property userName - <p>用户名称</p>
         * @property tokenCreateTime - <p>token创建时间戳</p>
         * @property tokenValidTime - <p>token校验时间</p>
         */
        type UserData = {
            domainId: number;
            id: number;
            kind: number;
            language: string;
            loginCode: string;
            userCode: string;
            userName: string;
            tokenCreateTime: number;
            tokenValidTime: number;
        };
        /**
         * <p>查询资源列表数据</p>
         * @param params - <p>查询参数</p>
         * @param params.type - <p>资源类型/插件类型 action/chart/core/expand/theme</p>
         * @param params.pageNum - <p>分页页码</p>
         * @param params.pageSize - <p>每页条数</p>
         * @param params.searchKeyword - <p>搜索关键字</p>
         * @returns <p>返回的资源数据</p>
         */
        function getResources(params: {
            type: string | THINGX.CONST.PLUGIN_TYPE;
            pageNum: number;
            pageSize: number;
            searchKeyword: string;
        }): Promise<THINGX.ServerInterface.ResourceData>;
        /**
         * <p>查询系统配置</p>
         * @param params - <p>查询参数</p>
         * @param params.keys - <p>关键字</p>
         * @param params.type - <p>类型</p>
         * @param params.field - <p>区域</p>
         * @returns <p>返回的系统配置数据</p>
         */
        function getSystemSettings(params: {
            keys: string | string[];
            type: string;
            field: string;
        }): Promise<object>;
        /**
         * <p>通过场景CiCode获取园区数据</p>
         * @param params - <p>查询参数</p>
         * @param params.sc - <p>场景CiCode</p>
         * @returns <p>孪生体数据</p>
         */
        function getParkDataByScene(params: {
            sc: string;
        }): Promise<object[]>;
        /**
         * <p>通过分类模板代码获取孪生体</p>
         * @param params - <p>查询参数-分类模板代码 DATACENTER/PARK/BUILDING/FLOOR/ROOM/EARTH/DISTRIBUTION/STANDALONEDEVICE</p>
         * @returns <p>孪生体数据</p>
         */
        function getTwinsByTemplateCode(params: any[]): Promise<object[]>;
        /**
         * <p>通过场景CiCode获取模型库数据</p>
         * @param id - <p>场景CiCode</p>
         * @returns <p>模型库数据</p>
         */
        function getModelLibrary(id: string): Promise<Map<string, object>>;
        /**
         * <p>通过指定孪生体ID获取孪生体及下层级结构数据</p>
         * @param params - <p>查询参数</p>
         * @param params.id - <p>孪生体ID/CiCode</p>
         * @param params.depth - <p>查询深度 -1代表不限制</p>
         * @param params.endfilters - <p>结束过滤对象类型条件</p>
         * @returns <p>孪生体数据结构数据</p>
         */
        function getDigitalTwinsStructureData(params: {
            id: string;
            depth: number;
            endfilters: string[];
        }): Promise<Map<object>>;
        /**
         * <p>获取场景资源数据</p>
         * @param id - <p>场景ID/CICODE</p>
         * @returns <p>资源数据</p>
         */
        function getSceneResource(id: number): Promise<THINGX.ServerInterface.SceneResourceData>;
        /**
         * <p>获取所有logo数据</p>
         * @returns <ul>
         * <li>logo数据</li>
         * </ul>
         */
        function getLogos(): Promise<Map<object>>;
        /**
         * <p>获取场景信息</p>
         * @param identify - <p>场景ID/场景名称</p>
         * @returns <ul>
         * <li>场景信息</li>
         * </ul>
         */
        function getSceneInfo(identify: string): Promise<object>;
        /**
         * <p>获取用户信息详细</p>
         * @returns <p>用户信息</p>
         */
        function getUserDetailInfo(用户ID: number): Promise<object>;
        /**
         * <p>资源数据</p>
         * @property pageNum - <p>当前的页码</p>
         * @property pageSize - <p>当前页码中数据条数</p>
         * @property totalRows - <p>数据总条数</p>
         * @property totalPages - <p>数据总页数</p>
         * @property data - <p>当前页的数据</p>
         */
        type ResourceData = {
            pageNum: number;
            pageSize: number;
            totalRows: number;
            totalPages: number;
            data: object[];
        };
        /**
         * @property INNER - <p>场景资源内部路径</p>
         * @property SCENE - <p>场景资源路径</p>
         * @property SCENE_VERSION - <p>场景版本</p>
         * @property TEXTURE - <p>贴图路径</p>
         */
        type SceneResourceData = {
            INNER: string;
            SCENE: string;
            SCENE_VERSION: string;
            TEXTURE: string;
        };
        /**
         * <p>用户信息</p>
         * @property domainId - <p>域ID</p>
         * @property id - <p>用户ID</p>
         * @property kind - <p>用户类型</p>
         * @property language - <p>本地化语言</p>
         * @property loginCode - <p>登录类型</p>
         * @property userCode - <p>用户类型</p>
         * @property userName - <p>用户名称</p>
         * @property tokenCreateTime - <p>token创建时间戳</p>
         * @property tokenValidTime - <p>token校验时间</p>
         */
        type UserData = {
            domainId: number;
            id: number;
            kind: number;
            language: string;
            loginCode: string;
            userCode: string;
            userName: string;
            tokenCreateTime: number;
            tokenValidTime: number;
        };
        /**
         * <p>查询资源列表数据</p>
         * @param params - <p>查询参数</p>
         * @param params.type - <p>资源类型/插件类型 action/chart/core/expand/theme</p>
         * @param params.pageNum - <p>分页页码</p>
         * @param params.pageSize - <p>每页条数</p>
         * @param params.searchKeyword - <p>搜索关键字</p>
         * @returns <p>返回的资源数据</p>
         */
        function getResources(params: {
            type: string | THINGX.CONST.PLUGIN_TYPE;
            pageNum: number;
            pageSize: number;
            searchKeyword: string;
        }): Promise<THINGX.ServerInterface.ResourceData>;
        /**
         * <p>查询系统配置</p>
         * @param params - <p>查询参数</p>
         * @param params.keys - <p>关键字</p>
         * @param params.type - <p>类型</p>
         * @param params.field - <p>区域</p>
         * @returns <p>返回的系统配置数据</p>
         */
        function getSystemSettings(params: {
            keys: string | string[];
            type: string;
            field: string;
        }): Promise<object>;
        /**
         * <p>通过场景CiCode获取园区数据</p>
         * @param params - <p>查询参数</p>
         * @param params.sc - <p>场景CiCode</p>
         * @returns <p>孪生体数据</p>
         */
        function getParkDataByScene(params: {
            sc: string;
        }): Promise<object[]>;
        /**
         * <p>通过分类模板代码获取孪生体</p>
         * @param params - <p>查询参数-分类模板代码 DATACENTER/PARK/BUILDING/FLOOR/ROOM/EARTH/DISTRIBUTION/STANDALONEDEVICE</p>
         * @returns <p>孪生体数据</p>
         */
        function getTwinsByTemplateCode(params: any[]): Promise<object[]>;
        /**
         * <p>通过场景CiCode获取模型库数据</p>
         * @param id - <p>场景CiCode</p>
         * @returns <p>模型库数据</p>
         */
        function getModelLibrary(id: string): Promise<Map<string, object>>;
        /**
         * <p>通过指定孪生体ID获取孪生体及下层级结构数据</p>
         * @param params - <p>查询参数</p>
         * @param params.id - <p>孪生体ID/CiCode</p>
         * @param params.depth - <p>查询深度 -1代表不限制</p>
         * @param params.endfilters - <p>结束过滤对象类型条件</p>
         * @returns <p>孪生体数据结构数据</p>
         */
        function getDigitalTwinsStructureData(params: {
            id: string;
            depth: number;
            endfilters: string[];
        }): Promise<Map<object>>;
        /**
         * <p>获取场景资源数据</p>
         * @param id - <p>场景ID/CICODE</p>
         * @returns <p>资源数据</p>
         */
        function getSceneResource(id: number): Promise<THINGX.ServerInterface.SceneResourceData>;
        /**
         * <p>获取所有logo数据</p>
         * @returns <ul>
         * <li>logo数据</li>
         * </ul>
         */
        function getLogos(): Promise<Map<object>>;
        /**
         * <p>获取场景信息</p>
         * @param identify - <p>场景ID/场景名称</p>
         * @returns <ul>
         * <li>场景信息</li>
         * </ul>
         */
        function getSceneInfo(identify: string): Promise<object>;
        /**
         * <p>获取用户信息详细</p>
         * @returns <p>用户信息</p>
         */
        function getUserDetailInfo(用户ID: number): Promise<object>;
    }
    /**
     * <p>定时器模块</p>
     */
    namespace Timer {
        /**
         * <p>增加全局延时执行函数</p>
         * @example
         * THINGX.Timer.add("test", 1, false, () => {} );
         * @param name - <p>延时执行函数标识</p>
         * @param func - <p>需要执行的函数</p>
         * @param [delay = 0] - <p>延时多久，单位秒</p>
         * @param [isLoop = false] - <p>是否循环执行函数</p>
         * @param [list = []] - <p>执行函数传参</p>
         */
        function add(name: string, func: (...params: any[]) => any, delay?: number, isLoop?: boolean, list?: any[]): void;
        /**
         * <p>删除全局延时执行函数</p>
         * @example
         * THINGX.Timer.remove("test");
         * @param name - <p>延时执行函数标识</p>
         */
        function remove(name: string): void;
        /**
         * <p>移除全局所有延时执行函数</p>
         */
        function clear(): void;
        /**
         * <p>获取全局延时函数配置</p>
         * @example
         * THINGX.Timer.has("test");
         * @param name - <p>延时执行函数标识</p>
         * @returns <ul>
         * <li>有则返回增加时配置，否则返回undefined</li>
         * </ul>
         */
        function get(name: string): any[] | null;
        /**
         * <p>为对象添加延时执行函数</p>
         * @example
         * let obj = {
         count: 0
         add: function(val) {
           this.count += val;
         }
        }
        // 实现每一秒obj.mycount加1
        THINGX.Timer.addWithObject('example', obj, 'add', 1, false, [5]);
         * @param name - <p>延时执行函数标识，作用域为添加的所有对象</p>
         * @param obj - <p>延时对象</p>
         * @param methodName - <p>需要延时的方法名</p>
         * @param [delay = 0] - <p>延时执行的时间,单位秒</p>
         * @param [isLoop = false] - <p>是否循环</p>
         * @param [list = []] - <p>执行函数传参</p>
         */
        function addWithObject(name: any, obj: any, methodName: string, delay?: number, isLoop?: boolean, list?: any[]): void;
        /**
         * <p>移除对象上延时函数</p>
         * @example
         * THINGX.Timer.removeWithObject('example');
         * @param name - <p>延时执行函数标识，作用域为添加的所有对象</p>
         */
        function removeWithObject(name: string): void;
        /**
         * <p>移除所有对象上的延时函数</p>
         */
        function clearWithObject(): void;
        /**
         * <p>获取在对象上增加的延时函数配置</p>
         * @param name - <p>延时执行函数标识，作用域为添加的所有对象</p>
         * @returns <ul>
         * <li>有则返回增加时配置，否则返回undefined</li>
         * </ul>
         */
        function getWithObject(name: string): any[] | null;
        /**
         * <p>增加全局延时执行函数</p>
         * @example
         * THINGX.Timer.add("test", 1, false, () => {} );
         * @param name - <p>延时执行函数标识</p>
         * @param func - <p>需要执行的函数</p>
         * @param [delay = 0] - <p>延时多久，单位秒</p>
         * @param [isLoop = false] - <p>是否循环执行函数</p>
         * @param [list = []] - <p>执行函数传参</p>
         */
        function add(name: string, func: (...params: any[]) => any, delay?: number, isLoop?: boolean, list?: any[]): void;
        /**
         * <p>删除全局延时执行函数</p>
         * @example
         * THINGX.Timer.remove("test");
         * @param name - <p>延时执行函数标识</p>
         */
        function remove(name: string): void;
        /**
         * <p>移除全局所有延时执行函数</p>
         */
        function clear(): void;
        /**
         * <p>获取全局延时函数配置</p>
         * @example
         * THINGX.Timer.has("test");
         * @param name - <p>延时执行函数标识</p>
         * @returns <ul>
         * <li>有则返回增加时配置，否则返回undefined</li>
         * </ul>
         */
        function get(name: string): any[] | null;
        /**
         * <p>为对象添加延时执行函数</p>
         * @example
         * let obj = {
         count: 0
         add: function(val) {
           this.count += val;
         }
        }
        // 实现每一秒obj.mycount加1
        THINGX.Timer.addWithObject('example', obj, 'add', 1, false, [5]);
         * @param name - <p>延时执行函数标识，作用域为添加的所有对象</p>
         * @param obj - <p>延时对象</p>
         * @param methodName - <p>需要延时的方法名</p>
         * @param [delay = 0] - <p>延时执行的时间,单位秒</p>
         * @param [isLoop = false] - <p>是否循环</p>
         * @param [list = []] - <p>执行函数传参</p>
         */
        function addWithObject(name: any, obj: any, methodName: string, delay?: number, isLoop?: boolean, list?: any[]): void;
        /**
         * <p>移除对象上延时函数</p>
         * @example
         * THINGX.Timer.removeWithObject('example');
         * @param name - <p>延时执行函数标识，作用域为添加的所有对象</p>
         */
        function removeWithObject(name: string): void;
        /**
         * <p>移除所有对象上的延时函数</p>
         */
        function clearWithObject(): void;
        /**
         * <p>获取在对象上增加的延时函数配置</p>
         * @param name - <p>延时执行函数标识，作用域为添加的所有对象</p>
         * @returns <ul>
         * <li>有则返回增加时配置，否则返回undefined</li>
         * </ul>
         */
        function getWithObject(name: string): any[] | null;
    }
    /**
     * <p>UI模块</p>
     */
    namespace UI {
        /**
         * <p>加载UI模块</p>
         */
        namespace Loading {
            /**
             * <p>创建并显示应用loading ui</p>
             * @param [url] - <p>资源url路径，默认使用系统自带</p>
             * @param [type = gif] - <p>类型 gif/sequence/video</p>
             */
            function show(url?: string, type?: string): void;
            /**
             * <p>隐藏并销毁应用loading ui</p>
             */
            function hide(): void;
            /**
             * <p>创建并显示应用loading ui</p>
             * @param [url] - <p>资源url路径，默认使用系统自带</p>
             * @param [type = gif] - <p>类型 gif/sequence/video</p>
             */
            function show(url?: string, type?: string): void;
            /**
             * <p>隐藏并销毁应用loading ui</p>
             */
            function hide(): void;
        }
        /**
         * <p>信息模块</p>
         */
        namespace Message {
            /**
             * <p>信息配置</p>
             * @property [content] - <p>提示内容</p>
             * @property [onClose] - <p>关闭时的回调</p>
             * @property [closable = false] - <p>是否显示关闭按钮</p>
             * @property [duration = 1.5] - <p>默认自动关闭的延时，单位秒</p>
             */
            type Config = {
                content?: string;
                onClose?: (...params: any[]) => any;
                closable?: boolean;
                duration?: number;
            };
            /**
             * <p>信息配置</p>
             * @property [content] - <p>提示内容</p>
             * @property [onClose] - <p>关闭时的回调</p>
             * @property [closable = false] - <p>是否显示关闭按钮</p>
             * @property [duration = 1.5] - <p>默认自动关闭的延时，单位秒</p>
             */
            type Config = {
                content?: string;
                onClose?: (...params: any[]) => any;
                closable?: boolean;
                duration?: number;
            };
            /**
             * <p>显示提示信息</p>
             * @example
             * THINGX.Message.info('提示信息');
             * @param config - <p>MessageConfig为相关配置,string为待显示的内容</p>
             */
            function info(config: THINGX.Message.Config | string): void;
            /**
             * <p>显示成功信息</p>
             * @param config - <p>MessageConfig为相关配置,string为待显示的内容</p>
             */
            function success(config: THINGX.Message.Config | string): void;
            /**
             * <p>显示警告信息</p>
             * @param config - <p>MessageConfig为相关配置,string为待显示的内容</p>
             */
            function warning(config: THINGX.Message.Config | string): void;
            /**
             * <p>显示错误信息</p>
             * @example
             * THINGX.Message.error({
             content: '错误信息',
             onClose: () => {console.error('错误信息 end')},
             duration: 100,
             closable: true,
            });
             * @param config - <p>MessageConfig为相关配置,string为待显示的内容</p>
             */
            function error(config: THINGX.Message.Config | string): void;
            /**
             * <p>显示加载信息</p>
             * @param config - <p>MessageConfig为相关配置,string为待显示的内容</p>
             */
            function loading(config: THINGX.Message.Config | string): void;
            /**
             * <p>配置信息提示</p>
             * @param config - <p>MessageConfig为相关配置</p>
             */
            function config(config: THINGX.Message.Config): void;
            /**
             * <p>信息配置</p>
             * @property [content] - <p>提示内容</p>
             * @property [onClose] - <p>关闭时的回调</p>
             * @property [closable = false] - <p>是否显示关闭按钮</p>
             * @property [duration = 1.5] - <p>默认自动关闭的延时，单位秒</p>
             */
            type Config = {
                content?: string;
                onClose?: (...params: any[]) => any;
                closable?: boolean;
                duration?: number;
            };
            /**
             * <p>信息配置</p>
             * @property [content] - <p>提示内容</p>
             * @property [onClose] - <p>关闭时的回调</p>
             * @property [closable = false] - <p>是否显示关闭按钮</p>
             * @property [duration = 1.5] - <p>默认自动关闭的延时，单位秒</p>
             */
            type Config = {
                content?: string;
                onClose?: (...params: any[]) => any;
                closable?: boolean;
                duration?: number;
            };
            /**
             * <p>显示提示信息</p>
             * @example
             * THINGX.Message.info('提示信息');
             * @param config - <p>MessageConfig为相关配置,string为待显示的内容</p>
             */
            function info(config: THINGX.Message.Config | string): void;
            /**
             * <p>显示成功信息</p>
             * @param config - <p>MessageConfig为相关配置,string为待显示的内容</p>
             */
            function success(config: THINGX.Message.Config | string): void;
            /**
             * <p>显示警告信息</p>
             * @param config - <p>MessageConfig为相关配置,string为待显示的内容</p>
             */
            function warning(config: THINGX.Message.Config | string): void;
            /**
             * <p>显示错误信息</p>
             * @example
             * THINGX.Message.error({
             content: '错误信息',
             onClose: () => {console.error('错误信息 end')},
             duration: 100,
             closable: true,
            });
             * @param config - <p>MessageConfig为相关配置,string为待显示的内容</p>
             */
            function error(config: THINGX.Message.Config | string): void;
            /**
             * <p>显示加载信息</p>
             * @param config - <p>MessageConfig为相关配置,string为待显示的内容</p>
             */
            function loading(config: THINGX.Message.Config | string): void;
            /**
             * <p>配置信息提示</p>
             * @param config - <p>MessageConfig为相关配置</p>
             */
            function config(config: THINGX.Message.Config): void;
        }
        /**
         * <p>加载UI模块</p>
         */
        namespace Loading {
            /**
             * <p>创建并显示应用loading ui</p>
             * @param [url] - <p>资源url路径，默认使用系统自带</p>
             * @param [type = gif] - <p>类型 gif/sequence/video</p>
             */
            function show(url?: string, type?: string): void;
            /**
             * <p>隐藏并销毁应用loading ui</p>
             */
            function hide(): void;
            /**
             * <p>创建并显示应用loading ui</p>
             * @param [url] - <p>资源url路径，默认使用系统自带</p>
             * @param [type = gif] - <p>类型 gif/sequence/video</p>
             */
            function show(url?: string, type?: string): void;
            /**
             * <p>隐藏并销毁应用loading ui</p>
             */
            function hide(): void;
        }
        /**
         * <p>信息模块</p>
         */
        namespace Message {
            /**
             * <p>信息配置</p>
             * @property [content] - <p>提示内容</p>
             * @property [onClose] - <p>关闭时的回调</p>
             * @property [closable = false] - <p>是否显示关闭按钮</p>
             * @property [duration = 1.5] - <p>默认自动关闭的延时，单位秒</p>
             */
            type Config = {
                content?: string;
                onClose?: (...params: any[]) => any;
                closable?: boolean;
                duration?: number;
            };
            /**
             * <p>信息配置</p>
             * @property [content] - <p>提示内容</p>
             * @property [onClose] - <p>关闭时的回调</p>
             * @property [closable = false] - <p>是否显示关闭按钮</p>
             * @property [duration = 1.5] - <p>默认自动关闭的延时，单位秒</p>
             */
            type Config = {
                content?: string;
                onClose?: (...params: any[]) => any;
                closable?: boolean;
                duration?: number;
            };
            /**
             * <p>显示提示信息</p>
             * @example
             * THINGX.Message.info('提示信息');
             * @param config - <p>MessageConfig为相关配置,string为待显示的内容</p>
             */
            function info(config: THINGX.Message.Config | string): void;
            /**
             * <p>显示成功信息</p>
             * @param config - <p>MessageConfig为相关配置,string为待显示的内容</p>
             */
            function success(config: THINGX.Message.Config | string): void;
            /**
             * <p>显示警告信息</p>
             * @param config - <p>MessageConfig为相关配置,string为待显示的内容</p>
             */
            function warning(config: THINGX.Message.Config | string): void;
            /**
             * <p>显示错误信息</p>
             * @example
             * THINGX.Message.error({
             content: '错误信息',
             onClose: () => {console.error('错误信息 end')},
             duration: 100,
             closable: true,
            });
             * @param config - <p>MessageConfig为相关配置,string为待显示的内容</p>
             */
            function error(config: THINGX.Message.Config | string): void;
            /**
             * <p>显示加载信息</p>
             * @param config - <p>MessageConfig为相关配置,string为待显示的内容</p>
             */
            function loading(config: THINGX.Message.Config | string): void;
            /**
             * <p>配置信息提示</p>
             * @param config - <p>MessageConfig为相关配置</p>
             */
            function config(config: THINGX.Message.Config): void;
            /**
             * <p>信息配置</p>
             * @property [content] - <p>提示内容</p>
             * @property [onClose] - <p>关闭时的回调</p>
             * @property [closable = false] - <p>是否显示关闭按钮</p>
             * @property [duration = 1.5] - <p>默认自动关闭的延时，单位秒</p>
             */
            type Config = {
                content?: string;
                onClose?: (...params: any[]) => any;
                closable?: boolean;
                duration?: number;
            };
            /**
             * <p>信息配置</p>
             * @property [content] - <p>提示内容</p>
             * @property [onClose] - <p>关闭时的回调</p>
             * @property [closable = false] - <p>是否显示关闭按钮</p>
             * @property [duration = 1.5] - <p>默认自动关闭的延时，单位秒</p>
             */
            type Config = {
                content?: string;
                onClose?: (...params: any[]) => any;
                closable?: boolean;
                duration?: number;
            };
            /**
             * <p>显示提示信息</p>
             * @example
             * THINGX.Message.info('提示信息');
             * @param config - <p>MessageConfig为相关配置,string为待显示的内容</p>
             */
            function info(config: THINGX.Message.Config | string): void;
            /**
             * <p>显示成功信息</p>
             * @param config - <p>MessageConfig为相关配置,string为待显示的内容</p>
             */
            function success(config: THINGX.Message.Config | string): void;
            /**
             * <p>显示警告信息</p>
             * @param config - <p>MessageConfig为相关配置,string为待显示的内容</p>
             */
            function warning(config: THINGX.Message.Config | string): void;
            /**
             * <p>显示错误信息</p>
             * @example
             * THINGX.Message.error({
             content: '错误信息',
             onClose: () => {console.error('错误信息 end')},
             duration: 100,
             closable: true,
            });
             * @param config - <p>MessageConfig为相关配置,string为待显示的内容</p>
             */
            function error(config: THINGX.Message.Config | string): void;
            /**
             * <p>显示加载信息</p>
             * @param config - <p>MessageConfig为相关配置,string为待显示的内容</p>
             */
            function loading(config: THINGX.Message.Config | string): void;
            /**
             * <p>配置信息提示</p>
             * @param config - <p>MessageConfig为相关配置</p>
             */
            function config(config: THINGX.Message.Config): void;
        }
    }
    /**
     * <p>工具模块</p>
     */
    namespace Utils {
        /**
         * <p>DOM相关操作</p>
         */
        namespace DOM {
            /**
             * <p>动态创建style标签</p>
             * @param styleText - <p>style 标签内容</p>
             * @param id - <p>style标签id</p>
             */
            function addStyleTag(styleText: string, id: string): void;
            /**
             * <p>删除style标签</p>
             * @param id - <p>style标签id</p>
             */
            function removeStyleTag(id: string): void;
            /**
             * <p>动态加载js文件</p>
             * @param data - <p>加载源</p>
             * @param config - <p>加载配置</p>
             * @param [config.loadType = THINGX.CONST.JS_LOAD_TYPE.EXEC] - <p>加载脚本方式</p>
             * @param [config.srcType = THINGX.CONST.JS_SRC_TYPE.URL] - <p>加载脚本源类型</p>
             * @param undefined - <p>是否加载成功</p>
             */
            function dynamicLoadJS(data: string, config: {
                loadType?: THINGX.CONST.JS_LOAD_YPE;
                srcType?: THINGX.CONST.JS_SRC_TYPE;
            }): void;
            /**
             * <p>动态创建style标签</p>
             * @param styleText - <p>style 标签内容</p>
             * @param id - <p>style标签id</p>
             */
            function addStyleTag(styleText: string, id: string): void;
            /**
             * <p>删除style标签</p>
             * @param id - <p>style标签id</p>
             */
            function removeStyleTag(id: string): void;
            /**
             * <p>动态加载js文件</p>
             * @param data - <p>加载源</p>
             * @param config - <p>加载配置</p>
             * @param [config.loadType = THINGX.CONST.JS_LOAD_TYPE.EXEC] - <p>加载脚本方式</p>
             * @param [config.srcType = THINGX.CONST.JS_SRC_TYPE.URL] - <p>加载脚本源类型</p>
             * @param undefined - <p>是否加载成功</p>
             */
            function dynamicLoadJS(data: string, config: {
                loadType?: THINGX.CONST.JS_LOAD_YPE;
                srcType?: THINGX.CONST.JS_SRC_TYPE;
            }): void;
        }
        /**
         * <p>孪生体搜索模块</p>
         */
        namespace Search {
            /**
             * <p>显示搜索物体</p>
             * @param [digitalTwins = []] - <p>孪生体列表</p>
             * @param [unknownObjects = []] - <p>未知物体列表</p>
             */
            function show(digitalTwins?: THING.BaseObject[], unknownObjects?: any[]): void;
            /**
             * <p>清空搜索结果</p>
             * @param [config = {}] - <p>清空配置</p>
             * @param config.continueSearch - <p>是否继续搜索</p>
             */
            function clear(config?: {
                continueSearch: boolean;
            }): void;
            /**
             * <p>显示搜索物体</p>
             * @param [digitalTwins = []] - <p>孪生体列表</p>
             * @param [unknownObjects = []] - <p>未知物体列表</p>
             */
            function show(digitalTwins?: THING.BaseObject[], unknownObjects?: any[]): void;
            /**
             * <p>清空搜索结果</p>
             * @param [config = {}] - <p>清空配置</p>
             * @param config.continueSearch - <p>是否继续搜索</p>
             */
            function clear(config?: {
                continueSearch: boolean;
            }): void;
        }
        /**
         * <p>三维空间相关操作模块</p>
         */
        namespace Space {
            /**
             * <p>查询在以center为球心,radius为半径的球内的目标对象</p>
             * @param filter - <p>筛选条件</p>
             * @param center - <p>球心坐标</p>
             * @param radius - <p>球半径</p>
             * @param [queryLevel = THINGX.App.currentLevel] - <p>查询层级</p>
             */
            function queryBySphere(filter: string, center: number[], radius: number, queryLevel?: THING.BaseObject): THING.Selector;
            /**
             * <p>计算孪生体到摄像机的距离</p>
             * @param digitalTwin - <p>目标孪生体</p>
             * @param isRecursive - <p>是否遍历孩子</p>
             */
            function getDistanceFromCamera(digitalTwin: THING.BaseObject, isRecursive: boolean): number;
            /**
             * <p>查询在以center为球心,radius为半径的球内的目标对象</p>
             * @param filter - <p>筛选条件</p>
             * @param center - <p>球心坐标</p>
             * @param radius - <p>球半径</p>
             * @param [queryLevel = THINGX.App.currentLevel] - <p>查询层级</p>
             */
            function queryBySphere(filter: string, center: number[], radius: number, queryLevel?: THING.BaseObject): THING.Selector;
            /**
             * <p>计算孪生体到摄像机的距离</p>
             * @param digitalTwin - <p>目标孪生体</p>
             * @param isRecursive - <p>是否遍历孩子</p>
             */
            function getDistanceFromCamera(digitalTwin: THING.BaseObject, isRecursive: boolean): number;
        }
        /**
         * <p>获取资源全路径</p>
         */
        function getResourceFullUrl(url: string): string;
        /**
         * <p>通过模型型号获取模型库信息</p>
         */
        function getModelProductInfo(模型型号: string): any | null;
        /**
         * <p>加载孪生体资源</p>
         */
        function loadResources(digitalTwins: THING.BaseObject[] | THING.BaseObject): Promise<undefined>;
        /**
         * <p>将孪生体注册条件转换成ThingJS表达式语法</p>
         */
        function regConditonToThingJSQueryExpression(condition: any): string;
        /**
         * <p>获取所有孪生体集合以及其查询条件</p>
         * @param [isReload = false] - <p>是否重新请求后端接口刷新</p>
         */
        function getAllDigitalTwinCollect(isReload?: boolean): Promise<Map<string, object>>;
        /**
         * <p>生成uuid</p>
         * @param [separator] - <p>分隔符</p>
         */
        function createUUID(separator?: string): string;
        /**
         * <p>DOM相关操作</p>
         */
        namespace DOM {
            /**
             * <p>动态创建style标签</p>
             * @param styleText - <p>style 标签内容</p>
             * @param id - <p>style标签id</p>
             */
            function addStyleTag(styleText: string, id: string): void;
            /**
             * <p>删除style标签</p>
             * @param id - <p>style标签id</p>
             */
            function removeStyleTag(id: string): void;
            /**
             * <p>动态加载js文件</p>
             * @param data - <p>加载源</p>
             * @param config - <p>加载配置</p>
             * @param [config.loadType = THINGX.CONST.JS_LOAD_TYPE.EXEC] - <p>加载脚本方式</p>
             * @param [config.srcType = THINGX.CONST.JS_SRC_TYPE.URL] - <p>加载脚本源类型</p>
             * @param undefined - <p>是否加载成功</p>
             */
            function dynamicLoadJS(data: string, config: {
                loadType?: THINGX.CONST.JS_LOAD_YPE;
                srcType?: THINGX.CONST.JS_SRC_TYPE;
            }): void;
            /**
             * <p>动态创建style标签</p>
             * @param styleText - <p>style 标签内容</p>
             * @param id - <p>style标签id</p>
             */
            function addStyleTag(styleText: string, id: string): void;
            /**
             * <p>删除style标签</p>
             * @param id - <p>style标签id</p>
             */
            function removeStyleTag(id: string): void;
            /**
             * <p>动态加载js文件</p>
             * @param data - <p>加载源</p>
             * @param config - <p>加载配置</p>
             * @param [config.loadType = THINGX.CONST.JS_LOAD_TYPE.EXEC] - <p>加载脚本方式</p>
             * @param [config.srcType = THINGX.CONST.JS_SRC_TYPE.URL] - <p>加载脚本源类型</p>
             * @param undefined - <p>是否加载成功</p>
             */
            function dynamicLoadJS(data: string, config: {
                loadType?: THINGX.CONST.JS_LOAD_YPE;
                srcType?: THINGX.CONST.JS_SRC_TYPE;
            }): void;
        }
        /**
         * <p>孪生体搜索模块</p>
         */
        namespace Search {
            /**
             * <p>显示搜索物体</p>
             * @param [digitalTwins = []] - <p>孪生体列表</p>
             * @param [unknownObjects = []] - <p>未知物体列表</p>
             */
            function show(digitalTwins?: THING.BaseObject[], unknownObjects?: any[]): void;
            /**
             * <p>清空搜索结果</p>
             * @param [config = {}] - <p>清空配置</p>
             * @param config.continueSearch - <p>是否继续搜索</p>
             */
            function clear(config?: {
                continueSearch: boolean;
            }): void;
            /**
             * <p>显示搜索物体</p>
             * @param [digitalTwins = []] - <p>孪生体列表</p>
             * @param [unknownObjects = []] - <p>未知物体列表</p>
             */
            function show(digitalTwins?: THING.BaseObject[], unknownObjects?: any[]): void;
            /**
             * <p>清空搜索结果</p>
             * @param [config = {}] - <p>清空配置</p>
             * @param config.continueSearch - <p>是否继续搜索</p>
             */
            function clear(config?: {
                continueSearch: boolean;
            }): void;
        }
        /**
         * <p>三维空间相关操作模块</p>
         */
        namespace Space {
            /**
             * <p>查询在以center为球心,radius为半径的球内的目标对象</p>
             * @param filter - <p>筛选条件</p>
             * @param center - <p>球心坐标</p>
             * @param radius - <p>球半径</p>
             * @param [queryLevel = THINGX.App.currentLevel] - <p>查询层级</p>
             */
            function queryBySphere(filter: string, center: number[], radius: number, queryLevel?: THING.BaseObject): THING.Selector;
            /**
             * <p>计算孪生体到摄像机的距离</p>
             * @param digitalTwin - <p>目标孪生体</p>
             * @param isRecursive - <p>是否遍历孩子</p>
             */
            function getDistanceFromCamera(digitalTwin: THING.BaseObject, isRecursive: boolean): number;
            /**
             * <p>查询在以center为球心,radius为半径的球内的目标对象</p>
             * @param filter - <p>筛选条件</p>
             * @param center - <p>球心坐标</p>
             * @param radius - <p>球半径</p>
             * @param [queryLevel = THINGX.App.currentLevel] - <p>查询层级</p>
             */
            function queryBySphere(filter: string, center: number[], radius: number, queryLevel?: THING.BaseObject): THING.Selector;
            /**
             * <p>计算孪生体到摄像机的距离</p>
             * @param digitalTwin - <p>目标孪生体</p>
             * @param isRecursive - <p>是否遍历孩子</p>
             */
            function getDistanceFromCamera(digitalTwin: THING.BaseObject, isRecursive: boolean): number;
        }
        /**
         * <p>获取资源全路径</p>
         */
        function getResourceFullUrl(url: string): string;
        /**
         * <p>通过模型型号获取模型库信息</p>
         */
        function getModelProductInfo(模型型号: string): any | null;
        /**
         * <p>加载孪生体资源</p>
         */
        function loadResources(digitalTwins: THING.BaseObject[] | THING.BaseObject): Promise<undefined>;
        /**
         * <p>将孪生体注册条件转换成ThingJS表达式语法</p>
         */
        function regConditonToThingJSQueryExpression(condition: any): string;
        /**
         * <p>获取所有孪生体集合以及其查询条件</p>
         * @param [isReload = false] - <p>是否重新请求后端接口刷新</p>
         */
        function getAllDigitalTwinCollect(isReload?: boolean): Promise<Map<string, object>>;
        /**
         * <p>生成uuid</p>
         * @param [separator] - <p>分隔符</p>
         */
        function createUUID(separator?: string): string;
    }
    /**
     * <p>视频流模块</p>
     */
    namespace VideoStream {
        /**
         * <p>获取视频流服务集合</p>
         */
        function getServices(): Map<string, object>;
        /**
         * <p>通过视频流服务创建激活一个监视</p>
         * @returns <ul>
         * <li>监视实例</li>
         * </ul>
         */
        function activateSurveillance(config: any, serial: string, code: string, uri: string, width: string, height: height): any;
        /**
         * <p>取消激活监视</p>
         * @param surveillance - <p>监视实例</p>
         */
        function deactivateSurveillance(surveillance: any): void;
        /**
         * <p>获取视频流服务集合</p>
         */
        function getServices(): Map<string, object>;
        /**
         * <p>通过视频流服务创建激活一个监视</p>
         * @returns <ul>
         * <li>监视实例</li>
         * </ul>
         */
        function activateSurveillance(config: any, serial: string, code: string, uri: string, width: string, height: height): any;
        /**
         * <p>取消激活监视</p>
         * @param surveillance - <p>监视实例</p>
         */
        function deactivateSurveillance(surveillance: any): void;
    }
    /**
     * <p>视点动画模块</p>
     */
    namespace ViewPoint {
        /**
         * <p>显示视点动画</p>
         */
        function show(): void;
        /**
         * <p>隐藏视点动画</p>
         */
        function hide(): void;
        /**
         * <p>播放视点动画</p>
         * @param name - <p>视点动画名称</p>
         * @returns <ul>
         * <li>视点播放是否成功</li>
         * </ul>
         */
        function play(name: string): Promise<boolean>;
        /**
         * <p>挂起当前视点动画</p>
         */
        function suspend(): void;
        /**
         * <p>恢复当前视点动画</p>
         */
        function resume(): void;
        /**
         * <p>停止播放当前视点动画</p>
         */
        function stop(): void;
        /**
         * <p>增加视点动画</p>
         * @param name - <p>视点动画名称</p>
         * @returns <ul>
         * <li>是否增加成功</li>
         * </ul>
         */
        function add(name: string): Promise<boolean>;
        /**
         * <p>获取视点动画</p>
         * @param name - <p>视点动画名称</p>
         */
        function get(name: string): any;
        /**
         * <p>删除视点动画</p>
         * @param name - <p>视点动画名称</p>
         * @returns <ul>
         * <li>是否删除成功</li>
         * </ul>
         */
        function remove(name: string): Promise<boolean>;
        /**
         * <p>修改视点动画名称</p>
         * @param oldName - <p>视点动画旧名称</p>
         * @param newName - <p>视点动画新名称</p>
         * @returns <ul>
         * <li>是否重命名成功</li>
         * </ul>
         */
        function reName(oldName: string, newName: string): Promise<boolean>;
        /**
         * <p>增加视点动画节点</p>
         * @param name - <p>视点动画名称</p>
         * @param [params] - <p>节点参数</p>
         * @returns <ul>
         * <li>是否增加成功</li>
         * </ul>
         */
        function addNode(name: string, params?: any): Promise<boolean>;
        /**
         * <p>更新视点动画节点</p>
         * @param name - <p>视点动画名称</p>
         * @param index - <p>被更新节点索引</p>
         * @param params - <p>节点参数</p>
         * @returns <ul>
         * <li>是否更新成功</li>
         * </ul>
         */
        function updateNode(name: string, index: number, params: any): Promise<boolean>;
        /**
         * <p>截取视点动画节点视角</p>
         * @param name - <p>视点动画名称</p>
         * @param index - <p>节点索引</p>
         * @returns <ul>
         * <li>是否截取成功</li>
         * </ul>
         */
        function snippingNodeView(name: string, index: number): Promise<boolean>;
        /**
         * <p>删除视点动画中节点</p>
         * @param name - <p>视点动画名称</p>
         * @param index - <p>节点索引</p>
         * @returns <ul>
         * <li>是否删除成功</li>
         * </ul>
         */
        function removeNode(name: string, index: number): Promise<boolean>;
        /**
         * <p>预览视点动画节点</p>
         * @param name - <p>视点动画名称</p>
         * @param index - <p>节点索引</p>
         */
        function previewNode(name: string, index: number): void;
        /**
         * <p>设置视点动画循环模式</p>
         */
        function setLoopPlayMode(type: string): void;
        /**
         * <p>激活视点动画声音</p>
         */
        function activateSound(): void;
        /**
         * <p>取消激活视点动画声音</p>
         */
        function deactivatedSound(): void;
        /**
         * <p>增加视点模块</p>
         * @example
         * let module = {};
         * module.snapshot = () => {
         *     // 记录的数据
         *     return {name: 'name'}
         * };
         * // 恢复执行动作
         * module.recover = (data) => {};
         * module.isRecoverOk = () => {
         *     return true;
         * };
         * module.recoverCleardata) => {};
         * THINGX.ViewPoint.addModule('add-module', module);
         * @param name - <p>模块名称</p>
         * @param module - <p>模块实现，需实现方法 snapshot-记录视点/recover-恢复视点/isRecoverOk-是否恢复完成/recoverClear-恢复清理</p>
         * @param [index] - <p>增加位置，默认增加到当前视点模块末尾</p>
         * @returns <ul>
         * <li>是否增加成功</li>
         * </ul>
         */
        function addModule(name: string, module: any, index?: number): boolean;
        /**
         * <p>获取所有的视点动画列表</p>
         */
        function getList(): Promise<object[]>;
        /**
         * <p>展示视点动画列表，需要在视点动画模块显示状态</p>
         * @param name - <p>视点动画名称</p>
         */
        function showList(name: string): object[];
        /**
         * <p>获取视点动画编辑列表</p>
         * @param name - <p>视点动画名称</p>
         */
        function getEditList(name: string): Promise<object[]>;
        /**
         * <p>展示视点动画编辑列表，需要在视点动画模块显示状态</p>
         * @param name - <p>视点动画名称</p>
         */
        function showEditList(name: string): object[];
        /**
         * <p>显示视点动画</p>
         */
        function show(): void;
        /**
         * <p>隐藏视点动画</p>
         */
        function hide(): void;
        /**
         * <p>播放视点动画</p>
         * @param name - <p>视点动画名称</p>
         * @returns <ul>
         * <li>视点播放是否成功</li>
         * </ul>
         */
        function play(name: string): Promise<boolean>;
        /**
         * <p>挂起当前视点动画</p>
         */
        function suspend(): void;
        /**
         * <p>恢复当前视点动画</p>
         */
        function resume(): void;
        /**
         * <p>停止播放当前视点动画</p>
         */
        function stop(): void;
        /**
         * <p>增加视点动画</p>
         * @param name - <p>视点动画名称</p>
         * @returns <ul>
         * <li>是否增加成功</li>
         * </ul>
         */
        function add(name: string): Promise<boolean>;
        /**
         * <p>获取视点动画</p>
         * @param name - <p>视点动画名称</p>
         */
        function get(name: string): any;
        /**
         * <p>删除视点动画</p>
         * @param name - <p>视点动画名称</p>
         * @returns <ul>
         * <li>是否删除成功</li>
         * </ul>
         */
        function remove(name: string): Promise<boolean>;
        /**
         * <p>修改视点动画名称</p>
         * @param oldName - <p>视点动画旧名称</p>
         * @param newName - <p>视点动画新名称</p>
         * @returns <ul>
         * <li>是否重命名成功</li>
         * </ul>
         */
        function reName(oldName: string, newName: string): Promise<boolean>;
        /**
         * <p>增加视点动画节点</p>
         * @param name - <p>视点动画名称</p>
         * @param [params] - <p>节点参数</p>
         * @returns <ul>
         * <li>是否增加成功</li>
         * </ul>
         */
        function addNode(name: string, params?: any): Promise<boolean>;
        /**
         * <p>更新视点动画节点</p>
         * @param name - <p>视点动画名称</p>
         * @param index - <p>被更新节点索引</p>
         * @param params - <p>节点参数</p>
         * @returns <ul>
         * <li>是否更新成功</li>
         * </ul>
         */
        function updateNode(name: string, index: number, params: any): Promise<boolean>;
        /**
         * <p>截取视点动画节点视角</p>
         * @param name - <p>视点动画名称</p>
         * @param index - <p>节点索引</p>
         * @returns <ul>
         * <li>是否截取成功</li>
         * </ul>
         */
        function snippingNodeView(name: string, index: number): Promise<boolean>;
        /**
         * <p>删除视点动画中节点</p>
         * @param name - <p>视点动画名称</p>
         * @param index - <p>节点索引</p>
         * @returns <ul>
         * <li>是否删除成功</li>
         * </ul>
         */
        function removeNode(name: string, index: number): Promise<boolean>;
        /**
         * <p>预览视点动画节点</p>
         * @param name - <p>视点动画名称</p>
         * @param index - <p>节点索引</p>
         */
        function previewNode(name: string, index: number): void;
        /**
         * <p>设置视点动画循环模式</p>
         */
        function setLoopPlayMode(type: string): void;
        /**
         * <p>激活视点动画声音</p>
         */
        function activateSound(): void;
        /**
         * <p>取消激活视点动画声音</p>
         */
        function deactivatedSound(): void;
        /**
         * <p>增加视点模块</p>
         * @example
         * let module = {};
         * module.snapshot = () => {
         *     // 记录的数据
         *     return {name: 'name'}
         * };
         * // 恢复执行动作
         * module.recover = (data) => {};
         * module.isRecoverOk = () => {
         *     return true;
         * };
         * module.recoverCleardata) => {};
         * THINGX.ViewPoint.addModule('add-module', module);
         * @param name - <p>模块名称</p>
         * @param module - <p>模块实现，需实现方法 snapshot-记录视点/recover-恢复视点/isRecoverOk-是否恢复完成/recoverClear-恢复清理</p>
         * @param [index] - <p>增加位置，默认增加到当前视点模块末尾</p>
         * @returns <ul>
         * <li>是否增加成功</li>
         * </ul>
         */
        function addModule(name: string, module: any, index?: number): boolean;
        /**
         * <p>获取所有的视点动画列表</p>
         */
        function getList(): Promise<object[]>;
        /**
         * <p>展示视点动画列表，需要在视点动画模块显示状态</p>
         * @param name - <p>视点动画名称</p>
         */
        function showList(name: string): object[];
        /**
         * <p>获取视点动画编辑列表</p>
         * @param name - <p>视点动画名称</p>
         */
        function getEditList(name: string): Promise<object[]>;
        /**
         * <p>展示视点动画编辑列表，需要在视点动画模块显示状态</p>
         * @param name - <p>视点动画名称</p>
         */
        function showEditList(name: string): object[];
    }
    /**
     * <p>调试</p>
     */
    namespace Debug {
        /**
         * <p>设置debug等级</p>
         * @param level - <p>console打印等级 debug/log/info/warn/error</p>
         * @param [storage = false] - <p>是否存储到local storage中，下次刷新直接生效</p>
         */
        function setLevel(level: string, storage?: boolean): void;
        /**
         * <p>获取debug等级</p>
         */
        function getLevel(): string;
        /**
         * <p>是否重写console debug/log/info/warn/error，默认为true</p>
         */
        var overwriteConsole: boolean;
        /**
         * <p>console 过滤白名单，默认为['debug', 'log', 'info', 'warn', 'error']</p>
         */
        var consoleWhiteList: string[];
    }
}

/**
 * <p>需要代理的thingjs事件</p>
 */
declare const proxyEventList: any;

/**
 * <p>处理旧tag到新tag的映射</p>
 * @param func - <p>处理函数</p>
 * @param that - <p>对象</p>
 * @param args - <p>参数</p>
 */
declare function processNewTag(func: (...params: any[]) => any, that: THING.App | THING.BaseObject, args: any[]): void;

