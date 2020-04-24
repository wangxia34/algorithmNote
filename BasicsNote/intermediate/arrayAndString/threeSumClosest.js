window.onload = function (ev) {
    
    /*
        给定一个包括 n 个整数的数组 nums 和 一个目标值 target。找出 nums 中的三个整数，
        使得它们的和与 target 最接近。返回这三个数的和。假定每组输入只存在唯一答案。
        
        例如，给定数组 nums = [-1，2，1，-4], 和 target = 1.
        与 target 最接近的三个数的和为 2. (-1 + 2 + 1 = 2).
     */
    
    
    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {number}
     */
    let threeSumClosest1 = function(nums, target) { // 暴力法
        let n = nums.length;
        if (n < 3) throw new Error("n should be bigger than 3!");
    
        let ans = nums[0] + nums[1] + nums[2];
        for (let i = 0; i < n - 2; i++) {
            for (let j = i + 1; j < n - 1; j++) {
                for (let k = j + 1; k < n; k++) {
                    let t = nums[i] + nums[j] + nums[k];
                    if (Math.abs(t - target) < Math.abs(ans - target)) ans = t;
                }
            }
        }
    
        return ans;
    };
    
    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {number}
     * 1、先对数组进行排序。
     * 2、枚举前2个数，对第三个数进行二分查找，找到和sum第一个大于等于target的数（一个可能解），
     *   如果这个点有前一个元素（小于target，另一个有可能的解）。解就在这两个点上。维护一个最接近target的和。
     */
    let threeSumClosest2 = function(nums, target) {
        let n = nums.length;
        if (n < 3) throw new Error("the size of nums should be bigger than 3!");
        
        nums.sort((a, b) => a - b); // 排序
    
        let ans = nums[0] + nums[1] + nums[2];
        for (let i = 0; i < n - 2; i++) {
            for (let j = i + 1; j < n - 1; j++) {
                let sum_pre = nums[i] + nums[j];
                let l = j + 1, r = n - 1;
                while (l < r) {
                    let mid = l + r >> 1;
                    if (sum_pre >= target - nums[mid]) r = mid;
                    else l = mid + 1;
                }
    
                let idx = r;
                if (r - 1 !== j && Math.abs(target - sum_pre - nums[r]) > Math.abs(target - sum_pre - nums[r-1])) {
                    idx = r - 1;
                }
    
                let t = Math.abs(target - ans);
                if (Math.abs(sum_pre + nums[idx] - target) < t) ans = sum_pre + nums[idx];
            }
        }
    
        return ans;
    };
    
    
    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {number}
     * 1、先对数组进行排序。
     * 2、按从大到小的顺序枚举每一个元素nums[i]， 利用头尾指针（l和r）找出该元素后面两个元素 + nums[i]加起来离target最近的两个数，
     *   计和为sum。若sum比target要大，利用排序好的性质，r向左收缩；若sum比target要小（l往右收缩）；直到l跟r相撞为止。
     *   维护一个全局最近的一个点。
     */
    let threeSumClosest = function(nums, target) {
        let n = nums.length;
        if (n < 3) throw new Error("n should be bigger than 3!");
    
        nums.sort((a, b) => a - b); // 排序
        let ans = nums[0] + nums[1] + nums[2];
        
        for (let i = 0; i < n - 2; i++) {
            let l = i + 1, r = n - 1;
            while (l < r) {
                let sum = nums[i] + nums[l] + nums[r];
                if (Math.abs(sum - target) < Math.abs(ans - target)) {
                    ans = sum
                }
                
                if (sum > target) {
                    r--
                } else {
                    l++
                }
            }
        }
        
        return ans
    };
    
    
    
    
    
    
    let nums1 = [-1,2,1,-4];
    let nums2 = [0,2,1,-3];
    console.log(nums1, 1, threeSumClosest(nums1, 1));
    console.log(nums2, 1, threeSumClosest(nums2, 1))
    
};