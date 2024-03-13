#!/bin/bash
export FLASK_APP=$HOME/coding_base/griffon_dore/backend/app.py
source $(pipenv --venv)/bin/activate
flask --debug run -h 0.0.0.0 