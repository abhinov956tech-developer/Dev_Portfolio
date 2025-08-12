import { useRef, Suspense } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Group } from 'three'

function Avatar() {
  const avatarRef = useRef<Group>(null)
  const { scene } = useGLTF('https://models.readyplayer.me/689bb59da883f79aa01a09ee.glb')

  useFrame((state) => {
    if (avatarRef.current) {
      avatarRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <group ref={avatarRef}>
      <primitive object={scene} scale={1.5} position={[0, -1.5, 0]} />
    </group>
  )
}

export function ThreeAvatar() {
  return (
    <Suspense fallback={null}>
      <PerspectiveCamera makeDefault position={[0, 0, 4]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Avatar />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
      />
    </Suspense>
  )
}
