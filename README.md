# **Budget Tracker**

A simple React and Next.js-based application for managing budgets and expenses. Users can view their budget, filter expenses by date range, add new expenses, and categorize them using a dropdown populated from an API.

---

## **Features**

1. **View Budget**:
    - Displays the current project budget retrieved from the API.
    - Allows users to input the total budget of their project.

2. **Filter Expenses**:
    - Filter expenses based on a date range (`from` and `to` fields).

3. **Add New Expenses**:
    - Allows users to add a new expense with the following details:
        - **Date**
        - **Category** (Dropdown populated from an API)
        - **Amount**

4. **Dynamic Category Dropdown**:
    - Populates categories dynamically from an API endpoint (`/api/v1/categories`).

--- 

## **Folder Structure**

```graphql
budget-tracker-ui/
├── app/
│   ├── lib/
│   │   ├── definitions.ts   # TypeScript object definitions
│   │   ├── data.ts          # Data-fetching and API logic
│   │   └── utils.ts         # Utility functions for date handling
│   ├── ui/
│   │   ├── Budget.tsx       # Budget display component
│   │   └── Expenses.tsx     # Expenses table and form component
│   ├── page.tsx             # Root page containing the logic of the application
│   ├── layour.tsx           # Root layout of the application
│   └── global.css           # Global .css definition
├── package.json
├── tsconfig.json
├── README.md
```
---

## **Usage**

Clone this repository locally by running
```shell
  git clone https://github.com/maxflowers89/budget-tracker-ui.git
```

Move into the newly created folder
```shell
  cd budget-tracker-ui
```

To start the application is necessary to have Node.js installed on the machine. If it is not, please follow 
the instruction at [this link](https://nodejs.org/en/download) to download and install it.

Once it's done, run the following commands
```shell
  npm install
  npm run dev
```

The application will be exposed locally at the URL specified in the terminal, e.g. http://localhost:3000


