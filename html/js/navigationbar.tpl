<script id="tpl_navigationbar" type="text/x-handlebars-template">
	 <div id="navigationbar_container" class="navigationbar_container">
        <div class="navigationbar_list">
        	{{#list nav}}
        		<a href="javascript:handleClickEvent({{index}})">{{value}}</a>
        	{{/list}}
        </div>
    </div>
</script>

<div id="find_nav_left" class="find_nav_left">
        <div class="find_nav_list">
            <ul>
                <li class="find_nav_cur"><a href="javascript:void(0)">资讯</a></li>
                <li><a href="javascript:void(0)">分析</a></li>
                <li><a href="javascript:void(0)">原创</a></li>
                <li><a href="javascript:void(0)">评论</a></li>
                <li><a href="javascript:void(0)">技术</a></li>
                <li><a href="javascript:void(0)">项目</a></li>
                <li><a href="javascript:void(0)">黄页</a></li>
                <li><a href="javascript:void(0)">股市</a></li>
                <li><a href="javascript:void(0)">经济</a></li>
                <li class="sideline" style="left: 0px; width: 36px;"></li>
            </ul>
        </div>
    </div>