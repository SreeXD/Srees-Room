// code partially based on https://github.com/mrdoob/three.js/blob/dev/examples/jsm/loaders/OBJLoader.js

import * as THREE from 'three'

class EdgesLoader extends THREE.Loader {
    constructor(manager) {
        super(manager)
    }

	load(url, onLoad, onProgress, onError) {
		const scope = this
		const loader = new THREE.FileLoader(this.manager)
		loader.setPath(this.path)
		loader.setRequestHeader(this.requestHeader)
		loader.setWithCredentials(this.withCredentials)
		loader.load(url, function (text) {
			try {
				onLoad(scope.parse(text))
			} catch (e) {
				if (onError) {
					onError(e)
				} else {
					console.error(e)
				}

				scope.manager.itemError(url)
			}

		}, onProgress, onError)
	}

    parse(text) {
        const vertices = []
        const index = []
        const lines = text.split('\n')
        let values

        for (const line of lines) {
            switch (line[0]) {
                case 'v':
                    values = line.split(' ').slice(1).map(value => parseFloat(value))
                    vertices.push(...values)           
                    break 

                case 'f':
                    values = line.split(' ').slice(1).map(value => parseInt(value))
                    let prev = values[0]

                    for (let i = 1; i <= values.length; ++i) {
                        const value = parseInt(values[i % values.length])
                        index.push(prev - 1, value - 1)
                        prev = value
                    }

                    break
            }
        }

        const geometry = new THREE.BufferGeometry()
        geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(vertices), 3))
        geometry.setIndex(index)

        return { geometry }
    }    
}

export default EdgesLoader