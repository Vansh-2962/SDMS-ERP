export class RefreshSessionAlreadyRevokedError extends Error {
  constructor() {
    super("Refresh session has already been revoked");
    this.name = "RefreshSessionAlreadyRevokedError";
  }
}
