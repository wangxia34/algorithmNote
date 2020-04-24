window.onload = function (ev) {
    
    /*
        峰值元素是指其值大于左右相邻值的元素。
        
        给定一个输入数组 nums，其中 nums[i] ≠ nums[i+1]，找到峰值元素并返回其索引。
        
        数组可能包含多个峰值，在这种情况下，返回任何一个峰值所在位置即可。
        
        你可以假设 nums[-1] = nums[n] = -∞。
        
        示例 1:
        输入: nums = [1,2,3,1]
        输出: 2
        解释: 3 是峰值元素，你的函数应该返回其索引 2。
        
        示例 2:
        输入: nums = [1,2,1,3,5,6,4]
        输出: 1 或 5
        解释: 你的函数可以返回索引 1，其峰值元素为 2；
             或者返回索引 5， 其峰值元素为 6。
        说明:
        
        你的解法应该是 O(logN) 时间复杂度的。
     */
    
    
    
    /**
     * @param {number[]} nums
     * @return {number}
     */
    let findPeakElement1 = function(nums) {
        if (nums.length === 1 || nums[1] < nums[0]) {return 0}
        if (nums[nums.length - 2] < nums[nums.length - 1]) {return nums.length - 1}
        for (let i = 1; i < nums.length - 1; i++) {
            if (nums[i-1] < nums[i] && nums[i] > nums[i+1]) {
                return i
            }
        }
        return 0
    };
    
    
    /**
     * @param {number[]} nums
     * @return {number}
     */
    let findPeakElement2 = function(nums) {
        let l = 0;
        let r = nums.length - 1;
        while (l < r) {
            const mid = l + r >>> 1;  // 除2向下取整
            if (nums[mid] >= nums[mid + 1]) r = mid;
            else l = mid + 1;
        }
        return l;
    };
    
    
    let findPeakElement = function(nums) {
        let maxNum = Math.max(...nums);
        return nums.indexOf(maxNum)
    };
    
    
    let nums1 = [1,2,3,4,5];
    let nums2 = [5,4,3,2,1];
    let nums3 = [1,2,3,1];
    let nums4 = [1,2,1,3,5,6,4];
    console.log(nums1, findPeakElement(nums1));
    console.log(nums2, findPeakElement(nums2));
    console.log(nums3, findPeakElement(nums3));
    console.log(nums4, findPeakElement(nums4))
    
    
    
};