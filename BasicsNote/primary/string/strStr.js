window.onload = function (ev) {
    
    // 测试用例
    let haystack1 = "hello", needle1 = "ll";
    let haystack2 = "aaaaa", needle2 = "bba";
    let haystack3 = "aaaaa", needle3 = "";
    
    
    function strStr1(haystack, needle) {
        if (!needle) {
            return 0;
        }
        let reg = new RegExp(needle);
        let result = reg.exec(haystack);
        return result ? result.index : -1;
    }
    
    function strStr2(haystack, needle) {
        let reg = new RegExp(needle);
        // 返回第一个匹配的子串的起始位置
        return haystack.search(reg);
    }
    
    function strStr3(haystack, needle) {
        if (needle === '') return 0;
        for (let i = 0; i <= haystack.length - needle.length; i++) {
            for (let j = 0; j < needle.length; j++) {
                if (needle[j] !== haystack[i + j]) {
                    break;
                }
                if (j === needle.length - 1) {
                    return i;
                }
            }
        }
        return -1;
    }
    
    function strStr(haystack, needle) {
        if (needle === "") return 0;
        for (let i = 0; i < haystack.length; i++) {
            if (haystack[i] === needle[0]) {
                if (haystack.substring(i, i + needle.length) === needle) return i;
            }
        }
        return -1
    }
    
    
    console.log(haystack1, needle1, strStr(haystack1, needle1));
    console.log(haystack2, needle2, strStr(haystack2, needle2));
    console.log(haystack3, needle3, strStr(haystack3, needle3));
    
};