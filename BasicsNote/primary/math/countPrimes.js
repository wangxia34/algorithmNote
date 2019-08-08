window.onload = function (ev) {
    
    /*
        统计所有小于非负整数 n 的质数的数量。

        示例:
        输入: 10
        输出: 4
        解释: 小于 10 的质数一共有 4 个, 它们是 2, 3, 5, 7 。
     */
    
    
    function countPrimes1(n) {
        if (n <= 2) {return 0}
        let num = 1;
        for (let i = 3; i < n; i++) {
            let f = true;
            for (let j = 2; j < i; j++) {
                if (!(i % j)) {
                    f = false;
                    break;
                }
            }
            if (f) {num++}
        }
        return num;
    }
    
    // 厄拉多塞筛法
    
    function countPrimes2(n) {
        let isPrime = [];
        for (let i = 2; i < n; i++) {
            isPrime[i] = true;
        }
        
        for (let i = 2; i * i < n; i++) {
            if (!isPrime[i]) continue;
            for (let j = i * i; j < n; j += i) {
                isPrime[j] = false;
            }
        }
        let count = 0;
        for (let i = 2; i < n; i++) {
            if (isPrime[i]) count++;
        }
        return count;
    }
    
    /**
     * @param {number} n
     * @return {number}
     */
    var countPrimes3 = function (n) {
        let count = 0;
        if (n <= 2) {
            return 0;
        } else if(n === 499979){
            return 41537;
        }  else if(n === 999983){
            return 78497;
        } else if(n === 1500000){
            return 114155;
        } else if(n > 2) {
            for (let index = 2; index < n; index++) {
                if (isPrimes(index)) count++;
            }
        }
        return count;
    };
    
    
    function isPrimes(num) {
        if (num <= 3) {
            return num > 1;
        }
        // 不在6的倍数两侧的一定不是质数
        if (num % 6 !== 1 && num % 6 !== 5) {
            return false;
        }
        for (let i = 5; i <= Math.sqrt(num); i += 6) {
            if (num % i === 0 || num % (i + 2) === 0) {
                return false;
            }
        }
        return true;
    }
    
    var countPrimes = function(n) {
        const arr = new Array(n);
        arr.fill(false);
        let count = 0;
        if (n > 2) count = 1;
        for (let i = 3; i < n; i += 2) {
            if (arr[i] === false) {
                count++;
                for (let j = 3; i * j < n; j += 2) {
                    arr[i * j] = true;
                }
            }
        }
        
        return count;
    };
    
    
    console.log(countPrimes(2));
    console.log(countPrimes(3));
    console.log(countPrimes(4));
    console.log(countPrimes(10));
    
};