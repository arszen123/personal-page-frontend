export interface OauthClient {
  id: string,
  name: string,
  scopes: Array<OauthScope>,
}

interface OauthScope {
  name: string,
  description: string,
}
