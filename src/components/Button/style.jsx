import styled from 'styled-components'
import { motion } from 'framer-motion'

export const Border = styled(motion.span)`
    display: inline-block;
    position: absolute;

    &:nth-child(1) {
        top: 0;
        left: 0;
        border-top: 1px solid ${props => props.theme.secondary + '55'};
        border-left: 1px solid ${props => props.theme.secondary + '55'};
    }
    
    &:nth-child(2) {
        right: 0;
        top: 0;
        border-top: 1px solid ${props => props.theme.secondary + '55'};
        border-right: 1px solid ${props => props.theme.secondary + '55'};
    }
    
    &:nth-child(3) {
        bottom: 0;
        left: 0;
        border-bottom: 1px solid ${props => props.theme.secondary + '55'};
        border-left: 1px solid ${props => props.theme.secondary + '55'};
    }
    
    &:nth-child(4) {
        right: 0;
        bottom: 0;
        border-bottom: 1px solid ${props => props.theme.secondary + '55'};
        border-right: 1px solid ${props => props.theme.secondary + '55'};
    }
`

export const ButtonInner = styled(motion.span)`
    position: absolute;
    background: none;
    border: none;
    font-size: calc(0.4rem + 0.6vw);
    color: ${props => props.theme.primary};
    background-color: ${props => props.theme.secondary};
    height: 82.5%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`

export const Button = styled(motion.span)`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: calc(4.5vw + 6rem);
    height: calc(2.5vw + 2.5rem);
    cursor: pointer;
`