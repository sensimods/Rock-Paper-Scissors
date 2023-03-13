const optionBtns = document.querySelectorAll('.options')
const player1Container = document.querySelector('#player1')
const computerContainer = document.querySelector('#computer')
const player1ScoreContainer = document.querySelector('#player1Score')
const computerScoreContainer = document.querySelector('#computerScore')
const resultsContainer = document.querySelector('#results')

const options = {
  start: {
    playerIcon:
      '<i class="fa-duotone fa-hand-back-fist inplay-icons fist-right starting-icon animate-fist"></i>',
    computerIcon:
      '<i class="fa-duotone fa-hand-back-fist inplay-icons fist-left starting-icon animate-fist"></i>',
  },
  rock: {
    playerIcon:
      '<i class="fa-thin fa-hand-back-fist fist-right inplay-icons"></i>',
    computerIcon:
      '<i class="fa-thin fa-hand-back-fist fist-left inplay-icons"></i>',
  },
  paper: {
    playerIcon: '<i class="fa-thin fa-hand paper-right inplay-icons"></i>',
    computerIcon: '<i class="fa-thin fa-hand paper-left inplay-icons"></i>',
  },
  scissors: {
    playerIcon:
      '<i class="fa-thin fa-hand-scissors scissors-right inplay-icons"></i>',
    computerIcon:
      '<i class="fa-thin fa-hand-scissors scissors-left inplay-icons"></i>',
  },
}

let playerSelection = null
let computerSelection = null
let player1Score = 0
let computerScore = 0
let winner = null
let computerIcon = null
let player1Icon = null

optionBtns.forEach(option => {
  option.addEventListener('click', function () {
    optionBtns.forEach(btn => {
      if (btn !== this) {
        btn.classList.remove('option-active')
      } else {
        btn.classList.add('option-active')
      }
    })
    resultsContainer.innerText = ''
    playerSelection = this.dataset.value
    player1Container.innerHTML = options.start.playerIcon
    computerContainer.innerHTML = options.start.computerIcon
    computerSelection = getComputerSelection()

    const animatedFist = document.querySelectorAll('.animate-fist')[0]
    animatedFist.addEventListener('animationend', function () {
      determineWinner()
      displayIcons()
      showResult()
    })
  })
})

const getComputerSelection = () => {
  optionBtns.forEach(btn => {
    btn.setAttribute('disabled', true)
  })

  let selection = Math.floor(Math.random() * 3)
  switch (selection) {
    case 0:
      return 'rock'
    case 1:
      return 'paper'
    case 2:
      return 'scissors'
    default:
      return null
  }
}

const determineWinner = () => {
  if (playerSelection === computerSelection) {
    return (winner = "It's a draw!")
  }

  if (
    (playerSelection === 'rock' && computerSelection === 'scissors') ||
    (playerSelection === 'paper' && computerSelection === 'rock') ||
    (playerSelection === 'scissors' && computerSelection === 'paper')
  ) {
    player1Score += 1
    return (winner = 'You win!')
  }

  computerScore += 1
  return (winner = 'Computer wins!')
}

const showResult = () => {
  resultsContainer.innerText = winner
  player1ScoreContainer.innerText = player1Score
  computerScoreContainer.innerText = computerScore

  resetGame()
}

const resetGame = () => {
  optionBtns.forEach(btn => {
    btn.removeAttribute('disabled')
    btn.classList.remove('option-active')
  })

  playerSelection = null
  computerSelection = null
  winner = null
  computerIcon = null
  player1Icon = null
}

const displayIcons = () => {
  switch (playerSelection) {
    case 'rock':
      player1Container.innerHTML = options.rock.playerIcon
      break
    case 'paper':
      player1Container.innerHTML = options.paper.playerIcon
      break
    case 'scissors':
      player1Container.innerHTML = options.scissors.playerIcon
      break
    default:
      player1Container.innerHTML = options.start.playerIcon
      break
  }

  switch (computerSelection) {
    case 'rock':
      computerContainer.innerHTML = options.rock.computerIcon
      break
    case 'paper':
      computerContainer.innerHTML = options.paper.computerIcon
      break
    case 'scissors':
      computerContainer.innerHTML = options.scissors.computerIcon
      break
    default:
      computerContainer.innerHTML = options.start.computerIcon
      break
  }
}
