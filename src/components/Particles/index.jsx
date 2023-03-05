import { useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { GPUComputationRenderer } from 'three/examples/jsm/misc/GPUComputationRenderer'
import particlesVertexShader from '../../shaders/particles/particles.vert'
import particlesFragmentShader from '../../shaders/particles/particles.frag'
import particlesComputeShader from '../../shaders/particles/compute.frag'

function Particles({ count = 50, size = 25, spread = 10, position=[0, 0, 0] }) {
    const { gl: renderer } = useThree()

    const [gpuCompute, positionVar, material, positions, uvs] = useMemo(() => {
        const sizeX = Math.floor(count / 50)
        const sizeY = 50
        const actualCount = sizeX * sizeY

        const gpuCompute = new GPUComputationRenderer(sizeX, sizeY, renderer)

        if (!renderer.capabilities.isWebGL2) {
            gpuCompute.setDataType(THREE.HalfFloatType)
        }

        const positionTexture = gpuCompute.createTexture()
        const positionTextureData = positionTexture.image.data

        for (let i = 0; i < actualCount; ++i) {
            positionTextureData[4 * i + 0] = (Math.random() - 0.5) * spread
            positionTextureData[4 * i + 1] = (Math.random() - 0.5) * spread
            positionTextureData[4 * i + 2] = (Math.random() - 0.5) * spread
            positionTextureData[4 * i + 3] = Math.random()
        }

        const positionVar = gpuCompute.addVariable('uPositionTexture', particlesComputeShader, positionTexture)

        Object.assign(positionVar.material.uniforms, {
            uTime: { value: 0 },
            uBasePositionTexture: { value: positionTexture.clone() }
        })

        gpuCompute.setVariableDependencies(positionVar, [positionVar])

        const error = gpuCompute.init()

        if (error) {
            console.log(error)
        }

        const material = new THREE.ShaderMaterial({
            uniforms: {
                uPositionTexture: { value: positionTexture },
                uParticleSize: { value: size }
            },
            vertexShader: particlesVertexShader,
            fragmentShader: particlesFragmentShader,
            transparent: true,
            depthTest: false
        })

        const positions = new Float32Array(actualCount * 3)
        const uvs = new Float32Array(actualCount * 2)

        for (let i = 0; i < actualCount; ++i) {
            uvs[2 * i + 0] = i % sizeX / sizeX
            uvs[2 * i + 1] = Math.floor(i / sizeX) / sizeY
        }

        return [gpuCompute, positionVar, material, positions, uvs]
    }, [])

    useFrame((state) => {
        if (gpuCompute) {
            positionVar.material.uniforms.uTime.value = state.clock.getElapsedTime()

            gpuCompute.compute()

            material.uniforms.uPositionTexture.value = gpuCompute.getCurrentRenderTarget(positionVar).texture
        }
    })

    return (
        <points material={material} position={position} frustumCulled={false}>
            <bufferGeometry>
                <bufferAttribute attach='attributes-position' args={[positions, 3]} />
                <bufferAttribute attach='attributes-uv' args={[uvs, 2]} />
            </bufferGeometry>
        </points>
    )
}

export default Particles