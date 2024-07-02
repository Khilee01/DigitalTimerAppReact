// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    timerLimit: 25,
    isTimerRunning: false,
    minutes: 25,
    seconds: 0,
    timeElapsedInSeconds: 0,
    remainingTimeInSeconds: 25 * 60,
  }

  DecreementInterval = () => {
    const {isTimerRunning} = this.state
    if (!isTimerRunning) {
      this.setState(prevState => ({
        timerLimit: prevState.timerLimit - 1,
        minutes: prevState.timerLimit - 1,
        seconds: 0,
        timeElapsedInSeconds: 0,
        remainingTimeInSeconds: (prevState.timerLimit - 1) * 60,
      }))
    }
  }

  IncreementInterval = () => {
    const {isTimerRunning} = this.state
    if (!isTimerRunning) {
      this.setState(prevState => ({
        timerLimit: prevState.timerLimit + 1,
        minutes: prevState.timerLimit + 1,
        seconds: 0,
        timeElapsedInSeconds: 0,
        remainingTimeInSeconds: (prevState.timerLimit + 1) * 60,
      }))
    }
  }

  onPlayOrPauseBtn = () => {
    const {isTimerRunning, timeElapsedInSeconds, timerLimit} = this.state
    const isTimerCompleted = timeElapsedInSeconds === timerLimit * 60

    if (isTimerCompleted) {
      this.setState({timeElapsedInSeconds: 0})
    }

    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }

    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  clearTimerInterval = () => {
    clearInterval(this.intervalId)
  }

  incrementTimeElapsedInSeconds = () => {
    this.setState(prevState => {
      const newRemainingTimeInSeconds = prevState.remainingTimeInSeconds - 1
      if (newRemainingTimeInSeconds <= 0) {
        clearInterval(this.intervalId)
        return {
          isTimerRunning: false,
          remainingTimeInSeconds: 0,
          minutes: 0,
          seconds: 0,
        }
      }

      return {
        remainingTimeInSeconds: newRemainingTimeInSeconds,
        minutes: Math.floor(newRemainingTimeInSeconds / 60),
        seconds: newRemainingTimeInSeconds % 60,
      }
    })
  }

  Reset = () => {
    this.clearTimerInterval()
    this.setState({
      isTimerRunning: false,
      timerLimit: 25,
      minutes: 25,
      seconds: 0,
      timeElapsedInSeconds: 0,
      remainingTimeInSeconds: 25 * 60,
    })
  }

  render() {
    const {timerLimit, isTimerRunning, minutes, seconds} = this.state
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    const imagePlayOrPauseUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    return (
      <div className="mainContainer">
        <h1 className="DigitalTimerHg">Digital Timer</h1>
        <div className="functionalPartsMainContainer">
          <div className="timerBg">
            {/* for actual clock */}
            <div className="tickingClockBg">
              {/* white container */}
              <h1 className="timer">
                {stringifiedMinutes}:{stringifiedSeconds}
              </h1>
              {isTimerRunning ? (
                <p className="timerStatus">Running</p>
              ) : (
                <p className="timerStatus">Paused</p>
              )}
            </div>
          </div>
          <div className="pauseResetLimitContainer">
            {/* for pause reset and set timer Limit */}
            <div className="pauseResetContainer">
              {/* for pause reset */}
              <button
                type="button"
                onClick={this.onPlayOrPauseBtn}
                className="pauseResetContainer"
              >
                <img
                  src={imagePlayOrPauseUrl}
                  alt={isTimerRunning ? 'pause icon' : 'play icon'}
                />
                {isTimerRunning ? <p>Pause</p> : <p>Start</p>}
              </button>
              <button
                type="button"
                className="pauseResetContainer"
                onClick={this.Reset}
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                />
                <p>Reset</p>
              </button>
            </div>
            <div className="styleTimeLimit">
              {/* set timer Limit */}
              <p>Set Timer Limit</p>
              <div className="incrementDecreementBtn">
                <button
                  type="button"
                  className="numericalTimerLimitbutton"
                  onClick={this.DecreementInterval}
                >
                  -
                </button>
                <p className="numericalTimerLimit">{timerLimit}</p>
                <button
                  type="button"
                  className="numericalTimerLimitbutton"
                  onClick={this.IncreementInterval}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
