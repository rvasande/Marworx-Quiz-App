import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./component/Header";
import Footer from "./component/Footer";
import LoginScreen from "./screen/LoginScreen";
import RegisterScreen from "./screen/RegisterScreen";
import HomeScreen from "./screen/HomeScreen";
import QuizScreen from "./screen/QuizScreen";
import PrivateRoute from "./component/PrivateRoute";
import AdminPrivateRoute from "./component/AdminPrivateRoute";
import QuizQuestionsScreen from "./screen/QuizQuestionsScreen";
import AdminDashboard from "./screen/admin/AdminDashboard";
import ProfileScreen from "./screen/ProfileScreen";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route
          path="/quiz"
          element={
            <PrivateRoute>
              <QuizScreen />
            </PrivateRoute>
          }
        />
        <Route
          path="/quiz/:quizId"
          element={
            <PrivateRoute>
              <QuizQuestionsScreen />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfileScreen />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <AdminPrivateRoute>
              <AdminDashboard />
            </AdminPrivateRoute>
          }
        />
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
