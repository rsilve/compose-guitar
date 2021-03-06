// https://developers.google.com/drive/api/v3/reference/files/create
// https://github.com/google/google-api-javascript-client

import { IStateTrack, IStateTrackUploaded } from "../../../lib/state";

function getString(value: string | boolean | undefined): string {
  if (typeof value === "boolean") {
    return "";
  }
  if (value === undefined) {
    return "";
  }
  return value;
}

class GoogleApiWrapper {
  signIn(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      gapi.load("client:auth2", () => {
        gapi.client
          .init({
            apiKey: getString(import.meta.env?.VITE_API_KEY || ""),
            clientId: getString(import.meta.env?.VITE_API_CLIENT_ID || ""),
            discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"],
            scope: "profile https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.appdata",
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

  saveSong(track: IStateTrack): Promise<string> {
    const newTrack = { ...track };
    const metadata = {
      name: newTrack.id,
      mimeType: "application/json",
      parents: ["appDataFolder"],
      appProperties: { type: "song" },
    };
    const form = new FormData();
    form.append("metadata", new Blob([JSON.stringify(metadata)], { type: "application/json" }));
    form.append("file", new Blob([JSON.stringify(track)], { type: "application/json" }));
    return fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart", {
      method: "POST",
      headers: new Headers({ Authorization: `Bearer ${gapi.auth.getToken().access_token}` }),
      body: form,
    })
      .then((res) => res.json())
      .then((body: unknown) => {
        const { id } = body as { id: string };
        return id;
      });
  }

  updateSong(track: IStateTrack, id: string): Promise<string> {
    return new Promise((resolve) => {
      const restRequest = gapi.client.request({
        method: "PATCH",
        path: `/upload/drive/v3/files/${id}`,
        headers: {
          contentType: "application/json",
        },
        body: track,
      });
      restRequest.execute(() => {
        resolve(id);
      });
    });
  }

  getSong(id: string): Promise<IStateTrackUploaded> {
    return new Promise((resolve) =>
      gapi.client.drive.files.get({ fileId: id, alt: "media" }).execute((response) =>
        resolve({
          id,
          track: response.result as IStateTrack,
        })
      )
    );
  }

  listFiles(): Promise<IStateTrackUploaded[]> {
    return new Promise((resolve) => {
      gapi.client.drive.files
        .list({
          alt: "json",
          spaces: "appDataFolder",
          fields: "files/id",
          q: "appProperties has { key='type' and value='song' }",
        })
        .execute((response) => {
          const songs = response.result.files?.map((value) => this.getSong(value.id || ""));
          if (songs) {
            Promise.all(songs).then((values) => resolve(values));
          } else {
            resolve([]);
          }
        });
    });
  }

  delete(index: string): Promise<void> {
    return new Promise((resolve) => gapi.client.drive.files.delete({ fileId: index }).execute(() => resolve()));
  }
}

export const googleApiWrapper = new GoogleApiWrapper();
