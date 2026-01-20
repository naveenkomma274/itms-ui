import React, { useState, useEffect } from "react";
import CommitteeService from "../services/CommitteeService";
import "antd/dist/reset.css";
import { Table, Button, Input, Modal, Form, Select, Pagination } from "antd";

const { Search } = Input;
const { Option } = Select;

const CommitteeList = () => {
  const [committees, setCommittees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCommittee, setEditingCommittee] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [pagination, setPagination] = useState({ current: 1, pageSize: 5, total: 0 });

  useEffect(() => {
    fetchCommittees();
  }, [pagination.current, searchTerm]);

  const fetchCommittees = async () => {
    setLoading(true);
    try {
      const response = await CommitteeService.getCommittees(searchTerm, pagination.current - 1, pagination.pageSize);
      setCommittees(response.data.content);
      setPagination({ ...pagination, total: response.data.totalElements });
    } catch (error) {
      console.error("Error fetching committees:", error);
    }
    setLoading(false);
  };

  const handleAddOrUpdate = async (values) => {
    try {
      if (editingCommittee) {
        await CommitteeService.updateCommittee(editingCommittee.commID, values);
      } else {
        await CommitteeService.addCommittee(values);
      }
      fetchCommittees();
      setIsModalOpen(false);
      setEditingCommittee(null);
    } catch (error) {
      console.error("Error saving committee:", error);
    }
  };

  const handleDelete = async (commID) => {
    try {
      await CommitteeService.deleteCommittee(commID);
      fetchCommittees();
    } catch (error) {
      console.error("Error deleting committee:", error);
    }
  };

  const openModal = (committee = null) => {
    setEditingCommittee(committee);
    setIsModalOpen(true);
  };

  return (
    <div>
      <h2>List of Available Committees</h2>
      <Search
        placeholder="Search by Committee ID or Name"
        onSearch={(value) => setSearchTerm(value)}
        style={{ width: 300, marginBottom: 20 }}
      />
      <Button type="primary" onClick={() => openModal()} style={{ marginBottom: 20 }}>
        Add Committee
      </Button>

      <Table
        dataSource={committees}
        columns={[
          { title: "ID", dataIndex: "commID", key: "commID" },
          { title: "Member Name", dataIndex: "commMemName", key: "commMemName" },
          { title: "Committee Name", dataIndex: "commName", key: "commName" },
          { title: "Role", dataIndex: "commRole", key: "commRole" },
          { title: "Tenure", dataIndex: "tenure", key: "tenure" },
          { title: "Start Date", dataIndex: "startDate", key: "startDate" },
          { title: "Mobile Number", dataIndex: "mobileNumber", key: "mobileNumber" },
          {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
              <>
                <Button onClick={() => openModal(record)} type="link">Update</Button>
                <Button onClick={() => handleDelete(record.commID)} type="link" danger>Delete</Button>
              </>
            ),
          },
        ]}
        loading={loading}
        pagination={false}
        rowKey="commID"
      />

      <Pagination
        current={pagination.current}
        total={pagination.total}
        pageSize={pagination.pageSize}
        onChange={(page) => setPagination({ ...pagination, current: page })}
        style={{ marginTop: 20, textAlign: "center" }}
      />

      <Modal
        title={editingCommittee ? "Update Committee" : "Add Committee"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form
          initialValues={editingCommittee || {}}
          onFinish={handleAddOrUpdate}
          layout="vertical"
        >
          <Form.Item name="commMemName" label="Member Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="commName" label="Committee Name" rules={[{ required: true }]}>
            <Select>
              <Option value="SPORTS">Sports</Option>
              <Option value="CULTURAL">Cultural</Option>
              <Option value="TECHNICAL">Technical</Option>
            </Select>
          </Form.Item>
          <Form.Item name="commRole" label="Role" rules={[{ required: true }]}>
            <Select>
              <Option value="COMM_MEMBER">Member</Option>
              <Option value="COMM_LEADER">Leader</Option>
            </Select>
          </Form.Item>
          <Form.Item name="tenure" label="Tenure (Years)" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="startDate" label="Start Date" rules={[{ required: true }]}>
            <Input type="date" />
          </Form.Item>
          <Form.Item name="mobileNumber" label="Mobile Number" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Button type="primary" htmlType="submit">
            {editingCommittee ? "Update" : "Add"}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default CommitteeList;
