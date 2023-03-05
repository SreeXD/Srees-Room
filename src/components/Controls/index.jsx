import { useRef, useMemo, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { PerspectiveCamera, Mask, useGLTF } from '@react-three/drei'
import { motion as motion3d } from 'framer-motion-3d'
import * as THREE from 'three'
import { damp3 } from 'maath/easing'
import { useAppStore, useAppState } from '../../stores/AppStore'
import { useThemeContext } from '../../stores/ThemeContext'
import { normalizePointerCoordinates } from '../../lib/utils'
import maskVertexShader from '../../shaders/mask/mask.vert'
import roomGlb from '../../assets/3d/room.glb?url'
import { normals } from '../../assets/objectData'

useGLTF.preload(roomGlb, true)

const MotionMask = motion3d(Mask)

function Controls() {
    const { nodes } = useGLTF(roomGlb)
    const [cursorPosition, movement, focusObject, experienceStarted, experienceLoading] = useAppState((state) => [state.cursorPosition, state.movement, state.focusObject, state.experienceStarted, state.experienceLoading])
    const theme = useThemeContext()
    const controlMovementRef = useRef(new THREE.Vector2())
    const trackRef = useRef()
    const [aspect, setAspect] = useState(window.innerWidth / window.innerHeight)
    const zoomRef = useRef(0)

    const maskMaterial = useMemo(() => new THREE.ShaderMaterial({
        uniforms: {
            uTime: { value: 0 },
            uExpandProgress: { value: 0 }
        },
        vertexShader: maskVertexShader
    }), [])

    const computeCameraDampZ = () => {
        if (experienceLoading) return 6
        if (!experienceStarted) return 10
        if (focusObject) return 0

        return 7
    }

    useEffect(() => {
        if (focusObject) {
            zoomRef.current = 0
        }
    }, [focusObject])

    useFrame((state, delta) => {
        maskMaterial.uniforms.uTime.value = state.clock.getElapsedTime()

        const track = trackRef.current
        const controlMovement = controlMovementRef.current 

        const pointer = normalizePointerCoordinates(cursorPosition)
        
        if (!focusObject) {
            const cameraDampPosition = new THREE.Vector3(
                pointer.x * 0.5, 
                pointer.y * 0.5, 
                computeCameraDampZ()
            )

            
            const movementNormalized = movement.clone().divideScalar(10000)
            movement.set(0, 0)

            controlMovement.add(movementNormalized).clamp(new THREE.Vector2(-0.0305, 0), new THREE.Vector2())
            
            const trackDampPosition = new THREE.Vector3(
                controlMovement.x * -100,
                controlMovement.x * -6,
                controlMovement.x * -80
            )
    
            damp3(track.position, trackDampPosition, 0.35, delta)   
            cameraDampPosition.sub(new THREE.Vector3(0, controlMovement.x * 16, controlMovement.x * -90))

            damp3(state.camera.position, cameraDampPosition, 0.35, delta)
        }

        else {
            const zoomDelta = useAppStore.getState().zoomDelta
            useAppStore.setState({ zoomDelta: 0 })
            
            zoomRef.current += zoomDelta / 500
            zoomRef.current = Math.min(1.25, Math.max(0.0, zoomRef.current))

            const cameraDampPosition = new THREE.Vector3(
                pointer.x * 0.3, 
                pointer.y * 0.3, 
                computeCameraDampZ()
            )

            damp3(track.position, focusObject.position, 0.45, delta)
            
            const focusObjectNormal = normals[focusObject.name].clone()
            cameraDampPosition.add(focusObject.position.clone().add(focusObjectNormal.multiplyScalar(2 - zoomRef.current)))
            
            damp3(state.camera.position, cameraDampPosition, 0.45, delta)
        }

        state.camera.lookAt(track.position)
    })

    useEffect(() => {
        let timeoutId

        const onWindowResize = (e) => {
            clearTimeout(timeoutId)
            timeoutId = setTimeout(() => setAspect(window.innerWidth / window.innerHeight), 100)
        }

        window.addEventListener('resize', onWindowResize)

        return () => {
            window.removeEventListener('resize', onWindowResize)
        }
    }, [])

    function calculateMaskScale() {
        if (aspect > 4.0) return 0.5 * aspect
        if (aspect > 3.0) return 0.75 * aspect
        if (aspect > 2.0) return aspect
        if (aspect > 1.0) return aspect * 1.5

        if (aspect < 0.5) return aspect * 2.0
        if (aspect < 1.0) return aspect * 1.75
    }

    return (
        <group>
            <object3D ref={trackRef} />
            
            <PerspectiveCamera makeDefault fov={50} position={[0, 0, 6]}>
                <MotionMask 
                    id={1} 
                    geometry={nodes.IntroText.geometry}
                    material={maskMaterial}
                    position={[0, 0, -5]}
                    variants={{
                        show: {
                            scaleX: calculateMaskScale(),
                            scaleY: calculateMaskScale(),
                            transition: {
                                ...theme.easeTransition,
                                delay: 0.1
                            }
                        },

                        expand: {
                            scaleX: 150,
                            scaleY: 100,
                            y: -11,
                            transition: {
                                ...theme.easeTransition,
                                delay: 0.1
                            }
                        }
                    }}
                    initial='show'
                    animate={experienceStarted ? 'expand' : 'show'}>
                </MotionMask>
            </PerspectiveCamera>
        </group>
    )
}

export default Controls