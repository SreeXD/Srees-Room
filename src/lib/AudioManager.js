import { useAppStore } from '../stores/AppStore' 
import musicMp3 from '../assets/audio/HoKø - Lunar.mp3'
import clickWav from '../assets/audio/click.wav'

class AudioManager {
    constructor() {
        if (AudioManager.instance) {
            return AudioManager.instance
        }

        AudioManager.instance = this 
        
        this.audios = {}
        this.audioUrls = {}

        this.audioUrls['music'] = musicMp3
        this.audioUrls['click'] = clickWav
    }

    get(name) {
        this.audios[name] = new Audio(this.audioUrls[name])
        this.audios[name].volume = 0.2
        
        return this.audios[name]
    }

    play(name) {
        if (!this.audios[name]) this.get(name)

        if (useAppStore.getState().audioEnabled) {
            this.audios[name].play()
        }
    }

    pause(name) {
        if (this.audios[name]) {
            this.audios[name].pause()
        }
    }

    getProgress(name) {
        const audio = this.audios[name]

        if (!audio) return 0

        return audio.currentTime / audio.duration
    }
}

export default AudioManager