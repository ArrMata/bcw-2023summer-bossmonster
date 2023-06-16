const heroes = [
    {
        name: 'Slate Slabrock',
        type: 'dwarf',
        damage: 5,
        health: 25,
        maxHealth: 25,
        level: 1
    },
    {
        name: 'Flint Ironstag',
        type: 'elf',
        damage: 10,
        health: 50,
        maxHealth: 50,
        level: 3
    },
]

let gold = 30
let bossKillCount = 0
let gameEnded = false

let boss = {
    health: 100,
    maxHealth: 100,
    damage: 5,
    level: 1
}

const newBoss = {
    health: 175,
    maxHealth: 175,
    damage: 10,
    level: 5,
    img: 0,
}

function attackBoss() {
    if (!gameEnded) {
        let combinedAttack = 0
        heroes.forEach(hero => {
            combinedAttack += hero.damage
        })
        boss.health -= combinedAttack
        if (boss.health <= 0) {
            boss.health = 0
        }
        gold += 5
        hasWon()
        drawCharacters()
    }
}


function attackPlayers() {
    let bossAttack = boss.damage
    heroes.forEach(hero => {
        hero.health -= bossAttack
        if (hero.health <= 0) {
            hero.health = 0
        }
    })
    console.log('running');
    hasLost()
    drawCharacters()
}

function hasLost() {
    let isAllDead = heroes.every(hero => hero.health == 0)
    if (isAllDead) {
        Swal.fire(
            'You have lost!',
            'Better luck next time!',
            'error'
        )
        clearInterval(bossAttackInterval)
        gameEnded = true
    }
}

function hasWon() {
    // if (boss.health == 0) {
    //     Swal.fire(
    //         'You have won!',
    //         'Thank you heroes!',
    //         'success'
    //     )
    //     clearInterval(bossAttackInterval)
    // }

    if (bossKillCount == 0 && boss.health == 0) {
        boss = newBoss
        bossKillCount += 1
        drawCharacters()
    }

    if (bossKillCount == 1 && boss.health == 0 && !gameEnded) {
        Swal.fire(
            'You have won!',
            'Thank you heroes!',
            'success'
        )
        clearInterval(bossAttackInterval)
        gameEnded = true
    }
}

function resetGame() {
    resetGameData()
    drawCharacters()
}

function resetGameData() {
    heroes.forEach(hero => {
        hero.health = hero.maxHealth
    })
    boss.health = boss.maxHealth
    clearInterval(bossAttackInterval)
    bossAttackInterval = setInterval(attackPlayers, 5000)
    gameEnded = false
}

function drawCharacters() {
    // const characterElement = document.getElementById('slate')
    // const healthSpan = characterElement.querySelector('.health')
    // const goldSpan = characterElement.querySelector('.gold')
    // const levelSpan = characterElement.querySelector('.level')

    heroes.forEach(hero => {
        const characterElement = document.getElementById(hero.name)
        const healthSpan = characterElement.querySelector('.health')
        // const goldSpan = characterElement.querySelector('.gold')
        const levelSpan = characterElement.querySelector('.level')

        healthSpan.innerText = hero.health
        levelSpan.innerText = hero.level
    })

    const goldElement = document.getElementById('goldAmount')
    goldElement.innerText = gold

    const bossElement = document.getElementById('boss')
    const bossHealthSpan = bossElement.querySelector('.currentHealth')
    const bossMaxHealthSpan = bossElement.querySelector('.maxHealth')
    bossHealthSpan.innerText = boss.health
    bossMaxHealthSpan.innerText = boss.maxHealth
}

function healCharacter(name, goldCost) {
    if (goldCost <= gold) {
        gold -= goldCost
        let foundHero = heroes.find(hero => hero.name == name)
        foundHero.health = foundHero.maxHealth
        drawCharacters()
    }
    else {
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: "You don't have enough gold!",
            showConfirmButton: false,
            timer: 1000
        })
    }

    // heroes.find(hero => hero.name == name).health =  heroes.find(hero => hero.name == name).maxHealth 
    // This line above is the same as the uncommented code in our function.
    //
    // heroes.filter(hero => hero.level > 3) These two functions, filter and find, have a syntax where you want to have the expression
    // heroes.find(hero => hero.name == name) after the arrow be true.
    //
    // heroes.forEach(hero => {
    //     console.log(hero.name);  For each will have a similar structure to a for loop
    // })
    //
    // for (let index = 0; index < array.length; index++) {
    //     const element = array[index];       
    // }

}

drawCharacters()

let bossAttackInterval = setInterval(attackPlayers, 5000)



