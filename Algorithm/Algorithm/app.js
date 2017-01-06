var Greeter = (function () {
    function Greeter(element) {
        this.element = element;
        this.span = document.createElement('span');
        this.element.appendChild(this.span);
        this.init();
    }
    Greeter.prototype.init = function () {
        var a = [10, 7, 9, 23, 13, 5, 2, 10, 19, 20];
        var l = new LinkList.SingleLinkList(a);
        var enter = '\r\n';
        this.span.innerText += '初始：' + l + ' 头节点：' + l.getStartNode() + ' 尾节点：' + l.getLastNode() + enter;
        this.span.innerText += '排序：' + l.sort() + ' 头节点：' + l.getStartNode() + ' 尾节点：' + l.getLastNode() + enter;
        this.span.innerText += '倒序：' + l.reverse() + ' 头节点：' + l.getStartNode() + ' 尾节点：' + l.getLastNode() + enter;
        this.span.innerText += '长度：' + l.size() + enter;
        this.span.innerText += '找13的前驱节点：' + l.find(13) + ' 头节点：' + l.getStartNode() + ' 尾节点：' + l.getLastNode() + enter;
        this.span.innerText += '删除23：' + l.delete(23) + ' 头节点：' + l.getStartNode() + ' 尾节点：' + l.getLastNode() + enter;
        this.span.innerText += '长度：' + l.size() + enter;
        this.span.innerText += '在链尾添加23：' + l.insertAfter(23) + ' 头节点：' + l.getStartNode() + ' 尾节点：' + l.getLastNode() + enter;
        this.span.innerText += '长度：' + l.size() + enter;
        this.span.innerText += '在链头添加14：' + l.insertBefore(14) + ' 头节点：' + l.getStartNode() + ' 尾节点：' + l.getLastNode() + enter;
        this.span.innerText += '长度：' + l.size() + enter;
        this.span.innerText += '按顺序插入1：' + l.insertWithSort(1) + ' 头节点：' + l.getStartNode() + ' 尾节点：' + l.getLastNode() + enter;
        this.span.innerText += '长度：' + l.size() + enter;
        this.span.innerText += '按顺序插入25：' + l.insertWithSort(25) + ' 头节点：' + l.getStartNode() + ' 尾节点：' + l.getLastNode() + enter;
        this.span.innerText += '长度：' + l.size() + enter;
    };
    return Greeter;
}());
var LinkList;
(function (LinkList) {
    var SingleLinkList = (function () {
        function SingleLinkList(array) {
            if (!array || array.length == 0) {
                return;
            }
            this.lastNode = new LinkNode(array[array.length - 1], null);
            var last = this.lastNode;
            for (var i = array.length - 2; i > -1; i--) {
                var c = new LinkNode(array[i], last);
                last = c;
            }
            this.startNode = new LinkNode(null, last);
        }
        SingleLinkList.prototype.getStartNode = function () {
            return this.startNode.next;
        };
        SingleLinkList.prototype.getLastNode = function () {
            return this.lastNode;
        };
        //排序
        SingleLinkList.prototype.sort = function () {
            var p1 = this.startNode;
            var start = p1.next;
            while (start != null) {
                var p2 = start;
                var next = start.next;
                while (next != null) {
                    if (start.data > next.data) {
                        p1.next = next;
                        p2.next = start;
                        var temp = start.next;
                        start.next = next.next;
                        next.next = temp;
                        var temp2 = next;
                        next = start;
                        start = temp2;
                    }
                    p2 = next;
                    next = next.next;
                }
                p1 = start;
                start = start.next;
            }
            this.lastNode = p1;
            return this;
        };
        //倒序
        SingleLinkList.prototype.reverse = function () {
            var headNode = this.startNode;
            var start = this.startNode.next;
            headNode.next = null;
            this.lastNode = start;
            while (start != null) {
                var next = start.next;
                var reversedNext = headNode.next;
                start.next = reversedNext;
                headNode.next = start;
                start = next;
            }
            this.startNode = headNode;
            return this;
        };
        //长度
        SingleLinkList.prototype.size = function () {
            var num = 0, start = this.startNode.next;
            while (start != null) {
                num++;
                start = start.next;
            }
            return num;
        };
        //找到值为value的直接前驱节点
        SingleLinkList.prototype.find = function (value) {
            var start = this.startNode;
            while (start != null) {
                if (start.next.data == value) {
                    return start;
                }
                start = start.next;
            }
            return new LinkNode('not Found', null);
        };
        //返回链表值字符串
        SingleLinkList.prototype.toString = function () {
            var s = [];
            var start = this.startNode.next;
            while (start != null) {
                s.push(start.data);
                start = start.next;
            }
            return s.join(',');
        };
        //删除值为value的节点
        SingleLinkList.prototype.delete = function (value) {
            var p = this.startNode, s = p.next;
            while (s != null) {
                if (s.data == value) {
                    if (s == this.lastNode) {
                        this.lastNode = p;
                    }
                    p.next = s.next;
                    s = s.next;
                }
                else {
                    p = s;
                    s = s.next;
                }
            }
            return this;
        };
        //删除大于min小于max的节点
        SingleLinkList.prototype.deleteBetween = function (min, max) {
            var p = this.startNode, s = p.next;
            while (s != null) {
                if (s.data > min && s.data < max) {
                    if (s == this.lastNode) {
                        this.lastNode = p;
                    }
                    p.next = s.next;
                    s = s.next;
                }
                else {
                    p = s;
                    s = s.next;
                }
            }
            return this;
        };
        //删除重复的节点
        SingleLinkList.prototype.removeDuplite = function () {
            return this;
        };
        //在链尾插入节点
        SingleLinkList.prototype.insertAfter = function (value) {
            this.lastNode.next = new LinkNode(value, null);
            this.lastNode = this.lastNode.next;
            return this;
        };
        //在链头插入节点
        SingleLinkList.prototype.insertBefore = function (value) {
            var sNext = this.startNode.next, newNode = new LinkNode(value, sNext);
            this.startNode.next = newNode;
            return this;
        };
        //按顺序插入节点
        SingleLinkList.prototype.insertWithSort = function (value) {
            this.sort();
            var isInsert = false, p = this.getStartNode(), s = p.next;
            if (value <= p.data) {
                return this.insertBefore(value);
            }
            while (s != null) {
                if (value <= s.data) {
                    var newNode = new LinkNode(value, s);
                    p.next = newNode;
                    isInsert = true;
                    break;
                }
                p = s;
                s = p.next;
            }
            if (!isInsert) {
                return this.insertAfter(value);
            }
            return this;
        };
        return SingleLinkList;
    }());
    LinkList.SingleLinkList = SingleLinkList;
    var LinkNode = (function () {
        function LinkNode(data, next) {
            this.next = next;
            this.data = data;
        }
        LinkNode.prototype.toString = function () {
            return this.data;
        };
        return LinkNode;
    }());
})(LinkList || (LinkList = {}));
window.onload = function () {
    var el = document.getElementById('content');
    var greeter = new Greeter(el);
};
//# sourceMappingURL=app.js.map