window.onload = function (ev) {
    
    /*
         给定一个数组 nums 和一个值 val，你需要原地移除所有数值等于 val 的元素，返回移除后数组的新长度。
        
        不要使用额外的数组空间，你必须在原地修改输入数组并在使用 O(1) 额外空间的条件下完成。
        元素的顺序可以改变。你不需要考虑数组中超出新长度后面的元素。
        
        示例 1:
        给定 nums = [3,2,2,3], val = 3,
        
        函数应该返回新的长度 2, 并且 nums 中的前两个元素均为 2。
        
        你不需要考虑数组中超出新长度后面的元素。
        
        
        示例 2:
        给定 nums = [0,1,2,2,3,0,4,2], val = 2,
        
        函数应该返回新的长度 5, 并且 nums 中的前五个元素为 0, 1, 3, 0, 4。
        
        注意这五个元素可为任意顺序。
        
        你不需要考虑数组中超出新长度后面的元素。
        
        
        说明:
        为什么返回数值是整数，但输出的答案是数组呢?
        请注意，输入数组是以“引用”方式传递的，这意味着在函数里修改输入数组对于调用者是可见的。
        你可以想象内部操作如下:
        // nums 是以“引用”方式传递的。也就是说，不对实参作任何拷贝
        int len = removeElement(nums, val);
        
        // 在函数里修改输入数组对于调用者是可见的。
        // 根据你的函数返回的长度, 它会打印出数组中该长度范围内的所有元素。
        for (int i = 0; i < len; i++) {
            print(nums[i]);
        }
     */
    
    
    
    
    function removeElement1(nums, val) {
        let i = 0;
        while (i < nums.length) {
            if (nums[i] === val) {
                nums.splice(i, 1)
            } else {
                i++
            }
        }
        return nums.length
    }
    
    // 另一个写法
    function removeElement2(nums, val) {
        while(nums.includes(val)) {
            nums.splice(nums.indexOf(val),1)
        }
        return nums.length
    }
    
    // 不考虑数组中超出新长度后面的元素
    function removeElement(nums, val) {
        let ans = 0;
        for(let num of nums) {
            if(num !== val) {
                nums[ans] = num;
                ans++;
            }
        }
        return ans;
    }
    
    
    let nums1 = [3,2,2,3], val1 = 3,
        nums2 = [0,1,2,2,3,0,4,2], val2 = 2;
    
    console.log(nums1, val1, removeElement(nums1, val1));
    console.log(nums2, val2, removeElement(nums2, val2));
};