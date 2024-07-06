import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = 5000;

// Để lưu trữ dữ liệu biểu mẫu
let formDataStore = [];

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Xử lý request POST từ React frontend
app.post('/submit', (req, res) => {
    const formData = req.body;

    // Thêm formData vào mảng formDataStore
    formDataStore.push(formData);

    // Phản hồi thành công với thông báo
    res.status(200).send('Form data submitted successfully');
});

app.get('/formData', (req, res) => {
    // Trả về dữ liệu biểu mẫu đã lưu trữ
    res.status(200).json(formDataStore);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
