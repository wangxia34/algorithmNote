window.onload = function (ev) {
    
    
    /*
        给定一个二进制数组， 计算其中最大连续1的个数。
    
        示例 1:
        输入: [1,1,0,1,1,1]
        输出: 3
        
        
        解释: 开头的两位和最后的三位都是连续1，所以最大连续1的个数是 3.
        
        
        注意：
        输入的数组只包含 0 和1。
        输入数组的长度是正整数，且不超过 10,000。
     */
    
    
    function findMaxConsecutiveOnes1(nums) {
        let maxL = 0,
            currentL = 0;
        for (let i = 0; i < nums.length; i++) {
            if (nums[i] === 1) {
                currentL++
            } else {
                maxL = Math.max(maxL, currentL);
                currentL = 0
            }
        }
        
        return Math.max(maxL, currentL);
    }
    
    function findMaxConsecutiveOnes(nums) {
        return nums.join('').split('0').reduce(function (x, y) {
            return Math.max(x, y.length);
        }, 0);
    }
    
    let nums1 = [1,1,0,1,1,1];
    console.log(nums1, findMaxConsecutiveOnes(nums1));
    
};