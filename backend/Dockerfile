FROM python:3.12-slim

WORKDIR /app

RUN pip install flask flask_sqlalchemy pymysql python-dotenv flask-cors

COPY . .

EXPOSE 5000

CMD [ "python", "main.py" ]