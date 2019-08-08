window.onload = function (ev) {
    
    /*
        在一个给定的数组nums中，总是存在一个最大元素 。
        
        查找数组中的最大元素是否至少是数组中每个其他数字的两倍。
        
        如果是，则返回最大元素的索引，否则返回-1。
        
        示例 1:
        输入: nums = [3, 6, 1, 0]
        输出: 1
        解释: 6是最大的整数, 对于数组中的其他整数,
        6大于数组中其他元素的两倍。6的索引是1, 所以我们返回1.
        
        示例 2:
        输入: nums = [1, 2, 3, 4]
        输出: -1
        解释: 4没有超过3的两倍大, 所以我们返回 -1.
        
        提示:
        nums 的长度范围在[1, 50].
        每个 nums[i] 的整数范围在 [0, 99].
     */
    
    let nums1 = [3, 6, 1, 0],
        nums2 = [1, 2, 3, 9, 4];
    
    function dominantIndex1(nums) {
        let maxNum = 0,
            max2Num = 0,
            index = -1;
        
        for (let i = 0; i < nums.length; i++) {
            if (nums[i] >= maxNum * 2) {
                max2Num = maxNum;
                maxNum = nums[i];
                index = i
            } else if (nums[i] > max2Num) {
                max2Num = nums[i];
                if (maxNum < nums[i] * 2) {
                    maxNum = nums[i];
                    index = -1
                }
            }
        }
        
        return index
    }
    
    function dominantIndex(nums) {
        const lar = Math.max(...nums);
        const larIndex = nums.indexOf(lar);
        
        for(let i=0;i<nums.length;i++) {
            if(nums[i]*2>lar && lar !== nums[i]){
                return -1
            }
        }
        return larIndex
    }
    
    console.log(dominantIndex(nums1));
    console.log(dominantIndex(nums2));
    
};