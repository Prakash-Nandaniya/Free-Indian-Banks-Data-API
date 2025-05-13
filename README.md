# Free Indian Bank Data API

A free API to access IFSC codes, bank names, and branch details for Indian banks.  
Includes a React frontend for easy API key management and documentation.

---

## 🚀 How to Use

### 1. Get Your API Key

- **New user?**  
  Click the **Subscribe** button on the homepage or use the `/api/subscribe/` endpoint to register and receive your API key.

- **Already subscribed?**  
  Click the **Search API Key** button or use the `/api/search-apikey/` endpoint to retrieve your API key by email.

### 2. Use the API

All endpoints require your API key as a query parameter:  
`?apikey=YOUR_API_KEY`

#### **Endpoints**

| Method | Endpoint                                         | Description                               |
|--------|--------------------------------------------------|-------------------------------------------|
| GET    | `/api/banks/?apikey=YOUR_API_KEY`                | List all banks with bank code             |
| GET    | `/api/branches/<bank_code>/?apikey=YOUR_API_KEY` | List all branches for a bank code         |
| GET    | `/api/branch/<ifsc>/?apikey=YOUR_API_KEY`        | Get full details for a branch by IFSC     |

#### **Example Request**

curl "http://127.0.0.1:8000/api/banks/?apikey=YOUR_API_KEY"


---

## 🛠️ Setup & Installation

### 1. Clone the Repository

git clone https://github.com/yourusername/bank-api.git
cd bank-api


### 2. Install Python Dependencies

pip install -r requirements.txt


### 3. Configure Database

- By default, PostgreSQL is used for production and SQLite for testing.
- Edit `config/settings.py` with your DB credentials if needed.

### 4. Run Migrations

python manage.py migrate


### 5. Start the Backend Server

python manage.py runserver


### 6. (Optional) Start the React Frontend

- Go to the frontend directory (if separate) and run:

npm install
npm start


---

## 🧪 Running Tests

All tests use an isolated SQLite database.


python manage.py test


---

## 🗂️ Project Structure


bank-api/
├── banks/ # Bank and branch API app
│ ├── models.py
│ ├── views.py
│ ├── urls.py
│ ├── tests.py
│ └── ...
├── subscribers/ # API key subscription and search app
│ ├── models.py
│ ├── views.py
│ ├── urls.py
│ ├── tests.py
│ └── ...
├── config/ # Django project settings
│ ├── settings.py
│ ├── urls.py
│ └── ...
├── frontend/ # React frontend (if present)
│ ├── src/
│ └── ...
├── manage.py
└── requirements.txt



---

## 📚 API Documentation

- See the **Documentation** section in the web UI for full API details, parameters, and example requests/responses.

---

## ⚡ Features

- Free, open access to Indian bank and branch data
- API key authentication
- Easy subscription and key retrieval
- Well-tested with isolated test database
- Clean React frontend for docs and key management

---

## 🤝 Contributing

Pull requests and issues are welcome!  
Please open an issue to discuss your idea or bug before submitting a PR.

---

## 📄 License

MIT License

---

## 🙏 Acknowledgements

- IFSC and bank data sources: [RBI](https://www.rbi.org.in/), [Open Government Data Platform India](https://data.gov.in/)
- Built with Django, Django REST Framework, and React.

---

**Enjoy using the Free Indian Bank Data API!**
