import * as deemix from "deemix";
import { deezerInstance, format } from "../deemix.js";
import { deemixDownloadWrapper } from "../download.js";

export const trackToDownload = async (id) => {
  let dlObj;

  try {
    dlObj = await deemix.generateDownloadObject(
      deezerInstance,
      `https://www.deezer.com/track/${id}`,
      format
    );

    // TODO: Borrar despues esto solo es un test
    console.log(`Track_Url: https://www.deezer.com/track/${id}`);
  } catch (err) {
    console.log(`Track no encontrado... :( ${err}`);
    return err;
  }

  let isDone = false;

  let trackInfoAux = await deezerInstance.api.get_track(
    parseInt(id.toString())
  );

  let track;

  try {
    track = id || (await deezerInstance.api.get_track(id));

    if (!id) id = track;
  } catch (err) {
    return `Track with ${id} not found`;
  }

  console.log(`No recuerdo que es: ${trackInfoAux.id}`);
  await deemixDownloadWrapper(dlObj, trackInfoAux.id, {
    id: track.id,
    title: track.title,
    artist: trackInfoAux.artist.name,
  });
  isDone = true;
  console.log(`Descarga terminada: ${id}`);
};
