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
      hide_if_not_in_cart = '';
      hide_if_in_cart = '';
      nutrition ='';
      nutritional_image ='';
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

      if(value.featured_image != null)
			{
			  image = gema.resizeImage(value.featured_image.src,'600x600');
        image_content = '<a href="/products/'+value.handle+'"><img alt="'+value.title+'" class="build-image tb-image-fisrt-'+value.id+'" src="'+image+'"></a>';
      }
      image_hover_content = image_content                   //if the 2nd or 3rd image does not exist, default to the featured image
      nutritional_image = image_content

      if(value.images.length > 2)
      {
        image_hover = gema.resizeImage(value.images[1].src, '600x600');
        image_hover_content = '<a href="/products/'+value.handle+'"><img alt="'+value.title+'" class="build-image tb-image-fisrt-'+value.id+'" src="'+image_hover+'"></a>'
      }

      if (value.images.length > 3)
      {
        nutrition = gema.resizeImage(value.images[2].src, '600x600');
        nutritional_image = '<a href="/products/'+value.handle+'"><img alt="'+value.title+'" class="build-image tb-image-fisrt-'+value.id+'" src="'+nutrition+'"></a>'
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

      if (quantity < 1) {
        hide_if_not_in_cart = 'hide-card'
      } else {
        hide_if_in_cart = 'hide-card'
      }

    	if (data.quickv > 0)
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
      if (data.swatchv == 0)
      {
        buttons = '';
        style_variants = ' style="display:none;"';
      }

      if (data.quick_view_status == 0)
      {
        style_quick_view = ' style="display:none;"';
      }

      add_and_remove_buttons =
          `<div class='show_if_in_cart ${value.id} ${hide_if_not_in_cart}'>\
            <div class="tb-grid-view-item__meta">\
              <span class="tb-product-price__price tb-price-${value.id} product-price__sale">\
              <span class="tb-product__price">${snappy.Currency.formatMoney(value.price, data['money_format'])}</span>\
              </span>\
              <br>\
              <div class="minus-from-cart" onclick="ProductView.prototype.removeFromCardOrderPage(${value.id}, '${value.product_type}')">
                <img class="icon_fill" src="https://cdn.shopify.com/s/files/1/1119/8356/files/minus-fill.svg?1800"/>
                <img class="icon_hollow" src="https://cdn.shopify.com/s/files/1/1119/8356/files/minus-hollow.svg?1800"/>
              </div>\
              <div class="number_in_cart_box">\
              <span class="number_in_cart ${value.id}">${quantity}</span>\
              </div>\
              <div class="plus-to-cart" onclick="ProductView.prototype.addToCardOrderPage(${value.id}, '${value.product_type}')">
                <img class="icon_fill" src="https://cdn.shopify.com/s/files/1/1119/8356/files/plus-fill.svg?1800"/>
                <img class="icon_hollow" src="https://cdn.shopify.com/s/files/1/1119/8356/files/plus-hollow.svg?1800"/>
              </div>\
              <div class="tb-left-quantity"></div>\
            </div>\
          </div>`

      nutritional_button =''

      if (value.product_type === "Smoothie"){
        nutritional_button =
          `<div class="nutritional_info" onclick="ProductView.prototype.showNutritionalInfo(${value.id})">\
            <div class="nutritional ${value.id}">\
              <img class="icon_fill" src="https://cdn.shopify.com/s/files/1/1119/8356/files/nutrition-fill.svg?1653"/>\
              <img class="icon_hollow " src="https://cdn.shopify.com/s/files/1/1119/8356/files/nutrition-hollow.svg?1643"/>\
            </div>\
            <div class="cup ${value.id}" style="display:none">\
              <img class="icon_fill" src="https://cdn.shopify.com/s/files/1/1119/8356/files/cup-fill.svg?1664"/>\
              <img class="icon_hollow" src="https://cdn.shopify.com/s/files/1/1119/8356/files/cup-hollow.svg?1665"/>\
            </div>\
          </div>`
      }

      hover =
        '<div class="tb-product-inner-snappy-filter tb-content-hover" data-id="'+value.id+'"'+style_quick_view+'>\
    		  <div class="tb-content-image-turbofilter sca-qv-image ">\
            '+nutritional_button+'\
    				<div class="tb-content-hover-badges">'+badges+'\
            </div>\
            <div class="default_image_container '+value.id+' ">\
              '+image_hover_content+'\
            </div>\
            <div class="nutritional_info_image '+value.id+'" style="display:none;">\
              '+nutritional_image+'\
            </div>\
    		  </div>\
    		  <div class="tb-product-card-details">\
    				<div class="tb-grid-view-item__title">'+value.title+'\
            </div>\
    		  </div>\
    		  <div class="tb-content-swatches-cn tb-swatch-products-'+value.id+'"'+style_variants+'>\
          </div>\
          <div class="show_if_not_in_cart '+value.id+' '+hide_if_in_cart+'">\
      		  '+buttons+'\
          </div>\
          '+add_and_remove_buttons+'\
    		</div>';

      static = '<div class="tb-product-inner-snappy-filter tb-content-static"><div class="tb-content-static-badges">'+badges+'</div>\
    	  <div class="tb-content-image-turbofilter sca-qv-image">\
        <div class="default_image_container '+value.id+' ">\
    		  '+image_content+'\
        </div>\
        <div class="nutritional_info_image '+value.id+'" style="display:none;">\
          '+nutritional_image+'\
        </div>\
    	  </div>\
    	  <div class="tb-product-card-details">\
    		<div class="tb-grid-view-item__title">'+value.title+'</div>\
          <div class="show_if_not_in_cart '+value.id+' '+hide_if_in_cart+'">\
      		  <div class="tb-grid-view-item__meta">\
        			<span class="tb-product-price__price tb-price-'+value.id+' product-price__sale">\
        			<span class="tb-product__price">'+snappy.Currency.formatMoney(value.price, data['money_format'])+'</span>\
        		  </span>\
              <br>\
            </div>\
    		  <div class="tb-left-quantity"></div>\
    		</div>\
          '+add_and_remove_buttons+'\
    	  </div>\
    	</div>';

			tb = tb.concat(`<li class="tb-product product-${value.id}" data-id="${value.id}">\
			<div class="tb-apolomultimedia-data-product" data-id="${value.id}" data-handle="${value.handle}"></div>\
			<div class="item-card-empty">${static} ${hover}</div>\
			</li>`);
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