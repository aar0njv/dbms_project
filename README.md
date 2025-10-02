# Ezygo+ : Smart Attendance Dashboard

**Ezygo+** is a web-based attendance tracking and analysis platform designed specifically for students under the KTU (APJ Abdul Kalam Technological University) curriculum. It provides students with a dynamic, personalized dashboard to monitor their subject-wise attendance in real-time, helping them stay informed about their academic eligibility and status.

---

##  Core Features

* **Dynamic Dashboard:** Personalized display showing subject-wise attendance statistics upon login.
* **Target Comparison:** Calculates the exact number of classes a student needs to **attend** or can **bunk** to meet a user-defined target percentage (e.g., 75%, 80%).
* **Interactive Updation:** Simple interface allowing students to select a subject and save their daily attendance records to the database.
* **Real-Time Reflection:** Changes saved in the updation component are immediately reflected in the attendance summary without needing a page refresh.
* **Secure Authentication:** User session management via Supabase ensures each student can only view and manage their own data.

---

##  Tech Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | **React.js (Vite)** | The core UI framework for building the single-page application. |
| **Backend/DB** | **Supabase** | Provides a PostgreSQL database, secure password hashing, and real-time API. |
| **Styling** | **CSS3** | Custom styling for a modern, dark-themed user interface. |
| **Routing** | **React Router DOM** | Handles seamless navigation between the Auth page and the Dashboard. |

---