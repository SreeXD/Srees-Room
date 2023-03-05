import { motion } from 'framer-motion'
import { useAppStore } from '../../stores/AppStore'
import { useThemeContext } from '../../stores/ThemeContext'
import AudioManager from '../../lib/AudioManager'
import * as S from './style'

function ThemeSwitch() {
    const experienceStarted = useAppStore(state => state.experienceStarted)
    const { dark, setDark, easeTransition, ease, uiDelay } = useThemeContext()
    const audioManager = new AudioManager()

    return (
        <S.ThemeSwitch 
            variants={{
                hide: {
                    opacity: 0,
                },

                show: {
                    opacity: 1,
                    transition: {
                        ease,
                        duration: 0.5,
                        delay: uiDelay
                    }
                }
            }}
            initial='hide'
            animate={ experienceStarted ? 'show' : 'hide' }>
            <S.ThemeSwitchInner 
                animate={{
                    y: dark ? -50 : 0
                }}
                transition={easeTransition}>
                <motion.svg 
                    animate={{  
                        opacity: dark ? 0 : 1
                    }}
                    transition={{
                        ease,
                        duration: 0.5
                    }}
                    onClick={(e) => {
                        e.stopPropagation()
                        setDark(true)
                        useAppStore.setState({ cursorText: 'dark' })
                        audioManager.play('click')
                    }}
                    onMouseEnter={() => {
                        useAppStore.setState({ inHover: true })
                        useAppStore.setState({ cursorText: 'light' })
                    }} 
                    onMouseLeave={() => useAppStore.setState({ inHover: false })}
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19Z" />
                    <path d="M12 22.96C11.45 22.96 11 22.55 11 22V21.92C11 21.37 11.45 20.92 12 20.92C12.55 20.92 13 21.37 13 21.92C13 22.47 12.55 22.96 12 22.96ZM19.14 20.14C18.88 20.14 18.63 20.04 18.43 19.85L18.3 19.72C17.91 19.33 17.91 18.7 18.3 18.31C18.69 17.92 19.32 17.92 19.71 18.31L19.84 18.44C20.23 18.83 20.23 19.46 19.84 19.85C19.65 20.04 19.4 20.14 19.14 20.14ZM4.86 20.14C4.6 20.14 4.35 20.04 4.15 19.85C3.76 19.46 3.76 18.83 4.15 18.44L4.28 18.31C4.67 17.92 5.3 17.92 5.69 18.31C6.08 18.7 6.08 19.33 5.69 19.72L5.56 19.85C5.37 20.04 5.11 20.14 4.86 20.14ZM22 13H21.92C21.37 13 20.92 12.55 20.92 12C20.92 11.45 21.37 11 21.92 11C22.47 11 22.96 11.45 22.96 12C22.96 12.55 22.55 13 22 13ZM2.08 13H2C1.45 13 1 12.55 1 12C1 11.45 1.45 11 2 11C2.55 11 3.04 11.45 3.04 12C3.04 12.55 2.63 13 2.08 13ZM19.01 5.99C18.75 5.99 18.5 5.89 18.3 5.7C17.91 5.31 17.91 4.68 18.3 4.29L18.43 4.16C18.82 3.77 19.45 3.77 19.84 4.16C20.23 4.55 20.23 5.18 19.84 5.57L19.71 5.7C19.52 5.89 19.27 5.99 19.01 5.99ZM4.99 5.99C4.73 5.99 4.48 5.89 4.28 5.7L4.15 5.56C3.76 5.17 3.76 4.54 4.15 4.15C4.54 3.76 5.17 3.76 5.56 4.15L5.69 4.28C6.08 4.67 6.08 5.3 5.69 5.69C5.5 5.89 5.24 5.99 4.99 5.99ZM12 3.04C11.45 3.04 11 2.63 11 2.08V2C11 1.45 11.45 1 12 1C12.55 1 13 1.45 13 2C13 2.55 12.55 3.04 12 3.04Z" />
                </motion.svg>

                <motion.svg
                    animate={{  
                        opacity: !dark ? 0 : 1
                    }}
                    transition={{
                        ease,
                        duration: 0.5
                    }}
                    onClick={(e) => {
                        e.stopPropagation()
                        setDark(false)
                        useAppStore.setState({ cursorText: 'light' })
                        audioManager.play('click')
                    }}
                    onMouseEnter={() => {
                        useAppStore.setState({ inHover: true })
                        useAppStore.setState({ cursorText: 'dark' })
                    }} 
                    onMouseLeave={() => useAppStore.setState({ inHover: false })}
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24">
                    <path d="M12.0557 3.59974C12.2752 3.2813 12.2913 2.86484 12.0972 2.53033C11.9031 2.19582 11.5335 2.00324 11.1481 2.03579C6.02351 2.46868 2 6.76392 2 12C2 17.5228 6.47715 22 12 22C17.236 22 21.5313 17.9764 21.9642 12.8518C21.9967 12.4664 21.8041 12.0968 21.4696 11.9027C21.1351 11.7086 20.7187 11.7248 20.4002 11.9443C19.4341 12.6102 18.2641 13 17 13C13.6863 13 11 10.3137 11 6.99996C11 5.73589 11.3898 4.56587 12.0557 3.59974Z" />
                </motion.svg>
            </S.ThemeSwitchInner>
        </S.ThemeSwitch>
    )
}

export default ThemeSwitch