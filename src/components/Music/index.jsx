import { useEffect, useRef, useState } from 'react'
import Two from 'two.js'
import { useAppState, useAppStore } from '../../stores/AppStore'
import { useThemeContext } from '../../stores/ThemeContext'
import AudioManager from '../../lib/AudioManager'
import { animate } from '../../lib/utils'
import * as S from './style'

function Music({ fftSize = 64, barMargin = 3, barWidth = 1, amplitude = 15 }) {
    const theme = useThemeContext()
    const [audioEnabled, musicPlaying] = useAppState(state => [state.audioEnabled, state.musicPlaying])
    const progressInnerRef = useRef()
    const [initialized, setInitialized] = useState(false)
    const frequencyBarsRef = useRef()
    const twoRef = useRef()
    const rectsRef = useRef()
    const initializedRef = useRef()
    const analyzerRef = useRef()
    const contextRef = useRef()
    const audioManager = new AudioManager()
 
    useEffect(() => {
        const frequencyBars = frequencyBarsRef.current 
        const frequencyBarsBB = frequencyBars.getBoundingClientRect()

        const two = new Two().appendTo(frequencyBars)
        twoRef.current = two 

        const frequencyCount = fftSize / 2
        const width = (frequencyCount + 1) * barMargin + frequencyCount * barWidth
        two.renderer.setSize(width, frequencyBarsBB.height)

        const rects = []
        rectsRef.current = rects

        for (let i = 0, left = 0.5 * barMargin; i < frequencyCount; ++i, left += barMargin + barWidth) {
            const rect = two.makeRectangle(left, two.height, barWidth, 0)
            rect.stroke = theme.secondary
            rect.fill = theme.secondary
            rects.push(rect)
        }

        two.update()

        return () => {
            initializedRef.current = false 

            two.clear()
            frequencyBars.removeChild(two.renderer.domElement)

            audioManager.pause('music')

            const context = contextRef.current

            if (context && context.state != 'closed') {
                context.close()
            }
        }
    }, [])

    useEffect(() => {
        if (audioEnabled && !initializedRef.current) {
            const context = new AudioContext()
            const music = audioManager.get('music')
            const source = context.createMediaElementSource(music)
            const analyzer = context.createAnalyser()

            music.addEventListener('ended', () => useAppStore.setState({ musicPlaying: false }))

            analyzerRef.current = analyzer
            contextRef.current = context

            source.connect(analyzer)
            analyzer.connect(context.destination)
            analyzer.fftSize = fftSize

            initializedRef.current = true
            setInitialized(true)
        }
    }, [audioEnabled])

    useEffect(() => {
        if (!initializedRef.current) return

        const two = twoRef.current
        const rects = rectsRef.current 
        const analyzer = analyzerRef.current
        const progressInner = progressInnerRef.current

        if (audioEnabled && musicPlaying) {
            audioManager.play('music')
            
            const frequencyCount = analyzer.frequencyBinCount
            const buffer = new Uint8Array(frequencyCount)

            const clearAnimation = animate((delta) => {
                analyzer.getByteFrequencyData(buffer)
                progressInner.style.width = `${audioManager.getProgress('music') * 100}%`
                
                for (let i = 0; i < frequencyCount; ++i) {
                    const height = (buffer[i] / 255) * amplitude
                    rects[i].height = height
                    rects[i].position.y = two.height - height * 0.5 + 1
                }

                two.update()
            })

            return () => {
                clearAnimation()
            }
        }

        else {
            audioManager.pause('music')
        }
    }, [audioEnabled, musicPlaying])

    return (
        <S.Music
            variants={{
                show: {
                    opacity: (musicPlaying && audioEnabled) ? 1 : 0.5,
                    transition: {
                        ease: 'easeInOut',
                        duration: 0.5
                    }
                }
            }}
            initial='hide'
            animate={initialized ? 'show' : 'hide'}>
            <S.FrequencyBars 
                ref={frequencyBarsRef} 
                variants={{
                    hide: {
                        opacity: 0
                    },
                    show: {
                        opacity: 1,
                        transition: {
                            ease: 'easeInOut',
                            duration: 0.5,
                            delay: 0.25 + theme.uiDelay
                        }
                    }
                }} />

            <S.MusicName variants={{
                hide: {
                    opacity: 0,
                    y: 8
                },
                show: {
                    opacity: 1,
                    y: 0,
                    transition: {
                        ...theme.easeTransition,
                        delay: 0.05 + theme.uiDelay
                    }
                }
            }}>
                HoKø - Lunar
            </S.MusicName>
            
            <S.PausePlayButton
                variants={{
                    hide: {
                        opacity: 0,
                        y: 8
                    },
                    show: {
                        opacity: 1,
                        y: 0,
                        transition: {
                            ...theme.easeTransition,
                            delay: 0.15 + theme.uiDelay
                        }
                    }
                }}>
                {
                    musicPlaying 
                    ? <svg 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                        onMouseLeave={() => useAppStore.setState({ inHover: false })}
                        onMouseEnter={() => {
                            useAppStore.setState({ inHover: true })
                            useAppStore.setState({ cursorText: 'pause' })
                        }}
                        onClick={(e) => {
                            e.stopPropagation() 

                            useAppStore.setState({ musicPlaying: false })
                            useAppStore.setState({ cursorText: 'play' })
                            audioManager.play('click')
                        }}>
                        <path fillRule="evenodd" clipRule="evenodd" d="M5.163 3.819C5 4.139 5 4.559 5 5.4v13.2c0 .84 0 1.26.163 1.581a1.5 1.5 0 0 0 .656.655c.32.164.74.164 1.581.164h.2c.84 0 1.26 0 1.581-.163a1.5 1.5 0 0 0 .656-.656c.163-.32.163-.74.163-1.581V5.4c0-.84 0-1.26-.163-1.581a1.5 1.5 0 0 0-.656-.656C8.861 3 8.441 3 7.6 3h-.2c-.84 0-1.26 0-1.581.163a1.5 1.5 0 0 0-.656.656zm9 0C14 4.139 14 4.559 14 5.4v13.2c0 .84 0 1.26.164 1.581a1.5 1.5 0 0 0 .655.655c.32.164.74.164 1.581.164h.2c.84 0 1.26 0 1.581-.163a1.5 1.5 0 0 0 .655-.656c.164-.32.164-.74.164-1.581V5.4c0-.84 0-1.26-.163-1.581a1.5 1.5 0 0 0-.656-.656C17.861 3 17.441 3 16.6 3h-.2c-.84 0-1.26 0-1.581.163a1.5 1.5 0 0 0-.655.656z" />
                    </svg>

                    : <svg 
                        viewBox="-7 0 32 32" 
                        version="1.1" 
                        xmlns="http://www.w3.org/2000/svg"
                        onMouseLeave={() => useAppStore.setState({ inHover: false })}
                        onMouseEnter={() => {
                            useAppStore.setState({ inHover: true })
                            useAppStore.setState({ cursorText: 'play' })
                        }}
                        onClick={(e) => {
                            e.stopPropagation() 

                            useAppStore.setState({ musicPlaying: true })
                            useAppStore.setState({ cursorText: 'pause' })
                            audioManager.play('click')
                        }}>
                        <path d="M0 6.688v18.906c0 0.344 0.156 0.625 0.469 0.813 0.125 0.094 0.344 0.125 0.5 0.125s0.281-0.031 0.438-0.125l16.375-9.438c0.313-0.219 0.5-0.5 0.5-0.844 0-0.313-0.188-0.594-0.5-0.813l-16.375-9.438c-0.563-0.406-1.406 0.094-1.406 0.813z"></path>
                    </svg>
                }    
            </S.PausePlayButton>
            
            <S.Progress 
                variants={{
                    hide: {
                        width: 0
                    },
                    show: {
                        width: '100%',
                        transition: {
                            ...theme.easeTransition,
                            delay: theme.uiDelay
                        }
                    }
                }}>

                <S.ProgressInner ref={progressInnerRef} />
            </S.Progress>
        </S.Music>
    )
}

export default Music