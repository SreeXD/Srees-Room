import styled from 'styled-components'
import { motion } from 'framer-motion'

export const Triangle = styled(motion.svg)`
    position: absolute;
    width: 0.25rem;
    height: 0.25rem;
    fill: ${props => props.theme.secondary};
`

export const CursorText = styled(motion.span)`
    position: absolute;
    display: inline-block;
    font-size: 0.85rem;
    color: ${props => props.theme.secondary};
    text-align: center;
`

export const Cursor = styled(motion.div)`
    position: fixed;
    border: 1px solid ${props => props.theme.secondary};
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
`