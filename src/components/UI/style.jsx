import styled from 'styled-components'

export const UIItem = styled.span`
    display: inline-block;
    position: fixed;
    
    &:nth-child(1) {
        right: 5.75rem;
        top: 1.2rem;

        @media (max-width: 500px) {
            right: 3.25rem;
            top: 0.875rem;
            transform: scale(0.8);
        }
    }

    &:nth-child(2) {
        left: 1.4rem;
        bottom: 1.4rem;

        @media (max-width: 500px) {
            left: 0.8rem;
            bottom: 1rem;
            transform: scale(0.9);
            transform-origin: left bottom;
        }
    }

    &:nth-child(3) {
        right: 1rem;
        bottom: 0.9rem;

        @media (max-width: 500px) {
            right: 0.6rem;
            bottom: 0.7rem;
            transform: scale(0.75);
            transform-origin: bottom right;
        }
    }

    &:nth-child(4) {
        right: 1.75rem;
        top: 1.4rem;

        @media (max-width: 500px) {
            right: 0.5rem;
            top: 1rem;
            transform: scale(0.8);
        }
    }

    &:nth-child(5) {
        left: 1.4rem;
        top: 1rem;

        @media (max-width: 500px) {
            top: 15vh;
            left: 0.95rem;
        }
    }
`

export const UI = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    color: ${props => props.theme.secondary};
`