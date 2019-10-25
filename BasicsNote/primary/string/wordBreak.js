window.onload = function (ev) {
    
    
    /*
        给定一个非空字符串 s 和一个包含非空单词列表的字典 wordDict，判定 s 是否可以被空格拆分为一个或多个在字典中出现的单词。
        
        说明：
        拆分时可以重复使用字典中的单词。
        你可以假设字典中没有重复的单词。
        
        示例 1：
        输入: s = "leetcode", wordDict = ["leet", "code"]
        输出: true
        解释: 返回 true 因为 "leetcode" 可以被拆分成 "leet code"。
        
        
        示例 2：
        输入: s = "applepenapple", wordDict = ["apple", "pen"]
        输出: true
        解释: 返回 true 因为 "applepenapple" 可以被拆分成 "apple pen apple"。
             注意你可以重复使用字典中的单词。
        
        
        示例 3：
        输入: s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]
        输出: false
    
     */
    
    
    
    
    function wordBreak1(s, wordDict) {
        let flag = false;
        
        for (let i = 0; i < wordDict.length; i++) {
            if (s.includes(wordDict[i])) {
                let sArr = s.split(wordDict[i]).filter(value => value);
                if (sArr.length < 1) {
                    return true
                }
                let flag1 = true;
                for (let j = 0; j < sArr.length; j++) {
                    flag1 = flag1 && wordBreak1(sArr[j], wordDict.filter(value => {return value !== wordDict[i]}));
                    if (!flag1) break
                }
                let flag = flag1;
                if (flag) {return flag}
            }
        }
        
        return flag
    }
    
    function wordBreak2(s, wordDict) {
        let result = [];
        result[0] = true;
        for (let i = 1; i < s.length + 1; i++) {
            for (let j = 0; j < i; j++) {
                if (result[j] && wordDict.includes(s.slice(j, i))) {
                    result[i] = true;
                    break
                }
            }
        }
        
        return result[s.length] || false
    }
    
    
    function wordBreak3(s, wordDict) {
        const visited = new Array(s.length).fill(false);
        return dfs(s, 0, wordDict, visited);
    }
    
    function dfs(s, index, wordDict, visited) {
        if (visited[index]) {
            return false;
        }
        const str = s.slice(index);
        for (let i = 0; i <= wordDict.length - 1; i++) {
            const word = wordDict[i];
            if (str.indexOf(word) === 0) {
                
                const restStr = str.slice(word.length);
                
                if (restStr.length === 0) {
                    return true;
                }
                
                const r = dfs(s, index + word.length, wordDict, visited);
                
                if (r) {
                    return true;
                }
            }
        }
        visited[index] = true;
        return false;
    }
    
    
    function wordBreak(s, wordDict) {
        const cache = {};
    
        const _wordBreak = function(d) {
            if(d === s.length) return true;
            if(cache[d]) return false;
        
            for (const word of wordDict) {
                if(s.startsWith(word, d)){
                    if(_wordBreak(d + word.length)) return true;
                    cache[d + word.length] = true;
                }
            }
        
            return false;
        };
    
        return _wordBreak(0)
    }
    
    let s1 = "leetcode", wordDict1 = ["leet", "code"];
    let s2 = "applepenapple", wordDict2 = ["apple", "pen"];
    let s3 = "catsandog", wordDict3 = ["cats", "dog", "sand", "and", "cat"];
    let s4 = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        wordDict4 = ["a","aa","aaa","aaaa","aaaaa","aaaaaa","aaaaaaa","aaaaaaaa","aaaaaaaaa","aaaaaaaaaa"];
    
    console.log(s1, wordDict1, wordBreak(s1, wordDict1));
    console.log(s2, wordDict2, wordBreak(s2, wordDict2));
    console.log(s3, wordDict3, wordBreak(s3, wordDict3));
    console.log(s4, wordDict4, wordBreak(s4, wordDict4));
};