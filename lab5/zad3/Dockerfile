ARG PYTHON_VERSION=3.7
FROM python:${PYTHON_VERSION}

COPY myapp /myapp

RUN pip install -r /myapp/requirements.txt

CMD ["python", "/myapp/app.py"]