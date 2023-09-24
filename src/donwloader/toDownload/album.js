import * as deemix from "deemix";
import { deezerInstance, format } from "../deemix.js";
import { deemixDownloadWrapper } from "../download.js";

export const albumToDownload = async (id) => {
  let dlObj;

  try {
    dlObj = await deemix.generateDownloadObject(
      deezerInstance,
      `https://www.deezer.com/album/${id}`,
      format
    );
  } catch (err) {
    return err;
  }

  let isDone = false;

  let AlbumInfoAux = await deezerInstance.api.get_album(
    parseInt(id.toString())
  );

  let album;

  try {
    album = id || (await deezerInstance.api.get_album(id));
    if (!id) id = album;
  } catch (err) {
    return `Album not found ${err}`;
  }

  await deemixDownloadWrapper(dlObj, album.cover_medium, {
    id: album.id,
    title: album.title,
    artist: AlbumInfoAux.artist.name,
  });
  isDone = true;

  console.log(`Album descargado: ${id}`);
  // console.log(`Track info: ${JSON.stringify(trackInfoAux)}`);
};
