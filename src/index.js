import { deezerInstance } from "./donwloader/deemix.js";
import { trackToDownload } from "./donwloader/toDownload/track.js";

export let searchcache = {};
export let albumcache = {};
export let trackcache = {};

const arl =
  "f819c479775f4e1e6de671ff0ef7def36cf42f64a8d4d50316bc51b497b9b3a0adb1405479edcb6cf768b2cdf12f25e5fdb343b0534d47f69f751473246ef88218ff66eb77cc0d5c72e6e4c60e32c870c9e57402359ba39aa0943ed565a39893";

const downloadTrack = async (trackId) => {
  try {
    const a = await deezerInstance.login_via_arl(arl);
    console.log(`Estas en deeze?: ${a}`);

    await trackToDownload(trackId);
  } catch (error) {
    console.error("Error:", error);
  }
};

downloadTrack("2660821642");
