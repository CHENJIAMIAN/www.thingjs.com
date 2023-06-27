import { TreeView } from "@playcanvas/pcui";
import { TreeItem } from "./TreeItem";
import { HierarchyItemType } from "../../const"

export class Tree extends TreeView {

    constructor(arg) {
        arg = arg || {};
        arg.width = typeof arg.width !== 'undefined' ? arg.width : 200;
        arg.height = typeof arg.height !== 'undefined' ? arg.height : 400;
        arg.scrollable = typeof arg.scrollable !== 'undefined' ? arg.scrollable : true;
        super(arg);

        this.icons = {
            root: 'E310',
            object: 'E310',
            body: 'E251',
            bodyNode: 'E233',
            children: 'E220'
        }
    }

    _generateTreeID(uuid, key) {
        let treeId = uuid + key;
        return treeId;
    }

    _generateTreeItem(itemdata, key, callback) {//onTreeItemCheck, onTreeItemClick) {
        const treeItem = new TreeItem({
            tree: this,
            icon: this.icons.object,
            text: itemdata.text,
            open: false,
            id: itemdata.id,
            checked: itemdata.checked,
            data: itemdata
        });
        callback(treeItem, key);

        let id = this._generateTreeID(itemdata.id, key);
        if (!this.treeItemMap.has(id)) {
            this.treeItemMap.set(id, treeItem);
        }
        return treeItem;
    }

    _generateTreeItemBodyNode(parent, body, callback) {
        const treeItemBodyPart = this._generateTreeItem(body, HierarchyItemType.BodyNode, callback);
        treeItemBodyPart.icon = this.icons.bodyNode;
        parent.append(treeItemBodyPart);

        body.children.forEach(item => {
            this._generateTreeItemBodyNode(treeItemBodyPart, item, callback);
        })
    }

    _buildTreeItem(parent, itemdata, callback) {
        if (!itemdata) {
            return;
        }
        //generate tree item 
        const treeItem = this._generateTreeItem(itemdata, HierarchyItemType.Object, callback);
        if (itemdata.isRoot) {
            treeItem.icon = this.icons.root;
        }
        parent.append(treeItem);

        //generate body
        const treeItemBody = this._generateTreeItem(itemdata, HierarchyItemType.Body, callback);
        treeItemBody.text = itemdata.instancing ? 'Body(Instancing*)' : 'Body';
        treeItemBody.icon = this.icons.body;
        treeItem.append(treeItemBody);
        if (itemdata.body) {
            this._generateTreeItemBodyNode(treeItemBody, itemdata.body, callback);
        }

        //generate children
        let count = itemdata.children.length;
        if (count > 0) {
            const treeItemChildren = this._generateTreeItem(itemdata, HierarchyItemType.Children, callback);
            treeItemChildren.text = `Children(${count})`;
            treeItemChildren.icon = this.icons.children;
            treeItem.append(treeItemChildren);

            itemdata.children.forEach(child => {
                this._buildTreeItem(treeItemChildren, child, callback);
            })
        }
    }

    build(data, callback) {
        this.data = data;
        this.treeItemMap = new Map();
        this._buildTreeItem(this, data, callback);
    }

    getItem(id, key){
        let treeId = this._generateTreeID(id, key);
        if (this.treeItemMap.has(treeId)) {
            return this.treeItemMap.get(treeId);
        }
        return null;
    }

    selectItem(treeItem) {
        if (treeItem) {
            this.selected.forEach(elm => {
                elm.selected = false;
            });
            treeItem.selected = true;
        }
    }

}