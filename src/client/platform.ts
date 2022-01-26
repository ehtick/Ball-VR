import * as THREE from 'three'
import Ball from './ball'
import * as CANNON from 'cannon-es'
import Earth from './earth'

export default class Platform {
    private earth: Earth
    static material = new THREE.MeshMatcapMaterial({
        map: new THREE.TextureLoader().load('img/marble.png'),
        matcap: new THREE.TextureLoader().load('img/matcap-green-yellow-pink.png'),
    })
    mesh: THREE.Mesh
    body: CANNON.Body
    world: CANNON.World

    yStart = 0
    yOffset = 0

    constructor(scene: THREE.Scene, earth: Earth, world: CANNON.World) {
        this.earth = earth
        this.world = world

        const x = Math.floor(Math.random() * 20 + 1)
        const y = Math.floor(Math.random() * 20 + 1)
        this.mesh = new THREE.Mesh(new THREE.BoxGeometry(x, y, 0.5), Platform.material)
        scene.add(this.mesh)

        this.body = new CANNON.Body({ mass: 0 })
        this.body.addShape(new CANNON.Box(new CANNON.Vec3(x / 2, y / 2, 0.25)))
        this.body.sleep()
        this.world.addBody(this.body)

        this.randomise()
    }

    randomise() {
        const p = this.earth.getSpawnPosition(2)
        this.mesh.position.copy(p)
        this.mesh.lookAt(0, 0, 0)
        this.body.position.set(this.mesh.position.x, this.mesh.position.y, this.mesh.position.z)
        this.body.quaternion.set(
            this.mesh.quaternion.x,
            this.mesh.quaternion.y,
            this.mesh.quaternion.z,
            this.mesh.quaternion.w
        )

        const type = Math.floor(Math.random() * 3)
        switch (type) {
            case 0: //static
                this.update = (delta: number, ball: Ball) => {}
                break
            case 1: //spinning clockwise
                this.update = (delta: number, ball: Ball) => {
                    this.mesh.rotation.z += 0.01
                    //this.body.position.set(this.mesh.position.x, this.mesh.position.y, this.mesh.position.z)
                    this.body.quaternion.set(
                        this.mesh.quaternion.x,
                        this.mesh.quaternion.y,
                        this.mesh.quaternion.z,
                        this.mesh.quaternion.w
                    )
                }
                break
            case 2: //spinning anti-clockwise
                this.update = (delta: number, ball: Ball) => {
                    this.mesh.rotation.z -= 0.01
                    //this.body.position.set(this.mesh.position.x, this.mesh.position.y, this.mesh.position.z)
                    this.body.quaternion.set(
                        this.mesh.quaternion.x,
                        this.mesh.quaternion.y,
                        this.mesh.quaternion.z,
                        this.mesh.quaternion.w
                    )
                }
                break
            // case 3: //up and down
            //     this.update = (delta: number, ball: Ball) => {
            //         //console.log(this.mesh.position.y)
            //         this.yOffset = Math.sin(delta * 0.5) * 40
            //         this.mesh.position.y = 
            //         this.body.position.set(
            //             this.mesh.position.x,
            //             this.mesh.position.y,
            //             this.mesh.position.z
            //         )
            //         // this.body.quaternion.set(
            //         //     this.mesh.quaternion.x,
            //         //     this.mesh.quaternion.y,
            //         //     this.mesh.quaternion.z,
            //         //     this.mesh.quaternion.w
            //         // )
            //     }
        }
        this.body.wakeUp()
    }

    update(delta: number, ball: Ball) {}
}
