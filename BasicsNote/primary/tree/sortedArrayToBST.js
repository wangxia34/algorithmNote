window.onload = function (ev) {
    
    
    function TreeNode(val) {
        this.val = val;
        this.left = this.right = null;
    }
    
    
    function sortedArrayToBST1(nums) {
        if (nums == null || nums.length === 0) {
            return null;
        }
        return buildTree(nums, 0, nums.length - 1);
    }
    
    function buildTree(nums, l, r) {
        if (l > r) {return null;}
        if (l === r) {return new TreeNode(nums[l]);}
        let mid = Math.ceil((l + r) / 2),
            root = new TreeNode(nums[mid]);
        root.left = buildTree(nums, l, mid - 1);
        root.right = buildTree(nums, mid + 1, r);
        return root;
    }
    
    
    
    function sortedArrayToBST(nums) {
        if (nums.length === 0) return null;
        let treeNode = new TreeNode(nums[Math.floor(nums.length / 2)]);
        treeNode.left = sortedArrayToBST(nums.slice(0, Math.floor(nums.length / 2)));
        treeNode.right = sortedArrayToBST(nums.slice(Math.floor(nums.length / 2) + 1));
        return treeNode;
    }
    
    
    let arr1 = [-10,-3,0,5,9];
    
    console.log(arr1);
    console.log(sortedArrayToBST(arr1));
    
    
};