import { create } from 'zustand'
import { shallow } from 'zustand/shallow'
import produce from 'immer'
import * as THREE from 'three'

export const useAppStore = create((set) => ({
    audioEnabled: false,
    inMotion: false,
    inHover: false,
    focusObject: null,
    cursorText: '',
    experienceStarted: false,
    experienceLoading: true,
    exploredCount: 0,
    musicPlaying: true,
    movement: new THREE.Vector2(),
    zoomDelta: 0,
    cursorPosition: new THREE.Vector2(),
    toggleAudio: () => set(produce((state) => {
        state.audioEnabled = !state.audioEnabled
    })),
    incrementExploredCount: () => set(produce((state) => {
        state.exploredCount++
    }))
}))

export const useAppState = (func) => useAppStore(func, shallow)