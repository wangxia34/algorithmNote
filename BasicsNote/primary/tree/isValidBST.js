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
    tree1.init([10,5,15,null,null,6,20]);
    let tree2 = new TreeNode(0);
    tree2.init([5,1,4,null,null,3,6]);
    let tree3 = new TreeNode(0);
    tree3.init([2,1,3]);
    
    
    
    let inorderTraversal = function(root) {
        const result = [];
        const inorder = node => {
            if(!node) return;
            inorder(node.left);
            result.push(node.val);
            inorder(node.right);
        };
        inorder(root);
        return result;
    };
    
    let isValidBST = function(root) {
        const arr = inorderTraversal(root);
        console.log(arr);
        return arr.every((item, index) => item > (index > 0 ? arr[index - 1] : -Infinity));
    };
    
    let isValidBST2 = function(root) {
        return isValidBSTHelper(root, -Number.MAX_VALUE, Number.MAX_VALUE);
    };
    
    let isValidBSTHelper = function(root, min, max) {
        if (!root) return true;
        if (root.val <= min || root.val >= max) return false;
        return isValidBSTHelper(root.left, min, root.val) && isValidBSTHelper(root.right, root.val, max);
    };
    
    
    
    console.log(tree1);
    console.log(isValidBST(tree1));
    console.log(tree2);
    console.log(isValidBST(tree2));
    console.log(tree3);
    console.log(isValidBST(tree3));
    
    
};