window.onload = function (ev) {
    
    /*
     *function ListNode(val) {
     *    this.val = val;
     *    this.next = null;
     *}
     */
    
    // 链表在js中的表现形式
    let head = {
        'val': 1,
        'next': {
            'val': 2,
            'next': {
                'val': 3,
                'next': {
                    'val': 4,
                    'next': {
                        'val': 5,
                        'next': null
                    }
                }
            }
        }
    };
    
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
    l1.init([1, 2, 3]);
    
    
    function deleteNode(node) {
        node.val = node.next.val;
        node.next = node.next.next;
    }
    
    deleteNode(l1.next);
    console.log(l1);
    
    
    
    
    
};