import { forwardRef } from 'react'
import { Text } from '@react-three/drei'
import oswaldMediumFont from '../../assets/fonts/Oswald-Medium.ttf'

const Text3 = forwardRef(({ children, ...remaining }, ref) => {
    return (
        <Text 
            ref={ref} 
            font={oswaldMediumFont}
            {...remaining}>
            {children}
        </Text>
    )
})

export default Text3