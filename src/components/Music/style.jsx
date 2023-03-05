import styled from 'styled-components'
import { motion } from 'framer-motion'

export const MusicName = styled(motion.span)`
    display: inline-block;
    align-self: center;
    font-size: 0.8rem;
`

export const PausePlayButton = styled(motion.span)`
    display: inline-flex;
    align-self: center;
    justify-self: end;

    svg {
        height: 2rem;
        width: 2rem;
        padding: 0.5rem;
        transform: translateX(0.5rem);
        fill: ${props => props.theme.secondary};
    }
`

export const FrequencyBars = styled(motion.div)`
    grid-column: 1 / span 2;
    display: inline-block;
    height: 1.2rem;
    transform: translateY(2px);
    overflow: hidden;
`

export const ProgressInner = styled(motion.div)`
    position: absolute;
    top: 0;
    left: 0;
    height: 2px;
    background-color: ${props => props.theme.secondary};
`

export const Progress = styled(motion.div)`
    grid-column: 1 / span 2;
    height: 2px;
    background-color: ${props => props.theme.secondary + '33'};
    position: relative;
`

export const Music = styled(motion.div)`
    display: inline-grid;
    grid-template-rows: repeat(3, auto);
    grid-template-columns: repeat(2, auto);
    row-gap: 1rem;
    width: 200px;
    max-width: 45vw;

    @media (max-width: 500px) {
        row-gap: 0.75rem;
    }
`