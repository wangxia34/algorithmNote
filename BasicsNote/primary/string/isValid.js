window.onload = function (ev) {
    /*
        给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。
    
        有效字符串需满足：
        左括号必须用相同类型的右括号闭合。
        左括号必须以正确的顺序闭合。
        
        注意空字符串可被认为是有效字符串。
        
        示例 1:
        输入: "()"
        输出: true
     */
    
    
    /**
     * @param {string} s
     * @return {boolean}
     */
    let isValid1 = function(s) {
        if (s.length < 1) {return true}
        if (s.length < 2) {return false}
        let arr = [], left = "({[", right = ")}]";
        
        for (let i = 0; i < s.length; i++) {
            if (arr.length < 1) {
                if (left.includes(s[i])) {arr.push(s[i])}
                else {return false}
            } else {
                if (left.includes(s[i])) {arr.push(s[i])}
                else if (right.indexOf(s[i]) === left.indexOf(arr[arr.length - 1])) {
                    arr.pop()
                } else {return false}
            }
        }
        return arr.length < 1
    };
    
    let isValid2 = function(s) {
        let rightSymbols = [];
        for (let i = 0; i < s.length; i++) {
            if (s[i] === '(') {
                rightSymbols.push(')');
            } else if (s[i] === '[') {
                rightSymbols.push(']');
            } else if (s[i] === '{') {
                rightSymbols.push('}');
            } else if (rightSymbols.pop() !== s[i]) {
                return false;
            }
        }
        return !rightSymbols.length;
    };
    
    const map = {
        '(': ')',
        '{': '}',
        '[': ']'
    };
    
    let isValid = function (s) {
        if (s.length === 0) return true;
        const stack = [];
        
        for (let i = 0; i < s.length; i++) {
            const a = s[i];
            const b = stack[stack.length - 1];
            
            if (map[a]) {
                stack.push(a)
            } else {
                if (map[b] !== a) return false;
                stack.pop()
            }
        }
        
        return stack.length === 0
    };
    
    let s1 = "()";
    let s2 = "()[]{}";
    let s3 = "(]";
    let s4 = "([)]";
    let s5 = "{[]}";
    console.log(s1, isValid(s1));
    console.log(s2, isValid(s2));
    console.log(s3, isValid(s3));
    console.log(s4, isValid(s4));
    console.log(s5, isValid(s5));
    
};