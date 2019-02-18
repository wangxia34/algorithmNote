window.onload = function (ev) {
    
    //测试用例
    let s1 = ["h","e","l","l","o"];
    let s2 = ["A"," ","m","a","n",","," ","a"," ","p","l","a","n",","," ","a"," ","c","a","n","a","l",":"," ","P","a","n","a","m","a"];
    
    function reverseString1(s) {
        for (let i = 0; i < s.length / 2; i++) {
            [s[i], s[s.length - 1 - i]] = [s[s.length - 1 - i], s[i]];
        }
    }
    
    function reverseString(s) {
        for (let i = 0, j = s.length - 1; i < j; ++i, --j) {
            [s[i], s[j]] = [s[j], s[i]];
        }
    }
    
    function reverseString2(s) {
        let str = '';
        for (let i=s.length-1; i>=0; i--) {
            str += s[i];
        }
    
        return str;
    }
    
    reverseString(s1);
    console.log(s1);
    reverseString(s2);
    console.log(s2)
    
};