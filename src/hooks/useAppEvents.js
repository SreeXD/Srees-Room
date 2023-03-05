import { useEffect } from 'react'
import * as THREE from 'three'
import { useAppStore, useAppState } from '../stores/AppStore'
import { getDistanceSquared } from '../lib/utils'

export default function useAppEvents() {
    const [cursorPosition, movement, experienceStarted] = useAppState(state => [state.cursorPosition, state.movement, state.experienceStarted])

    useEffect(() => {
        if (!experienceStarted) {
            const onPointerMove = (e) => {
                cursorPosition.set(e.clientX, e.clientY)
            }
            
            const onClick = (e) => {
                useAppStore.setState({ 
                    experienceStarted: true, 
                    audioEnabled: true
                })
            }

            document.addEventListener('pointermove', onPointerMove)
            document.addEventListener('click', onClick)

            return () => {
                document.removeEventListener('pointermove', onPointerMove)
                document.removeEventListener('click', onClick)
            }
        } 

        else {
            const lastPosition = new THREE.Vector2()
            const currentPosition = new THREE.Vector2()
            let lastDistance = 0
            let started = false 
            let zoomStarted = false
    
            const onPointerDown = (e) => {
                e.preventDefault()

                lastPosition.set(e.clientX, e.clientY)
                cursorPosition.set(e.clientX, e.clientY)
                useAppStore.setState({ inMotion: true }) 
                started = true
            }
    
            const onPointerUp = (e) => {
                useAppStore.setState({ inMotion: false })
                started = false
            }
    
            const onPointerMove = (e) => {
                if (started) {
                    currentPosition.set(e.clientX, e.clientY)
                    movement.copy(currentPosition.clone().sub(lastPosition))
                    lastPosition.copy(currentPosition)
                }
    
                else {
                    cursorPosition.set(e.clientX, e.clientY)
                }
            }
    
            const onTouchStart = (e) => {
                const touch = e.touches[0]

                if (e.touches.length == 1) {
                    lastPosition.set(touch.clientX, touch.clientY)
                    useAppStore.setState({ inMotion: true })
                    started = true
                }

                else if (e.touches.length == 2) {
                    const touch2 = e.touches[1]
                    lastDistance = getDistanceSquared(touch.clientX, touch.clientY, touch2.clientX, touch2.clientY)
                    zoomStarted = true
                }                
            }
    
            const onTouchEnd = (e) => {
                if (started) {
                    started = false
                    useAppStore.setState({ inMotion: false })
                }

                if (zoomStarted) {
                    zoomStarted = false
                    lastDistance = 0
                }
            }
    
            const onTouchMove = (e) => {
                const touch = e.touches[0]
                currentPosition.set(touch.clientX, touch.clientY)

                if (started && e.touches.length == 1) {
                    movement.copy(currentPosition.clone().sub(lastPosition))
                    lastPosition.copy(currentPosition)
                }

                else if (zoomStarted && e.touches.length == 2) {
                    const touch2 = e.touches[1]
                    const distance = getDistanceSquared(touch.clientX, touch.clientY, touch2.clientX, touch2.clientY)
                    const delta = (distance - lastDistance) * 0.0025

                    useAppStore.setState({ zoomDelta: delta })
                    lastDistance = distance
                }
            }

            const onWheel = (e) => {
                useAppStore.setState({ zoomDelta: -e.deltaY })
            }
    
            document.addEventListener('pointerdown', onPointerDown)
            document.addEventListener('pointerup', onPointerUp)
            document.addEventListener('pointermove', onPointerMove)
            document.addEventListener('touchstart', onTouchStart)
            document.addEventListener('touchend', onTouchEnd)
            document.addEventListener('touchmove', onTouchMove)
            document.addEventListener('wheel', onWheel)
    
            return () => {
                document.removeEventListener('pointerdown', onPointerDown)
                document.removeEventListener('pointerup', onPointerUp)
                document.removeEventListener('pointermove', onPointerMove)
                document.removeEventListener('touchstart', onTouchStart)
                document.removeEventListener('touchend', onTouchEnd)
                document.removeEventListener('touchmove', onTouchMove)
                document.removeEventListener('wheel', onWheel)
            }
        }
    }, [experienceStarted])
}