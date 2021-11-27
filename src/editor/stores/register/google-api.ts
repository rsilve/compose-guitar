// https://developers.google.com/drive/api/v3/reference/files/create
// https://github.com/google/google-api-javascript-client

class GoogleApiWrapper {
  signIn(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      gapi.load("client:auth2", () => {
        gapi.client
          .init({
            apiKey: "__api_key__",
            clientId: "__api_client_id__",
            discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/translate/v2/rest"],
            scope: "profile https://www.googleapis.com/auth/drive",
          })
          .then(() => {
            gapi.auth2.getAuthInstance().isSignedIn.listen((signedIn) => {
              resolve(signedIn);
            });
            if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
              console.info("signin already valid on load");
              resolve(true);
            } else {
              gapi.auth2
                .getAuthInstance()
                .signIn({ ux_mode: "popup" /* "redirect" */ })
                .then((googleUser) => {
                  resolve(true);
                  return googleUser;
                })
                .then((googleUser) => console.info("signin completed", googleUser))
                .catch((reason) => {
                  console.error("auth failure", reason);
                  reject(reason);
                });
            }
          })
          .catch((reason) => {
            console.error("gapi client failure", reason);
            reject(reason);
          });
      });
    });
  }

  signOut(): void {
    gapi.auth2.getAuthInstance().signOut();
  }
}

export const googleApiWrapper = new GoogleApiWrapper();

export function googleApiSignOut(): void {
  gapi.auth2.getAuthInstance().signOut();
}

export function listFiles(): void {
  const restRequest = gapi.client.request({
    path: "/drive/v3/files",
  });

  restRequest.execute((response) => {
    console.info(response);
  });
}

export function login() {
  gapi.auth2.getAuthInstance().signIn();
}
