import { useContext, useState } from 'react'
import { ThemeContext } from 'styled-components'
import gsap from 'gsap'
import CustomEase from 'gsap/CustomEase'

const ease = [.81,.04,.18,.96]
const easeString = '.81,.04,.18,.96'
const easeDuration = 0.8

gsap.registerPlugin(CustomEase)
CustomEase.create('myEase', easeString)

export function ThemeContextProvider({ children }) {
    const hour = new Date().getHours()
    const [dark, setDark] = useState(hour < 6 || hour > 18)

    return (
        <ThemeContext.Provider 
            value={{
                primary: '#080808',
                secondary: '#f8f8f8',
                background: dark ? '#3f54bf' : '#e1deff',
                ease,
                easeString,
                easeDuration,
                easeTransition: {
                    ease,
                    duration: easeDuration
                },
                uiDelay: 0.6,
                dark,
                setDark
            }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useThemeContext = () => useContext(ThemeContext)