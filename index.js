
async function handleRequest(event) {
  const request = event.request
  const cacheUrl = new URL(request.url)

  // Construct the cache key from the cache URL
  const cacheKey = new Request(cacheUrl, request)
  const cache = caches.default
  // Check whether the value is already available in the cache
  // if not, you will need to fetch it from origin, and store it in the cache
  // for future access
  let response = await cache.match(cacheKey)

  if (!response) {
    // If not in cache, get it from origin
const init = {
    headers: {
      "content-type": "application/dns-json",
    }, 
    cf: {
      cacheEverything: true,
      cacheTtl: 10
    }
  };
  let facebookRequest = await fetch("https://www.facebook.com", init);
  let _text = await facebookRequest.text();
  let isStatusCorrect = facebookRequest.status == 200;
  
  let dnsRequest = await fetch("https://dns.google/resolve?name=facebook.com", init);
  let dnsResponse = await dnsRequest.text();
  var isUp = JSON.parse(dnsResponse).Status === 0;
  var color = isUp ? (isStatusCorrect ? "green" : "yellow") : "red";
  var text = isUp ? (isStatusCorrect ? "YES" : "KIND OF. ERROR PAGE.") : "NO";

  let randomUUID = crypto.randomUUID();
  let cssUUID = crypto.randomUUID();

response =   new Response(`<!doctype html>
<html lang="en">

<head>
<!--
I added these for debugging purposes:
${facebookRequest.headers.get("date")}
${dnsRequest.headers.get("date")}
${dnsResponse}
--> 
<link rel="preconnect dns-prefetch" href="https://www.google-analytics.com">
<link rel="preconnect dns-prefetch" href="https://www.googletagmanager.com">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<!-- Google Tag Manager -->
<script nonce='${randomUUID}'>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;var n=d.querySelector('[nonce]');
n&&j.setAttribute('nonce',n.nonce||n.getAttribute('nonce'));f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','G-2T3FL0Y975');</script>
<!-- End Google Tag Manager -->
<meta name="Description" content="${text}">
<meta charset="utf-8">
<meta property=”og:description” content=”Is Facebook up yet?” />

<meta property=”og:type content=”Website” />
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Is Facebook up yet?</title>
<style nonce='${cssUUID}'>
    h1 {
    	font-size: 180px;
    	font-style: normal;
    	font-variant: normal;
    	font-weight: 700;
    	line-height: 26.4px;
      color: ${color};
      text-align: center;
  		    }
    h2 {
    	font-size: 16px;
    	font-style: normal;
    	font-variant: normal;
    	font-weight: 380;
    	line-height: 26.4px;
      color: white;
      text-align: center;
  		    }

    a {
        color: green;
    }


    body {
        background: black }
    section {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-right: -50%;
        transform: translate(-50%, -50%) }
  </style>

<section>
<h1>${text}</h1>
<br>
<br>
<h2>quickly imitated from <a href="https://isitdns.com/">https://isitdns.com/</a> with CF workers by <a href="https://rod.codes">rod.codes</a></h2>`
, {
    headers: {
      "content-type": "text/html;charset=UTF-8",
      "cache-control": "no-cache",
      "etag": `w/"${dnsRequest.headers.get("date")}"`,
      "content-security-policy": `default-src 'self' www.google-analytics.com ssl.google-analytics.com;style-src 'nonce-${cssUUID}';script-src 'nonce-${randomUUID}' www.google-analytics.com ssl.google-analytics.com www.googletagmanager.com www.google-analytics.com;`,
    },
  });

    // Store the fetched response as cacheKey
    // Use waitUntil so you can return the response without blocking on
    // writing to cache
    event.waitUntil(cache.put(cacheKey, response.clone()))
  }
  return response
}

addEventListener("fetch", event => {
  return event.respondWith(handleRequest(event))
})
        

