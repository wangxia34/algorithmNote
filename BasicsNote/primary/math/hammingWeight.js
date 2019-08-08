window.onload = function (ev) {
    
    /*
        编写一个函数，输入是一个无符号整数，返回其二进制表达式中数字位数为 ‘1’ 的个数（也被称为汉明重量）。
        
        示例 1：
        输入：00000000000000000000000000001011
        输出：3
        解释：输入的二进制串 00000000000000000000000000001011 中，共有三位为 '1'。
        
        示例 2：
        输入：00000000000000000000000010000000
        输出：1
        解释：输入的二进制串 00000000000000000000000010000000 中，共有一位为 '1'。
        
        示例 3：
        输入：11111111111111111111111111111101
        输出：31
        解释：输入的二进制串 11111111111111111111111111111101 中，共有 31 位为 '1'。
        
        进阶:
        如果多次调用这个函数，你将如何优化你的算法？
     */
    
    
    
    function hammingWeight1(n) {
        return n.toString(2).match(/1/g) ? n.toString(2).match(/1/g).length : 0;
    }
    
    function hammingWeight2(n) {
        let count = 0;
        while (n) {
            if (n % 2 === 1) {
                count += 1;
            }
            n = Math.trunc(n / 2);
        }
        return count;
    }
    
    function hammingWeight(n) {
        let count = 0;
        while (n !== 0) {
            n = n & (n - 1);
            count++;
        }
        return count;
    }
    
    
    console.log(hammingWeight(00000000000000000000000000000000));
    console.log(hammingWeight(00000000000000000000000010011000));
};