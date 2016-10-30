/**
 * navigation-bar.1.0.0.js
 * 自定义导航栏插件
 * (1). 依赖jQuery第三方库，详细请至官网了解：http://jquery.com/
 * (2). 依赖Handlebars第三方库，详细请至官网了解：http://handlebarsjs.com/
 *
 * Author: Huazie
 * Date: 2016/10/15
 * Version: 1.0.0
 */

(function( $, undefined ) {
	
	/*
	 * NavigationBar object.
	 */
	$.NavigationBar 			= function( options, element ) {
	
		this.$el	= $( element );
		this._init( options );
		
	};
	
		$.NavigationBar.defaults 	= {
		currPosition	: 1,				// 当前被选中的标签，默认为1
		navWidth  		: 100,				// 导航栏标签的宽度
		navHeight      	: 50,				// 导航栏标签的高度
		sideLineHeight 	: 3,				// 导航栏的下边线的高度
		sideLineColor   : '#48a5f4',  		// 导航栏的下边线的颜色
		textSize  		: 18,				// 导航栏标签文字的大小
		textColor		: '#666',			// 导航栏标签文字的颜色
		autoAdaptation	: false,			// 标签宽度是否自动适应所在容器大小
		initLayout		: function(index){}	// 标签内容展示函数，需要自行定义实现
    };
	
	$.NavigationBar.prototype 	= {
		_init 				: function( options ) {
			
			this.options 		= $.extend( true, {}, $.NavigationBar.defaults, options );
			// 父容器
			this.$el.css({
				height             	: this.options.navHeight,
				'position'   		: 'relative'
			});

			// 导航栏容器
			this.$list			= this.$el.find('.navigationbar_list');
			this.$list.css({
				left               	: 0,
				height             	: this.options.navHeight,
				margin				: 0,
		    	padding				: 0
			});

			// 
			this.$ul			= this.$list.find('ul');
			this.$ul.css({
				'white-space'      	: 'nowrap',
				margin				: 0,
    			padding				: 0
			});

			// 
			this.$li 			= this.$ul.children();
			this.$li.css({
				'display'          	: 'inline-block',
				margin				: 0,
    			padding				: 0
			});

			//
			this.$a 			= this.$ul.find('li a');
			this.$a.css({
				'display'          	: 'block',
			    'line-height'      	: this.options.navHeight + 'px',
			    'font-size'        	: this.options.textSize + 'px',
			    'text-align'       	: 'center',
			    'color'            	: this.options.textColor,
			    'text-decoration'  	: 'none',
			    margin				: 0,
    			padding				: 0
			});

			// 导航线
			this.$sideline 		= this.$list.find('ul .sideline');
			this.$sideline.css({
			    'position'   		: 'absolute',
			    'background-color' 	: this.options.sideLineColor,
			    height           	: this.options.sideLineHeight,
			    left				: 0,
			    top             	: (this.options.navHeight - this.options.sideLineHeight),
			    margin				: 0,
    			padding				: 0
			});

			// 导航图片标签
			this.$image 		= this.$a.find('img');
			if(this.$image.length > 0){
				this.$image.css({
					'vertical-align' 	: 'middle',
					'cursor' 			: 'pointer',
					margin				: 0,
    				padding				: 0
				});
			}

			// 导航文字标签
			this.$label 		= this.$a.find('label');
			if(this.$label.length > 0){
				this.$label.css({
					'vertical-align' 	: 'middle',
					'cursor' 			: 'pointer',
					margin				: 0,
    				padding				: 0
				});
			}
			
			this.count			= this.$a.length;//导航标签的数目

			if(this.options.autoAdaptation){ //开启自动适应，将以父容器大小决定每个导航标签的大小
				this.navWidth 	= this.$el.width() / this.count;
			}else{	// 关闭自动适应，则使用定义的宽度决定整个导航栏的大小
				this.navWidth 	= this.options.navWidth;
				this.$el.width(this.navWidth * this.count);
			}
			this.$sideline.width(this.navWidth);

			this._each();	//初始化导航标签页

			this._click();	//绑定导航页点击事件
		
		},
		_each				: function(){
			var _self	= this;
			var num = 0;
			this.$li.each(function(){
				num++;
		        if(num == _self._getCurrentPosition()){
		            _self.$sideline.css({left:$(this).position().left});
		            $(this).addClass("current").siblings().removeClass("current");
		        }
		        $(this).css({width:_self.navWidth});
		    });
		    this.options.initLayout(_self._getCurrentPosition());//展示对应标签的内容
		},
		_click				: function(){
			var _self	= this;
			this.$li.on('click', function(){
				var _li = this;
		        _self.navWidth = $(this).width();
		        _self.$sideline.stop(true);
		        _self.$sideline.animate({left:$(this).position().left},300);
		        $(this).addClass("current").siblings().removeClass("current");
		        var num = 0;
			    _self.$li.each(function(){
			    	num++;
			    	if(this == _li){//判断是不是点击的对象
			        	_self._setCurrentPosition(num);
			        }
			    });
			    _self.options.initLayout(_self._getCurrentPosition());//展示对应标签的内容
		    });
		},
		_setCurrentPosition : function(currPosition){
			sessionStorage.setItem(this.$el.selector, currPosition);
			this.options.currPosition = currPosition; 
		},
		_getCurrentPosition : function(){
			var currPosition = sessionStorage.getItem(this.$el.selector);
			if(currPosition){
				this.options.currPosition = currPosition;
			}
			return this.options.currPosition;
		}
	};
	
	$.fn.navigationBar			= function( options, data) {

		if (arguments.length == 1){
			data = options;
			options = {};
		}
			
		var source = $('#tpl_navigationbar').html();
		var template = Handlebars.compile(source);
		this.html(template(data));
		
		var nav = $.data( this, 'navigationBar' );
		if ( !nav ) {
			$.data( this, 'navigationBar', new $.NavigationBar( options, this ) );
		}
		
		return this;
		
	};
	
})( jQuery );