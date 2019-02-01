window.onload = function (ev) {
    
    // 测试用例
    let nums1 = [2, 7, 11, 15], target1 = 9;
    
    
    function twoSum1(nums, target) {
        for (let i = 0; i < nums.length; i++) {
            for (let j = i + 1; j < nums.length; j++) {
                if (nums[i] + nums[j] === target) {
                    return [i, j];
                }
            }
        }
    }
    
    
    function twoSum(nums, target) {
        const comp = {};
        for (let i = 0; i < nums.length; i++) {
            if (comp[nums[i]] >= 0) {
                return [comp[nums[i]], i]
            }
            comp[target - nums[i]] = i
        }
    }
    
    console.log(twoSum(nums1, target1), nums1, target1);
    
    
};