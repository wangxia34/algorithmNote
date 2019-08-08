window.onload = function (ev) {
    
    /*
        给定两个二进制字符串，返回他们的和（用二进制表示）。
        
        输入为非空字符串且只包含数字 1 和 0。
        
        示例 1:
        输入: a = "11", b = "1"
        输出: "100"
        
        示例 2:
        输入: a = "1010", b = "1011"
        输出: "10101"
     */
    
    
    function addBinary1(a, b) {
        let jw = 0;
        let arr = [];
        
        for (let i = a.length-1, j = b.length-1; i >= 0 || j >= 0; i--, j--) {
            // let num = (a[i] ? a[i]*1 : 0) + (b[j] ? b[j]*1 : 0) + jw;
            let num = (a[i]*1 || 0) + (b[j]*1 || 0) + jw;
            
            if (num > 1) {
                jw = 1;
                num = num - 2;
            } else {
                jw = 0;
            }
            arr.unshift(num)
        }
        if (jw) {arr.unshift(jw)}
        
        return arr.join("")
    }
    
    function addBinary(a, b) {
        let dec_a = BigInt("0b" + a);
        let dec_b = BigInt("0b" + b);
        let sum = BigInt(dec_a) + BigInt(dec_b);
        return sum.toString(2)
    }
    
    console.log(addBinary1("1010", "1011")); // 10101
    console.log(addBinary1("11", "1"));      // 100
    console.log(addBinary1("110", "101"));   // 1011
    console.log(addBinary1("0", "0"));       // 0
    
};