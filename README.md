# โปรแกรมสำหรับแสดงสถานะการทำงานของ GPU (การ์ดจอ) แบบเรียลไทม์ผ่านหน้าเว็บ

## คุณสมบัติ

-   แสดงข้อมูลการ์ดจอ: ชื่อรุ่น, อุณหภูมิ, การใช้งาน (Load), และการใช้หน่วยความจำ (Memory)
-   อัปเดตข้อมูลอัตโนมัติทุกๆ 5 วินาที
-   หน้าจอสีดำ (Dark Theme) สบายตา
-   มีแถบ Progress Bar เพื่อให้ดูข้อมูลได้ง่าย
-   แสดง IP Address ของเครื่องเซิร์ฟเวอร์ที่ส่วนท้ายของหน้า

## เทคโนโลยีที่ใช้

-   **Backend (ฝั่งเซิร์ฟเวอร์):** Python, FastAPI, GPUtil
-   **Frontend (ฝั่งหน้าเว็บ):** React.js

## การติดตั้งและใช้งาน

### สิ่งที่ต้องมีก่อนติดตั้ง

-   **Python 3.8+**: คุณจำเป็นต้องติดตั้ง Python บนเครื่องคอมพิวเตอร์ของคุณ สามารถดาวน์โหลดได้ที่ [python.org](https://www.python.org/downloads/)
-   **Node.js และ npm**: สำหรับการติดตั้งและรันโปรเจคฝั่ง Frontend สามารถดาวน์โหลดได้ที่ [nodejs.org](https://nodejs.org/)

### ขั้นตอนการติดตั้ง

1.  **ติดตั้ง Dependencies ฝั่ง Backend (Python):**
    -   **คัดลอกโปรเจค (Clone):**
        ```bash
        git clone <your-repository-url>
        cd GPU_monitor
        ```
    -   **สร้างและเปิดใช้งาน Virtual Environment:**
        ```bash
        python -m venv venv
        .\venv\Scripts\activate  # สำหรับ Windows
        # source venv/bin/activate  # สำหรับ macOS/Linux
        ```
    -   **ติดตั้ง Library ที่จำเป็น:**
        ```bash
        pip install -r requirements.txt
        ```

2.  **ติดตั้ง Dependencies ฝั่ง Frontend (React):**
    เข้าไปที่โฟลเดอร์ `frontend` แล้วรันคำสั่ง:
    ```bash
    cd frontend
    npm install
    ```

### ขั้นตอนการรันโปรแกรม

1.  **Build โปรเจค React:**
    (หลังจากติดตั้ง dependencies ในข้อ 2 แล้ว) ในโฟลเดอร์ `frontend` ให้รันคำสั่ง:
    ```bash
    npm run build
    ```
    ขั้นตอนนี้จะสร้างไฟล์สำหรับหน้าเว็บไว้ในโฟลเดอร์ `frontend/build`

2.  **รันเซิร์ฟเวอร์ Python:**
    กลับมาที่โฟลเดอร์หลักของโปรเจค แล้วรันคำสั่ง:
    ```bash
    python app.py
    ```

3.  **เปิดดูผลลัพธ์:**
    เปิดเว็บเบราว์เซอร์ (เช่น Chrome, Firefox) แล้วเข้าไปที่ URL:
    ```
    http://localhost:5001
