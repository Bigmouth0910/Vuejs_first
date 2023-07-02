(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 56)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 57
  });

  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

  // Scroll reveal calls
  window.sr = ScrollReveal();

  sr.reveal('.sr-icon-1', {
    delay: 200,
    scale: 0
  });
  sr.reveal('.sr-icon-2', {
    delay: 400,
    scale: 0
  });
  sr.reveal('.sr-icon-3', {
    delay: 600,
    scale: 0
  });
  sr.reveal('.sr-icon-4', {
    delay: 800,
    scale: 0
  });
  sr.reveal('.sr-button', {
    delay: 200,
    distance: '15px',
    origin: 'bottom',
    scale: 0.8
  });
  sr.reveal('.sr-contact-1', {
    delay: 200,
    scale: 0
  });
  sr.reveal('.sr-contact-2', {
    delay: 400,
    scale: 0
  });

  // Magnific popup calls
  $('.popup-gallery').magnificPopup({
    delegate: 'a',
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    mainClass: 'mfp-img-mobile',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0, 1]
    },
    image: {
      tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
    }
  });
  
  //生成从minNum到maxNum的随机数
  function randomNum(minNum,maxNum){ 
    switch(arguments.length){ 
        case 1: 
            return parseInt(Math.random()*minNum+1,10); 
        break; 
        case 2: 
            return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
        break; 
            default: 
                return 0; 
            break; 
    } 
  }
  /**
   * 申请注册
   */
  $('.open-form').magnificPopup({
    type: 'inline',
    preloader: false,
    focus: '#name',

    // When elemened is focused, some mobile browsers in some cases zoom in
    // It looks not nice, so we disable it:
    callbacks: {
      beforeOpen: function() {
        if($(window).width() < 700) {
          this.st.focus = false;
        } else {
          this.st.focus = '#name';
        }

      }
    }
  });

  $('.register').magnificPopup({
    type: 'inline',
    preloader: false,
    focus: '#name',

    // When elemened is focused, some mobile browsers in some cases zoom in
    // It looks not nice, so we disable it:
    callbacks: {
      beforeOpen: function() {
        if($(window).width() < 700) {
          this.st.focus = false;
        } else {
          this.st.focus = '#name';
        }
      }
    }
  });

  // 跳登录页面
  $('.login').click(function(){
    var a = $("<a href='http://c.tdhis.com/html/login.html' target='_blank'>login</a>").get(0);
    var e = document.createEvent('MouseEvents');
    e.initEvent( 'click', true, true );
    a.dispatchEvent(e);
  });

  function msg(msg,type){
    $.Toast("提示", msg, type, {
        stack: true,
        has_icon:false,
        position_class: "toast-top-center",
        has_close_btn:false,
        fullscreen:false,
        timeout:3000,
        sticky:false,
        has_progress:true,
        rtl:false,
    });
  }

  $('.subForm').click(function(event){
    var phone = document.getElementById("phone").value;
    var email = document.getElementById("email").value;
    var name = document.getElementById("name").value;
    var city = document.getElementById("city").value;
    var isPhone=/^(?:13\d|15\d|18\d|17\d|16\d)\d{5}(\d{3}|\*{3})$/; //手机号码验证规则
    var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/; //验证邮箱的正则表达式
    
    if(!name){
      msg('请输入机构名称！','error');
      return false;
    }
    if(!city){
      msg('请输入城市！','error');
      return false;
    }
    if(!email){
      msg('请输入邮箱地址！','error');
      return false;
    }
    if(!phone){
      msg('请输入手机号码！','error');
      return false;
    }

    if(!isPhone.test(phone)){
        msg("手机号码错误！"+phone,'error');
        return false;
    }
 
    if(!reg.test(email)){
        msg("邮箱错误！"+email,'error');
        return false;
    }

    //获取input的值
		var $value = $input.value;
		//判断input值与code值是否一致[不区分大小写-对比时一致大写]
		if($value.toUpperCase() === code.toUpperCase()){
		}else{
			//不一致，刷新验证码
			console.log('验证码不正确');
      msg("验证码不正确",'error');
      createCode();
      return false;
    }
    
    $.ajax({
      //几个参数需要注意一下
          type: "POST",//方法类型
          dataType: "json",//预期服务器返回的数据类型
          url: "http://106.13.127.53:3001/users/addApply" ,//url
          data: $('#test-form').serialize(),
          success: function (result) {
              console.log(result);//打印服务端返回的数据(调试用)
              if (result.code == 200) {
                  msg("申请成功,三日内账号将发送您邮箱，请注意查收!",'success');
              }

              var magnificPopup = $.magnificPopup.instance; 
              // save instance in magnificPopup variable
              magnificPopup.close(); 
              // Close popup that is currently opened

          },
          error : function() {
              msg("申请失败，请稍后重试！",'error');
          }
      });
  });

  $(".flexslider").flexslider({
		animation: "slide",
    animationLoop: true,
    // itemWidth: 1960,
    itemMargin: 1,
		minItems: 1,
    maxItems: 2
    // pausePlay: true
	});

})(jQuery); // End of use strict
