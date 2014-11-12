function crossDomain(url,callback){
        var doc = document,
        	f = doc.createDocumentFragment();
        	div = doc.createElement('div'),
        	frm = doc.createElement("form"),
        	ifr = doc.createElement("iframe");
        div.id = "j_ajax_form";
        frm.id= "j_ajax_inner_form";
        frm.name = "j_ajax_inner_form";
        frm.setAttribute("method","post");
        ifr.id = "j_ajax_iframe";
        ifr.style.display = "none";
        ifr.setAttribute("name","j_ajax_iframe");
       	f.appendChild(frm);
       	f.appendChild(ifr);
	    doc.body.appendChild(div); 
        div.appendChild(f);
        var callbackName = ('jsonp_' + Math.random()).replace(".", "");
        frm.action = url + "&dataType=iframe&callback=top."+callbackName;
        frm.target = "j_ajax_iframe"; 
        frm.submit();
        
        if (callback != null){
            window[callbackName] = function(json){
                window[callbackName] = null;
                callback(json);
            }
        }

        
        return false; 

}
