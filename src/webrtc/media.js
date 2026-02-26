const getMedia = async ({ audio, video }) => {
  try {
    return await navigator.mediaDevices.getUserMedia({
      audio,
      video,
    });
  } catch (err) {
    console.error("Media permission error:", err);
    throw err;
  }
};
