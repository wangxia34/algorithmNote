window.onload = function (ev) {
    
    
    
    
    
    function countAndSay(n) {
        let str = "1";
        for (let i = 1; i < n; i++) {
            let str1 = "",
                num = 1;
            for (let j = 0; j < str.length; j++) {
                if (str[j] === str[j + 1]) {
                    num++;
                } else {
                    str1 += num + str[j];
                    num = 1;
                }
            }
            str = str1;
        }
        
        return str;
    }
    
    
    console.log(countAndSay(1));
    console.log(countAndSay(2));
    console.log(countAndSay(3));
    console.log(countAndSay(4));
    console.log(countAndSay(5));
    console.log(countAndSay(6));
    
    
};