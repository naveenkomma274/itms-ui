import React, { useState } from "react";
import EmailService from "../services/EmailService";

const AwardList = () => {
  const [formData, setFormData] = useState({
    name: "",
    mailTo: "",
    mailCc: "",
    mailBcc: "",
    mailSubject: "",
    mailContent: "",
    awardType: "",
    contentTitle: "", // just used for dropdown selection
  });

  const contentDescriptions = {
    "Appreciation Letter for Good Work":
      "I wanted to take a moment to express my sincere appreciation for the outstanding work you consistently deliver. Your dedication, attention to detail, and commitment to excellence do not go unnoticed. Your contributions have played a pivotal role in our success, and we are grateful to have you on our team.",
    "Appreciation Letter for Work Anniversary":
      "As we celebrate your [mention number of years] work anniversary with our company, I wanted to take a moment to express my gratitude for your dedication and commitment. Your loyalty and hard work have not only contributed to your personal growth but have also been instrumental in our company's success. We look forward to many more years of working together and achieving new milestones. Congratulations, and thank you for your continued excellence!",
    "Appreciation Letter for Support":
      "I want to express my gratitude for your unwavering support during [project]. Your willingness to go above and beyond to help the team and ensure its success has been truly remarkable. Your support is invaluable, and we couldn’t have done it without you.",
    "Appreciation Letter for Customer Service":
      "I wanted to take a moment to express my sincere appreciation for your exceptional dedication to our customer service team. Your ability to connect with customers on a personal level and consistently provide exceptional service is truly remarkable. Your willingness to go the extra mile with each client doesn’t go unnoticed. Thank you for being an invaluable part of our team. Your attitude and dedication significantly impact in [project].",
    "Appreciation Letter for Outstanding Performance":
      "I wanted to recognize your exceptional performance over the past few days during [project]. Your dedication, commitment, and consistent high-quality work have made a significant impact on our team and the company as a whole. Keep up the fantastic work!",
    "Appreciation Letter for Teamwork":
      "Your collaborative spirit and teamwork have been crucial in achieving [project]. Your ability to work seamlessly with the team and contribute to a positive team dynamic is commendable. Thank you for being a valuable team player.",
    "Appreciation Letter for Dedication":
      "Your dedication to your role and the company’s mission is an inspiration to us all. Your consistent commitment to our goals has not only contributed to our success but has also set a high standard for others to follow.",
    "Appreciation Letter for Project Achievement":
      "I wanted to express my appreciation for your role in successfully completing the [project]. Your hard work, expertise, and ability to overcome challenges were instrumental in its success. Thank you for your dedication to excellence.",
    "Appreciation Letter for Career Achievement":
      "Congratulations on [recent career achievement]! Your dedication, continuous learning, and perseverance have led you to this significant milestone. We are proud to have been a part of your journey and look forward to your continued success.",
    "Appreciation Letter for Employee Appreciation Day":
      "On this special day, I want to take a moment to express my gratitude for your hard work, dedication, and contributions. Your efforts drive our success, and we truly value your presence on our team. Happy Employee Appreciation Day!",
    "Appreciation Letter for Stepping In":
      "As we celebrate your work anniversary with our company, I wanted to take a moment to express my gratitude for your dedication and commitment. Your loyalty and hard work have not only contributed to your personal growth but have also been instrumental in our company's success. We look forward to many more years of working together and achieving new milestones. Congratulations, and thank you for your continued excellence!",
    "Appreciation Letter for Being Reliable":
      "Reliability is a trait that is often underestimated but highly valued. I wanted to acknowledge and appreciate your unwavering reliability in all your tasks and responsibilities. Your consistent performance and ability to be counted on in any situation have made a significant impact on our team's success. Your dedication to reliability sets a high standard for us all and is truly commendable. Thank you for being a dependable and trustworthy team member.",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "contentTitle") {
      setFormData((prevData) => ({
        ...prevData,
        contentTitle: value,
        mailSubject: `${value} Employee`,
        mailContent: contentDescriptions[value] || "",
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit button clicked");
    console.log("Form data to be sent:", formData);
  
    try {
      const response = await EmailService.sendEmail(formData);
      console.log("Email sent successfully:", response);
      alert("Email sent successfully!");
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email. Please try again.");
    }
  };
  

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Team Member Appreciation Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Recipient Email</label>
          <input
            type="email"
            className="form-control"
            name="mailTo"
            value={formData.mailTo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">CC</label>
          <input
            type="text"
            className="form-control"
            name="mailCc"
            value={formData.mailCc}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">BCC</label>
          <input
            type="text"
            className="form-control"
            name="mailBcc"
            value={formData.mailBcc}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email Subject</label>
          <input
            type="text"
            className="form-control"
            name="mailSubject"
            value={formData.mailSubject}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Content Title</label>
          <select
            className="form-select"
            name="contentTitle"
            value={formData.contentTitle}
            onChange={handleChange}
            required
          >
            <option value="">Select Content Title</option>
            {Object.keys(contentDescriptions).map((title) => (
              <option key={title} value={title}>
                {title}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Email Body</label>
          <textarea
            className="form-control"
            name="mailContent"
            value={formData.mailContent}
            onChange={handleChange}
            rows="5"
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Award Type</label>
          <select
            className="form-select"
            name="awardType"
            value={formData.awardType}
            onChange={handleChange}
            required
          >
            <option value="">Select Award Type</option>
            <option value="FIVE_STAR">🌟 Five Star</option>
            <option value="FOUR_KUDOS">👏 Four Kudos</option>
            <option value="THREE_PAT_ON_BACK">👍 Pat on the Back</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Send Appreciation
        </button>
      </form>
    </div>
  );
};

export default AwardList;