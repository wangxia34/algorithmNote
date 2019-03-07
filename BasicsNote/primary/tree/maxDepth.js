window.onload = function (ev) {
    
    
    /*
     * function TreeNode(val) {
     *     this.val = val;
     *     this.left = this.right = null;
     * }
     */
    
    let tree = `
    {
      "val": 3,
      "right": {
        "val": 20,
        "right": {
          "val": 7,
          "right": null,
          "left": null
        },
        "left": {
          "val": 15,
          "right": null,
          "left": null
        }
      },
      "left": {
        "val": 9,
        "right": null,
        "left": null
      }
    }
    `;
    
    
    
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
    tree1.init([3,9,20,null,null,15,7]);
    
    
    
    
    
    function maxDepth1(root) {
        if (!root) {return 0;}
        
        if (root.right || root.left) {
            return 1 + Math.max(maxDepth(root.right), maxDepth(root.left));
        }
        
        return 1;
    }
    
    // 简写
    function maxDepth(root) {
        return root ? 1 + Math.max(maxDepth(root.left), maxDepth(root.right)) : 0;
    }
    
    
    console.log(maxDepth(tree1));
};