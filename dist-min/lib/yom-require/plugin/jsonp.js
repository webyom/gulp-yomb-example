define("require-plugin/jsonp",["global"],function(e){function t(e){return Array.prototype.slice.call(e)}function a(){var e,t;t=document.getElementsByTagName("script");for(var a=0;a<t.length;a++)if(e=t[a],"interactive"==e.readyState)return e;return e}function n(e,t,a,n){e.addEventListener?(e.removeEventListener("load",a,!1),e.removeEventListener("error",n,!1)):e.detachEvent("onreadystatechange",a),e.parentNode.removeChild(e)}function r(e,a,r,l){function p(){n(A,r,p,f);var e=u[r].getCallbackArgs();e==m.NOT_CALLBACKED?a(null,c):y.apply(null,t(e))}function f(){n(A,r,p,f),a(null,c)}function v(){!A||"loaded"!=A.readyState&&"complete"!=A.readyState||(n(A,r,v),A=null,E||a(null,c))}var b="REQUIRE_JSONP_"+g++,E=!1,y=s[b]=function(){delete s[b],E=!0,a.apply(null,t(arguments))};u[r]=u[r]||new m(r);var A=document.createElement("script");A.attachEvent&&!o?(d=!0,A.attachEvent("onreadystatechange",v)):(A.addEventListener("load",p,!1),A.addEventListener("error",f,!1)),A.charset=l,A.type="text/javascript",A.async="async",A.src=e,A.setAttribute("data-require-jsonp-id",b),h=A,A=i.insertBefore(A,i.firstChild),h=null}function l(e,t,a,n){var l,i,o,u,s=this._getResource(e);return a&&(s?(l=this._getParams(e),!l.noCache&&p[s]?a(p[s]):!l.noCache&&f[s]?f[s].push({callback:a,errCallback:n}):(u=f[s]=f[s]||[],u.push({callback:a,errCallback:n}),i=l.callbackName||"callback",o=l.charset||"utf-8",r(s,function(e,t){if(t===c)for(;u.length;)n=u.shift().errCallback,n&&n(require.ERR_CODE.LOAD_ERROR,{uri:s});else for(p[s]=e;u.length;)u.shift().callback(e)},i,o))):a(this)),s&&p[s]||this}var c={},i=document.head||document.getElementsByTagName("head")[0]||document.documentElement,o="undefined"!=typeof opera&&"[object Opera]"===opera.toString(),u={},s={},d=!1,h=null,p={},f={},g=0,m=function(a){var n=this;this._name=a,this._callbackArgs=m.NOT_CALLBACKED,e[a]=function(){return n._callback.apply(n,t(arguments))}};return m.NOT_CALLBACKED=new Object,m.prototype._callback=function(){var e,n,r;d?(e=h||a(),e&&(n=e.getAttribute("data-require-jsonp-id"),n&&(r=s[n],r&&r.apply(null,t(arguments))))):this._callbackArgs=arguments},m.prototype.getCallbackArgs=function(){var e=this._callbackArgs;return this._callbackArgs=m.NOT_CALLBACKED,e},{require:l}});