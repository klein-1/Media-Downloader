from flask import Flask, render_template, request, send_file
import yt_dlp
import os

def download_video(url):
    ydl_opts = {
        'format': 'best',
        'outtmpl': 'downloads/%(title).45s.%(ext)s',  # Limit filename length
        'noplaylist': True,
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(url, download=True)
        filename = ydl.prepare_filename(info)

    return filename

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/download', methods=['POST'])
def download():
    url = request.form['url']
    try:
        filepath = download_video(url)
        return send_file(filepath, as_attachment=True)
    except Exception as e:
        return f"Error: {str(e)}"

if __name__ == '__main__':
        os.makedirs('downloads', exist_ok=True)
        app.run(debug=True, host='0.0.0.0', port=8080)