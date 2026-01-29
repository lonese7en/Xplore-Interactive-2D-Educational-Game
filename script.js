const fontStyle = document.createElement('style');
fontStyle.innerHTML = `
    @font-face {
        font-family: 'Ithaca';
        src: url('assets/Ithaca-LVB75.ttf');
    }
`;
document.head.appendChild(fontStyle);

// --- 1. THE QUESTIONS (LEVEL DATA) ---
const levels = [
    { 
        level: 1,
        question: "Find the derivative of: y = 5", 
        answer: 0, 
        options: [0, 5, 1], 
        playerStart: { x: 400, y: 500 },
        blockStart: { x: 200, y: 250 },
        blockPositions: [{ x: 200, y: 250 }, { x: 400, y: 250 }, { x: 600, y: 250 }],
        answerZone: { x: 700, y: 450 },
        portalPos: { x: 700, y: 300 }
    },
    { 
        level: 2,
        question: "Solve: 5x + 10 = 35", 
        answer: 5, 
        options: [5, 25, 10],
        playerStart: { x: 100, y: 100 },
        blockStart: { x: 300, y: 200 },
        blockPositions: [{ x: 300, y: 200 }, { x: 300, y: 350 }, { x: 300, y: 500 }],
        answerZone: { x: 600, y: 300 },
        portalPos: { x: 500, y: 200 }
    },
    { 
        level: 3,
        question: "What is 12 * 12?", 
        answer: 144, 
        options: [144, 124, 24],
        playerStart: { x: 400, y: 300 },
        blockStart: { x: 250, y: 100 },
        blockPositions: [{ x: 250, y: 100 }, { x: 250, y: 250 }, { x: 250, y: 400 }],
        answerZone: { x: 700, y: 400 },
        portalPos: { x: 700, y: 400 }
    },
    { 
        level: 4,
        question: "Find the derivative of: y = x^2", 
        answer: '2x', 
        options: ['x', '2x', 2],
        playerStart: { x: 400, y: 500 },
        blockStart: { x: 200, y: 250 },
        blockPositions: [{ x: 200, y: 250 }, { x: 900, y: 100 }, { x: 200, y: 550 }],
        answerZone: { x: 700, y: 450 },
        portalPos: { x: 700, y: 300 }
    },
    { 
        level: 5,
        question: "Find the derivative of: y = 3x^4", 
        answer: "12x^3", 
        options: ["12x^3", "3x^4", "12x"],
        playerStart: { x: 620, y: 1620 },
        blockStart: { x: 200, y: 250 },
        blockPositions: [{ x: 670, y: 1030 }, { x: 115, y: 790 }, { x: 1150, y: 890 }],
        answerZone: { x: 940, y: 660 },
        portalPos: { x: 621, y: 286 },
        gatePos: { x: 578, y: 480 }
    },
    // ... Placeholder for Level 6 ...
    { level: 6, question: "Level 6: Placeholder", answer: 0, options: [0, 1, 2], playerStart: { x: 400, y: 500 }, blockStart: { x: 200, y: 250 }, blockPositions: [{ x: 200, y: 250 }, { x: 200, y: 400 }, { x: 200, y: 550 }], answerZone: { x: 700, y: 450 }, portalPos: { x: 700, y: 300 } }
];

// --- 2. MAIN MENU SCENE ---
class MainMenu extends Phaser.Scene {
    constructor() { super('MainMenu'); }

    preload() {
        this.load.audio('title_music', 'assets/title_bgm.mp3');
        this.load.audio('game_music', 'assets/game_bgm.mp3');
    }

    create() {
        this.add.text(400, 200, 'MATH PUZZLE QUEST', { fontSize: '40px', fill: '#fff', fontFamily: 'Ithaca' }).setOrigin(0.5);
        
        // --- TITLE MUSIC FIX ---
        // We only play if it's not already playing.
        // We also stop the Game Music if we came back from the game.
        this.sound.stopByKey('game_music');
        
        if (!this.sound.get('title_music')) {
            this.sound.add('title_music', { loop: true, volume: 0.5 }).play();
        } else if (!this.sound.get('title_music').isPlaying) {
            this.sound.get('title_music').play();
        }

        // --- NEW GAME BUTTON ---
        let newGameBtn = this.add.text(400, 300, 'NEW GAME', { fontSize: '24px', fill: '#0f0', fontFamily: 'Ithaca' })
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true });

        newGameBtn.on('pointerdown', () => {
            this.sound.stopByKey('title_music'); // Stop Title
            localStorage.setItem('lastPlayedLevel', 1); 
            this.scene.start('GameLevel', levels[0]); 
        });

        // --- CONTINUE BUTTON ---
        let continueBtn = this.add.text(400, 360, 'CONTINUE', { fontSize: '24px', fill: '#0ff', fontFamily: 'Ithaca' })
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true });

        continueBtn.on('pointerdown', () => {
            this.sound.stopByKey('title_music'); // Stop Title
            const savedLevelNum = parseInt(localStorage.getItem('lastPlayedLevel')) || 1;
            const levelToLoad = levels.find(l => l.level === savedLevelNum) || levels[0];
            this.scene.start('GameLevel', levelToLoad); 
        });
        
        // --- BROWSER AUDIO UNLOCK ---
        // Browsers block audio until a click. This invisible overlay catches the first click.
        this.input.on('pointerdown', () => {
            if (this.sound.context.state === 'suspended') {
                this.sound.context.resume();
            }
        });
    }
}

// --- 3. GAME LEVEL SCENE ---
class GameLevel extends Phaser.Scene {
    constructor() { super('GameLevel'); }

    init(data) {
        this.currentLevelData = data;
        this.correctAnswer = data.answer;
        this.isGameFinished = false; 
    }

    preload() {
        this.load.spritesheet('floor_items', 'assets/atlas_floor-16x16.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('portal', 'assets/Dimensional_Portal.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('gate_locked', 'assets/gate_locked.png');
        this.load.image('gate_open', 'assets/gate_open.png');
        this.load.image('dialog_bg', 'assets/dialog_box.png');
        this.load.spritesheet('hero_sheet', 'assets/player.png', { frameWidth: 48, frameHeight: 48 });
        this.load.image('block', 'assets/gem.png');
        this.load.image('wall', 'assets/wall.png');
        this.load.spritesheet('professor', 'assets/doctor.png', { frameWidth: 16, frameHeight: 32 });
        this.load.spritesheet('sunny_tiles_png', 'assets/spr_tileset_sunnysideworld_16px.png', {
            frameWidth: 16, frameHeight: 16, margin: 1, spacing: 2
        });

        for (let i = 1; i <= 26; i++) {
             this.load.tilemapTiledJSON(`level${i}`, `assets/level${i}.json`);
        }
    }

    create() {
        localStorage.setItem('lastPlayedLevel', this.currentLevelData.level);
        this.cameras.main.fadeFrom(500, 0, 0, 0, false);

        // --- MAP SETUP ---
        const mapKey = `level${this.currentLevelData.level}`;
        const safeMapKey = this.cache.tilemap.exists(mapKey) ? mapKey : 'level1';
        const map = this.make.tilemap({ key: safeMapKey });
        const sunnyTiles = map.addTilesetImage('sunny_world', 'sunny_tiles_png', 16, 16, 1, 2);
        
        const bridgesLayer = map.createLayer('Bridge', sunnyTiles, 0, 0) || map.createLayer('around', sunnyTiles, 0, 0);
        const groundLayer = map.createLayer('Ground', sunnyTiles, 0, 0);
        const decorLayer = map.createLayer('Decoration', sunnyTiles, 0, 0);
        const wallsLayer = map.createLayer('Walls', sunnyTiles, 0, 0);

        if (bridgesLayer) { bridgesLayer.setScale(3); bridgesLayer.setDepth(5); }
        groundLayer.setScale(3);
        decorLayer.setScale(3);
        wallsLayer.setScale(3);
        wallsLayer.setCollisionByExclusion([-1]);

        if (!this.anims.exists('idle-down')) {
            this.anims.create({ key: 'idle-down', frames: this.anims.generateFrameNumbers('hero_sheet', { start: 0, end: 5 }), frameRate: 8, repeat: -1 });
            this.anims.create({ key: 'run-down', frames: this.anims.generateFrameNumbers('hero_sheet', { start: 18, end: 23 }), frameRate: 10, repeat: -1 });
            this.anims.create({ key: 'run-side', frames: this.anims.generateFrameNumbers('hero_sheet', { start: 24, end: 29 }), frameRate: 10, repeat: -1 });
            this.anims.create({ key: 'run-up', frames: this.anims.generateFrameNumbers('hero_sheet', { start: 30, end: 35 }), frameRate: 10, repeat: -1 });
        }

        // --- PLAYER (DEPTH 10) ---
        this.player = this.physics.add.sprite(this.currentLevelData.playerStart.x, this.currentLevelData.playerStart.y, 'hero_sheet');
        this.player.play('idle-down'); 
        this.player.setScale(3);
        this.player.setCollideWorldBounds(true);
        this.player.body.setSize(8, 5);
        this.player.body.setOffset(17, 25);
        this.player.setDepth(10); // Player is BEHIND blocks (if blocks are > 10)
        this.cursors = this.input.keyboard.createCursorKeys();

        // --- NPC ---
        if (this.currentLevelData.level === 1) {
            this.npc = this.physics.add.sprite(this.player.x + 100, this.player.y, 'professor');
            this.npc.setScale(3).setFrame(3).setImmovable(true).setDepth(10);
            this.npc.body.setAllowGravity(false);
            this.physics.add.collider(this.player, this.npc);
            
            this.npcMarker = this.add.text(this.npc.x, this.npc.y - 50, '!', {
                fontSize: '32px', fontFamily: 'Ithaca', fill: '#ffff00', stroke: '#000', strokeThickness: 4
            }).setOrigin(0.5).setDepth(20);
            
            this.tweens.add({ targets: this.npcMarker, y: this.npc.y - 60, duration: 500, yoyo: true, repeat: -1 });
        }

        // --- GATES (VISIBLE FIX) ---
        // Changed to normal group to ensure texture loading works better than staticGroup for dynamic sprites
        this.stoneGates = this.physics.add.group({ immovable: true, allowGravity: false }); 
        
        if (this.currentLevelData.gatePos) {
            // Use single gate from gatePos (supports both level 5 and other levels)
            let g = this.stoneGates.create(this.currentLevelData.gatePos.x, this.currentLevelData.gatePos.y, 'gate_locked');
            g.setScale(3).setOrigin(0, 0).setDepth(15).setVisible(true);
        }
        this.physics.add.collider(this.player, this.stoneGates);

        this.keyN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);
        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.setupUI(); 

        const answerPos = this.currentLevelData.answerZone;
        this.pressurePlate = this.physics.add.sprite(answerPos.x, answerPos.y, 'floor_items');
        this.pressurePlate.setScale(3).setFrame(30).setImmovable(true);
        this.pressurePlate.body.setAllowGravity(false);
        this.pressurePlate.body.setSize(10, 10).setOffset(3, 3);
        this.pressurePlate.setDepth(1); 

        // --- BLOCKS (DEPTH 20 - In Front of Player) ---
        this.blocks = this.physics.add.group();
        this.createBlocks();

        this.physics.add.collider(this.player, this.blocks);
        this.physics.add.collider(this.blocks, this.blocks);
        this.physics.add.collider(this.player, wallsLayer);
        this.physics.add.collider(this.blocks, wallsLayer);
        this.physics.add.collider(this.blocks, this.stoneGates);

        // --- BGM PERSISTENCE FIX ---
        // If music is already playing, DO NOT restart it.
        if (!this.sound.get('game_music')) {
             this.sound.add('game_music', { loop: true, volume: 0.4 }).play();
        } else if (!this.sound.get('game_music').isPlaying) {
             this.sound.get('game_music').play();
        }

        const mapWidth = map.widthInPixels * 3;
        const mapHeight = map.heightInPixels * 3;
        this.physics.world.setBounds(0, 0, mapWidth, mapHeight);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0, 0, mapWidth, mapHeight);

        if (!this.anims.exists('portal-spin')) {
            this.anims.create({ key: 'portal-spin', frames: this.anims.generateFrameNumbers('portal', { start: 0, end: 5 }), frameRate: 10, repeat: -1 });
        }
        const portalPos = this.currentLevelData.portalPos;
        this.portal = this.physics.add.sprite(portalPos.x, portalPos.y, 'portal').setScale(3).setVisible(false);
        this.portal.body.enable = false;
        
        // --- PORTAL HITBOX FIX (Smaller) ---
        this.portal.body.setSize(10, 10); // Very small hitbox
        this.portal.body.setOffset(11, 11); // Center it (32x32 sprite)

        this.physics.add.overlap(this.player, this.portal, () => { if (this.portal.visible) this.handleWin(); });

        this.cliffEdges = this.physics.add.staticGroup();
        const cliffObjs = map.getObjectLayer('CliffEdges')?.objects || [];
        cliffObjs.forEach(obj => {
            let edge = this.cliffEdges.create(obj.x * 3, obj.y * 3, null).setOrigin(0, 0);
            edge.setSize(obj.width * 3, obj.height * 3).setVisible(false);
            const tx = obj.properties?.find(p => p.name === 'landX')?.value || 0;
            const ty = obj.properties?.find(p => p.name === 'landY')?.value || 0;
            edge.landX = tx * 3; edge.landY = ty * 3;
        });
        this.physics.add.overlap(this.blocks, this.cliffEdges, (block, edge) => {
             if (edge.landX !== undefined) this.handleBlockDrop(block, edge.landX, edge.landY);
        }, null, this);
    }

    createBlocks() {
        let xPos = this.currentLevelData.blockStart.x;
        let yPos = this.currentLevelData.blockStart.y;
        this.currentLevelData.options.forEach((val, index) => {
            let blockPos = (this.currentLevelData.blockPositions && this.currentLevelData.blockPositions[index]) 
                           ? this.currentLevelData.blockPositions[index] 
                           : { x: xPos, y: yPos + (index * 150) };
            
            let block = this.blocks.create(blockPos.x, blockPos.y, 'block').setScale(3);
            block.setDrag(1000).setBounce(1).setCollideWorldBounds(true);
            
            // DEPTH 20: Ensures Block is VISUALLY in front of Player (Depth 10)
            block.setDepth(20); 
            
            block.value = val;
            
            let text = this.add.text(0, 0, val, { fontSize: '24px', color: '#000', fontFamily: 'Ithaca', fontStyle: 'bold' }).setOrigin(0.5);
            // Text Depth 21 (On top of block)
            text.setDepth(21);
            
            block.myText = text;
            block.updateText = function() { text.x = this.x; text.y = this.y; };
            yPos += 150;
        });
    }

    setupUI() {
        let restartBtn = this.add.text(20, 20, '↺', { 
            fontSize: '40px', fontFamily: 'Ithaca', fill: '#ffffff', backgroundColor: '#000000' 
        }).setPadding(5).setOrigin(0).setScrollFactor(0).setInteractive({ useHandCursor: true });
        restartBtn.on('pointerdown', () => { this.physics.pause(); this.scene.restart(); });
        this.input.keyboard.on('keydown-R', () => { this.physics.pause(); this.scene.restart(); });

        let pauseBtn = this.add.text(80, 20, 'II', { 
            fontSize: '40px', fontFamily: 'Ithaca', fill: '#ffffff', backgroundColor: '#000000' 
        }).setPadding(5).setOrigin(0).setScrollFactor(0).setInteractive({ useHandCursor: true });
        pauseBtn.on('pointerdown', () => {
            if (this.physics.world.isPaused) { this.physics.resume(); pauseBtn.setText('II'); } 
            else { this.physics.pause(); pauseBtn.setText('▶'); }
        });

        this.dialogContainer = this.add.container(400, 50).setScrollFactor(0).setDepth(200).setVisible(false);
        this.dialogContainer.add(this.add.nineslice(0, 0, 'dialog_bg', 0, 700, 150, 10, 10, 10, 10));
        this.dialogText = this.add.text(0, 0, '', { fontSize: '20px', fontFamily: 'Ithaca', color: '#4a3d2e', wordWrap: { width: 650 }, align: 'center' }).setOrigin(0.5);
        this.dialogContainer.add(this.dialogText);
        
        this.interactPrompt = this.add.text(0, 0, 'Press E to talk', { fontSize: '12px', fontFamily: 'Ithaca', backgroundColor: '#000' }).setOrigin(0.5).setDepth(101).setVisible(false);
        
        const qContainer = this.add.container(400, 40).setScrollFactor(0).setDepth(100);
        qContainer.add(this.add.nineslice(0, 0, 'dialog_bg', 0, 500, 60, 10, 10, 10, 10));
        qContainer.add(this.add.text(0, 0, `Level ${this.currentLevelData.level}: ${this.currentLevelData.question}`, { fontSize: '18px', fontFamily: 'Ithaca', fill: '#4a3d2e', wordWrap: { width: 480 }, align: 'center' }).setOrigin(0.5));
    }

    update() {
        if (this.isGameFinished) return;
        if (Phaser.Input.Keyboard.JustDown(this.keyN)) { this.handleWin(); }

        this.player.setVelocity(0);
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-200); this.player.anims.play('run-side', true); this.player.setFlipX(true);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(200); this.player.anims.play('run-side', true); this.player.setFlipX(false);
        } else if (this.cursors.up.isDown) {
            this.player.setVelocityY(-200); this.player.anims.play('run-up', true);
        } else if (this.cursors.down.isDown) {
            this.player.setVelocityY(200); this.player.anims.play('run-down', true);
        } else {
            this.player.anims.play('idle-down', true);
        }

        this.blocks.getChildren().forEach((block) => {
            if (!block.active) return;
            if (block.updateText) block.updateText();
            if (Phaser.Geom.Intersects.RectangleToRectangle(block.body, this.pressurePlate.body)) {
                if (block.value == this.correctAnswer) {
                    this.pressurePlate.setFrame(31); 
                    block.x = this.pressurePlate.x;
                    block.y = this.pressurePlate.y;
                    this.activatePortal(); 
                    if (block.myText) block.myText.destroy();
                    block.destroy(); 
                } else { this.handleGameOver(); }
            }
        });

        if (this.npc && this.currentLevelData.level === 1) {
            const dist = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.npc.x, this.npc.y);
            if (dist < 80) {
                this.interactPrompt.setPosition(this.npc.x, this.npc.y - 50).setVisible(true);
                if (this.npcMarker) this.npcMarker.setVisible(false);
                if (Phaser.Input.Keyboard.JustDown(this.keyE)) {
                    this.showDialogue("PROF. PRIME:\n----------------\nHurry! Use Arrow Keys to move.\nPush the correct Answer Block into the Yellow Zone!");
                }
            } else {
                this.interactPrompt.setVisible(false);
                if (this.npcMarker) this.npcMarker.setVisible(true);
                this.hideDialogue();
            }
        }
    }

    handleBlockDrop(block, destX, destY) {
        if (block.isFalling) return;
        block.isFalling = true;
        block.body.setVelocity(0, 0); block.body.enable = false;
        this.tweens.add({ targets: block, x: destX, y: destY, scaleX: { from: 4, to: 3 }, scaleY: { from: 4, to: 3 }, duration: 600, ease: 'Cubic.easeOut', onComplete: () => { block.body.enable = true; block.isFalling = false; } });
        this.tweens.add({ targets: block.myText, x: destX, y: destY, duration: 600, ease: 'Cubic.easeOut' });
    }

    activatePortal() {
        if (this.portal.visible) return;
        this.portal.setVisible(true); this.portal.body.enable = true; this.portal.play('portal-spin');
        this.stoneGates.children.iterate((gate) => { if (gate) { gate.setTexture('gate_open'); gate.body.enable = false; } });
        this.add.text(400, 300, "GATE OPENED!", { fontSize: '32px', fontFamily: 'Ithaca', color: '#00ff00', stroke: '#000', strokeThickness: 4 }).setOrigin(0.5).destroy({ fromScene: true, delay: 2000 });
    }

    handleWin() {
        this.isGameFinished = true;
        this.physics.pause();
        this.player.anims.stop();
        const completeText = this.add.text(400, 250, `LEVEL ${this.currentLevelData.level}\nCOMPLETE!`, { fontSize: '64px', fill: '#ffff00', backgroundColor: '#000', fontFamily: 'Ithaca', align: 'center' }).setOrigin(0.5).setScrollFactor(0).setDepth(300);
        this.tweens.add({ targets: completeText, scale: 1.2, duration: 500, yoyo: true, hold: 1000 });
        this.time.delayedCall(3000, () => {
            this.cameras.main.fade(500, 0, 0, 0);
            this.time.delayedCall(600, () => {
                let nextLevelNum = this.currentLevelData.level + 1;
                // DO NOT STOP BGM HERE
                if (nextLevelNum <= levels.length) { this.scene.start('GameLevel', levels[nextLevelNum - 1]); } 
                else { this.scene.start('MainMenu'); }
            });
        });
    }

    handleGameOver() {
        this.isGameFinished = true;
        this.physics.pause();
        this.player.anims.stop();
        this.sound.stopByKey('game_music'); // Stop music on game over
        this.add.text(400, 300, 'GAME OVER', { fontSize: '64px', fill: '#f00', backgroundColor: '#000', fontFamily: 'Ithaca' }).setOrigin(0.5);
        this.time.delayedCall(2000, () => { this.scene.start('MainMenu'); });
    }

    showDialogue(fullText) {
        if (this.dialogContainer.y > 0) return;
        this.dialogContainer.setVisible(true);
        this.tweens.add({ targets: this.dialogContainer, y: 50, duration: 500, ease: 'Power2.out' });
        this.dialogText.setText('');
        let i = 0;
        if (this.typingTimer) this.typingTimer.remove();
        this.typingTimer = this.time.addEvent({ delay: 30, callback: () => { this.dialogText.text += fullText[i]; i++; }, repeat: fullText.length - 1 });
    }

    hideDialogue() {
        if (this.dialogContainer.y < 0) return;
        if (this.typingTimer) this.typingTimer.remove();
        this.tweens.add({ targets: this.dialogContainer, y: -200, duration: 300, ease: 'Power2.in', onComplete: () => { this.dialogContainer.setVisible(false); this.dialogText.setText(''); } });
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#222222',
    pixelArt: true,
    roundPixels: true,
    physics: { default: 'arcade', arcade: { debug: true } }, 
    scene: [MainMenu, GameLevel] 
};

const game = new Phaser.Game(config);