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

!function(e){
  e.fn.kwicks=function(s){
    var n={
      isVertical:!1,
      sticky:!1,
      defaultKwick:0,
      event:"mouseover",
      spacing:0,
      duration:500
    },
    a=e.extend(n,s),
    c=a.isVertical?"height":"width",
    t=a.isVertical?"top":"left";
  return this.each(function(){
    container=e(this);
    var s=container.children("li"),
      n=s.eq(0).css(c).replace(/px/,"");
      
    a.max?a.min=(n*s.size()-a.max)/(s.size()-1):a.max=n*s.size()-a.min*(s.size()-1),
    a.isVertical?container.css({width:s.eq(0).css("width"),
    height:n*s.size()+a.spacing*(s.size()-1)+"px"}):container.css({width:n*s.size()+a.spacing*(s.size()-1)+"px",
    height:s.eq(0).css("height")});
    
    var r=[];
    for(i=0;i<s.size();i++)
      for(r[i]=[],j=1;j<s.size()-1;j++)
        i==j?r[i][j]=a.isVertical?j*a.min+j*a.spacing:j*a.min+j*a.spacing:r[i][j]=(j<=i?j*a.min:(j-1)*a.min+a.max)+j*a.spacing;
      
    s.each(function(i){
      var o=e(this);
      0===i?o.css(t,"0px"):i==s.size()-1?o.css(a.isVertical?"bottom":"right","0px"):a.sticky?o.css(t,r[a.defaultKwick][i]):o.css(t,i*n+i*a.spacing),
      a.sticky&&(a.defaultKwick==i?(o.css(c,a.max+"px"),
      o.addClass("active")):o.css(c,a.min+"px")),o.css({margin:0,position:"absolute"}),
      o.bind(a.event,function(){
        var e=[],
          n=[];
          
        for(s.stop().removeClass("active"),j=0;j<s.size();j++)
          e[j]=s.eq(j).css(c).replace(/px/,""),n[j]=s.eq(j).css(t).replace(/px/,"");
          
        var l={};
        l[c]=a.max;
        var p=a.max-e[i],
          u=e[i]/p;
        
        o.addClass("active").animate(l,{step:function(o){
            var l=0!=p?o/p-u:1;
            s.each(function(o){
              o!=i&&s.eq(o).css(c,e[o]-(e[o]-a.min)*l+"px"),
              o>0&&o<s.size()-1&&s.eq(o).css(t,n[o]-(n[o]-r[i][o])*l+"px")
            })
          }, duration:a.duration,easing:a.easing
        })
      })
    }),
    a.sticky||container.bind("mouseleave",function(){
      var e=[],
        r=[];

      for(s.removeClass("active").stop(),i=0;i<s.size();i++)
        e[i]=s.eq(i).css(c).replace(/px/,""),
        r[i]=s.eq(i).css(t).replace(/px/,"");
      
      var o={};
        o[c]=n;
        
      var l=n-e[0];
      s.eq(0).animate(o,{step:function(o){
          var p=0!=l?(o-e[0])/l:1;
          for(i=1;i<s.size();i++)
            s.eq(i).css(c,e[i]-(e[i]-n)*p+"px"),
            i<s.size()-1&&s.eq(i).css(t,r[i]-(r[i]-(i*n+i*a.spacing))*p+"px")
        },duration:a.duration,easing:a.easing
      })
    })
  })
}}(jQuery);

var Main=Main||{};
jQuery(window).load(function(){
  window.responsiveFlag=jQuery("#responsiveFlag").css("display"),
  Main.gallery=new Gallery,
  jQuery(window).resize(function(){
    Main.gallery.update()
  })
});