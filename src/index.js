import { deezerInstance } from "./donwloader/deemix.js";
import { trackToDownload } from "./donwloader/toDownload/track.js";

export let searchcache = {};
export let albumcache = {};
export let trackcache = {};

const arl =
  "9473f0e40b17d7c0d9d1692732c7de60ab9190d8371dd40e2451912eeea88d4ef3a7cf968329648d2ea463ee832518b5274bf262f92b19dc9867db1d912daccab1c111d86f25d00ac3bb5adb9031ee11ce97a16a6b9dae3a87ad520c3d5910a5";

const downloadTrack = async (tracId) => {
  try {
    const a = await deezerInstance.login_via_arl(arl || "");
    console.log(`Estas en deeze?: ${a}`);

    await trackToDownload(tracId);
  } catch (error) {
    console.error("Error:", error);
  }
};

downloadTrack("677216");
