interface LightDMLanguage {
  code: string;
  name: string;
}

interface LightDMSession {
  key: string;
  name: string;
}

interface LightDMUser {
  display_name: string;
  image?: string;
  username: string;
}

interface LightDM {
  authentication_user: null | string;
  autologin_guest: boolean;
  autologin_timeout: number;
  autologin_user: null | string;
  can_hibernate: boolean;
  can_restart: boolean;
  can_shutdown: boolean;
  can_suspend: boolean;
  default_session: null | string;
  has_guest_account: boolean;
  hide_users: boolean;
  hostname: string;
  is_authenticated: boolean;
  in_authentication: boolean;
  language: string;
  layout: string;
  layouts: object[];
  num_users: number;
  select_guest: boolean;
  select_user: null | string;
  sessions: LightDMSession[];
  users: LightDMUser[];

  authenticate(username: string): void;
  cancel_authentication(): void;
  /** Answer LightDM's most recent prompt for input. */
  respond(text: string): void;
  /** Start a session for the currently authenticated user. */
  start_session_sync(session?: string): void;

  // Power Management
  hibernate(): void;
  suspend(): void;
  restart(): void;
  shutdown(): void;
}
