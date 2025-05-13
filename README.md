# Free Indian Banks Data API

## Assignment Submission

**Repository:**  
[https://github.com/Prakash-Nandaniya/Free-Indian-Banks-Data-API](https://github.com/Prakash-Nandaniya/Free-Indian-Banks-Data-API)

**Frontend (API Key Registration & Docs):**  
[https://free-indian-banks-data-api.vercel.app/](https://free-indian-banks-data-api.vercel.app/)

**Backend (API Base URL):**  
[https://free-indian-banks-data-api.onrender.com/](https://free-indian-banks-data-api.onrender.com/api/banks/)

**Database:**
used PostgreSQL database on Supabase plateform

**Time taken to complete:**  
_This assignment was completed in approximately **1.5 days**._

---

## How to Use This API

1. **Get your API key:**  
   - **New user:** Register at [Frontend URL](https://free-indian-banks-data-api.vercel.app/) using the Subscribe button.
   - **Already subscribed:** Retrieve your API key by searching with your email on the same site.

2. **Api-key for Recruiters / Testers:**  
   `MJpXU0B4jVEyyPVVB55cfLp8sRAc-psW3UIGnVuqPMwbxHA5MZZd6zM3sbauPyJh`

3. After getting your API key, use the endpoints described below to get information.
4. Request Format:  `backend_URL/endpoint/?apikey=API_KEY`
5. backend_URL= https://free-indian-banks-data-api.onrender.com
6. Sample Request: https://free-indian-banks-data-api.onrender.com/api/banks/?apikey=YOUR_API_KEY

## Solution Approach & API Overview

To use the API, users must subscribe and obtain an API key via the frontend. For recruiters or those wishing to test quickly, a public API key is provided below. If already subscribed, users can retrieve their API key using their email. All API key management and documentation are available at the [frontend URL](https://free-indian-banks-data-api.vercel.app/).

After obtaining an API key, you can access the following endpoints:

1. **`/api/banks/`**  
   Returns a paginated list of banks.

2. **`/api/branches/<bank_code>/`**  
   Returns a paginated list of all branch of a perticular bank .

3. **`/api/branch/<IFSC code>/`**  
   Returns full details for a specific branch.

**Note:**  
- Request limit is set to 100 requests per minute to prevent DDoS attacks.
- The `/api/banks/` and `/api/branches/<bank_code>/` endpoints return 100 results per page. Use the `next` and `previous` URLs in the response to paginate through large datasets.

---

### Development Process

1. **Planning:**  
   Decided on an API key-based authentication system with request throttling for security and fairness. Planned a React frontend for API key subscription, retrieval, and documentation.

2. **Frontend:**  
   Built with React, allowing new users to subscribe for an API key and existing users to retrieve their key by email. All API documentation is accessible [here](https://free-indian-banks-data-api.vercel.app/).

3. **Backend:**  
   - Set up a PostgreSQL database on Supabase.
   - Connected Django backend to PostgreSQL.
   - Created models for subscribers and banks, along with serializers and views for all endpoints.
   - Implemented API key authentication, rate limiting, and pagination.

4. **Testing:**
   - Verified all core functionalities:
   - For the subscribers app, tested creating new subscribers, retrieving API keys by email, and handling duplicate subscriptions.
   - For the banks endpoints, checked responses for missing, invalid, and valid API keys-all scenarios behaved as expected.
   
6. **Deployment:**  
   - Uploaded the project to GitHub.
   - Hosted the frontend on Vercel and the backend on Render.

---

## Bank API Documentation

### About this API

This API helps you retrieve basic information about banks and their branches in India, such as bank names, branch names, IFSC codes, and branch details.

**API Key Required:**  
All endpoints require an API key as a query parameter:  
`?apikey=YOUR_API_KEY`

---

# 1. /api/banks/               
  - Description: Returns a paginated list of banks and their bank_code (the first 4 characters of the IFSC).

  - Sample Request: "https://free-indian-banks-data-api.onrender.com/api/banks/?apikey=YOUR_API_KEY"

  - Sample Response:

```json
{
    "count": 2,
    "next": null,
    "previous": null,
    "results": [
        {
            "id": 1,
            "name": "State Bank of India",
            "bank_code": "SBIN"
        },
        {
            "id": 2,
            "name": "HDFC Bank",
            "bank_code": "HDFC"
        }
    ]
}
```

# 2. /api/branches/<bank_code>/               
  - Description: Returns all branch names and IFSC codes for the given bank_code.

  - Sample Request: "https://free-indian-banks-data-api.onrender.com/api/branches/SBIN/?apikey=YOUR_API_KEY"

  - Sample Response:

```json
{
    "count": 2,
    "next": null,
    "previous": null,
    "results": [
        {
            "branch": "MAIN BRANCH",
            "ifsc": "SBIN0001234"
        },
        {
            "branch": "CITY BRANCH",
            "ifsc": "SBIN0005678"
        }
    ]
}
```

# 3. /api/branch/<IFSC_code>/               
  - Description: Returns full details for a specific branch.

  - Sample Request: "https://free-indian-banks-data-api.onrender.com/api/branch/SBIN0001234/?apikey=YOUR_API_KEY"

  - Sample Response:

```json
{
    "ifsc": "SBIN0001234",
    "bank": "State Bank of India",
    "branch": "MAIN BRANCH",
    "address": "123 Main St, Mumbai",
    "city": "MUMBAI",
    "district": "MUMBAI",
    "state": "MAHARASHTRA"
}
```


## Acknowledgements

- IFSC and bank data sources: [https://github.com/Amanskywalker/indian_banks](https://github.com/Amanskywalker/indian_banks)
- Built with Django, Django REST Framework, and React.

---

**Enjoy using the Free Indian Banks Data API!**

---

> _This assignment and repository are for evaluation purposes only. No part of this code or data is used in any actual product. No forbidden company names are present in this repository or code._
