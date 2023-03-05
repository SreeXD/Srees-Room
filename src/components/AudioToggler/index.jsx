import { useRef, useEffect } from 'react'
import Two from 'two.js'
import gsap from 'gsap'
import { useAppStore, useAppState } from '../../stores/AppStore'
import { useThemeContext } from '../../stores/ThemeContext'
import { animate } from '../../lib/utils'
import AudioManager from '../../lib/AudioManager'
import * as S from './style'

function AudioToggler({ bars = 5, barMargin = 3,  barWidth = 1, barHeight = 3, amplitude = 7, size = 40 }) {
    const [audioEnabled, toggleAudio] = useAppState(state => [state.audioEnabled, state.toggleAudio])
    const theme = useThemeContext()
    const togglerRef = useRef()
    const rectsRef = useRef()
    const timelineRef = useRef()
    const initialRef = useRef(true)
    const audioManager = new AudioManager()

    useEffect(() => {
        const toggler = togglerRef.current 
        const two = new Two().appendTo(toggler)
        two.renderer.setSize(40, 40)

        const rects = []
        rectsRef.current = rects

        let left = 0.5 * (two.width - (bars - 1) * barMargin - bars * barWidth) + barMargin

        for (let i = 0; i < bars; ++i, left += barMargin + barWidth) {
            const rect = two.makeRectangle(left, two.height * 0.5, barWidth, 0)
            rect.opacity = 0
            rect.stroke = theme.secondary
            rect.fill = theme.secondary
            rects.push(rect)
        }

        const clearAnimation = animate((delta) => {
            two.update()
        })

        return () => {
            if (timelineRef.current) timelineRef.current.kill()

            clearAnimation()
            two.clear()
            toggler.removeChild(two.renderer.domElement)
        }
    }, [])

    useEffect(() => {
        if (timelineRef.current) timelineRef.current.kill()
        
        const rects = rectsRef.current
        const timeline = gsap.timeline()

        if (audioEnabled) {
            rects.forEach((rect, i) => timeline
                .to(
                    rect, 
                    { 
                        opacity: 1,
                        delay: initialRef.current ? theme.uiDelay : 0
                    }, 
                    0.075 * i
                )
                .to(
                    rect, 
                    {
                        keyframes: {
                            height: [barHeight, barHeight + amplitude, barHeight]
                        },
                        duration: 0.65,
                        delay: initialRef.current ? theme.uiDelay : 0,
                        repeat: -1
                    },
                    0.125 * i
                ))
        }

        else {
            timeline.to(rects, {
                height: barHeight,
                opacity: 1,
                duration: 0.5
            })
        }

        timelineRef.current = timeline
        initialRef.current = false
    }, [audioEnabled])

    return (
        <S.AudioToggler 
            ref={togglerRef} 
            size={40}
            onMouseEnter={() => {
                useAppStore.setState({ inHover: true })
                useAppStore.setState({ cursorText: 'audio' })  
            }}
            onMouseLeave={() => useAppStore.setState({ inHover: false })}
            onClick={(e) => {
                e.stopPropagation()
                toggleAudio()
                audioManager.play('click')
            }} /> 
    )
}

export default AudioToggler