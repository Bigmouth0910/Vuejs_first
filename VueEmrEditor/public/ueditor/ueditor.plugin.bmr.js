/**
 * Created by peng.hongbao on 2019/7/14.
 * desc BMR电子病历编辑器，扩展百度Ueditor的控件
 */
/**
 * @method 判断该节点或者所有父节点中是否包含oakplugin属性,有则返回节点,没有返回fasle
 * 元素有oak-field属性才判断,为减少判断次数
 * @param target
 * @param parent
 * @return
 */
function isParentTarget(target, attr) {
  var isOakField =
    (target.getAttribute("class") || "").indexOf("oak-field") > -1;
  var oakplugin = target.getAttribute(attr);
  if (isOakField) {
    if (oakplugin) {
      return target;
    } else {
      while (
        target.parentNode &&
        (target.getAttribute("class") || "").indexOf("oak-field") > -1
      ) {
        target = target.parentNode;
        if (target.getAttribute(attr)) {
          return target;
          break;
        }
      }
    }
  } else {
    return false;
  }
}

/**
 * @method 获取target元素所在iframe下的body元素
 * @param target
 * @return
 */
function getBodyTarget(target) {
  if (target.tagName == "BODY") {
    return target;
  }
  while ((target = target.parentNode)) {
    if (target.tagName == "BODY") {
      return target;
      break;
    }
  }
}
/**
 * Created by peng.hongbao on 2018/7/10.
 * desc BMR电子病历编辑器，根据百度Ueditor封装
 */
var utils = baidu.editor.utils;
var commands = [];
// 为工具栏添加按钮，以下都是统一的按钮触发命令，所以写在一起
var editCmds = [
  "bold",
  "italic",
  "underline",
  "fontborder",
  "strikethrough",
  "subscript",
  "superscript",
  "|",
  "paragraph",
  "fontfamily",
  "fontsize",
  "|",
  "indent",
  "outdent",
  "|",
  "rowspacingtop",
  "rowspacingbottom",
  "lineheight",
  "|",
  "forecolor",
  "backcolor",
  "insertorderedlist",
  "insertunorderedlist",
  "indent",
  "|",
  "justifyleft",
  "justifycenter",
  "justifyright",
  "justifyjustify",
];
var fixedCmds = [
  "undo",
  "redo",
  "formatmatch",
  "removeformat",
  "|",
  "print",
  "printing",
  "noprinting",
  "preview",
  "searchreplace",
  "|",
  "allwidgets",
  "allhtml",
  "|",
  "txt",
];
var insertCmds = [
  "simpleupload",
  "insertimage",
  "scrawl",
  "inserttable",
  "insertpage",
  "|",
  "pagebreak",
  "spechars",
  "|",
  "kityformula",
  "|",
  "horizontal",
  "snapscreen",
  "|",
  "inserttable",
  "deletetable",
  "insertparagraphbeforetable",
  "insertrow",
  "deleterow",
  "insertcol",
  "deletecol",
  "|",
  "mergecells",
  "mergeright",
  "mergedown",
  "splittocells",
  "splittorows",
  "splittocols",
  "|",
  "formulas",
];
/*var insertCmds = [
 'kityformula'
 ]*/
var tableCmds = [
  "deletetable",
  "insertparagraphbeforetable",
  "insertrow",
  "deleterow",
  "insertcol",
  "deletecol",
  "|",
  "mergecells",
  "mergeright",
  "mergedown",
  "splittocells",
  "splittorows",
  "splittocols",
];
var emreCmds = [
  "template",
  "controllibrary",
  "checkbox",
  "radio",
  "select",
  "input",
  "timeinput",
  "dicom",
  "tagimg",
  "|",
  "insertcmt",
  "hidecmt",
  "showcmt",
];
//页面布局
var layoutCmds = [];

/**
 * 创建OAKEditor对象
 * @param {JSON} options
 */
var OAKEditor = function (options) {
  this.editor = options.editor; //百度编辑器实例，必须传入
  this.editorui = baidu.editor.ui;
  this.command = options.command || command;
};
/**
 * 添加原型方法
 */
OAKEditor.prototype = {
  /**
   * 扩展编辑器命令
   * @param name
   * @param obj
   */
  registerCommand: function (name, obj) {
    this.editor.command[name] = obj;
  },
  /**
   * 生成命令按钮html
   */
  renderCommand: function (command) {
    var html = "";
    command = command || this.command;
    for (var i = 0; i < command.length; i++) {
      var commondUI = this.editorui[command[i]];
      if (!commondUI) {
        html += "<div class='edui-box edui-separator edui-default'></div>";
      } else {
        var ui = commondUI(this.editor);
        html += ui.renderHtml();
      }

      //ui.postRender();
    }
    return html;
  },
};

function command(editor) {
  var editH = new OAKEditor({ editor: editor, command: editCmds });
  var fixedH = new OAKEditor({ editor: editor, command: fixedCmds });
  var insertH = new OAKEditor({ editor: editor, command: insertCmds });
  var emreH = new OAKEditor({ editor: editor, command: emreCmds });
  var layoutH = new OAKEditor({ editor: editor, command: layoutCmds });
  return {
    editHtml: editH.renderCommand(),
    fixedHtml: fixedH.renderCommand(),
    insertHtml: insertH.renderCommand(),
    emreHtml: emreH.renderCommand(),
    layoutHtml: layoutH.renderCommand(),
  };
}

/**
 * 控件库，新增控件
 */
UE.plugins["controllibrary"] = function () {
  var me = this,
    thePlugins = "controllibrary";
  me.commands[thePlugins] = {
    execCommand: function () {
      var dialog = new UE.ui.Dialog({
        //弹出模式以iframe方式打开的控件配置页面 URL
        iframeUrl:
          this.options.UEDITOR_HOME_URL +
          "dialogs/oak-form/controllibrary.html",
        name: thePlugins,
        editor: this,
        title: "控件库", //弹出框标题
        cssRules: "width:700px;height:350px;",
        buttons: [
          //弹出框按钮集
          {
            className: "edui-okbutton",
            label: "确定",
            onclick: function () {
              dialog.close(true);
            },
          },
          {
            className: "edui-cancelbutton",
            label: "取消",
            onclick: function () {
              dialog.close(false);
            },
          },
        ],
      });
      dialog.render();
      dialog.open();
    },
  };
};

baidu.editor.ui.controllibrary = function (editor, list, title) {
  // 创建dialog
  var kfDialog = new UE.ui.Dialog({
    // 指定弹出层路径
    iframeUrl:
      editor.options.UEDITOR_HOME_URL + "dialogs/oak-form/controllibrary.html",
    // 编辑器实例
    editor: editor,
    // dialog 名称
    name: "controllibrary",
    // dialog 标题
    title: "控件库",
    // dialog 外围 css
    cssRules: "width:700px; height:350px;",

    //如果给出了buttons就代表dialog有确定和取消
    buttons: [
      {
        className: "edui-okbutton",
        label: "确定",
        onclick: function () {
          kfDialog.close(true);
        },
      },
      {
        className: "edui-cancelbutton",
        label: "取消",
        onclick: function () {
          kfDialog.close(false);
        },
      },
    ],
  });

  editor.ready(function () {
    UE.utils.cssRule(
      "kfformula",
      "img.kfformula{vertical-align: middle;}",
      editor.document
    );
  });

  var iconUrl = editor.options.UEDITOR_HOME_URL + "imgs/controllibrary.png";
  var tmpLink = document.createElement("a");
  tmpLink.href = iconUrl;
  tmpLink.href = tmpLink.href;
  iconUrl = tmpLink.href;

  var kfBtn = new UE.ui.Button({
    name: "controllibrary-1",
    title: "控件库",
    //需要添加的额外样式，指定icon图标
    className: "edui-for-controllibrary-1",
    cssRules: 'background-image: url("' + iconUrl + '") !important',
    onclick: function () {
      //渲染dialog
      kfDialog.render();
      kfDialog.open();
    },
  });

  //当点到编辑内容上时，按钮要做的状态反射
  editor.addListener("selectionchange", function () {
    var state = editor.queryCommandState("checkbox");
    if (state == -1) {
      kfBtn.setDisabled(true);
      kfBtn.setChecked(false);
    } else {
      kfBtn.setDisabled(false);
      kfBtn.setChecked(state);
    }
  });
  return kfBtn;
};
/**
 * checkbox
 */
UE.plugins["checkbox"] = function () {
  var me = this,
    thePlugins = "checkbox";
  me.commands[thePlugins] = {
    execCommand: function () {
      var dialog = new UE.ui.Dialog({
        //弹出模式以iframe方式打开的控件配置页面 URL
        iframeUrl:
          this.options.UEDITOR_HOME_URL + "dialogs/oak-form/checkbox.html",
        name: thePlugins,
        editor: this,
        title: "复选框", //弹出框标题
        cssRules: "width:600px;height:300px;",
        buttons: [
          //弹出框按钮集
          {
            className: "edui-okbutton",
            label: "确定",
            onclick: function () {
              dialog.close(true);
            },
          },
          {
            className: "edui-cancelbutton",
            label: "取消",
            onclick: function () {
              dialog.close(false);
            },
          },
        ],
      });
      dialog.render();
      dialog.open();
    },
  };
  var popup = new baidu.editor.ui.Popup({
    editor: this,
    content: "",
    className: "edui-bubble",
    _edittext: function () {
      baidu.editor.plugins[thePlugins].editdom = popup.anchorEl;
      me.execCommand(thePlugins);
      this.hide();
    },
    _delete: function () {
      if (window.confirm("确认删除该控件吗？")) {
        baidu.editor.dom.domUtils.remove(this.anchorEl, false);
      }
      this.hide();
    },
  });
  popup.render();

  /**
   * 绑定鼠标经过控件
   * 获取当前所处模式 ['设计模式','编辑模式','只读模式','审阅模式']
   * 设计模式下才显示popup
   **/
  me.addListener("mouseover", function (t, evt) {
    var pattern = me.body.getAttribute("pattern"); //获取当前模式
    if (pattern && pattern != "design") {
      return;
    }

    evt = evt || window.event;
    var el = evt.target || evt.srcElement;
    var target = isParentTarget(el, "oakplugin");
    if (!target) {
      popup.hide();
      return;
    }
    var oakplugin = target.getAttribute("oakplugin");
    if (oakplugin == thePlugins) {
      var html = popup.formatHtml(
        "<nobr>" +
          target.getAttribute("title") +
          '   复选框: <span onclick=$$._edittext() class="edui-clickable">编辑</span>  <span onclick=$$._delete() class="edui-clickable">删除</span></nobr>'
      );
      if (html) {
        popup.getDom("content").innerHTML = html;
        popup.anchorEl = target;
        popup.showAnchor(popup.anchorEl);
      } else {
        popup.hide();
      }
    } else {
      popup.hide();
    }
  });

  /**
   * 绑定click事件，只读模式下不可更改复选框/单选框的值
   */
  me.addListener("click", function (t, evt) {
    var pattern = me.body.getAttribute("pattern"); //获取当前模式
    evt = evt || window.event;
    var el = evt.target || evt.srcElement;
    var target = isParentTarget(el, "oakplugin");
    if (target && pattern == "readonly") {
      evt.preventDefault(); //阻止默认行为
      return false;
    }
  });
};

baidu.editor.ui.checkbox = function (editor, list, title) {
  // 创建dialog
  var kfDialog = new UE.ui.Dialog({
    // 指定弹出层路径
    iframeUrl:
      editor.options.UEDITOR_HOME_URL + "dialogs/oak-form/checkbox.html",
    // 编辑器实例
    editor: editor,
    // dialog 名称
    name: "checkbox",
    // dialog 标题
    title: "插入复选框",
    // dialog 外围 css
    cssRules: "width:600px; height:300px;",

    //如果给出了buttons就代表dialog有确定和取消
    buttons: [
      {
        className: "edui-okbutton",
        label: "确定",
        onclick: function () {
          kfDialog.close(true);
        },
      },
      {
        className: "edui-cancelbutton",
        label: "取消",
        onclick: function () {
          kfDialog.close(false);
        },
      },
    ],
  });

  editor.ready(function () {
    UE.utils.cssRule(
      "kfformula",
      "img.kfformula{vertical-align: middle;}",
      editor.document
    );
  });

  var iconUrl = editor.options.UEDITOR_HOME_URL + "imgs/checkbox.png";
  var tmpLink = document.createElement("a");
  tmpLink.href = iconUrl;
  tmpLink.href = tmpLink.href;
  iconUrl = tmpLink.href;

  var kfBtn = new UE.ui.Button({
    name: "checkbox-1",
    title: "插入复选框",
    //需要添加的额外样式，指定icon图标
    className: "edui-for-checkbox-1",
    cssRules: 'background-image: url("' + iconUrl + '") !important',
    onclick: function () {
      //渲染dialog
      kfDialog.render();
      kfDialog.open();
    },
  });

  //当点到编辑内容上时，按钮要做的状态反射
  editor.addListener("selectionchange", function () {
    var state = editor.queryCommandState("checkbox");
    if (state == -1) {
      kfBtn.setDisabled(true);
      kfBtn.setChecked(false);
    } else {
      kfBtn.setDisabled(false);
      kfBtn.setChecked(state);
    }
  });
  return kfBtn;
};

/**
 * 单选框控件
 */
UE.plugins["radio"] = function () {
  var me = this,
    thePlugins = "radio";
  me.commands[thePlugins] = {
    execCommand: function () {
      var dialog = new UE.ui.Dialog({
        //弹出模式以iframe方式打开的控件配置页面 URL
        iframeUrl:
          this.options.UEDITOR_HOME_URL + "dialogs/oak-form/radio.html",
        name: thePlugins,
        editor: this,
        title: "单选框", //弹出框标题
        cssRules: "width:600px;height:300px;",
        buttons: [
          //弹出框按钮集
          {
            className: "edui-okbutton",
            label: "确定",
            onclick: function () {
              dialog.close(true);
            },
          },
          {
            className: "edui-cancelbutton",
            label: "取消",
            onclick: function () {
              dialog.close(false);
            },
          },
        ],
      });
      dialog.render();
      dialog.open();
    },
  };
  var popup = new baidu.editor.ui.Popup({
    editor: this,
    content: "",
    className: "edui-bubble",
    _edittext: function () {
      baidu.editor.plugins[thePlugins].editdom = popup.anchorEl;
      me.execCommand(thePlugins);
      this.hide();
    },
    _delete: function () {
      if (window.confirm("确认删除该控件吗？")) {
        baidu.editor.dom.domUtils.remove(this.anchorEl, false);
      }
      this.hide();
    },
  });
  popup.render();

  /**
   * 绑定鼠标经过控件
   * 获取当前所处模式 ['设计模式','编辑模式','只读模式','审阅模式']
   * 设计模式下才显示popup
   **/
  me.addListener("mouseover", function (t, evt) {
    var pattern = me.body.getAttribute("pattern"); //获取当前模式
    if (pattern && pattern != "design") {
      return;
    }
    evt = evt || window.event;
    var el = evt.target || evt.srcElement;
    var target = isParentTarget(el, "oakplugin");
    if (!target) {
      popup.hide();
      return;
    }
    var oakplugin = target.getAttribute("oakplugin");
    if (oakplugin == thePlugins) {
      var html = popup.formatHtml(
        "<nobr>" +
          target.getAttribute("title") +
          '  单选框: <span onclick=$$._edittext() class="edui-clickable">编辑</span>  <span onclick=$$._delete() class="edui-clickable">删除</span></nobr>'
      );

      if (html) {
        popup.getDom("content").innerHTML = html;
        popup.anchorEl = target;
        popup.showAnchor(popup.anchorEl);
      } else {
        popup.hide();
      }
    }
  });
};

baidu.editor.ui.radio = function (editor, list, title) {
  // 创建dialog
  var kfDialog = new UE.ui.Dialog({
    // 指定弹出层路径
    iframeUrl: editor.options.UEDITOR_HOME_URL + "dialogs/oak-form/radio.html",
    // 编辑器实例
    editor: editor,
    // dialog 名称
    name: "radio",
    // dialog 标题
    title: "插入单选框",
    // dialog 外围 css
    cssRules: "width:600px; height:300px;",

    //如果给出了buttons就代表dialog有确定和取消
    buttons: [
      {
        className: "edui-okbutton",
        label: "确定",
        onclick: function () {
          kfDialog.close(true);
        },
      },
      {
        className: "edui-cancelbutton",
        label: "取消",
        onclick: function () {
          kfDialog.close(false);
        },
      },
    ],
  });
  editor.ready(function () {
    UE.utils.cssRule(
      "kfformula",
      "img.kfformula{vertical-align: middle;}",
      editor.document
    );
  });

  var iconUrl = editor.options.UEDITOR_HOME_URL + "imgs/radio.png";
  var tmpLink = document.createElement("a");
  tmpLink.href = iconUrl;
  tmpLink.href = tmpLink.href;
  iconUrl = tmpLink.href;

  var kfBtn = new UE.ui.Button({
    name: "radio-1",
    title: "插入单选框",
    //需要添加的额外样式，指定icon图标
    className: "edui-for-radio-1",
    cssRules: 'background-image: url("' + iconUrl + '") !important',
    onclick: function () {
      //渲染dialog
      kfDialog.render();
      kfDialog.open();
    },
  });

  //当点到编辑内容上时，按钮要做的状态反射
  editor.addListener("selectionchange", function () {
    var state = editor.queryCommandState("radio");
    if (state == -1) {
      kfBtn.setDisabled(true);
      kfBtn.setChecked(false);
    } else {
      kfBtn.setDisabled(false);
      kfBtn.setChecked(state);
    }
  });
  return kfBtn;
};

/**
 * 单行文本输入框控件
 */
UE.plugins["input"] = function () {
  var me = this,
    thePlugins = "input";
  me.commands[thePlugins] = {
    execCommand: function () {
      var dialog = new UE.ui.Dialog({
        //弹出模式以iframe方式打开的控件配置页面 URL
        iframeUrl:
          this.options.UEDITOR_HOME_URL + "dialogs/oak-form/input.html",
        name: thePlugins,
        editor: this,
        title: "插入文本域输入", //弹出框标题
        cssRules: "width:500px;height:190px;",
        buttons: [
          //弹出框按钮集
          {
            className: "edui-okbutton",
            label: "确定",
            onclick: function () {
              dialog.close(true);
            },
          },
          {
            className: "edui-cancelbutton",
            label: "取消",
            onclick: function () {
              dialog.close(false);
            },
          },
        ],
      });
      dialog.render();
      dialog.open();
    },
  };
  var popup = new baidu.editor.ui.Popup({
    editor: this,
    content: "",
    className: "edui-bubble",
    _edittext: function () {
      baidu.editor.plugins[thePlugins].editdom = popup.anchorEl;
      me.execCommand(thePlugins);
      this.hide();
    },
    _delete: function () {
      if (window.confirm("确认删除该控件吗？")) {
        baidu.editor.dom.domUtils.remove(this.anchorEl, false);
      }
      this.hide();
    },
  });
  popup.render();

  /**
   * 绑定鼠标经过控件
   * 获取当前所处模式 ['设计模式','编辑模式','只读模式','审阅模式']
   * 设计模式下才显示popup
   **/
  me.addListener("mouseover", function (t, evt) {
    var pattern = me.body.getAttribute("pattern"); //获取当前模式
    if (pattern && pattern != "design") {
      return;
    }
    evt = evt || window.event;
    var el = evt.target || evt.srcElement;
    var target = isParentTarget(el, "oakplugin");
    if (!target) {
      popup.hide();
      return;
    }
    var oakplugin = target.getAttribute("oakplugin");
    if (oakplugin == thePlugins) {
      var html = popup.formatHtml(
        "<nobr>" +
          target.getAttribute("title") +
          '   单行文本输入: <span onclick=$$._edittext() class="edui-clickable">编辑</span>  <span onclick=$$._delete() class="edui-clickable">删除</span></nobr>'
      );
      if (html) {
        popup.getDom("content").innerHTML = html;
        popup.anchorEl = target;
        popup.showAnchor(popup.anchorEl);
      } else {
        popup.hide();
      }
    } else {
      popup.hide();
    }
  });
};

baidu.editor.ui.input = function (editor, list, title) {
  // 创建dialog
  var kfDialog = new UE.ui.Dialog({
    // 指定弹出层路径
    iframeUrl: editor.options.UEDITOR_HOME_URL + "dialogs/oak-form/input.html",
    // 编辑器实例
    editor: editor,
    // dialog 名称
    name: "input",
    // dialog 标题
    title: "插入文本域输入",
    // dialog 外围 css
    cssRules: "width:500px; height:190px;",

    //如果给出了buttons就代表dialog有确定和取消
    buttons: [
      {
        className: "edui-okbutton",
        label: "确定",
        onclick: function () {
          kfDialog.close(true);
        },
      },
      {
        className: "edui-cancelbutton",
        label: "取消",
        onclick: function () {
          kfDialog.close(false);
        },
      },
    ],
  });

  editor.ready(function () {
    UE.utils.cssRule(
      "kfformula",
      "img.kfformula{vertical-align: middle;}",
      editor.document
    );
  });

  var iconUrl = editor.options.UEDITOR_HOME_URL + "imgs/input.png";
  var tmpLink = document.createElement("a");
  tmpLink.href = iconUrl;
  tmpLink.href = tmpLink.href;
  iconUrl = tmpLink.href;

  var kfBtn = new UE.ui.Button({
    name: "input-1",
    title: "文本域输入",
    //需要添加的额外样式，指定icon图标
    className: "edui-for-input-1",
    cssRules: 'background-image: url("' + iconUrl + '") !important',
    onclick: function () {
      //渲染dialog
      kfDialog.render();
      kfDialog.open();
    },
  });

  //当点到编辑内容上时，按钮要做的状态反射
  editor.addListener("selectionchange", function () {
    var state = editor.queryCommandState("input");
    if (state == -1) {
      kfBtn.setDisabled(true);
      kfBtn.setChecked(false);
    } else {
      kfBtn.setDisabled(false);
      kfBtn.setChecked(state);
    }
  });
  return kfBtn;
};

/**
 * 多行文本输入框控件
 */
UE.plugins["textarea"] = function () {
  var me = this,
    thePlugins = "textarea";
  me.commands[thePlugins] = {
    execCommand: function () {
      var dialog = new UE.ui.Dialog({
        //弹出模式以iframe方式打开的控件配置页面 URL
        iframeUrl:
          this.options.UEDITOR_HOME_URL + "dialogs/oak-form/textarea.html",
        name: thePlugins,
        editor: this,
        title: "插入多行文本输入", //弹出框标题
        cssRules: "width:600px;height:200px;",
        buttons: [
          //弹出框按钮集
          {
            className: "edui-okbutton",
            label: "确定",
            onclick: function () {
              dialog.close(true);
            },
          },
          {
            className: "edui-cancelbutton",
            label: "取消",
            onclick: function () {
              dialog.close(false);
            },
          },
        ],
      });
      dialog.render();
      dialog.open();
    },
  };
  var popup = new baidu.editor.ui.Popup({
    editor: this,
    content: "",
    className: "edui-bubble",
    _edittext: function () {
      baidu.editor.plugins[thePlugins].editdom = popup.anchorEl;
      me.execCommand(thePlugins);
      this.hide();
    },
    _delete: function () {
      if (window.confirm("确认删除该控件吗？")) {
        baidu.editor.dom.domUtils.remove(this.anchorEl, false);
      }
      this.hide();
    },
  });
  popup.render();

  /**
   * 绑定鼠标经过控件
   * 获取当前所处模式 ['设计模式','编辑模式','只读模式','审阅模式']
   * 设计模式下才显示popup
   **/
  me.addListener("mouseover", function (t, evt) {
    var pattern = me.body.getAttribute("pattern"); //获取当前模式
    if (pattern != "design") {
      return;
    }
    evt = evt || window.event;
    var el = evt.target || evt.srcElement;
    var target = isParentTarget(el, "oakplugin");
    if (!target) {
      popup.hide();
      return;
    }
    var oakplugin = target.getAttribute("oakplugin");
    if (oakplugin == thePlugins) {
      var html = popup.formatHtml(
        "<nobr>" +
          target.getAttribute("title") +
          '  多行文本输入: <span onclick=$$._edittext() class="edui-clickable">编辑</span>  <span onclick=$$._delete() class="edui-clickable">删除</span></nobr>'
      );
      if (html) {
        popup.getDom("content").innerHTML = html;
        popup.anchorEl = target;
        popup.showAnchor(popup.anchorEl);
      } else {
        popup.hide();
      }
    }
  });
};

baidu.editor.ui.textarea = function (editor, list, title) {
  // 创建dialog
  var kfDialog = new UE.ui.Dialog({
    // 指定弹出层路径
    iframeUrl:
      editor.options.UEDITOR_HOME_URL + "dialogs/oak-form/textarea.html",
    // 编辑器实例
    editor: editor,
    // dialog 名称
    name: "textarea",
    // dialog 标题
    title: "多行文本输入",
    // dialog 外围 css
    cssRules: "width:500px; height:200px;",

    //如果给出了buttons就代表dialog有确定和取消
    buttons: [
      {
        className: "edui-okbutton",
        label: "确定",
        onclick: function () {
          kfDialog.close(true);
        },
      },
      {
        className: "edui-cancelbutton",
        label: "取消",
        onclick: function () {
          kfDialog.close(false);
        },
      },
    ],
  });

  editor.ready(function () {
    UE.utils.cssRule(
      "kfformula",
      "img.kfformula{vertical-align: middle;}",
      editor.document
    );
  });

  var iconUrl = editor.options.UEDITOR_HOME_URL + "imgs/textarea.png";
  var tmpLink = document.createElement("a");
  tmpLink.href = iconUrl;
  tmpLink.href = tmpLink.href;
  iconUrl = tmpLink.href;

  var kfBtn = new UE.ui.Button({
    name: "textarea-1",
    title: "插入多行文本输入",
    //需要添加的额外样式，指定icon图标
    className: "edui-for-textarea-1",
    cssRules: 'background-image: url("' + iconUrl + '") !important',
    onclick: function () {
      //渲染dialog
      kfDialog.render();
      kfDialog.open();
    },
  });

  //当点到编辑内容上时，按钮要做的状态反射
  editor.addListener("selectionchange", function () {
    var state = editor.queryCommandState("textarea");
    if (state == -1) {
      kfBtn.setDisabled(true);
      kfBtn.setChecked(false);
    } else {
      kfBtn.setDisabled(false);
      kfBtn.setChecked(state);
    }
  });
  return kfBtn;
};

/**
 * select下拉框输入框控件
 */
UE.plugins["select"] = function () {
  var me = this,
    thePlugins = "select";
  me.commands[thePlugins] = {
    execCommand: function () {
      var dialog = new UE.ui.Dialog({
        //弹出模式以iframe方式打开的控件配置页面 URL
        iframeUrl:
          this.options.UEDITOR_HOME_URL + "dialogs/oak-form/select.html",
        name: thePlugins,
        editor: this,
        title: "插入下拉框", //弹出框标题
        cssRules: "width:600px;height:300px;",
        buttons: [
          //弹出框按钮集
          {
            className: "edui-okbutton",
            label: "确定",
            onclick: function () {
              dialog.close(true);
            },
          },
          {
            className: "edui-cancelbutton",
            label: "取消",
            onclick: function () {
              dialog.close(false);
            },
          },
        ],
      });
      dialog.render();
      dialog.open();
    },
  };
  var popup = new baidu.editor.ui.Popup({
    editor: this,
    content: "",
    className: "edui-bubble",
    _edittext: function () {
      baidu.editor.plugins[thePlugins].editdom = popup.anchorEl;
      me.execCommand(thePlugins);
      this.hide();
    },
    _delete: function () {
      if (window.confirm("确认删除该控件吗？")) {
        baidu.editor.dom.domUtils.remove(this.anchorEl, false);
      }
      this.hide();
    },
  });
  popup.render();

  /**
   * 绑定鼠标经过控件
   * 获取当前所处模式 ['设计模式','编辑模式','只读模式','审阅模式']
   * 设计模式下才显示popup
   **/
  me.addListener("mouseover", function (t, evt) {
    var pattern = me.body.getAttribute("pattern"); //获取当前模式
    if (pattern && pattern != "design") {
      return;
    }
    evt = evt || window.event;
    var el = evt.target || evt.srcElement;
    var target = isParentTarget(el, "oakplugin");
    var parentSelect = isParentTarget(el, "data-type");
    if (!target || parentSelect) {
      popup.hide();
      return;
    }
    var oakplugin = target.getAttribute("oakplugin");
    if (oakplugin == thePlugins && !parentSelect) {
      var html = popup.formatHtml(
        "<nobr>" +
          target.getAttribute("title") +
          '   下拉框: <span onclick=$$._edittext() class="edui-clickable">编辑</span>  <span onclick=$$._delete() class="edui-clickable">删除</span></nobr>'
      );
      if (html) {
        popup.getDom("content").innerHTML = html;
        popup.anchorEl = target;
        popup.showAnchor(popup.anchorEl);
      } else {
        popup.hide();
      }
    }
  });

  //绑定鼠标单击控件  实现自定义下拉列表
  me.addListener("click", function (t, evt) {
    var pattern = me.body.getAttribute("pattern"); //获取当前模式
    if (pattern && pattern == "readonly") {
      return;
    }
    evt = evt || window.event;
    var el = evt.target || evt.srcElement;
    var target = isParentTarget(el, "oakplugin");
    var parentSelect = isParentTarget(el, "data-type");
    //隐藏所有下拉选框
    var body = getBodyTarget(el);
    try {
      var oakSelect = body.getElementsByClassName("oak-select-root");
      for (var i = 0; i < oakSelect.length; i++) {
        oakSelect[i].style.display = "none";
      }
    } catch (err) {}

    if (!target) {
      return;
    }

    var model = eval("(" + target.getAttribute("obj") + ")") || {};
    var selectValue = model.defaultValue;
    var bindData = model.bindData || [];
    if (model.type != "select" || bindData.length == 0) {
      return;
    }
    if (target.getElementsByClassName("oak-select-root").length == 0) {
      var selectEl = document.createElement("span");
      selectEl.className = "oak-field oak-select-root";
      var html =
        '<span class="oak-select-content oak-field"><span class="oak-select oak-field" data-type="select">'; //生成html
      for (var i = 0; i < bindData.length; i++) {
        html +=
          '<span class="' +
          (bindData[i].SELECTED ? "selected oak-field li" : "oak-field li") +
          '" value="' +
          bindData[i].VALUE +
          '" title="' +
          bindData[i].TEXT +
          '">' +
          bindData[i].TEXT +
          "</span>";
      }
      html += "</span></span>";
      selectEl.innerHTML = html;
      //selectEl.style.display = 'inline';
      console.log(html, "html=========");
      target.appendChild(selectEl);
    } else {
      target.getElementsByClassName("oak-select-root")[0].style.display = "";
    }
    //实现下拉选中
    if (parentSelect) {
      var allLis = parentSelect.getElementsByClassName("li");
      for (var i = 0; i < allLis.length; i++) {
        allLis[i].className = "oak-field li";
      }
      selectValue = el.getAttribute("title");
      el.className = "oak-field selected li";
      target.getElementsByClassName(
        "oak-field-value"
      )[0].innerHTML = selectValue;
      target.getElementsByClassName("oak-select-root")[0].style.display =
        "none";
    }
  });
};

baidu.editor.ui.select = function (editor, list, title) {
  // 创建dialog
  var kfDialog = new UE.ui.Dialog({
    // 指定弹出层路径
    iframeUrl: editor.options.UEDITOR_HOME_URL + "dialogs/oak-form/select.html",
    // 编辑器实例
    editor: editor,
    // dialog 名称
    name: "select",
    // dialog 标题
    title: "插入下拉框",
    // dialog 外围 css
    cssRules: "width:600px; height:300px;",

    //如果给出了buttons就代表dialog有确定和取消
    buttons: [
      {
        className: "edui-okbutton",
        label: "确定",
        onclick: function () {
          kfDialog.close(true);
        },
      },
      {
        className: "edui-cancelbutton",
        label: "取消",
        onclick: function () {
          kfDialog.close(false);
        },
      },
    ],
  });
  editor.ready(function () {
    UE.utils.cssRule(
      "kfformula",
      "img.kfformula{vertical-align: middle;}",
      editor.document
    );
  });

  var iconUrl = editor.options.UEDITOR_HOME_URL + "imgs/select.png";
  var tmpLink = document.createElement("a");
  tmpLink.href = iconUrl;
  tmpLink.href = tmpLink.href;
  iconUrl = tmpLink.href;

  var kfBtn = new UE.ui.Button({
    name: "select-1",
    title: "下拉框",
    //需要添加的额外样式，指定icon图标
    className: "edui-for-select-1",
    cssRules: 'background-image: url("' + iconUrl + '") !important',
    onclick: function () {
      //渲染dialog
      kfDialog.render();
      kfDialog.open();
    },
  });

  //当点到编辑内容上时，按钮要做的状态反射
  editor.addListener("selectionchange", function () {
    var state = editor.queryCommandState("select");
    if (state == -1) {
      kfBtn.setDisabled(true);
      kfBtn.setChecked(false);
    } else {
      kfBtn.setDisabled(false);
      kfBtn.setChecked(state);
    }
  });
  return kfBtn;
};

/**
 * timeinput时间输入框控件
 */
UE.plugins["timeinput"] = function () {
  var me = this,
    thePlugins = "timeinput";
  me.commands[thePlugins] = {
    execCommand: function () {
      var dialog = new UE.ui.Dialog({
        //弹出模式以iframe方式打开的控件配置页面 URL
        iframeUrl:
          this.options.UEDITOR_HOME_URL + "dialogs/oak-form/timeinput.html",
        name: thePlugins,
        editor: this,
        title: "插入日期输入框", //弹出框标题
        cssRules: "width:540px;height:250px;",
        buttons: [
          //弹出框按钮集
          {
            className: "edui-okbutton",
            label: "确定",
            onclick: function () {
              dialog.close(true);
            },
          },
          {
            className: "edui-cancelbutton",
            label: "取消",
            onclick: function () {
              dialog.close(false);
            },
          },
        ],
      });
      dialog.render();
      dialog.open();
    },
  };
  var popup = new baidu.editor.ui.Popup({
    editor: this,
    content: "",
    className: "edui-bubble",
    _edittext: function () {
      baidu.editor.plugins[thePlugins].editdom = popup.anchorEl;
      me.execCommand(thePlugins);
      this.hide();
    },
    _delete: function () {
      if (window.confirm("确认删除该控件吗？")) {
        baidu.editor.dom.domUtils.remove(this.anchorEl, false);
      }
      this.hide();
    },
  });
  popup.render();

  /**
   * 绑定鼠标经过控件
   * 获取当前所处模式 ['设计模式','编辑模式','只读模式','审阅模式']
   * 设计模式下才显示popup
   **/
  me.addListener("mouseover", function (t, evt) {
    var pattern = me.body.getAttribute("pattern"); //获取当前模式
    if (pattern && pattern != "design") {
      return;
    }
    evt = evt || window.event;
    var el = evt.target || evt.srcElement;
    var target = isParentTarget(el, "oakplugin");
    if (!target) {
      popup.hide();
      return;
    }
    var oakplugin = target.getAttribute("oakplugin");
    if (oakplugin == thePlugins) {
      var html = popup.formatHtml(
        "<nobr>" +
          target.getAttribute("title") +
          '   日期输入框: <span onclick=$$._edittext() class="edui-clickable">编辑</span>  <span onclick=$$._delete() class="edui-clickable">删除</span></nobr>'
      );
      if (html) {
        popup.getDom("content").innerHTML = html;
        popup.anchorEl = target;
        popup.showAnchor(popup.anchorEl);
      } else {
        popup.hide();
      }
    }
  });
  var body = me.body;
  //绑定鼠标单击控件 绑定在dom元素上
  me.addListener("click", function (t, evt) {
    evt = evt || window.event;
    var el = evt.target || evt.srcElement;
    var target = isParentTarget(el, "oakplugin");
    var bindClick = el.getAttribute("bindclick");
    if (target && bindClick) {
      var obj = eval("(" + target.getAttribute("obj") + ")");
    }
  });
};

baidu.editor.ui.timeinput = function (editor, list, title) {
  // 创建dialog
  var kfDialog = new UE.ui.Dialog({
    // 指定弹出层路径
    iframeUrl:
      editor.options.UEDITOR_HOME_URL + "dialogs/oak-form/timeinput.html",
    // 编辑器实例
    editor: editor,
    // dialog 名称
    name: "timeinput",
    // dialog 标题
    title: "插入时间输入控件",
    // dialog 外围 css
    cssRules: "width:540px; height:250px;",

    //如果给出了buttons就代表dialog有确定和取消
    buttons: [
      {
        className: "edui-okbutton",
        label: "确定",
        onclick: function () {
          kfDialog.close(true);
        },
      },
      {
        className: "edui-cancelbutton",
        label: "取消",
        onclick: function () {
          kfDialog.close(false);
        },
      },
    ],
  });

  editor.ready(function () {
    UE.utils.cssRule(
      "kfformula",
      "img.kfformula{vertical-align: middle;}",
      editor.document
    );
  });

  var iconUrl = editor.options.UEDITOR_HOME_URL + "imgs/timeinput.png";
  var tmpLink = document.createElement("a");
  tmpLink.href = iconUrl;
  tmpLink.href = tmpLink.href;
  iconUrl = tmpLink.href;

  var kfBtn = new UE.ui.Button({
    name: "timeinput-1",
    title: "日期输入框",
    //需要添加的额外样式，指定icon图标
    className: "edui-for-timeinput-1",
    cssRules: 'background-image: url("' + iconUrl + '") !important',
    onclick: function () {
      //渲染dialog
      kfDialog.render();
      kfDialog.open();
    },
  });

  //当点到编辑内容上时，按钮要做的状态反射
  editor.addListener("selectionchange", function () {
    var state = editor.queryCommandState("select");
    if (state == -1) {
      kfBtn.setDisabled(true);
      kfBtn.setChecked(false);
    } else {
      kfBtn.setDisabled(false);
      kfBtn.setChecked(state);
    }
  });
  return kfBtn;
};

/**
 * 获取页面所有控件
 */
UE.plugins["allwidgets"] = function () {
  var me = this,
    thePlugins = "allwidgets";
  me.commands[thePlugins] = {
    execCommand: function () {
      var $body = this.body;
      // 获取id为oakplgin的对象
      var $children = $body.getElementsByClassName("oakplugin");
      var widgets = [];
      var wstr = "";
      for (var i = 0; i < $children.length; i++) {
        var obj = eval("(" + $children[i].getAttribute("obj") + ")");
        var oakplugin = $children[i].getAttribute("oakplugin");
        var value = '';
        if (oakplugin == "input" || oakplugin == "select") {
          var target = $children[i].getElementsByClassName(
            "oak-field-value"
          )[0];
          if(target)
            value = target.innerText;
        } else if (oakplugin == "timeinput") {
          var target = $children[i].getElementsByTagName("input")[1];
          if(target)
            value = target.value;
        } else if (oakplugin == "checkbox" || oakplugin == "radio") {
          var inputs = $children[i].getElementsByTagName("input");
          value = [];
          for (var j = 0; j < inputs.length; j++) {
            if (inputs[j].checked) {
              value.push(inputs[j].value);
            }
          }
        }
        widgets.push({
          type: oakplugin,
          value: value,
          data: obj,
          target: $children[i],
        });
        wstr =
          wstr +
          "控件id:" +
          $children[i].id +
          "              控件值:" +
          value +
          "\n";
      }
      // alert(wstr);
      console.log(wstr);
      return widgets;
    },
  };
};
baidu.editor.ui.allwidgets = function (editor, list, title) {
  var iconUrl = editor.options.UEDITOR_HOME_URL + "imgs/allwidgets.png";
  var tmpLink = document.createElement("a");
  tmpLink.href = iconUrl;
  tmpLink.href = tmpLink.href;
  iconUrl = tmpLink.href;

  var kfBtn = new UE.ui.Button({
    name: "allwidgets-1",
    title: "获取所有控件",
    //需要添加的额外样式，指定icon图标
    className: "edui-for-allwidgets-1",
    onclick: function () {
      editor.execCommand("allwidgets");
    },
  });

  //当点到编辑内容上时，按钮要做的状态反射
  editor.addListener("selectionchange", function () {
    var state = editor.queryCommandState("select");
    if (state == -1) {
      kfBtn.setDisabled(true);
      kfBtn.setChecked(false);
    } else {
      kfBtn.setDisabled(false);
      kfBtn.setChecked(state);
    }
  });
  return kfBtn;
};
/**
 * 获取页面所有控件
 */
UE.plugins["allhtml"] = function () {
  var me = this,
    thePlugins = "allhtml";
  me.commands[thePlugins] = {
    execCommand: function () {
      // console.log(me.getAllHtml());
      alert(me.getAllHtml());
      return me.getAllHtml();
    },
  };
};
baidu.editor.ui.allhtml = function (editor, list, title) {
  var iconUrl = editor.options.UEDITOR_HOME_URL + "imgs/allhtml.png";
  var tmpLink = document.createElement("a");
  tmpLink.href = iconUrl;
  tmpLink.href = tmpLink.href;
  iconUrl = tmpLink.href;

  var kfBtn = new UE.ui.Button({
    name: "allhtml-1",
    title: "获取编辑器html",
    //需要添加的额外样式，指定icon图标
    className: "edui-for-allhtml-1",
    onclick: function () {
      editor.execCommand("allhtml");
    },
  });

  //当点到编辑内容上时，按钮要做的状态反射
  editor.addListener("selectionchange", function () {
    var state = editor.queryCommandState("select");
    if (state == -1) {
      kfBtn.setDisabled(true);
      kfBtn.setChecked(false);
    } else {
      kfBtn.setDisabled(false);
      kfBtn.setChecked(state);
    }
  });
  return kfBtn;
};

/**
 * 批注插件
 */
UE.plugins["insertcmt"] = function () {
  var me = this,
    thePlugins = "insertcmt";
  me.commands[thePlugins] = {
    execCommand: function () {
      var dialog = new UE.ui.Dialog({
        //弹出模式以iframe方式打开的控件配置页面 URL
        iframeUrl:
          this.options.UEDITOR_HOME_URL + "dialogs/comments/commentDialog.html",
        name: thePlugins,
        editor: this,
        title: "批注", //弹出框标题
        cssRules: "width:422px;height:150px;",
        buttons: [
          //弹出框按钮集
          {
            className: "edui-okbutton",
            label: "确定",
            onclick: function () {
              dialog.close(true);
            },
          },
          {
            className: "edui-cancelbutton",
            label: "取消",
            onclick: function () {
              dialog.close(false);
            },
          },
        ],
      });
      dialog.render();
      dialog.open();
    },
  };
  var popup = new baidu.editor.ui.Popup({
    editor: this,
    content: "",
    className: "edui-bubble",
    _edittext: function () {
      baidu.editor.plugins[thePlugins].editdom = popup.anchorEl;
      me.execCommand(thePlugins);
      this.hide();
    },
    _delete: function () {
      if (window.confirm("确认删除该控件吗？")) {
        baidu.editor.dom.domUtils.remove(this.anchorEl, false);
      }
      this.hide();
    },
  });
  popup.render();

  /**
   * 绑定鼠标经过控件
   * 获取当前所处模式 ['设计模式','编辑模式','只读模式','审阅模式']
   * 设计模式下才显示popup
   **/
  me.addListener("mouseover", function (t, evt) {
    var pattern = me.body.getAttribute("pattern"); //获取当前模式
    if (pattern && pattern != "design") {
      return;
    }
    evt = evt || window.event;
    var el = evt.target || evt.srcElement;
    var target = isParentTarget(el, "oakplugin");
    if (!target) {
      popup.hide();
      return;
    }
    var oakplugin = target.getAttribute("oakplugin");
    if (oakplugin == thePlugins) {
      var html = popup.formatHtml(
        "<nobr>" +
          target.getAttribute("title") +
          '   单行文本输入: <span onclick=$$._edittext() class="edui-clickable">编辑</span>  <span onclick=$$._delete() class="edui-clickable">删除</span></nobr>'
      );
      if (html) {
        popup.getDom("content").innerHTML = html;
        popup.anchorEl = target;
        popup.showAnchor(popup.anchorEl);
      } else {
        popup.hide();
      }
    } else {
      popup.hide();
    }
  });
};

baidu.editor.ui.insertcmt = function (editor, list, title) {
  // 创建dialog
  var cmdDialog = new UE.ui.Dialog({
    // 指定弹出层路径
    iframeUrl:
      editor.options.UEDITOR_HOME_URL + "dialogs/comments/commentDialog.html",
    // 编辑器实例
    editor: editor,
    // dialog 名称
    name: "insertcmt",
    // dialog 标题
    title: "新建批注",
    // dialog 外围 css
    cssRules: "width:422px;height:150px;",

    //如果给出了buttons就代表dialog有确定和取消
    buttons: [
      {
        className: "edui-okbutton",
        label: "确定",
        onclick: function () {
          cmdDialog.close(true);
        },
      },
      {
        className: "edui-cancelbutton",
        label: "取消",
        onclick: function () {
          cmdDialog.close(false);
        },
      },
    ],
  });

  // dialog塞到全局下
  editor.ui._dialogs.cmdDialog = cmdDialog;
  var iconUrl = editor.options.UEDITOR_HOME_URL + "imgs/newComment.png";
  var tmpLink = document.createElement("a");
  tmpLink.href = iconUrl;
  tmpLink.href = tmpLink.href;
  iconUrl = tmpLink.href;

  var cmtBtn = new UE.ui.Button({
    name: "insertcmt-1",
    title: "新建批注",
    //需要添加的额外样式，指定icon图标
    className: "edui-for-insertcmt-1",
    cssRules: 'background-image: url("' + iconUrl + '") !important',
    onclick: function () {
      // 判断是否选中一块区域
      var range = editor.selection.getRange();
      if (!range.collapsed) {
        //渲染dialog
        cmdDialog.render();
        cmdDialog.open();
      } else {
        alert("请选择需要添加批注的内容！");
        return;
      }
    },
  });

  //当点到编辑内容上时，按钮要做的状态反射
  editor.addListener("selectionchange", function () {
    var state = editor.queryCommandState("insertcmt");
    if (state == -1) {
      cmtBtn.setDisabled(true);
      cmtBtn.setChecked(false);
    } else {
      cmtBtn.setDisabled(false);
      cmtBtn.setChecked(state);
    }
  });
  return cmtBtn;
};

/**
 * 显示批注
 */
UE.plugins["hidecmt"] = function () {
  var me = this,
    thePlugins = "hidecmt";
  me.commands[thePlugins] = {
    execCommand: function () {
      var markList = me.document.getElementsByTagName("mark");
      UE.utils.each(markList, function (value, key) {
        if (value.getAttribute("plugins") == "postil") {
          value.setAttribute("plugins", "hidepostil");
          UE.dom.domUtils.removeStyle(value, "background-color");
        }
      });
    },
  };
};
baidu.editor.ui.hidecmt = function (editor, list, title) {
  var iconUrl = editor.options.UEDITOR_HOME_URL + "imgs/hidePostil.png";
  var tmpLink = document.createElement("a");
  tmpLink.href = iconUrl;
  tmpLink.href = tmpLink.href;
  iconUrl = tmpLink.href;

  var btn = new UE.ui.Button({
    name: "hidecmt-1",
    title: "隐藏批注",
    //需要添加的额外样式，指定icon图标
    className: "edui-for-hidecmt-1",
    cssRules: 'background-image: url("' + iconUrl + '") !important',
    onclick: function () {
      editor.execCommand("hidecmt");
    },
  });
  return btn;
};

/**
 * 显示批注
 */
UE.plugins["showcmt"] = function () {
  var me = this,
    thePlugins = "showcmt";
  me.commands[thePlugins] = {
    execCommand: function () {
      console.log("展示批注。。。。");
      var markList = me.document.getElementsByTagName("mark");
      UE.utils.each(markList, function (value, key) {
        if (value.getAttribute("plugins") == "hidepostil") {
          value.setAttribute("plugins", "postil");
          UE.dom.domUtils.setStyle(
            value,
            "background-color",
            "rgb(255, 255, 0)"
          );
        }
      });
    },
  };
};
baidu.editor.ui.showcmt = function (editor, list, title) {
  var iconUrl = editor.options.UEDITOR_HOME_URL + "imgs/showPostil.png";
  var tmpLink = document.createElement("a");
  tmpLink.href = iconUrl;
  tmpLink.href = tmpLink.href;
  iconUrl = tmpLink.href;

  var btn = new UE.ui.Button({
    name: "showcmt-1",
    title: "显示批注",
    //需要添加的额外样式，指定icon图标
    className: "edui-for-showcmt-1",
    cssRules: 'background-image: url("' + iconUrl + '") !important',
    onclick: function () {
      editor.execCommand("showcmt");
    },
  });
  return btn;
};

/**
 * 留痕插件
 */
UE.plugins["trace"] = function () {
  var me = this;
  var domUtils = UE.dom.domUtils;
  // 批注的标签
  var tag = "mark";

  function optimize(range) {
    var start = range.startContainer,
      end = range.endContainer;

    if ((start = domUtils.findParentByTagName(start, tag, true))) {
      range.setStartBefore(start);
    }
    if ((end = domUtils.findParentByTagName(end, tag, true))) {
      range.setEndAfter(end);
    }
  }

  function getPreviousNode(range) {
    var start = range.startContainer,
      end = range.endContainer;
  }

  // postil命令
  me.commands["trace"] = {
    // 添加批注
    execCommand: function (cmdName, opt) {
      console.log(cmdName, "cmdName===", opt);
      //获取当前选区
      var range = me.selection.getRange();
      // 判断是否选中一个批注
      var trace = range.collapsed
        ? me.queryCommandValue("trace")
        : me.selection.getStart();
      if (
        trace &&
        trace.tagName.toLowerCase() == tag.toLowerCase() &&
        trace.getAttribute("plugins") == "trace"
      ) {
        trace.setAttribute("author", opt.author);
      } else {
        if (opt.type === "del") {
          var contents = range.cloneContents();
          console.log(contents, "contents");
          // 将选取用mark标签包起来，并赋予属性
          var markRange = range.applyInlineStyle(tag, {
            style:
              "text-decoration: line-through;color: rgb(151, 71, 6);font-style: normal;",
            plugins: "trace",
            // contentEditable: 'false',
            author: opt.author,
          });
        } else {
          var contentsadd = range.cloneContents();
          console.log(contentsadd, "contentsadd");
          // 将选取用mark标签包起来，并赋予属性
          var markaddRange = range.applyInlineStyle("mark", {
            style:
              "text-decoration: underline;color: rgb(151, 71, 6);font-style: normal;",
            plugins: "trace",
            // contentEditable: 'false',
            author: opt.author,
          });
        }
      }

      range.collapse().select(true);
    },

    // 返回当前选中的第一个批注节点
    queryCommandValue: function () {
      var range = this.selection.getRange(),
        node;
      node = range.startContainer;
      node = node.nodeType == 1 ? node : node.parentNode;
      if (
        node &&
        (node = domUtils.findParentByTagName(node, tag, true)) &&
        !domUtils.isInNodeEndBoundary(range, node)
      ) {
        return node;
      }
    },
  };
  // var ue = UE.getEditor('ueditor');
  // console.log('===')
  // $(ue).bind('DOMNodeInserted', function (e) {
  //   alert('element now contains: ' + $(e.target).html());
  // });
  me.addListener("keydown", function (t, evt) {
    // alert('00')
    var pattern = me.body.getAttribute("pattern"); //获取当前模式
    var range = me.selection.getRange(),
      bookmark;

    if (pattern && pattern != "trace") {
      return;
    }
    var ue = UE.getEditor("ueditor");
    ue.addListener("DOMNodeInserted", function (e) {
      // alert('element now contains: ' + $(e.target).html())
    });
    console.log(range, "range-------");
    var trace = range.collapsed
      ? me.queryCommandValue("trace")
      : me.selection.getStart();
    if (pattern && pattern == "trace") {
      if (range.endOffset - range.startOffset > 0) {
        if (window.event.keyCode == "8" || window.event.keyCode == "46") {
          if (!range.collapsed) {
            me.execCommand("trace", {
              // 这里的批注人可根据需求，获取登录的用户名，这里暂用admin代替
              author: "admin",
              type: "del",
            });
            window.event.keyCode = 0;
            window.event.returnValue = false;
            return false;
          } else {
            // alert("请选择需要添加留痕的内容！");
            window.event.keyCode = 0;
            window.event.returnValue = false;
            return false;
          }
        }
      } else {
        me.execCommand("trace", {
          // 这里的批注人可根据需求，获取登录的用户名，这里暂用admin代替
          author: "admin",
          type: "add",
        });
      }
    }
  });
  var popup = new baidu.editor.ui.Popup({
    editor: this,
    content: "",
    className: "edui-bubble",
  });
  popup.render();
  me.addListener("mouseover", function (t, evt) {
    evt = evt || window.event;
    var el = evt.target || evt.srcElement;

    domUtils.findParent(
      el,
      function (node) {
        if (
          eval("/" + tag + "/ig").test(node.tagName) &&
          node.getAttribute("plugins") == "trace"
        ) {
          var author = node.getAttribute("author");

          // 判断是批改试卷还是查看批改 用以判断是否显示编辑删除按钮
          var pathname = parent.location.pathname;
          var pagename = pathname.slice(pathname.lastIndexOf("/") + 1);

          var html = popup.formatHtml(
            '<div style="width:100px;">' + "由" + author + "删除" + "</div>"
          );
          if (html) {
            popup.getDom("content").innerHTML = html;
            popup.anchorEl = node;
            popup.showAnchor(popup.anchorEl);
          } else {
            popup.hide();
          }
        }
      },
      true
    );
  });
};
UE.commands["repage"] = {
  execCommand: function () {
    var abc = null;
    if(document.getElementById("ueditor_0"))
      abc = document.getElementById("ueditor_0").contentWindow;
    else if(document.getElementById("ueditor_1"))
      abc = document.getElementById("ueditor_1").contentWindow;
    var editor_header = abc.document.getElementById("editor-header");
    var editor_footer = abc.document.getElementById("editor-footer");
    var headerH = 0,
      footerH = 0;
    if (editor_header != null) {
      headerH = editor_header.offsetHeight;
    }
    if (editor_footer != null) {
      footerH = editor_footer.offsetHeight;
    }
    var height = 940;
    var pageindex = 0;
    var innerhtmlH = "";
    if (editor_header) {
      innerhtmlH = editor_header.innerHTML;
    } else {
      innerhtmlF = "页眉";
    }
    var innerhtmlF = "";
    if (editor_footer) {
      innerhtmlF = editor_footer.innerHTML;
    } else {
      innerhtmlF = "页脚";
    }
    var add = [];
    var remove = [];
    var tags = abc.document.getElementById("editarea").children;
    for (var i = 0; i < tags.length; i++) {
      if (
        tags[i].id == "repage" ||
        tags[i].id == "repagehd" ||
        tags[i].id == "repagefd" ||
        tags[i].id == "showpageindex"
      ) {
        remove.push(tags[i]);
      }
    }
    for (var re = 0; re < remove.length; re++) {
      tags[0].parentNode.removeChild(remove[re]);
    }
    var tabheip = 0;
    var tabtop = 0;
    for (var i = 0; i < tags.length; i++) {
      var offsetHeight = 0;
      var offsetTop = 0;
      var tabhei = 0;
      if (tags[i].nodeName == "TABLE") {
        tabtop = tags[i].offsetTop;
        tabhei = tags[i].offsetHeight;
        offsetTop = tabhei + tabtop;
        var multiple = offsetTop / height;
        var index = parseInt(multiple);
        if (index > pageindex) {
          add.push(tags[i]);
          pageindex = index;
          tabheip = tabhei;
        }
        // }
      } else {
        if (tabheip > 0) {
          offsetHeight = tags[i].offsetHeight;
          offsetTop = tags[i].offsetTop - tabhei - tabtop + height;
          var multiple = offsetTop / height;
          var index = parseInt(multiple);
          if (index > pageindex) {
            add.push(tags[i]);
            pageindex = index;
            tabheip = 0;
          }
        } else {
          offsetHeight = tags[i].offsetHeight;
          offsetTop = tags[i].offsetTop;
          var multiple = offsetTop / height;
          var index = parseInt(multiple);
          if (index > pageindex) {
            add.push(tags[i]);
            pageindex = index;
          }
        }
      }
    }
    for (var a = 0; a < add.length; a++) {
      console.log(pageindex, "pageindex");
      $(add[a]).before(
        '<div id="repagefd"  class="adds">' + innerhtmlF + "</div>"
      );
      $(add[a]).before(
        '<div id="showpageindex"  class="adds" style="width:100%;text-align:center;">第' +
          (a + 1) +
          "页</div>"
      );
      $(add[a]).before(
        '<hr class="pagebreak" id="repage"  noshade="noshade" size="5" style="-webkit-user-select: none;page-break-after:always" />'
      );
      $(add[a]).before(
        '<div id="repagehd" class="adds"  style="">' + innerhtmlH + "</div>"
      );
    }
  },
  notNeedUndo: 1,
};
/**
 * 插入公式
 * @command formulas
 * @method execCommand
 * @param { String } cmd 命令字符串
 * @param { Object } opt 属性键值对，这些属性都将被复制到当前插入图片
 * @remind 该命令第二个参数可接受一个图片配置项对象的数组，可以插入多张图片，
 * 此时数组的每一个元素都是一个Object类型的图片属性集合。
 */

UE.commands["formulas"] = {
  execCommand: function (cmd, selectType, url, data) {
    var me = this;
    var ue = UE.getEditor("ueditor");
    var imgs = ue.document.querySelectorAll(".expressionImg");
    var imgid = JSON.parse(localStorage.getItem("clickimgid")) || "";
    var aa = function () {};
    if (imgid !== "") {
      ue.document.getElementById(imgid).src = url;
      ue.document
        .getElementById(imgid)
        .setAttribute("data", JSON.stringify(data));
      localStorage.setItem("clickimg", JSON.stringify({}));
      localStorage.setItem("clickimgid", JSON.stringify(""));
    } else {
      var range = this.selection.getRange();
      var node = document.createElement("img");
      node.setAttribute("id", "expression" + imgs.length);
      node.setAttribute("class", "expressionImg");
      node.setAttribute("src", url);
      node.setAttribute("data", JSON.stringify(data));
      node.ondblclick = function () {
        var range = me.selection.getRange();
        if (!range.collapsed) {
          var img = range.getClosedNode();
          if (img && img.tagName == "IMG") {
            if (img.getAttribute("class") == "expressionImg") {
              var attr = eval("(" + img.getAttribute("data") + ")");
              localStorage.setItem("clickimg", JSON.stringify(attr));
              localStorage.setItem("clickimgid", JSON.stringify(img.id));
              me.ui._dialogs["formulasDialog"] &&
                me.ui._dialogs["formulasDialog"].open();
            }
          }
        }
      };
      range.insertNode(node);
    }
  },
};
UE.plugins["dicom"] = function () {
  var me = this,
    thePlugins = "dicom";
  me.commands[thePlugins] = {
    execCommand: function (url) {
      console.log(url, "url==============");
    },
  };
};
