import { useEffect, useState } from 'react'
import { useAppStore } from '../../stores/AppStore'
import { useThemeContext } from '../../stores/ThemeContext'
import { infos } from '../../assets/objectData'
import * as S from './style'

function Info() {
    const focusObject = useAppStore(state => state.focusObject)
    const theme = useThemeContext()
    const [info, setInfo] = useState({})

    useEffect(() => {
        if (focusObject) {
            setInfo(infos[focusObject.name])
        }
    }, [focusObject])

    const onInfoLinkMouseEnter = (e, name) => {
        useAppStore.setState({ inHover: true, cursorText: name })
    }
    
    const onInfoLinkMouseLeave = (e) => {
        useAppStore.setState({ inHover: false })
    }

    const onInfoClick = (e) => {
        e.stopPropagation()
    }

    return (
        <S.Info 
            initial='hide' 
            animate={focusObject ? 'show' : 'hide'}>
            <S.InfoTop
                variants={{
                    hide: {
                        pointerEvents: 'none',
                        opacity: 0,
                        y: 10,
                        transition: {
                            ...theme.easeTransition,
                            delay: 0.1
                        }
                    },
                    show: {
                        pointerEvents: 'auto',
                        opacity: 1,
                        y: 0,
                        transition: theme.easeTransition
                    }
                }}>
                <S.InfoTitle>{info.title}</S.InfoTitle>
                
                <S.InfoLinks>
                    {
                        info.github &&
                        <S.InfoLink target='_blank' href={info.github} onMouseEnter={(e) => onInfoLinkMouseEnter(e, 'github')} onMouseLeave={onInfoLinkMouseLeave} onClick={onInfoClick}>            
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
                                <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/>
                            </svg>
                        </S.InfoLink>
                    }
                    
                    {
                        info.youtube &&
                        <S.InfoLink target='_blank' href={info.youtube} onMouseEnter={(e) => onInfoLinkMouseEnter(e, 'youtube')} onMouseLeave={onInfoLinkMouseLeave} onClick={onInfoClick}>            
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"/>
                            </svg>
                        </S.InfoLink>
                    }

                    {
                        info.linkedin &&
                        <S.InfoLink target='_blank' href={info.linkedin} onMouseEnter={(e) => onInfoLinkMouseEnter(e, 'linked')} onMouseLeave={onInfoLinkMouseLeave} onClick={onInfoClick}>                
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"/>
                            </svg>
                        </S.InfoLink>
                    }

                    {
                        info.twitter &&
                        <S.InfoLink target='_blank' href={info.twitter} onMouseEnter={(e) => onInfoLinkMouseEnter(e, 'twitter')} onMouseLeave={onInfoLinkMouseLeave} onClick={onInfoClick}>        
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"/>
                            </svg>
                        </S.InfoLink>
                    }

                    {
                        info.hosted &&
                        <S.InfoLink target='_blank' href={info.hosted} onMouseEnter={(e) => onInfoLinkMouseEnter(e, 'hosted')} onMouseLeave={onInfoLinkMouseLeave} onClick={onInfoClick}>        
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z"/>
                            </svg>
                        </S.InfoLink>
                    }

                    {
                        info.resume &&
                        <S.InfoLink target='_blank' href={info.resume} onMouseEnter={(e) => onInfoLinkMouseEnter(e, 'resume')} onMouseLeave={onInfoLinkMouseLeave} onClick={onInfoClick}>                    
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                <path d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128z"/>
                            </svg>
                        </S.InfoLink>
                    }
                </S.InfoLinks>
            </S.InfoTop>

            <S.InfoDescription 
                variants={{
                    hide: {
                        pointerEvents: 'none',
                        opacity: 0,
                        y: 10,
                        transition: theme.easeTransition
                    },
                    show: {
                        pointerEvents: 'auto',
                        opacity: 1,
                        y: 0,
                        transition: {
                            ...theme.easeTransition,
                            delay: 0.1
                        }
                    }
                }}>
                {info.description}
            </S.InfoDescription>
        </S.Info>
    )
}

export default Info