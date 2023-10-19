
const DEFAULT_WORDS = ["cheese", "tacos", "burrito", "carnitas", "chocolate", "rigatoni", "souffle", "coffee", "cappuccino", "ravioli", "tortellini", "eggplant", "tomato", "cherry", "apple", "orange", "carrot", "tiramisu", "strawberry", "mango", "clementine", "sushi", "noodles", "almond", "cashew", "walnut", 'breakfast', 'lunch', 'dinner', 'cookie', 'scone', 'muffin', 'babka', 'doughnut', 'bacon'];

export const DEFAULT_INITIAL_STATE = {
    guessedLetters: [],
    hideStartGameButton: false,
    gameIsHappening: false,
    tries: 0,
    answer: '',
    blanksArray: [],
    hideHintButton: true,
    hideGiveUpButton: true,
    hideUseKeyboard: true,
    hideIncorrectLetters: true,
    messagesDivText: '',
    hideTries: true,
    word: '',
    hideYesMobileTabletButton: false,
    hideNoMobileTabletButton: false,
    isMobileOrTablet: window.WURFL.is_mobile,
    words: DEFAULT_WORDS,
    hintActive: false
}

export const RESET_STATE = {
    guessedLetters: [],
    hideStartGameButton: false,
    gameIsHappening: false,
    answer: '',
    blanksArray: [],
    hideHintButton: true,
    hideGiveUpButton: true,
    hideUseKeyboard: true,
    hideIncorrectLetters: true,
    messagesDivText: '',
    hideTries: true,
    word: '',
};

export const START_GAME_INITIAL_STATE = {
    guessedLetters: [],
    hideStartGameButton: true,
    hideHintButton: false,
    hideGiveUpButton: false,
    gameIsHappening: true,
    hideTries: false,
    hideUseKeyboard: false,
    blanksArray: [],
    messagesDivText: '',
    hideIncorrectLetters: true,
};