import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((questions) => setQuestions(questions));
  }, []);

  function handleDeletedQuestion(deletedQuestion){
    const updatedQuestion = questions.filter((question) => question.id !== deletedQuestion.id)
    setQuestions(updatedQuestion)
  }

  function handleUpdatedQuestion(updatedQuestion){
    console.log("Updated question received:", updatedQuestion)
    const updatedQuestions = questions.map((question) => {
      if (question.id === updatedQuestion.id){
        return updatedQuestion
      } else {
        return question;
      }
    })

    console.log("Updated questions array:", updatedQuestions)
    setQuestions(updatedQuestions)
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <QuestionItem key={question.id} question={question} onDeleteQuestion={handleDeletedQuestion} onUpdateQuestion={handleUpdatedQuestion} />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
