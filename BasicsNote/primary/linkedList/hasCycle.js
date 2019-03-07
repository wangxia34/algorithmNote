window.onload = function (ev) {
    
    
    // 构造简单的链表
    function ListNode(val) {
        this.val = val;
        this.next = null;
    }
    ListNode.prototype.getListNode = function(pos){
        let header = this;
        
        if (pos < 0) {
            return null;
        }
        
        while (pos > 0 && header) {
            header = header.next;
            pos--;
        }
        
        return header;
    };
    ListNode.prototype.init = function(arr, pos){
        let header = this;
        if (arr.length === 1) {
            header.val = arr[0];
            header.next = null;
        }
        for(let i = 0; i < arr.length - 1; i++){
            header.val = arr[i];
            header.next = new ListNode(arr[i + 1]);
            header = header.next;
            if (i === arr.length - 2 && pos) {
                header.next = this.getListNode(pos);
            }
        }
    };
    let l1 = new ListNode(0);
    l1.init([1, 2], -1);
    let l2 = new ListNode(0);
    l2.init([1, 2, 3, 2, 1], 2);
    
    
    
    
    function hasCycle1(head) {
        if (!head) {return false;}
        let list1 = head;
        let arrList = [];
        
        while (list1) {
            arrList.push(list1);
            for (let i = 0; i < arrList.length; i++) {
                if (list1.next === arrList[i]) {
                    return true;
                }
            }
            list1 = list1.next;
        }
        
        return false;
    }
    
    
    function hasCycle1(head) {
        if (head === null || head.next === null) {
            return false;
        }
        let slow = head;
        let fast = head;
    
        while (fast !== null && fast.next !== null) {
            fast = fast.next.next;
            slow = slow.next;
            if (slow === fast) {
                return true;
            }
        }
    
        return false;
    }
    
    
   
    
    function hasCycle(head) {
        let current = head, list = new Set();
        while (current != null) {
            if (list.has(current)) return true;
            list.add(current);
            current = current.next;
        }
        return false;
    }
    
    
    
    console.log(hasCycle(l1));
    console.log(hasCycle(l2));
    
    
};