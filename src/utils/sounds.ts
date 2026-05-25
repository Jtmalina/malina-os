// Using direct, reliable URLs for classic Windows 95 sounds
const SOUNDS = {
  startup: 'https://files.catbox.moe/978wcl.mp3', // Win95 Startup
  chord: 'https://files.catbox.moe/7x9y5l.wav',   // Chord
  ding: 'https://files.catbox.moe/8u85n7.wav',    // Ding
  tada: 'https://files.catbox.moe/3p0j5e.wav',    // Tada
  chimes: 'https://files.catbox.moe/6v9b9h.wav',  // Chimes
};

export const playSound = (name: keyof typeof SOUNDS) => {
  const audio = new Audio(SOUNDS[name]);
  
  // Browsers block autoplay unless there's an interaction.
  // Since our sounds trigger on clicks (opening windows, booting), they should work.
  const playPromise = audio.play();
  
  if (playPromise !== undefined) {
    playPromise.catch(error => {
      console.warn(`Playback blocked or failed for ${name}:`, error);
    });
  }
};
