window.onload = function (ev) {

    // 测试用例
    let arr1 = [
        ["5","3",".",".","7",".",".",".","."],
        ["6",".",".","1","9","5",".",".","."],
        [".","9","8",".",".",".",".","6","."],
        ["8",".",".",".","6",".",".",".","3"],
        ["4",".",".","8",".","3",".",".","1"],
        ["7",".",".",".","2",".",".",".","6"],
        [".","6",".",".",".",".","2","8","."],
        [".",".",".","4","1","9",".",".","5"],
        [".",".",".",".","8",".",".","7","9"]
    ];
    let arr2 = [
        ["8","3",".",".","7",".",".",".","."],
        ["6",".",".","1","9","5",".",".","."],
        [".","9","8",".",".",".",".","6","."],
        ["8",".",".",".","6",".",".",".","3"],
        ["4",".",".","8",".","3",".",".","1"],
        ["7",".",".",".","2",".",".",".","6"],
        [".","6",".",".",".",".","2","8","."],
        [".",".",".","4","1","9",".",".","5"],
        [".",".",".",".","8",".",".","7","9"]
    ];
    
    let arr3 = [
        ["5","3",".",".","7",".",".",".","."],
        ["6",".",".","1","9","5",".",".","."],
        [".","9","8",".",".",".",".","6","."],
        ["8",".",".",".","6",".",".",".","3"],
        ["4",".",".","8",".","3",".",".","1"],
        ["7",".",".",".","2",".",".",".","6"],
        [".","6",".",".",".",".","2","8","."],
        [".",".",".","4","1","9",".",".","5"],
        [".",".",".",".","8",".",".","7","9"]
    ];
    
    
    function isValidSudoku1(arr) {
        let obj = {};
        
        function has(name, num) {
            if (obj[name]) {
                if (obj[name].has(num)) {
                    return false;
                } else {
                    obj[name].add(num);
                }
            } else {
                obj[name] = new Set(num);
            }
            return true;
        }
        
        function xHas(i, num) {
            let name = "x-" + i;
            return has(name, num);
        }
        
        function yHas(j, num) {
            let name = "y-" + j;
            return has(name, num);
        }
    
        function x3Has(i, j, num) {
            let name = Math.floor(i / 3) + "-" + Math.floor(j / 3);
            return has(name, num);
        }
        
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (arr[i][j] !== ".") {
                    if (!xHas(i, arr[i][j]) || !yHas(j, arr[i][j]) || !x3Has(i, j, arr[i][j])) {
                        return false;
                    }
                }
            }
        }
        
        return true;
    }
    
    let isValidSudoku = function(board) {
        let map = {};
        for (let i = 0; i < 9; i ++) {
            for (let j = 0; j < 9; j++) {
                if (board[i][j] !== '.' && map[board[i][j]] === true) {
                    return false;
                }
                map[board[i][j]] = true;
            }
            map = {};
        }
        for (let i = 0; i < 9; i ++) {
            for (let j = 0; j < 9; j++) {
                if (board[j][i] !== '.' && map[board[j][i]] === true) {
                    return false;
                }
                map[board[j][i]] = true;
            }
            map = {};
        }
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                for (let x = 0; x < 3; x++) {
                    for (let y = 0; y < 3; y++) {
                        if (board[i * 3 + x][j * 3 + y] !== '.' && map[board[i * 3 + x][j * 3 + y] ] === true) {
                            return false;
                        }
                        map[board[i * 3 + x][j * 3 + y] ] = true;
                    }
                }
                map = {};
            }
        }
        return true;
    };
    
    
    let isValidSudoku3 = function(board) {
        const map=[[],[],[],[],[],[],[],[],[],[]];
        for (let rowId = 0; rowId < board.length; rowId++) {
            const row = board[rowId];
            for (let colId = 0; colId < row.length; colId++) {
                const val = row[colId] === '.' ? null : row[colId];
                if (val) {
                    const tmp = [rowId, colId, Math.floor(rowId / 3) * 3 + Math.floor(colId / 3)];
                    if (!map[val]) {
                        map[val] = [tmp]
                    } else {
                        for (let i = 0; i < map[val].length; i++) {
                            if (map[val][i][0] === tmp[0] || map[val][i][1] === tmp[1] || map[val][i][2]===tmp[2]) {
                                return false;
                            }
                        }
                        map[val].push(tmp)
                    }
                    
                }
            }
        }
        return true;
    };
    
    let isValidSudoku4 = function (board) {
        let row = {};
        let col = {};
        let box = {};
        for (let i = 0; i < 9; ++i) {
            for (let j = 0; j < 9; ++j) {
                if (board[i][j] !== '.') {
                    let c = board[i][j] + '';
                    let key = (~~(i/3)*3 + ~~(j/3)) + '' + c;
                    if (row[i+c] || col[c+j] || box[key]) return false;
                    row[i+c] = true;
                    col[c+j] = true;
                    box[key] = true;
                }
            }
        }
        return true;
    };
    
    console.log(isValidSudoku(arr1));
    console.log(isValidSudoku(arr2));
    console.log(isValidSudoku(arr3));
    
    
};