import Sprite   from '../base/sprite'
import DataBus  from '../databus'

const screenWidth    = window.innerWidth
const screenHeight   = window.innerHeight

// 玩家相关常量设置
const PLAYER_IMG_SRC = 'images/enemy.png'
const PLAYER_WIDTH   = 50
const PLAYER_HEIGHT  = 50
const g=0.08
const MOVE_STEP = 10

let databus = new DataBus()

export default class Player extends Sprite {
  constructor() {
    super(PLAYER_IMG_SRC, PLAYER_WIDTH, PLAYER_HEIGHT)

    // 玩家默认处于屏幕顶部居中位置
    this.x = screenWidth / 2 - this.width / 2
    this.y = this.height + 30

    this.isJump=false
    this.speed=0
    this.blood=3
    this.moveType=null

    // 初始化事件监听
    this.initEvent()
  }


  /**
   * 玩家响应手指的触摸事件
   * 改变战机的位置
   */
  initEvent() {
    console.log("event");
    canvas.addEventListener('touchstart', ((e) => {
      e.preventDefault()

      let x = e.touches[0].clientX
      let y = e.touches[0].clientY
      this.moveType = x > screenWidth / 2 ? "right":"left"
      //
    }).bind(this))
    canvas.addEventListener('touchend', ((e) => {
      this.moveType=null;
      e.preventDefault()

    }).bind(this))
  }

  update(){
    this.y+=this.speed
    this.speed+=g
    if(this.speed>20){
      this.speed=20
    }
    if(this.y>screenHeight){
      this.blood=0
    }
    else if(this.y<10){
      this.blood-=1
      this.y+=20

      if(this.speed<0){
        this.speed=0
      }
    }
    if (this.moveType ==="left"){
        this.x-=MOVE_STEP
    }
    else if (this.moveType === "right"){
      this.x += MOVE_STEP
    }
    if(this.x<-10){
      this.x=-10
    }
    if(this.x>screenWidth-10){
      this.x = screenWidth - 10
    }
  }
}
