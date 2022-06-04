const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height= innerHeight

class Player {
  constructor() {
    this.velocity = { x:0, y:0}

    this.rotation = 0

    const image = new Image()
    image.src = './img/spaceship.png'
    image.onload = () => {
      const scale = .15
      this.image = image
      this.width = image.width *scale
      this.height = image.height *scale
      this.position = { x:canvas.width/2 - this.width, y:canvas.height*0.95}
    }

  }

  draw() {
    // c.fillStyle = 'red'
    // c.fillRect(this.position.x, this.position.y, this.width, this.height)
    c.fillStyle = 'gray'
    c.fillRect(0,canvas.height*0.745,canvas.width,canvas.height*0.005)

    c.save()
    c.translate(player.position.x + player.width/2, player.position.y + player.height/2)

    c.rotate(this.rotation)
    c.translate(-player.position.x - player.width/2, -player.position.y - player.height/2)

    c.drawImage(this.image,
                this.position.x,
                this.position.y,
                this.width,
                this.height)
    c.restore()
  }

  update(){
    if(this.image){
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
    }
  }
}

class Projectile {
  constructor({position, velocity,}){
    this.position = position
    this.velocity = velocity

    this.radius = 3
  }

  draw(){
    c.beginPath()
    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI*2)
    c.fillStyle= 'red'
    c.fill()
    c.closePath()
  }
  update(){
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
  }
}

class Invader {
  constructor() {
    this.velocity = { x:0, y:0}

    const image = new Image()
    image.src = './img/invader.png'
    image.onload = () => {
      const scale = 1
      this.image = image
      this.width = image.width *scale
      this.height = image.height *scale
      this.position = {
        x:canvas.width/2 - this.width/2,
        y:canvas.height/2
      }
    }
  }

  draw() {
    // c.fillStyle = 'red'
    // c.fillRect(this.position.x, this.position.y, this.width, this.height)

    c.drawImage(this.image,
                this.position.x,
                this.position.y,
                this.width,
                this.height
              )
  }

  update(){
    if(this.image){
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
    }
  }
}

const player = new Player()
const projectiles = []
const invader = new Invader()
const keys = {
  a: {
    pressed: false
  },
  d: {
    pressed: false
  },
  s: {
    pressed: false
  },
  w: {
    pressed: false
  },
  space: {
    pressed: false
  },
}

function animate(){
  requestAnimationFrame(animate)
  c.fillStyle='black'
  c.fillRect(0,0, canvas.width, canvas.height)
  player.update()
  invader.update()
  projectiles.forEach((projectile, index) => {
    if(projectile.position.y + projectile.radius <=0){
      setTimeout(() => {
        projectiles.splice(index,1)
      }, 0)
    } else {
      projectile.update()
    }
  });


  if(keys.a.pressed && player.position.x >= 0){
    player.velocity.x = -5
    player.rotation = -.15
  } else if(keys.d.pressed && player.position.x <= canvas.width - player.width) {
    player.velocity.x = 5
    player.rotation = .15
  } else {
    player.velocity.x = 0
  }

  if(keys.w.pressed && player.position.y > canvas.height*0.75 + canvas.height*0.005){
    player.velocity.y = -5
  } else if(keys.s.pressed && player.position.y < canvas.height - player.height - 20) {
    player.velocity.y = 5
  } else {
    player.velocity.y = 0
  }
  if(keys.space.pressed){
    console.log("space")
  }
}

animate()

addEventListener('keydown', ({key}) => {
  switch (key) {
    case 'a':
    keys.a.pressed = true
      break;
    case 'd':
    keys.d.pressed = true
        break;
    case 'w':
    keys.w.pressed = true
        break;
    case 's':
    keys.s.pressed = true
      break;
    case ' ':
    projectiles.push(new Projectile({
      position: {
        x: player.position.x + player.width/2, y: player.position.y
      },
      velocity:  {
        x: 0, y: -5
      }
    }))
      break;
    default:
  }
})

addEventListener('keyup', ({key}) => {
  switch (key) {
    case 'a':
    keys.a.pressed = false
      break;
    case 'd':
    keys.d.pressed = false
        break;
    case 'w':
    keys.w.pressed = false
        break;
    case 's':
    keys.s.pressed = false
      break;
    case ' ':
      break;
    default:
  }
})
