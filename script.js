
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
        blockPositions: [
            { x: 200, y: 250 },
            { x: 400, y: 250 },
            { x: 600, y: 250 }
        ],
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
        blockPositions: [
            { x: 300, y: 200 },
            { x: 300, y: 350 },
            { x: 300, y: 500 }
        ],
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
        blockPositions: [
            { x: 250, y: 100 },
            { x: 250, y: 250 },
            { x: 250, y: 400 }
        ],
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
        blockPositions: [
            { x: 200, y: 250 },
            { x: 900, y: 100 },
            { x: 200, y: 550 }
        ],
        answerZone: { x: 700, y: 450 },
        portalPos: { x: 700, y: 300 }
    },
    { 
        level: 5,
        question: "Question for Level 5", 
        answer: 0, 
        options: [0, 1, 2],
        playerStart: { x: 620, y: 1620 },
        blockStart: { x: 200, y: 250 },
        gatePos: { x: 625, y: 500 },
        blockPositions: [
            { x: 670, y: 1030 },
            { x: 115, y: 790 },
            { x: 1150, y: 890 }
        ],
        answerZone: { x: 940, y: 660 },
        portalPos: { x: 621, y: 286 }
    },
    { 
        level: 6,
        question: "Question for Level 6", 
        answer: 0, 
        options: [0, 1, 2],
        playerStart: { x: 400, y: 500 },
        blockStart: { x: 200, y: 250 },
        blockPositions: [
            { x: 200, y: 250 },
            { x: 200, y: 400 },
            { x: 200, y: 550 }
        ],
        answerZone: { x: 940, y: 660 },
        portalPos: { x: 700, y: 300 }
    },
    { 
        level: 7,
        question: "Question for Level 7", 
        answer: 0, 
        options: [0, 1, 2],
        playerStart: { x: 400, y: 500 },
        blockStart: { x: 200, y: 250 },
        blockPositions: [
            { x: 200, y: 250 },
            { x: 200, y: 400 },
            { x: 200, y: 550 }
        ],
        answerZone: { x: 700, y: 450 },
        portalPos: { x: 700, y: 300 }
    },
    { 
        level: 8,
        question: "Question for Level 8", 
        answer: 0, 
        options: [0, 1, 2],
        playerStart: { x: 400, y: 500 },
        blockStart: { x: 200, y: 250 },
        blockPositions: [
            { x: 200, y: 250 },
            { x: 200, y: 400 },
            { x: 200, y: 550 }
        ],
        answerZone: { x: 700, y: 450 },
        portalPos: { x: 700, y: 300 }
    },
    { 
        level: 9,
        question: "Question for Level 9", 
        answer: 0, 
        options: [0, 1, 2],
        playerStart: { x: 400, y: 500 },
        blockStart: { x: 200, y: 250 },
        blockPositions: [
            { x: 200, y: 250 },
            { x: 200, y: 400 },
            { x: 200, y: 550 }
        ],
        answerZone: { x: 700, y: 450 },
        portalPos: { x: 700, y: 300 }
    },
    { 
        level: 10,
        question: "Question for Level 10", 
        answer: 0, 
        options: [0, 1, 2],
        playerStart: { x: 400, y: 500 },
        blockStart: { x: 200, y: 250 },
        blockPositions: [
            { x: 200, y: 250 },
            { x: 200, y: 400 },
            { x: 200, y: 550 }
        ],
        answerZone: { x: 700, y: 450 },
        portalPos: { x: 700, y: 300 }
    },
    { 
        level: 11,
        question: "Question for Level 11", 
        answer: 0, 
        options: [0, 1, 2],
        playerStart: { x: 400, y: 500 },
        blockStart: { x: 200, y: 250 },
        blockPositions: [
            { x: 200, y: 250 },
            { x: 200, y: 400 },
            { x: 200, y: 550 }
        ],
        answerZone: { x: 700, y: 450 },
        portalPos: { x: 700, y: 300 }
    },
    { 
        level: 12,
        question: "Question for Level 12", 
        answer: 0, 
        options: [0, 1, 2],
        playerStart: { x: 400, y: 500 },
        blockStart: { x: 200, y: 250 },
        blockPositions: [
            { x: 200, y: 250 },
            { x: 200, y: 400 },
            { x: 200, y: 550 }
        ],
        answerZone: { x: 700, y: 450 },
        portalPos: { x: 700, y: 300 }
    },
    { 
        level: 13,
        question: "Question for Level 13", 
        answer: 0, 
        options: [0, 1, 2],
        playerStart: { x: 400, y: 500 },
        blockStart: { x: 200, y: 250 },
        blockPositions: [
            { x: 200, y: 250 },
            { x: 200, y: 400 },
            { x: 200, y: 550 }
        ],
        answerZone: { x: 700, y: 450 },
        portalPos: { x: 700, y: 300 }
    },
    { 
        level: 14,
        question: "Question for Level 14", 
        answer: 0, 
        options: [0, 1, 2],
        playerStart: { x: 400, y: 500 },
        blockStart: { x: 200, y: 250 },
        blockPositions: [
            { x: 200, y: 250 },
            { x: 200, y: 400 },
            { x: 200, y: 550 }
        ],
        answerZone: { x: 700, y: 450 },
        portalPos: { x: 700, y: 300 }
    },
    { 
        level: 15,
        question: "Question for Level 15", 
        answer: 0, 
        options: [0, 1, 2],
        playerStart: { x: 400, y: 500 },
        blockStart: { x: 200, y: 250 },
        blockPositions: [
            { x: 200, y: 250 },
            { x: 200, y: 400 },
            { x: 200, y: 550 }
        ],
        answerZone: { x: 700, y: 450 },
        portalPos: { x: 700, y: 300 }
    },
    { 
        level: 16,
        question: "Question for Level 16", 
        answer: 0, 
        options: [0, 1, 2],
        playerStart: { x: 400, y: 500 },
        blockStart: { x: 200, y: 250 },
        blockPositions: [
            { x: 200, y: 250 },
            { x: 200, y: 400 },
            { x: 200, y: 550 }
        ],
        answerZone: { x: 700, y: 450 },
        portalPos: { x: 700, y: 300 }
    },
    { 
        level: 17,
        question: "Question for Level 17", 
        answer: 0, 
        options: [0, 1, 2],
        playerStart: { x: 400, y: 500 },
        blockStart: { x: 200, y: 250 },
        blockPositions: [
            { x: 200, y: 250 },
            { x: 200, y: 400 },
            { x: 200, y: 550 }
        ],
        answerZone: { x: 700, y: 450 },
        portalPos: { x: 700, y: 300 }
    },
    { 
        level: 18,
        question: "Question for Level 18", 
        answer: 0, 
        options: [0, 1, 2],
        playerStart: { x: 400, y: 500 },
        blockStart: { x: 200, y: 250 },
        blockPositions: [
            { x: 200, y: 250 },
            { x: 200, y: 400 },
            { x: 200, y: 550 }
        ],
        answerZone: { x: 700, y: 450 },
        portalPos: { x: 700, y: 300 }
    },
    { 
        level: 19,
        question: "Question for Level 19", 
        answer: 0, 
        options: [0, 1, 2],
        playerStart: { x: 400, y: 500 },
        blockStart: { x: 200, y: 250 },
        blockPositions: [
            { x: 200, y: 250 },
            { x: 200, y: 400 },
            { x: 200, y: 550 }
        ],
        answerZone: { x: 700, y: 450 },
        portalPos: { x: 700, y: 300 }
    },
    { 
        level: 20,
        question: "Question for Level 20", 
        answer: 0, 
        options: [0, 1, 2],
        playerStart: { x: 400, y: 500 },
        blockStart: { x: 200, y: 250 },
        blockPositions: [
            { x: 200, y: 250 },
            { x: 200, y: 400 },
            { x: 200, y: 550 }
        ],
        answerZone: { x: 700, y: 450 },
        portalPos: { x: 700, y: 300 }
    },
    { 
        level: 21,
        question: "Question for Level 21", 
        answer: 0, 
        options: [0, 1, 2],
        playerStart: { x: 400, y: 500 },
        blockStart: { x: 200, y: 250 },
        blockPositions: [
            { x: 200, y: 250 },
            { x: 200, y: 400 },
            { x: 200, y: 550 }
        ],
        answerZone: { x: 700, y: 450 },
        portalPos: { x: 700, y: 300 }
    },
    { 
        level: 22,
        question: "Question for Level 22", 
        answer: 0, 
        options: [0, 1, 2],
        playerStart: { x: 400, y: 500 },
        blockStart: { x: 200, y: 250 },
        blockPositions: [
            { x: 200, y: 250 },
            { x: 200, y: 400 },
            { x: 200, y: 550 }
        ],
        answerZone: { x: 700, y: 450 },
        portalPos: { x: 700, y: 300 }
    },
    { 
        level: 23,
        question: "Question for Level 23", 
        answer: 0, 
        options: [0, 1, 2],
        playerStart: { x: 400, y: 500 },
        blockStart: { x: 200, y: 250 },
        blockPositions: [
            { x: 200, y: 250 },
            { x: 200, y: 400 },
            { x: 200, y: 550 }
        ],
        answerZone: { x: 700, y: 450 },
        portalPos: { x: 700, y: 300 }
    },
    { 
        level: 24,
        question: "Question for Level 24", 
        answer: 0, 
        options: [0, 1, 2],
        playerStart: { x: 400, y: 500 },
        blockStart: { x: 200, y: 250 },
        blockPositions: [
            { x: 200, y: 250 },
            { x: 200, y: 400 },
            { x: 200, y: 550 }
        ],
        answerZone: { x: 700, y: 450 },
        portalPos: { x: 700, y: 300 }
    },
    { 
        level: 25,
        question: "Question for Level 25", 
        answer: 0, 
        options: [0, 1, 2],
        playerStart: { x: 400, y: 500 },
        blockStart: { x: 200, y: 250 },
        blockPositions: [
            { x: 200, y: 250 },
            { x: 200, y: 400 },
            { x: 200, y: 550 }
        ],
        answerZone: { x: 700, y: 450 },
        portalPos: { x: 700, y: 300 }
    },
    { 
        level: 26,
        question: "Question for Level 26", 
        answer: 0, 
        options: [0, 1, 2],
        playerStart: { x: 400, y: 500 },
        blockStart: { x: 200, y: 250 },
        blockPositions: [
            { x: 200, y: 250 },
            { x: 200, y: 400 },
            { x: 200, y: 550 }
        ],
        answerZone: { x: 700, y: 450 },
        portalPos: { x: 700, y: 300 }
    }
];

// --- 2. MAIN MENU SCENE ---
class MainMenu extends Phaser.Scene {
    constructor() { super('MainMenu'); }
    

    preload() {
        // Load the Title Screen Music
        this.load.audio('title_music', 'assets/title_bgm.mp3');
        
        // Also load the Game Music here so it's ready instantly when level starts
        this.load.audio('game_music', 'assets/game_bgm.mp3');
        
        // Load other assets (images) if you haven't loaded them globally yet
    }

    create() {
        
        this.add.text(400, 200, 'MATH PUZZLE QUEST', { fontSize: '40px', fill: '#fff', fontFamily: 'Ithaca' }).setOrigin(0.5);
        
        this.sound.stopAll();
        this.bgm = this.sound.add('title_music', { loop: true, volume: 0.5 });
        this.bgm.play();

        let startBtn = this.add.text(400, 300, 'CLICK TO START', { fontSize: '24px', fill: '#0f0', fontFamily: 'Ithaca' })
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true });

        startBtn.on('pointerdown', () => {
            this.bgm.stop(); 
            
            // Check if there's a saved level. If none, default to 1.
            const savedLevelNum = parseInt(localStorage.getItem('lastPlayedLevel')) || 1;
            const levelToLoad = levels.find(l => l.level === savedLevelNum) || levels[0];
            
            console.log("Loading Level: " + savedLevelNum);
            this.scene.start('GameLevel', levelToLoad); 
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
        this.load.spritesheet('floor_items', 'assets/atlas_floor-16x16.png', { 
            frameWidth: 16, 
            frameHeight: 16 
        });
        this.load.spritesheet('portal', 'assets/Dimensional_Portal.png', { 
        frameWidth: 32, 
        frameHeight: 32 
        });

        this.load.image('gate_locked', 'assets/gate_locked.png');
        this.load.image('gate_open', 'assets/gate_open.png');
        this.load.image('dialog_bg', 'assets/dialog_box.png');
        this.load.tilemapTiledJSON('level1', 'assets/level1.json');
        this.load.tilemapTiledJSON('level2', 'assets/level2.json');
        this.load.tilemapTiledJSON('level3', 'assets/level3.json');
        this.load.tilemapTiledJSON('level4', 'assets/level4.json');
        this.load.tilemapTiledJSON('level5', 'assets/level5.json');
        // this.load.tilemapTiledJSON('level6', 'assets/level6.json');
        // this.load.tilemapTiledJSON('level7', 'assets/level7.json');
        // this.load.tilemapTiledJSON('level8', 'assets/level8.json');
        // this.load.tilemapTiledJSON('level9', 'assets/level9.json');
        // this.load.tilemapTiledJSON('level10', 'assets/level10.json');
        // this.load.tilemapTiledJSON('level11', 'assets/level11.json');
        // this.load.tilemapTiledJSON('level12', 'assets/level12.json');
        // this.load.tilemapTiledJSON('level13', 'assets/level13.json');
        // this.load.tilemapTiledJSON('level14', 'assets/level14.json');
        // this.load.tilemapTiledJSON('level15', 'assets/level15.json');
        // this.load.tilemapTiledJSON('level16', 'assets/level16.json');
        // this.load.tilemapTiledJSON('level17', 'assets/level17.json');
        // this.load.tilemapTiledJSON('level18', 'assets/level18.json');
        // this.load.tilemapTiledJSON('level19', 'assets/level19.json');
        // this.load.tilemapTiledJSON('level20', 'assets/level20.json');
        // this.load.tilemapTiledJSON('level21', 'assets/level21.json');
        // this.load.tilemapTiledJSON('level22', 'assets/level22.json');
        // this.load.tilemapTiledJSON('level23', 'assets/level23.json');
        // this.load.tilemapTiledJSON('level24', 'assets/level24.json');
        // this.load.tilemapTiledJSON('level25', 'assets/level25.json');
        // this.load.tilemapTiledJSON('level26', 'assets/level26.json');
        this.load.image('sunny_tiles_png', 'assets/spr_tileset_sunnysideworld_16px.png');
        this.load.spritesheet('hero_sheet', 'assets/player.png', { 
            frameWidth: 48, 
            frameHeight: 48
        });

        this.load.image('block', 'assets/gem.png');
        this.load.image('wall', 'assets/wall.png');

        this.load.spritesheet('professor', 'assets/doctor.png', { frameWidth: 16, frameHeight: 32 });
    }

    create() {
        

        localStorage.setItem('lastPlayedLevel', this.currentLevelData.level);
        this.keyN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);

        // FADE IN from black at level start
        this.cameras.main.fadeFrom(500, 0, 0, 0, false);

        // Load the correct level map based on current level
        const mapKey = `level${this.currentLevelData.level}`;
        const map = this.make.tilemap({ key: mapKey });
        const sunnyTiles = map.addTilesetImage('sunny_world', 'sunny_tiles_png', 16, 16, 1, 2);
        const bridgesLayer = map.createLayer('Bridge', sunnyTiles, 0, 0);
        const groundLayer = map.createLayer('Ground', sunnyTiles, 0, 0);
        const decorLayer = map.createLayer('Decoration', sunnyTiles, 0, 0);
        const wallsLayer = map.createLayer('Walls', sunnyTiles, 0, 0);
        groundLayer.setScale(3);
        decorLayer.setScale(3);
        wallsLayer.setScale(3);
        wallsLayer.setCollisionByExclusion([-1]);

        // --- DEBUG TILE INSPECTOR (Press D to toggle) ---
        this.debugMode = false;
        this.debugText = this.add.text(10, 100, '', {
            fontSize: '14px',
            fontFamily: 'Courier',
            fill: '#00ff00',
            backgroundColor: '#000000',
            padding: { x: 10, y: 10 }
        }).setScrollFactor(0).setDepth(1000).setVisible(false);

        this.input.keyboard.on('keydown-D', () => {
            this.debugMode = !this.debugMode;
            this.debugText.setVisible(this.debugMode);
        });

        // Update debug text on pointer move
        this.input.on('pointermove', (pointer) => {
            if (this.debugMode) {
                const worldX = pointer.worldX;
                const worldY = pointer.worldY;
                const tileX = Math.floor(worldX / (16 * 3));
                const tileY = Math.floor(worldY / (16 * 3));
                
                this.debugText.setText(
                    `World: (${Math.round(worldX)}, ${Math.round(worldY)})\n` +
                    `Tile: (${tileX}, ${tileY})\n\n` +
                    `{ x: ${Math.round(worldX)}, y: ${Math.round(worldY)} }`
                );
            }
        });

        if (bridgesLayer) {
    bridgesLayer.setScale(3);
    // Depth 5 ensures it is above ground but potentially below trees/walls
    bridgesLayer.setDepth(5); 
}

        this.dialogContainer = this.add.container(400, 50);
        this.dialogContainer.setScrollFactor(0); 
        this.dialogContainer.setDepth(200);
        this.dialogContainer.setVisible(false);
        const bubble = this.add.nineslice(0, 0, 'dialog_bg', 0, 700, 150, 10, 10, 10, 10);
        this.dialogContainer.add(bubble);

        this.dialogText = this.add.text(0, 0, '', {
            fontSize: '20px',
            fontFamily: 'Ithaca',
            color: '#4a3d2e',
            wordWrap: { width: 650 },
            align: 'center'
        }).setOrigin(0.5);
        this.dialogContainer.add(this.dialogText);

        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        this.interactPrompt = this.add.text(0, 0, 'Press E to talk', {
            fontSize: '12px',
            fontFamily: 'Ithaca',
            backgroundColor: '#000000',
            padding: { x: 5, y: 5 }
        }).setOrigin(0.5).setDepth(101).setVisible(false);

        this.storyText = this.add.text(400, 450, '', {
            fontSize: '18px',
            fontFamily: 'Ithaca',
            fill: '#ffffff',
            backgroundColor: '#000000',
            padding: { x: 20, y: 20 },
            align: 'center',
            wordWrap: { width: 600 }
        }).setOrigin(0.5).setScrollFactor(0).setDepth(100).setVisible(false);

        


        
       
        // --- ANIMATION SETUP ---
        // 1. Idle (Row 1: Frames 0-5)
        this.anims.create({
            key: 'idle-down',
            frames: this.anims.generateFrameNumbers('hero_sheet', { start: 0, end: 5 }),
            frameRate: 8,
            repeat: -1
        });

        // 2. Run Down (Row 4: Frames 18-23)
        this.anims.create({
            key: 'run-down',
            frames: this.anims.generateFrameNumbers('hero_sheet', { start: 18, end: 23 }),
            frameRate: 10,
            repeat: -1
        });
        // 3. Run Side
        this.anims.create({
            key: 'run-side',
            frames: this.anims.generateFrameNumbers('hero_sheet', { start: 24, end: 29 }),
            frameRate: 10,
            repeat: -1
        });

        // 4. Run Up
        this.anims.create({
            key: 'run-up',
            frames: this.anims.generateFrameNumbers('hero_sheet', { start: 30, end: 35 }),
            frameRate: 10,
            repeat: -1
        });

        // --- LEVEL UI ---
        const questionContainer = this.add.container(10, 10);
        questionContainer.setScrollFactor(0);
        questionContainer.setDepth(100);
        
        const questionBubble = this.add.nineslice(260, 20, 'dialog_bg', 0, 500, 60, 10, 10, 10, 10);
        questionContainer.add(questionBubble);
        
        const questionText = this.add.text(260, 20, `Level ${this.currentLevelData.level}: ${this.currentLevelData.question}`, { 
            fontSize: '18px',
            fontFamily: 'Ithaca',
            fill: '#4a3d2e',
            wordWrap: { width: 480 },
            align: 'center'
        }).setOrigin(0.5);
        questionContainer.add(questionText);

        // --- PRESSURE PLATE (Answer Zone) ---
        const answerPos = this.currentLevelData.answerZone;
        this.pressurePlate = this.physics.add.sprite(answerPos.x, answerPos.y, 'floor_items');
        this.pressurePlate.setScale(3); 
        this.pressurePlate.setFrame(30); 
        this.pressurePlate.setImmovable(true);
        this.pressurePlate.body.setAllowGravity(false);
        this.pressurePlate.body.setSize(10, 10);
        this.pressurePlate.body.setOffset(3, 3);

        // 5. Assign it as the targetZone so the rest of your code finds it
        this.targetZone = this.pressurePlate;

        // --- PLAYER SETUP ---
        this.player = this.physics.add.sprite(this.currentLevelData.playerStart.x, this.currentLevelData.playerStart.y, 'hero_sheet');
        this.player.play('idle-down'); // Start breathing
        this.player.setScale(3); // Make him big (Retro style)
        this.player.setCollideWorldBounds(true);
        this.player.body.setSize(8, 5);
        this.player.body.setOffset(17, 25);
        this.cursors = this.input.keyboard.createCursorKeys();

        // NPC

        if (this.currentLevelData.level === 1) {
        
        // Spawn him 50 pixels to the right of the player
        this.npc = this.physics.add.sprite(this.player.x + 100, this.player.y, 'professor');
        this.npc.setScale(3);           // Match the game scale
        this.npc.setFrame(3);           // Frame 3 is usually "Front Facing" in 4-frame strips
        this.npc.setImmovable(true);    // He won't get pushed around
        this.npc.setDepth(10);
        this.npc.body.setAllowGravity(false); // Stays in place
        this.npc.body.setSize(10, 10);
        this.npc.body.setOffset(0, 20);
        
        // Add collision so the physics body is active
        this.physics.add.collider(this.player, this.npc);

        
    }
    if (this.currentLevelData.gatePos) {
    const pos = this.currentLevelData.gatePos;
    
    // Create the gate as a static body
    this.gate = this.physics.add.staticImage(pos.x, pos.y, 'gate_locked');
    this.gate.setScale(3);
    this.gate.setDepth(10);
    
    // Safety check: only add collider if gate was successfully created
    this.physics.add.collider(this.player, this.gate);
}

// --- STEP 3: WRAP THE CLIFF LOGIC ---
// To stop the error for good, wrap your cliff overlap in this check:
if (this.cliffEdges && this.cliffEdges.getLength() > 0) {
    this.physics.add.overlap(this.blocks, this.cliffEdges, (block, edge) => {
        if (edge.landX !== undefined) {
            this.handleBlockDrop(block, edge.landX, edge.landY);
        }
    }, null, this);
}


        // --- BLOCKS SETUP ---
        this.blocks = this.physics.add.group();

        let xPos = this.currentLevelData.blockStart.x;
        let yPos = this.currentLevelData.blockStart.y;
        this.currentLevelData.options.forEach((number, index) => {
            // Use blockPositions if available, otherwise fall back to old stacking behavior
            let blockPos;
            if (this.currentLevelData.blockPositions && this.currentLevelData.blockPositions[index]) {
                blockPos = this.currentLevelData.blockPositions[index];
            } else {
                blockPos = { x: xPos, y: yPos + (index * 150) };
            }
            
            let block = this.blocks.create(blockPos.x, blockPos.y, 'block');
            block.setScale(3); // Make blocks big too!
            block.setDrag(1000); 
            block.setBounce(0);
            block.setCollideWorldBounds(true);
            block.value = number; 
            
            let text = this.add.text(0, 0, number, { fontSize: '24px', color: '#000', fontFamily: 'Ithaca', fontStyle: 'bold' }).setOrigin(0.5);
            
            block.myText = text;  // Store the text inside the block!
            
            block.updateText = function() {
                text.x = this.x;
                text.y = this.y;
            };

            yPos += 150; 
        });

        

        // --- COLLISIONS ---
        this.physics.add.collider(this.player, this.blocks);
        this.physics.add.collider(this.blocks, this.blocks);
        this.physics.add.collider(this.player, wallsLayer);
        this.physics.add.collider(this.blocks, wallsLayer);

        // --- MUSIC ---
        if (!this.sound.get('game_music')) {
            let music = this.sound.add('game_music', { loop: true, volume: 0.4 });
            music.play();
        } else if (!this.sound.get('game_music').isPlaying) {
            this.sound.get('game_music').play();
        }

        // --- UI BUTTONS ---
        let restartBtn = this.add.text(750, 50, '↺', { 
            fontSize: '40px',
            fontFamily: 'Ithaca',
            fill: '#ffffff',
            backgroundColor: '#000000' 
        })
        .setPadding(10)
        .setOrigin(0.5)
        .setScrollFactor(0)
        .setInteractive({ useHandCursor: true });

        restartBtn.on('pointerdown', () => {
            this.scene.restart();
        });

        let pauseBtn = this.add.text(680, 50, 'II', { 
            fontSize: '30px',
            fontFamily: 'Ithaca',
            fill: '#ffffff',
            backgroundColor: '#000000' 
        })
        .setPadding(10)
        .setOrigin(0.5)
        .setScrollFactor(0) 
        .setInteractive({ useHandCursor: true });

        pauseBtn.on('pointerdown', () => {
            if (this.physics.world.isPaused) {
                this.physics.resume();
                pauseBtn.setText('II');
            } else {
                this.physics.pause();
                pauseBtn.setText('▶');
            }
        });

        // --- KEYBOARD SHORTCUTS ---
        this.input.keyboard.on('keydown-R', () => {
            this.scene.restart();
        });

        this.input.keyboard.on('keydown-ESC', () => {
            this.scene.start('MainMenu');
        });

        // --- CAMERA & WORLD BOUNDS ---
    // 1. Calculate the real size of the map (since we scaled by 3)
    const mapWidth = map.widthInPixels * 3;
    const mapHeight = map.heightInPixels * 3;

    // 2. Expand the Physics World
    // Without this, the player hits an invisible wall at 800px!
    this.physics.world.setBounds(0, 0, mapWidth, mapHeight);

    // 3. Make Camera Follow Player
    this.cameras.main.startFollow(this.player);

    // 4. Set Camera Limits
    // This stops the camera from scrolling into the black void outside the map
    this.cameras.main.setBounds(0, 0, mapWidth, mapHeight);
    
    
    // --- PORTAL SETUP ---
        // 1. Create the Animation
        this.anims.create({
            key: 'portal-spin',
            frames: this.anims.generateFrameNumbers('portal', { start: 0, end: 5 }), // Uses all 6 frames
            frameRate: 10,
            repeat: -1 // Loop forever
        });

        // 2. Create the Sprite (Hidden at first)
        // Place portal at the configured position for this level
        const portalPos = this.currentLevelData.portalPos;
        this.portal = this.physics.add.sprite(portalPos.x, portalPos.y, 'portal');
        this.portal.setScale(3);           // Make it big
        this.portal.setVisible(false);     // Hide it!
        this.portal.body.enable = false;   // Disable physics! (So you can't walk into it yet)

        // 3. Add Collision (Player -> Portal)
        // This triggers the level finish ONLY when the portal is active
        this.physics.add.overlap(this.player, this.portal, () => {
             // We only win if the portal is actually visible/enabled
             if (this.portal.visible) {
                 this.handleWin();
             }
        });

        // --- CLIFF DROP LOGIC (FIXED) ---
// 1. INITIALIZE THE GROUP (Crucial: prevents the 'undefined' error)
this.cliffEdges = this.physics.add.staticGroup();

const cliffObjs = map.getObjectLayer('CliffEdges')?.objects || [];

cliffObjs.forEach(obj => {
    // 2. POSITION THE TRIGGER: Multiplied by 3 to match game scale
    let edge = this.cliffEdges.create(obj.x * 3, obj.y * 3, null).setOrigin(0, 0);
    edge.setSize(obj.width * 3, obj.height * 3);
    edge.setVisible(false);

    // 3. LANDING COORDINATES: Use raw Tiled numbers (e.g., 260, 75)
    // Multiply by 3 here because your game screen is 3x bigger than the Tiled map
    const tx = obj.properties.find(p => p.name === 'landX')?.value || 0;
    const ty = obj.properties.find(p => p.name === 'landY')?.value || 0;
    
    edge.landX = tx * 3; 
    edge.landY = ty * 3;
});

// 4. OVERLAP TRIGGER
this.physics.add.overlap(this.blocks, this.cliffEdges, (block, edge) => {
    // Only drop if it's not already falling
    if (edge.landX !== undefined) {
        this.handleBlockDrop(block, edge.landX, edge.landY);
    }
}, null, this);
        
    }

    update() {

        
        
        if (this.isGameFinished) return;

        // --- SKIP LEVEL CHEAT ---
    if (Phaser.Input.Keyboard.JustDown(this.keyN)) {
        console.log("Debug: Skipping Level " + this.currentLevelData.level);
        this.handleWin(); 
    }

        this.player.setVelocity(0);

        // --- MOVEMENT & ANIMATION LOGIC ---
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-200);
            this.player.anims.play('run-side', true);
            this.player.setFlipX(true); // Flip to look Left

        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(200);
            this.player.anims.play('run-side', true);
            this.player.setFlipX(false); // Normal Right

        } else if (this.cursors.up.isDown) {
            this.player.setVelocityY(-200);
            this.player.anims.play('run-up', true);

        } else if (this.cursors.down.isDown) {
            this.player.setVelocityY(200);
            this.player.anims.play('run-down', true);

        } else {
            // Not moving? Play Idle
            this.player.anims.play('idle-down', true);
        }

      // --- BLOCK LOGIC ---
        this.blocks.getChildren().forEach((block) => {
            if (!block.active) return;
            if (block.updateText) block.updateText();

            // CHECK OVERLAP WITH PRESSURE PLATE
            if (Phaser.Geom.Intersects.RectangleToRectangle(block.body, this.pressurePlate.body)) {
                
                if (block.value === this.correctAnswer) {
                    
                    // A. VISUAL: Press the button down (Frame 30)
                    this.pressurePlate.setFrame(31); 

                    // B. SNAP: Move block to center for a satisfying "Click" feel
                    block.x = this.pressurePlate.x;
                    block.y = this.pressurePlate.y;

                    // C. GAMEPLAY: Open Portal & Remove Block
                    this.activatePortal(); 
                    
                    // Destroy text then block
                    if (block.myText) block.myText.destroy();
                    block.destroy(); 

                } else {
                    this.handleGameOver();
                }
            }
        });

   // NPC INTERACTION LOGIC
    if (this.npc && this.currentLevelData.level === 1) {
        
        // 1. CALCULATE DISTANCE (Better than Overlap)
        // This measures straight line distance between Player and Professor
        const dist = Phaser.Math.Distance.Between(
            this.player.x, this.player.y, 
            this.npc.x, this.npc.y
        );

        // 2. CHECK RANGE (150 pixels is "Long Reach")
        if (dist < 80) {
            
            // Show the prompt
            this.interactPrompt.setPosition(this.npc.x, this.npc.y - 50);
            this.interactPrompt.setVisible(true);

            // CHECK INPUT
            if (Phaser.Input.Keyboard.JustDown(this.keyE)) {
                
               // --- FACE THE PLAYER ---
                const dx = this.player.x - this.npc.x;
                const dy = this.player.y - this.npc.y;

                this.npc.setFlipX(false);

                if (Math.abs(dx) > Math.abs(dy)) {
                    if (dx > 0) {
                        this.npc.setFrame(0); // Player is RIGHT
                    } else {
                        this.npc.setFrame(2); // Player is LEFT
                    }
                } else {
                    if (dy > 0) {
                        this.npc.setFrame(3); // Player is BELOW
                    } else {
                        this.npc.setFrame(1); // Player is ABOVE
                    }
                }

                // --- CALL ANIMATION FUNCTIONS ---
                // Toggle: If off-screen, show it. If on-screen, hide it.
                if (this.dialogContainer.y < 0) {
                    this.showDialogue(
                        "PROF. PRIME:\n" +
                        "----------------\n" +
                        "Hurry! You should run into\n" +
                        "Use Arrow Keys to move.\n" +
                        "Push the correct Answer Block into the Yellow Zone!"
                    );
                } else {
                    this.hideDialogue();
                }
            }
       } else {
            // Player is too far away
            this.interactPrompt.setVisible(false);
            
            // AUTO-CLOSE if player leaves
            this.hideDialogue();
        }
    }

    
    }

  handleBlockDrop(block, destX, destY) {
    if (block.isFalling) return;
    block.isFalling = true;

    // 1. Stop physics immediately
    block.body.setVelocity(0, 0);
    block.body.enable = false;

    // 2. TWEEN ONLY THE BLOCK FOR SCALING
    // We separate the block and text so the text doesn't get 'huge'
    this.tweens.add({
        targets: block,
        x: destX,
        y: destY,
        scaleX: { from: 4, to: 3 }, // Block still 'jumps'
        scaleY: { from: 4, to: 3 },
        duration: 600,
        ease: 'Cubic.easeOut',
        onComplete: () => {
            block.body.enable = true;
            block.isFalling = false;
        }
    });

    // 3. TWEEN THE TEXT FOR MOVEMENT ONLY
    // This keeps the number the same size throughout the whole drop
    this.tweens.add({
        targets: block.myText,
        x: destX,
        y: destY,
        duration: 600,
        ease: 'Cubic.easeOut'
    });
}

    activatePortal() {
    if (this.portal.visible) return;

    this.portal.setVisible(true);
    this.portal.body.enable = true;
    this.portal.play('portal-spin');

    // --- NEW GATE OPEN LOGIC ---
    if (this.gate) {
        // Change the texture to the open version
        this.gate.setTexture('gate_open');
        
        // Disable the physics body so the player can walk through it
        this.gate.body.enable = false;
    }

    this.add.text(400, 300, "GATE OPENED!", { 
        fontSize: '32px',
        fontFamily: 'Ithaca',
        color: '#00ff00', 
        stroke: '#000', 
        strokeThickness: 4 
    })
    .setOrigin(0.5)
    .destroy({ fromScene: true, delay: 2000 });
}

    handleWin() {
        this.isGameFinished = true;
        this.physics.pause();
        this.player.anims.stop(); // Stop animation
        
        // 1. Create Level Complete Text
        const completeText = this.add.text(400, 250, `LEVEL ${this.currentLevelData.level}\nCOMPLETE!`, { 
            fontSize: '64px', 
            fill: '#ffff00', 
            backgroundColor: '#000',
            fontFamily: 'Ithaca',
            align: 'center'
        }).setOrigin(0.5).setScrollFactor(0).setDepth(300);
        
        // 2. Scale animation - grow the text
        this.tweens.add({
            targets: completeText,
            scale: 1.2,
            duration: 500,
            yoyo: true,
            hold: 1000
        });

        // 3. Wait then fade out
        this.time.delayedCall(3000, () => {
            // Fade to black
            this.cameras.main.fade(500, 0, 0, 0);
            
            // Load next level after fade
            this.time.delayedCall(600, () => {
                let nextLevelIndex = this.currentLevelData.level; 
                if (nextLevelIndex < levels.length) {
                    this.scene.start('GameLevel', levels[nextLevelIndex]);
                } else {
                    this.scene.start('MainMenu'); 
                }
            });
        });
    }

    handleGameOver() {
        this.isGameFinished = true;
        this.physics.pause();
        this.player.anims.stop();
        this.add.text(400, 300, 'GAME OVER', { fontSize: '64px', fill: '#f00', backgroundColor: '#000', fontFamily: 'Ithaca' }).setOrigin(0.5);

        this.time.delayedCall(2000, () => {
            this.scene.start('MainMenu');
        });
    }

    // HELPER: ANIMATE IN (Slide & Typewriter)
    showDialogue(fullText) {
        // 1. If already visible, do nothing
        if (this.dialogContainer.y > 0) return;

        this.dialogContainer.setVisible(true);
        
        // 2. SLIDE DOWN ANIMATION
        this.tweens.add({
            targets: this.dialogContainer,
            y: 50,              // Target Y position (Screen Top)
            duration: 500,      // Speed (ms)
            ease: 'Power2.out'  // Smooth stopping effect
        });

        // 3. TYPEWRITER EFFECT
        this.dialogText.setText(''); // Clear old text
        let i = 0;
        
        // Stop any old typing timers if they exist
        if (this.typingTimer) this.typingTimer.remove();

        this.typingTimer = this.time.addEvent({
            delay: 30, // Speed (lower = faster)
            callback: () => {
                this.dialogText.text += fullText[i];
                i++;
            },
            repeat: fullText.length - 1
        });
    }

    // HELPER: ANIMATE OUT
    hideDialogue() {
        // Only hide if it's currently on screen
        if (this.dialogContainer.y < 0) return;

        // Stop typing immediately
        if (this.typingTimer) this.typingTimer.remove();

        // SLIDE UP ANIMATION
        this.tweens.add({
            targets: this.dialogContainer,
            y: -200,            // Go back off-screen
            duration: 300,
            ease: 'Power2.in',
            onComplete: () => {
                this.dialogContainer.setVisible(false);
                this.dialogText.setText(''); // Clean up
            }
        });
    }
}

// --- 4. CONFIG ---
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#222222',
    pixelArt: true,   // Tells Phaser to stop blurring/smoothing the art
    roundPixels: true, // Forces Phaser to snap to whole numbers (prevents half-pixel gaps)
    physics: {
        default: 'arcade',
        arcade: { debug: true }
    },
    scene: [MainMenu, GameLevel] 
};

const game = new Phaser.Game(config);