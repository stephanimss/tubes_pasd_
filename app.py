from flask import Flask, render_template, request, redirect, session, url_for

app = Flask(__name__)
app.secret_key = 'secret'

@app.route('/')
def index():
    return render_template('index.html')

# Login murid berdasarkan nama unik
@app.route('/siswa', methods=['GET', 'POST'])
def siswa_login():
    if request.method == 'POST':
        nama = request.form.get('nama').strip()
        if not nama:
            return render_template('siswa_login.html', error="Nama tidak boleh kosong.")
        
        # Simpan ke session
        session['nama'] = nama
        
        # Cek apakah nama sudah pernah dipakai
        if 'registered_names' not in session:
            session['registered_names'] = []
        
        # Tambahkan hanya jika belum terdaftar
        if nama not in session['registered_names']:
            session['registered_names'].append(nama)
            session.modified = True

        return redirect('/siswa_menu')
    return render_template('siswa_login.html', error=None)


@app.route('/siswa_menu')
def siswa_menu():
    if 'nama' not in session:
        return redirect('/siswa')

    nama = session['nama']
    pendaftar_nama_list = [p['nama'] for p in session.get('pendaftar_list', [])]
    return render_template('siswa_menu.html', nama=nama, registered_names=session['registered_names'], pendaftar_nama_list=pendaftar_nama_list)


@app.route('/daftar', methods=['GET', 'POST'])
def daftar():
    if 'nama' not in session:
        return redirect('/siswa')

    if request.method == 'POST':
        data = {
            'nama': session['nama'],
            'matematika': int(request.form['matematika']),
            'ipa': int(request.form['ipa']),
            'ips': int(request.form['ips']),
            'bindo': int(request.form['bindo']),
            'jarak': float(request.form['jarak']),
        }
        if 'pendaftar_list' not in session:
            session['pendaftar_list'] = []
        session['pendaftar_list'].append(data)
        session.modified = True
        return redirect('/siswa_menu')
    return render_template('daftar.html')

@app.route('/simulasi', methods=['GET', 'POST'])
def simulasi():
    if 'nama' not in session:
        return redirect('/siswa')

    nama = session['nama']

    # ✅ Jika belum ada, buat sebagai dictionary
    if 'simulasi_histori' not in session or not isinstance(session['simulasi_histori'], dict):
        session['simulasi_histori'] = {}

    # ✅ Inisialisasi histori untuk nama tersebut jika belum ada
    if nama not in session['simulasi_histori']:
        session['simulasi_histori'][nama] = []

    if request.method == 'POST':
        data = {
            'matematika': int(request.form['matematika']),
            'ipa': int(request.form['ipa']),
            'ips': int(request.form['ips']),
            'bindo': int(request.form['bindo']),
        }
        rata_rata = sum(data.values()) / 4
        hasil = 'Diterima' if rata_rata > 65 else 'Ditolak'
        data['hasil'] = hasil

        session['simulasi_histori'][nama].append(data)
        session.modified = True
        return render_template('simulasi.html', hasil=hasil, histori=session['simulasi_histori'][nama])

    return render_template('simulasi.html', hasil=None, histori=session['simulasi_histori'][nama])


@app.route('/guru', methods=['GET', 'POST'])
def guru_login():
    if request.method == 'POST':
        kode = request.form.get('kode')
        if kode == 'gr':
            return redirect('/pendaftar')
    return render_template('guru_login.html')

@app.route('/pendaftar')
def lihat_pendaftar():
    data = session.get('pendaftar_list', [])
    return render_template('pendaftar.html', data=data)

if __name__ == "__main__":
    app.run(debug=True)
