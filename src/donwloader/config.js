import toml from "toml";

const settingsDeemix = `
[limits]
# the max amount of search results to send to the client
searchLimit = 15

[deemix]
# the format of the song to download
# can be "FLAC", "MP3_320", "MP3_128" or "DEFAULT"
# NOTE: if you set it to a format your account doesnt support, things will just.. silently break
# sorry
trackFormat = "MP3_320"
# templates for the folder and file names
trackNameTemplate = "%artist% - %title%"
albumTrackNameTemplate = "%tracknumber%. %artist% - %title%"
albumNameTemplate = "%artist% - %album%"
# create a m3u8 playlist file or not
createM3U8File = false
# cover art settings
# embed cover art in the music files themselves
embeddedArtworkPNG = true
embeddedArtworkSize = 800
# put the cover art file inside of the folder
saveArtwork = true
localArtworkSize = 1200
localArtworkFormat = "jpg"

jpegImageQuality = 80

removeDuplicateArtists = true
`;

export const config = toml.parse(settingsDeemix);

console.log("Configuración cargada... ;)");
