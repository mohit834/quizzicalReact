export default function QuizStartpage(props) {
    return (
        <div className="quizStartPage--container">
            <h1>Quizzical</h1>
            <p>Just have fun</p>
            <button className="quizStartPage--start" onClick={props.startQuiz}>
                start Quiz
            </button>
        </div>
    );
}
