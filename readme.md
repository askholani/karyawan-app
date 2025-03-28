# **Project Structure & Tech Stack**

## **Frontend**

### **Folder Structure**

```
/core
  ├── entities       # Data models or domain entities
  ├── use-cases      # Business logic and application use cases

/repositories        # API calls and data handling
/pages              # Page components for routing
/components         # Reusable UI components
```

### **Technology Stack**

- **React JS 19** – Modern frontend framework
- **React Hook Form** – Form handling and validation
- **Yup Validation** – Schema-based form validation
- **SweetAlert2** – User-friendly alert pop-ups
- **Bootstrap** – UI styling framework

---

## **Backend**

### **Folder Structure**

```
/domain
  ├── entities       # Data models or domain entities
  ├── use-cases      # Business logic and application use cases

/infrastructure
  ├── models        # Database models (Sequelize)
  ├── repositories  # Data access layer

/interface
  ├── controllers   # Request handlers and business logic integration
  ├── routes        # API endpoint definitions
```

### **Technology Stack**

- **Express.js** – Fast and minimal web framework for Node.js
- **Yup Validation** – Schema validation for input data
- **Bcrypt** – Password hashing for security
- **Sequelize** – ORM for database interaction
- **PostgreSQL** – Relational database for data storage

---
