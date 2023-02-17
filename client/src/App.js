import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
import Layout from "components/layout";
import Dashboard from "components/dashboard";
import Products from "components/products";
import Customers from "components/customers";
import Transactions from "components/transactions";
import Geography from "components/geography";
import Overview from "components/overview";
import DailyOverview from "components/dailyOverview";
import MonthlyOverview from "components/monthlyOverview";
import Breakdown from "components/breakdown";
import Admins from "components/admins";

function App() {
  const mode = useSelector((state) => state.global.mode)
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />} >
              <Route path="/" element={<Navigate replace to="/dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products" element={<Products /> } />
              <Route path="/customers" element={ <Customers /> } />
              <Route path="/transactions" element={ <Transactions />} />
              <Route path="/geography" element={ <Geography /> }/>
              <Route path="/overview" element={ <Overview /> } />
              <Route path='/daily' element={ <DailyOverview /> } />
              <Route path='/monthly' element={ <MonthlyOverview /> } />
              <Route path='/breakdown' element={ <Breakdown /> }/>
              <Route path='/admin' element={ <Admins /> }/>
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
