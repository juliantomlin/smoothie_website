var gema = {
  theme: function(json,data,$){
    console.log(cartInformation)
    var tb = '',static = '',style_quick_view='',style_variants='',hover = '',badges = '',image = data.asset_url+'no-image.svg',images_thumb='',content_images_thumb='',cl_thumb='',image_content = '',compare_at_price = '',buttons = '',paginateTop='',paginateBottom='';
    if(json.collection)
    {
      $('.tb-title-collection').html(json.collection.title);
      $('.tb-bodyhtml-collection').html(json.collection.body_html);
    }
	if(json.products.length > 0)
    {
		$.each(json.products, function( index, value ) {
      //console.log("hello", index, value)
      images_thumb = '';
      content_images_thumb = '';
      cl_thumb = '';
      style_quick_view = '';
      style_variants = '';
      quantity = 0;

      if(value.images)
      {
        $.each(value.images, function( x, u ) {
          cl_thumb = '';
          if(x == 0)
          {
            cl_thumb = ' active';
          }
          images_thumb = images_thumb.concat('<li><a class="tb-thumb-onclick'+cl_thumb+' tb-thumb-id-'+value.id+' tb-thumb-id-'+value.id+'-'+u.id+'" href="'+gema.resizeImage(u.src,'700x700')+'" data-id="'+value.id+'" data-thumb="'+u.id+'"><img src="'+gema.resizeImage(u.src,'small')+'" /></a></li>');
        });
      }
      compare_at_price = '';
    	buttons = '';
      image = data.asset_url+'tb-noimage.jpg'
      image_content = '<a href="/products/'+value.handle+'"><img alt="'+value.title+'" class="tb-image-fisrt-'+value.id+'" src="'+image+'"></a>';
      hover_image = '<a href="/products/'+value.handle+'"><img alt="'+value.title+'" class="tb-image-fisrt-'+value.id+'" src="'+image+'"></a>'

      if(value.featured_image != null)
			{
			  image = gema.resizeImage(value.featured_image.src,'600x600');
        image_content = '<a href="/products/'+value.handle+'"><img alt="'+value.title+'" class="build-image tb-image-fisrt-'+value.id+'" src="'+image+'"></a>';
      }

      if(value.images.length > 2)
      {
        image_hover = gema.resizeImage(value.images[1].src, '600x600');
        image_hover_content = '<a href="/products/'+value.handle+'"><img alt="'+value.title+'" class="build-image tb-image-fisrt-'+value.id+'" src="'+image_hover+'"></a>'
      }

      cartInformation.forEach(product => {
        if (product.product_id == value.id) {
          quantity = product.quantity
        }
      })

      if(data.compare_price > 0)
      {
        if(value.price < value.compare_at_price)
        {
          if(value.compare_at_price)
          {
            compare_at_price = '<s class="tb-product-compare-price tb-compare-at-price-'+value.id+'">'+snappy.Currency.formatMoney(value.compare_at_price, data['money_format'])+'</s>';
          }
        }
      }

      badges = value.badges;

    	if(data.quickv > 0)
      {
        buttons =
          `<div class="tb-content-button-add-to-cart">\
            <a class="btn" href="javascript:void(0);" onclick="ProductView.prototype.addToCardOrderPage(${value.id}, '${value.product_type}')">\
              Add to cart\
            </a>\
            <a class="tb-button-add-to-cart ${value.id}" style="display:none;" href="javascript:void(0);">\
            </a>\
            <a href="/products/${value.handle}" class="tb-button-details btn btn--secondary" href="javascript:void(0);">\
              Details\
            </a>\
          </div>`;
      }
      if(data.swatchv == 0)
      {
        buttons = '';
        style_variants = ' style="display:none;"';
      }

      if(data.quick_view_status == 0)
      {
        style_quick_view = ' style="display:none;"';
      }

      hover =
        '<div class="tb-product-inner-snappy-filter tb-content-hover" data-id="'+value.id+'"'+style_quick_view+'>\
    		  <div class="tb-content-image-turbofilter sca-qv-image ">\
    				<div class="tb-content-hover-badges">'+badges+'\
            </div>\
            '+image_hover_content+'\
    		  </div>\
    		  <div class="tb-product-card-details">\
    				<div class="tb-grid-view-item__title">'+value.title+'\
            </div>\
    		  </div>\
    		  <div class="tb-content-swatches-cn tb-swatch-products-'+value.id+'"'+style_variants+'>\
          </div>\
    		  '+buttons+'\
    		</div>';

      static = '<div class="tb-product-inner-snappy-filter tb-content-static"><div class="tb-content-static-badges">'+badges+'</div>\
    	  <div class="tb-content-image-turbofilter sca-qv-image">\
    		'+image_content+'\
    	  </div>\
    	  <div class="tb-product-card-details">\
    		<div class="tb-grid-view-item__title">'+value.title+'</div>\
    		  <div class="tb-grid-view-item__meta">\
    			'+compare_at_price+'\
    			<span class="tb-product-price__price tb-price-'+value.id+' product-price__sale">\
    			<span class="tb-product__price">'+snappy.Currency.formatMoney(value.price, data['money_format'])+'</span>\
    		  </span>\
          <br>\
          <div class="minus-from-cart"> </div>\
          <span class="number_in_cart ' + value.id + '">'+quantity+'</span>\
          <div class="plus-to-cart"> </div>\
    		  <div class="tb-left-quantity"></div>\
    		</div>\
    	  </div>\
    	</div>';

			tb = tb.concat('<li class="tb-product product-'+value.id+'" data-id="'+value.id+'">\
			<div class="tb-apolomultimedia-data-product" data-id="'+value.id+'" data-handle="'+value.handle+'"></div>\
			'+static+hover+'\
			</li>');
		});
 	  paginateTop = '<div class="tb-content-paginate tb-top" data-pisition="top">'+json.paginate+'</div>';
      paginateBottom = '<div class="tb-content-paginate tb-bottom" data-pisition="bottom">'+json.paginate+'</div>';
      gema.loadContent(paginateTop+'<ul class="tb-products-content">'+tb+'</ul>'+paginateBottom);
      gema.addStyle(json,data,$);
	}else{
        gema.loadContent('<div class="tb-no-products-found">No products found</div>');
    }
  },
  addStyle:function(json,data,$){
    if(data.filter_status == 0)
    {
      $('#snappy_filter__filters').css('width','100%');
      $('#snappy_filter__filters').css('margin-bottom','20px');
      return false;
    }
    $('#load-ajax-products').css('width','80%');
    $('#load-ajax-products').css('display','inline-block');
    $('#load-ajax-products').css('float','left');
  },
  loadContent:function(result){
    $('#load-ajax-products').html(result);
  },
  resizeImage:function(t, r) {
    try {
        if ("original" == r) return t;
        var e = t.match(/(.*\/[\w\-\_\.]+)\.(\w{2,4})/);
        return e[1] + "_" + r + "." + e[2]
    } catch (r) {
        return t
    }
  },
  updateBar:function(progress) {
    console.log(totalCartWeight)
    $('#cart-progress-bar').html("<div class='cart-pip' style='width: " + (progress/12000)*100 + "%'></div>")
  }
}