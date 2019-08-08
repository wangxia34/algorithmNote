window.onload = function (ev) {
    /*
        给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

        示例:
        输入: [-2,1,-3,4,-1,2,1,-5,4],
        输出: 6
        解释: 连续子数组 [4,-1,2,1] 的和最大，为 6。
     */
    
    
    // 测试用例
    let nums1 = [-2,1,-3,4,-1,3,1,-5,4];
    let nums2 = [1];
    let nums3 = [1,-1,-2,-3,-4,7];
    let nums4 = [-1];
    
    
    function maxSubArray1(nums) {
        let max = nums[0];
        for (let i = 0; i < nums.length; i++) {
            let num = nums[i];
            if (max < num) {
                max = num;
            }
            for (let j = i + 1; j < nums.length; j++) {
                num += nums[j];
                if (max < num) {
                    max = num;
                }
            }
        }
        return max;
    }
    
    
    function maxSubArray2(nums) {
        const nLen = nums.length;
        let max = nums[0];
        let lastMax = 0;
    
        for (let i = 0; i < nLen; i++) {
            lastMax += nums[i];
            if (lastMax > max) {
                max = lastMax;
            }
            if (lastMax < 0) {
                lastMax = 0;
            }
        }
        return max;
    }
    
    function maxSubArray3(nums) {
        let m = nums.length;
        const dp = Array(m).fill(null);
        dp[0] = nums[0];
        for(let i = 1; i < nums.length; i++) {
            dp[i] = Math.max(nums[i], dp[i-1] + nums[i])
        }
        // console.log(dp);
        return Math.max(...dp)
    }
    
    function maxSubArray(nums) {
        let sum = nums[0];
        let n = nums[0];
        for (let i = 1; i < nums.length; i++) {
            if (n > 0) n += nums[i];
            else n = nums[i];
            if (sum < n) sum = n;
        }
        return sum;
    }
    
    
    
    console.log(nums1, maxSubArray(nums1));
    console.log(nums2, maxSubArray(nums2));
    console.log(nums3, maxSubArray(nums3));
    console.log(nums4, maxSubArray(nums4));
    
};