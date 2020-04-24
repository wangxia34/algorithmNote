window.onload = function (ev) {
    
    /*
        给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。
        
        示例 1:
        输入: "abcabcbb"
        输出: 3
        解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
        
        
        示例 2:
        输入: "bbbbb"
        输出: 1
        解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
        
        
        示例 3:
        输入: "pwwkew"
        输出: 3
        解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
             请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
     */
    
    
    /**
     * @param {string} s
     * @return {number}
     */
    let lengthOfLongestSubstring1 = function(s) {
        if (s.length < 1) return 0;
        let max = 1, i = 0, j = 1, len = s.length;
        
        while (i < len && j < len + 1) {
            let str = s.substring(i, j);
            if (str.includes(s[j])) {
                max = Math.max(max, j - i);
                i++;
                j = i + 1
            } else {
                if (j === len) {max = Math.max(max, j - i);}
                j++
            }
        }
        
        return max
    };
    
    /**
     * @param {string} s
     * @return {number}
     */
    let lengthOfLongestSubstring2 = function(s) {
        let num = 0,
            res = 0;
        let m = "";
        for (let n of s) {
            if (m.indexOf(n) === -1) {
                m += n;
                num++;
                res = res < num ? num : res;
            } else {
                m += n;
                m = m.slice(m.indexOf(n) + 1); // 从重复处截断
                num = m.length;
            }
        }
        return res;
    };
    
    /**
     * @param {string} s
     * @return {number}
     */
    let lengthOfLongestSubstring = function(s) {
        let globalMax = 0;
        let queue = [];
        for(let char of s) {
            if(queue.indexOf(char) !== -1) {
                queue = queue.slice(queue.indexOf(char) + 1)
            }
            queue.push(char);
            globalMax = Math.max(globalMax, queue.length)
        }
        return globalMax
    };
    
    
    
    console.log("abcabcbb", lengthOfLongestSubstring("abcabcbb"));
    console.log("bbbbb", lengthOfLongestSubstring("bbbbb"));
    console.log("pwwkew", lengthOfLongestSubstring("pwwkew"));
    console.log("au", lengthOfLongestSubstring("au"));
};