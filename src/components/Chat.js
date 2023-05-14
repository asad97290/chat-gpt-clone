import React, {  useState } from "react";
import axios from "axios";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [prompt,setPrompt] = useState("");
  const [loading, isLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setPrompt(event.target.value);
  };


  const handleFormSubmit = async (event) => {
    event.preventDefault();
    isLoading(true)
    if (prompt.trim().length == 0){ alert("please fill the input before submitting"); return}
    let messagesArr = [...messages,{role: "user",content:prompt}]

    try {
      const {data} = await axios.post(
        "https://chat-gpt-clone-seven-coral.vercel.app/api/chat",
        { messages:messagesArr },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      isLoading(false)
      setMessages([...messages,{role: "user",content:prompt},data.response[0].message])
    } catch (error) {
      isLoading(false)
      setError(error.message)
      console.error(error);
    }
  };
  return (
    <>
      <h1>Asad Chat GPT Clone</h1>
    
      <ul className="feed">
        {messages.map((item,key)=>(
          <li key={key}>
            <p className="role">{item.role}</p>
            <p>{item.content}</p>
          </li>
        ))}
      </ul>
      {!loading ? (
        <form onSubmit={handleFormSubmit}>
          <input
            placeholder="Send a message"
            onChange={handleChange}
            id="input"
          />
          <button type="submit">➤</button>
        </form>
      ) : (
        <h3>Thinking...</h3>
      )}
      {error}
    </>
  );
}

export default Chat;
