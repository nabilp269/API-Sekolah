const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const bodyParser = require('body-parser');

const swaggerDocument = YAML.load('./swagger.yaml');
const app = express();
app.use(bodyParser.json());

// Dummy data siswa
let siswa = [
  {
    id: 1,
    nama: "Budi Santoso",
    kelas: "XII SIJA 2",
    jurusan: "Sistem Informasi Jaringan dan Aplikasi",
    angkatan: 2025,
    alamat: "Jl. Mawar No.10, Sidoarjo",
    nomor_telepon: "081234567890",
    email: "budi@example.com",
    tanggal_lahir: "2007-09-26",
    jenis_kelamin: "Laki-laki"
  }
];

// Route Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Endpoint API
app.get('/halo', (req, res) => {
  res.json({ pesan: "Halo dari API Sekolah!" });
});

app.get('/siswa', (req, res) => {
  res.json(siswa);
});

app.get('/siswa/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const data = siswa.find(s => s.id === id);
  if (data) res.json(data);
  else res.status(404).json({ pesan: "Siswa tidak ditemukan" });
});

app.post('/siswa', (req, res) => {
  const newSiswa = { id: siswa.length + 1, ...req.body };
  siswa.push(newSiswa);
  res.status(201).json(newSiswa);
});

app.put('/siswa/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = siswa.findIndex(s => s.id === id);
  if (index !== -1) {
    siswa[index] = { id, ...req.body };
    res.json(siswa[index]);
  } else {
    res.status(404).json({ pesan: "Siswa tidak ditemukan" });
  }
});

app.delete('/siswa/:id', (req, res) => {
  const id = parseInt(req.params.id);
  siswa = siswa.filter(s => s.id !== id);
  res.status(204).send();
});

app.listen(3000, () => console.log('✅ Swagger UI aktif di http://localhost:3000/api-docs'));
