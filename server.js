const app = require('./src/app');

const PORT = process.env.PORT || 5000;

app.listen(PORT,'0.0.0.0' , () => {
  console.log(`Server chạy trên cổng ${PORT}`);
});