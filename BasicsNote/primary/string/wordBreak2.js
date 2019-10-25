window.onload = function (ev) {
    
    /*
        给定一个非空字符串 s 和一个包含非空单词列表的字典 wordDict，在字符串中增加空格来构建一个句子，
        使得句子中所有的单词都在词典中。返回所有这些可能的句子。

        说明：
        分隔时可以重复使用字典中的单词。
        你可以假设字典中没有重复的单词。
        
        示例 1：
        输入:
        s = "catsanddog"
        wordDict = ["cat", "cats", "and", "sand", "dog"]
        输出:
        [
          "cats and dog",
          "cat sand dog"
        ]
        
        
        示例 2：
        输入:
        s = "pineapplepenapple"
        wordDict = ["apple", "pen", "applepen", "pine", "pineapple"]
        输出:
        [
          "pine apple pen apple",
          "pineapple pen apple",
          "pine applepen apple"
        ]
        解释: 注意你可以重复使用字典中的单词。
        
        
        示例 3：
        输入:
        s = "catsandog"
        wordDict = ["cats", "dog", "sand", "and", "cat"]
        输出:
        []
     */
    
    
    // 暴力破解
    function wordBreak1(s, wordDict) {
        function word_Break(s, wordDict, start) {
            let res = [];
            if (start === s.length) {
                res.push("")
            }
            for (let end = start + 1; end <= s.length; end++) {
                if (wordDict.includes(s.substring(start, end))) {
                    let list = word_Break(s, wordDict, end);
                    list.forEach(value => res.push((s.substring(start, end) + " " + value).trim()))
                }
            }
            return res
        }
    
        return word_Break(s, wordDict, 0);
    }
    
    // 记忆回溯
    function wordBreak2(s, wordDict) {
        let map = new Map();
        
        function word_Break(s, wordDict, start) {
            if (map.has(start)) {
                return map.get(start)
            }
            let res = [];
            if (start === s.length) {
                res.push("")
            }
            for (let end = start + 1; end <= s.length; end++) {
                if (wordDict.includes(s.substring(start, end))) {
                    let list = word_Break(s, wordDict, end);
                    list.forEach(value => res.push((s.substring(start, end) + " " + value).trim()))
                }
            }
            map.set(start, res);
            return res
        }
        
        return word_Break(s, wordDict, 0);
    }
    
    // [最长那个通不过…… 暂未解决]
    function wordBreak(s, wordDict) {
        let dp = [],
            initial = [];
        
        initial.push("");
        dp[0] = initial;
        for (let i = 1; i <= s.length; i++) {
            let list = [];
            for (let j = 0; j < i; j++) {
                if (dp[j].length > 0 && wordDict.includes(s.substring(j, i))) {
                    dp[j].forEach(value => list.push((value + " " + s.substring(j, i)).trim()))
                }
            }
            dp[i] = list;
        }
        
        return dp[s.length]
    }
    
    
    // Code 最快
    function wordBreak4(s, wordDict) {
        var state = {};
        var wordMap = new Set(wordDict);
        var maxWordLen = 1;
    
        function check(str) {
            var word;
            var results;
            var i;
        
            if (!str) {
                return [[]];
            }
            if (state[str] === false) {
                return [];
            }
            results = [];
            for (i = 1; i <= maxWordLen; ++i) {
                if (i > str.length) {
                    break;
                }
                word = str.substr(0, i);
                if (word.length !== i) {
                    continue;
                }
                if (wordMap.has(word)) {
                    check(str.substr(word.length)).forEach((result) => {
                        results.push([word].concat(result));
                    })
                }
            }
            if (results.length === 0) {
                state[str] = false;
            }
            return results;
        }
    
        wordDict.forEach((word) => {
            if (word.length > maxWordLen) {
                maxWordLen = word.length;
            }
        });
        return check(s).map(result => result.join(' '));
    }
    
    
    let s1 = "catsanddog", wordDict1 = ["cat", "cats", "and", "sand", "dog"];
    let s2 = "pineapplepenapple", wordDict2 = ["apple", "pen", "applepen", "pine", "pineapple"];
    let s3 = "catsandog", wordDict3 = ["cats", "dog", "sand", "and", "cat"];
    let s4 = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        wordDict4 = ["a","aa","aaa","aaaa","aaaaa","aaaaaa","aaaaaaa","aaaaaaaa","aaaaaaaaa","aaaaaaaaaa"];
        
    
    console.log(s1, wordDict1, wordBreak(s1, wordDict1));
    console.log(s2, wordDict2, wordBreak(s2, wordDict2));
    console.log(s3, wordDict3, wordBreak(s3, wordDict3));
    console.log(s4, wordDict4, wordBreak(s4, wordDict4));
};