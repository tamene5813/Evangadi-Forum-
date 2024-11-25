const dbConnection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");

// Insert the question into the database
async function askquestion(req, res) {
  const { title, description } = req.body;
  const userId = req.user.userid;
  if (!title || !description) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Failed to ask the question" });
  }
  try {
    const timestamp = new Date(); // Get the current timestamp
    const result = await dbConnection.query(
      "INSERT INTO question (questionid, userid, title, description, tag) VALUES (?, ?, ?, ?, ?)",
      [generateQuestionId(), userId, title, description, title]
    );

    if (result.affectedRows) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: "Failed to ask the question" });
    } else {
      const currentTime = new Date(); // Get the current time
      const timeSinceQuestionAsked = currentTime - timestamp; // Calculate the time difference in milliseconds
    }
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, try again" });
  }
}
function generateQuestionId() {
  const timestamp = new Date().getTime();
  const randomNumber = Math.floor(Math.random() * 1000);
  return `Q-${timestamp}-${randomNumber}`;
}

// red all question
async function readAllQuestion(req, res) {
  const readAllQuestion = `SELECT * FROM question ORDER BY id DESC`;

  try {
    const connection = await dbConnection.getConnection();
    const [result] = await connection.query(readAllQuestion);
    connection.release();
    res.json({ task: result });
  } catch (err) {
    res.send(err.message);
  }
}

// read description and tag of question by questionid
async function readQuestionDetail(req, res) {
  const { questionid } = req.params;

  try {
    const [result] = await dbConnection.query(
      "SELECT tag, description FROM question WHERE questionid = ?",
      [questionid]
    );

    if (result.length === 0) {
      return res
        .status(404)
        .json({ msg: "No details found for this question." });
    } else {
      return res
        .status(200)
        .json({ tag: result[0].tag, description: result[0].description }); // Return only the tag
    }
  } catch (error) {
    console.error("Error fetching tags:", error.message);
    return res.status(500).json({ error: "Something went wrong" });
  }
}

// read single question
async function readQuestion(req, res) {
  const questionid = req.params.questionid;
  const readQuestion = `SELECT * FROM question WHERE questionid='${questionid}'`;

  try {
    const [result] = await dbConnection.query(readQuestion);

    if (result.length === 0) {
      return res.send(`No question with this id ${questionid}`);
    } else {
      return res.json(result);
    }
  } catch (error) {
    return res.send(error.message);
  }
}

// edit question
async function editQuestion(req, res) {
  const id = req.params.id;
  const { title, description } = req.body;

  if (!description) {
    return res.send("question is required");
  }

  const updateQuestion = `UPDATE question SET description="${description}", title="${title}" WHERE id=${id}`;

  try {
    const [result] = await dbConnection.query(updateQuestion);

    if (result.affectedRows == 0) {
      return res.send(`No question with id ${id}`);
    } else {
      return res.json("Question updated");
    }
  } catch (err) {
    return res.send(err.message);
  }
}

// Delete single task
async function deleteQuestion(req, res) {
  const id = req.params.id;
  const deleteQ = `DELETE FROM question WHERE id = ${id}`;

  try {
    await dbConnection.query(deleteQ);
    return res.json("Question deleted");
  } catch (err) {
    return res.send(err.message);
  }
}
// red my question
async function myQuestion(req, res) {
  const userid = req.params.userid;
  const readQuestion = `SELECT * FROM question WHERE userid = ?`;

  try {
    const [result] = await dbConnection.query(readQuestion, [userid]);

    return res.json(result);
  } catch (error) {
    return res.send.status(500).json({ error: "Something went wrong." });
  }
}

// like
async function likeQuestion(req, res) {
  const id = req.params.id;
  const readQuestion = `SELECT * like FROM question WHERE id='${id}'`;

  try {
    const [result] = await dbConnection.query(readQuestion);

    if (result.length === 0) {
      return res.send(`0 likes ${id}`);
    } else {
      return res.json(result++);
    }
  } catch (error) {
    return res.send(error.message);
  }
}
// Update like count for a question
async function likeQuestion(req, res) {
  const { questionid } = req.params.questionid;

  try {
    const result = await dbConnection.query(
      `UPDATE question SET likes = likes + 1 WHERE questionid = ${questionid} `
    );
    res.json({ message: "Like count updated" });
  } catch (error) {
    console.error("Error updating like count:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function dislikeQuestion(req, res) {
  const { questionid } = req.params.questionid;

  try {
    const result = await dbConnection.query(
      `UPDATE question SET dislikes = dislikes + 1 WHERE questionid = ${questionid}`
    );
    res.json({ message: "Dislike count updated" });
  } catch (error) {
    console.error("Error updating dislike count:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
module.exports = {
  askquestion,
  readAllQuestion,
  readQuestion,
  editQuestion,
  deleteQuestion,
  myQuestion,
  likeQuestion,
  dislikeQuestion,
  readQuestionDetail,
};

// CREATE TABEL users(
//     userid INT(20) NOT NULL AUTO_INCREMENT,
//     username VARCHAR(20) NOT NULL,
//     firstname VARCHAR(20) NOT NULL,
//     lastname VARCHAR(20) NOT NULL,
//     email VARCHAR(20) NOT NULL,
//     password VARCHAR(100) NOT NULL,
//     PRIMARY KEY (userid)
// )

// CREATE TABLE question(
//   id INT(20) NOT NULL AUTO_INCREMENT,
//   questionid VARCHAR(100) NOT NULL UNIQUE,
//   userid INT(20) NOT NULL,
//   title VARCHAR(50) NOT NULL,
//   description VARCHAR(200) NOT NULL,
//   tag VARCHAR(20),
//   timestamp datetime,
//   likeS INT(20),
//   dislikes INT(20),
//   PRIMARY KEY (id, questionid),
//   FOREIGN KEY(userid) REFERENCES users(userid)
// );

// CREATE TABLE answers(
//   answerid INT(20) NOT NULL AUTO_INCREMENT ,
//   userid INT(20) NOT NULL,
//   questionid VARCHAR(100) NOT NULL,
//   answer VARCHAR(200) NOT NULL,
//   PRIMARY KEY (answerid),
//   FOREIGN KEY(userid) REFERENCES users(userid),
//   FOREIGN KEY(questionid) REFERENCES question(questionid)
// )

// module.exports = { askquestion };
