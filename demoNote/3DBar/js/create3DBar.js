class CreateBar {
    constructor(dom, data) {
        this.dom = dom;
        this.data = data;
        this.maxValue = this.getMaxValue();
        
        this.initScene();
        this.addListener();
    }
    
    addListener() {
        let that = this;
        let dom = document.getElementById(this.dom);
        
        // 创建详情框
        that.createBar3dDesc();
        let bar3dDesc = document.getElementById(that.Bar3dDesc);
        
        dom.addEventListener("mousemove", onMouseMove, false);
        
        function onMouseMove(event) {
            event.preventDefault();
            that.mouse.x = ((event.clientX - dom.offsetLeft) / dom.offsetWidth) * 2 - 1;
            that.mouse.y = -((event.clientY - dom.offsetTop) / dom.offsetHeight) * 2 + 1;
            
            that.raycaster.setFromCamera(that.mouse, that.camera);
            
            let group = that.scene.children.filter(value => value.type === "Group");
            
            let intersects = that.raycaster.intersectObjects(group, true);
            
            if (intersects.length > 0 && intersects[0].object) {
                let groupItem = intersects[0].object.parent;
                bar3dDesc.style.display = "block";
                bar3dDesc.style.left = event.clientX + "px";
                bar3dDesc.style.top = event.clientY + "px";
                document.getElementById(that.Bar3dDesc + "_name").innerHTML = groupItem.name;
                // document.getElementById(that.Bar3dDesc + "_num").innerHTML = groupItem.value;
                dom.style.cursor = "pointer"
            } else {
                bar3dDesc.style.display = "none";
                dom.style.cursor = "default"
            }
        }
    }
    
    createBar3dDesc() {
        this.Bar3dDesc = "Bar3dDesc";
        
        let node = document.createElement("div");
        node.className = this.Bar3dDesc;
        node.id = this.Bar3dDesc;
        node.innerHTML = `<div>名称：<span id="${this.Bar3dDesc}_name"></span></div>`;
        
        document.getElementById(this.dom).appendChild(node)
    }
    
    getMaxValue() {
        let data = this.data,
            maxValue = 0;
        
        data.forEach(value => {
            if (value.value > maxValue) {
                maxValue = value.value
            }
        });
        
        return maxValue;
    }
    
    initScene() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const devicePixelRatio = window.devicePixelRatio;
        //场景
        const scene = new THREE.Scene();
        scene.scale.set(0.5, 0.5, 0.5);
        scene.translateY(-150);
        this.scene = scene;
        
        //渲染器
        const renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setClearColor("#021132");
        renderer.setSize(width * devicePixelRatio, height * devicePixelRatio);
        renderer.setPixelRatio(devicePixelRatio);
        this.renderer = renderer;
        
        // 相机
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 2000);
        camera.position.set(700, 350, 600);
        camera.lookAt(scene.position);
        this.camera = camera;
        
        // 灯光
        const light = new THREE.DirectionalLight(0xffffff);
        light.position.set(4000, 4000, 4000);
        scene.add(light);
        this.light = light;
        
        //鼠标控制
        const controls = new THREE.OrbitControls(camera, document.getElementById(this.dom));
        controls.rotateSpeed = 0.5;
        controls.minPolarAngle = 0;
        controls.maxPolarAngle = Math.PI * 0.47;
        controls.keyPanSpeed = 5.0;
        controls.enableZoom = false;
        
        // 光线投影器
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        
        
        this.drawBottom();
        
        this.createAllBar();
        
        window.addEventListener('resize', function () {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
    
            renderer.setSize( window.innerWidth, window.innerHeight );
        }, false);
        
        document.getElementById(this.dom).append(renderer.domElement);
        
        function animate() {
            renderer.render(scene, camera);
            TWEEN.update();
            
            requestAnimationFrame(animate);
        }
        
        animate();
    }
    
    drawBottom() {
        let scene = this.scene;
        // 绘制底部圆
        var material1 = this.loadBottomImg(0.5);
        var circleGeometry = new THREE.CylinderGeometry(250, 250, 2, 250);
        // var circleMaterial = new THREE.LineBasicMaterial({color: "#032c5d", opacity: 0.6, transparent: true});
        var circle = new THREE.Mesh(circleGeometry, [null, material1, material1]);
        circle.position.set(0, 3, 0);
        scene.add(circle);
        
        var material2 = this.loadBottomImg(0.3);
        var circleGeometry2 = new THREE.CylinderGeometry(350, 350, 2, 350);
        // var circleMaterial2 = new THREE.LineBasicMaterial({color: "#19486b", opacity: 0.6, transparent: true});
        var circle2 = new THREE.Mesh(circleGeometry2, [null, material2, material2]);
        circle2.position.set(0, 1, 0);
        scene.add(circle2);
        
        var circleGeometry3 = new THREE.CylinderGeometry(480, 480, 2, 480);
        let dianc3 = circleGeometry3.vertices;
        var materialc3 = new THREE.LineBasicMaterial({
            color: "#1d8ec5",
            linewidth: 5,
            opacity: 0.3,
            transparent: true
        });
        var geometryc3 = new THREE.Geometry();
        dianc3.forEach(value => {
            if (value.z) geometryc3.vertices.push(value);
        });
        var linec3 = new THREE.Line(geometryc3, materialc3);
        linec3.position.set(0, 1, 0);
        scene.add(linec3);
        
        var circleGeometry4 = new THREE.CylinderGeometry(600, 600, 2, 600);
        let dianc4 = circleGeometry4.vertices;
        var materialc4 = new THREE.LineBasicMaterial({
            color: "#1d8ec5",
            linewidth: 5,
            opacity: 0.3,
            transparent: true
        });
        var geometryc4 = new THREE.Geometry();
        dianc4.forEach(value => {
            if (value.z) geometryc4.vertices.push(value);
        });
        var linec4 = new THREE.LineSegments(geometryc4, materialc4);
        linec4.position.set(0, 1, 0);
        scene.add(linec4);
    }
    
    loadBottomImg(opacity) {
        return new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load('./img/createBarBottom.png'),
            opacity: opacity,
            transparent: true
        });
    }
    
    update(data) {
        this.data = data;
        this.maxValue = this.getMaxValue();
        
        let that = this,
            cube = this.cube,
            positionDef = this.positionDef,
            datas = JSON.parse(JSON.stringify(data));
        
        
        cube.forEach((value, index) => {
            let [item, i] = that.hasData(value.name);
            if (item) {
                datas[i] = null;
                that.animateOneBar(value, i, item.value)
            } else {
                that.removeOneBar(value, index)
            }
        });
        
        datas.forEach((value, index) => {
            if (value) {
                cube.push(that.createOneBar(positionDef[4], value.name, value.value, index));
                that.animateOneBar(cube[cube.length - 1], index, value.value)
            }
        });
        
        that.cube = cube.filter(value => value)
    }
    
    clearData() {
        let that = this,
            cube = this.cube;
        
        cube.forEach((value, index) => {
            that.removeOneBar(value, index)
        });
        
        this.cube = [];
    }
    
    hasData(name) {
        let data = this.data;
        for (let i = 0; i < data.length; i++) {
            if (name === data[i].name) {
                return [data[i], i]
            }
        }
        return [false, false]
    }
    
    createAllBar() {
        let that = this,
            data = that.data,
            cube = [];
        
        this.positionDef = [
            {position: [0, 0], angle: null},
            {position: [540, 0], angle: 0},
            {position: [0, 540], angle: 0.5 * Math.PI},
            {position: [-540, 0], angle: Math.PI},
            {position: [0, -540], angle: 1.5 * Math.PI}
        ];
        
        data.forEach((value, index) => {
            cube.push(that.createOneBar(this.positionDef[index], value.name, value.value, index))
        });
        
        that.cube = cube;
    }
    
    createOneBar(positions, name, value, index) {
        // 创建一个立方体
        let scene = this.scene;
        let position = positions.position;
        this.h = 200;
        let h = this.h;
        
        let geometry = new THREE.BoxGeometry(80, h, 80);
        let material = new THREE.LineBasicMaterial({color: 0xffffff, vertexColors: THREE.FaceColors});
        let cube = new THREE.Mesh(geometry, material);
        let faceIndices = ['a', 'b', 'c', 'd'];
        for (let i = 0; i < geometry.faces.length; i++) {
            let face = geometry.faces[i];
            let numberOfSides = (face instanceof THREE.Face3) ? 3 : 4;
            for (let j = 0; j < numberOfSides; j++) {
                let vertexIndex = face[faceIndices[j]];
                let color = new THREE.Color(0xffffff);
                if ([0, 1].includes(i) && [2, 3].includes(vertexIndex)) {
                    color.setHex(0x2dd0f9);
                } else {
                    color.setHex(0x06183f);
                }
                face.vertexColors[j] = color;
            }
        }
        
        // 绘制立方体的边
        let dian = geometry.vertices;
        let material2 = new THREE.LineBasicMaterial({color: "#6deff6", linewidth: 5});
        let geometry2 = new THREE.Geometry();
        geometry2.vertices.push(
            dian[0], dian[1], dian[3], dian[2], dian[0], dian[5], dian[4], dian[1], dian[4], dian[6], dian[3], dian[6], dian[7], dian[2], dian[7], dian[5]
        );
        let line = new THREE.Line(geometry2, material2);
        
        // 绘制顶部文字
        // let shapes = this.font.generateShapes(value + "", 40);
        // let geometry3 = new THREE.ShapeBufferGeometry(shapes).center(geometry);
        // let material3 = new THREE.LineBasicMaterial();
        // let text = new THREE.Mesh(geometry3, material3);
        let textCube = this.makeText(40, value + "");
        let text = new THREE.Sprite(textCube.spriteMaterial);
        text.scale.x = textCube.canvas.width;
        text.scale.y = textCube.canvas.height;
        
        
        // 合并绘制项
        var group = new THREE.Group();
        group.add(cube);
        group.add(line);
        group.add(text);
        group.name = name;
        group.value = value;
        // group.position.set(position[0], h / 2 + 2, position[1]);
        
        let scaleY = (2 / this.maxValue) * value,
            positionY = (h * scaleY) / 2 + 2;
        if (index === 0) {
            cube.scale.set(1.5, scaleY, 1.5);
            line.scale.set(1.5, scaleY, 1.5);
        } else {
            cube.scale.set(1, scaleY, 1);
            line.scale.set(1, scaleY, 1);
        }
        text.position.y = positionY + 40;
        group.position.set(position[0], positionY, position[1]);
        
        scene.add(group);
        
        return {
            name: name,
            cube: group,
            angle: positions.angle,
            index: index,
            canAnimate: true
        }
    }
    
    makeText(size, value) {
        let canvas = this.makeLabelCanvas(size, value);
        let texture = new THREE.CanvasTexture(canvas);
        let spriteMaterial = new THREE.SpriteMaterial({
            map: texture,
            transparent: true
        });
        return {
            canvas: canvas,
            spriteMaterial: spriteMaterial
        }
    }
    
    makeLabelCanvas(size, name) {
        let borderSize = 2;
        let ctx = document.createElement('canvas').getContext('2d');
        let font = `${size}px bold sans-serif`;
        ctx.font = font;
        // measure how long the name will be
        let textWidth = ctx.measureText(name).width;
        
        let doubleBorderSize = borderSize * 2;
        let width = textWidth + doubleBorderSize;
        let height = size + doubleBorderSize;
        ctx.canvas.width = width;
        ctx.canvas.height = height;
        
        // need to set font again after resizing canvas
        ctx.font = font;
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        
        ctx.fillStyle = 'rgba(0,0,0,0)';
        ctx.fillRect(0, 0, width, height);
        
        // scale to fit but don't stretch
        let scaleFactor = 1;
        ctx.translate(width / 2, height / 2);
        ctx.scale(scaleFactor, 1);
        ctx.fillStyle = '#ffffff';
        ctx.fillText(name, 0, 0);
        
        return ctx.canvas;
    }
    
    removeOneBar(cube, index) {
        this.scene.remove(cube.cube);
        this.cube[index] = null
    }
    
    getEllipseOpints(cube, index, diffPoint) {
        let points = [],
            positionD = this.positionDef[index];
        
        if (cube.angle === positionD.angle) {
            let position1 = cube.cube.position;
            points = new Array(diffPoint + 1).fill(new THREE.Vector2(position1.x, position1.z));
        } else {
            let angleOrder = [null, 0, 0.5 * Math.PI, Math.PI, 1.5 * Math.PI],
                curve;
            if (angleOrder.indexOf(cube.angle) > index) {
                curve = new THREE.EllipseCurve(
                    0, 0,
                    540, 540,
                    cube.angle, positionD.angle,
                    true,
                    0
                );
            } else {
                curve = new THREE.EllipseCurve(
                    0, 0,
                    540, 540,
                    cube.angle, positionD.angle,
                    false,
                    0
                );
            }
            
            points = curve.getPoints(diffPoint);
        }
        
        return points
    }
    
    getPointY(points, yuanH, hDiff) {
        let h = this.h;
        return points.map((value, index) => {
            return new THREE.Vector3(value.x, (h * (yuanH + hDiff * index)) / 2 + 2, value.y)
        })
    }
    
    getScale(scale, yuanH, hDiff, yuanX, xDiff) {
        return scale.map((value, index) => {
            return new THREE.Vector3(yuanX + xDiff * index, yuanH + hDiff * index, yuanX + xDiff * index)
        })
    }
    
    getTextScale(text, yuanH, hDiff) {
        let h = this.h;
        return text.map((value, index) => {
            return new THREE.Vector3(value.x, (h * (yuanH + hDiff * index)) / 2 + 42, value.z)
        })
    }
    
    animateOneBar(cube, index, value) {
        if (!cube.canAnimate) {
            return;
        }
        let positionD = this.positionDef[index],
            diffPoint = 40,
            path = {
                points: [],
                text: [],
                scale: new Array(diffPoint + 1).fill(0)
            };
        if (positionD.angle !== null && cube.angle !== null) {
            path.points = this.getEllipseOpints(cube, index, diffPoint)
        } else {
            let position1 = cube.cube.position;
            let position2 = positionD.position;
            let line = new THREE.LineCurve(
                new THREE.Vector2(position1.x, position1.z),
                new THREE.Vector2(position2[0], position2[1])
            );
            
            path.points = line.getPoints(diffPoint);
        }
        
        let yuanScale = cube.cube.children[0].scale,
            hDiff = ((2 / this.maxValue) * value - yuanScale.y) / diffPoint,
            xDiff = ((index === 0 ? 1.5 : 1) - yuanScale.x) / diffPoint;
        
        path.points = this.getPointY(path.points, yuanScale.y, hDiff);
        path.scale = this.getScale(path.scale, yuanScale.y, hDiff, yuanScale.x, xDiff);
        path.text = new Array(diffPoint + 1).fill(cube.cube.children[2].position);
        path.text = this.getTextScale(path.scale, yuanScale.y, hDiff);
        
        cube.cube.value = value;
        let textCube = cube.cube.children[2];
        // let shapes = this.font.generateShapes(value + "", 40);
        // textCube.geometry = new THREE.ShapeBufferGeometry(shapes).center(cube.cube.children[0].geometry);
        let textSprite = this.makeText(40, value + "");
        textCube.material = textSprite.spriteMaterial;
        textCube.scale.x = textSprite.canvas.width;
        textCube.scale.y = textSprite.canvas.height;
        
        this.pointMove(0, path, diffPoint, cube, positionD.angle)
    }
    
    pointMove(i, path, len, cube, endAngle, diff) {
        cube.canAnimate = false;
        let that = this,
            cubeChild = cube.cube.children,
            points = path.points,
            scale = path.scale,
            text = path.text,
            time = 50;
        
        new TWEEN.Tween(cube.cube.position)
            .to({x: points[i].x, y: points[i].y, z: points[i].z}, time)
            .onComplete(function () {
                if (i < len - 1) {
                    that.pointMove(++i, path, len, cube, endAngle, diff);
                } else {
                    cube.canAnimate = true;
                    cube.angle = endAngle
                }
            }).start();
        
        new TWEEN.Tween(cubeChild[0].scale)
            .to({x: scale[i].x, y: scale[i].y, z: scale[i].z}, time)
            .start();
        
        new TWEEN.Tween(cubeChild[1].scale)
            .to({x: scale[i].x, y: scale[i].y, z: scale[i].z}, time)
            .start();
        
        new TWEEN.Tween(cubeChild[2].position)
            .to({x: text[i].x, y: text[i].y, z: text[i].z}, time)
            .start();
    }
}