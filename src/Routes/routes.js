import React from "react";
import { Navigate } from "react-router-dom";

//Dashboard
import Dashboard from "../Pages/Dashboard";

// Import Calender
import Calender from "../Pages/Calender";


// Import E-mail
import EmailCompose from "../Pages/E-mail/EmailCompose";
import Inbox from "../Pages/E-mail/Inbox";
import ReadEmail from "../Pages/E-mail/ReadEmail";

// Import Authentication pages
import ForgetPasswordPage from "../Pages/Authentication/ForgetPassword";
import Login from "../Pages/Authentication/Login";
import Logout from "../Pages/Authentication/Logout";
import Register from "../Pages/Authentication/Register";
import UserProfile from "../Pages/Authentication/user-profile";

// Import Authentication Inner Pages
import LockScreen from "../Pages/AuthenticationPages/LockScreen";
import Login1 from "../Pages/AuthenticationPages/Login";
import RecoverPassword from "../Pages/AuthenticationPages/RecoverPassword";
import Register1 from "../Pages/AuthenticationPages/Register";

// Import Utility Pages
import ComingSoon from "../Pages/Utility/ComingSoon-Page";
import Error404 from "../Pages/Utility/Error404-Page";
import Error500 from "../Pages/Utility/Error500-Page";
import FAQs from "../Pages/Utility/FAQs-Page";
import Maintenance from "../Pages/Utility/Maintenance-Page";
import Pricing from "../Pages/Utility/Pricing-Page";
import StarterPage from "../Pages/Utility/Starter-Page";
import TimeLine from "../Pages/Utility/TimeLine-Page";

// Import UIElement Pages
import UiAlerts from "../Pages/UiElements/UiAlerts";
import UiBadge from "../Pages/UiElements/UiBadge";
import UiBreadcrumb from "../Pages/UiElements/UiBreadcrumb";
import UiButtons from "../Pages/UiElements/UiButtons";
import UiCards from "../Pages/UiElements/UiCards";
import UiCarousel from "../Pages/UiElements/UiCarousel";
import UiDropdown from "../Pages/UiElements/UiDropdowns";
import UiGrid from "../Pages/UiElements/UiGrid";
import UiImages from "../Pages/UiElements/UiImages";
import UiLightbox from "../Pages/UiElements/UiLightbox";
import UiModals from "../Pages/UiElements/UiModals";
import UiOffcanvas from "../Pages/UiElements/UiOffcanvas";
import UiPagination from "../Pages/UiElements/UiPagination";
import UiPlaceholders from "../Pages/UiElements/UiPlaceholders";
import UiPopovers from "../Pages/UiElements/UiPopovers&Tooltips";
import UiProgressBars from "../Pages/UiElements/UiProgressBars";
import UiRangeSlider from "../Pages/UiElements/UiRangeSlider";
import UiRating from "../Pages/UiElements/UiRating";
import UiSessionTimeout from "../Pages/UiElements/UiSessionTimeout";
import UiTabs from "../Pages/UiElements/UiTabs&Accordions";
import UiToasts from "../Pages/UiElements/UiToasts";
import UiTypography from "../Pages/UiElements/UiTypography";
import UiVideo from "../Pages/UiElements/UiVideo";

// Import Forms

// Import Tables
import BasicTable from "../Pages/Tables/BasicTable.js";
import DataTable from "../Pages/Tables/DataTables/DataTables";


// Import Charts
import ChartJs from "../Pages/Charts/ChartjsCharts";
import FloatChart from "../Pages/Charts/FloatCharts";
import JknobCharts from "../Pages/Charts/JqueryKnobCharts";
import Sparklinechart from "../Pages/Charts/SparklineCharts";

// Import Icon Pages
import IconBoxicons from "../Pages/Icons/IconBoxicons";
import IconDripicons from "../Pages/Icons/IconDrip";
import IconFontawesome from "../Pages/Icons/IconFontAwesome";
import IconMaterialdesign from "../Pages/Icons/IconMaterialdesign";

// Import Map Pages
import GoogleMap from "../Pages/Maps/GoogleMap";
import VectorMaps from "../Pages/Maps/VectorMap";

import Genealogy from "../Pages/Charts/Genealogy.js";


import FromEditUsers from "../Pages/Forms/FromEditUsers.js";
import UsersList from "../Pages/Tables/UsersList.js";


import FormAddCity from "../Pages/Forms/FormAddCity.js";
import FormAddUser from "../Pages/Forms/FormAddUser.js";
import FormEditCity from "../Pages/Forms/FormEditCity.js";
import CityList from "../Pages/Tables/CityList.js";
import FormAddTreatments from "../Pages/Forms/FormAddTreatments.js";
import ListTreatments from "../Pages/Tables/ListTreatments.js";
import FormEditTreatments from "../Pages/Forms/FormEditTreatments.js";
import FromEditTreatmentss from "../Pages/Forms/FormEditTreatments.js";
import FormAddConditions from "../Pages/Forms/FormAddConditions.js";
import ListConditions from "../Pages/Tables/ListConditions.js";
import FormEditConditions from "../Pages/Forms/FormEditConditions.js";
import FormAddHospital from "../Pages/Forms/FormAddHospital.js";
import ListHospitals from "../Pages/Tables/ListHospitals.js";
import FormVIewHospitals from "../Pages/Forms/FormVIewHospitals.js";
import FormEditHospital from "../Pages/Forms/FormEditHospital.js";
import FormAddDoctor from "../Pages/Forms/FormAddDoctor.js";
import ListDoctors from "../Pages/Tables/ListDoctors.js";
import FormEditDoctor from "../Pages/Forms/FormEditDoctor.js";
import FormViewDoctor from "../Pages/Forms/FormViewDoctor.js";
import ListAppointment from "../Pages/Tables/ListAppointment.js";
import ListAccountDetails from "../Pages/Tables/ListAccountDetails.js";
import FormAddBanner from "../Pages/Forms/FormAddBanner.js";
import ListBanner from "../Pages/Tables/ListBanner.js";
import FormEditBanner from "../Pages/Forms/FormEditBanner.js";
import ListDoctorRefferals from "../Pages/Tables/ListDoctorRefferals.js";
import FormAddPartner from "../Pages/Forms/FormAddPartner.js";
import ListPartner from "../Pages/Tables/ListPartner.js";
import FormEditPartner from "../Pages/Forms/FormEditPartner.js";



const authProtectedRoutes = [
  //dashboard
  { path: "/dashboard", component: <Dashboard /> },

  // Calender
  { path: "/calendar", component: <Calender /> },

  // Profile
  { path: "/userprofile", component: <UserProfile /> },

  // E-mail
  { path: "/inbox", component: <Inbox /> },
  { path: "/read-email", component: <ReadEmail /> },
  { path: "/compose-email", component: <EmailCompose /> },

  // Utility Pages
  { path: "/pages-starter", component: <StarterPage /> },
  { path: "/pages-timeline", component: <TimeLine /> },
  { path: "/pages-faqs", component: <FAQs /> },
  { path: "/pages-pricing", component: <Pricing /> },

  // UiElements Pages
  { path: "/ui-alerts", component: <UiAlerts /> },
  { path: "/ui-badge", component: <UiBadge /> },
  { path: "/ui-breadcrumb", component: <UiBreadcrumb /> },
  { path: "/ui-buttons", component: <UiButtons /> },
  { path: "/ui-cards", component: <UiCards /> },
  { path: "/ui-carousel", component: <UiCarousel /> },
  { path: "/ui-dropdowns", component: <UiDropdown /> },
  { path: "/ui-grid", component: <UiGrid /> },
  { path: "/ui-images", component: <UiImages /> },
  { path: "/ui-lightbox", component: <UiLightbox /> },
  { path: "/ui-modals", component: <UiModals /> },
  { path: "/ui-offcanvas", component: <UiOffcanvas /> },
  { path: "/ui-rangeslider", component: <UiRangeSlider /> },
  { path: "/ui-sessiontimeout", component: <UiSessionTimeout /> },
  { path: "/ui-pagination", component: <UiPagination /> },
  { path: "/ui-progressbars", component: <UiProgressBars /> },
  { path: "/ui-placeholders", component: <UiPlaceholders /> },
  { path: "/ui-tabs-accordions", component: <UiTabs /> },
  { path: "/ui-typography", component: <UiTypography /> },
  { path: "/ui-toasts", component: <UiToasts /> },
  { path: "/ui-video", component: <UiVideo /> },
  { path: "/ui-popovers", component: <UiPopovers /> },
  { path: "/ui-rating", component: <UiRating /> },

  // Forms pages
  { path: "/add-city", component: <FormAddCity /> },
  { path: "/getall-city", component: <CityList /> },
  { path: "/edit-city/:id", component: <FormEditCity /> },
 
  { path: "/add-users", component: <FormAddUser /> },
  { path: "/list-users", component: <UsersList /> },
  { path: "/edit-user/:id", component: <FromEditUsers /> },

  { path: "/add-treatments", component: <FormAddTreatments /> },
  { path: "/list-treatments", component: <ListTreatments /> },
  { path: "/edit-treatments/:id", component: <FormEditTreatments /> },

  
  { path: "/add-conditions", component: <FormAddConditions /> },
  { path: "/list-conditions", component: <ListConditions /> },
  { path: "/edit-conditions/:id", component: <FormEditConditions /> },


  { path: "/add-hospital", component: <FormAddHospital /> },
  { path: "/list-hospital", component: <ListHospitals /> },
  { path: "/edit-hospital/:id", component: <FormEditHospital /> },
  { path: "/view-hospital/:id", component: <FormVIewHospitals /> },


  { path: "/add-doctor", component: <FormAddDoctor /> },
  { path: "/list-doctor", component: <ListDoctors /> },
  { path: "/edit-doctor/:id", component: <FormEditDoctor /> },
  { path: "/view-doctor/:id", component: <FormViewDoctor /> },

  { path: "/add-partner", component: <FormAddPartner /> },
  { path: "/list-partner", component: <ListPartner /> },
  { path: "/edit-partner/:id", component: <FormEditPartner /> },

  { path: "/list-appointments", component: <ListAppointment /> },
  { path: "/list-doctorrefferals", component: <ListDoctorRefferals /> },
  { path: "/list-comissions", component: <ListAccountDetails /> },
  

  { path: "/add-banner", component: <FormAddBanner /> },
  { path: "/list-banner", component: <ListBanner /> },
  { path: "/edit-banners/:id", component: <FormEditBanner /> },

  { path: "/tables-basic", component: <BasicTable /> },
  { path: "/table-datatables", component: <DataTable /> },

  // Charts Pages
  { path: "/chart-genealogy", component: <Genealogy /> },
  { path: "/chart-chartjscharts", component: <ChartJs /> },
  { path: "/chart-floatcharts", component: <FloatChart /> },
  { path: "/chart-jknobcharts", component: <JknobCharts /> },
  { path: "/chart-sparklinecharts", component: <Sparklinechart /> },

  // Icons Pages
  { path: "/icon-boxicon", component: <IconBoxicons /> },
  { path: "/icons-materialdesign", component: <IconMaterialdesign /> },
  { path: "/icons-fontawesome", component: <IconFontawesome /> },
  { path: "/icon-dripicons", component: <IconDripicons /> },

  // Maps Pages
  { path: "/maps-vector", component: <VectorMaps /> },
  { path: "/maps-google", component: <GoogleMap /> },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  {
    path: "/",
    exact: true,
    component: <Navigate to="/dashboard" />,
  },
];

const publicRoutes = [

  // Authentication Page
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },

 
  { path: "/forgot-password", component: <ForgetPasswordPage /> },
  { path: "/register", component: <Register /> },

  // Authentication Inner Pages
  { path: "/auth-login", component: <Login1 /> },
  { path: "/auth-register", component: <Register1 /> },
  { path: "/auth-recoverpw", component: <RecoverPassword /> },
  { path: "/auth-lock-screen", component: <LockScreen /> },

  // Utility Pages
  { path: "/pages-404", component: <Error404 /> },
  { path: "/pages-500", component: <Error500 /> },
  { path: "/pages-maintenance", component: <Maintenance /> },
  { path: "/pages-comingsoon", component: <ComingSoon /> },
];

export { authProtectedRoutes, publicRoutes };
