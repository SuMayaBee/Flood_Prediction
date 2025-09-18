# FloodShield
Bangladesh, as a downstream community, faces frequent and severe floods that impact thousands of lives every year. We at MonsoonFive are proud to present FloodShield, a tool designed to predict upcoming floods, provide real-time updates on rising water levels, and offer detailed flood maps. Our admin dashboard allows researchers to contribute flood forecasting data. FloodShield integrates satellite data from NASA's MODIS and Landsat, along with real-time information from the BWDB (Bangladesh Water Development Board). The best part? All information from FloodShield is free and publicly available, ensuring data transparency and accessibility for everyone, empowering communities to make informed decisions and act quickly during critical times.


https://github.com/user-attachments/assets/a4101581-745b-4299-b681-80d699e3017d




[See Video](https://drive.google.com/drive/folders/1JVqyAR8XK3m_PDUUbaEEH38yZK_kyzs0) ||
[Live Website](https://flood-shield.vercel.app)

## Run This Project Locally

Clone the project

```bash
  git clone https://github.com/Waliulislamnohan/Flood_shield
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```


start the server

```bash
  npm run dev
```



# Project Details
## What is it?
FloodShield addresses the critical challenge of community mapping in flood-prone areas. By creating an innovative flood prediction and alert system, we harness NASA's open-source historical flood data to empower communities. Our platform visualizes real-time water levels across Bangladesh through an interactive map, highlighting recent, danger, and peak water levels from various stations. With the ability to predict floods up to 15 days in advance, FloodShield gives people the time they need to take action. The system also includes a chatbot for personalized flood predictions and an admin panel for researchers to upload data, promoting transparency and informed decision-making.

### Why this is relevant or important?
FloodShield tackles the urgent global challenge of rising flood frequency and severity driven by climate change. With millions of lives disrupted annually, our project provides a critical solution to enhance community resilience and preparedness. By leveraging NASA's open-source historical datasets, FloodShield empowers communities to anticipate flooding events and take preventive measures, ultimately saving lives and reducing economic losses.
<br>
<img width="762" alt="Screenshot 2024-10-05 113914" src="https://github.com/user-attachments/assets/84cdd5ae-75ab-45c8-9bc0-9038b08fabd9">

<br>

# Project Features

## Realtime Flood Prediction
Our platform features an intuitive map of Bangladesh that displays real-time flood data from various water stations. Users can easily visualize recent, danger, and highest water levels, making it simple to assess flood risks in their area.
- Green Represents Safe
- Yellow Represents Wanring
- Red Represents Danger
<img width="762" alt="image" src="https://github.com/user-attachments/assets/387d10e1-b351-4fb8-a868-97f458c2bb51">

## Layer Section
- Population & Flood Layer 2019
<img width="762" alt="FloodAndPop2019" src="https://github.com/user-attachments/assets/73c900eb-5195-40b5-862e-26823eec673a">

- Population & Flood Layer 2020
<img width="767" alt="FloodAndPop2020" src="https://github.com/user-attachments/assets/34fa40af-9c8a-497b-9125-a942136f4fa8">

- Population & Flood Layer 2021
<img width="770" alt="FloodAndPop2021" src="https://github.com/user-attachments/assets/329ee716-cb4e-4aec-8e34-6073e0dd47e8">

## Prediction Chart & Table
<img src="https://github.com/user-attachments/assets/046e694d-bb20-45b4-89c7-edf5db1b3cd6" alt="table" width="770"/>

## Data Transparency
An admin panel allows researchers to upload and manage data, ensuring transparency and promoting trust in the information being shared.
<img width="770" alt="AdminPanel" src="https://github.com/user-attachments/assets/4fea9d41-c990-4c31-ba9d-50f34975c1e5">

## AI Chatbot Interaction
We integrated Artificial Intelligence into our project to enhance user interaction and data accessibility. Our AI-powered chatbot provides real-time communication with users, answering their questions about flood predictions and offering guidance on safety measures. This allows users to receive timely, personalized assistance, improving their understanding of the flood risks and empowering them to take proactive action.
<img width="770" alt="ChatbotPlusMap" src="https://github.com/user-attachments/assets/1c49c96f-0267-4503-9392-c7e77d038150">


## Building and Training the LSTM Model
Independent Models: The water flow dynamics of the Jamuna river are very different from the Surma river. Therefore, you should train one separate LSTM model for each of the 122 water stations. This allows each model to become a specialist for its specific location.

- Data Scaling: Neural networks work best when input data is scaled, typically to a range between 0 and 1. You will use a MinMaxScaler from scikit-learn for this.

- Structuring for LSTM: The LSTM layer in libraries like TensorFlow/Keras expects input in a specific 3D shape: (samples, timesteps, features).

- samples: The number of data points (rows) in your dataset.

- timesteps: The length of your input sequence (in our case, 30 days).

- features: The number of features you are using for each day (e.g., Avg_Water_Level, Day_of_Year, lags, etc.).

- Model Architecture: A simple but effective architecture would be:

An LSTM layer with 50 or 100 units to learn the temporal patterns.

A Dense layer (a standard fully connected layer) to consolidate the learned features.

An Output layer with 15 neurons, one for each day of the 15-day forecast.

Training: You will train the model to minimize the difference between its 15-day prediction and the actual 15 days of water levels from your historical data. The Mean Squared Error (MSE) is a common loss function for this type of regression problem.


