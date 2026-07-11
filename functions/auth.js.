export async function onRequest(context) {
  const client_id = context.env.GITHUB_CLIENT_ID;
  const state = crypto.randomUUID();
  const redirectUrl = new URL("https://github.com/login/oauth/authorize");
  
  redirectUrl.searchParams.set("client_id", client_id);
  redirectUrl.searchParams.set("scope", "repo,user");
  redirectUrl.searchParams.set("state", state);

  return Response.redirect(redirectUrl.toString(), 302);
}
