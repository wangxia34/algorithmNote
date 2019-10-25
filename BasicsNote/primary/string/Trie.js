
/*
实现一个 Trie (前缀树)，包含 insert, search, 和 startsWith 这三个操作。

示例:
Trie trie = new Trie();

trie.insert("apple");
trie.search("apple");   // 返回 true
trie.search("app");     // 返回 false
trie.startsWith("app"); // 返回 true
trie.insert("app");
trie.search("app");     // 返回 true

说明:
你可以假设所有的输入都是由小写字母 a-z 构成的。
保证所有输入均为非空字符串。
 */

// 个人完成的代码对前缀树概念理解错误
// 使用es6 class
// 前缀树的概念理解
class Trie {
    insert(g) {
        [...g].reduce((p, w) => p[w] || (p[w] = {}), this).$ = true
    }
    search(g, o = this) {
        for (const w of g) if (!(o = o[w])) return false;
        return !!o.$
    }
    startsWith(g, o = this) {
        for (const w of g) if (!(o = o[w])) return false;
        return true
    }
}


let trie = new Trie();

trie.insert("apple");
console.log(trie.search("apple"));   // 返回 true
console.log(trie.search("app"));     // 返回 false
console.log(trie.startsWith("app")); // 返回 true
trie.insert("app");
console.log(trie.search("app"));     // 返回 true