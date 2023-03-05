import styled from 'styled-components'
import { motion } from 'framer-motion'

export const ThemeSwitchInner = styled(motion.div)`
    position: relative;
    display: flex;
    flex-direction: column;

    svg {
        position: absolute;
        width: 2rem;
        height: 2rem;
        padding: 0.3rem;
        fill: ${props => props.theme.secondary + 'cc'};

        &:nth-child(2) {
            top: 50px;
            transform: scale(0.8);
        }
    }
`

export const ThemeSwitch = styled(motion.div)`
    width: 2rem;
    height: 2.5rem;
    overflow: hidden;
`