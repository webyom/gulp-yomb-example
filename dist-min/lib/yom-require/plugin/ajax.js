define("require-plugin/ajax",["global"],function(global){function _loadXhr(url,callback,opt){var xhr;try{xhr=new XMLHttpRequest}catch(e){xhr=new ActiveXObject("MSXML2.XMLHTTP")}xhr.open("GET",url,!0),xhr.setRequestHeader("X-Requested-With","XMLHttpRequest"),opt.noCache&&(xhr.setRequestHeader("If-Modified-Since","Sun, 27 Mar 1983 00:00:00 GMT"),xhr.setRequestHeader("Cache-Control","no-cache")),opt.withCredentials&&(xhr.withCredentials=!0),xhr.onreadystatechange=function(){var res;if(4===xhr.readyState)if(xhr.status>=200&&xhr.status<300){try{res=eval("("+xhr.responseText+")")}catch(e){if(require.debug)throw e;callback(null,_ERROR_OBJ)}callback(res)}else callback(null,_ERROR_OBJ)},xhr.send()}function req(e,a,r,t){var c,h,n=this._getResource(e);return r&&(n?(c=this._getParams(e),"jsonp"==c.dataType||"json"!=c.dataType&&0!==n.indexOf(location.protocol+"//"+location.host+"/")?require([e.replace(/^ajax/,"jsonp")],function(e){_cache[n]=e,r(e)},function(e,a){t&&t(e,a)}):!c.noCache&&_cache[n]?r(_cache[n]):!c.noCache&&_queue[n]?_queue[n].push({callback:r,errCallback:t}):(h=_queue[n]=_queue[n]||[],h.push({callback:r,errCallback:t}),_loadXhr(n,function(e,a){if(a===_ERROR_OBJ)for(;h.length;)t=h.shift().errCallback,t&&t(require.ERR_CODE.LOAD_ERROR,{uri:n});else for(_cache[n]=e;h.length;)h.shift().callback(e)},{noCache:!!c.noCache,withCredentials:!!c.withCredentials}))):r(this)),n&&_cache[n]||this}var _ERROR_OBJ={},_cache={},_queue={};return{require:req}});