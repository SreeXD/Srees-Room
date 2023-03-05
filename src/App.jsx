import { useAppStore } from './stores/AppStore'
import Loading from './components/Loading'
import Cursor from './components/Cursor'
import UI from './components/UI'
import Overlay from './components/Overlay'
import Canvas from './components/Canvas'
import useAppEvents from './hooks/useAppEvents'

function App() {
    const experienceStarted = useAppStore(state => state.experienceStarted)
    useAppEvents()

    return (
        <> 
            <Loading /> 
            <Cursor />
            <UI />
            <Overlay active={!experienceStarted} />
            <Canvas />
        </>
    )
}

export default App
