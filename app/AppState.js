import { Question } from './models/Question.js'
import { EventEmitter } from './utils/EventEmitter.js'
import { createObservableProxy } from './utils/ObservableProxy.js'

class ObservableAppState extends EventEmitter {

  points = 0

  /** @type {Question[]} */
  questions = []
  currentQuestion = 0
  startTime = Date.now()

  highestScore = 0

}

export const AppState = createObservableProxy(new ObservableAppState())