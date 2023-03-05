import { Canvas as R3FCanvas } from '@react-three/fiber'
import { useThemeContext } from '../../stores/ThemeContext'
import Scene from '../Scene'
import * as S from './style'

function Canvas() {
    const theme = useThemeContext()

    return (
        <S.CanvasParent>
            <R3FCanvas>
                <color attach='background' args={[theme.background]} />

                <Scene />                
            </R3FCanvas>
        </S.CanvasParent>
    )
}

export default Canvas