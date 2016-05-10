/**
 * simple popup
 * 
 * @Author blue0125@gmail.com
 * @usage
 * new popup().show()
 * param
 *     title
 *     content
 *     ok: function
 *     okValue: 确认
 *     cancel: function
 *     cancelValue: 取消
 */

!(function($){

    function popup(opts) {
        this.opts = opts;

        if (this.opts.title !== false) {
            if (this.opts.title) {
                this.opts.title = opts.title;
            } else {
                this.opts.title = '提醒';
            }
        }
        this.opts.id = "popup_" + new Date().getTime();
        this.opts.content = this.opts.content ? this.opts.content : '操作成功！';
        this.opts.okValue = this.opts.okValue ? this.opts.okValue : '确定';
        this.opts.cancelValue = this.opts.cancelValue ? this.opts.cancelValue : '';
        this.opts.ok = this.opts.ok ? this.opts.ok : '';
        this.opts.cancel = this.opts.cancel ? this.opts.cancel : '';
    }

    popup.prototype.show = function() {
        var _this = this;
        _this.htmlInit();
        _this.bindEvent();
    }

    popup.prototype.htmlInit = function() {
        var _this = this;

        var html = '<div id='+ _this.opts.id +' class="c-smartpop-wrap"><div class="c-smartpop">';

        if (_this.opts.title === false) {
            html += '';
        } else if (_this.opts.title) {
            html += '<section class="hd">'+_this.opts.title+'<a href="javascript:void(0)"></a></section>'
        }

        if (_this.opts.content) {
            html += '<section class="bd">'+_this.opts.content+'</section>';
        }

        if (_this.opts.btns == false) {
            html += '';
        } else {
            html += '<section class="ft"><section class="action">';
            if (_this.opts.cancelValue) {
                html += '<a href="javascript:void(0)" class="cancel">'+_this.opts.cancelValue+'</a>';
            }
            if (_this.opts.okValue) {
                html += '<a href="javascript:void(0)" class="ok">'+_this.opts.okValue+'</a>';
            }
            html += '</section></section>';
        }

        // $("body").append(_this.sprintf(html, _this.opts.title,_this.opts.content,_this.opts.okValue));
        $("body").append(html);

        if (!$("#J_Shade").length) $("body").append("<div id='J_Shade' class='none'>");
        $("#J_Shade").show();
    }

    popup.prototype.sprintf = function() {
        var arg = arguments,
            str = arg[0] || '',
            i, n;
        for (i = 1, n = arg.length; i < n; i++) {
            str = str.replace(/%s/, arg[i]);
        }
        return str;
    }

    popup.prototype.bindEvent = function() {
        var _this = this;
        var selectId="#"+_this.opts.id;

        $(document).on('click', selectId + " .c-smartpop .hd a", function() {
            _this.close();
        });

        if (_this.opts.cancel && typeof _this.opts.cancel == 'function') {
            $(document).on('click', selectId + " .c-smartpop .action a.cancel", function() {
                var f = _this.opts.cancel;
                f.call(_this);
                _this.close();
            });
        }

        if (_this.opts.ok && typeof _this.opts.ok == 'function') {
            $(document).on('click', selectId + " .c-smartpop .action a.ok", function() {
                var f = _this.opts.ok;
                f.call(_this);
            });
        } else {
            $(document).on('click', selectId + " .c-smartpop .action a.ok", function() {
                _this.close();
            });
        }
    }

    popup.prototype.close = function() {
        $("#J_Shade").hide();
        $("#"+this.opts.id).remove();
    }

    // RequireJS && SeaJS
    if (typeof define === 'function') {
        define(function() {
            return popup;
        });
    // NodeJS
    } else if (typeof exports !== 'undefined') {
        module.exports = popup;
    } else {
        window.popup = popup;
    }

})(jQuery);
