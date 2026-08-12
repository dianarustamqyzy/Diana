let audioContext: AudioContext | null = null;

function getAudioContext() {
  if (!audioContext) audioContext = new AudioContext();
  return audioContext;
}

function playTone(
  context: AudioContext,
  frequency: number,
  startsAt: number,
  duration: number,
  volume = 0.055,
) {
  const oscillator = context.createOscillator();
  const gain = context.createGain();

  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(frequency, startsAt);
  oscillator.frequency.exponentialRampToValueAtTime(frequency * 1.08, startsAt + duration);
  gain.gain.setValueAtTime(0.0001, startsAt);
  gain.gain.exponentialRampToValueAtTime(volume, startsAt + 0.025);
  gain.gain.exponentialRampToValueAtTime(0.0001, startsAt + duration);

  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start(startsAt);
  oscillator.stop(startsAt + duration);
}

async function withAudioContext(play: (context: AudioContext) => void) {
  try {
    const context = getAudioContext();
    if (context.state === 'suspended') await context.resume();
    play(context);
  } catch {
    // Звук — приятное дополнение: игра продолжает работать без Web Audio.
  }
}

export function playPetSound() {
  void withAudioContext((context) => {
    const now = context.currentTime;
    playTone(context, 520, now, 0.16);
    playTone(context, 690, now + 0.12, 0.2, 0.045);
  });
}

export function playSuccessSound() {
  void withAudioContext((context) => {
    const now = context.currentTime;
    playTone(context, 440, now, 0.18);
    playTone(context, 554, now + 0.12, 0.2);
    playTone(context, 659, now + 0.25, 0.28, 0.045);
  });
}
