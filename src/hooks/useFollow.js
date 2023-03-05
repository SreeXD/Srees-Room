import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { damp2 } from 'maath/easing'
import { useAppStore } from '../stores/AppStore'
import { animate, getElementPosition } from '../lib/utils'

function useFollow(
    elemRef,
    {
        radius = 100
    } = {}
) {
    const cursorPosition = useAppStore(state => state.cursorPosition)
    const [following, setFollowing] = useState(false)

    useEffect(() => {
        const elem = elemRef.current
        const translation = new THREE.Vector2()
        
        const cancelAnimation = animate((delta) => {
            const elementPosition = getElementPosition(elem).sub(translation)

            if (elementPosition.distanceTo(cursorPosition) < radius) {
                setFollowing(true)
                damp2(translation, cursorPosition.clone().sub(elementPosition), 0.25, delta)
            }

            else {
                setFollowing(false)
                damp2(translation, new THREE.Vector2(), 0.25, delta)
            }

            elem.style.transform = `translate(${translation.x}px, ${translation.y}px)`
        })

        return () => {
            cancelAnimation()
        }
    }, [])

    return following
}

export default useFollow