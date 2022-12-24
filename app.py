from sqlite3 import SQLITE_CREATE_TRIGGER
from turtle import title
from flask import *
from re import X
from tkinter import Y
from matplotlib.pyplot import title
import numpy as np
from flask import Flask, redirect, url_for,render_template
app=Flask(__name__)     #初始化app
@app.route("/")
def index():
   return render_template("index.html")
if __name__ == '__main__':
    app.run(debug=True)


