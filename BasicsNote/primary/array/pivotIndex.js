window.onload = function (ev) {
    
    /*
        给定一个整数类型的数组 nums，请编写一个能够返回数组“中心索引”的方法。
    
        我们是这样定义数组中心索引的：数组中心索引的左侧所有元素相加的和等于右侧所有元素相加的和。
        
        如果数组不存在中心索引，那么我们应该返回 -1。如果数组有多个中心索引，那么我们应该返回最靠近左边的那一个。
        
        示例 1:
        输入:
        nums = [1, 7, 3, 6, 5, 6]
        输出: 3
        解释:
        索引3 (nums[3] = 6) 的左侧数之和(1 + 7 + 3 = 11)，与右侧数之和(5 + 6 = 11)相等。
        同时, 3 也是第一个符合要求的中心索引。
        
        
        示例 2:
        输入:
        nums = [1, 2, 3]
        输出: -1
        解释:
        数组中不存在满足此条件的中心索引。
        
        说明:
        nums 的长度范围为 [0, 10000]。
        任何一个 nums[i] 将会是一个范围在 [-1000, 1000]的整数。
     */
    
    let nums1 = [1, 7, 3, 6, 5, 6];
    let nums2 = [1, 2, 3];
    let nums3 = [-1,-1,-1,0,1,1];
    
    function pivotIndex1(nums) {
        
        for (let i = 0; i < nums.length; i++) {
            let leftNum = 0,
                rightNum = 0;
            if (i !== 0) {
                leftNum = nums.slice(0, i).reduce((total, num) => total + num)
            }
            if (i !== nums.length - 1) {
                rightNum = nums.slice(i+1).reduce((total, num) => total + num)
            }
            
            if (leftNum === rightNum) {
                return i
            }
        }
        
        return -1
    }
    
    function pivotIndex2(nums) {
        if(nums.length === 0){
            return -1
        }
        let len = nums.length,
            index = -1,
            leftSum = 0,
            rightSum =  nums.reduce((total, num) => total + num);
        
        for(let i=0;i<len;i++){
            rightSum = rightSum - nums[i];
            if(leftSum === rightSum){
                index = i;
                break
            }else{
                leftSum = leftSum + nums[i]
            }
        }
        return index
    }
    
    function pivotIndex2(nums) {
        let left = 0;
        let right = 0;
        const diff = new Array(nums.length).fill(0);
        // 不断累积 每个位置上的左值 和 右值 放在同一个index 进行加减 如果有0 就是成功
        // 由于 当前位置 左值 会加一次当前位置的值 右值会减一次当前位置的值 所以不会有影响
        for (let i = 0, j = nums.length - 1 - i; i < nums.length; i++,j = nums.length - 1 - i) {
            diff[i] += left;
            left += nums[i];
            diff[j] -= right;
            right += nums[j];
        }
        return diff.indexOf(0);
    }
    
    function pivotIndex(nums) {
        //sum是数组总和，counter存放扫描数组时从num[0]到当前位置的累计求和值
        let sum = nums.reduce(((x, y) => x + y), 0),
            counter = 0,
            answer = -1;
        //扫描数组，累计求和值 乘 2 如果等于 数组总和 + 当前位置值，当前位置就是答案
        nums.some((v, i) => ((counter += v) * 2 === sum + v ? answer = i : -1) !== -1);
        return answer;
    }
    
    console.log(pivotIndex(nums1));
    console.log(pivotIndex(nums2));
    console.log(pivotIndex(nums3));
    
};