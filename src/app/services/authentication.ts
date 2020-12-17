
export class authentication {
  constructor(public authService, public router) { }
  user;
  authenctication() {
    var token = this.authService.getAccessToken();
    if (!token) {
      this.authService.getAToken().subscribe((token) => {
        if (token.status == false) {
          this.router.navigate(['login']);
          return;
        }
        this.authService.setUserDetails(token.result).subscribe((userData) => {
          this.user = userData;
          this.authService.setUser(this.user);
          console.log(this.user);
        });
      });
    } else {
      this.authService.setUserDetails(token).subscribe((userData) => {
        this.user = userData;
        this.authService.setUser(this.user);
      });
    }
  }
}
