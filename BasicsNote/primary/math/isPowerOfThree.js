window.onload = function (ev) {

    /*
        给定一个整数，写一个函数来判断它是否是 3 的幂次方。

        示例 1:
        输入: 27
        输出: true
        
        
        示例 2:
        输入: 0
        输出: false
        
        示例 3:
        输入: 9
        输出: true
        
        示例 4:
        输入: 45
        输出: false
     */

    function isPowerOfThree1(n) {
        if (n === 1 || n === 3) {
            return true
        } else if (n < 3 || n % 3 !== 0) {
            return false
        }
        
        return isPowerOfThree(n / 3);
        
    }
    
    function isPowerOfThree2(n) {
        let flag = false;
        let res;
        for(let i = 0; i < n; i++) {
            res = Math.pow(3, i);
            if (res === n) {
                flag = true
            } else if (res > n) {
                break
            }
        }
        return flag
    }
    
    function isPowerOfThree3(n) {
        if (n < 3) {
            return n === 1;
        }
        while (n > 1) {
            if (n % 3 !== 0) {
                return false;
            }
            n = Math.trunc(n/3);
        }
        return true;
    }
    
    // 对于10进制数来说，10的n次幂表达为10，100，100 对于2进制数来说，2的n次幂的二进制表达为 10,100,100 3进制同理
    function isPowerOfThree4(n) {
        return /^10*$/.test(n.toString(3));
    }
    
    function isPowerOfThree(n) {
        if(n<=0)return false;
        return !((Math.log10(n) / Math.log10(3)) % 1)
    }
    
    console.log(isPowerOfThree(1));
    console.log(isPowerOfThree(27));
    console.log(isPowerOfThree(9));
    console.log(isPowerOfThree(45));
    console.log(isPowerOfThree(44));
    
};