(function($){

    var $this;
    var settings;
    var selects = [];
    var methods = {
        init: function(options){
            $this = this;
            settings = $.extend({}, $.fn.combostyle.defaults, options);

            $this.each(function(index){
                settings.onInit.call($this, $(this));
                selects[index] = $(this);
                addComboStyle(selects[index]);
                selects[index].hide();
            });
            settings.onCompleteAll.call(this, $('.combostyle'), selects);
        },
        destroy: function(){
            $thisitem = this;
            $thisitem.each(function(index){
                var combostyle = $thisitem.next('.combostyle');
                if(combostyle.length > 0){
                    combostyle.prev('select').show();
                    combostyle.find('.dropdown-menu li').unbind("click");
                    combostyle.remove();
                }
            });
        }
    };

    function addComboStyle(select){
        var html = '<div class="dropdown combostyle">';
        html += '<button class="btn dropdown-toggle" type="button" id="'+select.attr('name')+'" data-toggle="dropdown">';
        html += '<span class="button-title-dropdown">'+select.attr('title')+'</span>';
        html += ' <span class="caret"></span>';
        html += '</button>';
        html += '<ul class="dropdown-menu" role="menu" aria-labelledby="'+select.attr('name')+'">';
        var options = select.find('option');
        $(options).each(function(index){
            html += '<li role="presentation"><a role="menuitem" tabindex="-1" href="'+$(this).attr('value')+'">'+((select.attr('data-icon-attr'))?'<img src="'+settings.iconPath+$(this).attr(select.attr('data-icon-attr'))+'" /> ':'')+$(this).text()+'</a></li>';
        });
        html += '</ul>';
        html += '</div>';
        select.after(html);
        $('.combostyle ul.dropdown-menu[aria-labelledby='+select.attr('name')+'] li').click(function(event){
            event.preventDefault();
            $('.combostyle ul.dropdown-menu[aria-labelledby='+select.attr('name')+'] li').removeClass('active');
            $(this).addClass('active');
            $(this).parent().parent().find('.button-title-dropdown').html($(this).find('a').html());
            select.val($(this).find('a').attr('href'));
        });
        settings.onComplete.call(this, select.next('.combostyle'), select);
    }

    $.fn.combostyle = function(methodOrOptions) {
        if (methods[methodOrOptions]){
            return methods[methodOrOptions].apply(this, Array.prototype.slice.call(arguments, 1));
        }else if(typeof methodOrOptions === 'object' || !methodOrOptions){
            return methods.init.apply(this, arguments);
        }else{
            $.error('Method ' +  methodOrOptions + ' does not exist on jQuery.combostyle.');
        }    
    };

    $.fn.combostyle.defaults = {
        iconPath: '',
        onInit: function(){},
        onComplete: function(){},
        onCompleteAll: function(){}
    };

})(jQuery);