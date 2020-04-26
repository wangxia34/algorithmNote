/*
    let tablePanel = null,
        option = {
            // 放置的父级ID
            fatherId: "targetDetails",
            // 面板名称[保证唯一性]
            name: "targetDetails",
            // 是否存在子面板，即点开openChild出现详情面板[默认：false]
            hasChild: true,
            // 子面板内容 [index——序号；data——该行数据]
            childRender: function (index, data) {
                return `<div class="panel-content-secretCommunication">
                            <div class="child-table-panel-div" id="target_child_${index}"></div>
                        </div>`;
            },
            // 点击openChild触发的方法 [index——序号；data——该行数据]
            clickOpen: function (index, data) {
                let option = {
                    fatherId: "target_child_" + index,
                    name: "targetChildTable" + index,
                    // 设置table的尺寸样式
                    size: "child",
                    // 设置最多展示多少行
                    lineNum: 5,
                    // 是否存在翻页
                    hasPage: true,
                    header: [
                        {
                            type: "index",
                            title: "序号",
                            name: "index",
                            align: "center",
                            width: "5%"
                        },
                        {
                            type: "text",
                            title: "事件",
                            name: "eventName",
                            width: "35%"
                        },
                        {
                            type: "text",
                            title: "C&C服务器数",
                            name: "CNCServerCount",
                            width: "10%"
                        },
                        {
                            type: "text",
                            title: "C&C服务器所属地区",
                            name: "location",
                            width: "15%"
                        },
                        {
                            type: "text",
                            title: "日志数",
                            name: "count",
                            width: "10%"
                        },
                        {
                            type: "text",
                            title: "最近检测时间",
                            name: "latestDatetime",
                            width: "25%"
                        }
                    ],
                };
                let Panel = SATable.create(option);
                Panel.render();
                Panel.update(data.details);
            },
            // 处理数据之后再展示[render——数据处理；filter——过滤数据时该字段的数据]
            render: {
                "classifications": {
                    render: function (text) {
                        let desc = "";
                        for (let i = 0; i < text.length; i++) {
                            desc += text[i].name + "(" + text[i].value + ")；"
                        }
                        return desc;
                    }
                },
                "count": {
                    render: function (text, data) {
                        let strData = JSON.stringify(data);
                        return `<span class="query-event" onclick='clickDTarget(${strData});'>${text}</span>`
                    },
                    filter: function (text) {
                        return text;
                    }
                }
            },
            // 头部及对应的字段
            header: [
                {
                    type: "openChild",
                    name: "openChild",
                    align: "center",
                    width: "5%",
                },
                {
                    type: "index",       // 类型[目前已有：index——序号；text——文字信息；openChild——打开childTr]
                    title: "序号",       // 该字段表头
                    name: "index",      // 该字段名称
                    align: "center",    // 对齐方式[默认：left;  已有：center——居中]
                    width: "5%"         // 所占百分比
                },
                {
                    type: "text",
                    title: "攻击者IP",
                    name: "attacker",
                    width: "15%"
                },
                {
                    type: "text",
                    title: "攻击者类型",
                    name: "attackerType",
                    width: "10%"
                },
                {
                    type: "text",
                    title: "资产名称",
                    name: "assetName",
                    width: "10%"
                },
                {
                    type: "text",
                    title: "所属单位",
                    name: "department",
                    width: "10%"
                },
                {
                    type: "text",
                    title: "被攻击者数",
                    name: "targetCount",
                    width: "10%"
                },
                {
                    type: "text",
                    title: "攻击类型",
                    name: "classifications",
                    width: "25%"
                },
                {
                    type: "text",
                    title: "日志数",
                    name: "count",
                    align: "center",
                    width: "10%"
                }
            ],
        },
        data = [
            {
                "attacker": "95.215.186.129",
                "attackerType": "服务器",
                "assetName": "资产名称",
                "location": "荷兰",
                "countryName": "netherlands",
                "target": "200.200.12.34",
                "targetCount": "10",
                "department": "总部",
                "classifications": [{
                    "name": "FTP漏洞攻击",
                    "value": 217
                }],
                "timeRange": {
                    "start": "2018-09-11 06:09:06",
                    "end": "2018-09-11 06:10:02"
                },
                "count": 392
            }
        ];
    
    tablePanel = SATable.create(option);
    tablePanel.render();
    
    // 1、加载数据到table
    tablePanel.update(data);
    
    // 2、按规则过滤数据并懒加载方式加载数据
    let check = [
         {name: "victimType", value: "终端"},
         {name: "department", value: "单位", fullMatch: true},
         {name: "weight", value: "核心", fullMatch: true}
    ];
    tablePanel.filterData(check, "关键字", data);
    // 获得按规则过滤数据的条数
    number = tablePanel.getFilterDataNum(check, "关键字"));

 */

class SATable {
    constructor(option) {
        this.initData(option);
        // this.render()
    }

    initData(option) {
        let DTable = this;
        DTable.option = option;
        DTable.class = {
            thead: "table-panel-thead",
            thead_td: "table-panel-thead-td",
            td: "table-panel-td",
            center: "table-panel-td-center",
            tbody: "table-panel-tbody",
            tbody_tr: "table-panel-tbody-tr",
            tbody_tr_child: "table-child",
            td_openChild: "table-panel-td-openChild",
            td_openChild_input: "table-panel-td-openChild-input",
            td_checkbox: "table-panel-td-checkbox",
            td_checkbox_input: "table-panel-td-checkbox-input",
            action_image: "action-image",
            action_text: "iconTag-box"
        };
        DTable.id = {
            table: "table_panel_table_" + option.name,
            tbody: "table_panel_tbody_" + option.name,
            checkboxName: "checkbox_" + option.name,
            checkboxAllName: "checkbox_all_" + option.name
        };
    
        // table表单存在翻页工具
        if (typeof option.hasPage === "boolean" && option.hasPage ||
            typeof option.hasPage === "object" && option.hasPage.show) {
            DTable.initPage()
        }
        
    
        DTable.initStyle();
        
        DTable.detail_data = [];
    }
    
    initPage() {
        let DTable = this,
            option = DTable.option;
        
        DTable.page = {
            lineNum: option.lineNum ? option.lineNum : 0,
            current: 1,
            total: 0,
            totalPage: 1
        };
    
        $.extend(DTable.class, {
            page_tool: "table-page-tool",
            page_div: "table-page-div",
            page_text: "table-page-text",
            page_action: "table-page-action",
            page_icon: "table-page-icon",
            disable_icon: "disable-icon"
        });
    
        $.extend(DTable.id, {
            pageTotal: "pageTotal_" + option.name,
            pageCurrent: "pageCurrent_" + option.name,
            firstPage: "firstPage_" + option.name,
            lastPage: "lastPage_" + option.name,
            nextPage: "nextPage_" + option.name,
            endPage: "endPage_" + option.name,
            lineNumPage: "lineNumPage_" + option.name
        })
    }
    
    initStyle() {
        let DTable = this,
            option = DTable.option;
        
        // table表单的样式和尺寸[自定义css][已存在值："small"、"child"]
        if (option.size) {
            $.extend(DTable.class, {
                thead_td: "table-panel-thead-td-" + option.size,
                tbody_tr: "table-panel-tbody-tr-" + option.size,
                page_tool: "table-page-tool-" + option.size,
                td: "table-panel-td-" + option.size,
            });
        }
    
        if (option.tdHeight) {
            $.extend(DTable.class, {
                tbody_tr_height: "table-panel-tbody-tr-" + option.tdHeight,
            });
        }
    }
    
    /*
        function: 加载表头，创建table表单
     */
    render() {
        this.createTable();
    
        this.addListener()
    }
    
    /*
        function: 加载数据
        @param data 该次加载的数据
     */
    update(data, load = false) {
        let DTable = this,
            DId = DTable.id,
            option = DTable.option,
            tableBody = "",
            length = option.lineNum ? option.lineNum : data.length,
            tbodyDom = $("#" + DId.tbody);
        
        DTable.data = data;
    
        if (option.hasPage) {
            let page = DTable.page;
            if (!load) {page.total = data.length}
        
            if (page.lineNum === "all") {
                page.totalPage = 1
            } else {
                page.totalPage = Math.ceil(page.total / page.lineNum);
                if (page.totalPage === 0) {
                    page.totalPage = 1
                }
            }
        }
        
        if (length > 50) {
            tbodyDom.html("");
            DTable.refreshData(length, 50, function (count) {
                tableBody = "";
                for (let i = 0; i < 50; i++) {
                    let index = count * 50 + i;
                    tableBody += DTable.createTbodyTr(DTable.data[index], index + 1)
                }
    
                tbodyDom.append(tableBody);
            })
        } else {
            for (let i = 0; i < length; i++) {
                tableBody += DTable.createTbodyTr(DTable.data[i], i + 1)
            }
    
            tbodyDom.html(tableBody);
        }
        
        
        DTable.updateListener();
        if (option.hasCheckbox) {
            DTable.clearAllSelected();
        }
    }
    
    
    /*
        function: 缓慢加载【防止加载卡顿】
        @param total 渲染数据总数
        @param onceCount 一次渲染条数
        @param fn 在此处渲染数据
     */
    refreshData(total, onceCount, fn) {
        let count = 0, //初始渲染次数值
            loopCount = total / onceCount; //渲染次数
        function refreshAnimation() {
            if (count < loopCount) {
                fn(count);
                count++;
                requestAnimationFrame(refreshAnimation)
            }
        }
        requestAnimationFrame(refreshAnimation)
    }
    
    /*
        function: 以懒加载方式加载数据 [注：使用该加载方式加载数据时，option.lineNum字段无效]
        @param data 该次加载的数据
     */
    updateLan(data) {
        let DTable = this,
            DId = DTable.id,
            option = DTable.option,
            tableBody = "",
            lineNum = (DTable.option.scrollConfig && DTable.option.scrollConfig.scrollNumber) || 100,
            length;
        
        if (data) {
            data.map((value, index) => {
                value.index = (index + 1) + ""
            });
            DTable.data = data;
            DTable.nowIndex = 0
        } else {
            DTable.nowIndex++
        }
        if ((DTable.nowIndex + 1) * lineNum > DTable.data.length) {
            length = DTable.data.length - DTable.nowIndex * lineNum;
            DTable.isLoading = true
        } else {
            length = lineNum;
            DTable.isLoading = false
        }
        
        for (let i = 0; i < length; i++) {
            tableBody += DTable.createTbodyTr(DTable.data[i + DTable.nowIndex * lineNum], i + DTable.nowIndex * lineNum + 1)
        }
        
        if (data) {
            $("#" + DId.tbody).html(tableBody);
            DTable.scrollLoad()
        } else {
            $("#" + DId.tbody).append(tableBody);
        }
        
        DTable.updateListener();
        if (option.hasCheckbox) {
            DTable.setCheckboxSelected();
        }
    }
    
    
    /*
    * 每次只请求一页数据的加载数据
    */
    loadData(data, init) {
        /*
         {
            data: [],
            totalNum: 200,
            filterCheck: [],
            filterKey: ""
         }
        */
        let DTable = this,
            DId = DTable.id,
            DClass = DTable.class,
            page = DTable.page;
        
        DTable.isLoadOnePageData = true;
    
        if (typeof data.totalNum === "number") {
            page.total = data.totalNum;
            if (page.lineNum === "all") {
                page.totalPage = 1
            } else {
                page.totalPage = Math.ceil(page.total / page.lineNum);
                if (page.totalPage === 0) {
                    page.totalPage = 1
                }
            }
            DTable.setPageDisable(page.current);
        }
        
        if (init) {
            page.current = 1;
            DTable.setPageDisable(page.current);
        }
        
        data.filterCheck || (data.filterCheck = []);
        DTable.filterData(data.filterCheck, data.filterKey, data.data, true)
        // DTable.initScroll(data.data)
    }
    
    
    /*
       function: 当滚动条到了底部加载剩余数据
       [注：后期可加入滚动条存在面板id  这里默认"main_content" ]
    */
    scrollLoad() {
        let DTable = this,
            contentId = (DTable.option.scrollConfig && DTable.option.scrollConfig.scrollDom) || "main_content",
            scrollHeight = (DTable.option.scrollConfig && DTable.option.scrollConfig.scrollHeight) || 200,
            dom = document.getElementById(contentId);
        
        DTable.isLoading = false;
        dom.addEventListener("scroll", function () {
            let bottomOfWindow = dom.scrollHeight - dom.scrollTop - window.innerHeight <= scrollHeight;
            if (bottomOfWindow && DTable.isLoading === false) {
                DTable.isLoading = true;
                DTable.updateLan()
            }
        })
    }
    
    // 虚拟列表
    initScroll(data) {
        let DTable = this,
            DId = DTable.id,
            tbodyDom = $("#" + DId.tbody),
            contentId = (DTable.option.scrollConfig && DTable.option.scrollConfig.scrollDom) || "main_content",
            dom = document.getElementById(contentId);
        
        DTable.vlist = {
            locker: false,
            itemHeight: 40, //每一项的高度
            container: dom,//容器
            containerUL: tbodyDom[0], //容器内的ul
            containerHeight: document.documentElement.clientHeight,
            showItemCount: Math.ceil(document.documentElement.clientHeight / 40) + 1,//视图区域显示item的个数
            items: [],//可见列表项
            startIndex: 0,//第一个item索引
            render: DTable.createTbodyTr.bind(this),//渲染每一项的函数
            data: []//列表数据
        };
    
        //初始化数据
        if (data) {
            this.addData(data);
        }
        this.scrollEventBind = this.updateVisibleData.bind(this);
        this.vlist.container.addEventListener("scroll", this.scrollEventBind, false);
    }
    
    
    addData(data) {
        this.vlist.locker = false;
        let isInit = this.vlist.data.length === 0;
        this.vlist.data = data;
        let realHeight = parseInt(this.vlist.data.length * this.vlist.itemHeight);
        if (realHeight > this.vlist.containerHeight) {
            this.vlist.showItemCount = Math.ceil(this.vlist.containerHeight / this.vlist.itemHeight) + 1;//视图区域显示item的个数
        } else {
            this.vlist.showItemCount = this.vlist.data.length + 1;//视图区域显示item的个数
        }
        this.vlist.containerUL.style.height = realHeight + 'px';
        if (isInit) {
            this.initList();
        }
    }
    
    initList() {
        var count = this.vlist.data.length < this.vlist.showItemCount ? this.vlist.data.length : this.vlist.showItemCount;
        for (var i = 0; i < count; i++) {
            var item = this.renderItem({
                index: i
            });
            $(this.vlist.containerUL).append(item.dom);
            this.vlist.items.push(item);
        }
        
    }
    
    renderItem(item) {
        let DTable = this,
            option = DTable.option;
        var index = item.index;
        // var itemDom = item.dom ? item.dom : document.createElement("LI");
        var itemData = this.vlist.data[index];
        var top = parseInt(index * this.vlist.itemHeight);
        // itemDom.innerHTML = this.vlist.render(option.header[index], itemData, index + 1);
        // itemDom.style.position = "absolute";
        // itemDom.style.left = left + "px";
        // itemDom.style.top = 0;
        // itemDom.style.height = this.vlist.itemHeight + "px";
        // itemDom.style.width = "100%";
        // itemDom.style.overflow = "hidden";
        // item.dom = itemDom;
        item.dom = DTable.createTbodyTr(itemData, index + 1);
        // item.dom.setAttribute("index", index);
        // item.top = top;
    
        // translate3d(0, ${ start * this.vlist.itemHeight }px, 0)
        return item;
    }
    // 滚动事件
    scrollEvent() {
        var containerScrollTop = this.vlist.container.scrollTop;
        var itemHeight = this.vlist.itemHeight;
        var startIndex = this.vlist.startIndex;
        if (containerScrollTop < 0) return;//ios兼容
        var startIndexNew = Math.floor(containerScrollTop / itemHeight);
        var maxStartIndex = this.vlist.data.length - this.vlist.showItemCount + 1;
        //android手机兼容性问题
        startIndexNew = startIndexNew > maxStartIndex ? maxStartIndex : startIndexNew;
        if (startIndexNew === startIndex) return;
        var scrollOver = startIndexNew + this.vlist.showItemCount - 1 >= this.vlist.data.length;
        var renderOver = startIndexNew - startIndex === 1;
        if (scrollOver && renderOver) {
            //到底了
            if (this.loadData) {
                this.loadData();
            }
            return;
        }
        //如果到底没有渲染完就再渲染一次
        if (scrollOver && renderOver === false) {
            startIndexNew--;
        }
        this.diffRender(startIndex, startIndexNew);
        this.startIndex = startIndexNew;
    }
    
    diffRender(startIndex, startIndexNew) {
        var showItemCount = this.vlist.showItemCount;
        var items = this.vlist.items;
        var moveCount = Math.abs(startIndex - startIndexNew);
        if (moveCount >= showItemCount) {
            //全部渲染
            items.forEach((item, idx) => {
                item.index = startIndexNew + idx;
                this.renderItem(item);
            })
        } else {
            //部分渲染
            if (startIndex - startIndexNew > 0) {
                //逆 下拉
                for (var i = 1; i <= moveCount; i++) {
                    var item = items[showItemCount - i];
                    item.index = item.index - showItemCount;
                    this.renderItem(item);
                }
                this.items = items.splice(showItemCount - moveCount, moveCount).concat(items);
            } else {
                for (var i = 0; i < moveCount; i++) {
                    var item = items[i];
                    item.index = item.index + showItemCount;
                    this.renderItem(item);
                }
                this.vlist.items = items.concat(items.splice(0, moveCount));
            }
        }
    }
    
    updateVisibleData() {
        let scrollTop = this.vlist.container.scrollTop;
        scrollTop = scrollTop || 0;
        const visibleCount = Math.ceil(this.vlist.containerHeight / this.vlist.itemHeight); // 取得可见区域的可见列表项数量
        const start = Math.floor(scrollTop / this.vlist.itemHeight); // 取得可见区域的起始数据索引
        const end = start + visibleCount; // 取得可见区域的结束数据索引
        this.vlist.visibleData = this.vlist.data.slice(start, end); // 计算出可见区域对应的数据
    
        let str = "";
        this.vlist.items = [];
        for (var i = start; i < end; i++) {
            var item = this.renderItem({
                index: i
            });
            str += item.dom;
            // $(this.vlist.containerUL).append(item.dom);
            this.vlist.items.push(item);
        }
        $(this.vlist.containerUL).html(str);
        
        this.vlist.containerUL.style.webkitTransform = `translate3d(0, ${ start * this.vlist.itemHeight  }px, 0)`; // 把可见区域的 top 设置为起始元素在整个列表中的位置（使用 transform 是为了更好的性能）
    }
    
    static parseElement(htmlString){
        return new DOMParser().parseFromString(htmlString,'text/html').body.childNodes[0]
    }
    
    /*
        function: 含有过滤条件的数据加载
        @param check 定义字段过滤规则
        @param key 关键字过滤  string [过滤字段为header中添加的字段]
        @param data 该次加载的数据
     */
    filterData(check, key, data, load = false) {
        let DTable = this,
            newData;
        
        DTable.detail_data = data;
        
        DTable.selected = [];
        
        newData = DTable.getFilterData(check, key);
        
        if (DTable.option.hasPage && !DTable.option.hasPage.isUpdateLan) {
            DTable.update(newData, load)
        } else {
            DTable.updateLan(newData);
        }
        
        if (DTable.option.hasCheckbox) {
            DTable.clearAllSelected();
        }
    }
    
    /*
        function: 获得含有过滤条件的数据条数
        @param check 定义字段过滤规则
        @param key 关键字过滤  string [过滤字段为header中添加的字段]
        return number 匹配数据条数
     */
    getFilterDataNum(check, key) {
        let DTable = this,
            number;
        
        number = DTable.getFilterData(check, key).length;
        
        return number;
    }
    
    /*
        function: 获得含有过滤条件的数据
        @param check 定义字段过滤规则
                fullMatch————是否全匹配：true 时 value 只能为 string ； value 为 array 时 失效
                inverseMatch————是否反向匹配： string 全匹配时无效
                [
                    {name: "attackerType", value: ["终端", "服务器"], inverseMatch: true},
                    {name: "department", value: "单位", fullMatch: true},
                    {name: "weight", value: "核心", fullMatch: true}
                ]
        @param key 关键字过滤  string [过滤字段为header中添加的字段]
        return number 匹配数据
     */
    getFilterData(check, key) {
        let DTable = this,
            option = DTable.option,
            newData = [],
            data = DTable.detail_data;
        
        for (let i = 0; i < data.length; i++) {
            let flag = true;
            
            // 匹配定义的校验字段
            for (let j = 0; j < check.length; j++) {
                if (check[j].value && typeof check[j].value === "string") {
                    let dataItem = data[i][check[j].name] + "";
                    if (check[j].fullMatch) {
                        flag = flag && dataItem &&
                            dataItem === check[j].value
                    } else {
                        flag = flag && dataItem &&
                            (check[j].inverseMatch ?
                                !dataItem.includes(check[j].value) :
                                dataItem.includes(check[j].value))
                    }
                } else if (check[j].value && Array.isArray(check[j].value)) {
                    let checkStr = check[j].value,
                        dataItem = data[i][check[j].name] + "";
                    flag = flag && dataItem;
                    if (flag) {
                        let flagSearch;
                        if (check[j].inverseMatch) {
                            flagSearch = true;
                            for (let k = 0; k < checkStr.length; k++) {
                                if (!flagSearch) {break}
                                flagSearch = flagSearch && !dataItem.includes(checkStr[k])
                            }
                        } else {
                            flagSearch = false;
                            for (let k = 0; k < checkStr.length; k++) {
                                if (flagSearch) {break}
                                flagSearch = dataItem.includes(checkStr[k])
                            }
                        }
                        flag = flag && flagSearch
                    }
                }
            }
            
            if (flag && key) {
                // 匹配关键字
                let flagSearch = false;
                
                for (let j = 0; j < option.header.length; j++) {
                    if (flagSearch) {
                        break;
                    }
                    let str = "",
                        name = option.header[j].name;
                    if (["index", "openChild", "checkbox", "action"].includes(name)) {
                        continue;
                    }
                    if (option.render && option.render[name]) {
                        if (option.render[name].filter) {
                            str = option.render[name].filter(data[i][name], data[i]) + ""
                        } else {
                            str = option.render[name].render(data[i][name], data[i]) + ""
                        }
                    } else {
                        str = data[i][name] + ""
                    }
                    flagSearch = str.includes(key)
                }
                
                flag = flag && flagSearch;
                
                // hideHeader 子级table 查询
                if (!flag && option.hasChild && option.hasChild.type === "hideHeader") {
                    let flagChildSearch = false,
                        childHeader = option.hasChild.header,
                        childRender = option.hasChild.render,
                        childData = data[i][option.hasChild.data];
                    for (let j = 0; j < childHeader.length; j++) {
                        if (flagChildSearch) {
                            break;
                        }
                        let str = "",
                            name = childHeader[j].name;
                        if (["index", "null", "action", ""].includes(name)) {
                            continue;
                        }
                        
                        for (let itemI = 0; itemI < childData.length; itemI++) {
                            if (flagChildSearch) {
                                break;
                            }
                            let childItem = childData[itemI];
                            if (childRender && childRender[name]) {
                                if (childRender[name].filter) {
                                    str = childRender[name].filter(childItem[name], childItem, data[i]) + ""
                                } else {
                                    str = childRender[name].render(childItem[name], childItem, data[i]) + ""
                                }
                            } else {
                                str = childItem[name] + ""
                            }
                            flagChildSearch = str.includes(key)
                        }
                    }
    
                    flag = flagChildSearch;
                }
            }
            
            if (flag) {
                newData.push(data[i])
            }
        }
        
        return newData;
    }
    
    refreshPage() {
        let DTable = this,
            DId = DTable.id,
            page = DTable.page,
            option = DTable.option,
            tableBody = "",
            length = parseInt(page.lineNum),
            startNum = (page.current - 1) * page.lineNum;
        
        if (typeof option.loadRefresh === "function") {
            option.loadRefresh()
        }
        
        if (!option.isLoadData) {
            for (let i = startNum; i < startNum + length; i++) {
                tableBody += DTable.createTbodyTr(DTable.data[i], i + 1)
            }
            
            $("#" + DId.tbody).html(tableBody);
    
            if (option.hasOpenChild) {
                DTable.listenerOpenChild()
            }
        }
    }
    
    addListener() {
        let DTable = this,
            option = DTable.option;
        
        if (option.hasPage) {
            DTable.listenerPage()
        }
        
        if (option.hasOpenChild) {
            DTable.listenerOpenChild()
        }
        
        if (option.hasCheckbox) {
            DTable.listenerCheckbox()
        }
    
        DTable.contextHidden()
    }
    
    updateListener() {
        let DTable = this,
            option = DTable.option;
    
        if (option.hasPage) {
            DTable.setPage()
        }
    
        if (option.hasOpenChild) {
            DTable.listenerOpenChild()
        }
    
        if (option.hasCheckbox) {
            DTable.listenerCheckbox()
        }
        
        
        if (option.colResizable) {
            // 表格列 拖动功能
            let colResizableObj = {
                liveDrag:true,
                gripInnerHtml:"<div class='grip'></div>",
                draggingClass:"dragging",
                resizeMode:'fit',
            };
            $("#" + DTable.id.table).colResizable(colResizableObj);
        }
        
        if (!DTable.option.notContextHidden) {
            DTable.contextHidden()
        }
        
    }
    
    setPage() {
        let DTable = this,
            DId = DTable.id,
            page = DTable.page,
            pageTotal = $("#" + DId.pageTotal),
            pageCurrent = $("#" + DId.pageCurrent);
        
        pageTotal.text(page.total);
        pageCurrent.text(page.current);
        DTable.setPageDisable(page.current);
    }
    
    listenerPage() {
        let DTable = this,
            DId = DTable.id,
            option = DTable.option,
            DClass = DTable.class,
            page = DTable.page,
            pageTotal = $("#" + DId.pageTotal),
            pageCurrent = $("#" + DId.pageCurrent),
            firstPage = $("#" + DId.firstPage),
            lastPage = $("#" + DId.lastPage),
            nextPage = $("#" + DId.nextPage),
            endPage = $("#" + DId.endPage),
            lineNumPage = $("#" + DId.lineNumPage);
        
        // 初始化
        page.current = 1;
        pageTotal.text(page.total);
        pageCurrent.text(page.current);
        DTable.setPageDisable(1);
        
        firstPage.unbind("click").click(function () {
            if (firstPage.hasClass(DClass.disable_icon)) {
                return;
            }
            page.current = 1;
            DTable.setPageDisable(page.current);
            DTable.refreshPage()
        });
        lastPage.unbind("click").click(function () {
            if (lastPage.hasClass(DClass.disable_icon)) {
                return;
            }
            page.current = page.current - 1;
            DTable.setPageDisable(page.current);
            DTable.refreshPage()
        });
        nextPage.unbind("click").click(function () {
            if (nextPage.hasClass(DClass.disable_icon)) {
                return;
            }
            page.current = page.current + 1;
            DTable.setPageDisable(page.current);
            DTable.refreshPage()
        });
        endPage.unbind("click").click(function () {
            if (endPage.hasClass(DClass.disable_icon)) {
                return;
            }
            page.current = page.totalPage;
            DTable.setPageDisable(page.current);
            DTable.refreshPage()
        });
        if (typeof option.hasPage === "object" && option.hasPage.hasLineNum) {
            lineNumPage.val(DTable.page.lineNum ? DTable.page.lineNum : "all");
            lineNumPage.unbind("change").change(function (e) {
                let val = $(this).val();
                page.current = 1;
                DTable.page.lineNum = val;
                if (val === "all") {
                    DTable.option.lineNum = DTable.data.length
                } else {
                    DTable.option.lineNum = val
                }
                
                if (DTable.isLoadOnePageData && typeof option.loadRefresh === "function") {
                    DTable.option.lineNum = val === "all" ? null : val;
                    option.loadRefresh()
                } else {
                    if (val === "all") {
                        DTable.option.lineNum = DTable.data.length
                    } else {
                        DTable.option.lineNum = val
                    }
                    DTable.update(DTable.data)
                }
            })
        }
    }
    
    setPageDisable(currentPage) {
        let DTable = this,
            DId = DTable.id,
            DClass = DTable.class,
            page = DTable.page,
            pageCurrent = $("#" + DId.pageCurrent),
            firstPage = $("#" + DId.firstPage),
            lastPage = $("#" + DId.lastPage),
            nextPage = $("#" + DId.nextPage),
            endPage = $("#" + DId.endPage);
        
        pageCurrent.text(currentPage);
        
        if (currentPage === 1) {
            firstPage.addClass(DClass.disable_icon);
            lastPage.addClass(DClass.disable_icon);
        } else {
            firstPage.removeClass(DClass.disable_icon);
            lastPage.removeClass(DClass.disable_icon);
        }
        
        if (page.totalPage === currentPage) {
            nextPage.addClass(DClass.disable_icon);
            endPage.addClass(DClass.disable_icon);
        } else {
            nextPage.removeClass(DClass.disable_icon);
            endPage.removeClass(DClass.disable_icon);
        }
    }
    
    listenerCheckbox() {
        let DTable = this,
            DId = DTable.id,
            data = DTable.data;
        
        $("#" + DId.checkboxAllName).unbind("change").change(function () {
            if ($(this).is(":checked")) {
                DTable.setAllCheckbox(true)
            } else {
                DTable.setAllCheckbox(false)
            }
        });
    
        $("[name='" + DId.checkboxName + "']").unbind("change").change(function () {
            let index = this.value;
            if (!$(this).is(":checked")) {
                $("#" + DId.checkboxAllName)[0].checked = false;
                DTable.delOneCheckbox(index)
            } else {
                DTable.selected.push(data[index - 1])
            }
        })
    }
    
    clearAllSelected() {
        let DTable = this,
            DId = DTable.id;
        
        $("#" + DId.checkboxAllName)[0].checked = false;
        
        DTable.setAllCheckbox(false)
    }
    
    // 根据页面上的标签获取或设置
    setCheckbox(status) {
        let DTable = this,
            DId = DTable.id,
            checkbox_element = $("[name='" + DId.checkboxName + "']");
        
        for (let i = 0; i < checkbox_element.length; i++) {
            checkbox_element[i].checked = status;
        }
    }
    
    // 根据存储的数据进行获取或设置
    setAllCheckbox(status) {
        let DTable = this,
            allData = DTable.data;
    
        if (status) {
            DTable.selected = JSON.parse(JSON.stringify(allData))
        } else {
            DTable.selected = [];
        }
        DTable.setCheckbox(status);
    }
    
    setCheckboxSelected() {
        let DTable = this,
            selectedIndex = DTable.getSelectedIndex(),
            DId = DTable.id,
            checkbox_element = $("[name='" + DId.checkboxName + "']");
    
        for (let i = 0; i < checkbox_element.length; i++) {
            checkbox_element[i].checked = selectedIndex.includes(checkbox_element[i].value)
        }
    }
    
    delOneCheckbox(index) {
        let DTable = this,
            selected = DTable.selected;
    
        DTable.selected = selected.filter(value => value.index !== index)
    }
    
    // 获取CheckBox选中的项的index 返回数组
    getSelectedIndex() {
        let DTable = this,
            selected = DTable.selected,
            selectedIndex = [];
    
        for (let i = 0; i < selected.length; i++) {
            selectedIndex.push(selected[i].index)
        }
        
        return selectedIndex;
    }
    
    // 获取CheckBox选中的项的data 返回数组
    getSelectedData() {
        let DTable = this,
            selected = DTable.selected,
            selectedData;
    
        selectedData = JSON.parse(JSON.stringify(selected));
        
        return selectedData;
    }
    
    listenerOpenChild() {
        let DTable = this,
            option = DTable.option,
            DClass = DTable.class;
        
        $("." + DClass.td_openChild_input).unbind("change").change(function () {
            let index = $(this).attr("id").split("_")[1],
                trChild = $("." + DClass.tbody_tr_child + "[Dindex='" + index + "']");
            
            if ($(this).is(':checked')) {
                trChild.removeClass("displayNone");
                
                if (typeof option.clickOpen === "function") {
                    let data = DTable.detail_data ? DTable.detail_data[index - 1] : DTable.data[index - 1];
                    option.clickOpen(index, data);
                }
            } else {
                trChild.addClass("displayNone");
            }
        });
    }
    
    createTable() {
        let DTable = this,
            option = DTable.option,
            tableBody = "";
        
        tableBody += `<table id="${DTable.id.table}">`;
        tableBody += DTable.createThead();
        tableBody += DTable.createTbody();
        tableBody += `</table>`;
        
        if (option.hasPage) {
            tableBody += DTable.createPageTool();
        }
        
        $("#" + DTable.option.fatherId).html(tableBody);
    }
    
    createThead() {
        let DTable = this,
            option = DTable.option,
            DClass = DTable.class,
            tableBody = "";
        
        tableBody += `<thead class="${DClass.thead}">
                          <tr>`;
        
        for (let i = 0; i < option.header.length; i++) {
            tableBody += DTable.createTheadTd(option.header[i]);
        }
        
        tableBody += `    </tr>
                      </thead>`;
        
        return tableBody;
    }
    
    createTheadTd(data) {
        let DTable = this,
            option = DTable.option,
            DClass = DTable.class,
            DId = DTable.id,
            tableBody = "";
        
        if (data.type === "checkbox") {
            tableBody += `<td ${data.id ? 'id="' + data.id + '"' : '' } class="${DClass.td} ${DClass.thead_td} ${data.align ? DClass[data.align] : ''}" width="${data.width}">
                            <div class="${DClass.td_checkbox}">
                                <input id="${DId.checkboxAllName}" class="${DClass.td_checkbox_input}" type="checkbox" name="${DId.checkboxAllName}"/>
                                <label class="iconfont" for="${DId.checkboxAllName}"></label>
                             </div>
                          </td>`;
            
            option.hasCheckbox = true;
        } else {
            tableBody += `<td ${data.id ? 'id="' + data.id + '"' : '' } class="${DClass.td} ${DClass.thead_td} ${data.align ? DClass[data.align] : ''}" width="${data.width}">
                        <span name="${data.name}">${data.title ? data.title : ""}</span>
                      </td>`;
        }
        
        return tableBody;
    }
    
    createTbody() {
        let DTable = this,
            DClass = DTable.class,
            DId = DTable.id,
            tableBody = "";
        
        tableBody += `<tbody class="${DClass.tbody}" id="${DId.tbody}">
                      </tbody>`;
        
        return tableBody;
    }
    
    createTbodyTr(data, index) {
        let DTable = this,
            option = DTable.option,
            DClass = DTable.class,
            tableBody = "";
        
        if (option.tdHeight) {
            tableBody += `<tr class="${DClass.tbody_tr} ${DClass.tbody_tr_height}" Dindex="${index}">`;
        } else {
            tableBody += `<tr class="${DClass.tbody_tr}" Dindex="${index}">`;
        }
        
        
        for (let i = 0; i < option.header.length; i++) {
            tableBody += DTable.createTbodyTd(option.header[i], data, index);
        }
        
        tableBody += `</tr>`;
        
        
        if (data && (option.hasChild === true || (typeof option.hasChild === "object" && option.hasChild.show))) {
            if (option.hasChild.type === "hideHeader") {
                // type === "hideHeader" 时，childRender 无效。
                let childOption = option.hasChild;
                if (data[childOption.data]) {
                    for (let i = 0; i < data[childOption.data].length; i++) {
                        tableBody += DTable.createTbodyTrChildTr(data, index, i)
                    }
                }
            } else {
                tableBody += `<tr class="${DClass.tbody_tr_child} displayNone" Dindex="${index}"><td colspan="${option.header.length}">`;
    
                tableBody += option.childRender(index, data);
    
                tableBody += `</td></tr>`;
            }
        }
        
        return tableBody;
    }
    
    createTbodyTrChildTr(data, index, childIndex) {
        let DTable = this,
            option = DTable.option,
            childOption = option.hasChild,
            childData = data[childOption.data][childIndex],
            DClass = DTable.class,
            tdClass = "table-panel-td-hideHeader",
            tableBody = "";
        
        
        tableBody += `<tr class="${DClass.tbody_tr_child} displayNone" Dindex="${index}">`;
    
        for (let i = 0; i < option.header.length; i++) {
            let header = childOption.header[i];
            
            tableBody += `<td class="${tdClass} ${header.align ? DClass[header.align] : ''}">`;
            
            if (header.type === "index") {
                tableBody += !childData ? "" : (childIndex + 1)
            } else if (["checkbox", "openChild", "null"].includes(header.type)) {
                // 二级同table表单  不允许使用 CheckBox  openChild
                tableBody += ""
            } else {
                if (!childData) {
                    tableBody += "";
                } else if (childOption.render && childOption.render[header.name]) {
                    tableBody += childOption.render[header.name].render(childData[header.name], childData, data)
                } else {
                    tableBody += childData[header.name];
                }
            }
    
            tableBody += `</td>`;
        }
        
        tableBody += `</tr>`;
        
        return tableBody
    }
    
    createTbodyTd(header, data, index) {
        let DTable = this,
            DClass = DTable.class,
            tableBody = "";
        
        let classArr = [DClass.td];
        
        header.align && classArr.push(DClass[header.align]);
        header.notContextHidden && classArr.push("notContextHidden");
        DTable.option.tdClass && classArr.push(DTable.option.tdClass);
        
        if (DClass.td === "table-panel-td-hideHeader") {
            tableBody += `<td class="${classArr.join(" ")}" width="${header.width}">`;
        } else {
            tableBody += `<td class="${classArr.join(" ")}" width="${header.width}">`;
        }
        
        if (header.type === "index") {
            if (DTable.isLoadOnePageData && DTable.page.lineNum !== "all") {
                tableBody += !data ? "" : index + ((DTable.page.current-1) * DTable.page.lineNum)
            } else {
                tableBody += !data ? "" : index
            }
        } else if (header.type === "openChild") {
            tableBody += DTable.createTbodyTdOpenChild(header, data, index)
        } else if (header.type === "checkbox") {
            tableBody += DTable.createTbodyTdCheckbox(header, data, index)
        } else if (header.type === "null") {
            tableBody += ""
        } else {
            tableBody += DTable.createTbodyTdText(header, data, index)
        }
        
        tableBody += `</td>`;
        
        
        return tableBody;
    }
    
    createTbodyTdCheckbox(header, data, index) {
        let DTable = this,
            option = DTable.option,
            DClass = DTable.class,
            DId = DTable.id,
            tableBody = "";
        
        if (!data) {
            tableBody = "";
        } else {
            tableBody = `<div class="${DClass.td_checkbox}">
                            <input id="checkbox_${index}_${option.name}" class="${DClass.td_checkbox_input}" type="checkbox" name="${DId.checkboxName}" value="${index}" />
                            <label class="iconfont" for="checkbox_${index}_${option.name}"></label>
                         </div>`;
        }
        
        return tableBody;
    }
    
    createTbodyTdOpenChild(header, data, index) {
        let DTable = this,
            option = DTable.option,
            DClass = DTable.class,
            tableBody = "";
        
        if (!data) {
            tableBody = "";
        } else {
            tableBody = `<div class="${DClass.td_openChild}">
                            <input id="openChild_${index}_${option.name}" class="${DClass.td_openChild_input}" type="checkbox" name="openChild_${index}_${option.name}" value="${index}" />
                            <label class="iconfont" for="openChild_${index}_${option.name}"></label>
                         </div>`;
        }
        
        option.hasOpenChild = true;
        
        return tableBody;
    }
    
    createTbodyTdText(header, data, index) {
        let DTable = this,
            option = DTable.option,
            tableBody = "";
        
        if (!data) {
            tableBody = "";
        } else if (option.render && option.render[header.name]) {
            tableBody = option.render[header.name].render(data[header.name], data)
        } else {
            tableBody = data[header.name];
        }
        
        return tableBody;
    }
    
    createPageTool() {
        let DTable = this,
            DClass = DTable.class,
            option = DTable.option,
            DId = DTable.id,
            tableBody = "";
        
        tableBody += `<div class="${DClass.page_tool}">`;
        tableBody += `<div class="${DClass.page_div}">`;
        tableBody += `<span class="${DClass.page_text}">总共<span id="${DId.pageTotal}">0</span>条记录</span>`;
        tableBody += `<span class="${DClass.page_action}">`;
        
        tableBody += `<span id="${DId.firstPage}" class="icon iconfont icon-diyiye ${DClass.page_icon}"></span>`;
        tableBody += `<span id="${DId.lastPage}" class="icon iconfont icon-fenye-shangyiye ${DClass.page_icon}"></span>`;
        tableBody += `<span id="${DId.pageCurrent}" class="${DClass.page_icon}">1</span>`;
        tableBody += `<span id="${DId.nextPage}" class="icon iconfont icon-fenye-xiayiye ${DClass.page_icon}"></span>`;
        tableBody += `<span id="${DId.endPage}" class="icon iconfont icon-zuihouyiyetiaozhuan ${DClass.page_icon}"></span>`;
        
        tableBody += `</span>`;
        
        if (typeof option.hasPage === "object" && option.hasPage.hasLineNum) {
            tableBody += `<span class="table-page-lineNum">每页<select name="${DId.lineNumPage}" id="${DId.lineNumPage}">`;
            
            if (option.hasPage.lineNumList && option.hasPage.lineNumList.length) {
                option.hasPage.lineNumList.forEach(value => {
                    tableBody += `<option value="${value}">${value}</option>`;
                })
            } else {
                tableBody += `<option value="all">全部</option>`;
                tableBody += `<option value="5">5</option>`;
                tableBody += `<option value="10">10</option>`;
                tableBody += `<option value="15">15</option>`;
                tableBody += `<option value="20">20</option>`;
                tableBody += `<option value="30">30</option>`;
                tableBody += `<option value="50">50</option>`;
                tableBody += `<option value="100">100</option>`;
            }
            
            tableBody += `</select></span>`;
        }
        
        tableBody += `</div>`;
        tableBody += `</div>`;
        
        return tableBody;
    }
    
    createActionText(action_text) {
        let DTable = this,
            DClass = DTable.class,
            buttons = "";
    
        if (action_text === undefined) {
            return buttons;
        }
    
        for (let i = 0; i < action_text.length; i++) {
            let item = action_text[i],
                attr = "",
                strClass = DClass.action_text;
            
            if (typeof item.disabled === "boolean" && item.disabled) {
                strClass += " event-disabled"
            } else {
                if (item.functions !== undefined && item.functions) {
                    let functions = item.functions;
                    for (let key in functions) {
                        attr += key + "='" + functions[key] + "' "
                    }
                }
            }
            
            if (item.value !== undefined && item.value) {
                attr += "value='" + item.value + "'"
            }
            
            buttons += `<span class="${strClass}" ${attr}>`;
            
            if (item.button_icon !== undefined && /icon/.test(item.button_icon)) {
                buttons += `<span class="icon iconfont ${item.button_icon} iconTag"></span>`
            }
    
            buttons += `<span class="iconTag-text">${item.button_text}</span></span>`
        }
        
        return buttons
    }
    
    createActionButtons(action_buttons) {
        let DTable = this,
            DClass = DTable.class;
        
        let buttons = "";
        let funArr = [];
        
        if (action_buttons === undefined) {
            return buttons;
        }
        
        for (let i = 0; i < action_buttons.length; i++) {
            let item = action_buttons[i];
            if (item.enable === undefined || !item.enable) {
                continue;
            }
            /* 添加默认样式 */
            if (item.cls !== undefined && item.cls) {
                item.cls = DClass.action_image + " " + item.cls;
            } else {
                item.cls = DClass.action_image;
            }
            
            if (item.button_icon !== undefined && /icon/.test(item.button_icon)) {
                buttons += '<button ';
                item.cls += " icon iconfont " + item.button_icon;
            } else  {
                buttons += '<input type="image" ';
            }
            
            /* 添加标准属性 */
            buttons += DTable.createStandardAttr(item);
            if (item.button_text !== undefined && item.button_text) {
                buttons += 'title="' + item.button_text + '" ';
            }
            if (item.button_icon !== undefined && /\./.test(item.button_icon)) {
                buttons += 'src="../images/' + item.button_icon + '" ';
            }
            if (item.onFunc !== undefined && typeof item.onFunc === "function") {
                funArr[i] = item.onFunc;
            }
            
            if (item.button_icon !== undefined && /icon/.test(item.button_icon)) {
                buttons += '></button>';
            } else {
                buttons += '/>';
            }
            
            
        }
        if (funArr.length !== 0) {
            let buttons$ = $(buttons);
            buttons$.each(function (a, b) {
                if (funArr[a]) {
                    $(b).on("click", funArr[a]);
                }
            });
            return buttons$;
        }
        return buttons;
    }
    
    createStandardAttr(item) {
        let attrs = "";
        
        if (item.id !== undefined && item.id) {
            attrs += 'id="' + item.id + '" ';
        }
        if (item.name !== undefined && item.name) {
            attrs += 'name="' + item.name + '" ';
        }
        if (item.cls !== undefined && item.cls) {
            attrs += 'class="' + item.cls + '" ';
        }
        if (item.value !== undefined) {
            attrs += 'value="' + item.value + '" ';
        }
        if (item.href !== undefined) {
            attrs += 'href="' + item.href + '" ';
        }
        if (item.src !== undefined) {
            attrs += 'src="' + item.src + '" ';
        }
        if (item.multiple !== undefined && item.multiple) {
            attrs += 'multiple="multiple" ';
        }
        if (item.disabled !== undefined && item.disabled) {
            attrs += 'disabled="disabled" ';
        }
        if (item.checked !== undefined && item.checked) {
            attrs += 'checked="checked" ';
        }
        if (item.selected !== undefined && item.selected) {
            attrs += 'selected="selected" ';
        }
        if (item.readonly !== undefined && item.readonly) {
            attrs += 'readonly="readonly" ';
        }
        if (item.input_tip !== undefined && item.input_tip) {
            attrs += 'placeHolder="' + item.input_tip + '" ';
        }
        if (item.style !== undefined && item.style) {
            attrs += 'style="' + item.style + '" ';
        }
        if (item.functions !== undefined && item.functions) {
            var functions = item.functions;
            for (var key in functions) {
                attrs += key + '="' + functions[key] + '" ';
            }
        }
        
        return attrs;
    }
    
    /* 添加title属性显示隐藏内容 */
    contextHidden() {
        let DTable = this;
        let id = "sa_contentHidden_" + DTable.option.name,
            tbodyDom = $("#" + DTable.id.tbody);
        DTable.id.contentHidden = id;
    
        if (!$("#" + id)[0]) {
            $("#" + DTable.option.fatherId).append(`<div id="${id}" class="sa-contentHidden" style="display: none"></div>`)
        }
    
        DTable.showFloatTimer = null;
    
        tbodyDom.unbind("mouseover").mouseover(function (e) {
            if (e.target.tagName === "TD" && e.target.offsetWidth < e.target.scrollWidth && !$(e.target).hasClass("notContextHidden")) {
                let tex = $(e.target).text();
                $("#" + id).html(`<span>${tex}</span>`);
                clearTimeout(DTable.showFloatTimer);
                DTable.showFloatTimer=setTimeout(function(e){
                    $("#" + id).fadeIn(50);//浮动框淡出
                },50);
            } else {
                let dom = $(e.target).parents("td");
                if (dom.length && dom[0].offsetWidth < dom[0].scrollWidth && !$(dom[0]).hasClass("notContextHidden")) {
                    let tex = $(dom[0]).text();
                    $("#" + id).html(`<span>${tex}</span>`);
                    clearTimeout(DTable.showFloatTimer);
                    DTable.showFloatTimer=setTimeout(function(e){
                        $("#" + id).fadeIn(50);//浮动框淡出
                    },50);
                }
            }
        });
    
        tbodyDom.unbind("mouseout").mouseout(function () {
            $("#" + id).hide();
            clearTimeout(DTable.showFloatTimer);//鼠标滑出时清除函数去抖中的定时事件
        });
    
        tbodyDom.unbind("mousemove").mousemove(floatMove());
    
        function floatMove(){//节流函数
            let canRun=true;
            return function(e){//e是mousemove的event参数
                if(!canRun){return;}//如果有一个定时方法，直接返回
                canRun=false;
                setTimeout(function(){
                    let bottom = window.innerHeight - e.clientY + 10,
                        left = window.innerWidth - e.clientX - 10 < 300 ? window.innerWidth - 300 : e.clientX + 10;
                    $("#" + id).css({
                        'bottom' : bottom + 'px',
                        'left': left+ 'px'
                    });
                    canRun=true;
                },50);
            }
        }
    }
    
    static create(option) {
        return new SATable(option);
    }
}