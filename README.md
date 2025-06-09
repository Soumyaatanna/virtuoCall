# VirtuoCall 🎥

VirtuoCall is a real-time video conferencing web application built using **React**, **Socket.IO**, **WebRTC**, and **Material UI**. It enables users to create and join meetings using unique codes, send messages during calls, and maintain a history of their meetings.
##  Live Demo : https://virtuo-call-nlyztfzcg-soumyas-projects-074ffe94.vercel.app/
---

## 🚀 Features

- ✅ Real-time video conferencing via WebRTC
- 💬 In-call chat using Socket.IO
- 🔐 Authentication system (with token storage)
- 📅 Meeting history tracking
- 🧠 Elegant UI built with Material UI
- 🛡️ Protected routes using custom middleware
- 🌐 Fully responsive design

---

## 🛠️ Tech Stack

**Frontend:**
- React.js
- React Router
- Socket.IO Client
- Material UI

**Backend:**
- Node.js
- Express.js
- Socket.IO Server
- MongoDB with Mongoose

---

## 📂 Project Structure
VirtuoCall/
│
├── backend/
│ ├── models/
│ ├── routes/
│ ├── controllers/
│ ├── socket/
│ └── server.js
│
├── frontend/
│ ├── src/
│ │ ├── pages/
│ │ ├── contexts/
│ │ ├── utils/
│ │ └── App.js
│ └── public/
│
├── .env
├── package.json
└── README.md

yaml
Copy
Edit

---

## ⚙️ Environment Variables (`.env`)

env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLIENT_URL=http://localhost:3000
🧪 Getting Started Locally
1. Clone the repository

bash
Copy
Edit
git clone https://github.com/Soumyaatanna/virtuoCall.git
cd virtuoCall
3. Install dependencies

bash
Copy
Edit
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies

cd ../frontend
npm install

3. Set up .env in backend/
   
Fill in your MongoDB URI and JWT secret as described above.


# In one terminal (backend)
cd backend
npm start

# In another terminal (frontend)
cd frontend
npm start
📸 Screenshots
![image](https://github.com/user-attachments/assets/ee984026-af4f-4786-9f2b-485f21aa54b5)



✨ Future Improvements

Recording functionality

Password-protected meetings

Admin moderation tools

🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to fork the repo and open a pull request.

📄 License

This project is licensed under the MIT License.

👤 Author

Soumya Tanna









