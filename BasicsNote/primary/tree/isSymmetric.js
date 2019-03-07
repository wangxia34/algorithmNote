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
    
    
    function isSymmetric1(root) {
        const arr = inorderTraversal(root);
        for (let i = 0; i < arr.length / 2; i++) {
            if (arr[i] !== arr[arr.length - 1 - i]) {
                return false;
            }
        }
        return true;
    }
    function inorderTraversal(root) {
        const result = [];
        const inorder = node => {
            if(!node) return;
            inorder(node.left);
            result.push(node.val);
            inorder(node.right);
        };
        inorder(root);
        return result;
    }
    
    function isSymmetric2(root) {
        if (!root || (!root.left && !root.right)) {return true;}
        if (!root.left || !root.right) {return false;}
        
        return isSymmetricHelper(root.left, root.right);
    }
    function isSymmetricHelper(left, right) {
        if (!left && !right) {return true;}
        if (!left || !right) {return false;}
        if (left.val !== right.val) {return false;}
        return isSymmetricHelper(left.left, right.right) && isSymmetricHelper(left.right, right.left);
    }
    
    
    function isSymmetric(root) {
        if  (!root) {
            return true;
        }
        let res = [];
        let queue = [root];
    
        while (queue.length) {
            let i = 0;
            let j = queue.length - 1;
            while (i < j) {
                if ((queue[i] && queue[j]) && (queue[i].val !== queue[j].val)) {
                    return false;
                } else if ((!queue[i] && queue[j]) || (queue[i] && !queue[j])){
                    return false;
                
                }
                i++;
                j--;
            }
            let len = queue.length;
            let res = [];
            while (len--) {
                let node = queue.shift();
                node && res.push(node.left);
                node && res.push(node.right);
            }
        
            queue = res;
        }
    
    
        return true;
    }
    
    console.log(tree1);
    console.log(isSymmetric(tree1));
    console.log(tree2);
    console.log(isSymmetric(tree2));
    console.log(tree3);
    console.log(isSymmetric(tree3));
    
    
    
    
};