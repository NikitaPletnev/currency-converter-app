
# **Currency Conversion API**

This is a currency conversion API built with **NestJS**, **GraphQL**, and a **React** frontend. It allows users to convert between currencies using real-time exchange rates. The conversion data is logged using **InfluxDB**, and metrics are visualized using **Grafana**.

---

## **Features**

- Convert between currencies with real-time exchange rates.
- GraphQL API for currency conversion queries.
- React frontend to interact with the API.
- Logs conversion data to InfluxDB for tracking.
- Grafana integration for metrics visualization.
- Full API validation using DTOs in NestJS.
- Error handling for invalid currency codes.

---

## **Tech Stack**

- **Frontend**: React, TypeScript
- **Backend**: NestJS, TypeScript, GraphQL
- **Database**: InfluxDB for logging and time-series data
- **Monitoring**: Grafana for data visualization
- **Containerization**: Docker (Optional)

---

## **Installation**

### **Backend Setup (Without Docker)**

1. Clone the repository:

   ```bash
   git clone https://github.com/NikitaPletnev/currency-converter-app.git
   cd currency-conversion-app/backend
   ```

2. Install backend dependencies:

   ```bash
   npm install
   ```

3. Set up the environment variables. Create a `.env` file in the root of the `backend` directory with the following variables:

   ```bash
   SWOP_API_KEY=your_swop_api_key
   INFLUXDB_URL=http://localhost:8087
   INFLUXDB_TOKEN=your_influxdb_token
   INFLUXDB_ORG=your_org_name
   INFLUXDB_BUCKET=currency_conversions
   ```

4. **Ensure InfluxDB is running** (if not using Docker, you'll need to install and configure InfluxDB locally).

   - Install InfluxDB: https://docs.influxdata.com/influxdb/v2.0/install/
   - Start InfluxDB:
     ```bash
     influxd
     ```
   - Access InfluxDB at `http://localhost:8087` and set up your bucket, token, and organization.

5. Start the backend server:

   ```bash
   npm run start:dev
   ```

The backend should now be running at `http://localhost:4000`.

---

### **Frontend Setup (Without Docker)**

1. Navigate to the frontend directory:

   ```bash
   cd ../frontend
   ```

2. Install frontend dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables in the `frontend/.env` file:

   ```bash
   REACT_APP_GRAPHQL_URL=http://localhost:4000/graphql
   ```

4. Start the frontend development server:

   ```bash
   npm start
   ```

The frontend should now be running at `http://localhost:3300`.

---

## **Usage**

Once both the backend and frontend servers are running, you can access the frontend at:

```
http://localhost:3300
```

The frontend will interact with the backend GraphQL API at:

```
http://localhost:4000/graphql
```

---

## **Endpoints**

### GraphQL Endpoint:

```
POST /graphql
```

This endpoint allows users to perform currency conversion queries. The full URL is `http://localhost:4000/graphql`.

---

## **Testing**

You can run unit and end-to-end (e2e) tests using Jest for the backend.

1. Run **unit tests**:

   ```bash
   npm run test
   ```

2. Run **end-to-end tests**:

   ```bash
   npm run test:e2e
   ```

3. Run **test coverage**:

   ```bash
   npm run test:cov
   ```

---

## **Docker Setup**

If you prefer to use Docker, you can build and run both the frontend and backend using `docker-compose`. Follow these steps:

1. Make sure Docker is installed and running on your system.

2. Build and run the containers using `docker-compose`:

   ```bash
   docker-compose up --build
   ```

3. Access the services:

   - **Frontend**: [http://localhost:3002](http://localhost:3002)
   - **Backend (GraphQL)**: [http://localhost:4000/graphql](http://localhost:4000/graphql)
   - **InfluxDB**: [http://localhost:8087](http://localhost:8087)
   - **Grafana**: [http://localhost:3001](http://localhost:3001)

---

## **Additional Notes**

- The build with docker is unstable and some integrations may conflict with each other and may not provide access, so I still recommend running the frontend and backend in developer mode

---
