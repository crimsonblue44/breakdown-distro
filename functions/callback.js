export async function onRequest(context) {
  const client_id = context.env.GITHUB_CLIENT_ID;
  const client_secret = context.env.GITHUB_CLIENT_SECRET;
  const url = new URL(context.request.url);
  const code = url.searchParams.get("code");
  
  if (!code) return new Response("Missing code", { status: 400 });

  try {
    const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({ client_id, client_secret, code })
    });

    const tokenData = await tokenResponse.json();
    const token = tokenData.access_token;

    if (!token) return new Response("Failed to get token", { status: 400 });

    const html = `
      <!DOCTYPE html>
      <html><body><script>
        window.opener.postMessage('authorization:github:success:{"token":"${token}", "provider":"github"}', window.location.origin);
        window.close();
      </script></body></html>
    `;
    return new Response(html, { headers: { "Content-Type": "text/html" } });

  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
}
