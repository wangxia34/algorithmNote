window.onload = function (ev) {
    
    
    /*
        给定一个已按照升序排列 的有序数组，找到两个数使得它们相加之和等于目标数。
    
        函数应该返回这两个下标值 index1 和 index2，其中 index1 必须小于 index2。
        
        说明:
        返回的下标值（index1 和 index2）不是从零开始的。
        你可以假设每个输入只对应唯一的答案，而且你不可以重复使用相同的元素。
        
        示例:
        输入: numbers = [2, 7, 11, 15], target = 9
        输出: [1,2]
        
        
        解释: 2 与 7 之和等于目标数 9 。因此 index1 = 1, index2 = 2 。
     */
    
    
    
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
    
    
    function twoSum2(nums, target) {
        const comp = {};
        for (let i = 0; i < nums.length; i++) {
            if (comp[nums[i]] >= 0) {
                return [comp[nums[i]], i]
            }
            comp[target - nums[i]] = i
        }
    }
    
    var twoSum3 = function(nums, target) {
        let res = {}
        for (let i = 0; i < nums.length; i++) { // 每个人登记自己想要配对的人，让主持人记住
            res[target - nums[i]] = nums[i]
        }
        for (let j = 0; j < nums.length; j++) { // 每个人再次报数的时候，主持人看一下名单里有没有他
            if (res[nums[j]] !== undefined) {
                return [nums[j], res[nums[j]]]
            }
        }
    };
    
    var twoSum = function(nums, target) {
        let res = {}
        for (let i = 0; i < nums.length; i++) { // 每个人报出自己想要配对的人
            if (res[nums[i]] !== undefined) { // 如果有人被登记过
                return [nums[i], res[nums[i]]] // 就是他
            } else {  // 否则
                res[target - nums[i]] = nums[i] // 主持人记住他的需求
            }
        }
    };
    
    console.log(twoSum(nums1, target1), nums1, target1);
    
    
};