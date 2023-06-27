import { TreeViewItem, BooleanInput } from "@playcanvas/pcui";

export class TreeItem extends TreeViewItem {

    constructor(arg) {
        super(arg);

        this.data = arg['data'] ? arg['data'] : {};
        this.id = arg['id'] ? arg['id'] : null;

        this._labelBoolValue = arg['checked'] ? arg['checked'] : false;
        this._labelBool = new BooleanInput({
            value: this._labelBoolValue
        });
        this._containerContents.domContent.insertBefore(this._labelBool.dom, this.textLabel.dom)
    }

    registerCheckFunc(func) {
        const that = this;
        if (func && typeof func === 'function') {
            that._labelBoolClick = that._labelBool.on('change', function (ev) {
                func.call(that, that, ev);
            })
        }
    }

    registerClickFunc(func) {
        const that = this;
        if (func && typeof func === 'function') {
            that._containerContents.dom.removeEventListener('click', that._domEvtClick);
            that._containerContents.dom.addEventListener('click', (ev) => {
                func(that, {
                    pressCtrl:  that.treeView.pressedCtrl,
                    pressShift:  that.treeView.pressShift
                });
            });
        }
    }

    registerDblClickFunc(func) {
        // replace the dbl click func; do not use default rename func
        const that = this;
        if (func && typeof func === 'function') {
            that._containerContents.dom.removeEventListener('dblclick', that._domEvtDblClick);
            that._containerContents.dom.addEventListener('dblclick', (ev) => {
                func(that);
            });
        }
    }

}