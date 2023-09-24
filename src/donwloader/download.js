import deemix from "deemix";

import { deemixSettings, deezerInstance } from "./deemix.js";

export async function deemixDownloadWrapper(dlObj, coverArt, metadata) {
  let trackpaths = [];

  const listener = {
    send(key, data) {
      if (data.downloaded) {
        trackpaths.push(data.downloadPath);
      }

      if (
        data.state !== "tagging" &&
        data.state !== "getAlbumArt" &&
        data.state !== "getTags" &&
        !dlObj.isCanceled
      ) {
        console.log(JSON.stringify({ key, data }));
      }
    },
  };

  listener.send("coverArt", coverArt);
  listener.send("metadata", metadata);

  let deemixDownloader = new deemix.downloader.Downloader(
    deezerInstance,
    dlObj,
    deemixSettings,
    listener
  );
  
  try {
    await deemixDownloader.start();
  } catch (err) {
    console.error(err.toString());
  }

  if (dlObj.isCanceled) {
    console.log("download gracefully cancelled, cleaning up");
    trackpaths.forEach((q) => {
      console.log(`removing ${q}`);
    });
  } else if (trackpaths.length > 1) {
    console.log(JSON.stringify({ key: "zipping" }));

    const folderName = trackpaths[0].split("/").slice(-2)[0];
    console.log(`zipping ${folderName}`);

  } else if (trackpaths.length === 1) {
    console.log(
      JSON.stringify({
        key: "download",
        data: trackpaths[0].replace(process.cwd(), ""),
      })
    );
  }
}
