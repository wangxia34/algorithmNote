window.onload = function (ev) {
    
    /*
        给定一个含有 n 个正整数的数组和一个正整数 s ，找出该数组中满足其和 ≥ s 的长度最小的连续子数组。如果不存在符合条件的连续子数组，返回 0。

        示例:
        输入: s = 7, nums = [2,3,1,2,4,3]
        输出: 2
        
        
        解释: 子数组 [4,3] 是该条件下的长度最小的连续子数组。
        
        
        进阶:
        如果你已经完成了O(n) 时间复杂度的解法, 请尝试 O(n log n) 时间复杂度的解法。
    
    
     */
    
    function minSubArrayLen1(s, nums) {
        let minL = nums.length,
            currentL = 0,
            currentNum = 0,
            flag = false;
        
        for (let i = 0; i < nums.length; i++) {
            currentL = 0;
            currentNum = 0;
            for (let j = i; j < nums.length; j++) {
                currentNum += nums[j];
                currentL++;
                if (currentNum >= s) {
                    flag = true;
                    minL = Math.min(minL, currentL);
                    break
                }
            }
            
        }
        
        return flag ? minL : 0
    }
    
    function minSubArrayLen(s, nums) {
        if (!nums.length) return 0;
        
        let minLen = nums.length + 1,
            currentNum = nums[0],
            currentL = 0,
            currentR = 0;
        
        while (currentL < nums.length) {
            if (currentNum < s) {
                if (currentR + 1 >= nums.length) {break}
                currentNum += nums[++currentR]
            } else {
                minLen = Math.min(minLen, currentR - currentL + 1);
                currentNum -= nums[currentL++]
            }
        }
        
        return minLen === nums.length + 1 ? 0 : minLen
    }
    
    
    
    
    let s1 = 7, nums1 = [2,3,1,2,4,3];
    let s2 = 3, nums2 = [1,1];
    
    console.log(s1, nums1, minSubArrayLen(s1, nums1));
    console.log(s2, nums2, minSubArrayLen(s2, nums2));
    
};