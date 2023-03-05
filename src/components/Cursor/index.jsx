import { useEffect, useRef } from 'react'
import { damp2 } from 'maath/easing'
import { useAppStore, useAppState } from '../../stores/AppStore'
import { animate } from '../../lib/utils'
import * as S from './style'

function Triangle(props) {
    return (
        <S.Triangle {...props} viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <g transform="translate(32.000000, 42.666667)">
                <path d="M246.312928,5.62892705 C252.927596,9.40873724 258.409564,14.8907053 262.189374,21.5053731 L444.667042,340.84129 C456.358134,361.300701 449.250007,387.363834 428.790595,399.054926 C422.34376,402.738832 415.04715,404.676552 407.622001,404.676552 L42.6666667,404.676552 C19.1025173,404.676552 7.10542736e-15,385.574034 7.10542736e-15,362.009885 C7.10542736e-15,354.584736 1.93772021,347.288125 5.62162594,340.84129 L188.099293,21.5053731 C199.790385,1.04596203 225.853517,-6.06216498 246.312928,5.62892705 Z" />
            </g>
        </S.Triangle>
    )
}

function Cursor() {
    const [cursorPosition, experienceStarted, inMotion, inHover, cursorText] = useAppState(state => [state.cursorPosition, state.experienceStarted, state.inMotion, state.inHover, state.cursorText])
    const cursorRef = useRef()

    useEffect(() => {
        const cursor = cursorRef.current
        const currentPosition = cursorPosition.clone()

        const clearAnimation = animate((delta) => {
            const cursorBB = cursor.getBoundingClientRect()
            damp2(currentPosition, cursorPosition, 0.1, delta)

            cursor.style.transform = `translate(${currentPosition.x - cursorBB.width * 0.5}px, ${currentPosition.y - cursorBB.height * 0.5}px)`
        })

        return () => {
            clearAnimation()
        }
    }, [])

    const animateCursor = () => {
        if (!experienceStarted) return 'inactive'
        if (inMotion) return 'dragging'
        if (inHover) return 'hovering'

        return 'normal'
    }

    return (
        <S.Cursor 
            ref={cursorRef}
            variants={{
                inactive: {
                    width: 16,
                    height: 16,
                    opacity: 0,
                    transition: {
                        type: 'spring',
                        stiffness: 200,
                        damping: 21
                    }
                },

                normal: {
                    width: 48,
                    height: 48,
                    opacity: 0.3,
                    transition: {
                        type: 'spring',
                        stiffness: 200,
                        damping: 21
                    }
                },

                dragging: {
                    width: 16,
                    height: 16,
                    opacity: 0.5,
                    transition: {
                        type: 'spring',
                        stiffness: 200,
                        damping: 21
                    }
                },

                hovering: {
                    width: 0,
                    height: 0,
                    opacity: 0.85,
                    transition: {
                        type: 'spring',
                        stiffness: 200,
                        damping: 21
                    }
                }
            }}
            animate={animateCursor()}>
                             
            <Triangle 
                variants={{
                    normal: {
                        opacity: 0
                    },
                    
                    dragging: {
                        opacity: 1,
                        rotate: '-90deg',
                        x: -15,
                    },
                    
                    hovering: {
                        opacity: 1,
                        rotate: '90deg',
                        x: -24,
                    }
                }} />

            <Triangle 
                variants={{
                    normal: {
                        opacity: 0
                    },

                    dragging: {
                        opacity: 1,
                        rotate: '90deg',
                        x: 15,
                    },

                    hovering: {
                        opacity: 1,
                        rotate: '-90deg',
                        x: 24,
                    }
                }} />

            <Triangle 
                variants={{
                    normal: {
                        opacity: 0
                    },

                    dragging: {
                        opacity: 0,
                        rotate: '0deg',
                        y: -15
                    },
                    
                    hovering: {
                        opacity: 1,
                        rotate: '180deg',
                        y: -24,
                    }
                }} />

            <Triangle 
                variants={{
                    normal: {
                        opacity: 0
                    },

                    dragging: {
                        opacity: 0,
                        rotate: '0deg',
                        y: 15
                    },

                    hovering: {
                        opacity: 1,
                        rotate: '0deg',
                        y: 24,
                    }
                }} />
        
            <S.CursorText
                variants={{
                    normal: {
                        opacity: 0,
                        y: 48
                    },

                    dragging: {
                        opacity: 0,
                        y: 48
                    },

                    hovering: {
                        opacity: 1,
                        y: 42,
                        transition: {
                            type: 'spring',
                            stiffness: 200,
                            damping: 21
                        }
                    }
                }}>
                {cursorText}
            </S.CursorText>
        </S.Cursor>
    )
}

export default Cursor