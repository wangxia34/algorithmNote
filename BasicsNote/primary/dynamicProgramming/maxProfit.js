window.onload = function (ev) {
    
    // 测试用例
    let prices1 = [7,1,5,3,6,4];
    let prices2 = [7,6,4,3,1];
    let prices3 = [1,2];
    let prices4 = [2,1,2,0,1];
    let prices5 = [1,2,4];
    let prices6 = [3,2,6,5,0,3];
    
    
    
    function maxProfit1(prices) {
        let maxNum = 0;
        for (let i = 0; i < prices.length - 1; i++) {
            for (let j = i + 1; j < prices.length; j++) {
                let num = prices[j] - prices[i];
                if (num > maxNum) {
                    maxNum = num;
                }
            }
        }
        return maxNum;
    }
    
    function maxProfit(prices) {
        let max = 0;
        let min = Number.MAX_VALUE;
    
        for (let i = 0; i < prices.length; i++) {
            if (prices[i] < min) {
                min = prices[i];
            } else if (prices[i] - min > max) {
                max = prices[i] - min;
            }
        }
        return max;
    }
    
    console.log(prices1, maxProfit(prices1));
    console.log(prices2, maxProfit(prices2));
    console.log(prices3, maxProfit(prices3));
    console.log(prices4, maxProfit(prices4));
    console.log(prices5, maxProfit(prices5));
    console.log(prices6, maxProfit(prices6));
    
    
};