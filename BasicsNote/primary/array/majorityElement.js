window.onload = function (ev) {
    
    /*
        给定一个大小为 n 的数组，找到其中的众数。众数是指在数组中出现次数大于 ⌊ n/2 ⌋ 的元素。
        
        你可以假设数组是非空的，并且给定的数组总是存在众数。
        
        示例 1:
        输入: [3,2,3]
        输出: 3
        
        示例 2:
        输入: [2,2,1,1,1,2,2]
        输出: 2
     */
    
    
    function majorityElement1(nums) {
        let obj = {};
        
        for (let i = 0; i < nums.length; i++) {
            if (obj[nums[i]]) {
                obj[nums[i]]++
            } else {
                obj[nums[i]] = 1
            }
        }
        
        return Object.keys(obj).filter(value => obj[value] > nums.length / 2)[0] * 1;
    }
    
    
    function majorityElement(nums) {
        let count = 0;
        let majority = nums[0];
        
        for (let i = 0; i < nums.length; i++) {
            if (count === 0) {
                majority = nums[i];
            }
            
            if (majority === nums[i]) {
                count++;
            } else {
                count--;
            }
        }
        return majority;
    }
    
    
    
    let nums1 = [3, 2, 3],
        nums2 = [2, 2, 1, 1, 1, 2, 2],
        nums4 = [1, 2, 2, 1, 1, 3, 3, 2, 2, 2, 2],
        nums3 = [1, 1, 2, 2, 3, 3];
    
    console.log(nums1, majorityElement(nums1));
    console.log(nums2, majorityElement(nums2));
    console.log(nums3, majorityElement(nums3));
    console.log(nums4, majorityElement(nums4));
    
    
};