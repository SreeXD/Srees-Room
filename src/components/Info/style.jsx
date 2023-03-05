import styled from 'styled-components'
import { motion } from 'framer-motion'

export const InfoLink = styled.a`
    display: inline-block;
    margin-right: 0.8rem;
    cursor: default;

    svg {
        height: 0.825rem;
        fill: ${props => props.theme.secondary};

    }

    @media (max-width: 500px) {
        margin-right: 0.6rem;

        svg {
            height: 0.7rem;
        }
    }
`

export const InfoLinks = styled.div`
    margin-left: 0.8rem;
`

export const InfoDescription = styled(motion.p)`
    font-size: 0.9rem;
    margin-top: 0.5rem;

    @media (max-width: 500px) {
        font-size: 0.75rem;
    }
`

export const InfoTitle = styled.div`
    font-size: 1.05rem;
    font-weight: 400;

    @media (max-width: 500px) {
        font-size: 0.9rem;
    }
`

export const InfoTop = styled(motion.div)`
    display: flex;
    align-items: center;
`

export const Info = styled(motion.div)`
    width: 350px;
    max-width: 90vw;
    color: ${props => props.theme.secondary};
`