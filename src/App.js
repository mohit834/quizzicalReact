import "./App.css";
import QuizStartpage from "./components/QuizStartpage";
import { useEffect, useState } from "react";
import Quizpage from "./components/Quizpage";
import { nanoid } from "nanoid";
import he from "he";

function App() {
    const [quizStartpage, setQuizStartpage] = useState(true);
    const [questions, setQuestions] = useState([]);
    const [QuizCount, setQuizCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function getQuestions() {
            const MAX_RETRIES = 3;
            let attempts = 0;
            setLoading(true);
            setError(null);
            while (attempts < MAX_RETRIES) {
                try {
                    const res = await fetch(
                        "https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple"
                    );
                    if (!res.ok) {
                        throw new Error(`HTTP error! status : ${res.status}`);
                    }
                    const data = await res.json();
                    console.log(data);
                    const newQ = data.results?.map((eachQuestion) => {
                        const dq = he.decode(eachQuestion.question);
                        const dca = he.decode(eachQuestion.correct_answer);
                        const dica = eachQuestion.incorrect_answers.map(
                            (incorrect) => he.decode(incorrect)
                        );
                        const allOptions = [...dica, dca];
                        allOptions.sort(() => Math.random() - 0.5);

                        return {
                            id: nanoid(),
                            questionText: dq,
                            options: allOptions,
                            answer: dca,
                        };
                    });
                    setQuestions(newQ);
                    setLoading(false);
                    return;
                } catch (error) {
                    attempts += 1;
                    console.log(
                        "Fetching questions failed Attempt:",
                        attempts,
                        error
                    );
                    if (attempts >= MAX_RETRIES) {
                        setError(
                            "Failed to fetch quiz questions. please try again later."
                        );
                        setLoading(false);
                    }
                }
            }
        }
        getQuestions();
    }, [QuizCount]);

    function startQuiz() {
        setQuizStartpage(false);
    }

    function startNewQuiz() {
        setQuizCount((prevCount) => prevCount + 1);
    }

    return (
        <div className="App">
            {quizStartpage ? (
                <QuizStartpage startQuiz={startQuiz} />
            ) : (
                <Quizpage questions={questions} startNewQuiz={startNewQuiz} />
            )}

            <img
                src="yellowBlob.png"
                className="blob yellowBlob"
                alt="yellowBlob"
            ></img>
            <img
                src="blueBlob.png"
                className="blob blueBlob"
                alt="blueBlob"
            ></img>
        </div>
    );
}

export default App;
