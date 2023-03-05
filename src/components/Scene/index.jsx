import { useEffect, useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useGLTF, useTexture, useMask } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import { dampE } from 'maath/easing'
import { useAppStore, useAppState } from '../../stores/AppStore'
import { useThemeContext } from '../../stores/ThemeContext'
import Controls from '../Controls'
import Particles from '../Particles'
import Text3 from '../Text3'
import { normalizePointerCoordinates, lerp, fixTexture, createVideoMaterial } from '../../lib/utils'
import AudioManager from '../../lib/AudioManager'
import roomGlb from '../../assets/3d/room.glb?url'
import meTextureJpg from '../../assets/pictures/me.jpg'
import lucyTextureWebp from '../../assets/pictures/lucy.jpg'
import roomMorningTextureJpg from '../../assets/pictures/BakedTextureMorning.jpg'
import roomNightTextureJpg from '../../assets/pictures/BakedTextureNight.jpg'
import roomVertexShader from '../../shaders/room/room.vert'
import roomFragmentShader from '../../shaders/room/room.frag'
import plantVertexShader from '../../shaders/plant/plant.vert'
import libxdVideoMp4 from '../../assets/videos/project_libxd.mp4'
import xwingVideoMp4 from '../../assets/videos/project_xwing.mp4'
import xdriveVideoMp4 from '../../assets/videos/project_xdrive.mp4'
import text3VertexShader from '../../shaders/text3/text3.vert'
import text3FragmentShader from '../../shaders/text3/text3.frag'
import { names } from '../../assets/objectData'

useGLTF.preload(roomGlb, true)

function Scene() {    
    const [cursorPosition, experienceStarted, audioEnabled, musicPlaying, incrementExploredCount] = useAppState(state => [state.cursorPosition, state.experienceStarted, state.audioEnabled, state.musicPlaying, state.incrementExploredCount])
    const theme = useThemeContext()
    const meTexture = useTexture(meTextureJpg)
    const lucyTexture = useTexture(lucyTextureWebp)
    const roomMorningTexture = useTexture(roomMorningTextureJpg)
    const roomNightTexture = useTexture(roomNightTextureJpg)
    const { scene: room } = useGLTF(roomGlb, true)
    const { camera } = useThree()
    const maskStencil = useMask(1)
    const dayTimeRef = useRef(theme.dark ? 1 : 0)
    const hovering3DRef = useRef(false)
    const audioManager = new AudioManager()
    const { VITE_GITHUB_LINK, VITE_TWITTER_LINK, VITE_YOUTUBE_LINK, VITE_LINKEDIN_LINK, VITE_RESUME_LINK } = import.meta.env

    const [
        secondHand, 
        minuteHand, 
        hourHand, 
        bb8Head, 
        bb8HeadClone, 
        me,
        github,
        twitter,
        youtube,
        linkedin,
        roomMaterial,
        plantMaterial,
        meMaterial, 
        lucyMaterial,
        speakers,
        monitorScreen,
        drawingPadScreen,
        laptopScreen,
        libxdVideoMaterial,
        xwingVideoMaterial,
        xdriveVideoMaterial,
        resume,
        textMaterial
    ] = useMemo(() => {
        const children = {}
        const speakers = []

        room.children.forEach(child => {
            if (child.name.startsWith('Speaker')) {
                speakers.push(child)
            }

            child.geometry.computeBoundingBox()
            child.geometry.computeBoundingSphere()
            children[child.name] = child
        })

        const meMaterial = new THREE.MeshBasicMaterial({ map: meTexture })
        const lucyMaterial = new THREE.MeshBasicMaterial({ map: lucyTexture })
        const roomMaterial = new THREE.ShaderMaterial({ 
            uniforms: {
                uDayTimeMix: { value: 0 },
                uTextureMorning: { value: roomMorningTexture },
                uTextureNight: { value: roomNightTexture }
            },
            vertexShader: roomVertexShader,
            fragmentShader: roomFragmentShader
        })

        const plantMaterial = new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0 },
                uDayTimeMix: { value: 0 },
                uTextureMorning: { value: roomMorningTexture },
                uTextureNight: { value: roomNightTexture }
            },
            vertexShader: plantVertexShader,
            fragmentShader: roomFragmentShader
        })

        const textMaterial = new THREE.ShaderMaterial({
            uniforms: {
                uProgress: { value: 0 },
                uColor: { value: new THREE.Color(theme.secondary).convertLinearToSRGB() }
            },
            vertexShader: text3VertexShader,
            fragmentShader: text3FragmentShader
        })
        
        const libxdVideoMaterial = createVideoMaterial(libxdVideoMp4)
        const xwingVideoMaterial = createVideoMaterial(xwingVideoMp4)
        const xdriveVideoMaterial = createVideoMaterial(xdriveVideoMp4)

        for (const texture of [meTexture, lucyTexture, roomMorningTexture, roomNightTexture]) {
            fixTexture(texture)
        }

        for (const material of [meMaterial, lucyMaterial, roomMaterial, plantMaterial, libxdVideoMaterial, xwingVideoMaterial, xdriveVideoMaterial]) {
            Object.assign(material, maskStencil)
        }

        return [
            children['Second_Hand'],
            children['Minute_Hand'],
            children['Hour_Hand'],
            children['BB8_Head'],
            children['BB8_Head'].clone(),
            children['me'],
            children['Github'],
            children['Twitter'],
            children['Youtube'],
            children['Linkedin'],
            roomMaterial,
            plantMaterial,
            meMaterial, 
            lucyMaterial,
            speakers,
            children['Monitor_Screen'],
            children['Drawing_Pad_Screen'],
            children['Laptop_Screen'],
            libxdVideoMaterial,
            xwingVideoMaterial,
            xdriveVideoMaterial,
            children['Resume'],
            textMaterial
        ]
    }, [])

    useEffect(() => {
        const clearUv = (child, flip, offsetX, offsetY) => {
            if (flip) {
                var uvs = new Float32Array([1 - offsetX, 1 - offsetY, 1 - offsetX, offsetY, offsetX, 1 - offsetY, offsetX, offsetY])
            }

            else {
                var uvs = new Float32Array([offsetX, offsetY, offsetX, 1 - offsetY, 1 - offsetX, offsetY, 1 - offsetX, 1 - offsetY])
            }

            child.geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2))
        }

        for (const child of room.children) {
            if (child.name.startsWith('Plant')) {
                child.material = plantMaterial
                continue 
            }

            switch (child.name) {
                case 'me':
                    child.material = meMaterial
                    break 

                case 'lucy':
                    child.material = lucyMaterial
                    break

                case 'Monitor_Screen':
                    clearUv(child, false, 0.04, 0)
                    child.material = libxdVideoMaterial
                    break

                case 'Drawing_Pad_Screen':
                    clearUv(child, false, 0, 0.04)
                    child.material = xwingVideoMaterial
                    break

                case 'Laptop_Screen':
                    clearUv(child, true, 0, 0)
                    child.material = xdriveVideoMaterial
                    break
                    
                default:
                    child.material = roomMaterial
                    break
            }
        }
    }, [])

    const checkIntersections = (pointerCoordinates) => {
        const pointer = normalizePointerCoordinates(pointerCoordinates)
        const raycaster = new THREE.Raycaster()
        raycaster.setFromCamera(pointer, camera)

        const intersections = raycaster.intersectObjects([me, github, twitter, youtube, linkedin, monitorScreen, drawingPadScreen, laptopScreen, resume])
        return intersections
    }

    useEffect(() => {
        if (experienceStarted) {
            const tween = gsap.to(textMaterial.uniforms.uProgress, {
                value: 1,
                duration: 0.8,
                delay: 0.2
            })

            const explored = {}

            const onClick = (e) => {
                const intersections = checkIntersections(new THREE.Vector2(e.clientX, e.clientY))
                const intersection = intersections[0]
                const object = intersection?.object

                if (object) {                       
                    if (object.name == 'Github') {
                        window.open(VITE_GITHUB_LINK)
                    }
                    
                    else if (object.name == 'Twitter') {
                        window.open(VITE_TWITTER_LINK)
                    }
                    
                    else if (object.name == 'Youtube') {
                        window.open(VITE_YOUTUBE_LINK)
                    }
                    
                    else if (object.name == 'Linkedin') {
                        window.open(VITE_LINKEDIN_LINK)
                    }

                    else if (object.name == 'Resume') {
                        window.open(VITE_RESUME_LINK)
                    }

                    else {
                        useAppStore.setState({ focusObject: object })
                        audioManager.play('click')
                    }

                    if (!explored[object.name]) {
                        incrementExploredCount()
                        explored[object.name] = true
                    }
                }

                else {
                    useAppStore.setState({ focusObject: null })
                }
            }

            document.addEventListener('click', onClick)
    
            return () => {    
                useAppStore.setState({ explored: 0 })
                tween.kill()

                document.removeEventListener('click', onClick)
            }
        }
    }, [experienceStarted])

    useFrame((state, delta) => {
        dayTimeRef.current = lerp(dayTimeRef.current, (theme.dark ? 1 : 0), 0.03)
        const dayTime = dayTimeRef.current
        const elapsed = state.clock.getElapsedTime()

        roomMaterial.uniforms.uDayTimeMix.value = dayTime
        plantMaterial.uniforms.uDayTimeMix.value = dayTime
        plantMaterial.uniforms.uTime.value = elapsed

        if (audioEnabled && musicPlaying) {
            const speakerAmplitude = 0.04
            const speakerFrequency = 7.0
            const speakerScale = 1.0 + speakerAmplitude * Math.abs(Math.sin(elapsed * speakerFrequency))

            speakers.forEach(speaker => speaker.scale.set(speakerScale, 0, speakerScale))
        }

        const date = new Date()
        const hour = date.getHours() % 12
        const minute = date.getMinutes()
        const second = date.getSeconds()
        const angleOffset = dayTime * 2.0 * Math.PI

        secondHand.rotation.z = -second * (Math.PI / 30) - angleOffset * 5
        minuteHand.rotation.z = -(minute + second / 60.0) * (Math.PI / 30) - angleOffset * 2
        hourHand.rotation.z = -(hour + minute / 60.0) * (Math.PI / 6) - angleOffset

        bb8HeadClone.lookAt(state.camera.position)
        dampE(bb8Head.rotation, bb8HeadClone.rotation, 0.5, delta)

        if (experienceStarted) {
            const intersections = checkIntersections(cursorPosition)
    
            if (intersections.length) {
                hovering3DRef.current = true
                const intersection = intersections[0]
                useAppStore.setState({ inHover: true, cursorText: names[intersection.object.name] })
            }
    
            else {
                if (hovering3DRef.current) {
                    hovering3DRef.current = false
                    useAppStore.setState({ inHover: false })
                }
            }
        }
    })

    return (
        <group>
            <Text3 
                fontSize={0.06}
                material={textMaterial}
                position={twitter.position.clone().add(new THREE.Vector3(0, 0, 0.175))} 
                rotation={[0, -Math.PI * 0.5, 0]}>
                Twitter
            </Text3>

            <Text3 
                fontSize={0.06}
                material={textMaterial} 
                position={github.position.clone().add(new THREE.Vector3(0, 0, 0.160))} 
                rotation={[0, -Math.PI * 0.5, 0]}>
                Github
            </Text3>

            <Text3 
                fontSize={0.06}
                material={textMaterial} 
                position={linkedin.position.clone().add(new THREE.Vector3(0, 0, 0.185))} 
                rotation={[0, -Math.PI * 0.5, 0]}>
                Linkedin
            </Text3>

            <Text3 
                fontSize={0.1}
                material={textMaterial}
                position={youtube.position.clone().add(new THREE.Vector3(-0.22, 0.65, 0.05))}> 
                Youtube
            </Text3>

            <Text3 
                fontSize={0.07}
                material={textMaterial} 
                position={resume.position.clone().add(new THREE.Vector3(0.225, 0.075, 0))} 
                rotation={[0, -Math.PI * 0.5, 0]}>
                Resume
            </Text3>

            <Text3 
                fontSize={0.125}
                material={textMaterial} 
                position={monitorScreen.position.clone().add(new THREE.Vector3(-0.49, 0.48, 0))}>
                Project 1
            </Text3>

            <Text3 
                fontSize={0.065}
                material={textMaterial} 
                position={drawingPadScreen.position.clone().add(new THREE.Vector3(-0.05, 0.16, -0.1))}
                rotation={[0, -0.4, 0]}>
                Project 2
            </Text3>

            <Text3 
                fontSize={0.065}
                material={textMaterial} 
                position={laptopScreen.position.clone().add(new THREE.Vector3(-0.0325, 0.225, -0.1025))}
                rotation={[0, -1.1, 0]}>
                Project 3
            </Text3>

            <Text3 
                fontSize={0.055}
                material={textMaterial} 
                position={me.position.clone().add(new THREE.Vector3(0.025, 0, 0.135))}
                rotation={[0, -1.3, 0]}>
                Me
            </Text3>

            <Controls />
            <Particles />

            <primitive object={room} />
        </group>
    )
}

export default Scene