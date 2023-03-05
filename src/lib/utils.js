import * as THREE from 'three'

export function animate(func) {
    let previousTime = new Date().getTime()
    
    const onAnimationFrame = () => {
        let currentTime = new Date().getTime()
        let delta = (currentTime - previousTime) / 1000
        previousTime = currentTime

        func(delta)

        animId = requestAnimationFrame(onAnimationFrame)
    }

    let animId = requestAnimationFrame(onAnimationFrame)

    return () => {
        cancelAnimationFrame(animId)
    }
}

export function getElementPosition(element) {
    const boundingRect = element.getBoundingClientRect()

    return new THREE.Vector2(
        boundingRect.left + boundingRect.width * 0.5, 
        boundingRect.top + boundingRect.height * 0.5, 
    )
}

export function normalizePointerCoordinates(coordinates) {
    return new THREE.Vector2(
        2 * (coordinates.x / window.innerWidth - 0.5),
        -2 * (coordinates.y / window.innerHeight - 0.5)
    )
}

export function lerp(x1, x2, t) {
    return (1 - t) * x1 + t * x2
}

export const fixTexture = (texture) => {
    texture.flipY = false 
    texture.encoding = THREE.sRGBEncoding
    texture.needsUpdate = true
}

export const createVideoMaterial = (src) => {
    const video = document.createElement('video')
    video.src = src
    video.loop = true
    video.muted = true
    video.play()

    const videoTexture = new THREE.VideoTexture(video)
    fixTexture(videoTexture)
    
    const videoMaterial = new THREE.MeshBasicMaterial({ map: videoTexture }) 

    return videoMaterial
}

export const getDistanceSquared = (x1, y1, x2, y2) => {
    return (x1 - x2) ** 2 + (y1 - y2) ** 2
}