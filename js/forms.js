!function(e){e.fn.forms=function(t){return this.each(function(){var a=e(this),i=a.data("forms")||{errorCl:"error",emptyCl:"empty",invalidCl:"invalid",notRequiredCl:"notRequired",successCl:"success",successShow:"4000",mailHandlerURL:"bat/MailHandler.php",ownerEmail:"support@template-help.com",stripHTML:!0,smtpMailServer:"localhost",targets:"input,textarea",controls:"a[data-type=reset],a[data-type=submit]",validate:!0,rx:{".name":{rx:/^[a-zA-Z'][a-zA-Z-' ]+[a-zA-Z']?$/,target:"input"},".state":{rx:/^[a-zA-Z'][a-zA-Z-' ]+[a-zA-Z']?$/,target:"input"},".email":{rx:/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,target:"input"},".phone":{rx:/^\+?(\d[\d\-\+\(\) ]{5,}\d$)/,target:"input"},".fax":{rx:/^\+?(\d[\d\-\+\(\) ]{5,}\d$)/,target:"input"},".message":{rx:/.{20}/,target:"textarea"}},preFu:function(){i.labels.each(function(){var t=e(this),a=e(i.targets,this),r=a.val(),n=function(){var e=a.is("input")?(e=t.html().match(/value=['"](.+?)['"].+/),!!e&&!!e[1]&&e[1]):a.html();return""==r?r:e}();n!=r&&a.val(r=n||r),t.data({defVal:r}),a.bind("focus",function(){a.val()==r&&(a.val(""),i.hideEmptyFu(t),t.removeClass(i.invalidCl))}).bind("blur",function(){i.validateFu(t),i.isEmpty(t)&&(a.val(r),i.hideErrorFu(t.removeClass(i.invalidCl)))}).bind("keyup",function(){t.hasClass(i.invalidCl)&&i.validateFu(t)}),t.find("."+i.errorCl+",."+i.emptyCl).css({display:"block"}).hide()}),i.success=e("."+i.successCl,i.form).hide()},isRequired:function(e){return!e.hasClass(i.notRequiredCl)},isValid:function(t){var a=!0;return e.each(i.rx,function(e,i){t.is(e)&&(a=i.rx.test(t.find(i.target).val()))}),a},isEmpty:function(e){var t;return""==(t=e.find(i.targets).val())||t==e.data("defVal")},validateFu:function(t){t.each(function(){var t=e(this),a=i.isRequired(t),r=i.isEmpty(t),n=i.isValid(t);r&&a?i.showEmptyFu(t.addClass(i.invalidCl)):i.hideEmptyFu(t.removeClass(i.invalidCl)),r||(n?i.hideErrorFu(t.removeClass(i.invalidCl)):i.showErrorFu(t.addClass(i.invalidCl)))})},getValFromLabel:function(t){var a=e("input,textarea",t).val(),i=t.data("defVal");return t.length?a==i?"nope":a:"nope"},submitFu:function(){i.validateFu(i.labels),i.form.has("."+i.invalidCl).length||e.ajax({type:"POST",url:i.mailHandlerURL,data:{name:i.getValFromLabel(e(".name",i.form)),email:i.getValFromLabel(e(".email",i.form)),phone:i.getValFromLabel(e(".phone",i.form)),fax:i.getValFromLabel(e(".fax",i.form)),state:i.getValFromLabel(e(".state",i.form)),message:i.getValFromLabel(e(".message",i.form)),owner_email:i.ownerEmail,stripHTML:i.stripHTML},success:function(){i.showFu()}})},showFu:function(){i.success.slideDown(function(){setTimeout(function(){i.success.slideUp(),i.form.trigger("reset")},i.successShow)})},controlsFu:function(){e(i.controls,i.form).each(function(){var t=e(this);t.bind("click",function(){return i.form.trigger(t.data("type")),!1})})},showErrorFu:function(e){e.find("."+i.errorCl).slideDown()},hideErrorFu:function(e){e.find("."+i.errorCl).slideUp()},showEmptyFu:function(e){e.find("."+i.emptyCl).slideDown(),i.hideErrorFu(e)},hideEmptyFu:function(e){e.find("."+i.emptyCl).slideUp()},init:function(){i.form=i.me,i.labels=e("label",i.form),i.preFu(),i.controlsFu(),i.form.bind("submit",function(){return i.validate?i.submitFu():i.form[0].submit(),!1}).bind("reset",function(){i.labels.removeClass(i.invalidCl),i.labels.each(function(){var t=e(this);i.hideErrorFu(t),i.hideEmptyFu(t)})}),i.form.trigger("reset")}};i.me||i.init(i.me=a.data({forms:i})),"object"==typeof t&&e.extend(i,t)})}}(jQuery),$(window).load(function(){$("#contact-form").forms({ownerEmail:"#"})});