class SASelect {
    constructor(option) {
        let DSelect = this;
        DSelect.id = option.id;
        DSelect.name = option.name ? option.name : option.id;
        DSelect.options_id = DSelect.id + "_options";
        DSelect.input_id = DSelect.id + "_input";
        DSelect.options = option.options ? option.options : [];
        DSelect.float = option.float ? option.float : "bottom"; // top   bottom
        
        if (option.multiple) {
            if (typeof option.selected === "string") {
                DSelect.selected = [option.selected]
            } else if (typeof option.selected === "object") {
                DSelect.selected = [...option.selected]
            } else {
                DSelect.selected = []
            }
        } else {
            DSelect.selected = option.selected ? option.selected : "";
        }
        
        DSelect.option = option;
        
        DSelect.option.allSelectionText = option.allSelectionText || "全部"
    }
    
    render() {
        let DSelect = this;
        
        if (DSelect.option.multiple) {
            DSelect.createDataMultiple();
            DSelect.addListenerMultiple()
        } else {
            DSelect.createData();
            DSelect.addListener()
        }
    }
    
    update(options) {
        let DSelect = this,
            option = DSelect.option;
        
        if (options) {
            DSelect.options = options;
        }
        
        if (option.multiple) {
            DSelect.selected = []
        } else {
            DSelect.selected = "";
        }
        DSelect.render()
    }
    
    getVal() {
        let DSelect = this;
        return DSelect.selected
    }
    
    setVal(value) {
        let DSelect = this,
            optionsId = $("#" + DSelect.options_id);
        if (DSelect.option.multiple) {
            DSelect.clearMultiple();
            if (typeof value === "string") {
                if (value !== "all") {
                    optionsId.children("div").removeClass("action");
                    let optionDom = $("#" + DSelect.options_id + " [value='" + value + "']");
                    DSelect.selected = [value];
                    optionDom.addClass("action");
                }
            } else if (value.length) {
                optionsId.children("div").removeClass("action");
                DSelect.selected = [];
                value.forEach(val => {
                    let optionDom = $("#" + DSelect.options_id + " [value='" + val + "']");
                    DSelect.selected.push(val);
                    optionDom.addClass("action");
                })
            }
            $("#" + DSelect.input_id).val(DSelect.getText().join(","));
        } else {
            optionsId.children("div").removeClass("action");
            DSelect.selected = value;
            let optionDom = $("#" + DSelect.options_id + " [value='" + value + "']");
            let text = optionDom.text();
            $("#" + DSelect.input_id).val(text);
            optionDom.addClass("action")
        }
    }
    
    clearMultiple() {
        let DSelect = this,
            option = DSelect.option,
            optionsId = $("#" + DSelect.options_id);
        if (option.allSelection) {
            DSelect.selected = "all";
            optionsId.children("div").removeClass("action");
            $("#" + DSelect.options_id + " [all='all']").addClass("action");
        } else {
            DSelect.selected = [];
            optionsId.children("div").each(function () {
                if ($(this).hasClass("action")) {
                    $(this).removeClass("action");
                }
            })
        }
    }
    
    getText() {
        let DSelect = this;
        if (DSelect.option.multiple) {
            if (DSelect.option.allSelection && typeof DSelect.selected === "string") {
                return [DSelect.option.allSelectionText]
            }
            let textArr = [];
            DSelect.selected.forEach(val => {textArr.push(DSelect.values[val])});
            return textArr
        } else {
            return DSelect.values[DSelect.selected]
        }
    }
    
    clear() {
        let DSelect = this;
        $("#" + DSelect.options_id).html("");
        $("#" + DSelect.input_id).val("")
    }
    
    closeOption() {
        let DSelect = this,
            optionsId = $("#" + DSelect.options_id);
        optionsId.addClass("displayNone");
    }
    
    isSelectChild(e) {
        let DSelect = this;
        
        let path = e.path;
        
        return path.some(value => value.id === DSelect.id)
    }
    
    addListenerMultiple() {
        let DSelect = this,
            optionsId = $("#" + DSelect.options_id);
        
        optionsId.addClass("displayNone");
        $("#" + DSelect.id).unbind("click").click(function (e) {
            // e.stopPropagation();
            if (e.target.nodeName === "INPUT") {
                if (optionsId.hasClass("displayNone")) {
                    optionsId.removeClass("displayNone");
                } else {
                    optionsId.addClass("displayNone");
                }
            } else {
                optionsId.removeClass("displayNone");
            }
        });
        
        document.body.addEventListener("click", function (e) {
            if (!DSelect.isSelectChild(e)) {
                optionsId.addClass("displayNone");
            }
        });
        
        optionsId.children("div").unbind("click").click(function () {
            let val = $(this).attr("value");
            
            if ($(this).attr("all") === "all") {
                DSelect.selected = "all";
                optionsId.children("div").removeClass("action");
                $(this).addClass("action");
            } else {
                if (typeof DSelect.selected === "string") {
                    optionsId.children("div").removeClass("action");
                    DSelect.selected = [val];
                    $(this).addClass("action");
                } else {
                    if ($(this).hasClass("action")) {
                        if (DSelect.selected.length > 1) {
                            let index = DSelect.selected.indexOf(val);
                            if (index > -1) {
                                DSelect.selected.splice(index, 1);
                            }
                            $(this).removeClass("action")
                        }
                    } else {
                        DSelect.selected.push(val);
                        $(this).addClass("action");
                    }
                }
            }
            
            if (typeof DSelect.option.onchange === "function") {
                DSelect.option.onchange()
            }
            
            $("#" + DSelect.input_id).val(DSelect.getText().join(",")).trigger('change');
        })
    }
    
    createDataMultiple() {
        let DSelect = this,
            option = DSelect.option,
            selected = [];
        let html = `<input type="text" readonly name="${DSelect.name}" id="${DSelect.input_id}">
                    <i class="iconfont icon-xiala form-select-icon"></i>
                    <div class="form-select-options" id="${DSelect.options_id}">`;
        
        DSelect.values = {};
        
        if (option.allSelection) {
            DSelect.selected = "all";
            selected = [option.allSelectionText];
            html += `<div value="" class="action" all="all">${option.allSelectionText}</div>`
        } else {
            if (!DSelect.selected.length && DSelect.options.length) {
                let value = DSelect.options[0];
                if (option.value && option.value !== "index") {
                    DSelect.selected = [value[option.value]]
                } else if (option.value === "index") {
                    DSelect.selected = [index]
                } else {
                    DSelect.selected = [value.value != undefined ? value.value : index]
                }
            }
        }
        
        DSelect.options.forEach((value, index) => {
            let val, text, action = "";
            if (option.value && option.value !== "index") {
                val = value[option.value]
            } else if (option.value === "index") {
                val = index
            } else {
                val = value.value != undefined ? value.value : index
            }
            if (option.text) {
                text = value[option.text]
            } else {
                text = value["text"] ? value["text"] : value["name"]
            }
            if (typeof DSelect.selected !== "string" && DSelect.selected.includes(val)) {
                action = "action";
                selected.push(text);
            }
            DSelect.values[val] = text;
            html += `<div value="${val}" class="${action}">${text}</div>`
        });
        
        html += `</div>`;
        
        $("#" + DSelect.id).addClass("form-select-div").html(html);
        
        selected.length && $("#" + DSelect.input_id).val(selected.join(","));
    }
    
    addListener() {
        let DSelect = this,
            optionsId = $("#" + DSelect.options_id);
        
        optionsId.addClass("displayNone");
        $("#" + DSelect.id).unbind("click").click(function (e) {
            // e.stopPropagation();
            if (optionsId.hasClass("displayNone")) {
                optionsId.removeClass("displayNone");
            } else {
                optionsId.addClass("displayNone");
            }
        });
        
        document.body.addEventListener("click", function (e) {
            if (!DSelect.isSelectChild(e)) {
                optionsId.addClass("displayNone");
            }
        });
        
        optionsId.children("div").unbind("click").click(function () {
            let val = $(this).attr("value"),
                text = $(this).text();
            DSelect.selected = val;
            $("#" + DSelect.input_id).val(text).trigger('change');
            
            optionsId.children("div").removeClass("action");
            $(this).addClass("action")
        })
    }
    
    createData() {
        let DSelect = this,
            option = DSelect.option,
            selected,
            selectOptionsClass = (DSelect.float === "bottom") ? "form-select-options" : ("form-select-options form-select-options-" + DSelect.float);
        
        
        let html = `<input type="text" readonly name="${DSelect.name}" id="${DSelect.input_id}">
                    <i class="iconfont icon-xiala form-select-icon"></i>
                    <div class="${selectOptionsClass}" id="${DSelect.options_id}">`;
        
        if (option.allSelection) {
            DSelect.selected = "all";
            selected = [option.allSelectionText];
            html += `<div value="all" class="action" all="all">${option.allSelectionText}</div>`
        } else {
            if (!DSelect.selected && DSelect.options.length) {
                let value = DSelect.options[0];
                if (DSelect.option.value && DSelect.option.value !== "index") {
                    DSelect.selected = value[DSelect.option.value]
                } else if (DSelect.option.value === "index") {
                    DSelect.selected = index
                } else {
                    DSelect.selected = value.value != undefined ? value.value : index
                }
            }
        }
        
        DSelect.values = {};
        
        DSelect.options.forEach((value, index) => {
            let val, text, action = "";
            if (DSelect.option.value && DSelect.option.value !== "index") {
                val = value[DSelect.option.value]
            } else if (DSelect.option.value === "index") {
                val = index
            } else {
                val = value.value != undefined ? value.value : index
            }
            if (DSelect.option.text) {
                text = value[DSelect.option.text]
            } else {
                text = value["text"] ? value["text"] : value["name"]
            }
            if (DSelect.selected == val) {
                action = "action";
                selected = text;
            }
            DSelect.values[val] = text;
            html += `<div value="${val}" class="${action}">${text}</div>`
        });
        
        html += `</div>`;
        
        $("#" + DSelect.id).addClass("form-select-div").html(html);
        
        selected && $("#" + DSelect.input_id).val(selected)
    }
    
    static create(option) {
        if (!option.id) {
            console.error("必须含有select表单的id！");
            return;
        }
        return new SASelect(option);
    }
    
}