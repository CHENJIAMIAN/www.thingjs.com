data={
  "VERSION" : "1.0.21",
  "data" : {
    "enviroment" : {
      "type" : "image",
      "value" : "skybox/20210928144752250_192855/20210928144752250_245250.png"
    },
    "resourcePrefix" : "http://192.168.21.119:90/citybuilder_console/upload/",
    "ground" : {
      "item" : [ {
        "code" : "g1648710934744",
        "name" : "特效地面1620697703762",
        "url" : "ground/icon_20210625174703331_294105.png",
        "color" : "rgba(50,138,207,1)",
        "opacity" : 1,
        "maskUrl" : "ground/systemIcons/光1.png",
        "flowColor" : "rgba(121,255,217,1)",
        "glowFactor" : 8.7,
        "animationSpeed" : 1,
        "groundClearance" : -1,
        "repeatFactorX" : 10,
        "repeatFactorY" : 10
      }, {
        "code" : "g1648710934744",
        "name" : "特效地面1624614663498",
        "url" : "ground/icon_20210625175116741_958937.png",
        "color" : "rgba(43,76,145,1)",
        "opacity" : 0,
        "maskUrl" : "ground/systemIcons/光1.png",
        "flowColor" : "rgba(134,255,236,1)",
        "glowFactor" : 7.9,
        "animationSpeed" : 0.5,
        "groundClearance" : -1,
        "repeatFactorX" : 20,
        "repeatFactorY" : 20
      }, {
        "code" : "g1648710934744",
        "name" : "特效地面1624614711238",
        "url" : "ground/icon_20210418125256801_956034.png",
        "color" : "rgba(139,255,255,1)",
        "opacity" : 0.54,
        "maskUrl" : "ground/systemIcons/光1.png",
        "flowColor" : "rgba(110,255,255,1)",
        "glowFactor" : 7.6,
        "animationSpeed" : 1,
        "groundClearance" : -1,
        "repeatFactorX" : 3,
        "repeatFactorY" : 3
      }, {
        "code" : "g1648782522384",
        "name" : "特效地面1648782522384",
        "url" : "ground/systemIcons/地板面02.png",
        "color" : "#ffffff",
        "opacity" : 0.04,
        "repeatFactor" : 30,
        "repeatFactorX" : 20,
        "repeatFactorY" : 20,
        "maskUrl" : "ground/systemIcons/光1.png",
        "flowColor" : "#ffffff",
        "glowFactor" : 0,
        "animationSpeed" : 1,
        "groundClearance" : -1
      } ],
      "groundReflect" : true,
      "reflectFactor" : 0.89,
      "enable" : true,
      "visibleOnEarth" : true
    },
    "particle" : {
      "item" : [ {
        "code" : "p1615535145391",
        "name" : "特效粒子1615535145391",
        "id" : "20091111djo61eeqj3owthaosvgyzdgp",
        "content" : {
          "offsetY" : 50,
          "density" : 0.01,
          "offsetHeight" : 0,
          "listGroups" : [ {
            "iMaxParticleCount" : 787,
            "texture" : {
              "url" : "ground/systemIcons/光点黑白02.png"
            },
            "listEmitters" : [ {
              "listColor" : [ {
                "vec3Value" : {
                  "x" : 0.6588235294117647,
                  "y" : 1,
                  "z" : 0.9921568627450981
                },
                "vec3Spread" : {
                  "x" : 0.85,
                  "y" : 0.48,
                  "z" : 0.34
                }
              } ],
              "listSize" : [ {
                "fSpread" : 30,
                "fValue" : 5.843
              } ],
              "velocity" : {
                "vec3Value" : {
                  "x" : 0,
                  "y" : 6.390000000000001,
                  "z" : 0
                },
                "vec3Spread" : {
                  "x" : 0,
                  "y" : 0,
                  "z" : 0
                }
              },
              "position" : {
                "vec3Spread" : {
                  "x" : 700.5105590820311,
                  "y" : 100,
                  "z" : 691.0789947509766
                }
              },
              "listOpacity" : [ {
                "fSpread" : 0.374,
                "fValue" : 0.544
              } ],
              "iParticleCount" : 207
            } ]
          } ],
          "percent" : 2,
          "editCount" : {
            "listColor" : 1,
            "listSize" : 1,
            "listOpacity" : 1
          },
          "height" : 100
        },
        "url" : "model/particle/20091111djo61eeqj3owthaosvgyzdgp/"
      } ],
      "enable" : true,
      "visibleOnEarth" : true
    },
    "version" : "1.9.2",
    "class" : {
      "FloorRoof" : {
        "useColormap" : true,
        "reflection" : {
          "roughness" : 0.2,
          "enable" : true,
          "metalness" : 0.7,
          "specularFactor" : 1
        },
        "color" : {
          "enable" : false,
          "value" : "#888888"
        },
        "scrollSpeed" : 0.003,
        "useScrollTex" : false,
        "wireframe" : {
          "color" : "rgba(102,224,255,1)",
          "enable" : false,
          "opacity" : 0.33,
          "glow" : true
        },
        "enable" : true,
        "scrollColor" : "#ffffff",
        "colormap" : {
          "0" : "rgba(74,74,74,1)",
          "1" : "rgba(84,84,86,1)"
        },
        "opacity" : 0.8,
        "scrollTex" : "uvMap/systemIcons/scroll.jpg",
        "colormapIntensity" : 1,
        "glow" : 0,
        "colorImage" : {
          "color" : "#888888",
          "enable" : false
        },
        "fresnel" : {
          "power" : 0,
          "inverse" : false
        }
      },
      "Facade" : {
        "useColormap" : true,
        "reflection" : {
          "roughness" : 0.1,
          "enable" : true,
          "metalness" : 0.8,
          "specularFactor" : 0
        },
        "color" : {
          "enable" : false,
          "value" : "#888888"
        },
        "scrollSpeed" : 0.003,
        "useScrollTex" : false,
        "wireframe" : {
          "color" : "#ffffff",
          "enable" : true,
          "opacity" : 0.23,
          "glow" : false
        },
        "enable" : true,
        "scrollColor" : "#ffffff",
        "colormap" : {
          "0.15" : "rgba(57,92,195,1)",
          "0.33" : "rgba(3,82,245,1)",
          "0.97" : "rgba(0,0,0,1)",
          "0.73" : "rgba(0,21,63,1)",
          "0.84" : "rgba(0,0,0,1)"
        },
        "opacity" : 1,
        "scrollTex" : "uvMap/systemIcons/scroll.jpg",
        "colormapIntensity" : 1,
        "glow" : 0,
        "colorImage" : {
          "color" : "#888888",
          "enable" : false
        },
        "fresnel" : {
          "power" : 0,
          "inverse" : false
        }
      },
      "Ground" : {
        "useColormap" : true,
        "reflection" : {
          "roughness" : 0.4,
          "enable" : true,
          "metalness" : 0.84,
          "specularFactor" : 0
        },
        "color" : {
          "enable" : false,
          "value" : "#888888"
        },
        "scrollSpeed" : 0.003,
        "useScrollTex" : false,
        "wireframe" : {
          "color" : "rgba(83,189,255,1)",
          "enable" : false,
          "opacity" : 0.47,
          "glow" : false
        },
        "enable" : true,
        "scrollColor" : "#ffffff",
        "colormap" : {
          "0" : "rgba(1,4,6,1)",
          "1" : "rgba(1,7,14,1)"
        },
        "opacity" : 0.5,
        "scrollTex" : "uvMap/systemIcons/scroll.jpg",
        "colormapIntensity" : 1,
        "glow" : 0,
        "colorImage" : {
          "color" : "#888888",
          "enable" : false
        },
        "fresnel" : {
          "power" : 0,
          "inverse" : false
        }
      },
      "Tree" : {
        "useColormap" : true,
        "reflection" : {
          "roughness" : 0.2,
          "enable" : false,
          "metalness" : 0.6,
          "specularFactor" : 1
        },
        "color" : {
          "enable" : false,
          "value" : "#888888"
        },
        "scrollSpeed" : 0.003,
        "useScrollTex" : false,
        "wireframe" : {
          "color" : "#00fff0",
          "enable" : false,
          "opacity" : 0.2,
          "glow" : false
        },
        "enable" : true,
        "scrollColor" : "#ffffff",
        "colormap" : {
          "0" : "#00ffb2",
          "0.36" : "#2fb8d6",
          "0.99" : "#135e1f",
          "0.66" : "#128cd1"
        },
        "opacity" : 0.18,
        "scrollTex" : "uvMap/systemIcons/scroll.jpg",
        "colormapIntensity" : 1,
        "glow" : 0,
        "colorImage" : {
          "color" : "#888888",
          "enable" : false
        },
        "fresnel" : {
          "power" : 0,
          "inverse" : false
        }
      },
      "Thing" : {
        "useColormap" : true,
        "reflection" : {
          "roughness" : 0.76,
          "enable" : true,
          "metalness" : 0.76,
          "specularFactor" : 1
        },
        "color" : {
          "enable" : false,
          "value" : "#888888"
        },
        "scrollSpeed" : 0.003,
        "useScrollTex" : false,
        "wireframe" : {
          "color" : "rgba(102,224,255,1)",
          "enable" : false,
          "opacity" : 0.33,
          "glow" : true
        },
        "enable" : true,
        "scrollColor" : "#ffffff",
        "colormap" : {
          "0" : "rgba(112,112,112,1)",
          "1" : "rgba(116,116,116,1)"
        },
        "opacity" : 0.73,
        "scrollTex" : "uvMap/systemIcons/scroll.jpg",
        "colormapIntensity" : 1,
        "glow" : 0,
        "colorImage" : {
          "color" : "#888888",
          "enable" : false
        },
        "fresnel" : {
          "power" : 0,
          "inverse" : false
        }
      },
      "FloorCeiling" : {
        "useColormap" : true,
        "reflection" : {
          "roughness" : 0.2,
          "enable" : false,
          "metalness" : 0.6,
          "specularFactor" : 1
        },
        "color" : {
          "enable" : false,
          "value" : "#888888"
        },
        "scrollSpeed" : 0.003,
        "useScrollTex" : false,
        "wireframe" : {
          "color" : "#ffffff",
          "enable" : false,
          "opacity" : 0.8300000000000001,
          "glow" : false
        },
        "enable" : true,
        "scrollColor" : "#ffffff",
        "colormap" : {
          "1" : "#233987",
          "0.13" : "#1b29aa"
        },
        "opacity" : 0.85,
        "scrollTex" : "uvMap/systemIcons/scroll.jpg",
        "colormapIntensity" : 1,
        "glow" : 0,
        "colorImage" : {
          "color" : "#888888",
          "enable" : false
        },
        "fresnel" : {
          "power" : 0,
          "inverse" : false
        }
      },
      "FloorManualWall" : {
        "useColormap" : true,
        "reflection" : {
          "roughness" : 0.2,
          "enable" : true,
          "metalness" : 0.8,
          "specularFactor" : 0
        },
        "color" : {
          "enable" : false,
          "value" : "#888888"
        },
        "scrollSpeed" : 0.003,
        "useScrollTex" : false,
        "wireframe" : {
          "color" : "rgba(255,225,105,1)",
          "enable" : true,
          "opacity" : 0.56,
          "glow" : true
        },
        "enable" : true,
        "scrollColor" : "#ffffff",
        "colormap" : {
          "0.15" : "rgba(74,74,74,1)",
          "0.33" : "rgba(84,84,84,1)",
          "0.73" : "rgba(114,114,114,1)",
          "0.84" : "rgba(18,18,18,1)",
          "0.97" : "rgba(48,48,48,1)"
        },
        "opacity" : 1,
        "scrollTex" : "uvMap/systemIcons/scroll.jpg",
        "colormapIntensity" : 1,
        "glow" : 0,
        "colorImage" : {
          "color" : "#888888",
          "enable" : false
        },
        "fresnel" : {
          "power" : 0,
          "inverse" : false
        }
      },
      "Door" : {
        "useColormap" : true,
        "reflection" : {
          "roughness" : 0.6,
          "enable" : true,
          "metalness" : 0.1,
          "specularFactor" : 1
        },
        "color" : {
          "enable" : false,
          "value" : "#888888"
        },
        "scrollSpeed" : 0.003,
        "useScrollTex" : false,
        "wireframe" : {
          "color" : "rgba(255,208,137,1)",
          "enable" : true,
          "opacity" : 1,
          "glow" : true
        },
        "enable" : true,
        "scrollColor" : "#ffffff",
        "colormap" : {
          "0" : "rgba(255,147,46,1)",
          "1" : "rgba(255,193,60,1)"
        },
        "opacity" : 1,
        "scrollTex" : "uvMap/systemIcons/scroll.jpg",
        "colormapIntensity" : 1,
        "glow" : 1,
        "colorImage" : {
          "color" : "#888888",
          "enable" : false
        },
        "fresnel" : {
          "power" : 0,
          "inverse" : false
        }
      },
      "Objects" : {
        "useColormap" : true,
        "reflection" : {
          "roughness" : 0.76,
          "enable" : true,
          "metalness" : 0.76,
          "specularFactor" : 1
        },
        "color" : {
          "enable" : false,
          "value" : "#888888"
        },
        "scrollSpeed" : 0.003,
        "useScrollTex" : false,
        "wireframe" : {
          "color" : "rgba(105,225,255,1)",
          "enable" : true,
          "opacity" : 0.33,
          "glow" : true
        },
        "enable" : true,
        "scrollColor" : "#ffffff",
        "colormap" : {
          "1" : "rgba(0,176,255,1)",
          "0.06" : "rgba(0,55,137,1)"
        },
        "opacity" : 0.71,
        "scrollTex" : "uvMap/systemIcons/scroll.jpg",
        "colormapIntensity" : 1,
        "glow" : 0,
        "colorImage" : {
          "color" : "#888888",
          "enable" : false
        },
        "fresnel" : {
          "power" : 0,
          "inverse" : false
        }
      },
      "FacadeMain" : {
        "useColormap" : true,
        "reflection" : {
          "roughness" : 0.2,
          "enable" : true,
          "metalness" : 0.8,
          "specularFactor" : 0
        },
        "color" : {
          "enable" : false,
          "value" : "#888888"
        },
        "scrollSpeed" : 0.003,
        "useScrollTex" : false,
        "wireframe" : {
          "color" : "rgba(255,225,105,1)",
          "enable" : true,
          "opacity" : 0.56,
          "glow" : true
        },
        "enable" : true,
        "scrollColor" : "#ffffff",
        "colormap" : {
          "0.15" : "rgba(74,74,74,1)",
          "0.33" : "rgba(84,84,84,1)",
          "0.73" : "rgba(114,114,114,1)",
          "0.84" : "rgba(18,18,18,1)",
          "0.97" : "rgba(48,48,48,1)"
        },
        "opacity" : 1,
        "scrollTex" : "uvMap/systemIcons/scroll.jpg",
        "colormapIntensity" : 1,
        "glow" : 0,
        "colorImage" : {
          "color" : "#888888",
          "enable" : false
        },
        "fresnel" : {
          "power" : 0,
          "inverse" : false
        }
      },
      "FloorFloor" : {
        "useColormap" : true,
        "reflection" : {
          "roughness" : 0.76,
          "enable" : true,
          "metalness" : 0.3,
          "specularFactor" : 1
        },
        "color" : {
          "enable" : false,
          "value" : "#888888"
        },
        "scrollSpeed" : 0.003,
        "useScrollTex" : false,
        "wireframe" : {
          "color" : "rgba(102,224,255,1)",
          "enable" : false,
          "opacity" : 0.33,
          "glow" : true
        },
        "enable" : true,
        "scrollColor" : "#ffffff",
        "colormap" : {
          "0" : "rgba(30,30,30,1)",
          "1" : "rgba(52,52,52,1)"
        },
        "opacity" : 1,
        "scrollTex" : "uvMap/systemIcons/scroll.jpg",
        "colormapIntensity" : 1,
        "glow" : 0,
        "colorImage" : {
          "color" : "#888888",
          "enable" : false
        },
        "fresnel" : {
          "power" : 0,
          "inverse" : false
        }
      },
      "FacadeMainGlass" : {
        "useColormap" : true,
        "reflection" : {
          "roughness" : 0.76,
          "enable" : true,
          "metalness" : 0.76,
          "specularFactor" : 1
        },
        "color" : {
          "enable" : false,
          "value" : "#888888"
        },
        "scrollSpeed" : 0.003,
        "useScrollTex" : false,
        "wireframe" : {
          "color" : "rgba(102,224,255,1)",
          "enable" : true,
          "opacity" : 0.33,
          "glow" : true
        },
        "enable" : true,
        "scrollColor" : "#ffffff",
        "colormap" : {
          "0" : "rgba(4,104,255,1)",
          "1" : "rgba(0,176,255,1)"
        },
        "opacity" : 1,
        "scrollTex" : "uvMap/systemIcons/scroll.jpg",
        "colormapIntensity" : 1,
        "glow" : 0,
        "colorImage" : {
          "color" : "#888888",
          "enable" : false
        },
        "fresnel" : {
          "power" : 0,
          "inverse" : false
        }
      },
      "FacadeMainWin" : {
        "useColormap" : true,
        "reflection" : {
          "roughness" : 0.6,
          "enable" : true,
          "metalness" : 0.1,
          "specularFactor" : 1
        },
        "color" : {
          "enable" : false,
          "value" : "#888888"
        },
        "scrollSpeed" : 0.003,
        "useScrollTex" : false,
        "wireframe" : {
          "color" : "rgba(255,208,137,1)",
          "enable" : true,
          "opacity" : 1,
          "glow" : true
        },
        "enable" : true,
        "scrollColor" : "#ffffff",
        "colormap" : {
          "0" : "rgba(255,147,46,1)",
          "1" : "rgba(255,193,60,1)"
        },
        "opacity" : 1,
        "scrollTex" : "uvMap/systemIcons/scroll.jpg",
        "colormapIntensity" : 1,
        "glow" : 1,
        "colorImage" : {
          "color" : "#888888",
          "enable" : false
        },
        "fresnel" : {
          "power" : 0,
          "inverse" : false
        }
      },
      "Logo" : {
        "useColormap" : true,
        "reflection" : {
          "roughness" : 0.76,
          "enable" : true,
          "metalness" : 0.76,
          "specularFactor" : 1
        },
        "color" : {
          "enable" : false,
          "value" : "#888888"
        },
        "scrollSpeed" : 0.003,
        "useScrollTex" : false,
        "wireframe" : {
          "color" : "rgba(102,224,255,1)",
          "enable" : true,
          "opacity" : 0.33,
          "glow" : true
        },
        "enable" : true,
        "scrollColor" : "#ffffff",
        "colormap" : {
          "0" : "rgba(4,104,255,1)",
          "1" : "rgba(0,176,255,1)"
        },
        "opacity" : 0.71,
        "scrollTex" : "uvMap/systemIcons/scroll.jpg",
        "colormapIntensity" : 1,
        "glow" : 0,
        "colorImage" : {
          "color" : "#888888",
          "enable" : false
        },
        "fresnel" : {
          "power" : 0,
          "inverse" : false
        }
      },
      "FacadeMainRoof" : {
        "useColormap" : true,
        "reflection" : {
          "roughness" : 0.2,
          "enable" : true,
          "metalness" : 0.7,
          "specularFactor" : 1
        },
        "color" : {
          "enable" : false,
          "value" : "#888888"
        },
        "scrollSpeed" : 0.003,
        "useScrollTex" : false,
        "wireframe" : {
          "color" : "rgba(102,224,255,1)",
          "enable" : false,
          "opacity" : 0.33,
          "glow" : true
        },
        "enable" : true,
        "scrollColor" : "#ffffff",
        "colormap" : {
          "0" : "rgba(74,74,74,1)",
          "1" : "rgba(84,84,86,1)"
        },
        "opacity" : 0.8,
        "scrollTex" : "uvMap/systemIcons/scroll.jpg",
        "colormapIntensity" : 1,
        "glow" : 0,
        "colorImage" : {
          "color" : "#888888",
          "enable" : false
        },
        "fresnel" : {
          "power" : 0,
          "inverse" : false
        }
      },
      "FacadeMainDoor" : {
        "useColormap" : true,
        "reflection" : {
          "roughness" : 0.6,
          "enable" : true,
          "metalness" : 0.1,
          "specularFactor" : 1
        },
        "color" : {
          "enable" : false,
          "value" : "#888888"
        },
        "scrollSpeed" : 0.003,
        "useScrollTex" : false,
        "wireframe" : {
          "color" : "rgba(255,208,137,1)",
          "enable" : true,
          "opacity" : 1,
          "glow" : true
        },
        "enable" : true,
        "scrollColor" : "#ffffff",
        "colormap" : {
          "0" : "rgba(255,147,46,1)",
          "1" : "rgba(255,193,60,1)"
        },
        "opacity" : 1,
        "scrollTex" : "uvMap/systemIcons/scroll.jpg",
        "colormapIntensity" : 1,
        "glow" : 1,
        "colorImage" : {
          "color" : "#888888",
          "enable" : false
        },
        "fresnel" : {
          "power" : 0,
          "inverse" : false
        }
      },
      "FacadeMainCeiling" : {
        "useColormap" : true,
        "reflection" : {
          "roughness" : 0.76,
          "enable" : true,
          "metalness" : 0.3,
          "specularFactor" : 1
        },
        "color" : {
          "enable" : false,
          "value" : "#888888"
        },
        "scrollSpeed" : 0.003,
        "useScrollTex" : false,
        "wireframe" : {
          "color" : "rgba(102,224,255,1)",
          "enable" : false,
          "opacity" : 0.33,
          "glow" : true
        },
        "enable" : true,
        "scrollColor" : "#ffffff",
        "colormap" : {
          "0" : "rgba(72,72,72,1)",
          "1" : "rgba(52,52,52,1)"
        },
        "opacity" : 1,
        "scrollTex" : "uvMap/systemIcons/scroll.jpg",
        "colormapIntensity" : 1,
        "glow" : 0,
        "colorImage" : {
          "color" : "#888888",
          "enable" : false
        },
        "fresnel" : {
          "power" : 0,
          "inverse" : false
        }
      },
      "Window" : {
        "useColormap" : true,
        "reflection" : {
          "roughness" : 0.6,
          "enable" : true,
          "metalness" : 0.1,
          "specularFactor" : 1
        },
        "color" : {
          "enable" : false,
          "value" : "#888888"
        },
        "scrollSpeed" : 0.003,
        "useScrollTex" : false,
        "wireframe" : {
          "color" : "rgba(255,208,137,1)",
          "enable" : true,
          "opacity" : 1,
          "glow" : true
        },
        "enable" : true,
        "scrollColor" : "#ffffff",
        "colormap" : {
          "0" : "rgba(255,147,46,1)",
          "1" : "rgba(255,193,60,1)"
        },
        "opacity" : 1,
        "scrollTex" : "uvMap/systemIcons/scroll.jpg",
        "colormapIntensity" : 1,
        "glow" : 1,
        "colorImage" : {
          "color" : "#888888",
          "enable" : false
        },
        "fresnel" : {
          "power" : 0,
          "inverse" : false
        }
      }
    },
    "inner" : {
      "postEffect" : {
        "MiddleGlowBloom" : {
          "strength" : 0.28,
          "enable" : true,
          "threshold" : 0.2,
          "radius" : 0.85
        },
        "chromaticAberration" : {
          "chromaFactor" : 0.025,
          "enable" : false
        },
        "FXAA" : {
          "enable" : false
        },
        "SmallGlowBloom" : {
          "strength" : 0.28,
          "enable" : true,
          "threshold" : 0.2,
          "radius" : 0.85
        },
        "bloom" : {
          "strength" : 0.14,
          "enable" : false,
          "threshold" : 0.7,
          "radius" : 0.4
        },
        "screenSpaceAmbientOcclusion" : {
          "intensity" : 0.8,
          "ignoreTransparent" : false,
          "enable" : false,
          "radius" : 0.2,
          "temporalFilter" : true,
          "quality" : "medium"
        },
        "enable" : true,
        "screenSpaceReflection" : {
          "enable" : true,
          "minGlossiness" : 0.2
        },
        "film" : {
          "enable" : false,
          "scanlinesIntensity" : 0,
          "scanlinesCount" : 2048,
          "noiseIntensity" : 0.35,
          "grayscale" : false
        },
        "colorCorrection" : {
          "saturation" : 1.1,
          "brightness" : 0,
          "exposure" : 0,
          "enable" : true,
          "contrast" : 1.1,
          "gamma" : 1
        },
        "vignetting" : {
          "enable" : false,
          "color" : "0",
          "offset" : 1.5
        },
        "blurEdge" : {
          "enable" : false,
          "offset" : 1.5
        }
      },
      "background" : {
        "type" : "image",
        "value" : "background/icon_20211207124700775_59418.jpg"
      },
      "lighting" : {
        "spotLights" : [ ],
        "distance" : 2000,
        "mainLight" : {
          "intensity" : 0.8,
          "shadow" : false,
          "color" : "16772829",
          "mainLightFlag" : true,
          "alpha" : 0,
          "beta" : 0,
          "shadowQuality" : "medium",
          "flag" : true
        },
        "SecondaryLights" : [ {
          "intensity" : 0.9,
          "flag" : true,
          "shadow" : false,
          "color" : "16772829",
          "alpha" : 138,
          "title" : "第二平行光",
          "beta" : 0,
          "shadowQuality" : "medium"
        }, {
          "intensity" : 0,
          "flag" : true,
          "shadow" : false,
          "color" : "16777215",
          "alpha" : 0,
          "title" : "第三平行光",
          "beta" : 0,
          "shadowQuality" : "medium"
        } ],
        "showHelper" : false,
        "ambientLight" : {
          "intensity" : 0.3,
          "color" : "6447714",
          "ambientFlag" : true
        },
        "position" : [ 2178031.49, 4093163.9, 4379567.91 ],
        "hemisphereLight" : {
          "intensity" : 0,
          "hemisphereFlag" : true,
          "color" : "3310847",
          "groundColor" : 352511
        },
        "tertiaryLight" : {
          "intensity" : 0,
          "flag" : true,
          "shadow" : false,
          "color" : "16777215",
          "alpha" : 0,
          "title" : "第三平行光",
          "beta" : 0,
          "shadowQuality" : "medium"
        },
        "secondaryLight" : {
          "intensity" : 0.9,
          "flag" : true,
          "shadow" : false,
          "color" : "16772829",
          "alpha" : 138,
          "title" : "第二平行光",
          "beta" : 0,
          "shadowQuality" : "medium"
        }
      },
      "fog" : {
        "color" : "#808080",
        "enable" : false,
        "far" : 100,
        "near" : 10
      }
    },
    "onExtFunc" : "",
    "offExtFunc" : "",
    "itemConfig" : [ ],
    "extFuncPreview" : "",
    "innerGround" : {
      "item" : [ {
        "code" : "g1648782564331",
        "name" : "特效地面1620697703762",
        "url" : "ground/icon_20210625174703331_294105.png",
        "color" : "rgba(50,138,207,1)",
        "opacity" : 1,
        "maskUrl" : "ground/systemIcons/光1.png",
        "flowColor" : "rgba(121,255,217,1)",
        "glowFactor" : 8.7,
        "animationSpeed" : 1,
        "groundClearance" : -1,
        "repeatFactorX" : 10,
        "repeatFactorY" : 10
      }, {
        "code" : "g1648782564332",
        "name" : "特效地面1624614663498",
        "url" : "ground/icon_20210625175116741_958937.png",
        "color" : "rgba(43,76,145,1)",
        "opacity" : 0,
        "maskUrl" : "ground/systemIcons/光1.png",
        "flowColor" : "rgba(134,255,236,1)",
        "glowFactor" : 7.9,
        "animationSpeed" : 0.5,
        "groundClearance" : -1,
        "repeatFactorX" : 20,
        "repeatFactorY" : 20
      }, {
        "code" : "g1648782564332",
        "name" : "特效地面1624614711238",
        "url" : "ground/icon_20210418125256801_956034.png",
        "color" : "rgba(139,255,255,1)",
        "opacity" : 0.54,
        "maskUrl" : "ground/systemIcons/光1.png",
        "flowColor" : "rgba(110,255,255,1)",
        "glowFactor" : 7.6,
        "animationSpeed" : 1,
        "groundClearance" : -1,
        "repeatFactorX" : 3,
        "repeatFactorY" : 3
      }, {
        "code" : "g1648782564332",
        "name" : "特效地面1648782522384",
        "url" : "ground/systemIcons/地板面02.png",
        "color" : "#ffffff",
        "opacity" : 0.04,
        "repeatFactorX" : 20,
        "repeatFactorY" : 20,
        "maskUrl" : "ground/systemIcons/光1.png",
        "flowColor" : "#ffffff",
        "glowFactor" : 0,
        "animationSpeed" : 1,
        "groundClearance" : -1
      } ],
      "groundReflect" : true,
      "reflectFactor" : 0.89,
      "enable" : true
    },
    "floors" : {
      "enable" : false,
      "item" : [ {
        "clonedFloors" : {
          "enable" : true,
          "name" : "楼板效果1",
          "floorHeight" : 1,
          "color" : "#0000ff",
          "scaleFactor" : 1,
          "opacity" : 1,
          "isInterlayerDisplay" : false
        },
        "singleLines" : {
          "enable" : false,
          "name" : "楼板效果1",
          "floorHeight" : 1,
          "scaleFactor" : 1,
          "isInterlayerDisplay" : false,
          "lineHeight" : 0.2,
          "color" : "#ff0000",
          "opacity" : 1
        },
        "doubleLines" : {
          "enable" : false,
          "name" : "楼板效果1",
          "floorHeight" : 1,
          "scaleFactor" : 1,
          "isInterlayerDisplay" : false,
          "lineHeight" : 0.2,
          "color" : "#ff0000",
          "opacity" : 1
        }
      } ]
    },
    "outer" : {
      "lighting" : {
        "showHelper" : false,
        "ambientLight" : {
          "intensity" : 0.4,
          "color" : 16777215
        },
        "hemisphereLight" : {
          "intensity" : 0,
          "color" : 16777215,
          "groundColor" : 2236962
        },
        "mainLight" : {
          "flag" : true,
          "shadow" : false,
          "shadowQuality" : "ultra",
          "shadowBias" : 0,
          "intensity" : 0.5,
          "color" : 16777215,
          "alpha" : 30,
          "beta" : 30.0
        },
        "secondaryLight" : {
          "flag" : true,
          "shadow" : false,
          "shadowQuality" : "ultra",
          "shadowBias" : 0,
          "intensity" : 0,
          "color" : 16777215,
          "alpha" : 138,
          "beta" : 0.0
        },
        "tertiaryLight" : {
          "flag" : true,
          "shadow" : false,
          "shadowQuality" : "ultra",
          "shadowBias" : 0,
          "intensity" : 0,
          "color" : 16777215,
          "alpha" : 0,
          "beta" : 0.0
        },
        "distance" : 2000
      },
      "postEffect" : {
        "SmallGlowBloom" : {
          "strength" : 0.47,
          "enable" : true,
          "threshold" : 0.2,
          "radius" : 0.4
        },
        "GlowBloom" : {
          "strength" : 0.52,
          "enable" : false,
          "threshold" : 0.2,
          "radius" : 0.4
        },
        "screenSpaceAmbientOcclusion" : {
          "intensity" : 0.8,
          "ignoreTransparent" : false,
          "enable" : false,
          "radius" : 0.2,
          "temporalFilter" : true,
          "quality" : "medium"
        },
        "blurEdge" : {
          "offset" : 1.5,
          "enable" : false
        },
        "screenSpaceReflection" : {
          "enable" : true,
          "minGlossiness" : 0.2
        },
        "film" : {
          "enable" : false,
          "scanlinesIntensity" : 0,
          "scanlinesCount" : 2048,
          "noiseIntensity" : 0.35,
          "grayscale" : false
        },
        "chromaticAberration" : {
          "chromaFactor" : 0.025,
          "enable" : false
        },
        "MiddleGlowBloom" : {
          "strength" : 1.5,
          "enable" : true,
          "threshold" : 0.2,
          "radius" : 0.4
        },
        "vignetting" : {
          "color" : "0x318bcc",
          "offset" : 1.5,
          "enable" : false
        },
        "FXAA" : {
          "enable" : false
        },
        "bloom" : {
          "strength" : 0.14,
          "enable" : false,
          "threshold" : 0.7,
          "radius" : 0.4
        },
        "enable" : true,
        "colorCorrection" : {
          "saturation" : 1.1,
          "brightness" : 0,
          "exposure" : 0,
          "enable" : true,
          "contrast" : 1.1,
          "gamma" : 1
        }
      },
      "background" : {
        "type" : "image",
        "value" : "background/icon_20211207124700775_59418.jpg"
      }
    },
    "extFunc" : "{\n    THING.THEMEVERSION = \"1.0.9\";\n    let proximaOptions = arguments[2];\n    proximaOptions = proximaOptions || {};\n    const app = THING.App.current;\n    let campus = arguments[3];\n    campus = campus || app.query('.Campus')[0];\n    campus = campus.type === \"Campus\" ? campus : (campus.type === \"Building\" ? campus.parent : campus.parent.parent);\n    const targetLevel = app.level.current;\n\n    class GroundObject extends THING.BaseObject {\n\n        // 构造函数\n        constructor(app) {\n            super(app);\n\n            this._mesh = null;\n            this._url = '';\n\n            this._maskUrl = '';\n            this._opacity = 0;\n            this._repeatFactor = 1;\n            this._glowFactor = 1;\n            this._color = null;\n\n            this._sizeFactor = 2;\n            this._speed = 1;\n            this._flowColor = null;\n            this._groundReflect = false;\n            this._groundClearance = 0.1;\n            this._animationType = 'flow';// 默认flow为扫光，rotation为旋转\n            this._reflectFactor = 1;\n            this._repeatFactorInner = 1;\n            this._repeatFactorOuter = 1;\n            this.targetCampus = null;\n\n            // 如果需要每帧更新，开启tickable\n            this.tickable = true;\n            this.pickable = false;\n        }\n\n        // Setup, 一些mesh的构造建议在这里执行\n        customSetup(param) {\n            this._url = param['url'];\n            this._maskUrl = param['maskUrl'] || this._maskUrl;\n            this._opacity = param['opacity'] === undefined ? this._opacity : param['opacity'];\n            this._color = param['color'] || this._color;\n            this._glowFactor = param['glowFactor'] === undefined ? this._glowFactor : param['glowFactor'];\n            this._repeatFactor = param['repeatFactor'] === undefined ? this._repeatFactor : param['repeatFactor'];\n            this._sizeFactor = param['sizeFactor'] === undefined ? this._sizeFactor : param['sizeFactor'];\n            this._speed = param['animationSpeed'] === undefined ? this._speed : param['animationSpeed'];\n            this._flowColor = param['flowColor'] || this._flowColor;\n            this._groundReflect = param['groundReflect'] || this._groundReflect;\n            this._groundClearance = param['groundClearance'] === undefined ? this._groundClearance : param['groundClearance'];\n            this._animationType = param['animationType'] || this._animationType;\n            this._reflectFactor = param['reflectFactor'] === undefined ? this._reflectFactor : param['reflectFactor'];\n            this._reflectFactor = Math.min(this._reflectFactor, 1);\n            this._repeatFactorInner = param['repeatFactorInner'] === undefined ? this._repeatFactor : param['repeatFactorInner'];\n            this._repeatFactorOuter = param['repeatFactorOuter'] === undefined ? this._repeatFactor : param['repeatFactorOuter'];\n\n            var material = this._createMaterial(this._url, this._maskUrl, this._opacity, this._repeatFactor, this._color, this._glowFactor, this._speed, this._flowColor, this._groundReflect, this._animationType);\n            var geometry = new THREE.PlaneGeometry(1, 1);\n            var mesh = new THREE.Mesh(geometry, material);\n            this._mesh = mesh;\n            this._mesh.rotation.x = -Math.PI / 2;\n            this.node.add(this._mesh);\n            this.pickable = false;\n\n            this.groundColorValue = this._color;\n            this.flowColorValue = this._flowColor;\n            this.targetCampus = param['target'] === undefined ? this.app.query(\".Campus\")[0] : param['target'];\n\n            this.updateGround();\n        }\n\n\n        // Update\n        update(deltaTime) {\n            super.update(deltaTime);\n            if (this._mesh.material.type == \"ShaderMaterial\") {\n                this._mesh.material.uniforms['time'].value += deltaTime;\n            }\n            return true;\n        }\n\n        // Destroy\n        destroy() {\n            super.destroy();\n            // 释放\n        }\n\n        setMaterialRoughness(child, roughness) {\n            if (child.children.length > 0) {\n                this.getChilds(child.children, roughness);\n            }\n\n            if (child.material) {\n                child.material.roughness = roughness;\n            }\n        }\n\n        getChilds(childs, roughness) {\n            for (var i = 0; i < childs.length; i++) {\n                this.setMaterialRoughness(childs[i], roughness);\n            }\n        }\n\n        // 切换层级后调用。用于更新地板位置和地板范围\n        updateGround() {\n            let target = this.app.level.current;\n            if (!target) {\n                target = this.targetCampus;\n            }\n            if (target.type === \"GeoBasePoint\") {\n                target = this.app.query(\".Campus\")[0];\n            }\n            if (target instanceof THING.Floor || target instanceof THING.Building || target instanceof THING.Campus) {\n                const bbx = target.getOrientedBox(true, false);\n                const radius = bbx.size[1] / 2 + 0.2 - this.groundClearance;\n                const rDis = THING.Math.scaleVector(target.up, radius);\n                this.position = THING.Math.subVector(bbx.center, rDis);\n                this.scale = THING.Math.scaleVector([bbx.radius, 1, bbx.radius], this._sizeFactor);\n                this.worldAngles = target.worldAngles;\n\n                if (this.groundReflect) {\n\n                    this.app.postEffect = {\n                        postEffect: {\n                            enable: true,\n                            screenSpaceReflection: {\n                                maxRayDistance: 200,\n                                pixelStride: bbx.size[1] * this._reflectFactor / 2,\n                                pixelStrideZCutoff: 900,\n                                screenEdgeFadeStart: 0.9,\n                                eyeFadeStart: 0.4,\n                                eyeFadeEnd: 0.8,\n                            }\n                        }\n                    };\n                }\n\n                if (target instanceof THING.Campus) {\n                    if (this.repeatFactorOuter) {\n                        this.repeatFactorValue = this.repeatFactorOuter;\n                    }\n                } else {\n                    if (this.repeatFactorInner) {\n                        this.repeatFactorValue = this.repeatFactorInner;\n                    }\n                }\n\n            } else if (!target) {\n                this.position = [0, this._groundClearance, 0];\n                this.scale = [this._sizeFactor, 1, this._sizeFactor];\n            }\n\n        }\n\n        // 创建材质\n        _createMaterial(url, maskUrl, opacity, repeatFactor, color, glowFactor, speed, flowColor, groundReflect, animationType) {\n            var vertShaderReflect = `\n                        void main() {\n                         gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.);\n                        }\n                    `;\n\n            var vertShaderDefault = `\n                    varying vec2 vUv;\n                    varying vec2 mapUv;\n                    \n                    uniform float repeatFactor;\n    \n                    void main() {\n                     gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.);\n    \n                     vUv=uv;\n                     mapUv=uv*repeatFactor;\n                    }\n                `;\n\n            var fragShaderReflect = `\n                        void main() {\t\n                            gl_FragColor= vec4(1.,1.,1.,0.);                    \n                        }\n                    `;\n\n            var fragShaderFlow = `\n                    varying vec2 vUv;\n                    varying vec2 mapUv;\n                    \n                    uniform sampler2D map;\n                    uniform sampler2D maskMap;\n                    uniform float time;\n                    uniform float opacity;\n                    uniform vec3 color;\n                    uniform vec3 flowColor;\n                    uniform float glowFactor;\n                    uniform float speed;\n    \n                    void main() {\t\n                        float t=mod(time/5.*speed,1.);      \n                        vec2 uv=abs((vUv-vec2(0.5))*2.0);\n                        float dis = length(uv);\n                        float r = t-dis;\n                        \n                        vec4 col=texture2D( map, mapUv );\n                        vec3 finalCol;\n                        vec4 mask = texture2D(maskMap, vec2(0.5,r));\n                        finalCol = mix(color,flowColor,clamp(0.,1.,mask.a*glowFactor));\n                        gl_FragColor= vec4(finalCol.rgb,(opacity+mask.a*glowFactor)*col.a*(1.-dis));                                 \n                    }\n                `;\n\n            var fragShaderRotation = `\n                    varying vec2 vUv;\n                    varying vec2 mapUv;\n                    \n                    uniform sampler2D map;\n                    uniform sampler2D maskMap;\n                    uniform float time;\n                    uniform float opacity;\n                    uniform vec3 color;\n                    uniform vec3 flowColor;\n                    uniform float glowFactor;\n                    uniform float speed;\n    \n                    vec2 newUV(vec2 coord,float c,float s)\n                    {\n                        mat2 m=mat2(c,-s,s,c);\n                        return m*coord;\n                    }\n    \n                    void main() {\t\n                        float t=speed*time;      \n                        vec2 pivot=vec2(0.5,0.5);\n                        vec2 uv=newUV((vUv-pivot),cos(t),sin(t))+pivot;\n                        vec4 finalCol;\n    \n                        if(uv.x>0.&&uv.x<1.&&uv.y>0.&&uv.y<1.)\n                        {\n                            finalCol=vec4(color,opacity*texture2D( map, uv ).a);\n                        }\n    \n                        gl_FragColor= clamp(finalCol,0.,1.);                        \n                    }\n                `;\n\n            var textureLoader = new THREE.TextureLoader();\n            var mainTex = textureLoader.load(url);\n            mainTex.wrapS = mainTex.wrapT = THREE.RepeatWrapping;\n            var maskTex = textureLoader.load(maskUrl);\n            maskTex.wrapS = maskTex.wrapT = THREE.RepeatWrapping;\n\n            var uniforms = {\n                map: { value: mainTex },\n                time: { value: 0. },\n                opacity: { value: opacity },\n                repeatFactor: { value: repeatFactor },\n                maskMap: { value: maskTex },\n                color: { value: color },\n                glowFactor: { value: glowFactor },\n                speed: { value: speed },\n                flowColor: { value: flowColor }\n            };\n\n            var vertShader = groundReflect ? vertShaderReflect : vertShaderDefault;\n            var fragShader = groundReflect ? fragShaderReflect : (animationType === \"flow\" ? fragShaderFlow : fragShaderRotation);\n            var shaderMaterial = new THREE.ShaderMaterial({\n                uniforms: uniforms,\n                vertexShader: vertShader,\n                fragmentShader: fragShader,\n                transparent: true,\n                depthWrite: false,\n            });\n\n            if (groundReflect) {\n                shaderMaterial.roughness = 0.1;\n            } else {\n                shaderMaterial.roughness = 1;\n            }\n\n            return shaderMaterial;\n        }\n\n        /**\n         * 开启地板反射\n         * @type {Boolean}\n         */\n        set groundReflect(value) {\n            this._groundReflect = value;\n            this.tickable = !this._groundReflect;\n            let target = this.app.level.current;\n            if (!target) { return }\n            if (target.type === \"GeoBasePoint\") {\n                target = this.app.query(\".Campus\")[0];\n            }\n            if (!this.groundReflect) {\n                this._mesh.material.roughness = 1;\n            } else {\n                this._mesh.material.roughness = 0.1;\n                this.updateGround();\n            }\n        }\n\n        get groundReflect() {\n            return this._groundReflect;\n        }\n\n        /**\n         * 地板范围\n         * @type {Number}\n         */\n        set sizeFactor(value) {\n            this._sizeFactor = value;\n            this.updateGround();\n        }\n\n        get sizeFactor() {\n            return this._sizeFactor;\n        }\n\n        /**\n         * 切换底图\n         * @type {String}\n         */\n        set imageUrl(value) {\n            this._url = value;\n            let map = new THREE.TextureLoader().load(this._url);\n            map.wrapS = map.wrapT = THREE.RepeatWrapping;\n            this._mesh.material.uniforms.map.value = map;\n        }\n\n        get imageUrl() {\n            return this._url;\n        }\n\n        /**\n         * 切换扫光图\n         * @type {String}\n         */\n        set maskUrl(value) {\n            this._maskUrl = value;\n            let mask = new THREE.TextureLoader().load(this._maskUrl);\n            mask.wrapS = mask.wrapT = THREE.RepeatWrapping;\n            this._mesh.material.uniforms.maskMap.value = mask;\n        }\n\n        get maskUrl() {\n            return this._maskUrl;\n        }\n\n        /**\n         * 透明度\n         * @type {Number}\n         */\n        set opacityValue(value) {\n            this._opacity = value;\n            this._mesh.material.uniforms.opacity.value = this._opacity;\n        }\n\n        get opacityValue() {\n            return this._opacity;\n        }\n\n        /**\n         * 扫光强度\n         * @type {Number}\n         */\n        set glowFactorValue(value) {\n            this._glowFactor = value;\n            this._mesh.material.uniforms.glowFactor.value = this._glowFactor;\n        }\n\n        get glowFactorValue() {\n            return this._glowFactor;\n        }\n\n        /**\n         * uv重复系数\n         * @type {Number}\n         */\n        set repeatFactorValue(value) {\n            this._repeatFactor = value;\n            this._mesh.material.uniforms.repeatFactor.value = this._repeatFactor;\n        }\n\n        get repeatFactorValue() {\n            return this._repeatFactor;\n        }\n\n        /**\n         * 室外uv重复系数\n         * @type {Number}\n         */\n        set repeatFactorOuter(value) {\n            this._repeatFactorOuter = value;\n        }\n\n        get repeatFactorOuter() {\n            return this._repeatFactorOuter;\n        }\n\n        /**\n         * 室内uv重复系数\n         * @type {Number}\n         */\n        set repeatFactorInner(value) {\n            this._repeatFactorInner = value;\n        }\n\n        get repeatFactorInner() {\n            return this._repeatFactorInner;\n        }\n\n        /**\n         * 地板颜色\n         * @type {Color}\n         */\n        set groundColorValue(value) {\n            this._color = new THREE.Color(value);\n            if (this._mesh) {\n                this._mesh.material.uniforms.color.value = this._color;\n            }\n        }\n\n        get groundColorValue() {\n            return this._color;\n        }\n\n        /**\n         * 扫光颜色\n         * @type {Color}\n         */\n        set flowColorValue(value) {\n            this._flowColor = new THREE.Color(value);\n            if (this._mesh) {\n                this._mesh.material.uniforms.flowColor.value = this._flowColor;\n            }\n        }\n\n        get flowColorValue() {\n            return this._flowColor;\n        }\n\n        /**\n         * 动画速度\n         * @type {Number}\n         */\n        set animationSpeed(value) {\n            this._speed = value;\n            this._mesh.material.uniforms.speed.value = this._speed;\n        }\n\n        get animationSpeed() {\n            return this._speed;\n        }\n\n        /**\n         * 离地高度\n         * @type {Number}\n         */\n        set groundClearance(value) {\n            this._groundClearance = value;\n            this.updateGround();\n        }\n\n        get groundClearance() {\n            return this._groundClearance;\n        }\n\n        /**\n        * 动画类型\n        * @type {String}\n        */\n        set animationType(value) {\n            this._animationType = value;\n            this._mesh.material = this._createMaterial(this._url, this._maskUrl, this._opacity, this._repeatFactor, this._color, this._glowFactor, this._speed, this._flowColor, this._groundReflect, this._animationType);\n        }\n\n        get animationType() {\n            return this._animationType;\n        }\n\n        /**\n         * 反射影子的高度的系数\n         * @type {Number}\n         */\n        set reflectFactor(value) {\n            this._reflectFactor = value;\n            this.updateGround();\n        }\n\n        get reflectFactor() {\n            return this._reflectFactor;\n        }\n\n        // #endregion\n\n\n    }\n\n    if (!THING.factory.hasClass('GroundObject')) {\n        THING.factory.registerClass('GroundObject', GroundObject);\n    }\n\n    //生成地板\n    const setGroundDecorate = function () {\n        const _createGround = function () {\n            proximaOptions.themeManager._objGround = [];\n            if (proximaOptions.ground.groundReflect) {\n                let ground = app.create({\n                    type: \"GroundObject\",\n                    groundClearance: 0.1,\n                    groundReflect: true,\n                    parent: campus,\n                    target: campus,\n                    style: {\n                        skipBoundingBox: !0,\n                    },\n                    reflectFactor: proximaOptions.ground.reflectFactor\n                });\n                ground.style.skipBoundingBox = true;\n                proximaOptions.themeManager._objGround.push(ground);\n            }\n\n            if (proximaOptions.ground.enable) {\n                proximaOptions.ground.item.forEach(obj => {\n                    let curParam = obj;\n                    Object.assign(curParam, {\n                        parent: campus,\n                        target: campus,\n                        style: {\n                            skipBoundingBox: !0\n                        }\n                    })\n                    const finalParam = { type: 'GroundObject', ...curParam };\n                    let ground = app.create(finalParam);\n                    ground.style.skipBoundingBox = true;\n                    proximaOptions.themeManager._objGround.push(ground);\n                });\n            }\n        };\n\n        const _updateGroundPos = function (force = false, ignoreFlyEnd = false) {\n            if (\n                force\n                || app.level.current.type === 'Building'\n                || (app.level.current.type === 'Floor' && (!app.level.previous || app.level.previous.type !== 'Room'))\n                || app.level.current.type === 'Campus'\n            ) {\n                //园区层级走这里\n                const showGround = function showGround() {\n                    proximaOptions.themeManager._objGround.forEach(curObj => {\n                        curObj.updateGround();\n                    });\n\n                    setTimeout(() => {\n                        proximaOptions.themeManager._objGround.forEach(curObj => {\n                            curObj.visible = true;\n                        });\n                    }, 250);\n                };\n\n                proximaOptions.themeManager._objGround.forEach(curObj => {\n                    curObj.visible = false;\n                });\n\n                if (ignoreFlyEnd) {\n                    setTimeout(() => {\n                        showGround();\n                    }, 0);\n                } else {\n                    app.one(THING.EventType.LevelFlyEnd, (ev) => {\n                        setTimeout(() => {\n                            showGround();\n                        }, 0);\n                    }, 'levelFlyEndToUpdateGround');\n                }\n            }else if( typeof CMAP !== 'undefined' && THING.Math.getVectorLength(campus.position) > 6300000 \n\t\t\t          && app.level.current.type!==\"Thing\" && app.level.current.type!=='Room' && app.level.current.type!=='Floor' ){\n\t\t\t\t//地球层级走这里\n\t\t\t\tif(typeof proximaOptions.ground.visibleOnEarth !== 'undefined')\n\t\t\t\t{\n\t\t\t\t\t//地图级别地面显示/隐藏\n\t\t\t\t\tproximaOptions.themeManager._objGround.forEach(curObj => {\n\t\t\t\t\t\tcurObj.visible = proximaOptions.ground.visibleOnEarth;\n                    });\n\t\t\t\t}\n\t\t\t}\n\t\t\t\n        };\n\n        if (!proximaOptions.themeManager._objGround) {\n            _createGround();\n        } else {\n            _updateGroundPos();\n        }\n\n        app.on(THING.EventType.EnterLevel, () => {\n            if (!proximaOptions.themeManager._objGround) {\n                _createGround();\n            } else {\n                _updateGroundPos();\n            }\n        }, 'EnterLevelToSetGround', 0);\n    }\n\n    //销毁地板\n    const destroyGroundDecorate = function () {\n        const grounds = campus.query('.GroundObject');\n        if (grounds.length > 0) {\n            app.off(THING.EventType.EnterLevel, null, 'EnterLevelToSetGround');\n        }\n        grounds.forEach((cur) => { cur.destroy(); });\n        proximaOptions.themeManager._objGround = null;\n    }\n\n    if (proximaOptions.ground && JSON.stringify(proximaOptions.ground) !== '{}') {\n        destroyGroundDecorate();\n        setGroundDecorate();\n\n        console.log(\"%c效果模板定制化代码log————————————\", \"color: blue\");\n        console.log(\"%c是否开启地板反射：\" + proximaOptions.ground.groundReflect, \"color: blue\");\n        if (proximaOptions.inner && proximaOptions.inner.postEffect.screenSpaceReflection) {\n            console.log(\"%c室内ssr是否打开：\" + proximaOptions.inner.postEffect.screenSpaceReflection.enable, \"color: blue\");\n        } else {\n            console.log(\"%c没有室内ssr\", \"color: blue\");\n        }\n        if (proximaOptions.outer && proximaOptions.outer.postEffect.screenSpaceReflection) {\n            console.log(\"%c室外ssr是否打开：\" + proximaOptions.outer.postEffect.screenSpaceReflection.enable, \"color: blue\");\n        } else {\n            console.log(\"%c没有室外ssr\", \"color: blue\");\n        }\n        console.log(\"%c—————————————————————————————————\", \"color: blue\");\n    }else{\n\t\tdestroyGroundDecorate();\n\t\tconsole.log(\"%c该模板没有地面反射和特效地面\", \"color: blue\");\n\t}\n\n    var readJson = function (url, item, proximaOptions) {\n        const loader = new THREE.FileLoader();\n\n        loader.load(\n            url.concat('/index.json'),\n\n            function (data) {\n                try {\n                    let message = data;\n\n                    const target = campus;\n                    const bbx = target.getOrientedBox(true, false);\n                    const radius = bbx.size[1] / 2 + 0.2;\n                    const rDis = THING.Math.scaleVector(target.up, radius);\n                    const pos = THING.Math.subVector(bbx.center, rDis);\n                    var data = JSON.parse(message);\n                    let urlPre = url;\n                    let dividend = data.listGroups[0].listEmitters[0].position.vec3Spread;\n                    data.listGroups[0].texture.url = urlPre.concat(data.listGroups[0].texture.url);\n                    data.listGroups[0].textureTrail.url = urlPre.concat(data.listGroups[0].textureTrail.url);\n\n                    //最大粒子数\n                    let maxCount = THING.Math.ceil(THING.Math.min(10000, item.content.density * data.listGroups[0].iMaxParticleCount * bbx.size[0] * bbx.size[2] / dividend.x / dividend.z * 4));\n                    //粒子数\n                    let count = THING.Math.ceil(data.listGroups[0].listEmitters[0].iParticleCount / data.listGroups[0].iMaxParticleCount * maxCount);\n\n                    data.listGroups[0].listEmitters[0].iParticleCount = count;\n                    data.listGroups[0].iMaxParticleCount = maxCount;\n                    data.listGroups[0].listEmitters[0].position.vec3Spread = { x: bbx.size[0] * 2, y: item.content.height, z: bbx.size[2] * 2 };\n                    let pBox = app.create({\n                        type: 'BaseObject',\n                        id: `粒子装饰模型父物体_${item.code}`,\n                        parent: campus,\n                        position: pos,\n                        visible: targetLevel && targetLevel.type === 'Campus',\n                    });\n\n                    pBox.style.skipBoundingBox = true;\n\n                    let particle = app.create({\n                        type: 'ParticleSystem',\n                        id: `粒子装饰模型_${item.code}`,\n                        name: `粒子装饰模型_${item.code}`,\n                        data: data,\n                        parent: pBox,\n                        localPosition: [0, item.content.offsetHeight + item.content.height / 2, 0],\n                        angle: 0,\n                        visible: targetLevel && targetLevel.type === 'Campus',\n                    });\n                    particle.style.skipBoundingBox = true;\n                    particle.userData.cfg = particle.userData.cfg || {};\n                    particle.userData.cfg.offsetHeight = item.content.offsetHeight + item.content.height / 2;\n                    proximaOptions.themeManager._objParticle.push(particle);\n                } catch (err) {\n                    console.error(err);\n                }\n            },\n\n            function (xhr) {\n                //console.log((xhr.loaded / xhr.total * 100) + '% loaded');\n            },\n\n            // onError回调\n            function (err) {\n                //console.error('An error happened');\n            }\n        );\n    }\n\n    //生成粒子\n    const setParticle = function () {\n        const createParticle = function (item) {\n            return new Promise((resolve) => {\n                let url = item.url;\n                url = url.substring(0, url.length - 1);\n                readJson(url, item, proximaOptions);\n            });\n        }\n\n        const createParticles = function (items) {\n            proximaOptions.themeManager._objParticle = [];\n            return new Promise((resolve) => {\n                const objArray = [];\n                let iFn = 0;\n                items.forEach((item) => {\n                    createParticle(item).then((obj) => {\n                        objArray.push(obj);\n                        iFn += 1;\n                        if (iFn === items.length) {\n                            resolve(objArray);\n                        }\n                    });\n                });\n            });\n        }\n\n        const updateParticles = function (force = false, ignoreFlyEnd = false) {\n            if (\n                force\n                || app.level.current.type === 'Campus'\n            ) {\n                //园区层级走这里\n                const showParticles = function showParticles(target) {\n\n                    if (force && target._lastOBoundingBoxTF) {\n                        target._lastOBoundingBoxTF = null;\n                    }\n                    const bbx = target._lastOBoundingBoxTF ? target._lastOBoundingBoxTF : target.getOrientedBox(true, false);\n                    if (!target._lastOBoundingBoxTF) {\n                        target._lastOBoundingBoxTF = THING.Utils.cloneObject(bbx);\n                    }\n\n                    proximaOptions.themeManager._objParticle.forEach((p) => {\n                        const radius = p.userData.cfg ? (p.userData.cfg.offsetHeight ? p.userData.cfg.offsetHeight : 0) : 0;\n                        const rDis = THING.Math.scaleVector(target.up, radius);\n\n                        p.worldAngles = target.worldAngles;\n                        p.position = THING.Math.subVector(bbx.center, rDis);\n                        p.visible = true;\n                    });\n                };\n                if (ignoreFlyEnd) {\n                    setTimeout(() => {\n                        showParticles(campus);\n                    }, 1800);\n                } else {\n                    //目前园区只看到走这\n                    app.one(THING.EventType.LevelFlyEnd, (ev) => {\n                        const tar = ev.object;\n                        setTimeout(() => {\n                            showParticles(tar);\n                        }, 250);\n                    }, 'levelFlyEndToUpdateParticle');\n                }\n            } else if( app.level.current.type === 'Building' || app.level.current.type === 'Floor' || app.level.current.type === 'Room' ){\n                //室内层级走这里\n                if (proximaOptions.themeManager._objParticle) {\n                    proximaOptions.themeManager._objParticle.forEach((p) => {\n                        if (p.visible) {\n                            p.visible = false;\n                        }\n                    });\n                }\n            }else if( typeof CMAP !== 'undefined' && THING.Math.getVectorLength(campus.position) > 6300000 && app.level.current.type!==\"Thing\" ){\n\t\t\t\t//地球层级走这里\n\t\t\t\tif(typeof proximaOptions.particle.visibleOnEarth !== 'undefined')\n\t\t\t\t{\n\t\t\t\t\t//地图级别粒子显示/隐藏\n\t\t\t\t\tif (proximaOptions.themeManager._objParticle) {\n\t\t\t\t\t\tproximaOptions.themeManager._objParticle.forEach((p) => {\n\t\t\t\t\t\t\tif (p.visible) {\n\t\t\t\t\t\t\t\tp.visible = proximaOptions.particle.visibleOnEarth;\n\t\t\t\t\t\t\t}\n                    });\n                }\n\t\t\t\t}\n\t\t\t}\n\t\t\t\n        }\n\n        createParticles(proximaOptions.particle.item).then((oa) => {\n            proximaOptions.themeManager._objParticle = oa;\n            updateParticles(false, true);\n        });\n        app.on(THING.EventType.EnterLevel, () => {\n            if (!proximaOptions.themeManager._objParticle && proximaOptions.particle.item) {\n                createParticles(proximaOptions.particle.item).then((oa) => {\n                    proximaOptions.themeManager._objParticle = oa;\n                    updateParticles(false, true);\n                });\n            } else {\n                updateParticles();\n            }\n        }, 'EnterLevelToSetParticle', 0);\n    };\n\n    //销毁粒子\n    const destroyParticle = function () {\n        const particles = campus.query(/粒子装饰模型父物体/);\n        if (particles.length > 0) {\n            app.off(THING.EventType.EnterLevel, null, 'EnterLevelToSetParticle');\n        }\n        particles.forEach((cur) => { cur.destroy(); });\n        proximaOptions.themeManager._objParticle = null;\n    }\n\n    if (proximaOptions.particle && JSON.stringify(proximaOptions.particle) !== '{}') {\n        destroyParticle();\n        setParticle();\n    }else{\n\t\tdestroyParticle();\n\t\tconsole.log(\"%c该模板没有粒子\", \"color: blue\");\n\t}\n}\n"
  },
  "itemConfig" : [ ],
  "configUI" : [ {
    "caption" : "地图场景下特效地面显示",
    "type" : "bool",
    "des" : "data/ground/visibleOnEarth"
  }, {
    "caption" : "地图场景下特效粒子显示",
    "type" : "bool",
    "des" : "data/particle/visibleOnEarth"
  }, {
    "caption" : "环境光强度",
    "type" : "number",
    "des" : "data/outer/lighting/ambientLight/intensity"
  }, {
    "caption" : "主光源1光强度",
    "type" : "number",
    "des" : "data/outer/lighting/mainLight/intensity"
  }, {
    "caption" : "室外模型发光强度",
    "type" : "number",
    "des" : "data/outer/postEffect/MiddleGlowBloom/strength"
  }, {
    "caption" : "室内模型发光强度",
    "type" : "number",
    "des" : "data/inner/postEffect/MiddleGlowBloom/strength"
  } ]
}