import React, { useContext, useState } from "react";
import Layout from "../Layout/Layout";
import axios from "../../axiosConfig";
import SingleQuestion from "./SingleQuestion";
import classes from "./answer.module.css";
import AnswerTop from "./AnswerTop";
import { useNavigate, useParams } from "react-router-dom";
import { AppState } from "../../App";

const AnswerPage = () => {
  const user = useContext(AppState);
  const { questionid } = useParams();
  const navigate = useNavigate();
  const [answer, setAnswer] = useState("");


  function submitAnswer(e) {
    e.preventDefault();

    if (!answer) {
      alert("Answer can not be empty");
      return
    }
    const token = localStorage.getItem("token");
    try {
      const answerload = {
       answer: answer,
      };
      axios.post(`/answer/giveanswer/${questionid}`, answerload, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      alert("Answer Posted");
      navigate("/home", { msg: "you have poste new Answer" });
    } catch (error) {}
  }



  return (
    <Layout>
      <section className={classes.explained}>
       <AnswerTop/>
        <div>
          <SingleQuestion />
        </div>
        <div className={classes.answer_container}>
          <h1 className={classes.answer_text_gradient}>
            Give a Public Answer
          </h1>

          <form onSubmit={submitAnswer} className="submit">
            <div className={classes.question}>
              <textarea
                name="answer"
                rows="3"
                cols="30"
                placeholder="Answer Content"
                onChange={(e) => setAnswer(e.target.value)}
              ></textarea>
            </div>
            <button type="submit" className={`${classes.nswerButn} butn`}>Submit your Answer</button>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default AnswerPage;
