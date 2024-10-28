import { useContext } from "react";
// import { useState } from "react";
import { assets } from "../../assets/assets";
import "./main.css";

import { Context } from "../../context/Context";
import React, { useState, useEffect} from "react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';


const Main = ({userName}) => {

    const { transcript, browserSupportsSpeechRecognition, resetTranscript } = useSpeechRecognition();
	const [isListening, setIsListening] = useState(false);
	

	
	// Start listening
	 const startListening = () => {
	   setIsListening(true);
	   setInput(''); // Clear the input field
	   SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
	 };
   
	 // Stop listening
	 const stopListening = () => {
	   setIsListening(false);
	   SpeechRecognition.stopListening();
	   setTranscript(transcript);
	 };
	 
	 // Handle sending input
	 const handleSend = () => {
	   onSent(transcript||input); 
	   setInput(''); 
	   setTranscript('');

	   resetTranscript();
	 }

	 
	
   
    
	


	if (!browserSupportsSpeechRecognition) {
		return null
	  }

	const {
		onSent,
		recentPrompt,
		showResults,
		loading,
		resultData,
		setInput,
		setTranscript,
		input,
	} = useContext(Context);

    const handleCardClick = (promptText) => {
			setInput(promptText);
		};


		// calling user details from backend
	const [profileData, setProfileData] = useState(null); 

    useEffect(() => {
        const fetchProfile = async () => {
			const userId = localStorage.getItem("_id");
			console.log("User ID:", userId); // Check if this is null or valid
		
			if (!userId) {
			  console.error("User ID is missing");
			  return; // Avoid making the request if no _id is present
			}
			try {
                const response = await fetch(`http://localhost:3001/api/auth/user/${localStorage.getItem("_id")}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                });

                const data = await response.json(); 
                console.log(data); 
                setProfileData(data); 

            } catch (err) {
                console.error("Error fetching profile:", err);
            }
        };

        fetchProfile(); 
    }, []); 



	




	return (
        
        
		<div className="main">
			
		<div className="nav">
				<p>nikMinion</p>
				<img src={assets.user} alt="" />
			</div>
			<div className="main-container">
				{!showResults ? (
					<>
						<div className="greet">
							<p>
								<span>Hello, {userName ? userName : "Guest"}  </span>
							</p>
							<p>How Can i Help You Today?</p>
						</div>
						<div className="cards">
							<div
								className="card"
								onClick={() =>
									handleCardClick("Suggest Some Place To Visit In Kerala")
								}
							>
								<p>Suggest Some Place To Visit In Kerala </p>
								<img src={assets.compass_icon} alt="" />
							</div>
							<div
								className="card"
								onClick={() =>
									handleCardClick(
										"Brainstorm team bonding activities for our work retreat"
									)
								}
							>
								<p>Brainstorm team bonding activities for our work retreat </p>
								<img src={assets.message_icon} alt="" />
							</div>
							<div
								className="card"
								onClick={() =>
									handleCardClick("Potato Recipies")
								}
							>
								<p>Potato Recipies</p>
								<img src={assets.bulb_icon} alt="" />
							</div>
							<div
								className="card"
								onClick={() => {
									handleCardClick(
										"Create a Script for the youtube video about coding "
									);
								}}
							>
								<p>Create a Script for the youtube video about coding </p>
								<img src={assets.code_icon} alt="" />
							</div>
						</div>
					</>
				) : (
					<div className="result">
						<div className="result-title">
							<img src={assets.user} alt="" />
							<p>{recentPrompt}</p>
						</div>
						<div className="result-data">
							<img src={assets.gemini_icon} alt="" />
							{loading ? (
								<div className="loader">
									<hr />
									<hr />
									<hr />
								</div>
							) : (
								<p dangerouslySetInnerHTML={{ __html: resultData }}></p>
							)}
						</div>
					</div>
				)}

				<div className="main-bottom">
					<div className="search-box">
					<input
                      type="text"
                      placeholder="Enter the Prompt Here"
                    value={transcript || input} // Choose whichever is non-empty
                    onChange={(e) => {if (transcript) {setTranscript(e.target.value);
                         } else {
                              setInput(e.target.value); }
                                 }}
                               />

						
						<div>

							<img src={assets.gallery_icon} alt="" />

							
							<img
							   src={assets.mic_icon}
							   alt=""
							   onClick={isListening ? stopListening : startListening} />

							


							<img
								src={assets.send_icon}
								alt=""
								onClick={handleSend}
							/>
						</div>
					</div>
					<div className="bottom-info">
						<p>
							I may help you to know everthing you want to know about the wonders of world!
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Main;
