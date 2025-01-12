# **Budget Tracker**

A simple React and Next.js-based application for managing budgets and expenses. Users can view their budget, filter expenses by date range, add new expenses, and categorize them using a dropdown populated from an API.

---

## **Features**

1. **View Budget**:
    - Displays the current project budget retrieved from the API.

2. **Filter Expenses**:
    - Filter expenses based on a date range (`from` and `to` fields).

3. **Add New Expenses**:
    - Allows users to add a new expense with the following details:
        - **Date**
        - **Category** (Dropdown populated from an API)
        - **Amount**

4. **Dynamic Category Dropdown**:
    - Populates categories dynamically from an API endpoint (`/api/v1/categories`).
