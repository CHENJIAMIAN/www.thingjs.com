var se = {
    process: function(object, subMaterials) {
        var toRemove = [];

        object.traverse(function(node) {
            processMaterial(node, subMaterials);
            enableShadow(node);
            updateMaterial(node);
            processEffects(node);
            processWireframe(node, toRemove);
        });

        toRemove.forEach(function(node) {
            if (node.parent) {
                node.parent.remove(node);
            }
        });
    }
}

function processMaterial(node, subMaterials) {
    if (node.material && node.material.userData && node.material.userData.gltfExtensions) {
        var blend = node.material.userData.gltfExtensions.blend;
        if (blend) {
            var texture = node.material.__texture;
            var count = node.geometry.index.count;
            var groups = [{
                materialIndex: 0,
                start: 0,
                count: count
            }];
            var materials = [node.material];
            var useAlphaIndex = false;
            var skinning = false;

            if (node.material.defines && node.material.defines.USE_ALPHAINDEX) {
                useAlphaIndex = true;
            }
            if (node.material.skinning) {
                skinning = true;
            }

            for (var i = 0; i < blend.length; i++) {
                var subMaterial = subMaterials[blend[i].subMaterial].clone();
                if (subMaterial) {
                    subMaterial.transparent = true;
                    if (useAlphaIndex) {
                        subMaterial.defines = subMaterial.defines || {};
                        subMaterial.defines.USE_ALPHAINDEX = true;
                    }
                    if (skinning) {
                        subMaterial.skinning = true;
                    }
                    if (blend[i].maskTexture) {
                        var texCoord = blend[i].maskTexture.texCoord || 0;
                        if (texCoord === 1) {
                            subMaterial.defines.USE_ALPHA_UV2 = "";
                        } else if (texCoord === 2) {
                            subMaterial.defines.USE_ALPHA_UV3 = "";
                        }
                        if (blend[i].maskTexture.extensions) {
                            subMaterial.userData.gltfExtensions.alphaTexture = blend[i].maskTexture.extensions;
                        }
                        subMaterial.alphaMap = texture[i];
                        subMaterial.needsUpdate = true;
                    }
                    materials.push(subMaterial);
                    groups.push({
                        materialIndex: materials.length - 1,
                        start: 0,
                        count: count
                    });
                }
            }

            node.material = materials;
            node.geometry.groups = groups;
        }
    }
}

function enableShadow(node) {
    if (node.isMesh) {
        node.castShadow = true;
        node.receiveShadow = true;
    }
}

function updateMaterial(node) {
    if (node.material) {
        if (Array.isArray(node.material)) {
            node.material.forEach(function(material) {
                if (material.map) {
                    if (material.userData.gltfExtensions.useDiffuseUV2) {
                        material.defines = material.defines || {};
                        material.defines.USE_DIFFUSE_UV2 = "";
                    }
                    material.map.anisotropy = 16;
                    material.map.needsUpdate = true;
                }
            });
        } else if (node.material.map) {
            if (node.material.userData.gltfExtensions.useDiffuseUV2) {
                node.material.defines = node.material.defines || {};
                node.material.defines.USE_DIFFUSE_UV2 = "";
            }
            node.material.map.anisotropy = 16;
            node.material.map.needsUpdate = true;
        }
    }
}

function processEffects(node) {
    if (node.userData && node.userData.gltfExtensions) {
        if (node.userData.gltfExtensions.effects) {
            node.technique = {};

            if (node.userData.gltfExtensions.effects.skipGlow) {
                node.technique.middleGlow = "skip";
                node.traverse(function(child) {
                    if (child.isMesh || child.isLine || child.isSprite || child.isPoints) {
                        child.technique = child.technique || {};
                        child.technique.middleGlow = "skip";
                        child._cachedTechnique = child._cachedTechnique || {};
                        child._cachedTechnique.middleGlow = "skip";
                    }
                });
            }

            if (node.userData.gltfExtensions.effects.bloom || node.userData.gltfExtensions.effects.glow) {
                node.technique.middleGlow = true;
                node.traverse(function(child) {
                    if (child.isMesh || child.isLine || child.isSprite || child.isPoints) {
                        child.technique = child.technique || {};
                        child.technique.middleGlow = true;
                        child._cachedTechnique = child._cachedTechnique || {};
                        child._cachedTechnique.middleGlow = true;
                    }
                });
            }

            if (node.userData.gltfExtensions.effects.skipInnerGlow) {
                node.technique.innerGlow = "skip";
                node.traverse(function(child) {
                    if (child.isMesh || child.isLine || child.isSprite || child.isPoints) {
                        child.technique = child.technique || {};
                        child.technique.innerGlow = "skip";
                        child._cachedTechnique = child._cachedTechnique || {};
                        child._cachedTechnique.innerGlow = "skip";
                    }
                });
            }

            if (node.userData.gltfExtensions.effects.glowInset || node.userData.gltfExtensions.effects.innerGlow) {
                node.technique.innerGlow = true;
                node.traverse(function(child) {
                    if (child.isMesh || child.isLine || child.isSprite || child.isPoints) {
                        child.technique = child.technique || {};
                        child.technique.innerGlow = true;
                        child._cachedTechnique = child._cachedTechnique || {};
                        child._cachedTechnique.innerGlow = true;
                    }
                });
            }

            if (node.userData.gltfExtensions.effects.skipOutline) {
                node.userData.skipOutline = true;
                node.traverse(function(child) {
                    if (child.isMesh || child.isLine || child.isSprite || child.isPoints) {
                        child.userData = child.userData || {};
                        child.userData.skipOutline = true;
                    }
                });
            }

            node._cachedTechnique = JSON.parse(JSON.stringify(node.technique));
            delete node.userData.effects;
        }

        if (node.userData.gltfExtensions.renderOrder !== undefined) {
            var renderOrder = Number(node.userData.gltfExtensions.renderOrder);
            node.traverse(function(child) {
                if (child.isMesh || child.isLine || child.isSprite || child.isPoints) {
                    child.renderOrder = renderOrder;
                }
            });
        }

        if (node.userData.gltfExtensions.castShadows !== undefined) {
            node.castShadow = !!node.userData.gltfExtensions.castShadows;
        }

        if (node.userData.gltfExtensions.receiveShadows !== undefined){
            node.receiveShadow = !!node.userData.gltfExtensions.receiveShadows;
        }
    }
}

function processWireframe(node, toRemove) {
    if (node.userData && node.userData.gltfExtensions && node.userData.gltfExtensions.wireframe) {
        var gltfExtensions = node.userData.gltfExtensions;

        if (gltfExtensions.wireframe.type == 2) {
            if (gltfExtensions.wireframe.wireframeVerts) {
                var positions = [];
                var uvs = [];

                gltfExtensions.wireframe.wireframeVerts.forEach(function(vert) {
                    var pos1 = JSON.parse(vert.pos1);
                    var pos2 = JSON.parse(vert.pos2);
                    var uv1 = JSON.parse(vert.uv1);
                    var uv2 = JSON.parse(vert.uv2);

                    positions.push(pos1[0], pos1[1], pos1[2], pos2[0], pos2[1], pos2[2]);
                    uvs.push(uv1[0], uv1[1], uv2[0], uv2[1]);
                });

                var geometry = new THREE.BufferGeometry();
                geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
                geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));

                var material = node.material;
                if (!material && node.children[0]) {
                    material = node.children[0].material;
                }
                if (Array.isArray(material)) {
                    material = material[0];
                }
                if (material.defines.USE_ALPHAINDEX || material.vertexColors === THREE.VertexColors) {
                    var clonedMaterial = material.clone();
                    clonedMaterial.vertexColors = 0;
                    if (clonedMaterial.defines) {
                        delete clonedMaterial.defines.USE_ALPHAINDEX;
                    }
                    clonedMaterial.userData = material.userData || {};
                    material = clonedMaterial;
                }

                var lineSegments = new THREE.LineSegments(geometry, material);
                lineSegments.userData.skipStyle = true;
                lineSegments.technique = node.technique;
                lineSegments.material.flatShading = true;
                lineSegments.renderOrder = 1;

                toRemove.push(node);
                node.parent.add(lineSegments);
            }
        } else if (gltfExtensions.wireframe.type == 3) {
            node.children.slice().forEach(function(child) {
                if (child.isMesh) {
                    var edgesGeometry = new THREE.EdgesGeometry(child.geometry, gltfExtensions.wireframe.wireframeThreshold || .1);
                    var material;

                    if (Array.isArray(child.material)) {
                        material = child.material.map(function(mat) {
                            return new THREE.MeshBasicMaterial({
                                color: mat.color,
                                map: mat.map,
                                alphaMap: mat.alphaMap,
                                transparent: mat.transparent,
                                depthWrite: mat.depthWrite,
                                blending: mat.blending
                            });
                        })[0];
                        material.userData = child.material[0].userData || {};
                    } else {
                        material = new THREE.MeshBasicMaterial({
                            color: child.material.color,
                            map: child.material.map,
                            alphaMap: child.material.alphaMap,
                            transparent: child.material.transparent,
                            depthWrite: child.material.depthWrite,
                            blending: child.material.blending
                        });
                        material.userData = child.material.userData || {};
                    }

                    var lineSegments = new THREE.LineSegments(edgesGeometry, material);
                    lineSegments.userData.skipStyle = true;
                    lineSegments.name = child.name;
                    lineSegments.position.copy(child.position);
                    lineSegments.scale.copy(child.scale);
                    lineSegments.quaternion.copy(child.quaternion);
                    lineSegments.technique = child.technique;
                    lineSegments.material.flatShading = true;
                    lineSegments.renderOrder = 1;

                    node.add(lineSegments);
                    toRemove.push(child);
                }
            });
        }

        delete gltfExtensions.wireframe;
    }
}
