class Create3DAsset {
    constructor(dom, data) {
        this.dom = dom;
        this.data = data;
        this.group = {};
        this.def = {
            backgroundColor: "#021132",
            baseH: 6,
            color: {
                blue: [0x72f2e6, 0x55ddd6, 0x40c6c7],
                yellow: [0xfcce61, 0xfec234, 0xed9951],
                base: [0x3987dd, 0x317ace, 0x2767a8]
            },
            circleColor: 0x3acdc4
        };
        
        let that = this;
        let loader = new THREE.FontLoader();
        loader.load('./font/PingFang_SC_Bold_Regular.json', function (font) {
            that.font = font;
            that.initScene();
        });
    }
    
    update(data) {
        this.data = data;
        
        this.setCircleNum("service", this.data["service"] ? this.data["service"] : 0);
        this.setCircleNum("department", this.data["department"] ? this.data["department"] : 0);
        this.setCircleNum("terminal", this.data["terminal"] ? this.data["terminal"] : 0)
    }
    
    setCircleNum(name, num) {
        let group = this.group,
            circle = group[name].circle,
            numText = circle.children[1];
        
        let shapes = this.font.generateShapes(num + "", 22);
        numText.geometry = new THREE.ShapeBufferGeometry(shapes).center(circle.children[0].geometry);
    }
    
    initScene() {
        let dom = document.getElementById(this.dom),
            def = this.def;
        //场景
        const scene = new THREE.Scene();
        scene.scale.set(1, 1, 1);
        this.scene = scene;
        
        //渲染器
        const renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setClearColor(def.backgroundColor);
        renderer.setSize(dom.offsetWidth, dom.offsetHeight);
        this.renderer = renderer;
        
        // 相机
        const camera = new THREE.PerspectiveCamera(45, dom.offsetWidth / dom.offsetHeight, 0.1, 2000);
        camera.position.set(660, 300, 660);
        camera.lookAt(scene.position);
        this.camera = camera;
        
        // 灯光
        const light = new THREE.DirectionalLight(0xffffff);
        light.position.set(2000, 1000, 2000);
        scene.add(light);
        this.light = light;
        
        this.drawBottom();
        this.drawBranch();
        this.drawService();
        this.drawTerminal();
    
        window.addEventListener('resize', function () {
            dom.innerHTML = "";
            camera.aspect = dom.offsetWidth / dom.offsetHeight;
            camera.updateProjectionMatrix();
        
            renderer.setSize(dom.offsetWidth, dom.offsetHeight);
            dom.append(renderer.domElement)
        }, false);
        
        dom.append(renderer.domElement);
        
        function animate() {
            renderer.render(scene, camera);
            
            requestAnimationFrame(animate);
        }
        
        animate();
    }
    
    drawBranch() {
        let scene = this.scene,
            def = this.def,
            position = [200, 0, 200];
        
        let base1 = this.createBase(250, 1);
        let base2 = this.createBase(200, 1 + def.baseH);
        let base3 = this.createBase(150, 1 + def.baseH * 2);
        
        let box1 = this.createBranchBox([60,80,60], [0, 1 + def.baseH * 3, 0]);
        let box2 = this.createBox([12,25,12], [40, 1 + def.baseH * 3, 0], "blue");
        let box3 = this.createBox([12,60,12], [40, 1 + def.baseH * 3, -40], "yellow");
        let box4 = this.createBox([10,25,10], [-40, 1 + def.baseH * 3, 40], "yellow");
        let box5 = this.createBox([40,10,40], [0, 1 + def.baseH * 3 + 80, 0], "blue");
        
        let circle = this.createCircle(this.data.department, "单位(个)");
        
        // 合并绘制项
        let group = new THREE.Group();
        group.add(circle);
        group.add(base1);
        group.add(base2);
        group.add(base3);
        group.add(box1);
        group.add(box2);
        group.add(box3);
        group.add(box4);
        group.add(box5);
        group.name = "单位(个)";
        group.value = this.data.department;
        
        group.position.set(position[0], position[1], position[2]);
        
        this.group.department = {
            group: group,
            circle: circle
        };
        
        scene.add(group);
    }
    
    createCircle(value, name) {
        let defColor = this.def.circleColor;
        let geometry = new THREE.RingGeometry(50, 60, 50, 1);
        let material = new THREE.LineBasicMaterial({
            color: defColor,
            vertexColors: THREE.FaceColors,
            opacity: 0.6,
            transparent: true
        });
        
        let faceIndices = ['a', 'b', 'c', 'd'];
        for (let i = 0; i < geometry.faces.length; i++) {
            let face = geometry.faces[i];
            let numberOfSides = (face instanceof THREE.Face3) ? 3 : 4;
            for (let j = 0; j < numberOfSides; j++) {
                let vertexIndex = face[faceIndices[j]],
                    color;
                if (0 <= vertexIndex && 50 > vertexIndex) {
                    // color = new THREE.Color(0x0b2d66)
                    color = new THREE.Color(0x031437)
                } else {
                    // color = new THREE.Color(0x3acdc4)
                    color = new THREE.Color(0x1f90f8)
                }
                face.vertexColors[j] = color;
            }
        }
        
        let cube = new THREE.Mesh(geometry, material);
        
        let shapes = this.font.generateShapes(value + "", 22);
        let geometryText = new THREE.ShapeBufferGeometry(shapes).center(geometry);
        let materialText = new THREE.LineBasicMaterial();
        let text = new THREE.Mesh(geometryText, materialText);
        text.position.y = 16;
        
        let shapes2 = this.font.generateShapes(name, 15);
        let geometryText2 = new THREE.ShapeBufferGeometry(shapes2).center(geometry);
        let materialText2 = new THREE.LineBasicMaterial();
        let text2 = new THREE.Mesh(geometryText2, materialText2);
        text2.position.y = -10;
        
        
        // 合并绘制项
        var group = new THREE.Group();
        group.add(cube);
        group.add(text);
        group.add(text2);
        
        group.position.y = 170;
        group.rotateX(-Math.PI/8);
        group.rotateY(Math.PI/4);
        group.rotateZ(Math.PI/12);
        
        return group
    }
    
    drawService() {
        let scene = this.scene,
            def = this.def,
            position = [-200, 0, 200];
        
        let base1 = this.createBase(200, 1);
        
        let box1 = this.createServiceBox([40,75,55], [0, 1 + def.baseH, 0]);
        let box2 = this.createServiceBox([40,75,55], [50, 1 + def.baseH, 0]);
        let box3 = this.createServiceBox([40,75,55], [-50, 1 + def.baseH, 0]);
        
        let circle = this.createCircle(this.data.service, "服务器(个)");
        
        // 合并绘制项
        let group = new THREE.Group();
        group.add(circle);
        group.add(base1);
        group.add(box1);
        group.add(box2);
        group.add(box3);
        group.name = "服务器(个)";
        group.value = this.data.service;
        
        group.position.set(position[0], position[1], position[2]);
        
        this.group.service = {
            group: group,
            circle: circle
        };
        
        scene.add(group);
    }
    
    drawTerminal() {
        let scene = this.scene,
            def = this.def,
            position = [200, 0, -200];
        
        let base1 = this.createBase(200, 1);
        
        let box1 = this.createBox([10,10,35], [30, 1 + def.baseH, 0], "blue");
        let box2 = this.createBox([5,60,110], [30, 1 + def.baseH + 10, 0], "blue");
        let box3 = this.createBox([20,20,60], [-20, 1 + def.baseH, 40], "blue");
        
        let circle = this.createCircle(this.data.terminal, "终端(个)");
        
        // 合并绘制项
        let group = new THREE.Group();
        group.add(circle);
        group.add(base1);
        group.add(box1);
        group.add(box2);
        group.add(box3);
        group.name = "终端(个)";
        group.value = this.data.terminal;
        
        group.position.set(position[0], position[1], position[2]);
        
        this.group.terminal = {
            group: group,
            circle: circle
        };
        
        scene.add(group);
    }
    
    loadBottomImg(url) {
        return new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load(url)
        });
    }
    
    createBranchBox(size, position) {
        let defColor = this.def.color.blue;
        let geometry = new THREE.BoxGeometry(size[0], size[1], size[2]);
        let material1 = new THREE.LineBasicMaterial({color: defColor[0]});
        let material2 = this.loadBottomImg("./img/asset_01.png");
        let material3 = this.loadBottomImg("./img/asset_02.png");
        let cube = new THREE.Mesh(geometry, [material3, material3, material1, material1, material2, material2]);
        
        cube.position.set(position[0], position[1] + size[1]/2, position[2]);
        return cube
    }
    
    createServiceBox(size, position) {
        let defColor = this.def.color.blue;
        let geometry = new THREE.BoxGeometry(size[0], size[1], size[2]);
        let material1 = new THREE.LineBasicMaterial({color: defColor[0]});
        let material2 = new THREE.LineBasicMaterial({color: defColor[1]});
        let material3 = new THREE.LineBasicMaterial({color: defColor[2]});
        let material4 = this.loadBottomImg("./img/asset_03.png");
        let cube = new THREE.Mesh(geometry, [material3, material3, material1, material1, material4, material2]);
        
        cube.position.set(position[0], position[1] + size[1]/2, position[2]);
        return cube
    }
    
    createBox(size, position, color) {
        let defColor = this.def.color[color];
        let geometry = new THREE.BoxGeometry(size[0], size[1], size[2]);
        let material1 = new THREE.LineBasicMaterial({color: defColor[0]});
        let material2 = new THREE.LineBasicMaterial({color: defColor[1]});
        let material3 = new THREE.LineBasicMaterial({color: defColor[2]});
        let cube = new THREE.Mesh(geometry, [material3, material3, material1, material1, material2, material2]);
        
        cube.position.set(position[0], position[1] + size[1]/2, position[2]);
        return cube
    }
    
    createBase(width, bottom) {
        let def = this.def;
        return this.createBox([width, def.baseH, width], [0, bottom, 0], "base")
    }
    
    drawBottom() {
        let scene = this.scene;
        
        let geometry = new THREE.BoxGeometry(800, 2, 800);
        let material = new THREE.LineBasicMaterial({
            color: 0xffffff,
            vertexColors: THREE.FaceColors,
            opacity: 0.6,
            transparent: true
        });
        let cube = new THREE.Mesh(geometry, material);
        let faceIndices = ['a', 'b', 'c', 'd'];
        for (let i = 0; i < geometry.faces.length; i++) {
            let face = geometry.faces[i];
            let numberOfSides = (face instanceof THREE.Face3) ? 3 : 4;
            for (let j = 0; j < numberOfSides; j++) {
                let vertexIndex = face[faceIndices[j]];
                let color = new THREE.Color(0xffffff);
                if ([0, 2].includes(vertexIndex)) {
                    color.setHex(0x0e3879);
                } else if ([1, 3, 5, 7].includes(vertexIndex)) {
                    color.setHex(0x061f4b);
                } else {
                    color.setHex(0x021132);
                }
                face.vertexColors[j] = color;
            }
        }
        scene.add(cube);
        
    }
}