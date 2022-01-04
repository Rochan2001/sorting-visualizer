from flask import Flask, redirect, url_for, render_template, request, send_from_directory 
app = Flask(__name__)

sorts = [
            "quicksort", "bubblesort", "selectionsort", "insertionsort", "heapsort", "mergesort"
        ]

@app.route("/")
def home():
    return render_template("index.html")


@app.route('/<int:sort_id>')
def sort(sort_id):
    return render_template(f'sorts/{sorts[sort_id]}.html')
