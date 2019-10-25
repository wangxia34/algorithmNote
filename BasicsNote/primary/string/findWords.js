window.onload = function (ev) {

    /*
        给定一个二维网格 board 和一个字典中的单词列表 words，找出所有同时在二维网格和字典中出现的单词。

        单词必须按照字母顺序，通过相邻的单元格内的字母构成，其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。
        同一个单元格内的字母在一个单词中不允许被重复使用。
        
        示例:
        输入:
        words = ["oath","pea","eat","rain"] and board =
        [
          ['o','a','a','n'],
          ['e','t','a','e'],
          ['i','h','k','r'],
          ['i','f','l','v']
        ]
        
        输出: ["eat","oath"]
        
        说明:
        你可以假设所有输入都由小写字母 a-z 组成。
        
        提示:
        你需要优化回溯算法以通过更大数据量的测试。你能否早点停止回溯？
        如果当前单词不存在于所有单词的前缀中，则可以立即停止回溯。什么样的数据结构可以有效地执行这样的操作？
        散列表是否可行？为什么？ 前缀树如何？如果你想学习如何实现一个基本的前缀树，请先查看这个问题： 实现Trie（前缀树）。
     */
    
    // 前缀树
    class Trie {
        insert(g) {
            [...g].reduce((p, w) => p[w] || (p[w] = {}), this).$ = g
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
 
    
    function findWords(board, words) {
        let wordTrie = new Trie();
        words.forEach(value => wordTrie.insert(value));
        
        let resultSet = new Set(),
            m = board.length,
            n = board[0].length,
            visited = [];
        for (let i = 0; i < m; i++) {
            visited[i] = []
        }
        
        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                search(i, j, wordTrie)
            }
        }
        
        function search(i, j, trie) {
            if (i < 0 || j < 0 || i >= m || j >= n || visited[i][j]) {
                return
            }
            
            let node = trie[board[i][j]];
            if (!node) {
                return
            }
            if (node.$) {
                resultSet.add(node.$)
            }
            visited[i][j] = true;
            search(i-1, j, node);
            search(i+1, j, node);
            search(i, j-1, node);
            search(i, j+1, node);
            visited[i][j] = false;
        }
        
        return [...resultSet]
    }
    
    
    let words1 = ["oath","pea","eat","rain"], board1 =
        [
            ['o','a','a','n'],
            ['e','t','a','e'],
            ['i','h','k','r'],
            ['i','f','l','v']
        ],
        words2 = ["oath","pea","eat","rain", "oao"], board2 =
            [
                ['o','a','a','n'],
                ['e','t','a','e'],
                ['i','h','k','r'],
                ['i','f','l','v']
            ];
    
    console.log(words1, board1, findWords(board1, words1));
    console.log(words2, board2, findWords(board2, words2))
};