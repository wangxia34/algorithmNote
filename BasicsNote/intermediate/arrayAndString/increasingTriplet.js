window.onload = function (ev) {
    
    /*
        给定一个未排序的数组，判断这个数组中是否存在长度为 3 的递增子序列。
        
        数学表达式如下:
            如果存在这样的 i, j, k,  且满足 0 ≤ i < j < k ≤ n-1，
            使得 arr[i] < arr[j] < arr[k] ，返回 true ; 否则返回 false 。
        
        说明: 要求算法的时间复杂度为 O(n)，空间复杂度为 O(1) 。
        
        示例 1:
        输入: [1,2,3,4,5]
        输出: true
        
        
        示例 2:
        输入: [5,4,3,2,1]
        输出: false
     */
    
    
    /**
     * @param {number[]} nums
     * @return {boolean}
     */
    let increasingTriplet1 = function(nums) {
        if (nums.length < 3) {return false}
        let length = nums.length,
            arr = new Array(length).fill(1);
        
        for (let i = 1; i < length; i++) {
            for (let j = 0; j < i; j++) {
                if (nums[i] > nums[j]) {
                    arr[i] = Math.max(arr[i], arr[j] + 1);
                    if (arr[i] >= 3) {
                        // console.log(arr)
                        return true
                    }
                }
            }
        }
        // console.log(arr)
        return false
    };
    
    
    /**
     * @param {number[]} nums
     * @return {boolean}
     */
    let increasingTriplet = function(nums) {
        for (let i = 0, lN = Infinity, mN = Infinity; i < nums.length; i++) {
            const cN = nums[i];
            if (cN <= lN) lN = cN;
            else if (cN <= mN) mN = cN;
            else return true
        }
        return false
    };
    
    
    
    
    
    let nums1 = [1,2,3,4,5];
    let nums2 = [5,4,3,2,1];
    let nums3 = [2,4,-2,-3];
    console.log(nums1, increasingTriplet(nums1))
    console.log(nums2, increasingTriplet(nums2))
    console.log(nums3, increasingTriplet(nums3))
    
    
};