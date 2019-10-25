window.onload = function (ev) {
    
    
    /*
        给定一个字符串 s，将 s 分割成一些子串，使每个子串都是回文串。
    
        返回 s 所有可能的分割方案。
        
        示例:
        输入: "aab"
        输出:
        [
          ["aa","b"],
          ["a","a","b"]
        ]
     */
    function pd(str){
        let start=0,
            end=str.length-1;
        while(start<=end){
            if(str[start]!==str[end])
                return false;
            start+=1;
            end-=1;
        }
        return true;
    }
    
    // 暴力破解法
    function partition1(s) {
        if(s.length===0)
            return [[]];
        let res=[[s[0]]];
        for(let i=1;i<s.length;i++){
            let len=res.length;
            for(let ii=0;ii<len;ii++){
                let currentS = res[ii][res[ii].length-1];
                if(pd(currentS)){
                    res.push([...res[ii],s[i]])
                }
                res[ii][res[ii].length-1] += s[i]
            }
        }
        return res.filter(function(a){
            if(a[a.length-1].length===1)
                return true;
            return pd(a[a.length-1]);
        });
        
    }
    
    // 递归算法
    function partition2(s) {
        if (s.length === 0) {
            return [[]];
        }
        if (s.length === 1) {
            return [[s[0]]];
        }
        const results = [];
        for (let i = 0; i < s.length; i++) {
            if (pd(s.slice(0, i + 1))) {
                const pre = s.slice(0, i + 1);
                const afterResults = partition(s.slice(i + 1));
                for (const after of afterResults) {
                    after.unshift(pre);
                    results.push(after);
                }
            }
        }
        return results;
    }
    
    
    function partition3(s) {
        const res = [];
        const buffer = [];
        function generate(lastIndex, curIndex) {
            if (lastIndex === s.length) {
                res.push(buffer.slice());
                return;
            }
            if (curIndex > s.length) return;
            if (check(lastIndex, curIndex - 1)) {
                buffer.push(s.slice(lastIndex, curIndex));
                generate(curIndex, curIndex + 1);
                buffer.pop();
            }
            generate(lastIndex, curIndex + 1);
        }
        function check (i,j) {
            for(;i<j;) {
                if (s[i] !== s[j]) {
                    return false;
                }
                i++;
                j--;
            }
            return true;
        }
        generate(0, 1);
        return res;
    }
    
    function partition(s) {
        const len = s.length;
        const result = [];
        function backtracking(list, index) {
            if (index === len) {
                result.push(list);
                return
            }
            for (let i = index + 1; i <= len; i++) {
                if (isReversed(index, i - 1)) {
                    backtracking([...list, i], i)
                }
            }
        }
        backtracking([], 0);
        // 保存的是分割线的位置，这里将其转化为对应分割后的字符串
        for (let i = 0; i < result.length; i++) {
            result[i] = result[i].map((v,i,a) => s.slice(i === 0 ? 0 : a[i - 1], v))
        }
        return result;
    
        // 判断是否回文字符串
        function isReversed(start, end) {
            if (start === end) return true;
            while (start < end) {
                if (s[start] !== s[end]) return false;
                start++;
                end--
            }
            return true
        }
    }
    
    
    console.log("aab", partition("aab"));
    console.log("aabb", partition("aabb"));
    
    
};