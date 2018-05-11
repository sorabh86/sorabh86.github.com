if ($(window).width() > 1024) { document.write("<" + "script src='js/jquery.preloader.js'></" + "script>"); }

jQuery(window).load(function () {
  $x = $(window).width();
  if ($x > 1024) {
    jQuery("#content .row").preloader();
  }

  // jQuery('.magnifier').touchTouch();
  jQuery('.spinner').animate({ 'opacity': 0 }, 1000, 'easeOutCubic', function () { jQuery(this).css('display', 'none') });
}); 

/*-------------------------*/
/* panel */
/* $(document).ready(function(){
  $('head').prepend('<link rel="stylesheet" href="css/docs.css" type="text/css" media="screen">');
  $('body').prepend('');
}); */ 
  
$(window).scroll(function(){
  if ($(this).scrollTop() > 20) {
    $("#advanced").css({position:'fixed'});
    $("#panel").css({height:$("#advanced").outerHeight()});
  } else {
    $("#advanced").css({position:'relative'});
    $("#panel").css({height:''});
  }
});  

$(function(){  
  $.cookie("panel");  
  $.cookie("panel2"); 
  var strCookies = $.cookie("panel");
  var strCookies2 = $.cookie("panel2");

  if(strCookies=='boo') {
    if(strCookies2=='opened'){
      $("#advanced").css({marginTop:'0px'}).removeClass('closed')
    }else{
      $("#advanced").css({marginTop:'-40px'}).addClass('closed')
    }

    $("#advanced .trigger").toggle(function(){
      $(this).find('strong').animate({opacity:0}).parent().parent('#advanced').removeClass('closed').animate({marginTop:'0px'},"fast");
      strCookies2=$.cookie("panel2",'opened');
      strCookies=$.cookie("panel",null);
    }, function(){
      $(this).find('strong').animate({opacity:1}).parent().parent('#advanced').addClass('closed').animate({marginTop:'-40px'},"fast");
      strCookies2=$.cookie("panel2",null);
      strCookies=$.cookie("panel",'boo');
    });

  } else {
    $("#advanced").css({marginTop:'0px'}).removeClass('closed');
    $("#advanced .trigger").toggle(function(){
      $(this).find('strong').animate({opacity:1}).parent().parent('#advanced').addClass('closed').animate({marginTop:'-40px'},"fast");
      strCookies2=$.cookie("panel2",null);
      strCookies=$.cookie("panel",'boo');
    }, function(){
      $(this).find('strong').animate({opacity:0}).parent().parent('#advanced').removeClass('closed').animate({marginTop:'0px'},"fast")
      strCookies2=$.cookie("panel2",'opened');
      strCookies=$.cookie("panel",null);
    });
  }
});
/*--------- end panel *------------*/

$(function(){
// IPad/IPhone
  var viewportmeta = document.querySelector && document.querySelector('meta[name="viewport"]'),
    ua = navigator.userAgent,
    gestureStart = function () {
      viewportmeta.content = "width=device-width, minimum-scale=0.25, maximum-scale=1.6";
    },
    scaleFix = function () {
      if (viewportmeta && /iPhone|iPad/.test(ua) && !/Opera Mini/.test(ua)) {
        viewportmeta.content = "width=device-width, minimum-scale=1.0, maximum-scale=1.0";
        document.addEventListener("gesturestart", gestureStart, false);
      }
    };

  scaleFix();
  
  // Menu Android
  var userag = navigator.userAgent.toLowerCase();
  var isAndroid = userag.indexOf("android") > -1; 
  if(isAndroid) {
    $('.sf-menu').responsiveMenu({autoArrows:true});
  }    
});
  
/* ------ fix fixed position for Android -----*/
var ua=navigator.userAgent.toLocaleLowerCase(),
  regV = /ipod|ipad|iphone/gi,
  result = ua.match(regV),
  userScale="";

if(!result){
  userScale=",user-scalable=0"
}
document.write('<meta name="viewport" content="width=device-width,initial-scale=1.0'+userScale+'">')
/*--------------*/

// Jquery Flex Slider
function Gallery(){
  container=jQuery(".flexslider"),
  clone=container.clone(!1),
  this.init=function(){
    if("block"==responsiveFlag){
      var i=container.find(".slides");
      i.kwicks({max:754,spacing:0}).find("li > a").click(function(){return!1})
    }else container.flexslider()
  },
  this.update=function(){
    var i=jQuery("#responsiveFlag").css("display");
    responsiveFlag!=i&&(responsiveFlag=i,container.replaceWith(clone),
    container=clone,
    clone=container.clone(!1),
    this.init())
  },
  this.init()
}
var Main=Main||{};
jQuery(window).load(function(){
  window.responsiveFlag = jQuery("#responsiveFlag").css("display");

  setTimeout(function(){Main.gallery = new Gallery;},2000);
  jQuery(window).resize(function () {
    Main.gallery.update()
  });
});
/*-----------------*/

// MODULES
var ecdApp = angular.module('ecdApp', ['ngRoute']);

// ROUTERS
ecdApp.config(function($routeProvider){
  $routeProvider.when('/', {
    templateUrl:'templates/main.html',
    controller:'mainController'
  }).when('/work',{
    templateUrl:'templates/work.html',
    controller:'workController'
  }).when('/blog',{
    templateUrl:'templates/blog.html',
    controller:'blogController'
  }).when('/process',{
    templateUrl:'templates/process.html',
    controller:'processController'
  }).when('/contact', {
    templateUrl:'templates/contact.html',
    controller:'contactController'
  }).when('/underconstruction', {
    templateUrl:'templates/underconstruction.html'
  }) ;
});

// CONTROLLERS
ecdApp.controller('navController', ['$scope', '$location', function($scope, $location){
  $scope.page = $location.path();
  $scope.$on('$locationChangeSuccess', function() {
    $scope.page = $location.path();
  });
}]);

ecdApp.controller('mainController', ['$scope', '$location', function($scope, $location){
  window.responsiveFlag=jQuery("#responsiveFlag").css("display"),
  Main.gallery = new Gallery,
  jQuery(window).resize(function(){
    Main.gallery.update()
  });
  jQuery('.magnifier').touchTouch();
  console.log($location.path());
}]);

ecdApp.controller('workController', ['$scope', function($scope){
  jQuery('.magnifier').touchTouch();
}]);

ecdApp.controller('blogController', ['$scope', function($scope){
  console.log('blog-controller');
}]);
ecdApp.controller('processController', ['$scope', function($scope){
  console.log('process-controller');
}]);

ecdApp.controller('contactController', ['$scope', '$http', function($scope, $http){
  
  $scope.contactFormSubmit = function(){
    console.log('submited', $scope.contact);
    $('.spinner').css({
      opacity: 1,
      display: "block"
    });

    $http({
      method: 'POST',
      url: "https://formspree.io/ssorabh.ssharma@hotmail.com",
      data: $scope.contact,
      dataType: "jsonp"
    }).then(function successCallback(res) {
      alert('Your message submitted, We will contact you within 24 Hours.');
      $scope.contact = {};
      $('.spinner').css({
        opacity: 0,
        display: "none"
      });
      console.log('success', res);
    }, function errorCallback(err) {
      $('.spinner').css({
        opacity: 0,
        display: "none"
      });
      alert('Error, Something is not right, Please try later');
      console.error('error', err);
    });
    return;

    $.ajax({
        type:"JSONP",
        url : "https://formspree.io/ssorabh.ssharma@hotmail.com",
        data : data,
        dataType: "json"
    }).done(function(r){
        console.log('sucess',r);
    }).error(function(){
        console.error('error');
    });
  }

}]);
