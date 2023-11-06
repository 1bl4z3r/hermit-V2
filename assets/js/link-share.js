async function linkShare(t, u, s){
let shd = {title: t,text: s,url: u};
if(typeof navigator.canShare === "function" && navigator.canShare(shd)){
    try {await navigator.share(shd);} catch (er) {console.error(er);}
}else if (navigator?.clipboard?.writeText){
    try {await navigator.clipboard.writeText(u);} catch (err) {console.error(err);} 
}else{console.log("Neither WebShare API nor CLipboard API is supported")}}