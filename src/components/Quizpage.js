import { useEffect, useState } from "react";
import Question from "./Question";

export default function Quizpage(props) {
    const questions = props.questions;
    console.log(questions);

    const [selectedArray, setSelectedArray] = useState([]);
    const [quizDone, setQuizDone] = useState(false);
    const [buttonText, setButtonText] = useState("check");
    const [correctCount, setCorrectCount] = useState(0);
    const [actualAnswers, setActualAnswers] = useState([]);

    useEffect(() => {
        setSelectedArray(
            questions.map((question) => ({
                id: question.id,
                answer: "",
            }))
        );

        setActualAnswers(
            questions.map((eachQuestion) => ({
                answer: eachQuestion.answer,
                id:eachQuestion.id 
                }))
        );
    }, [questions]);


    function handleChange(event) {
        const { value, id } = event.target;
        setSelectedArray((prevArray) =>
            prevArray.map((eachSelected) =>
                eachSelected.id === id
                    ? { ...eachSelected, answer: value }
                    : eachSelected
            )
        );
    }

    function checkAnswers() {
        if (quizDone) {
            setQuizDone(false);
            setButtonText("check");
            setCorrectCount(0);
            setSelectedArray([]);
            props.startNewQuiz();
        } else {
            let count = 0;
            selectedArray.forEach((selected) => {
                const question = questions.find((q) => q.id === selected.id);
                if (
                    question &&
                    question.answer.toLowerCase() ===
                        selected.answer.toLowerCase()
                ) {
                    count = count + 1;
                }
            });
            setCorrectCount(count);
            setQuizDone(true);
            setButtonText("newGame");
        }
    }

    const questionArray = questions.map((eachQuestion) => (
        <Question
            key={eachQuestion.id}
            questionText={eachQuestion.questionText}
            options={eachQuestion.options}
            handleChange={handleChange}
            selectedArray={selectedArray}
            id={eachQuestion.id}
            actualAnswers={actualAnswers}
            quizDone={quizDone}
        />
    ));

    return (
        <div className="quizpage--array">
            {questionArray}
            <div className="quizpage--button">
                {quizDone && <p>you got {correctCount} out of 5</p>}
                <button onClick={checkAnswers}>{buttonText}</button>
            </div>
        </div>
    );
}
