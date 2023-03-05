import { forwardRef, useState } from 'react'
import { useThemeContext } from '../../stores/ThemeContext' 
import * as S from './style'

const Button = forwardRef(({ children, overrideHovering, ...remaining }, ref) => {
    const theme = useThemeContext()
    const [hovering, setHovering] = useState(false)

    const borderVariants = (ix) => ({
        hide: {
            width: 0,
            height: 0
        },

        show: {
            x: 0,
            y: 0,
            width: '40%',
            height: '35%'
        },

        hover: {
            x: ix,
            width: '20%',
            height: '50%'
        },
        
        exit: {
            x: 0
        }
    })

    return (
        <S.Button 
            ref={ref} 
            variants={{
                exit: {
                    opacity: 0
                }
            }}
            transition={theme.easeTransition}
            initial='hide'
            animate={(overrideHovering || hovering) ? 'hover' : 'show'}
            exit='exit'
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            {...remaining}>

            <S.Border 
                variants={borderVariants('-1.5rem')}
                transition={theme.easeTransition} />

            <S.Border 
                variants={borderVariants('1.5rem')}
                transition={theme.easeTransition} />

            <S.Border 
                variants={borderVariants('-1.5rem')}
                transition={theme.easeTransition} />
            
            <S.Border 
                variants={borderVariants('1.5rem')}
                transition={theme.easeTransition} />
                
            <S.ButtonInner
                variants={{
                    hide: {
                        width: 0,
                        opacity: 0,
                        color: theme.secondary,
                        transition: theme.easeTransition
                    },
                    
                    hover: {
                        width: 0,
                        opacity: 1,
                        color: theme.secondary,
                        transition: theme.easeTransition
                    },

                    show: {
                        width: '92.5%',
                        opacity: 1,
                        color: theme.primary,
                        transition: theme.easeTransition
                    }
                }}>
                {children}
            </S.ButtonInner>
        </S.Button>
    )
})

export default Button