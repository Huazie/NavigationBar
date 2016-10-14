<script id="tpl_navigationbar" type="text/x-handlebars-template">
	 <div id="navigationbar_container" class="navigationbar_container">
        <div class="navigationbar_list">
        	{{#list nav}}
        		<a href="javascript:handleClickEvent({{index}})">{{value}}</a>
        	{{/list}}
        </div>
    </div>
</script>