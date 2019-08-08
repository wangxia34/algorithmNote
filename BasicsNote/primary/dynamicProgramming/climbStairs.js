window.onload = function (ev) {
    
    // 测试用例
    let n1 = 2;
    let n2 = 3;
    let n3 = 4;
    let n4 = 5;
    let n5 = 6;
    let n6 = 7;
    
    
    function climbStairs1(n) {
        if (n <= 1) {
            return 1;
        } else if (n === 2) {
            return 2;
        } else {
            let res = 0,
                i = 1, j = 2,
                k = 3;
            while (k <= n) {
                res = i + j;
                i = j;
                j = res;
                k++;
            }
            return res;
        }
    }
    
    let cache = {
        1: 1,
        2: 2
    };
    
    let climbStairs = function(n) {
        if (cache[n] !== undefined) {
            return cache[n];
        }
        
        let steps = climbStairs(n - 1) + climbStairs (n - 2);
        cache[n] = steps;
        return steps;
    };
    
    console.log(n1, climbStairs(n1));
    console.log(n2, climbStairs(n2));
    console.log(n3, climbStairs(n3));
    console.log(n4, climbStairs(n4));
    console.log(n5, climbStairs(n5));
    console.log(n6, climbStairs(n6));
    
    
};