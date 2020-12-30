
export class authentication {
  constructor() { }
  user;
  async authenctication(authService, router) {
    var token = await authService.getAccessToken();
    if (!token) {
      authService.getAToken().subscribe((token) => {
        if (token.status == false) {
          router.navigate(['login']);
          return;
        }
        authService.setUserDetails(token.result).subscribe((userData) => {
          this.user = userData;
          authService.setUser(this.user);
          return this.user;
        });
      });
    } else {
      authService.setUserDetails(token).subscribe((userData) => {
        this.user = userData;
        authService.setUser(this.user);
        return this.user;
      });
    }
  }
}
