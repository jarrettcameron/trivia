import { AppState } from "../AppState.js"
import { Question } from "../models/Question.js"
import { questionsService } from "../services/QuestionsService.js"
import { Pop } from "../utils/Pop.js"
import { setHTML, setText } from "../utils/Writer.js"

export class QuestionsController {
    constructor() {
        questionsService.loadHighscore()
        AppState.on('currentQuestion', this.drawQuestion)
        AppState.on('points', this.drawPoints)
        this.drawQuestion()
        //this.getQuestions()
    }

    drawPoints() {
        setText('score', `🏆 ${AppState.points.toFixed(0)}`)
    }

    drawQuestion() {
        if (AppState.currentQuestion == -1) {
            setHTML('question', Question.endCard(AppState.points == AppState.highestScore))
            return
        }
        setHTML('question', AppState.questions.length == 0 ? Question.startCard : AppState.questions[AppState.currentQuestion].questionCard)
    }

    getQuestions() {
        questionsService.getQuestions()
    }

    submitAnswer(answer) {
        questionsService.submitAnswer(answer)
    }
}