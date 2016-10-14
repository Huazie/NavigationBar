/**
 * navigation-bar.1.0.0.js
 *
 * Author: Huazie
 * Date: Mon Jan 30 2012
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
		current	  : 0,
		navWidth  : 100
    };
	
	$.NavigationBar.prototype 	= {
		_init 				: function( options ) {
			
			this.options 		= $.extend( true, {}, $.NavigationBar.defaults, options );

			this.$el.css({
				'position'         	: 'fixed',
				height             	: 45,
			});
			
			this.$list			= this.$el.find('.navigationbar_list');

			this.$list.css({
				left               	: 0,
				height             	: 45,
				margin				: 0,
		    	padding				: 0
			});

			this.$ul			= this.$list.find('ul');
			this.$ul.css({
				'white-space'      	: 'nowrap',
				margin				: 0,
    			padding				: 0,
			});

			this.$li 			= this.$ul.children();
			this.$li.css({
				'display'          	: 'inline-block',
				margin				: 0,
    			padding				: 0,
			});

			this.$a 			= this.$ul.find('li a');
			this.$a.css({
				'display'          	: 'block',
			    'line-height'      	: '46px',
			    'font-size'        	: '18px',
			    'text-align'       	: 'center',
			    'color'            	: '#666',
			    'text-decoration'  	: 'none',
			    margin				: 0,
    			padding				: 0
			});

			this.$sideline 		= this.$list.find('ul .sideline');

			this.$sideline.css({
				left			   	: 0,
				'display'          	: 'block',
				'position'         	: 'absolute',
			    'border'           	: '0',
			    'height'           	: '2px',
			    'background-color' 	: '#48a5f4',
			    'top'              	: '43px',
			    margin				: 0,
    			padding				: 0,
			});

			this.count			= this.$li.length;

			this.navWidth 		= this.options.navWidth;

			this.$sideline.width(this.navWidth);

			this.$el.width(this.navWidth * (this.count - 1));

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
	
	$.fn.navigationBar			= function( options , data) {

		if(data == undefined){
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

			var source = $("#tpl_navigationbar").html();
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