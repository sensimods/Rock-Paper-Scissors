const optionBtns = document.querySelectorAll('.options')
const player1Container = document.querySelector('#player1')
const computerContainer = document.querySelector('#computer')
const player1ScoreContainer = document.querySelector('#player1Score')
const computerScoreContainer = document.querySelector('#computerScore')
const resultsContainer = document.querySelector('#results')

const icons = {
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
    computerIcon: '<i class="fa-thin fa-hand-scissors inplay-icons"></i>',
  },
}

const options = ['rock', 'paper', 'scissors']

const shuffleOptions = () => {
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[options[i], options[j]] = [options[j], options[i]]
  }
}

let player1Score = 0
let computerScore = 0
let player1Icon, playerSelection, computerIcon, computerSelection, result

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
    computerSelection = getComputerSelection()
    player1Container.innerHTML = icons.start.playerIcon
    computerContainer.innerHTML = icons.start.computerIcon

    const animatedFist = document.querySelector('.animate-fist')
    animatedFist.addEventListener('animationend', function () {
      determineWinner()
      displayResults()
    })
  })
})

const getComputerSelection = () => {
  optionBtns.forEach(btn => {
    btn.setAttribute('disabled', true)
  })

  shuffleOptions()
  return options[Math.floor(Math.random() * options.length)]
}

const determineWinner = () => {
  if (playerSelection === computerSelection) {
    return (result = "It's a draw!")
  }

  if (
    (playerSelection === 'rock' && computerSelection === 'scissors') ||
    (playerSelection === 'paper' && computerSelection === 'rock') ||
    (playerSelection === 'scissors' && computerSelection === 'paper')
  ) {
    player1Score++
    return (result = 'You win!')
  }

  computerScore++
  return (result = 'Computer wins!')
}

const resetGame = () => {
  optionBtns.forEach(btn => {
    btn.removeAttribute('disabled')
    btn.classList.remove('option-active')
  })
}

const displayResults = () => {
  let ps, cs
  switch (playerSelection) {
    case 'rock':
      ps = icons.rock.playerIcon
      break
    case 'paper':
      ps = icons.paper.playerIcon
      break
    case 'scissors':
      ps = icons.scissors.playerIcon
      break
    default:
      ps = icons.start.playerIcon
      break
  }

  switch (computerSelection) {
    case 'rock':
      cs = icons.rock.computerIcon
      break
    case 'paper':
      cs = icons.paper.computerIcon
      break
    case 'scissors':
      cs = icons.scissors.computerIcon
      break
    default:
      cs = icons.start.computerIcon
      break
  }

  player1Container.innerHTML = ps
  computerContainer.innerHTML = cs
  resultsContainer.innerText = result
  player1ScoreContainer.innerText = player1Score
  computerScoreContainer.innerText = computerScore

  resetGame()
}
