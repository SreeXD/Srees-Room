import * as THREE from 'three'

const { VITE_GITHUB_LINK, VITE_TWITTER_LINK, VITE_YOUTUBE_LINK, VITE_LINKEDIN_LINK, VITE_RESUME_LINK } = import.meta.env

export const names = {
    'me': 'me',
    'Github': 'github',
    'Twitter': 'twitter',
    'Youtube': 'youtube',
    'Linkedin': 'linkedin',
    'Monitor_Screen': 'libxd',
    'Drawing_Pad_Screen': 'xwing',
    'Laptop_Screen': 'xdrive',
    'Resume': 'resume'
}

export const normals = {
    'me': new THREE.Vector3(-1, 0, 0.2).normalize().multiplyScalar(0.6),
    'Monitor_Screen': new THREE.Vector3(0, 0, 1).multiplyScalar(1.75),
    'Drawing_Pad_Screen': new THREE.Vector3(-0.1, 0.15, 0.2).normalize().multiplyScalar(0.6),
    'Laptop_Screen': new THREE.Vector3(-0.35, 0.1, 0.2).normalize().multiplyScalar(0.6)
}

export const infos = {
    'Monitor_Screen': {
        title: 'LibXD',
        description: 'A 3D web application for library management in schools and universities',
        github: 'https://github.com/SreeXD/LibXD',
        youtube: 'https://www.youtube.com/watch?v=UWYtzEztrEM'
    },

    'Drawing_Pad_Screen': {
        title: 'Xwing webpage',
        description: 'A hypothetical 3D webpage of incom corporation introducing their newest product.. the X-Wing starfighter',
        github: 'https://github.com/SreeXD/X-Wing',
        youtube: 'https://www.youtube.com/watch?v=_QIDsdEObI0',
        hosted: 'https://xd-wing.netlify.app/'
    },

    'Laptop_Screen': {
        title: 'XDrive',
        description: 'A completely decentralized file storage platform built on top of arweave and bundlr.network (work in progress)'
    },

    'me': {
        title: 'Nagendran N',
        description: 'Hey! I am Nagendran a.k.a Sree (my house name), I am a currently a computer science student interested in web, crypto and 3D',
        github: VITE_GITHUB_LINK,
        twitter: VITE_TWITTER_LINK,
        youtube: VITE_YOUTUBE_LINK,
        linkedin: VITE_LINKEDIN_LINK,
        resume: VITE_RESUME_LINK
    }
}