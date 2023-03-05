import { useAppStore } from '../../stores/AppStore'
import AudioToggler from '../AudioToggler'
import Music from '../Music'
import Explored from '../Explored'
import ThemeSwitch from '../ThemeSwitch'
import Info from '../Info'
import * as S from './style'

function UI() {
    const experienceStarted = useAppStore(state => state.experienceStarted)
    
    return (
        <S.UI>
            {
                experienceStarted &&
                <>
                    <S.UIItem>
                        <AudioToggler />
                    </S.UIItem>

                    <S.UIItem>
                        <Music />
                    </S.UIItem>

                    <S.UIItem>
                        <Explored />
                    </S.UIItem>   

                    <S.UIItem>
                        <ThemeSwitch />
                    </S.UIItem>   

                    <S.UIItem>
                        <Info />
                    </S.UIItem>   
                </>
            }
        </S.UI>
    )
}

export default UI