import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AllStudents() {
    const [students, setStudents] = useState([]);
    const [editingStudent, setEditingStudent] = useState(null);

    useEffect(() => {
        function getStudents() {
            axios.get("http://localhost:8070/student/").then((res) => {
                setStudents(res.data); // Insert data into the students state
            }).catch((err) => {
                alert(err.message);
            });
        }
        getStudents();
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8070/student/delete/${id}`).then((res) => {
            alert(res.data.states);
            setStudents(students.filter(student => student._id !== id));
        }).catch((err) => {
            alert("Failed to delete the student.");
        });
    };

    const handleEdit = (student) => {
        setEditingStudent(student);
    };

    const handleUpdate = () => {
        const updatedStudent = {
            name: editingStudent.name,
            mobile: editingStudent.mobile,
            nic: editingStudent.nic,
        };

        axios.put(`http://localhost:8070/student/update/${editingStudent._id}`, updatedStudent).then((res) => {
            alert(res.data.states);
            setStudents(students.map(student => student._id === editingStudent._id ? editingStudent : student));
            setEditingStudent(null);
        }).catch((err) => {
            alert("Failed to update the student.");
        });
    };

    return (
        <div className="container">
            <h1>All Students</h1>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Mobile</th>
                        <th>NIC</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, index) => (
                        <tr key={index}>
                            <td>{student._id}</td>
                            <td>
                                {editingStudent && editingStudent._id === student._id ? (
                                    <input
                                        type="text"
                                        value={editingStudent.name}
                                        onChange={(e) => setEditingStudent({ ...editingStudent, name: e.target.value })}
                                    />
                                ) : (
                                    student.name
                                )}
                            </td>
                            <td>
                                {editingStudent && editingStudent._id === student._id ? (
                                    <input
                                        type="text"
                                        value={editingStudent.mobile}
                                        onChange={(e) => setEditingStudent({ ...editingStudent, mobile: e.target.value })}
                                    />
                                ) : (
                                    student.mobile
                                )}
                            </td>
                            <td>
                                {editingStudent && editingStudent._id === student._id ? (
                                    <input
                                        type="text"
                                        value={editingStudent.nic}
                                        onChange={(e) => setEditingStudent({ ...editingStudent, nic: e.target.value })}
                                    />
                                ) : (
                                    student.nic
                                )}
                            </td>
                            <td>
                                {editingStudent && editingStudent._id === student._id ? (
                                    <button onClick={handleUpdate} className="btn btn-success">Save</button>
                                ) : (
                                    <>
                                        <button onClick={() => handleEdit(student)} className="btn btn-warning">Edit</button>
                                        <button onClick={() => handleDelete(student._id)} className="btn btn-danger">Delete</button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
