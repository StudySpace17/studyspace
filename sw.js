const C="studyspace-v08";
const SHELL=["./","./index.html","./manifest.json","./icon-192.png","./icon-512.png"];
const LIBS=["https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js","https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js","https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(SHELL).then(()=>Promise.all(LIBS.map(u=>c.add(u).catch(()=>{}))))).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;
 const own=new URL(e.request.url).origin===location.origin;
 if(own){e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp));return r}).catch(()=>caches.match(e.request,{ignoreSearch:true}).then(r=>r||caches.match("./index.html"))))}
 else{e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(x=>{const cp=x.clone();caches.open(C).then(c=>c.put(e.request,cp));return x})))}});
