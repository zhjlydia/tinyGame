import Player from './player/index'
import FloorNormal from './npc/floorNormal'
import FloorIce from './npc/floorIce'
import FloorFast from './npc/floorFast'
import FloorBomb from './npc/floorBomb'
import FloorAttack from './npc/floorAttack'
import BackGround from './runtime/background'
import Celling from './npc/celling'
import GameInfo from './runtime/gameinfo'
import Music from './runtime/music'
import DataBus from './databus'

let ctx = canvas.getContext('2d')
let databus = new DataBus()

/**
 * 游戏主函数
 */
export default class Main {
  constructor() {
    // 维护当前requestAnimationFrame的id
    this.aniId = 0

    this.restart()
  }

  restart() {
    databus.reset()

    canvas.removeEventListener(
      'touchstart',
      this.touchHandler
    )

    this.bg = new BackGround(ctx)
    this.player = new Player()
    this.ceiling = new Celling()
    this.gameinfo = new GameInfo()
    // this.music = new Music()
    this.bindLoop = this.loop.bind(this)
    this.hasEventBind = false

    // 清除上一局的动画
    window.cancelAnimationFrame(this.aniId);

    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
  }
  initFirstFloor(){
    let floor = new FloorNormal();
    floor.init(2, 100, 300)
    databus.enemys.push(floor)
  }
  /**
   * 随着帧数变化的敌机生成逻辑
   * 帧数取模定义成生成的频率
   */
  enemyGenerate() {
    if (databus.frame===1){
      this.initFirstFloor();
    }
    if (databus.frame % 60 === 0) {
      var mstage;
      var index = Math.random() * 5;
      if (index <= 1) {
        mstage = FloorNormal;
      }
      else if (index <= 2) {
        mstage = FloorIce;
      }
      else if (index <= 3) {
        mstage = FloorFast;
      }
      else if (index <= 4) {
        mstage = FloorBomb;
      }
      else if (index <= 5) {
        mstage = FloorAttack;
      }
      let enemy = databus.pool.getItemByClass('enemy', mstage)
      enemy.init(2)
      databus.enemys.push(enemy)
    }
  }


  // 游戏结束后的触摸事件处理逻辑
  touchEventHandler(e) {
    e.preventDefault()

    let x = e.touches[0].clientX
    let y = e.touches[0].clientY

    let area = this.gameinfo.btnArea

    if (x >= area.startX
      && x <= area.endX
      && y >= area.startY
      && y <= area.endY)
      this.restart()
  }

  /**
   * canvas重绘函数
   * 每一帧重新绘制所有的需要展示的元素
   */
  render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    this.bg.render(ctx)

    databus.enemys
      .forEach((item) => {
        item.setView(ctx)
      })

    this.player.drawToCanvas(ctx)
    this.ceiling.drawToCanvas(ctx)

    databus.animations.forEach((ani) => {
      if (ani.isPlaying) {
        ani.aniRender(ctx)
      }
    })

    this.gameinfo.renderGameScore(ctx, databus.score)

    // 游戏结束停止帧循环
    if (databus.gameOver) {
      this.gameinfo.renderGameOver(ctx, databus.score)

      if (!this.hasEventBind) {
        this.hasEventBind = true
        this.touchHandler = this.touchEventHandler.bind(this)
        canvas.addEventListener('touchstart', this.touchHandler)
      }
    }
  }

  // 游戏逻辑更新主函数
  update() {
    if (databus.gameOver)
      return;

    this.bg.update()
    if (this.player){
      this.player.update()
    }
    databus.enemys
      .forEach((item) => {
        item.update()
      })

    this.enemyGenerate()

    this.collisionDetection()
    databus.score = this.bg.renderIndex
    if(this.player.blood<=0){
      databus.gameOver = true
    }
  }
  //碰撞检测
  collisionDetection() {
    for (let i = 0, il = databus.enemys.length; i < il; i++) {
      let floor = databus.enemys[i]
      if (floor.isCollideWith(this.player)) {
        this.player.isJump = false;
        this.player.speed = 0;
        this.player.y = floor.y - 20;
        floor.hitRun(this.player);
        break
      }
    }
    if (this.ceiling.isCollideWith(this.player)) {
      this.player.blood -=1;
    }
  }

  // 实现游戏帧循环
  loop() {
    databus.frame++

    this.update()
    this.render()

    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
  }
}
