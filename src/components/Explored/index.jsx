import { useEffect, useRef, useState } from 'react'
import Two from 'two.js'
import gsap from 'gsap'
import { damp } from 'maath/easing'
import { useAppState } from '../../stores/AppStore'
import { useThemeContext } from '../../stores/ThemeContext'
import { animate } from '../../lib/utils'
import * as S from './style'

function Explored({ total = 9, size = 96 }) {
    const [exploredCount, experienceStarted] = useAppState(state => [state.exploredCount, state.experienceStarted])
    const theme = useThemeContext()
    const [progressPercent, setProgressPercent] = useState(0)
    const progressElemRef = useRef()
    const exploredCountRef = useRef()
    const arcRef = useRef()

    useEffect(() => {
        exploredCountRef.current = exploredCount
    }, [exploredCount])

    useEffect(() => {
        const progressElem = progressElemRef.current 

        const two = new Two().appendTo(progressElem)
        two.renderer.setSize(size, size)

        const radius = two.width * 0.5 - 5
        const arc = two.makeArcSegment(two.width * 0.5, two.height * 0.5, radius, radius + 2, 0, 0)
        arcRef.current = arc
        arc.fill = theme.secondary
        arc.opacity = 0.2
        arc.stroke = 'none'
        arc.rotation = Math.PI

        const arc2 = two.makeArcSegment(two.width * 0.5, two.height * 0.5, radius, radius + 2, 0, 0)
        arc2.fill = theme.secondary
        arc2.stroke = 'none'
        arc2.rotation = 0.5 * Math.PI
        
        const percent = { value: 0 }

        const clearAnimation = animate((delta) => {
            const exploredCount = exploredCountRef.current 
            const progress = exploredCount / total

            damp(arc2, 'endAngle', 2.0 * Math.PI * progress, 0.5, delta)
            damp(percent, 'value', progress * 100.0, 0.5, delta)

            setProgressPercent(Math.ceil(percent.value))

            two.update()
        })

        return () => {
            clearAnimation()
            two.clear()
            progressElem.removeChild(two.renderer.domElement)
        }
    }, [])

    useEffect(() => {
        if (experienceStarted) {
            const arc = arcRef.current 

            gsap.to(arc, {
                endAngle: 2.0 * Math.PI,
                ease: 'myEase',
                duration: theme.easeDuration,
                delay: theme.uiDelay
            })
        }
    }, [experienceStarted])

    return (
        <S.Explored 
            initial='hide'
            animate={experienceStarted ? 'show' : 'hide'}>            
            <S.ExploredTexts>
                <S.ExploredText 
                    variants={{
                        hide: {
                            y: 10,
                            opacity: 0
                        },

                        show: {
                            y: 0,
                            opacity: 1,
                            transition: {
                                ...theme.easeTransition,
                                delay: theme.uiDelay
                            },
                        }
                    }}>
                    Explored
                </S.ExploredText>
                
                <S.ExploredText
                    variants={{
                        hide: {
                            y: 10,
                            opacity: 0
                        },

                        show: {
                            y: 0,
                            opacity: 1,
                            transition: {
                                ...theme.easeTransition,
                                delay: 0.1 + theme.uiDelay
                            }
                        }
                    }}>
                    {exploredCount} of {total} objects
                </S.ExploredText>
            </S.ExploredTexts>

            <S.ExploredProgress ref={progressElemRef} size={size}>
                <S.ExploredProgressValue
                    variants={{
                        hide: {
                            y: 6,
                            opacity: 0
                        },

                        show: {
                            y: 0,
                            opacity: 1,
                            transition: {
                                ...theme.easeTransition,
                                delay: theme.uiDelay
                            },
                        }
                    }}>
                    {progressPercent} 
                </S.ExploredProgressValue>
            </S.ExploredProgress>
        </S.Explored>
    )
}

export default Explored