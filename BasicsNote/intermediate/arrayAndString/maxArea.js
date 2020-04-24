window.onload = function (ev) {

    /*
        给定 n 个非负整数 a1，a2，...，an，每个数代表坐标中的一个点 (i, ai) 。
        在坐标内画 n 条垂直线，垂直线 i 的两个端点分别为 (i, ai) 和 (i, 0)。
        找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。
        
        说明：你不能倾斜容器，且 n 的值至少为 2。
        
        图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 49。
        
        示例:
        输入: [1,8,6,2,5,4,8,3,7]
        输出: 49
     */
    
    
    
    /**
     * @param {number[]} height
     * @return {number}
     * 暴力法
     */
    let maxArea1 = function(height) {
        
        let len = height.length,
            max = 0;
    
        for (let i = 0; i < len - 1; i++) {
            for (let j = i + 1; j < len; j++) {
                let area = Math.min(height[i], height[j]) * (j - i);
                max = Math.max(max, area)
            }
        }
        
        return max
    };
    
    
    /**
     * @param {number[]} height
     * @return {number}
     * 夹逼解法
     */
    let maxArea = function (height) {
        let max = 0;
        for (let i = 0, j = height.length - 1; i < j;) {
            max = Math.max(max, (j - i) * (height[i] < height[j] ? height[i++] : height[j--]))
        }
        return max;
    };

    
    
    let height1 = [1,8,6,2,5,4,8,3,7];
    console.log(height1, maxArea(height1))
};