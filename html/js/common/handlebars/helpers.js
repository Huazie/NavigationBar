/**
 * 导航栏 自定义导航栏
 */
Handlebars.registerHelper('nav_list', function(context, options) {
  	var ret = "<ul>";

  	for(var i=0, j=context.length; i<j; i++) {
  		if(i == 0){
  			ret = ret + "<li class='current'>" + options.fn(context[i]) + "</li>";
  		}else{
  			ret = ret + "<li>" + options.fn(context[i]) + "</li>";
  		}
  	}

  	ret = ret + "<li class='sideline' style='left: 0px; width: 36px;'></li>" 

  	return ret + "</ul>";
});