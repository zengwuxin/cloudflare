/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npx wrangler dev src/index.js` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npx wrangler publish src/index.js --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */


const html = `<!DOCTYPE html>
<body>
  <h1>Hello world!</h1>
</body>`;

const newLocationHost = "developers.cloudflare.com"; 
async function doRedirects(request) { 
	let reqUA = request.headers.get('User-Agent');
	let cookie = request.headers.get('Cookie');
	console.log("do cookies match", cookie=="cf-noredir=true")
	if (cookie=="cf-noredir=true"){
		return new Response(html, {
			headers: {
			  'content-type': 'text/html;charset=UTF-8',
			},
		});
	}
	else if (reqUA.match('curl/7.64.1')!=null) { 
		let newLocation = "https://"+newLocationHost+"/workers/about/";
		return Response.redirect(newLocation, 302);
	}
	return new Response(html, {
		headers: {
		  'content-type': 'text/html;charset=UTF-8',
		},
	});	
} 
addEventListener('fetch', async event => {
	event.respondWith(doRedirects(event.request));
});

