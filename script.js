const fontStyle = document.createElement('style');
fontStyle.innerHTML = `
    @font-face {
        font-family: 'Ithaca';
        src: url('assets/Ithaca-LVB75.ttf');
    }
    body {
        cursor: url('assets/cursor.png'), auto;
    }
`;
document.head.appendChild(fontStyle);

// --- 1. CORRECTION ROOM QUESTIONS ---
const correctionLevels = [
    { question: "Solve: 5x + 10 = 35", answer: 5, options: [5, 25, 10] },
    { question: "Simplify: x^2 * x^3", answer: "x^5", options: ["x^5", "x^6", "2x^5"] },
    { question: "Derivative of y = 5", answer: 0, options: [0, 5, 1] },
    { question: "Evaluate: 12 * 12", answer: 144, options: [144, 124, 24] },
    { question: "Solve: 3(x - 2) = 9", answer: 5, options: [5, 3, 9] }
];

// --- 2. MAIN GAME LEVELS ---
const levels = [
    // --- AREA 1 (Blue Gem) ---
    { 
        level: 1,
        question: "Evaluate limit: lim(x->2) of (x + 3)", 
        answer: 5, 
        options: [5, 6, 1], 
        playerStart: { x: 400, y: 500 },
        blockStart: { x: 200, y: 250 },
        blockPositions: [{ x: 200, y: 250 }, { x: 400, y: 250 }, { x: 600, y: 250 }],
        answerZone: { x: 700, y: 450 },
        portalPos: { x: 700, y: 300 }
    },
    { 
        level: 2,
        question: "Find derivative: y = x^4", 
        answer: "4x^3", 
        options: ["4x^3", "x^3", "4x"],
        playerStart: { x: 100, y: 100 },
        blockStart: { x: 300, y: 200 },
        blockPositions: [{ x: 300, y: 200 }, { x: 300, y: 350 }, { x: 300, y: 500 }],
        answerZone: { x: 600, y: 300 },
        portalPos: { x: 500, y: 200 }
    },
    { 
        level: 3,
        question: "Find derivative: y = 7x", 
        answer: 7, 
        options: [7, "7x", 0],
        playerStart: { x: 400, y: 300 },
        blockStart: { x: 250, y: 100 },
        blockPositions: [{ x: 250, y: 100 }, { x: 250, y: 250 }, { x: 250, y: 400 }],
        answerZone: { x: 700, y: 400 },
        portalPos: { x: 700, y: 400 }
    },
    { 
        level: 4,
        question: "Find derivative: y = x^3 + 2x^2 + 5", 
        answer: "3x^2+4x", 
        options: ["3x^2+4x", "3x^2", "2x"],
        playerStart: { x: 400, y: 500 },
        blockStart: { x: 200, y: 250 },
        blockPositions: [{ x: 200, y: 250 }, { x: 900, y: 100 }, { x: 200, y: 550 }],
        answerZone: { x: 700, y: 450 },
        portalPos: { x: 700, y: 300 }
    },
    { 
        level: 5,
        question: "Find derivative: y = 3x^4", 
        answer: "12x^3", 
        options: ["12x^3", "3x^4", "12x"],
        playerStart: { x: 620, y: 1620 },
        blockStart: { x: 200, y: 250 },
        blockPositions: [{ x: 670, y: 1030 }, { x: 115, y: 790 }, { x: 1150, y: 890 }],
        answerZone: { x: 940, y: 660 },
        portalPos: { x: 621, y: 286 },
        gatePos: { x: 578, y: 480 } 
    },
    // --- AREA 2: THE RIVER (Green Gem) ---
    { 
        level: 6,
        question: "True or False: Derivative of e^x is e^x", 
        answer: "TRUE", 
        options: ["TRUE", "FALSE"], 
        playerStart: { x: 400, y: 500 },
        blockStart: { x: 200, y: 250 },
        blockPositions: [{ x: 300, y: 250 }, { x: 500, y: 250 }], 
        answerZone: { x: 880, y: 358 },
        portalPos: { x: 700, y: 300 }
    },
    // --- AREA 3: THE CAVE (Yellow Gem) ---
    { 
        level: 12,
        question: "Find derivative: y = 7x", 
        answer: 7, 
        options: [7, "7x", 0],
        playerStart: { x: 400, y: 300 },
        blockStart: { x: 250, y: 100 },
        blockPositions: [{ x: 250, y: 100 }, { x: 250, y: 250 }, { x: 250, y: 400 }],
        answerZone: { x: 700, y: 400 },
        portalPos: { x: 700, y: 400 }
    },
    // --- AREA 4: THE LABORATORY (Orb) ---
    { 
        level: 20,
        question: "Bacteria N(t)=500e^(0.04t). Rate at t=10? (Assemble: 29.8)", 
        answer: "29.8", 
        multiAnswer: true,
        slots: [
            { x: 550, y: 400, requiredValue: "2" },
            { x: 600, y: 400, requiredValue: "9" },
            { x: 650, y: 400, requiredValue: ".8" }
        ],
        options: ["2", "9", ".8", "5", "0", "1"], 
        playerStart: { x: 400, y: 500 },
        blockStart: { x: 100, y: 100 },
        blockPositions: [
            { x: 200, y: 200 }, { x: 300, y: 200 }, { x: 400, y: 200 },
            { x: 200, y: 350 }, { x: 300, y: 350 }, { x: 400, y: 350 }
        ],
        answerZone: { x: 0, y: 0 }, 
        portalPos: { x: 600, y: 200 }
    }
];

class MainMenu extends Phaser.Scene {
    constructor() { super('MainMenu'); }

    preload() {
        // --- AUDIO ASSETS ---
        this.load.audio('title_music', 'assets/title_bgm.mp3');
        this.load.audio('click_sfx', 'assets/click.wav');
        this.load.image('cursor', 'assets/cursor.png');
        this.load.image('click', 'assets/click.png');
    }

    create() {
        this.input.setDefaultCursor('url(assets/cursor.png), pointer');
        this.input.on('pointerdown', () => { this.input.setDefaultCursor('url(assets/click.png), pointer'); });
        this.input.on('pointerup', () => { this.input.setDefaultCursor('url(assets/cursor.png), pointer'); });

        this.add.text(400, 200, 'MATH PUZZLE QUEST', { fontSize: '40px', fill: '#fff', fontFamily: 'Ithaca' }).setOrigin(0.5);
        
        let demoText = this.add.text(780, 580, 'DEMO VERSION', { fontSize: '16px', fill: '#ff0000', fontFamily: 'monospace' }).setOrigin(1, 1);
        this.tweens.add({ targets: demoText, alpha: 0, duration: 800, yoyo: true, repeat: -1 });

        // Play Title Music
        this.sound.stopAll();
        if (!this.sound.get('title_music')) {
            this.sound.add('title_music', { loop: true, volume: 0.5 }).play();
        } else {
            this.sound.get('title_music').play();
        }

        let newGameBtn = this.add.text(400, 300, 'NEW GAME', { fontSize: '24px', fill: '#0f0', fontFamily: 'Ithaca' })
            .setOrigin(0.5).setInteractive();

        newGameBtn.on('pointerdown', () => {
            this.sound.play('click_sfx');
            this.sound.stopByKey('title_music');
            localStorage.setItem('lastPlayedLevel', 1); 
            this.scene.start('GameLevel', { ...levels[0], isCorrectionRoom: false }); 
        });

        let continueBtn = this.add.text(400, 360, 'CONTINUE', { fontSize: '24px', fill: '#0ff', fontFamily: 'Ithaca' })
            .setOrigin(0.5).setInteractive();

        continueBtn.on('pointerdown', () => {
            this.sound.play('click_sfx');
            this.sound.stopByKey('title_music');
            const savedLevelNum = parseInt(localStorage.getItem('lastPlayedLevel')) || 1;
            const levelToLoad = levels.find(l => l.level === savedLevelNum) || levels[0];
            this.scene.start('GameLevel', { ...levelToLoad, isCorrectionRoom: false }); 
        });
        
        this.input.on('pointerdown', () => {
            if (this.sound.context.state === 'suspended') { this.sound.context.resume(); }
        });
    }
}

class GameLevel extends Phaser.Scene {
    constructor() { super('GameLevel'); }

    init(data) {
        this.currentLevelData = data;
        this.correctAnswer = data.answer;
        this.isGameFinished = false;
        this.isLevelComplete = false;
        this.isCorrectionRoom = data.isCorrectionRoom || false;
        this.returnToLevelNum = data.returnToLevelNum !== undefined ? data.returnToLevelNum : 1;
        this.isMultiSlot = data.multiAnswer || false;
        this.footstepTimer = 0;
    }

    preload() {
        // --- VISUAL ASSETS ---
        this.load.spritesheet('floor_items', 'assets/atlas_floor-16x16.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('portal', 'assets/Dimensional_Portal.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('gate_locked', 'assets/gate_locked.png');
        this.load.image('gate_open', 'assets/gate_open.png');
        this.load.image('dialog_bg', 'assets/dialog_box.png');
        this.load.spritesheet('hero_sheet', 'assets/player.png', { frameWidth: 48, frameHeight: 48 });
        this.load.image('wall', 'assets/wall.png');
        this.load.spritesheet('professor', 'assets/doctor.png', { frameWidth: 16, frameHeight: 32 });
        this.load.spritesheet('sunny_tiles_png', 'assets/spr_tileset_sunnysideworld_16px.png', { frameWidth: 16, frameHeight: 16, margin: 1, spacing: 2 });

        // Gems & Lab
        this.load.spritesheet('gem_blue', 'assets/spr_coin_azu.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('gem_green', 'assets/spr_coin_strip4.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('gem_yellow', 'assets/spr_coin_ama.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('orb', 'assets/orb_spritesheet.png', { frameWidth: 16, frameHeight: 16 }); 
        this.load.spritesheet('lab_portal', 'assets/portal_spritesheet.png', { frameWidth: 16, frameHeight: 16 }); 

        // Maps
        this.load.image('dungeon_tiles', 'assets/0x72_DungeonTilesetII_v1.7.png');
        this.load.image('dungeon_walls', 'assets/atlas_walls_low-16x16.png');
        this.load.image('laboratory_tiles', 'assets/tilesFloor.png');
        this.load.image('laboratory_walls', 'assets/tilesWalls.png');

        // --- AUDIO ASSETS ---
        this.load.audio('game_bgm', 'assets/game_bgm.mp3');
        this.load.audio('river_bgm', 'assets/river.mp3');
        this.load.audio('cave_bgm', 'assets/cave.mp3');
        this.load.audio('lab_bgm', 'assets/laboratory.mp3'); // NEW: Lab BGM
        this.load.audio('correction_bgm', 'assets/correction.mp3');
        this.load.audio('footstep_sfx', 'assets/footstep.mp3');
        this.load.audio('talking_sfx', 'assets/talking.mp3');
        this.load.audio('click_sfx', 'assets/click.wav');
        this.load.audio('snap_sfx', 'assets/Retro10.wav'); 
        this.load.audio('victory_sfx', 'assets/victory.mp3');
        this.load.audio('gameover_sfx', 'assets/game-over.mp3');

        for (let i = 1; i <= 26; i++) {
             this.load.tilemapTiledJSON(`level${i}`, `assets/level${i}.json`);
        }
        this.load.tilemapTiledJSON('correction_room', 'assets/correction_room.json');
    }

    create() {
        this.input.setDefaultCursor('url(assets/cursor.png), pointer');
        this.input.on('pointerdown', () => { this.input.setDefaultCursor('url(assets/click.png), pointer'); });
        this.input.on('pointerup', () => { this.input.setDefaultCursor('url(assets/cursor.png), pointer'); });

        if (!this.isCorrectionRoom) {
            localStorage.setItem('lastPlayedLevel', this.currentLevelData.level);
        }

        this.cameras.main.fadeFrom(500, 0, 0, 0, false);

        // --- MUSIC MANAGER ---
        let currentLvl = this.currentLevelData.level;
        let targetMusicKey = 'game_bgm'; 

        if (this.isCorrectionRoom) {
            targetMusicKey = 'correction_bgm';
        } else if (currentLvl >= 19) {
            targetMusicKey = 'lab_bgm'; // NEW: Lab Music
        } else if (currentLvl >= 12) {
            targetMusicKey = 'cave_bgm';
        } else if (currentLvl >= 6) {
            targetMusicKey = 'river_bgm';
        }

        let currentSound = this.sound.getAll('audio').find(s => s.isPlaying && s.key.includes('bgm'));
        if (!currentSound || currentSound.key !== targetMusicKey) {
            this.sound.stopAll();
            this.sound.add(targetMusicKey, { loop: true, volume: 0.4 }).play();
        }

        let demoText = this.add.text(780, 580, 'DEMO VERSION', { fontSize: '16px', fill: '#ff0000', fontFamily: 'monospace' })
            .setOrigin(1, 1).setScrollFactor(0).setDepth(1000);
        this.tweens.add({ targets: demoText, alpha: 0, duration: 800, yoyo: true, repeat: -1 });

        let mapKey;
        if (this.isCorrectionRoom) {
            mapKey = 'correction_room';
        } else {
            mapKey = `level${this.currentLevelData.level}`;
            if (!this.cache.tilemap.exists(mapKey)) mapKey = 'level1';
        }

        const map = this.make.tilemap({ key: mapKey });
        const sunnyTiles = map.addTilesetImage('sunny_world', 'sunny_tiles_png', 16, 16, 0, 0);
        const dungeonTiles = map.addTilesetImage('dungeon_tiles', 'dungeon_tiles');
        const dungeonWalls = map.addTilesetImage('dungeon_walls', 'dungeon_walls');
        const labFloor = map.addTilesetImage('tilesFloor', 'laboratory_tiles') || map.addTilesetImage('laboratory_tiles', 'laboratory_tiles');
        const labWalls = map.addTilesetImage('tilesWalls', 'laboratory_walls') || map.addTilesetImage('laboratory_walls', 'laboratory_walls');
        const allTiles = [sunnyTiles, dungeonTiles, dungeonWalls, labFloor, labWalls].filter(t => t !== null);

        const bridgesLayer = map.createLayer('Bridge', allTiles, 0, 0) || map.createLayer('around', allTiles, 0, 0);
        const groundLayer = map.createLayer('Ground', allTiles, 0, 0);
        const decorLayer = map.createLayer('Decoration', allTiles, 0, 0);
        const wallsLayer = map.createLayer('Walls', allTiles, 0, 0);

        if (bridgesLayer) { bridgesLayer.setScale(3); bridgesLayer.setDepth(5); }
        if (groundLayer) groundLayer.setScale(3);
        if (decorLayer) decorLayer.setScale(3);
        if (wallsLayer) { wallsLayer.setScale(3); wallsLayer.setCollisionByExclusion([-1]); }

        if (!this.anims.exists('idle-down')) {
            this.anims.create({ key: 'idle-down', frames: this.anims.generateFrameNumbers('hero_sheet', { start: 0, end: 5 }), frameRate: 8, repeat: -1 });
            this.anims.create({ key: 'run-down', frames: this.anims.generateFrameNumbers('hero_sheet', { start: 18, end: 23 }), frameRate: 10, repeat: -1 });
            this.anims.create({ key: 'run-side', frames: this.anims.generateFrameNumbers('hero_sheet', { start: 24, end: 29 }), frameRate: 10, repeat: -1 });
            this.anims.create({ key: 'run-up', frames: this.anims.generateFrameNumbers('hero_sheet', { start: 30, end: 35 }), frameRate: 10, repeat: -1 });
        }
        
        if (!this.anims.exists('orb-spin')) { this.anims.create({ key: 'orb-spin', frames: this.anims.generateFrameNumbers('orb', { start: 0, end: 7 }), frameRate: 10, repeat: -1 }); }
        if (!this.anims.exists('lab-portal-idle')) { this.anims.create({ key: 'lab-portal-idle', frames: this.anims.generateFrameNumbers('lab_portal', { start: 0, end: 5 }), frameRate: 10, repeat: -1 }); }
        if (!this.anims.exists('gem-blue-spin')) { this.anims.create({ key: 'gem-blue-spin', frames: this.anims.generateFrameNumbers('gem_blue', { start: 0, end: 3 }), frameRate: 8, repeat: -1 }); }
        if (!this.anims.exists('gem-green-spin')) { this.anims.create({ key: 'gem-green-spin', frames: this.anims.generateFrameNumbers('gem_green', { start: 0, end: 3 }), frameRate: 8, repeat: -1 }); }
        if (!this.anims.exists('gem-yellow-spin')) { this.anims.create({ key: 'gem-yellow-spin', frames: this.anims.generateFrameNumbers('gem_yellow', { start: 0, end: 3 }), frameRate: 8, repeat: -1 }); }

        let startX = this.isCorrectionRoom ? 400 : this.currentLevelData.playerStart.x;
        let startY = this.isCorrectionRoom ? 300 : this.currentLevelData.playerStart.y;

        this.player = this.physics.add.sprite(startX, startY, 'hero_sheet');
        this.player.play('idle-down'); 
        this.player.setScale(3);
        this.player.setCollideWorldBounds(true);
        this.player.body.setSize(10, 5);
        this.player.body.setOffset(20, 35);
        this.player.setDepth(50);
        this.cursors = this.input.keyboard.createCursorKeys();

        if (!this.isCorrectionRoom && this.currentLevelData.level === 1) {
            this.npc = this.physics.add.sprite(this.player.x + 100, this.player.y, 'professor');
            this.npc.setScale(3).setFrame(3).setImmovable(true).setDepth(20);
            this.npc.body.setSize(13, 25);
            this.npc.body.setOffset(2,8);
            this.npc.body.setAllowGravity(false);
            this.physics.add.collider(this.player, this.npc);
            
            this.npcMarker = this.add.text(this.npc.x, this.npc.y - 50, '!', {
                fontSize: '32px', fontFamily: 'Ithaca', fill: '#ffff00', stroke: '#000', strokeThickness: 4
            }).setOrigin(0.5).setDepth(20);
            this.tweens.add({ targets: this.npcMarker, y: this.npc.y - 60, duration: 500, yoyo: true, repeat: -1 });
        }

        this.stoneGates = this.physics.add.group({ immovable: true, allowGravity: false }); 
        if (!this.isCorrectionRoom) {
            if (this.currentLevelData.level === 5) {
                let g1 = this.stoneGates.create(600 * 3, 512 * 3, 'gate_locked');
                g1.setScale(3).setOrigin(0,0).setDepth(15).setVisible(true);
                let g2 = this.stoneGates.create(645 * 3, 513 * 3, 'gate_locked');
                g2.setScale(3).setOrigin(0,0).setDepth(15).setVisible(true);
            } else if (this.currentLevelData.gatePos) {
                let g = this.stoneGates.create(this.currentLevelData.gatePos.x, this.currentLevelData.gatePos.y, 'gate_locked');
                g.setScale(3).setOrigin(0, 0).setDepth(15).setVisible(true);
            }
        }
        this.physics.add.collider(this.player, this.stoneGates);

        this.keyN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);
        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.debugEnabled = false;
        this.setupUI(); 

        this.answerSlots = []; 
        if (this.isMultiSlot) {
            this.currentLevelData.slots.forEach((slotData, index) => {
                let textureKey = (this.currentLevelData.level >= 19) ? 'lab_portal' : 'floor_items';
                let plate = this.physics.add.sprite(slotData.x, slotData.y, textureKey);
                if (this.currentLevelData.level >= 19) plate.play('lab_portal-idle'); else plate.setFrame(30);
                plate.setScale(3).setImmovable(true).setDepth(5); 
                plate.body.setSize(10, 10).setOffset(3, 3);
                plate.requiredValue = slotData.requiredValue; 
                this.add.text(slotData.x, slotData.y - 40, `Part ${index + 1}`, { fontSize: '16px', fontFamily: 'Ithaca', fill: '#ffff00' }).setOrigin(0.5);
                this.answerSlots.push(plate);
            });
        } else {
            let ansX = this.isCorrectionRoom ? 600 : this.currentLevelData.answerZone.x;
            let ansY = this.isCorrectionRoom ? 400 : this.currentLevelData.answerZone.y;
            this.pressurePlate = this.physics.add.sprite(ansX, ansY, 'floor_items');
            this.pressurePlate.setScale(3).setFrame(30).setImmovable(true).setDepth(5);
            this.pressurePlate.body.setSize(10, 10).setOffset(3, 3);
            this.answerSlots.push(this.pressurePlate); 
        }

        this.blocks = this.physics.add.group();
        this.createBlocks();

        this.physics.add.collider(this.player, this.blocks);
        this.physics.add.collider(this.blocks, this.blocks);
        if (wallsLayer) {
            this.physics.add.collider(this.player, wallsLayer);
            this.physics.add.collider(this.blocks, wallsLayer);
        }
        this.physics.add.collider(this.blocks, this.stoneGates);

        const mapWidth = map.widthInPixels * 3;
        const mapHeight = map.heightInPixels * 3;
        this.physics.world.setBounds(0, 0, mapWidth, mapHeight);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0, 0, mapWidth, mapHeight);

        if (!this.anims.exists('portal-spin')) {
            this.anims.create({ key: 'portal-spin', frames: this.anims.generateFrameNumbers('portal', { start: 0, end: 5 }), frameRate: 10, repeat: -1 });
        }
        
        let pX = this.isCorrectionRoom ? 600 : this.currentLevelData.portalPos.x;
        let pY = this.isCorrectionRoom ? 200 : this.currentLevelData.portalPos.y;

        this.portal = this.physics.add.sprite(pX, pY, 'portal').setScale(3).setVisible(false);
        this.portal.body.enable = false;
        this.portal.body.setSize(10, 10); 
        this.portal.body.setOffset(11, 11); 
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
        let xPos = this.isCorrectionRoom ? 200 : this.currentLevelData.blockStart.x;
        let yPos = this.isCorrectionRoom ? 200 : this.currentLevelData.blockStart.y;
        let lvl = this.currentLevelData.level;
        
        let spriteKey = 'gem_blue';
        let animKey = 'gem-blue-spin';

        if (this.isCorrectionRoom) {
            spriteKey = 'gem_blue'; animKey = 'gem-blue-spin';
        } else if (lvl >= 19) {
            spriteKey = 'orb'; animKey = 'orb-spin';
        } else if (lvl >= 12) {
            spriteKey = 'gem_yellow'; animKey = 'gem-yellow-spin';
        } else if (lvl >= 6) {
            spriteKey = 'gem_green'; animKey = 'gem-green-spin';
        }

        this.currentLevelData.options.forEach((val, index) => {
            let blockPos;
            if (this.isCorrectionRoom) {
                blockPos = { x: xPos, y: yPos + (index * 150) };
            } else {
                 blockPos = (this.currentLevelData.blockPositions && this.currentLevelData.blockPositions[index]) 
                           ? this.currentLevelData.blockPositions[index] 
                           : { x: xPos, y: yPos + (index * 150) };
            }

            let block = this.blocks.create(blockPos.x, blockPos.y, spriteKey).setScale(3);
            if (animKey) block.play(animKey);

            block.setDrag(1000).setBounce(1).setCollideWorldBounds(true);
            block.setDepth(30); 
            block.body.setSize(10, 15).setOffset(3, 1);
            block.value = val;
            
            let text = this.add.text(0, 0, val, { fontSize: '24px', color: '#ffffff', stroke: '#000', strokeThickness: 4, fontFamily: 'Ithaca', fontStyle: 'bold' }).setOrigin(0.5);
            text.setDepth(51); 
            block.myText = text;
            block.updateText = function() { text.x = this.x; text.y = this.y; };
            yPos += 150;
        });
    }

    setupUI() {
        let restartBtn = this.add.text(20, 20, '↺', { fontSize: '40px', fontFamily: 'Ithaca', fill: '#ffffff', backgroundColor: '#000000' })
            .setPadding(5).setOrigin(0).setScrollFactor(0).setInteractive();
        restartBtn.on('pointerdown', () => { 
            this.sound.play('click_sfx');
            this.physics.pause(); this.scene.restart(); 
        });
        this.input.keyboard.on('keydown-R', () => { this.physics.pause(); this.scene.restart(); });

        let pauseBtn = this.add.text(80, 20, 'II', { fontSize: '40px', fontFamily: 'Ithaca', fill: '#ffffff', backgroundColor: '#000000' })
            .setPadding(5).setOrigin(0).setScrollFactor(0).setInteractive();
        pauseBtn.on('pointerdown', () => {
            this.sound.play('click_sfx');
            if (this.physics.world.isPaused) { this.physics.resume(); pauseBtn.setText('II'); } 
            else { this.physics.pause(); pauseBtn.setText('▶'); }
        });

        this.dialogContainer = this.add.container(400, 50).setScrollFactor(0).setDepth(200).setVisible(false);
        this.dialogContainer.add(this.add.nineslice(0, 0, 'dialog_bg', 0, 700, 150, 10, 10, 10, 10));
        this.dialogText = this.add.text(0, 0, '', { fontSize: '20px', fontFamily: 'Ithaca', color: '#4a3d2e', wordWrap: { width: 650 }, align: 'center' }).setOrigin(0.5);
        this.dialogContainer.add(this.dialogText);
        
        this.interactPrompt = this.add.text(0, 0, 'Press E to talk', { fontSize: '12px', fontFamily: 'Ithaca', backgroundColor: '#000' }).setOrigin(0.5).setDepth(101).setVisible(false);
        
        let levelTitle = this.isCorrectionRoom ? "CORRECTION ROOM" : `Level ${this.currentLevelData.level}`;
        const qContainer = this.add.container(400, 40).setScrollFactor(0).setDepth(100);
        qContainer.add(this.add.nineslice(0, 0, 'dialog_bg', 0, 500, 60, 10, 10, 10, 10));
        qContainer.add(this.add.text(0, 0, `${levelTitle}: ${this.currentLevelData.question}`, { fontSize: '18px', fontFamily: 'Ithaca', fill: '#4a3d2e', wordWrap: { width: 480 }, align: 'center' }).setOrigin(0.5));
    }

    update(time, delta) {
        if (this.isGameFinished || this.isLevelComplete) return; 

        if (Phaser.Input.Keyboard.JustDown(this.keyN)) { this.handleWin(); }
        if (Phaser.Input.Keyboard.JustDown(this.keyD)) { 
            this.debugEnabled = !this.debugEnabled;
            if (!this.debugEnabled && this.debugText) {
                this.debugText.destroy();
                this.debugText = null;
            }
        }

        this.player.setVelocity(0);
        let moving = false;
        
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-200); this.player.anims.play('run-side', true); this.player.setFlipX(true); moving = true;
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(200); this.player.anims.play('run-side', true); this.player.setFlipX(false); moving = true;
        } else if (this.cursors.up.isDown) {
            this.player.setVelocityY(-200); this.player.anims.play('run-up', true); moving = true;
        } else if (this.cursors.down.isDown) {
            this.player.setVelocityY(200); this.player.anims.play('run-down', true); moving = true;
        } else {
            this.player.anims.play('idle-down', true);
        }

        // --- FOOTSTEPS SOUND ---
        if (moving) {
            this.footstepTimer += delta;
            if (this.footstepTimer > 350) { // Every 350ms
                this.sound.play('footstep_sfx', { volume: 0.3 });
                this.footstepTimer = 0;
            }
        } else {
            this.footstepTimer = 350; // Reset so sound plays immediately next move
        }

        this.blocks.getChildren().forEach((block) => {
            if (!block.active) return;
            if (block.updateText) block.updateText();
            
            if (!block.isLocked) {
                this.answerSlots.forEach((plate) => {
                    if (Phaser.Math.Distance.Between(block.x, block.y, plate.x, plate.y) < 25) {
                        
                        let requiredVal = this.isMultiSlot ? plate.requiredValue : this.correctAnswer;
                        
                        if (block.value == requiredVal) {
                            block.x = plate.x;
                            block.y = plate.y;
                            block.body.setVelocity(0,0);
                            block.isLocked = true;
                            block.body.enable = false; 
                            
                            this.sound.play('snap_sfx'); // PLAY SNAP SOUND

                            if (plate.texture.key === 'floor_items') {
                                plate.setFrame(31); 
                            }
                            
                            if (this.isMultiSlot) {
                                let correctLockedCount = this.blocks.getChildren().filter(b => b.isLocked).length;
                                if (correctLockedCount === this.answerSlots.length) {
                                    this.activatePortal();
                                }
                            } else {
                                this.activatePortal();
                                if (block.myText) block.myText.destroy();
                                block.destroy(); 
                            }
                            
                        } else {
                            this.handleGameOver();
                        }
                    }
                });
            }
        });

        if (this.npc && !this.isCorrectionRoom && this.currentLevelData.level === 1) {
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

        if (this.debugEnabled) {
            const mouseX = this.input.mousePointer.worldX;
            const mouseY = this.input.mousePointer.worldY;
            const playerX = this.player.x;
            const playerY = this.player.y;
            
            if (!this.debugText) {
                this.debugText = this.add.text(0, 0, '', { fontSize: '16px', fontFamily: 'monospace', fill: '#00ff00', backgroundColor: '#000000', padding: { x: 10, y: 10 } }).setOrigin(0).setScrollFactor(0).setDepth(500);
            }
            this.debugText.setText(`Player: (${Math.round(playerX)}, ${Math.round(playerY)})\nMouse: (${Math.round(mouseX)}, ${Math.round(mouseY)})`);
            this.debugText.setPosition(10, 70);
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
        // REMOVE THIS LOCK: this.isLevelComplete = true; 
        
        // REMOVE THESE STOPS:
        // this.player.body.setVelocity(0);
        // this.player.anims.play('idle-down');

        this.portal.setVisible(true); 
        this.portal.body.enable = true; 
        this.portal.play('portal-spin');
        
        this.stoneGates.children.iterate((gate) => { 
            if (gate) { 
                gate.setTexture('gate_open'); 
                gate.body.enable = false; 
            } 
        });
        
        this.add.text(400, 300, "GATE OPENED!", { fontSize: '32px', fontFamily: 'Ithaca', color: '#00ff00', stroke: '#000', strokeThickness: 4 }).setOrigin(0.5).destroy({ fromScene: true, delay: 2000 });
    }

    handleWin() {
        this.isGameFinished = true;
        
        // NOW WE LOCK THE GAME
        this.isLevelComplete = true;
        
        this.physics.pause();
        this.player.anims.stop();
        this.player.body.setVelocity(0); 
        this.sound.stopAll();
        this.sound.play('victory_sfx');
        
        let msg = this.isCorrectionRoom ? "DETENTION PASSED!" : `LEVEL ${this.currentLevelData.level}\nCOMPLETE!`;
        let color = this.isCorrectionRoom ? '#00ff00' : '#ffff00';

        const completeText = this.add.text(400, 250, msg, { fontSize: '64px', fill: color, backgroundColor: '#000', fontFamily: 'Ithaca', align: 'center' }).setOrigin(0.5).setScrollFactor(0).setDepth(300);
        this.tweens.add({ targets: completeText, scale: 1.2, duration: 500, yoyo: true, hold: 1000 });
        
        this.time.delayedCall(3000, () => {
            this.cameras.main.fade(500, 0, 0, 0);
            this.time.delayedCall(600, () => {
                if (this.isCorrectionRoom) {
                    const levelToRetry = levels.find(l => l.level === this.returnToLevelNum);
                    if (levelToRetry) {
                        this.scene.start('GameLevel', { ...levelToRetry, isCorrectionRoom: false });
                    } else {
                        console.warn("Level data not found, returning to menu.");
                        this.scene.start('MainMenu'); 
                    }
                } else {
                    if (this.currentLevelData.level === 20) {
                        this.scene.start('GameWon');
                    } else {
                        // Demo Skip Logic
                        let nextLevelNum;
                        if (this.currentLevelData.level === 6) nextLevelNum = 12;
                        else if (this.currentLevelData.level === 12) nextLevelNum = 20;
                        else nextLevelNum = this.currentLevelData.level + 1;

                        const nextLevelData = levels.find(l => l.level === nextLevelNum);
                        if (nextLevelData) { 
                            this.scene.start('GameLevel', { ...nextLevelData, isCorrectionRoom: false }); 
                        } else { 
                            this.scene.start('MainMenu'); 
                        }
                    }
                }
            });
        });
    }

    handleGameOver() {
        this.isGameFinished = true;
        this.physics.pause();
        this.player.anims.stop();
        this.sound.stopAll();
        this.sound.play('gameover_sfx');

        if (this.isCorrectionRoom) {
            this.add.text(400, 300, 'EXPELLED!\n(GAME OVER)', { fontSize: '64px', fill: '#f00', backgroundColor: '#000', fontFamily: 'Ithaca', align: 'center' }).setOrigin(0.5).setScrollFactor(0).setDepth(300);
            this.time.delayedCall(3000, () => { this.scene.start('MainMenu'); });
        } else {
            this.add.text(400, 300, 'WRONG ANSWER!\nTO DETENTION!', { fontSize: '48px', fill: '#ff6600', backgroundColor: '#000', fontFamily: 'Ithaca', align: 'center' }).setOrigin(0.5).setScrollFactor(0).setDepth(300);
            const myLevelNum = this.currentLevelData.level;
            this.time.delayedCall(2000, () => {
                this.cameras.main.fade(500, 0, 0, 0);
                this.time.delayedCall(600, () => {
                    const randomEasyQuestion = correctionLevels[Math.floor(Math.random() * correctionLevels.length)];
                    this.scene.start('GameLevel', { 
                        ...randomEasyQuestion, 
                        level: "DETENTION", 
                        isCorrectionRoom: true,
                        returnToLevelNum: myLevelNum 
                    });
                });
            });
        }
    }

    showDialogue(fullText) {
        if (this.dialogContainer.y > 0) return;
        this.dialogContainer.setVisible(true);
        
        // Loop Talking SFX
        if (!this.talkSound || !this.talkSound.isPlaying) {
            this.talkSound = this.sound.add('talking_sfx', { volume: 0.5, loop: true });
            this.talkSound.play();
        }

        this.tweens.add({ targets: this.dialogContainer, y: 50, duration: 500, ease: 'Power2.out' });
        this.dialogText.setText('');
        let i = 0;
        if (this.typingTimer) this.typingTimer.remove();
        
        this.typingTimer = this.time.addEvent({ 
            delay: 30, 
            callback: () => { 
                this.dialogText.text += fullText[i]; 
                i++;
                if (i >= fullText.length) {
                    if (this.talkSound) this.talkSound.stop(); // Stop sound when typing done
                }
            }, 
            repeat: fullText.length - 1 
        });
    }

    hideDialogue() {
        if (this.dialogContainer.y < 0) return;
        if (this.talkSound) this.talkSound.stop();
        if (this.typingTimer) this.typingTimer.remove();
        this.tweens.add({ targets: this.dialogContainer, y: -200, duration: 300, ease: 'Power2.in', onComplete: () => { this.dialogContainer.setVisible(false); this.dialogText.setText(''); } });
    }
}

class GameWon extends Phaser.Scene {
    constructor() { super('GameWon'); }

    create() {
        this.sound.stopAll();
        this.sound.play('victory_sfx'); // Victory fanfare

        this.add.text(400, 200, 'CONGRATULATIONS!', { fontSize: '48px', fill: '#ffff00', fontFamily: 'Ithaca' }).setOrigin(0.5);
        this.add.text(400, 280, 'YOU HAVE MASTERED THE LABYRINTH!', { fontSize: '32px', fill: '#00ff00', fontFamily: 'Ithaca' }).setOrigin(0.5);
        this.add.text(400, 380, 'All 20 Levels Complete!', { fontSize: '24px', fill: '#ffffff', fontFamily: 'Ithaca' }).setOrigin(0.5);
        
        let returnBtn = this.add.text(400, 480, 'RETURN TO MENU', { fontSize: '20px', fill: '#0ff', fontFamily: 'Ithaca' })
            .setOrigin(0.5).setInteractive();

        returnBtn.on('pointerdown', () => {
            this.scene.start('MainMenu');
        });
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
    scene: [MainMenu, GameLevel, GameWon] 
};

const game = new Phaser.Game(config);