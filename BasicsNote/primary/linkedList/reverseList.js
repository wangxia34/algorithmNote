window.onload = function (ev) {
    
    // 构造简单的链表
    function ListNode(val) {
        this.val = val;
        this.next = null;
    }
    ListNode.prototype.init = function(arr){
        let header = this;
        if (arr.length === 1) {
            header.val = arr[0];
            header.next = null;
        }
        for(let i = 0; i < arr.length - 1; i++){
            header.val = arr[i];
            header.next = new ListNode(arr[i + 1]);
            header = header.next;
        }
    };
    let l1 = new ListNode(0);
    l1.init([1, 2, 3, 4, 5]);
    let l2 = new ListNode(0);
    l2.init([1]);
    
    
    
    let reverseList1 = function(head) {
        if (!head || !head.next) {return head;}
        let x = null;
        let y = null;
        let z = head;
        while(z){
            x = y;
            y = z;
            z = z.next;
            y.next = x;
        }
        return y;
    };
    
    
    let reverseList = function(head) {
        if (head == null || head.next == null) return head;
        let p = reverseList(head.next);
        head.next.next = head;
        head.next = null;
        return p;
    };
    
    
    console.log(reverseList(l1), l1);
    console.log(reverseList(l2), l2);
    
    
};