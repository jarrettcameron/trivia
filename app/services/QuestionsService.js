import { AppState } from "../AppState.js"
import { Question } from "../models/Question.js"
import { Pop } from "../utils/Pop.js"

class QuestionsService {

    saveHighscore() {
        localStorage.setItem('highestScore', AppState.highestScore.toFixed(0))
    }

    loadHighscore() {
        let x = localStorage.getItem('highestScore')
        AppState.highestScore = parseInt(x == null ? '0' : x)
    }

    async getQuestions() {
        AppState.points = 0
        const response = await fetch('https://opentdb.com/api.php?amount=10&type=multiple&difficulty=easy')
        const jsonRes = await response.json()
        if (jsonRes.response_code == 5) {
            Pop.error('API returned 429: Too Many Requests')
            return
        }
        AppState.startTime = Date.now()
        AppState.questions = jsonRes.results.map(x => new Question(x))
        AppState.currentQuestion = 0
    }

    submitAnswer(answer) {
        const currentQuestion = AppState.questions[AppState.currentQuestion]
        if (currentQuestion.correctAnswer == answer) {
            let timeMulti = 20 - ((Date.now() - AppState.startTime) / 1000)
            timeMulti = Math.max(timeMulti, 1)

            AppState.points += Math.floor(timeMulti * 50)
        }

        if (AppState.currentQuestion == AppState.questions.length - 1) {
            if (AppState.points > AppState.highestScore) {
                AppState.highestScore = AppState.points
                this.saveHighscore()
            }
            AppState.currentQuestion = -1
            return
        }
        AppState.startTime = Date.now()
        AppState.currentQuestion++
    }
}

export const questionsService = new QuestionsService()