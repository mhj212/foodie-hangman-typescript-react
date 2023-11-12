import React, { ReactElement, useState, useEffect } from 'react';
import Button from './parts/Button';
import HangmanDrawing from './parts/HangmanDrawing';
import '../styles/styles.css';
import { DEFAULT_INITIAL_STATE, RESET_STATE, START_GAME_INITIAL_STATE } from './constants/GamePageConstants'
// WURFL detects smartphones, tablets, smart TVs and game consoles
declare global {
    interface Window {
        WURFL: {
            is_mobile: string
        }
    }
}

type GamePageState = {
    guessedLetters: string[],
    hideStartGameButton: boolean,
    gameIsHappening: boolean,
    tries: number,
    answer: string,
    blanksArray: string[],
    hideHintButton: boolean,
    hideGiveUpButton: boolean,
    hideUseKeyboard: boolean,
    hideIncorrectLetters: boolean,
    messagesDivText: string,
    hideTries: boolean,
    word: string,
    hideYesMobileTabletButton: boolean,
    hideNoMobileTabletButton: boolean,
    isMobileOrTablet: string,
    words: string[],
    hintActive: boolean
}

const GamePage: React.FC = () => {
    const [state, setState] = useState<GamePageState>({
        ...DEFAULT_INITIAL_STATE, 
        isMobileOrTablet: window.WURFL.is_mobile // putting this here to capture WURFL on line 7 to 13
    });

    useEffect(() => {
        document.addEventListener("keydown", keyDownEvent, false);

        return function cleanup() {
            document.removeEventListener("keydown", keyDownEvent, false);
        }
    })

    const keyDownEvent = (event: KeyboardEvent) => {
        const noMetaKeysPressed = () => !event.metaKey && !event.ctrlKey && !event.altKey;

        if (noMetaKeysPressed() && state.gameIsHappening) {
            event.preventDefault();
            const input = String.fromCharCode(event.which);
            const guessedLetter = input.toLowerCase();

            if (guessedLetter.match(/[a-z]/)) {
                guessLetter(guessedLetter);
            } else {
                handleInvalidCharacter();
            }
        }
    }

    const openKeyboard = (): void => {
        // This opens the keyboard on a phone
        const inputElement = document.getElementById('hidden-input');
        inputElement.style.visibility = 'visible'; // unhide the input
        inputElement.focus(); // focus on it so keyboard pops up
        inputElement.style.visibility = 'hidden'; // hide it again
    }

    const handleInvalidCharacter = (): void => {
        setState(state => ({ ...state, messagesDivText: 'That character is invalid, please enter a letter!' }));
    }

    const hintFunc = (): void => {
        const toIndex = (_, idx) => idx;
        const stillBlank = (index: number) => state.blanksArray[index] === '-';
        const correctLetter = (index: number) => state.answer[index];

        const hintLetter = getRandomItemFromArray(
            state.blanksArray
                .map(toIndex)
                .filter(stillBlank)
                .map(correctLetter)
        );

        const blanksArray = state.answer.split('')
            .map((char, idx) => {
                if (char === hintLetter) return char;
                return state.blanksArray[idx];
            });

        setState(state => ({
            ...state,
            guessedLetters: state.guessedLetters.concat(hintLetter),
            blanksArray: blanksArray,
            word: blanksArray.join(' '),
            tries: state.tries - 1,
            hintActive: true
        }));
    }

    useEffect((): void => {
        if (state.hintActive && finishedGameFromHint(state)) {
            giveUp();
            setState(state => ({
                ...state,
                hintActive: false
            }))
        } else {
            setState(state => ({
                ...state,
                hintActive: false
            }))
        }
    // Adding below comment bypasses a warning
    // eslint-disable-next-line
    }, [state.hintActive])

    const giveUp = (): void => {
        setState(state => ({
            ...state,
            ...RESET_STATE,
            messagesDivText: "The correct answer was " + state.answer,
            tries: 0
        }));
    }

    const guessLetter = (guess: string): void => {
        if (alreadyGuessedLetter(state, guess)) {
            setState(state => ({
                ...state,
                messagesDivText: 'You already guessed the letter ' + guess,
            }));
        } else if (!isIncorrectGuess(state, guess)) {
            handleCorrectGuess(guess);
        } else {
            handleIncorrectGuess(guess);
        }
    }

    const handleCorrectGuess = (guess: string): void => {
        const guessedLetters = state.guessedLetters.concat(guess);
        const blanksArray = state.answer.split('')
            .map((char, idx) => {
                if (char === guess) return guess;
                return state.blanksArray[idx];
            });
        const word = blanksArray.join(' ');

        setState(state => ({
            ...state,
            messagesDivText: 'The letter ' + guess + ' is in the word!',
            guessedLetters: guessedLetters,
            blanksArray: blanksArray,
            word: word
        }));

        const ifWinnerData = {
            ...state,
            messagesDivText: 'The letter ' + guess + ' is in the word!',
            guessedLetters: guessedLetters,
            blanksArray: blanksArray,
            word: word
        }
        ifWinner(ifWinnerData);
    }

    const handleIncorrectGuess = (guess: string): void => {
        if (onLastTry(state)) {
            giveUp();
        } else {
            setState(state => ({
                ...state,
                messagesDivText: 'The letter ' + guess + ' is not in the word',
                guessedLetters: state.guessedLetters.concat(guess),
                tries: state.tries - 1,
                hideIncorrectLetters: false,
            }));
        }
    }

    const ifWinner = (ifWinnerData: GamePageState): void => {
        if (isWinner(ifWinnerData)) {
            setState({
                ...ifWinnerData,
                ...RESET_STATE,
                messagesDivText: "You are a WINNER!!!",
                tries: 8
            });
        }
    }

    const startGame = (): void => {
        const newAnswer = getRandomItemFromArray(state.words);
        const newBlanksArray = new Array(newAnswer.length).fill(null).map(_ => '-');
        const newWord = newBlanksArray.join(' ');

        setState(state => ({
            ...state,
            ...START_GAME_INITIAL_STATE,
            tries: 8,
            answer: newAnswer,
            blanksArray: newBlanksArray,
            word: newWord
        }));

    }

    const renderTitle = (): ReactElement => {
        return <h1>Foodie Hangman</h1>
    }

    const renderKeyBoardMessage = (): ReactElement => {
        if (isMobileOrTablet(state)) {
            const className = state.hideUseKeyboard ? "hide Btn customSmallerBtn" : "Btn customSmallerBtn";
            return <Button id="keyboard-message-btn" className={className} onClick={openKeyboard} text="Click here to open keyboard" />
        } else {
            const className = state.hideUseKeyboard ? "hide " : "";
            return <div id="keyboard-message" className={className}>Please use the keyboard</div>
        }
    }

    const renderMessages = (): ReactElement => {
        return <div id="messages">{state.messagesDivText}</div>
    }

    const renderWord = (): ReactElement => {
        return <div id="word">{state.word}</div>
    }

    const renderTriesLeftMessage = (): ReactElement => {
        const message = `You have ${state.tries} tries left`;
        const className = state.hideTries ? 'hide' : '';
        return <div id="tries" className={className}>{message}</div>
    }

    const renderIncorrectTriesMessage = (): ReactElement => {
        const className = state.hideIncorrectLetters ? 'hide' : '';
        const incorrectLettersText = calculateIncorrectLettersFromState(state).join(', ');

        return (
            <div id="incorrect-letters" className={className}>
                incorrect letters: <span className="incorrect">{incorrectLettersText}</span>
            </div>
        );
    }

    const renderBreak = (): ReactElement => <br />

    const renderButton = (id: string, className: string, onClick: () => void, text: string): ReactElement => <Button id={id} className={className} onClick={onClick} text={text} />

    const renderHangmanDrawing = (): ReactElement => <HangmanDrawing tries={state.tries} />

    const renderHiddenInputForMobileAndTabletKeyboard = (): ReactElement => {
        if (isMobileOrTablet(state)) {
            return (<input id="hidden-input" type="text"></input>);
        }
    }

    const startButtonClassName: string = state.hideStartGameButton ? "Btn hide" : "Btn";
    const giveUpButtonClassName: string = state.hideGiveUpButton ? "Btn hide" : "Btn";
    const hintButtonClassName: string = state.hideHintButton ? "Btn hide" : "Btn";

    return (
        <div id="container">
            <div id="innerContainer">
                {renderTitle()}
                {renderKeyBoardMessage()}
                {renderHiddenInputForMobileAndTabletKeyboard()}
                {renderBreak()}
                {renderMessages()}
                {renderWord()}
                {renderBreak()}
                {renderTriesLeftMessage()}
                {renderIncorrectTriesMessage()}
                {renderButton("startgame", startButtonClassName, startGame, "Start a new game")}
                {renderButton("giveupbutton", giveUpButtonClassName, giveUp, "Give Up")}
                {renderButton("hintbutton", hintButtonClassName, hintFunc, "Hint")}
                {renderHangmanDrawing()}
            </div>
        </div>
    );
}

export default GamePage;

const incorrectLetter = (state: GamePageState) => (letter: string): boolean => state.answer.indexOf(letter) === -1;

const calculateIncorrectLettersFromState = (state: GamePageState): string[] => state.guessedLetters.filter(incorrectLetter(state))

const isWinner = (state: GamePageState): boolean => state.answer === state.blanksArray.join('');

const alreadyGuessedLetter = (state: GamePageState, guess: string): boolean => state.guessedLetters.indexOf(guess) !== -1;

const isIncorrectGuess = (state: GamePageState, guess: string): boolean => incorrectLetter(state)(guess);

const onLastTry = (state: GamePageState): boolean => state.tries === 1;

const finishedGameFromHint = (state: GamePageState): boolean => state.answer === state.blanksArray.join('') || state.tries === 0;

const getRandomItemFromArray = (array: string[]): string => array[Math.floor(Math.random() * array.length)];

const isMobileOrTablet = (state: GamePageState): string => state.isMobileOrTablet;