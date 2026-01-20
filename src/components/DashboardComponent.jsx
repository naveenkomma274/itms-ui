import React from "react";
import { Card, CardBody, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../App.css";

const DashboardComponent = () => {
  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">DASHBOARDS</h2>
      
      <div className="dashboard-grid">
        <Card className="dashboard-card">
          <CardBody>
            <h5>Create & Assign Tasks</h5>
            <p>Manage tasks efficiently by creating and assigning them.</p>
            <Link to="/manage-tasks"><button className="btn btn-primary">Manage Tasks</button></Link>           
          </CardBody>
        </Card>

        <Card className="dashboard-card">
          <CardBody>
            <h5>Interns Tracker</h5>
            <p>Manage interns efficiently by creating and tracking them.</p>
            <Link to="/manage-interns"><button className="btn btn-primary">Manage Interns</button></Link>
          </CardBody>
        </Card>

        <Card className="dashboard-card">
          <CardBody>
            <h5>Learning & Development</h5>
            <p>Assign and manage courses and training.</p>
            <Link to="/manage-train"><button className="btn btn-primary">Manage Training</button></Link>
          </CardBody>
        </Card>

        <Card className="dashboard-card">
          <CardBody>
            <h5>Project Openings</h5>
            <p>Displaying the List of all available and upcoming projects</p>
            <Link to="/manage-project"><button className="btn btn-primary">Manage Projects</button></Link>
          </CardBody>
        </Card>

        <Card className="dashboard-card">
          <CardBody>
            <h5>Referral Portal</h5>
            <p>List of Recommended profiles for the existing Projects</p>
            <Link to="/manage-referal"><button className="btn btn-primary">Manage Referals</button></Link>
          </CardBody>
        </Card>

        <Card className="dashboard-card">
          <CardBody>
            <h5>Bravo Charlie</h5>
            <p>Appreciate Your Team Members Today</p>
            <Link to="/manage-member"><button className="btn btn-primary">Team Member Appreciation</button></Link>
          </CardBody>
        </Card>

{/*
        <Card className="dashboard-card"> 
          <CardBody>
            <h5>Events & Announcements</h5>
            <p>Displaying the List of all available and upcoming Events</p>
            <Link to="/manage-event"><button className="btn btn-primary">Manage Events</button></Link>
          </CardBody>
        </Card>

        <Card className="dashboard-card">
          <CardBody>
            <h5>Internal Committee</h5>
            <p>List of all Available Committee members for organizing Events</p>
            <Link to="/manage-committee"><button className="btn btn-primary">Manage Committes</button></Link>
          </CardBody>
        </Card>

        <Card className="dashboard-card">
          <CardBody>
            <h5>Notification Scheduler</h5>
            <p>List of scheduled notifications for the upcoming projects, events etc</p>
            <Link to="/manage-notify"><button className="btn btn-primary">Manage Notifications</button></Link>
          </CardBody>
        </Card>
        */}
      </div>
    </div>
  );
};

export default DashboardComponent;
