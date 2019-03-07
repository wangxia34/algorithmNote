window.onload = function (ev) {
    
    
    function TreeNode(val) {
        this.val = val;
        this.left = this.right = null;
    }
    TreeNode.prototype.init = function (arr) {
        let root = this,
            arr1 = [];
        if (arr.length === 1) {
            root.val = arr[0];
            root.left = root.right = null;
        }
        arr1.push(root);
        for (let i = 0; i < arr.length - 1; i++) {
            if (arr[i] !== null) root.val = arr[i];
            if (arr[i * 2 + 1] !== undefined && arr[i * 2 + 1] !== null) {
                root.left = new TreeNode(arr[i * 2 + 1]);
                arr1.push(root.left);
            }
            if (arr[i * 2 + 2] !== undefined && arr[i * 2 + 2] !== null) {
                root.right = new TreeNode(arr[i * 2 + 2]);
                arr1.push(root.right);
            }
            if (arr1[i + 1]) {
                root = arr1[i + 1];
            } else {
                break;
            }
        }
    };
    
    let tree1 = new TreeNode(0);
    tree1.init([1,2,2,3,4,4,3]);
    let tree2 = new TreeNode(0);
    tree2.init([1,2,2,null,3,null,3]);
    let tree3 = new TreeNode(0);
    tree3.init([2,1,3]);
    
    
    function levelOrder1(root) {
        if (!root) {return [];}
        let arr = [],
            queue = [root];
        while (queue.length) {
            let arrRes = [],
                res = [],
                len = queue.length;
            while (len--) {
                let node = queue.shift();
                node && arrRes.push(node.val);
                node.left && res.push(node.left);
                node.right && res.push(node.right);
            }
            if (arrRes.length) {arr.push(arrRes);}
            queue = res;
        }
        return arr;
    }
    
    // 广度优先遍历
    function levelOrder(root) {
        const ret = [];
        if (!root || root == null) return ret;
        const levelLoop = function(node, level) {
            if (!ret[level]) ret[level] = [node.val];
            else ret[level].push(node.val);
        
            if (node.left != null) levelLoop(node.left, level + 1);
            if (node.right != null) levelLoop(node.right, level + 1);
        };
        levelLoop(root, 0);
        return ret;
    }
    
    
    console.log(tree1);
    console.log(levelOrder(tree1));
    console.log(tree2);
    console.log(levelOrder(tree2));
    console.log(tree3);
    console.log(levelOrder(tree3));
    
    
    
};