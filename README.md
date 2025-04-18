
# Money Transfer API

Đây là API RESTful chuyển tiền được xây dựng bằng **LoopBack 4**.

---

## Tính năng 

- Chuyển tiền từ tài khoản này sang tài khoản khác
- kiểm tra điều kiện trong việc giao dịch
- Ghi nhật ký giao dịch
- Sử dụng quan hệ để lấy thông tin người gửi

---

## Cấu trúc thư mục

```
src/
├── controllers/
│   └── money-transfer.controller.ts
├── models/
│   ├── account.model.ts
│   ├── user.model.ts
│   └── transaction.model.ts
├── datasources/
│    └──pgdb.datasource.ts
├── repositories/
│   ├── account.repository.ts
│   ├── user.repository.ts
│   └── transaction.repository.ts
├── migrate.ts
```

---

## Cài đặt

```bash
git clone <>
cd money-transfer-api
npm install
```

Cập nhật cấu hình dữ liệu trong `src/datasources`.

---

## chạy cơ sở dữ liệu

```bash
npm run migrate
```

Nếu muốn thêm dữ liệu trực tiếp có thể điều chỉnh file `migrate.ts`.

---

## ✅ API 

### POST `/transfer`

#### Dữ liệu truyền

```json
{
  "fromAccountId": 1,
  "toAccountId": 2,
  "amount": 50000
}
```

#### Success Response

```json
"Success"
```

#### Error Response

```json
{
  "error": "Insufficient balance"
}
```

---

## ⚠️ Notes

- Tránh sử dụng `include` khi cập nhật mô hình. Nó có thể thêm các thuộc tính không bền vững vào phiên bản mô hình.
- Chỉ sử dụng `findById` với `include` để đọc dữ liệu, không phải để cập nhật
---

