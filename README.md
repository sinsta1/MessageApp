# Messaging Web Application

A simple messaging web application where customers can submit messages, and agents can view and respond to those messages. The application is built with Go (Golang) for the backend and plain HTML, CSS, and JavaScript for the frontend.

---

## Features
- Customers can submit messages.
- Agents can view all pending messages and respond to them.
- Messages are marked as "responded" once an agent provides a reply.
- Real-time updates for message statuses.

---

## Backend

### Dependencies
- [Go](https://go.dev/)
- [MySQL](https://www.mysql.com/)

### How to Start the Backend
1. **Database Setup**:
   - Create a MySQL database.
   - Import the required schema for the `Messages` and `Responses` tables 
   Run these command on MySql prompt 
   -- Create Messages table
    CREATE TABLE Messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        customer_name VARCHAR(255) NOT NULL,
        customer_email VARCHAR(255),
        message TEXT NOT NULL,
        status ENUM('pending', 'responded') DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    -- Create Responses table
    CREATE TABLE Responses (
        id INT AUTO_INCREMENT PRIMARY KEY,
        message_id INT NOT NULL,
        agent_name VARCHAR(255) NOT NULL,
        response TEXT NOT NULL,
        responded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (message_id) REFERENCES Messages(id) ON DELETE CASCADE
    );

    -- Optional: Create Users table for agent details
    CREATE TABLE Users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL
    );

    Also hard code your database credentials in db/connect.go


2. **Configure Database Connection**:
   - Update the database credentials in `backend/pkg/db/connect.go`.

3. **Run the Backend**:
   ```bash
   cd backend/cmd/messagingApp
   go run main.go

