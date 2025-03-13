import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import AddEmployee from "./components/addEmployee/AddEmployee";
import AddProduct from "./components/addProduct/AddProduct";
import AddProject from "./components/addProject/AddProject";
import AddVendor from "./components/addVendor/AddVendor";
import AssignEmployee from "./components/assignEmployee/AssignEmployee";
import ForgotPassword from "./components/forgotPassword/ForgotPassword";
import LoginComponent from "./components/loginComponent/LoginComponent";
import Overview from "./components/overview/Overview";
import ProductLedger from "./components/productLedger/ProductLedger";
import ReleaseEmployee from "./components/releaseEmployee/ReleaseEmployee";
import BankAccounts from "./screens/BankAccounts";
import CashSupply from "./screens/CashSupply";
import Categories from "./screens/Categories";
import Dashboard from "./screens/Dashboard";
import EmployeeLedger from "./screens/EmployeeLedger";
import EmployeeRoles from "./screens/EmployeeRoles";
import EmployeeSalary from "./screens/EmployeeSalary";
import EmployeeWages from "./screens/EmployeeWages";
import Employees from "./screens/Employees";
import Expense from "./screens/Expense";
import InventoryPurchase from "./screens/InventoryPurchase";
import InventoryPurchaseHistory from "./screens/InventoryPurchaseHistory";
import Login from "./screens/Login";
import ProductAssign from "./screens/ProductAssign";
import ProductAssignHistory from "./screens/ProductAssignHistory";
import Products from "./screens/Products";
import ProjectStates from "./screens/ProjectStates";
import Projects from "./screens/Projects";
import Vendors from "./screens/Vendors";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer autoClose={3000} transition:Slide />
      <Routes>
        <Route exact path="/" element={<Login />}>
          <Route index element={<LoginComponent />} />
          <Route exact path="/forget-password" element={<ForgotPassword />} />
        </Route>
        <Route exact path="/dashboard" element={<Dashboard />}>
          <Route index element={<Overview />} />
          <Route exact path="categories" element={<Categories />} />
          <Route exact path="products" element={<Products />}>
            <Route
              exact
              path="history/:productId"
              element={<ProductLedger />}
            />
          </Route>
          <Route exact path="add-product" element={<AddProduct />} />
          <Route
            exact
            path="inventory-purchase"
            element={<InventoryPurchase />}
          />
          <Route exact path="all-vendors" element={<Vendors />} />
          <Route exact path="add-vendor" element={<AddVendor />} />
          <Route exact path="employee-roles" element={<EmployeeRoles />} />
          <Route exact path="all-employees" element={<Employees />} />
          <Route exact path="add-employee" element={<AddEmployee />} />
          <Route exact path="project-states" element={<ProjectStates />} />
          <Route exact path="projects" element={<Projects />}>
            <Route
              exact
              path="assign-employee/:projectId"
              element={<AssignEmployee />}
            />
            <Route
              exact
              path="release-employee/:projectId"
              element={<ReleaseEmployee />}
            />
          </Route>
          <Route
            exact
            path="projects/assign-product"
            element={<ProductAssign />}
          />
          <Route exact path="add-project" element={<AddProject />} />
          <Route
            exact
            path="projects/assign-history"
            element={<ProductAssignHistory />}
          />
          <Route
            exact
            path="projects/employee-wages"
            element={<EmployeeWages />}
          />
          <Route exact path="employee-ledger" element={<EmployeeLedger />} />
          <Route
            exact
            path="inventory-purchase-history"
            element={<InventoryPurchaseHistory />}
          />
          <Route
            exact
            path="projects/supply-cash"
            element={<CashSupply />}
          ></Route>
          <Route exact path="accounts" element={<BankAccounts />}></Route>
          <Route exact path="employee-salary" element={<EmployeeSalary />} />
          <Route exact path="expense" element={<Expense />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
