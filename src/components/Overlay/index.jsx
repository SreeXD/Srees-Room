import styled from 'styled-components'

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: black;
    opacity: ${props => props.active ? 0.2 : 0};
    z-index: -5;
    transition: opacity 0.5s cubic-bezier(${props => props.theme.easeString});
`

export default Overlay