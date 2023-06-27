import { ThreadCheckerWorker } from "../workers/thread.checker.worker";

THING.BaseObject3D.prototype.getMaterials = function () {
    let arr = this.node._node.getMaterials()
    if (this.hasChildren()) {
        this.children.forEach(child => {
          arr = arr.concat(child.node._node.getMaterials());
        });
    }  
    let materials = arr.filter((item,index) => arr.indexOf(item) === index );
    return materials;
}

THING.BaseObject3D.prototype.getTextures = function () {
    let arr = this.node._node.getTextures()
    if (this.hasChildren()) {
        this.children.forEach(child => {
          arr = arr.concat(child.node._node.getTextures());
        });
    }  
    let textures = arr.filter((item,index) => arr.indexOf(item) === index );
    return textures;
}

THING.BaseObject3D.prototype.getImages = function () {
    let arr = this.node._node.getImages()
    if (this.hasChildren()) {
        this.children.forEach(child => {
          arr = arr.concat(child.node._node.getImages());
        });
    }  
    let images = arr.filter((item,index) => arr.indexOf(item) === index );
    return images;
}