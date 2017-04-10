var AvatarThreeDee = (function(scene) {
    var camera, scene, renderer;
    var geometry, material;

    var init = function() {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
        camera.position.z = 1000;

        renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);

        document.getElementById("3d").appendChild(renderer.domElement);
        animate();
    }

    var animate = function() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }

    var createObject = function(name, positions) {
        var geometry = new THREE.BoxGeometry(200, 200, 200);
        var material = new THREE.MeshBasicMaterial({ color: 0x00ff7f, wireframe: true });
        var mesh = new THREE.Mesh(geometry, material);
        mesh.name = name;
        for (var key in positions) {
            if (!mesh.position.hasOwnProperty(key)) continue;
            mesh.position[key] = positions[key];
        }
        // Bad code, need to find a better way of doing this
        mesh["set"] = setObject.bind(null, mesh);
        return mesh;
    }

    var getObjectByName = function(name) {
        var object = scene.getObjectByName(name);
        this.set = setObject.bind(null, object);
        return this;
    }

    var setObject = function(parent, child) {
        parent.add(child);
        return child;
    }

    var addObjectModel = function(objects) {
        for (var key in objects) {
            if (!objects.hasOwnProperty(key)) continue;
            scene.add(objects[key]);
        }
    }

    var addObject = function(object) {
        scene.add(objects);
    }

    return {
        init: init,
        createObject: createObject,
        getObjectByName: getObjectByName,
        addObject: addObject,
        addObjectModel: addObjectModel
    }
})();