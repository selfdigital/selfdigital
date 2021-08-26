import { Oauth2TokenRepository } from "./repositories/oauth2-token.repository";
import { Oauth2ClientRepository } from "./repositories/oauth2-client.repository";
import { Oauth2CodeRepository } from "./repositories/oauth2-code.repository";
import { Oauth2ScopeRepository } from "./repositories/oauth2-scope.repository";
import { Oauth2StateRepository } from "./repositories/oauth2-state.repository";

export const oauth2Providers = [
  {
    provide: "OAUTH2_TOKEN_REPOSITORY",
    useValue: Oauth2TokenRepository
  },
  {
    provide: "OAUTH2_CLIENT_REPOSITORY",
    useValue: Oauth2ClientRepository
  },
  {
    provide: "OAUTH2_CODE_REPOSITORY",
    useValue: Oauth2CodeRepository
  },
  {
    provide: "OAUTH2_SCOPE_REPOSITORY",
    useValue: Oauth2ScopeRepository
  },
  {
    provide: "OAUTH2_STATE_REPOSITORY",
    useValue: Oauth2StateRepository
  }
];
