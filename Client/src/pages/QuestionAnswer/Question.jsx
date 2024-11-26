import { useState } from "react";
import "./questionAnswer.css";
import Layout from "../Layout/Layout";
import axios from "../../axiosConfig";
import { useNavigate } from "react-router-dom";
import { BsCheck2Square } from "react-icons/bs";
import img from "../../assets/stick_figure_sit_in_question_mark_300_nwm (1).jpg";

const Question = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [discription, setDiscription] = useState("");

  function submitQuestion(e) {
    e.preventDefault();

    if (!title || !discription) {
      alert("Question title or Discrtiption can not be empty");
      return;
    }
    const token = localStorage.getItem("token");
    try {
      const askload = {
        title: title,
        description: discription,
      };
      axios.post("/questions/ask-questions", askload, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      alert("Question asked");
      navigate("/home", { msg: "you have poste new queston" });
    } catch (error) {}
  }

  return (
    <Layout>
      <section className="explained">
        <div className="evan_net_exp">
          <div className="title">
            <h1>Question Page</h1>
            <small>A place to grow together</small>
          </div>
        </div>
        <div className="question_steps">
          <div className="img_contener">
            <img src={img} alt="" />
          </div>
          <div className="step_listes">
            <h1>Steps To Write a Good Question</h1>
            <ul>
              <li>
                <span>
                  <BsCheck2Square size={23} color="#2ca87d" />
                </span>
                Describe your problem in more detail.
              </li>
              <li>
                <span>
                  <BsCheck2Square size={23} color="#2ca87d" />
                </span>{" "}
                Summarize your problem in a one-line title.
              </li>
              <li>
                <span>
                  <BsCheck2Square size={23} color="#2ca87d" />
                </span>
                Describe what you tried and what you expected to happen.
              </li>
              <li>
                <span>
                  <BsCheck2Square size={23} color="#2ca87d" />
                </span>
                Review your question and post it to the site.
              </li>
            </ul>
          </div>

          <hr />
        </div>
        <div className="ask_container">
          <h1 className="text-gradient">Ask a Public Question</h1>

          <form action="" onSubmit={submitQuestion}>
            <div className="title_contener">
              <input
                className="title_input"
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Title"
              />
            </div>
            <div className="question">
              <textarea
                onChange={(e) => setDiscription(e.target.value)}
                id="bio"
                name="bio"
                rows="3"
                cols="30"
                placeholder="Question Content"
              ></textarea>
            </div>
            <button className="butn" type="submit">
              Post your Question
            </button>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default Question;
