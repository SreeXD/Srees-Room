import styled from 'styled-components'
import { motion } from 'framer-motion'

export const ExploredProgressValue = styled(motion.span)`
    position: absolute;
    font-size: 0.9rem;

    &:after {
        display: inline-block;
        content: '%';
        font-size: 0.75rem;
        transform: translateX(1px);
    }
`

export const ExploredProgress = styled.div`
    width: ${props => props.size}px;
    height: ${props => props.size}px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
`

export const ExploredText = styled(motion.span)`
    font-size: 0.8rem;
`

export const ExploredTexts = styled.div`
    display: flex;
    flex-direction: column;
    text-align: right;
    margin-right: 0.6rem;

    @media (max-width: 350px) {
        text-align: center;
        margin-right: 0;
        margin-bottom: 0.4rem;
    }
`

export const Explored = styled(motion.div)`
    display: flex;
    align-items: center;

    @media (max-width: 350px) {
        flex-direction: column;
    }
`