import { AppState } from "../AppState.js"

export class Question {
    constructor(data) {
        this.category = data.category
        this.question = data.question
        this.correctAnswer = data.correct_answer
        this.incorrectAnswers = data.incorrect_answers
        this.questions = [this.correctAnswer, ...this.incorrectAnswers]
    }

    static endCard(highest) {
        if (highest) {
            return `
        <div class="col-12 mb-4">
            <h4>Highscore: 🏆 ${AppState.highestScore}</h4>
        </div>
        <div class="col-12 mb-4">
            <h4>Victory!</h4>
        </div>
        <div class="col-12 mb-4">
            <h3>You've set a new highscore!</h3>
        </div>
        <div class="col-12 mb-2">
            <button class="btn btn-primary" onclick="app.QuestionsController.getQuestions()">Play Again</button>
        </div>`
        }
        return `
        <div class="col-12 mb-4">
            <h4>Highscore: 🏆 ${AppState.highestScore}</h4>
        </div>
        <div class="col-12 mb-4">
            <h4>Too slow!</h4>
        </div>
        <div class="col-12 mb-4">
            <h3>Try to answer faster to get a higher score!</h3>
        </div>
        <div class="col-12 mb-2">
            <button class="btn btn-primary" onclick="app.QuestionsController.getQuestions()">Play Again</button>
        </div>`
    }

    get questionCard() {
        return `<div class="col-12 mb-4" >
            <h4>Question #${AppState.currentQuestion + 1}</h4>
    </div>
    <div class="col-12 mb-4">
        <h3>${this.question}</h3>
    </div>
    <div class="col-12 mb-2">
        ${this.questionForm}
    </div>`
    }

    get questionForm() {
        let content = ''
        // Shuffle method from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
        this.questions
            .map(v => ({ v, sort: Math.random() }))
            .sort((v, r) => v.sort - r.sort)
            .map(({ v }) => v).forEach(x => content += `<button class="px-4 my-2 btn btn-primary" onclick="app.QuestionsController.submitAnswer('${x}')">${x}</button><br>`)
        return content
    }

    static get startCard() {
        return `<div class="col-12 mb-4">
                <h4>Highscore: 🏆 ${AppState.highestScore}</h4>
            </div>
            <div class="col-12 mb-4">
                <h1>Ready?</h1>
            </div>
            <div class="col-12 mb-2">
                <p>When you start a round you will be provided with 10 trivia questions, the faster you answer, the
                    more points you get. If you answer incorrectly you don't get any points and continue to the next
                    question.</p>
            </div>
            <div class="col-12">
                <button class="btn btn-primary" onclick="app.QuestionsController.getQuestions()">Start Now</button>
            </div>`
    }
}