import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import HeaderComponent from "./components/HeaderComponent";
import DashboardComponent from "./components/DashboardComponent";
import FooterComponent from "./components/FooterComponent";
import TaskList from "./components/TaskList";
import InternList from "./components/InternList";
import TrainingList from "./components/TrainingList";
import ProjectList from "./components/ProjectList";
import ReferalList from "./components/ReferalList";
import EventList from "./components/EventList";
import CommitteeList from "./components/CommitteeList";
import AwardList from "./components/AwardList"; // Import the AwardList component
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/reset.css";

function App() {
  return (
    <GoogleOAuthProvider clientId="62696308286-s9e3lnejd9k3s53qe19v2ch2mouraiuf.apps.googleusercontent.com">
        <HeaderComponent />
        <Routes>
          <Route path="/" element={<DashboardComponent />} />
          <Route path="/manage-tasks" element={<TaskList />} />
          <Route path="/manage-interns" element={<InternList />} />
          <Route path="/manage-train" element={<TrainingList />} />
          <Route path="/manage-project" element={<ProjectList />} />
          <Route path="/manage-referal" element={<ReferalList />} />
          <Route path="/manage-event" element={<EventList />} />
          <Route path="/manage-committee" element={<CommitteeList />} />
          <Route path="/manage-member" element={<AwardList />} />
        </Routes>
        <FooterComponent />
    </GoogleOAuthProvider>
  );
}

export default App;