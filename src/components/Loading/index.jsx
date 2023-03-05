import { useEffect } from 'react'
import { useProgress } from '@react-three/drei'
import { useAppStore, useAppState } from '../../stores/AppStore'
import * as S from './style'

function Loading() {
    const [experienceLoading, experienceStarted] = useAppState(state => [state.experienceLoading, state.experienceStarted])
    const { active, progress } = useProgress()

    useEffect(() => {
        useAppStore.setState({ experienceLoading: active })
    }, [active])

    return (
        <S.Loading>
            {
                experienceLoading && `Loading ${progress}%`
            }

            {
                !experienceLoading && !experienceStarted && `Tap anywhere to start`
            }
        </S.Loading>
    )
}

export default Loading 