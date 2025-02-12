const apiKey = '1d970513410705c2aee167b7deba9f4c7233863d'; // Replace with your Deepgram API key

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('analyzeButton').addEventListener('click', async () => {
        const audioInput = document.getElementById('audio-input').files[0];
        const resultDiv = document.getElementById('result');
        const statusDiv = document.getElementById('status');

        console.log('button clicked');

        if (!audioInput) {
            resultDiv.textContent = 'Please select an audio file.';
            return;
        } else {
            console.log('Selected audio file:', audioInput);
        }

        try {
            statusDiv.innerHTML = '<div class="spinner"></div> Sending request to Deepgram API...';
          
            const arrayBuffer = await audioInput.arrayBuffer();

            console.log('Sending request to Deepgram API...');
            
            // const response = await fetch('https://api.deepgram.com/v1/listen?sentiment=true', {

                const response = await fetch('https://api.deepgram.com/v1/listen?model=nova-2&punctuate=true&sentiment=true', {
                method: 'POST',
                headers: {
                    'Authorization': 'Token 1d970513410705c2aee167b7deba9f4c7233863d',
                    'Content-Type': 'audio/wav'
                },
                body: arrayBuffer
            });

            console.log('Response received from Deepgram API: ');
            statusDiv.innerHTML = '<div class="spinner"></div> Processing data...';
            const data = await response.json();
            console.log('Response data:', data);

            if (!response.ok) {
                console.log('Network response was not ok');
            }

            const sentiment = data.results;
            console.log('Sentiment:', sentiment);  


            const alternatives = sentiment.channels[0].alternatives;
            console.log('Alternatives:', alternatives);
            const words = alternatives[0].words;
            console.log('Words:', words);
            const segments = sentiment.sentiments.segments;
            console.log('Segments:', segments); 

           


            

            resultDiv.innerHTML = '';
            statusDiv.textContent = 'Displaying transcript...';

            segments.forEach((segment, index) => {

                const sentiment_score = sentiment.sentiments.segments[index].sentiment_score;
                console.log(sentiment_score);

                const segmentDiv = document.createElement('div');
                segmentDiv.classList.add('segment');
                segmentDiv.textContent = `Segment ${index + 1}:`;

                const wordsInSegment = segment.text.split(' ');
                console.log('Words in segment:', wordsInSegment);


                for (let j=0; j<wordsInSegment.length; j++) {

                    for (let i = 0; i < words.length; i++) {

                        if(wordsInSegment[j].toLowerCase() === words[i].word) {

                           console.log(" match found --> "+words[i].word);
                           
                            const wordSpan = document.createElement('span');
                            wordSpan.textContent = words[i].word + ' ';
                            if (words[i].confidence > 0.9) {
                                wordSpan.style.color = 'green';
                            } else if (words[i].confidence > 0.7 && words[i].confidence < 0.9) {
                                wordSpan.style.color = 'yellow';
                            } else if (words[i].confidence > 0.5 && words[i].confidence < 0.7){
                                wordSpan.style.color = 'orange';
                            }
                            else{
                                wordSpan.style.color = 'red';
                            }
                            segmentDiv.appendChild(wordSpan);
                            break;
                        }
                        
                    }
                }

                const sentimentTag = document.createElement('span');
                sentimentTag.classList.add('sentiment-tag');


                let emotion = '';


                if (sentiment_score <= -0.85){
                    emotion = 'Rage 😡🔥';
                }else if (sentiment_score <= -0.7){
                    emotion = 'Anger 😠';
                }else if (sentiment_score <= -0.55){
                    emotion = 'Disappointment 😞';
                } else if (sentiment_score <= -0.4){
                    emotion = 'Annoyance 😒';
                }  else if (sentiment_score <= -0.2){
                    emotion = 'Sarcasm 🙃';
                }  else if (sentiment_score <= -0.1){
                    emotion = 'Sadness 😔';
                }  else if (sentiment_score <= 0.1){
                    emotion = 'Neutral 😐';
                }  else if (sentiment_score <= 0.3){
                    emotion = 'Content 🙂';
                }  else if (sentiment_score <= 0.5){
                    emotion = 'Happy 😊';
                }  else if (sentiment_score <= 0.7){
                    emotion = 'Excited 😃';
                }  else if (sentiment_score <= 0.85){
                    emotion = 'Overjoyed 🤩';
                }  else{
                    emotion = 'Extremely Happy 🥳';
                } 

                // sentimentTag.textContent = segment.sentiment;
                sentimentTag.textContent = emotion;
                
                segmentDiv.appendChild(sentimentTag);
                resultDiv.appendChild(segmentDiv);
           
            });


            statusDiv.textContent = 'Analysis complete.';
            
        } catch (error) {
            console.error('Error:', error);
            resultDiv.textContent = `Error: ${error.message}`;
        }
    });
});