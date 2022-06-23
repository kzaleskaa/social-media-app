<h1 align="center">Instagram Clone Web App </h1>

## 1. Description
Instagram clone is a project realised during "Web application technologies" course. The application uses a djoser library which is a REST implementation of Django authentication system. JSON Web Token is a selected authentication backend.

## 2. Used technologies
- Backend
    - Python 3.10
    - Django 3.1
    - Django Rest Framework
    - Djoser
- Frontend
    - React
    - React Router v6
    - Redux 
- Database
    - PostgreSQL
  
## 3. Installation
**You will need node and npm installed globally on your machine ([Node.js](https://nodejs.org/en/)).** 
     
Clone this repo and install all required dependencies. Go into the project folder and type the following command:
  ```
  git clone https://github.com/kzaleskaa/instagram-clone.git
  cd instagram-clone
  ```
### 3.1. Frontend setup
1. Install all npm packages
  ```
  npm install
  ```
2. Add .env file with content:
  ```
  REACT_APP_BACKEND=http://127.0.0.1:8000
  REACT_APP_LOCATION_API_URL = <API_URL>
  REACT_APP_LOCATION_API=<API_KEY>
  ```
  API_URL used in project [geoapify](https://api.geoapify.com/v1/geocode/search?text=).
  
3. Run the application
  ```
  npm start
  ```

### 3.2. Backend setup
1. Create your own Python virtual environment
  ```
  python -m venv venv
  ```
2. Activate created environment
  ```
  venv/Scripts/activate
  ```
3. Install all necessary packages
  ```
  pip install -r requirements.txt
  ```
4. Add .env file with content:
  ```
  SECRET_KEY = <DJANGO SECRET KEY>
  
  EMAIL_HOST = <EMAIL_HOST>
  EMAIL_HOST_USER = <EMAIL_ADDRESS>
  EMAIL_HOST_PASSWORD = <PASSWORD_OF_EMAIL_ADDRESS>
  
  DATABASE_NAME = <DATABASE_NAME>  
  DATABASE_USER = <MASTER_USERNAME>
  DATABASE_PASSWORD = <DATABASE_PASSWORD>  
  DATABASE_HOST = <ENDPOINT>
  ```
5. Create superuser to get access to administration site
  ```
  python manage.py createsuperuser
  ```
6. Run backend
  ```
  python manage.py runserver
  ```

## IV. Final effect
<img src="https://user-images.githubusercontent.com/62251989/175347679-81ed47b8-e58e-4cdc-ac3a-a69cdf2228f7.gif" />

## V. Credits
- App icons created by Freepik - [Flaticon](https://www.flaticon.com/free-icons/app)
