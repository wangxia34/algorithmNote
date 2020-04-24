window.onload = function (ev) {
    
    /*
        给定一个包含 n 个整数的数组 nums 和一个目标值 target，判断 nums 中是否存在四个元素 a，b，c 和 d ，
        使得 a + b + c + d 的值与 target 相等？找出所有满足条件且不重复的四元组。
        
        注意：
        答案中不可以包含重复的四元组。
        
        示例：
        给定数组 nums = [1, 0, -1, 0, -2, 2]，和 target = 0。
        满足要求的四元组集合为：
        [
          [-1,  0, 0, 1],
          [-2, -1, 1, 2],
          [-2,  0, 0, 2]
        ]
     */
    
    
    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {number[][]}
     */
    let fourSum = function(nums, target) {
        let arr = [], n = nums.length;
        nums.sort((a, b) => a - b);
        
        for (let i = 0; i < n - 3; i++) {
            if (i > 0 && nums[i - 1] === nums[i]) {continue} // 去重
            for (let j = i + 1; j < n - 2; j++) {
                if (j > i + 1 && nums[j - 1] === nums[j]) {continue} // 去重
                let l = j + 1, r = n - 1;
                while (l < r) {
                    let sum = nums[i] + nums[j] + nums[l] + nums[r];
                    if (sum > target) {
                        r--
                    } else if (sum < target) {
                        l++
                    } else {
                        let item = [nums[i], nums[j], nums[l], nums[r]];
                        arr.push(item);
                        while (l < r && nums[l] === nums[l + 1]) l++; // 去重
                        while (l < r && nums[r] === nums[r - 1]) r--; // 去重
                        l++;
                        r--
                    }
                }
            }
        }
        
        return arr
        
    };
    
    
    let nums1 = [1, 0, -1, 0, -2, 2], target1 = 0;
    let nums2 = [-3,-2,-1,0,0,1,2,3], target2 = 0;
    let nums3 = [1,-2,-5,-4,-3,3,3,5], target3 = -11;
    let nums4 = [0,1,5,0,1,5,5,-4], target4 = 11;
    
    console.log(nums1, target1, fourSum(nums1, target1));
    console.log(nums2, target2, fourSum(nums2, target2));
    console.log(nums3, target3, fourSum(nums3, target3));
    console.log(nums4, target4, fourSum(nums4, target4));
    
    
    
    
};