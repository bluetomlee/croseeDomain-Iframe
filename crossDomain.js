function crossDomain(url,callback){
        var div = document.createElement('div');
        div.innerHTML = "<div id=\"j_ajax_form\"><form id=\"j_ajax_inner_form\" name=\"j_ajax_inner_form\" method=\"post\"><input type=\"hidden\" id=\"j_ajax_inner_content\" name=\"j_ajax_inner_content\"></form><iframe id=\"j_ajax_iframe\" style=\"display:none\" height=\"1\" width=\"1\" name=\"j_ajax_iframe\"></iframe></div>";
        document.body.appendChild(div); 
        var frm = document.forms["j_ajax_inner_form"];
        var ifr = document.getElementById("j_ajax_iframe"); 
        var callbackName = ('jsonp_' + Math.random()).replace(".", "");
        frm.action = url + "&dataType=iframe&callback=top."+callbackName;
        frm.target = "j_ajax_iframe"; 
        frm.submit();
        
        if (callback != null){
            var script = document.createElement("script");
            script.setAttribute("type", "text/javascript");
            script.id = callbackName;
            document.getElementById("j_ajax_iframe").appendChild(script);
            window[callbackName] = function(json){
                var script = document.getElementById(callbackName);
                document.getElementById("j_ajax_iframe").removeChild(script);
                callback(json);
            }
            return callbackName;
        } 
        // window[callbackName] = function (json) {
  //           window[callbackName] = null;
        //  callback(json);
  //       };
        /* 
        if(ifr.attachEvent){ //  ie
            ifr.attachEvent("onload", function(){              
                var str = ifr.contentWindow; 
                // alert(str.document.body.innerHTML); 
                ifr.src = "about:blank"; 
                ifr.detachEvent("onload", arguments.callee); 
            })

        }else{
            ifr.onload = function(){ 
                var str = ifr.contentWindow;
                // alert(str.document.body.innerHTML);
                ifr.src = "about:blank";
                ifr.onload = null;
            }

        }
         */
        //if (callback != null){callback();}    
        return false; 

}
