import { createContext, useState } from "react";
import runChat from "../config/Gemini";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [transcript, setTranscript] = useState('');
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const delayPara = (index, nextWord) => {
        setTimeout(function () {
            setResultData((prev) => prev + nextWord);
        }, 10 * index);
    };

    const newChat = () => {
        setLoading(false);
        setShowResults(false);
    };

    const onSent = async (prompt) => {
        setResultData("");
        prompt = transcript.trim() || input.trim();
        
        if (!prompt) {
            return;
        }

        setLoading(true);
        setShowResults(true);
        let response;

        try {
            response = await runChat(prompt);

            setRecentPrompt(prompt);
            setPrevPrompts(prev => !prev.includes(prompt) ? [prompt, ...prev] : prev);

            let responseArray = response.split("**");
            let newResponse = "";
            for (let i = 0; i < responseArray.length; i++) {
                newResponse += (i === 0 || i % 2 !== 1) ? responseArray[i] : "<b>" + responseArray[i] + "</b>";
            }
            let newResponse2 = newResponse.split("*").join("<br/>");
            let newResponseArray = newResponse2.split("");
            for (let i = 0; i < newResponseArray.length; i++) {
                delayPara(i, newResponseArray[i]);
            }
        } catch (error) {
            console.error("Error while running chat:", error);
        } finally {
            setLoading(false);
            setInput("");
            setTranscript("");
        }
    };

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        input,
        setInput,
        showResults,
        loading,
        resultData,
        newChat,
        transcript,
        setTranscript,
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
