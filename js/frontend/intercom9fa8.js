(function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',intercomSettings);}else{var d=document;var i=function(){i.c(arguments)};i.q=[];i.c=function(args){i.q.push(args)};w.Intercom=i;function l(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/ldsmllng';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);}if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();
(function(){
    $.ajax({
        url: intercomSettingsUrl,
        success: function(data) {
            try {
                window.intercomSettings = JSON.parse(data);
            } catch (e) {
                console.log('failed to get intercom settings');
            }
        },
        complete: function(data) {
            window.Intercom('boot', window.intercomSettings);
        }
    })
})();