window.onload = function (ev) {
    
    /*
        给定一个字符串 s，找到 s 中最长的回文子串。你可以假设 s 的最大长度为 1000。
        
        示例 1：
        输入: "babad"
        输出: "bab"
        注意: "aba" 也是一个有效答案。
        
        
        示例 2：
        输入: "cbbd"
        输出: "bb"
     */
    
    
    /**
     * @param {string} s
     * @return {string}
     */
    let longestPalindrome1 = function (s) { // 超时
        let len = s.length, l = 0, r = s.length, str = "";
        
        while (l < len) {
            let strItem = s.substring(l, r);
            if (strItem === strItem.split("").reverse().join("")) {
                str = str.length > strItem.length ? str : strItem;
                l++;
                r = len;
                if (r - l <= str.length) {break}
            } else {
                if (--r <= l) {
                    l++;
                    r = len
                }
            }
        }
        
        return str
    };
    
    /**
     * @param {string} s
     * @return {string}
     */
    let longestPalindrome2 = function (s) { // 动态规划
        let length = s.length;
        let p = new Array(length).fill(0);
        p.forEach((value, index) => {p[index] = []});
        let maxLen = 0, maxPal = "";
        
        for (let len = 1; len <= length; len++) {
            for (let start = 0; start < length; start++) {
                let end = start + len - 1;
                if (end >= length) {
                    break
                }
                p[start][end] = (len === 1 || len === 2 || p[start + 1][end -1]) && s.charAt(start) === s.charAt(end);
                if (p[start][end] && len > maxLen) {
                    maxPal = s.substring(start, end + 1);
                    maxLen = maxPal.length
                }
            }
        }
        
        return maxPal
    };
    
    
    let expandAroundCenter = function (s, left, right) {
        let l = left, r = right;
        while (l >= 0 && r < s.length && s.charAt(l) === s.charAt(r)) {
            l--; r++
        }
        return r - l - 1
    };
    /**
     * @param {string} s
     * @return {string}
     */
    let longestPalindrome3 = function (s) {
        if (s == null || s.length < 1) return "";
        let start = 0, end = 0;
        for (let i = 0; i < s.length; i++) {
            let len1 = expandAroundCenter(s, i, i); // 中心为单数时 得到最长回文的长度
            let len2 = expandAroundCenter(s, i, i + 1); // 中心为双数时  得到最长回文的长度
            let len = Math.max(len1, len2);
            if (len > end - start) { // 是否比之前保存的最长长度长
                start = i - (len - 1) / 2; // 得到起始下标
                end = i + len / 2 // 得到终止下标
            }
        }
        
        // 当得到的下标为小数时，起始点需处理
        return s.substring(Math.ceil(start), end + 1)
    };
    
    /* cbbd
    i = 0:  len1 = 1  len2 = 0  len = 1    start = 0  end = 0.5
    i = 1:  len1 = 1  len2 = 2  len = 2    start = 0.5  end = 2
    i = 2:  len1 = 1  len2 = 0  len = 1
    i = 3:  len1 = 1  len2 = 0  len = 1
     */
    
    
    /**
     * @param {string} s
     * @return {string}
     */
    let longestPalindrome = function(s) {
        let length = s.length;
        if (length < 2) {return s;}
        let string = s[0],
            len1 = length - 1,
            start = 0,
            end = 0;
        for (let i = 0; i < len1; i++) {
            let len2 = i;
            while (len2 < len1 && s[len2] === s[len2 + 1]) { // 两个或多个相连的字母相同 [解决中心问题]
                len2++
            }
            let i2 = len2;
            while (i > 0 && len2 < len1 && s[i - 1] === s[len2 + 1]) { // 中心字符串两端是否相等
                i--;
                len2++
            }
            if (len2 - i > end - start) { // 是否比之前保存的最长长度长
                start = i;
                end = len2
            }
            i = i2 // 移位至中心字符串结束位置
        }
        string = s.slice(start, end + 1);
        return string
    };
    
    
    
    
    console.log("babad", longestPalindrome("babad"));
    console.log("cbbd", longestPalindrome("cbbd"));
    
    let str1 = "civilwartestingwhetherthatnaptionoranynartionsoconceivedandsodedicatedcanlongendureWeareqmetonagreatbattlefiemldoftzhatwarWehavecometodedicpateaportionofthatfieldasafinalrestingplaceforthosewhoheregavetheirlivesthatthatnationmightliveItisaltogetherfangandproperthatweshoulddothisButinalargersensewecannotdedicatewecannotconsecratewecannothallowthisgroundThebravelmenlivinganddeadwhostruggledherehaveconsecrateditfaraboveourpoorponwertoaddordetractTgheworldadswfilllittlenotlenorlongrememberwhatwesayherebutitcanneverforgetwhattheydidhereItisforusthelivingrathertobededicatedheretotheulnfinishedworkwhichtheywhofoughtherehavethusfarsonoblyadvancedItisratherforustobeherededicatedtothegreattdafskremainingbeforeusthatfromthesehonoreddeadwetakeincreaseddevotiontothatcauseforwhichtheygavethelastpfullmeasureofdevotionthatweherehighlyresolvethatthesedeadshallnothavediedinvainthatthisnationunsderGodshallhaveanewbirthoffreedomandthatgovernmentofthepeoplebythepeopleforthepeopleshallnotperishfromtheearth";
    //
    console.log(str1, longestPalindrome(str1));
    
};