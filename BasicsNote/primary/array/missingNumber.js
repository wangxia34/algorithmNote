window.onload = function (ev) {

    /*
    给定一个包含 0, 1, 2, ..., n 中 n 个数的序列，找出 0 .. n 中没有出现在序列中的那个数。

    示例 1:
    输入: [3,0,1]
    输出: 2
    
    示例 2:
    输入: [9,6,4,2,3,5,7,0,1]
    输出: 8
    
    说明:
    你的算法应具有线性时间复杂度。你能否仅使用额外常数空间来实现?
     */

    let arr1 = [3,0,1];
    let arr2 = [9,6,4,2,3,5,7,0,1];
    
    function missingNumber1(nums) {
        let allNum = 0,
            allLen = 0;
        
        for (let i = 0; i < nums.length; i++) {
            allNum += nums[i];
            allLen += i
        }
        allLen += nums.length;
        
        return allLen - allNum;
    }
    
    function missingNumber(nums) {
        let map = {};
        for (let i of nums) {
            map[i] = true
        }
        
        for (let i =0;i<nums.length;i++) {
            if (!map[i]) {
                return i
            }
        }
        
        return nums.length
    }

    console.log(missingNumber(arr1));
    console.log(missingNumber(arr2));

};