window.onload = function (ev) {
    
    /*
        打乱一个没有重复元素的数组。
    
        示例:
        // 以数字集合 1, 2 和 3 初始化数组。
        int[] nums = {1,2,3};
        Solution solution = new Solution(nums);
        
        // 打乱数组 [1,2,3] 并返回结果。任何 [1,2,3]的排列返回的概率应该相同。
        solution.shuffle();
        
        // 重设数组到它的初始状态[1,2,3]。
        solution.reset();
        
        // 随机返回数组[1,2,3]打乱后的结果。
        solution.shuffle();
     */
    
    // 测试用例
    let nums1 = [1, 2, 3];
    
    
    let Solution1 = function(nums) {
        this.defaultNums = [...nums];
        this.nums = [...nums];
    };
    
    Solution1.prototype.reset = function() {
        this.nums = [...this.defaultNums];
        return this.nums;
    };
    
    Solution1.prototype.shuffle = function() {
        const result = [],
            nums = [...this.nums];
        while(result.length < this.defaultNums.length) {
            const i = getRandomInt(nums.length);
            const num = nums.splice(i, 1);
            result.push(num[0]);
        }
        this.nums = result;
    
        return this.nums;
    };
    
    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }
    function randomNum(minNum, maxNum){
        return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
    }
    function randomBoolean(){
        return Math.random() > 0.5;
    }
    
    
    
    
    
    let Solution = function (nums) {
        this.copy = nums.concat();
        this.nums = nums;
    };
    
    Solution.prototype.reset = function () {
        return this.copy;
    };
    
    Solution.prototype.shuffle = function () {
        if (this.nums === null)
            return null;
        let length = this.nums.length;
        
        for (let i = length - 1; i >= 0; i--) {
            //生成随机数
            // Math.random()生成 0-1,则 Math.random() * 5 生成 0-5
            // 此处生成 0 - (length - 1)
            let random = Math.floor(Math.random() * (length - 1));
            
            //遍历交换
            let tmp = this.nums[i];
            this.nums[i] = this.nums[random];
            this.nums[random] = tmp;
        }
        
        return this.nums;
    };
    
    
    
    
    let obj = new Solution(nums1);
    let param_1 = obj.reset();
    let param_2 = obj.shuffle();
    
    console.log(param_1);
    console.log(param_2);
    
    
    
    
};