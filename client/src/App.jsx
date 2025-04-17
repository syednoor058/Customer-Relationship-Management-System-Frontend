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
import AccountLedger from "./screens/AccountLedger";
import AddBankAccount from "./screens/AddBankAccount";
import AddCustomer from "./screens/AddCustomer";
import AddUsers from "./screens/AddUsers";
import BankAccounts from "./screens/BankAccounts";
import BankDetails from "./screens/BankDetails";
import CashLedger from "./screens/CashLedger";
import CashSupply from "./screens/CashSupply";
import Categories from "./screens/Categories";
import CategoryDetails from "./screens/CategoryDetails";
import CompleteInfo from "./screens/CompleteInfo";
import CompletedProjects from "./screens/CompletedProjects";
import CustomerDetails from "./screens/CustomerDetails";
import Customers from "./screens/Customers";
import Dashboard from "./screens/Dashboard";
import EditBankDetails from "./screens/EditBankDetails";
import EditCategory from "./screens/EditCategory";
import EditProducts from "./screens/EditProducts";
import EditProjectDetails from "./screens/EditProjectDetails";
import EditUser from "./screens/EditUser";
import EmployeeLedger from "./screens/EmployeeLedger";
import EmployeeReports from "./screens/EmployeeReports";
import EmployeeRoles from "./screens/EmployeeRoles";
import EmployeeSalary from "./screens/EmployeeSalary";
import EmployeeWages from "./screens/EmployeeWages";
import Employees from "./screens/Employees";
import Expense from "./screens/Expense";
import InventoryPurchase from "./screens/InventoryPurchase";
import InventoryPurchaseHistory from "./screens/InventoryPurchaseHistory";
import ProductAssign from "./screens/ProductAssign";
import ProductAssignHistory from "./screens/ProductAssignHistory";
import ProductDetails from "./screens/ProductDetails";
import Products from "./screens/Products";
import ProjectDetails from "./screens/ProjectDetails";
import ProjectExpense from "./screens/ProjectExpense";
import ProjectReport from "./screens/ProjectReport";
import ProjectReport2 from "./screens/ProjectReport2";
import ProjectStates from "./screens/ProjectStates";
import Projects from "./screens/Projects";
import UserDetails from "./screens/UserDetails";
import Users from "./screens/Users";
import VendorLedger from "./screens/VendorLedger";
import Vendors from "./screens/Vendors";
import VendorsPayment from "./screens/VendorsPayment";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer autoClose={3000} transition:Slide />
      <Routes>
        <Route exact path="/" element={<LoginComponent />} />
        <Route exact path="/forget-password" element={<ForgotPassword />} />
        <Route exact path="/dashboard" element={<Dashboard />}>
          <Route index element={<Overview />} />
          <Route exact path="categories" element={<Categories />} />
          <Route exact path="users" element={<Users />} />
          <Route exact path="users/details/:userId" element={<UserDetails />} />
          <Route exact path="users/edit-user/:userId" element={<EditUser />} />
          <Route exact path="add-user" element={<AddUsers />} />
          <Route exact path="products" element={<Products />}>
            <Route
              exact
              path="history/:productId"
              element={<ProductLedger />}
            />
          </Route>
          <Route
            exact
            path="products/edit-product/:productId"
            element={<EditProducts />}
          />
          <Route
            exact
            path="categories/details/:categoryId"
            element={<CategoryDetails />}
          />
          <Route
            exact
            path="categories/edit-category/:categoryId"
            element={<EditCategory />}
          />
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
          <Route exact path="employee-wages" element={<EmployeeWages />} />
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
          <Route exact path="vendors/payment" element={<VendorsPayment />} />
          <Route exact path="vendors/ledger" element={<VendorLedger />} />
          <Route exact path="projects/expense" element={<ProjectExpense />} />
          <Route
            exact
            path="accounts/details/:bankId"
            element={<BankDetails />}
          />
          <Route
            exact
            path="accounts/edit/:bankId"
            element={<EditBankDetails />}
          />
          <Route
            exact
            path="accounts/add-account"
            element={<AddBankAccount />}
          />
          <Route exact path="accounts/ledger" element={<AccountLedger />} />
          <Route exact path="cash-ledger" element={<CashLedger />} />
          <Route
            exact
            path="projects/details/:projectId"
            element={<ProjectDetails />}
          />
          <Route
            exact
            path="projects/edit/:projectId"
            element={<EditProjectDetails />}
          />
          <Route exact path="customers" element={<Customers />} />
          <Route
            exact
            path="customers/details/:customerId"
            element={<CustomerDetails />}
          />
          <Route
            exact
            path="customers/add-customer"
            element={<AddCustomer />}
          />
          <Route
            exact
            path="projects/completed"
            element={<CompletedProjects />}
          />
          <Route
            exact
            path="projects/completed/info"
            element={<CompleteInfo />}
          />
          <Route
            exact
            path="products/details/:productId"
            element={<ProductDetails />}
          />
          <Route exact path="projects/ledger" element={<ProjectReport />} />
          <Route exact path="reports/project" element={<ProjectReport2 />} />
          <Route exact path="reports/employee" element={<EmployeeReports />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
