import React from "react";
export default function Question({
    questionText,
    options,
    handleChange,
    selectedArray,
    id,
    actualAnswers,
    quizDone,
}) {
    const selectedAnswer = selectedArray.find((eachSelected) => eachSelected.id === id)?.answer;
    const correctAnswer = actualAnswers.find((eachAnswer) => eachAnswer.id === id)?.answer;
    const optionElements = options.map((option, index) => {
        const isSelected = selectedAnswer === option;
        const isCorrect = correctAnswer === option;
        const optionClass = quizDone ? (isCorrect ? "green" : isSelected ? "red" : "") : (isSelected? "selected" : "");

        return(
        <label
            key={index}
            className={`option ${optionClass}`}>
            <input
                id={id}
                type="radio"
                name={questionText}
                value={option}
                checked={isSelected}
                onChange={(event) => handleChange(event)}
                style={{ display: "none" }}
            />
            {option}
        </label>
        );
    });

    return (
        <div className="question">
            <h3>{questionText}</h3>
            <div className="options">{optionElements}</div>
        </div>
    );
}
