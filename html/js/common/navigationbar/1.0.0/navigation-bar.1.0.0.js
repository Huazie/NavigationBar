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
		navWidth  		: 100,			// 导航栏标签的宽度
		navHeight      	: 50,			// 导航栏标签的高度
		sideLineHeight 	: 2,			// 导航栏的下边线的高度
		sideLineColor   : '#48a5f4',  	// 导航栏的下边线的颜色
		textSize  		: 18,			// 导航栏标签文字的大小
		textColor		: '#666'		// 导航栏标签文字的大小
    };
	
	$.NavigationBar.prototype 	= {
		_init 				: function( options ) {
			
			this.options 		= $.extend( true, {}, $.NavigationBar.defaults, options );
			// 
			this.$el.css({
				height             	: this.options.navHeight,
				'position'   		: 'relative'
			});

			// 
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
			    height             	: this.options.navHeight,
			    margin				: 0,
    			padding				: 0
			});

			//
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

			this.$image 		= this.$a.find('img');
			if(this.$image.length > 0){
				this.$image.css({
					'vertical-align' 	: 'middle',
					margin				: 0,
    				padding				: 0
				});
			}

			this.$label 		= this.$a.find('label');
			if(this.$label.length > 0){
				this.$label.css({
					'vertical-align' 	: 'middle',
					margin				: 0,
    				padding				: 0
				});
			}

			this.count			= this.$a.length;

			this.navWidth 		= this.options.navWidth;

			this.$sideline.width(this.navWidth);

			this.$el.width(this.navWidth * this.count);

			this._each();

			this._click();
		
		},
		_each			: function(){
			var _self	= this;
			this.$li.each(function(){
		        if($(this).find("a").text() == sessionStorage.pagecount){
		            _self.$sideline.css({left:$(this).position().left});
		            $(this).addClass("current").siblings().removeClass("current");
		        }
		        $(this).css({width:_self.navWidth});
		    });
		},
		_click				: function(){
			var _self	= this;
			this.$li.on('click', function(){
		        _self.navWidth = $(this).width();
		        _self.$sideline.stop(true);
		        _self.$sideline.animate({left:$(this).position().left},300);
		        $(this).addClass("current").siblings().removeClass("current");
		        sessionStorage.left = $(this).position().left;
		        sessionStorage.pagecount = $(this).find("a").text();
		    });
		}

	};
	
	var logError 				= function( message ) {
		if ( this.console ) {
			console.error( message );
		}
	};
	
	$.fn.navigationBar			= function( options, data) {

		if (arguments.length == 1){
			data = options;
			options = {};
		}

		if ( typeof options === 'string' ) {
			
			var args = Array.prototype.slice.call( arguments, 1 );
			
			this.each(function() {
			
				var instance = $.data( this, 'navigationBar' );
				
				if ( !instance ) {
					logError( "cannot call methods on navigationBar prior to initialization; " +
					"attempted to call method '" + options + "'" );
					return;
				}
				
				if ( !$.isFunction( instance[options] ) || options.charAt(0) === "_" ) {
					logError( "no such method '" + options + "' for navigationBar instance" );
					return;
				}
				
				instance[ options ].apply( instance, args );
			
			});
		
		} else {
			
			var source = $('#tpl_navigationbar').html();
			var template = Handlebars.compile(source);
			this.html(template(data));
			
			var instance = $.data( this, 'navigationBar' );
			if ( !instance ) {
				$.data( this, 'navigationBar', new $.NavigationBar( options, this ) );
			}
		
		}
		
		return this;
		
	};
	
})( jQuery );