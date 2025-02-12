# Sentiment Analysis App

This project is a simple web application that utilizes the Deepgram sentiment analysis tool to analyze the sentiment of a given paragraph. Users can input text, and the application will return the sentiment result.

## Project Structure

```
sentiment-analysis-app
├── src
│   ├── index.html       # Main HTML document
│   ├── styles.css       # Styles for the application
│   └── app.js           # JavaScript code for handling user interactions
├── README.md            # Documentation for the project
└── package.json         # Configuration file for npm
```

## Getting Started

To set up and run the application, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd sentiment-analysis-app
   ```

2. **Install dependencies:**
   Make sure you have Node.js installed. Then run:
   ```bash
   npm install
   ```

3. **Open the application:**
   Open `src/index.html` in your web browser to view the application.

## Usage

1. Enter a paragraph in the text area provided.
2. Click the "Analyze Sentiment" button.
3. The sentiment result will be displayed below the input area.

## Deepgram API Integration

This application uses the Deepgram API for sentiment analysis. You will need to sign up for a Deepgram account and obtain an API key. Make sure to include your API key in the `app.js` file where the API requests are made.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.