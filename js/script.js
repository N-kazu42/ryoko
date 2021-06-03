//画像の設定

var windowwidth = window.innerWidth || document.documentElement.clientWidth || 0;
		if (windowwidth > 768){
			var responsiveImage = [//PC用の画像
				{ src: './images/slide-image1.jpg'},
				{ src: './images/slide-image2.jpg'},
				{ src: './images/slide-image3.jpg'},
				{ src: './images/slide-image4.jpg'}
			];
		} else {
			var responsiveImage = [//タブレットサイズ（768px）以下用の画像
				{ src: './images/slide-image1.jpg'},
				{ src: './images/slide-image2.jpg'},
				{ src: './images/slide-image3.jpg'},
				{ src: './images/slide-image4.jpg'}
			];
		}

//Vegas全体の設定

$('#slider').vegas({
		overlay: true,//画像の上に網線やドットのオーバーレイパターン画像を指定。
		transition: 'blur2',//切り替わりのアニメーション。http://vegas.jaysalvat.com/documentation/transitions/参照。fade、fade2、slideLeft、slideLeft2、slideRight、slideRight2、slideUp、slideUp2、slideDown、slideDown2、zoomIn、zoomIn2、zoomOut、zoomOut2、swirlLeft、swirlLeft2、swirlRight、swirlRight2、burnburn2、blurblur2、flash、flash2が設定可能。
		transitionDuration: 2000,//切り替わりのアニメーション時間をミリ秒単位で設定
		delay: 10000,//スライド間の遅延をミリ秒単位で。
		animationDuration: 20000,//スライドアニメーション時間をミリ秒単位で設定
		animation: 'random',//スライドアニメーションの種類。http://vegas.jaysalvat.com/documentation/transitions/参照。kenburns、kenburnsUp、kenburnsDown、kenburnsRight、kenburnsLeft、kenburnsUpLeft、kenburnsUpRight、kenburnsDownLeft、kenburnsDownRight、randomが設定可能。
		slides: responsiveImage,//画像設定を読む
		//timer:false,// プログレスバーを非表示したい場合はこのコメントアウトを外してください
	});

  /*
スクロール出現
*/
// スクロール出現用関数（.offs ⇄ .ons）
function scr_ani(scr,offs_max){
    var
    window_h = $(window).height(),
        offs_length = $('.offs').length,
        ons_length = $('.ons').length,
        wh_pos = 30;// 対象コンテンツの上端が画面下からどれくらい入ったら反応するか。画面高さに対する割合（%）
    if(offs_length){
      var first_item = offs_max - offs_length;
      for (var i=0; i<offs_length; i++) {
        var data_scr = first_item + i;
        var offs = $('.offs[data-scr="' + data_scr + '"]');
        var target = offs.offset().top;
        var trigger = target - (window_h + scr - window_h * wh_pos / 100);
        if(trigger < 0){
          offs.removeClass('offs').addClass('ons');
        }else{
          break;
        }
      }
    }
    if(ons_length){
      var last_item = ons_length - 1;
      for (var i=0; i<ons_length; i++) {
        var data_scr = last_item - i;
        var ons = $('.ons[data-scr="' + data_scr + '"]');
        var target = ons.offset().top;
        var trigger = target - (window_h + scr);
        if(trigger > 0){
          ons.removeClass('ons').addClass('offs');
        }else{
          break;
        }
      }
    }
  };
  
  $(function(){
  
    // スクロール出現アイテムにナンバリング
    var offs_max = $('.offs').length;
    for (var i=0; i<offs_max; i++) {
      $('.offs').eq(i).attr('data-scr',i);
    }
    // ディレイを設定
    var fadeIn_item = $('.fadeIn_item');
    for (var i = 0; i < fadeIn_item.length; i++) {
      let delay = fadeIn_item.eq(i).data('delay');
      if(delay){
        fadeIn_item.eq(i).css('transition-delay', delay + 's');
      }
    }
  
    // （リロード時など）ロード時にすでにスクロールされている場合に対応
    var scr = $(window).scrollTop();
    scr_ani(scr,offs_max);
  
  
    /************
    スクロール時
    ************/
    $(window).on('scroll', function(){
      var scr = $(window).scrollTop();
      scr_ani(scr,offs_max);
    });// end scroll
  
  });


//   ハンバーガーメニュー

  $('.burger-btn').on('click',function(){
    $('.burger-btn').toggleClass('close');
    $('.nav-wrapper').fadeToggle(500);
    $('body').toggleClass('noscroll');
  });