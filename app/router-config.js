import { QuestionsController } from "./controllers/QuestionsController.js";
import { Router } from "./utils/Router.js";


export const router = new Router([
  {
    path: '',
    controllers: [QuestionsController],
    view: 'app/views/MainView.html'
  }
])