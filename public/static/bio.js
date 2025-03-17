!function(t,e,i,o){function s(t,e){var i=Math.max(0,t[0]-e[0],e[0]-t[1]),o=Math.max(0,t[2]-e[1],e[1]-t[3]);return i+o}function n(e,i,o,s){var n=e.length,r=s?"offset":"position";for(o=o||0;n--;){var a=e[n].el?e[n].el:t(e[n]),h=a[r]();h.left+=parseInt(a.css("margin-left"),10),h.top+=parseInt(a.css("margin-top"),10),i[n]=[h.left-o,h.left+a.outerWidth()+o,h.top-o,h.top+a.outerHeight()+o]}}function r(t,e){var i=e.offset();return{left:t.left-i.left,top:t.top-i.top}}function a(t,e,i){e=[e.left,e.top],i=i&&[i.left,i.top];for(var o,n=t.length,r=[];n--;)o=t[n],r[n]=[n,s(o,e),i&&s(o,i)];return r=r.sort(function(t,e){return e[1]-t[1]||e[2]-t[2]||e[0]-t[0]}),r}function h(e){this.options=t.extend({},u,e),this.containers=[],this.options.rootGroup||(this.scrollProxy=t.proxy(this.scroll,this),this.dragProxy=t.proxy(this.drag,this),this.dropProxy=t.proxy(this.drop,this),this.placeholder=t(this.options.placeholder),e.isValidTarget||(this.options.isValidTarget=o))}function l(e,i){this.el=e,this.options=t.extend({},c,i),this.group=h.get(this.options),this.rootGroup=this.options.rootGroup||this.group,this.handle=this.rootGroup.options.handle||this.rootGroup.options.itemSelector;var o=this.rootGroup.options.itemPath;this.target=o?this.el.find(o):this.el,this.target.on(g.start,this.handle,t.proxy(this.dragInit,this)),this.options.drop&&this.group.containers.push(this)}var c={drag:!0,drop:!0,exclude:"",nested:!0,vertical:!0},u={afterMove:function(t,e,i){},containerPath:"",containerSelector:"ol, ul",distance:0,delay:0,handle:"",itemPath:"",itemSelector:"li",bodyClass:"dragging",draggedClass:"dragged",isValidTarget:function(t,e){return!0},onCancel:function(t,e,i,o){},onDrag:function(t,e,i,o){t.css(e)},onDragStart:function(e,i,o,s){e.css({height:e.outerHeight(),width:e.outerWidth()}),e.addClass(i.group.options.draggedClass),t("body").addClass(i.group.options.bodyClass)},onDrop:function(e,i,o,s){e.removeClass(i.group.options.draggedClass).removeAttr("style"),t("body").removeClass(i.group.options.bodyClass)},onMousedown:function(t,e,i){if(!i.target.nodeName.match(/^(input|select|textarea)$/i))return i.preventDefault(),!0},placeholderClass:"placeholder",placeholder:'<li class="placeholder"></li>',pullPlaceholder:!0,serialize:function(e,i,o){var s=t.extend({},e.data());return o?[i]:(i[0]&&(s.children=i),delete s.subContainers,delete s.sortable,s)},tolerance:0},p={},f=0,d={left:0,top:0,bottom:0,right:0},g={start:"touchstart.sortable mousedown.sortable",drop:"touchend.sortable touchcancel.sortable mouseup.sortable",drag:"touchmove.sortable mousemove.sortable",scroll:"scroll.sortable"},m="subContainers";h.get=function(t){return p[t.group]||(t.group===o&&(t.group=f++),p[t.group]=new h(t)),p[t.group]},h.prototype={dragInit:function(e,i){this.$document=t(i.el[0].ownerDocument);var o=t(e.target).closest(this.options.itemSelector);if(o.length){if(this.item=o,this.itemContainer=i,this.item.is(this.options.exclude)||!this.options.onMousedown(this.item,u.onMousedown,e))return;this.setPointer(e),this.toggleListeners("on"),this.setupDelayTimer(),this.dragInitDone=!0}},drag:function(t){if(!this.dragging){if(!this.distanceMet(t)||!this.delayMet)return;this.options.onDragStart(this.item,this.itemContainer,u.onDragStart,t),this.item.before(this.placeholder),this.dragging=!0}this.setPointer(t),this.options.onDrag(this.item,r(this.pointer,this.item.offsetParent()),u.onDrag,t);var e=this.getPointer(t),i=this.sameResultBox,s=this.options.tolerance;(!i||i.top-s>e.top||i.bottom+s<e.top||i.left-s>e.left||i.right+s<e.left)&&(this.searchValidTarget()||(this.placeholder.detach(),this.lastAppendedItem=o))},drop:function(t){this.toggleListeners("off"),this.dragInitDone=!1,this.dragging&&(this.placeholder.closest("html")[0]?this.placeholder.before(this.item).detach():this.options.onCancel(this.item,this.itemContainer,u.onCancel,t),this.options.onDrop(this.item,this.getContainer(this.item),u.onDrop,t),this.clearDimensions(),this.clearOffsetParent(),this.lastAppendedItem=this.sameResultBox=o,this.dragging=!1)},searchValidTarget:function(t,e){t||(t=this.relativePointer||this.pointer,e=this.lastRelativePointer||this.lastPointer);for(var i=a(this.getContainerDimensions(),t,e),s=i.length;s--;){var n=i[s][0],h=i[s][1];if(!h||this.options.pullPlaceholder){var l=this.containers[n];if(!l.disabled){if(!this.$getOffsetParent()){var c=l.getItemOffsetParent();t=r(t,c),e=r(e,c)}if(l.searchValidTarget(t,e))return!0}}}this.sameResultBox&&(this.sameResultBox=o)},movePlaceholder:function(t,e,i,o){var s=this.lastAppendedItem;!o&&s&&s[0]===e[0]||(e[i](this.placeholder),this.lastAppendedItem=e,this.sameResultBox=o,this.options.afterMove(this.placeholder,t,e))},getContainerDimensions:function(){return this.containerDimensions||n(this.containers,this.containerDimensions=[],this.options.tolerance,!this.$getOffsetParent()),this.containerDimensions},getContainer:function(t){return t.closest(this.options.containerSelector).data(i)},$getOffsetParent:function(){if(this.offsetParent===o){var t=this.containers.length-1,e=this.containers[t].getItemOffsetParent();if(!this.options.rootGroup)for(;t--;)if(e[0]!=this.containers[t].getItemOffsetParent()[0]){e=!1;break}this.offsetParent=e}return this.offsetParent},setPointer:function(t){var e=this.getPointer(t);if(this.$getOffsetParent()){var i=r(e,this.$getOffsetParent());this.lastRelativePointer=this.relativePointer,this.relativePointer=i}this.lastPointer=this.pointer,this.pointer=e},distanceMet:function(t){var e=this.getPointer(t);return Math.max(Math.abs(this.pointer.left-e.left),Math.abs(this.pointer.top-e.top))>=this.options.distance},getPointer:function(t){var e=t.originalEvent||t.originalEvent.touches&&t.originalEvent.touches[0];return{left:t.pageX||e.pageX,top:t.pageY||e.pageY}},setupDelayTimer:function(){var t=this;this.delayMet=!this.options.delay,this.delayMet||(clearTimeout(this._mouseDelayTimer),this._mouseDelayTimer=setTimeout(function(){t.delayMet=!0},this.options.delay))},scroll:function(t){this.clearDimensions(),this.clearOffsetParent()},toggleListeners:function(e){var i=this,o=["drag","drop","scroll"];t.each(o,function(t,o){i.$document[e](g[o],i[o+"Proxy"])})},clearOffsetParent:function(){this.offsetParent=o},clearDimensions:function(){this.traverse(function(t){t._clearDimensions()})},traverse:function(t){t(this);for(var e=this.containers.length;e--;)this.containers[e].traverse(t)},_clearDimensions:function(){this.containerDimensions=o},_destroy:function(){p[this.options.group]=o}},l.prototype={dragInit:function(t){var e=this.rootGroup;!this.disabled&&!e.dragInitDone&&this.options.drag&&this.isValidDrag(t)&&e.dragInit(t,this)},isValidDrag:function(t){return 1==t.which||"touchstart"==t.type&&1==t.originalEvent.touches.length},searchValidTarget:function(t,e){var i=a(this.getItemDimensions(),t,e),o=i.length,s=this.rootGroup,n=!s.options.isValidTarget||s.options.isValidTarget(s.item,this);if(!o&&n)return s.movePlaceholder(this,this.target,"append"),!0;for(;o--;){var r=i[o][0],h=i[o][1];if(!h&&this.hasChildGroup(r)){var l=this.getContainerGroup(r).searchValidTarget(t,e);if(l)return!0}else if(n)return this.movePlaceholder(r,t),!0}},movePlaceholder:function(e,i){var o=t(this.items[e]),s=this.itemDimensions[e],n="after",r=o.outerWidth(),a=o.outerHeight(),h=o.offset(),l={left:h.left,right:h.left+r,top:h.top,bottom:h.top+a};if(this.options.vertical){var c=(s[2]+s[3])/2,u=i.top<=c;u?(n="before",l.bottom-=a/2):l.top+=a/2}else{var p=(s[0]+s[1])/2,f=i.left<=p;f?(n="before",l.right-=r/2):l.left+=r/2}this.hasChildGroup(e)&&(l=d),this.rootGroup.movePlaceholder(this,o,n,l)},getItemDimensions:function(){return this.itemDimensions||(this.items=this.$getChildren(this.el,"item").filter(":not(."+this.group.options.placeholderClass+", ."+this.group.options.draggedClass+")").get(),n(this.items,this.itemDimensions=[],this.options.tolerance)),this.itemDimensions},getItemOffsetParent:function(){var t,e=this.el;return t="relative"===e.css("position")||"absolute"===e.css("position")||"fixed"===e.css("position")?e:e.offsetParent(),t},hasChildGroup:function(t){return this.options.nested&&this.getContainerGroup(t)},getContainerGroup:function(e){var s=t.data(this.items[e],m);if(s===o){var n=this.$getChildren(this.items[e],"container");if(s=!1,n[0]){var r=t.extend({},this.options,{rootGroup:this.rootGroup,group:f++});s=n[i](r).data(i).group}t.data(this.items[e],m,s)}return s},$getChildren:function(e,i){var o=this.rootGroup.options,s=o[i+"Path"],n=o[i+"Selector"];return e=t(e),s&&(e=e.find(s)),e.children(n)},_serialize:function(e,i){var o=this,s=i?"item":"container",n=this.$getChildren(e,s).not(this.options.exclude).map(function(){return o._serialize(t(this),!i)}).get();return this.rootGroup.options.serialize(e,n,i)},traverse:function(e){t.each(this.items||[],function(i){var o=t.data(this,m);o&&o.traverse(e)}),e(this)},_clearDimensions:function(){this.itemDimensions=o},_destroy:function(){var e=this;this.target.off(g.start,this.handle),this.el.removeData(i),this.options.drop&&(this.group.containers=t.grep(this.group.containers,function(t){return t!=e})),t.each(this.items||[],function(){t.removeData(this,m)})}};var v={enable:function(){this.traverse(function(t){t.disabled=!1})},disable:function(){this.traverse(function(t){t.disabled=!0})},serialize:function(){return this._serialize(this.el,!0)},refresh:function(){this.traverse(function(t){t._clearDimensions()})},destroy:function(){this.traverse(function(t){t._destroy()})}};t.extend(l.prototype,v),t.fn[i]=function(e){var s=Array.prototype.slice.call(arguments,1);return this.map(function(){var n=t(this),r=n.data(i);return r&&v[e]?v[e].apply(r,s)||this:(r||e!==o&&"object"!=typeof e||n.data(i,new l(n,e)),this)})}}(jQuery,window,"sortable");

const $document = $(document);
const $cardPreview = $('.card-preview');
const $iframePreview = $cardPreview.find('iframe');
const iframesrc = $iframePreview.attr('src');

$(document).ready(function(){
  	
	// ---- Network  	
	$(document).on('change', '[data-autosave] input,[data-autosave] textarea,[data-autosave] select', function(){
		let form = $(this).parents('form');
		sendRequest(
			form.attr('action'),
			new FormData(form[0]),
			function() {
				refreshPreview();
			}
		);
	});
  	
	$(document).on('change', '[data-enable]', function(e){
		e.preventDefault();
		let id = $(this).data('enable');  
		sendRequest(
			$('[data-action]').data('action')+'/toggle/'+id,
			null,
			function() {
				refreshPreview();
			}
		);		
	});
  	
	$(document).on('submit', '[data-trigger=saveblock]', function(e){
		e.preventDefault();
		let form = $(this);
		let action = $('[data-action]').data('action');
		let id = $(this).data('id');
		let text = form.find('button[type=submit]').text();
		form.find('button[type=submit]').html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>').attr('disabled', 'disabled');    
		sendRequest(
			action+'/'+id,  
			new FormData(form[0]),
			function() {
				refreshPreview();
				form.find('button[type=submit]').text(text).removeAttr('disabled');
			}
		);		
	});
	
	var inplatforms = [];
	$('[data-trigger=addsocial]').click(function(e){
		e.preventDefault();
		let form = $(this).parents('form');
		let platform = $(this).parents('.card').find('select[name=platform]').val();
		let link = $(this).parents('.card').find('input[name=socialink]').val();
		let regex = /(mailto:[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)|(((?:https?)|(?:ftp)):\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

		if(link.length < 5 || !regex.test(link)){
			$.notify({
			message: $(this).data('error')
			},{
				type: 'danger',
				placement: {
					from: "top",
					align: "right"
				},
			});
			return false;
		}

		if(inplatforms.includes(platform)){
			$.notify({
			  message: $(this).data('error-alt')
			},{
				type: 'danger',
				placement: {
					from: "top",
					align: "right"
				},
			});
			return false;
		}

		inplatforms.push(platform);
        let icon = decodeURIComponent($(this).parents('.card').find('select[name=platform]').find(':selected').data('icon').replace(/\+/g, ' '));
		let html =  '<div class="border rounded p-2 mb-3 socialsortable">'+
                    '<div class="mb-3 d-flex align-items-center">'+
                        '<i class="fs-4 fa fa-align-justify handle ms-1" data-bs-toggle="tooltip"></i>'+
                        '<span class="ms-2 fw-bold">'+ $(this).parents('.card').find('select[name=platform]').find(':selected').text()+'</span>'+
                        '<div class="ms-auto d-flex align-items-center">'+
                            '<a class="ms-auto fs-6 pe-2" data-trigger="deletesocial" href=""><i class="fa fa-times text-dark fs-4" data-bs-toggle="tooltip"></i></a>'+
                        '</div>'+
                    '</div>'+
                    '<div class="input-group">'+
                      '<div class="input-group-text bg-white">'+icon+'</div>'+
                      '<input type="text" class="form-control p-2" name="social['+platform+']" placeholder="https://" value="'+link+'">'+
                    '</div>'+
                '</div>';

		$("#sociallinksholder").removeClass('d-none').append(html);
		
		sendRequest(
			form.attr('action'),
			new FormData(form[0]),
			function() {
				refreshPreview();
			}
		);
	});

	$(document).on('click','[data-trigger=deletesocial]',function(e){
		e.preventDefault();
		let t = $(this);
		let form = $(this).parents('form');
		$(this).parents('.socialsortable').slideUp('slow',function(){
			$(this).find('input[type=text]').val('');
			t.parents('.socialsortable').remove();
			sendRequest(
				form.attr('action'),
				new FormData(form[0]),
				function() {
					refreshPreview();
				}
			);
		});
		return false;
	});

    $('#sociallinksholder').sortable({
		containerSelector: "#sociallinksholder",
		handle: '.handle',
		itemSelector: '.socialsortable',
		placeholder: '<div class="card p-4 bg-secondary shadow-none border"></div>',
		onMousedown: function ($item, _super, event) {
			if (!event.target.nodeName.match(/^(input|select|textarea)$/i)) {
				event.preventDefault()
				return true;
			}
		},
		onDrop: function($item, container, _super, event) {
			$item.removeClass(container.group.options.draggedClass).removeAttr("style")
			$("body").removeClass(container.group.options.bodyClass)
            let form = $item.parents('form');
			sendRequest(
				form.attr('action'),
				new FormData(form[0]),
				function() {
					refreshPreview();
				}
			);
		}
	});

	$('[data-trigger=bgtype]').click(function(){
		$('[data-trigger=bgtype]').removeClass('border-secondary');
		let val = $(this).attr('href').replace('#', '');
		$('input[name=mode]').val(val);
		$('input[name=theme]').val('');
		$('#singlecolor,#gradient,#image').removeAttr('style');
		$(this).addClass('border-secondary');
		let form = $(this).parents('form');
        sendRequest(
            form.attr('action'),
            new FormData(form[0]),
            function() {
                refreshPreview();
            }
        );
	});

    $('#linkcontent').sortable({
		containerSelector: "#linkcontent",
		handle: '.handle',
		itemSelector: '.sortable',
		placeholder: '<div class="card p-4 bg-secondary shadow-none border"></div>',
		onMousedown: function ($item, _super, event) {
			if (!event.target.nodeName.match(/^(input|select|textarea)$/i)) {
				event.preventDefault()
				return true
			}
		},
		onDrop: function($item, container, _super, event) {
			$item.removeClass(container.group.options.draggedClass).removeAttr("style")
			$("body").removeClass(container.group.options.bodyClass)
            let data = [];
            $('.widget').each(function(){
                data.push($(this).data('id'));
            });
            sendRequest(
                $('[data-action]').data('action')+'/order',
                JSON.stringify(data),
                function() {
                    refreshPreview();
                }
            );
		}
	});

  	// ---- Utilities
	$('[data-trigger=switcher]').click(function(e){
		e.preventDefault();
		if($(this).hasClass('active')) return false;
		$('.switcher').fadeOut('fast');
		$($(this).attr('href')).show();
		$(this).parents('.nav').find('a').removeClass('active');
		$(this).addClass('active');
	});

	$('[data-trigger=bgtype]').click(function(){
		if($(this).hasClass('active')) return false;
		$('.bgtype').fadeOut('fast').removeClass('show');
		$($(this).attr('href')).addClass('show');
		$('[data-trigger=bgtype]').removeClass('active');
		$(this).addClass('active');
	});

	$('[data-trigger=choosefont]').on('click', function(){
		$('[data-trigger=choosefont]').removeClass('border-secondary');
		$(this).addClass('border-secondary');
	});

	$('[data-trigger=chooselayout]').on('click', function(){
		$('[data-trigger=chooselayout]').removeClass('border-secondary');
		$(this).addClass('border-secondary');
		if($(this).data('value') == "layout2" || $(this).data('value') == "layout3"){
			$('#layoutbanner').addClass('show');
		}else{
			$('#layoutbanner').removeClass('show');
		}
	});

	$('[data-trigger=insertcontent]').click(function(e){
		e.preventDefault();
		let callback = 'fn'+$(this).data('type');
		$('.alt-error').remove();
		if(callback !== undefined && typeof window[callback] !== 'undefined'){
			let response = window[callback]($(this));
			if(response === false) return;
			$("#contentModal div").removeClass('show');
			$("#options").addClass('show');
			$("#contentModal .btn-close").click();
            $('[data-toggle=select]').select2();
            $('.widget input[data-binary=true]').each(function(){
                $(this).before('<input type="hidden" value="0" name="'+ $(this).attr('name')+'">');
            });
		}
	});
	$(document).on('click','[data-trigger=removeCard]', function(e){
		e.preventDefault();
		let id = $(this).parents('.widget').data('id');
		$('a[data-trigger=confirmremove]').data('id', id);
	});

	$(document).on('click','[data-trigger=confirmremove]', function(e){
		e.preventDefault();
        let el = $(this);
		let id = $(this).data('id');	
        let action = $('[data-action]').data('action');
        let text = $(this).text();      
        
        el.html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>').attr('disabled', 'disabled');

        sendRequest(
            action+'/'+id+'/delete',
            null,
            function(){
                refreshPreview();
                el.text(text).removeAttr('disabled');
                $('[data-id='+id+']').remove();
                $("#preview").find('#'+id).parent('.item').remove();
                $("#removecard .btn-close").click();
            },
            null,
            'GET'
        );        
	});

	$('#avatar').change(function(){
		let files = $(this).prop('files');
        let f = files[0];    
        if (!["image/jpeg", "image/jpg", "image/png"].includes(f.type) || f.size > 500*1024) {
			$.notify({
				message: $('#avatar').data('error')
			},{
				type: 'danger',
				placement: {
					from: "top",
					align: "right"
				},
			});
        }
        var reader = new FileReader();

        reader.onload = (function() {
            return function(e) {
                $('#useravatar').attr('src', e.target.result);
            }
        })(f);

        reader.readAsDataURL(f);
	});

	$("[data-trigger=uploadavatar]").click(function(e){
		e.preventDefault();
		$("#avatar").click();
	});

	$('#bgimage').change(function(){
        let files = $(this).prop('files');
        let f = files[0];    
        if (!["image/jpeg", "image/jpg", "image/png"].includes(f.type) || f.size > 1024*1024) {
            $.notify({
            message: $('#bgimage').data('error')
            },{
                type: 'danger',
                placement: {
                    from: "top",
                    align: "right"
                },
            });            
        }
	});

	$("[data-trigger=color]").each(function(){
		var bg = '#000000';
		if($(this).data('default')) bg = $(this).data('default');
		$(this).spectrum({
			color: bg,
			showInput: true,
			preferredFormat: "hex",
		});
	});

	$("[data-trigger=changetheme]").click(function(e){
        e.preventDefault();
        let form = $(this).parents('form');
        sendRequest(
            form.attr('action'),
            new FormData(form[0]),
            function() {
                refreshPreview();
            }
        );
	});

    $('[data-trigger=livesearch]').keyup(function(){
        let query = $(this).val();
        if(query.length < 3) return $('#biowidgets .item').removeClass('d-none');
        $('#biowidgets .item').each(function(){
            if($(this).text().toLowerCase().includes(query.toLowerCase())) {
                $(this).removeClass('d-none');
            }else{
                $(this).addClass('d-none');
            }
        });
    });

    $('[data-toggle=biodatepicker]').each(function(){
        let el = $(this);
        el.daterangepicker({
            minDate: moment(),
            singleDatePicker: true,
            showDropdowns: true,
            autoApply: true,
            autoUpdateInput: false,
            timePicker: true,
            locale: {
                format: 'YYYY-MM-DD HH:mm'
            }
        }, function(s){
            el.val(s.format('YYYY-MM-DD HH:mm'));
        });
    });

    $(document).on('click', '[data-trigger=icontype]', function(e){
        e.preventDefault();
        let val = $(this).data('value');
        let id = $(this).attr('href');
        $(this).parents('.icon-parent').find('.form-group').addClass('collapse');
        $(this).parents('.icon-selector').find('input.iconmode').val(val);
        if(id !== '#') $(this).parents('.icon-parent').find(id).removeClass('collapse');
    });

    $(document).on('click', '.widget [data-bs-toggle=collapse]', function() {
        if($(this).hasClass('collapsed')){
			$(this).find('h5 > i').removeClass('fa-chevron-up').addClass('fa-chevron-down');
		} else {
			$(this).find('h5 > i').removeClass('fa-chevron-down').addClass('fa-chevron-up');
		}
    });
});

function sendRequest(url, data, successCallback, errorCallback, methodType = 'POST') {
    $.ajax({
        type: methodType,
        url: url,
        data: data,
        contentType: false,
        processData: false,
        dataType: 'json',
        beforeSend: () => $('#loading').html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>'),
        complete: () => $('#loading span').remove(),
        success: function(response) {
            $('input[name=_token]').val(response.token);
            $.notify({ message: response.message }, { 
                type: response.error ? 'danger' : 'success',
                placement: { from: "top", align: "right" }
            });
            if (response.html) {
                $('body').append(response.html);
            }
            if (successCallback) successCallback(response);
        },
        error: errorCallback
    });
}

function refreshPreview() {
    $cardPreview.prepend('<div class="frameloading d-flex align-items-center justify-content-center" style="position: absolute;top: 0;left: 0;height: 100%;width: 100%;background: rgba(0,0,0,0.4);z-index: 999;"><span class="spinner-border spinner-border-xl text-light" role="status" aria-hidden="true" style="width: 3rem; height: 3rem;"></span></div>');
    setTimeout(() => $cardPreview.find('.frameloading').remove(), 2000);
    $iframePreview.attr('src', iframesrc + '?token=' + Date.now());
}

function setColor(element, color, e){
  $('input[name=themeid]').val('');
	e.val(color.toHexString());
}

function customTheme(classname, buttoncolor, buttontextcolor, textcolor){

  $('input[name=themeid]').val('');
	$('input[name=theme]').val(classname);
	$('input[name=mode]').val('custom');

	$("#buttontextcolor").val(buttontextcolor);
	$("#buttontextcolor").spectrum({
		color: buttontextcolor,
		showInput: true,
		preferredFormat: "hex",
		move: function (color) { setColor("#preview .btn-custom", color, $(this)); },
		hide: function (color) { setColor("#preview .btn-custom", color, $(this)); }
	});
	$("#buttoncolor").val(buttoncolor);
	$("#buttoncolor").spectrum({
		color: buttoncolor,
		showInput: true,
		preferredFormat: "hex",
		move: function (color) { setColor("#preview .btn-custom", color, $(this)); },
		hide: function (color) { setColor("#preview .btn-custom", color, $(this));  }
	});
	$("#textcolor").val(textcolor);
	$("#textcolor").spectrum({
		color: textcolor,
		showInput: true,
		preferredFormat: "hex",
		move: function (color) { setColor("#preview, #preview h3 > span, #preview p", color, $(this)); },
		hide: function (color) { setColor("#preview, #preview h3 > span  #preview p", color, $(this)); }
	});
}

function changeTheme(bg, bgst, bgsp, buttoncolor, buttontextcolor, textcolor, bgtype='single', buttonstyle = 'rectangle', gradientangle = '-45', shadow = false, shadowcolor = '#000', themeid = false){
    $('input[name=themeid]').val('');
    if(themeid){
        $('input[name=themeid]').val(themeid);
    }

	if(bgtype == 'gradient'){

		$('.bgtype').removeClass('show');
		$('#gradient').addClass('show');
		$('[data-trigger=bgtype]').removeClass('border-secondary');
		$('#forgradient').addClass('border-secondary');
		$('input[name=theme]').val('');
		$('input[name=mode]').val('gradient');

		$("#bgst").val(bgst);
		$("#bgst").spectrum({
			color: bgst,
			showInput: true,
			preferredFormat: "hex",
			move: function (color) { setColor("#preview .card", color, $(this)); },
			hide: function (color) { setColor("#preview .card", color, $(this)); }
		});
		$("#bgsp").val(bgsp);
		$("#bgsp").spectrum({
			color: bgsp,
			showInput: true,
			preferredFormat: "hex",
			move: function (color) { setColor("#preview .card", color, $(this)); },
			hide: function (color) { setColor("#preview .card", color, $(this)); }
		});

    }else if(bgtype == "image"){

        $('.bgtype').removeClass('show');
        $('#image').addClass('show');
        $('[data-trigger=bgtype]').removeClass('border-secondary');
        $('#forimage').addClass('border-secondary');
        $('input[name=theme]').val('');
        $('input[name=mode]').val('image');

    } else {
        $('.bgtype').removeClass('show');
        $('#singlecolor').addClass('show');
        $('[data-trigger=bgtype]').removeClass('border-secondary');
        $('#forsinglecolor').addClass('border-secondary');
        $('input[name=theme]').val('');
        $('input[name=mode]').val('singlecolor');
    }

    $("#bg").val(bg);
    $("#bg").spectrum({
        color: bg,
        showInput: true,
        preferredFormat: "hex",
        move: function (color) { setColor("#preview .card", color, $(this)); },
        hide: function (color) { setColor("#preview .card", color, $(this)); }
    });
    $("#buttontextcolor").val(buttontextcolor);
    $("#buttontextcolor").spectrum({
        color: buttontextcolor,
        showInput: true,
        preferredFormat: "hex",
        move: function (color) { setColor("#preview .btn-custom", color, $(this)); },
        hide: function (color) { setColor("#preview .btn-custom", color, $(this)); }
    });
    $("#buttoncolor").val(buttoncolor);
    $("#buttoncolor").spectrum({
        color: buttoncolor,
        showInput: true,
        preferredFormat: "hex",
        move: function (color) { setColor("#preview .btn-custom", color, $(this)); },
        hide: function (color) { setColor("#preview .btn-custom", color, $(this)); }
    });
    $("#textcolor").val(textcolor);
    $("#textcolor").spectrum({
        color: textcolor,
        showInput: true,
        preferredFormat: "hex",
        move: function (color) { setColor("#preview, #preview h3 > span, #preview p", color, $(this)); },
        hide: function (color) { setColor("#preview, #preview h3 > span  #preview p", color, $(this)); }
    });
    if(shadow){
        $('#shadow').val(shadow);
    }
    if(buttonstyle){
        $('#buttonstyle').val(buttonstyle);
    }
    if(shadowcolor){
        $("#shadowcolor").val(shadowcolor);
        $("#shadowcolor").spectrum({
            color: shadowcolor,
            showInput: true,
            preferredFormat: "hex",
            move: function (color) { setColor("#preview, #preview h3 > span, #preview p", color, $(this)); },
            hide: function (color) { setColor("#preview, #preview h3 > span  #preview p", color, $(this)); }
        });
    }

}

function bioupdate() {
    Object.entries(biodata).forEach(([bio, data]) => {
        const callback = window['fn' + data.type];
        if (typeof callback === 'function') {
            callback($('[data-type=' + data.type + ']'), data, bio);
        }
    });
}

function slug(str) {
    return str.toLowerCase()
        .replace(/[àáäâèéëêìíïîòóöôùúüûñç]/g, c => 'aaaaeeeeiiiioooouuuunc'['àáäâèéëêìíïîòóöôùúüûñç'.indexOf(c)])
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

function isEmoji(input) {
    return /\p{Emoji}/u.test(input) && !/fa-/.test(input);
}