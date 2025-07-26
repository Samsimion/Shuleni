import React,{useEffect,useState} from "react";
import {useFormik} from "formik";
import * as yup from "yup";

import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; 


import {FiEdit, FiTrash2} from "react-icons/fi"
import axios from '../api/axios';



function ClassSection(){
    const [classes, setClasses] = useState([]);
    const [refreshPage, setRefreshPage] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showDeleteModal, setShowDeleteModal]=useState(false);
    const [classToDelete, setClassToDelete] = useState(null);
    const [editingClass, setEditingClass] = useState(null);
    const { schoolId } = useParams();
    const { currentUser } = useAuth();
    const selectedSchoolId = parseInt(schoolId, 10);
    const [total, setTotal] = useState(0);

    const creatorId = currentUser?.id;

  
    

    useEffect(()=>{
        console.log("Fetching classes");
        axios.get(`/classes?school_id=${selectedSchoolId}`)
          
          .then((res)=>{
            console.log("Fetched classes:", res.data);
            const filtered = res.data.classes.filter((cls)=>cls.school_id===selectedSchoolId)
            setTotal(res.data.total_students);
            
            setClasses(filtered);
            console.log(filtered);
          })
          .catch((error) => setError(error))
          .finally(() => setLoading(false));
          
          
    }, [refreshPage]
    );

    const handleDeleteClick = (cls)=>{
        setClassToDelete(cls);
        setShowDeleteModal(true);
    };

    const confirmDelete = ()=>{
        console.log("Trying to delete:", classToDelete);
        axios.delete(`/classes/${classToDelete.id}`)
          .then(()=>{
            setClasses(classes.filter(c => c.id !== classToDelete.id));
            setShowDeleteModal(false);
            setClassToDelete(null);
          })
          .catch((err)=>{
            console.error("Delete failed:", err);
          });
    };
    
    const formSchema = yup.object().shape({
        name: yup.string().required("Must enter a name/Tafathali hujawekaa jina").max(100),
    });

    const formik = useFormik({
        initialValues:{
            name:"",
            
        },
        validationSchema: formSchema,
        onSubmit: (values, {resetForm})=>{
            const payload = {
                name: values.name,
                school_id: selectedSchoolId
            };
            axios.post("/classes", payload)
            .then((res)=>{
                console.log("Class created:", res.data);
                setRefreshPage(!refreshPage);
                resetForm();
            })
            .catch((err)=>{
                console.error("Error creating class:", err)
            });
        },
    });

    return (
        <>
          <div className="p-6 bg-gray-100 min-h-screen font-sans">
            {/*Header*/}
            <div className="mb-6 text-center">
                <h1 className="text-3xl font-bold text-blue-900 ">🎓 Class Management System</h1>
                <p className="text-gray-600">Effeciently manage school classes with our comprehensive system</p>
            </div>

            {/*buda boss stats hizii*/}
            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-white p-4 rounded shadow text-center">
                    <p className="text-sm text-grey-500">Total Classes</p>
                    <h2 className="text-2xl font-bold text-blue-700">{classes.length}</h2>

                </div>
                <div className="bg-white p-4 rounded shadow text-center">
                    <p className="text-sm text-grey-500">Total Students</p>
                    <h2 className="text-2xl font-bold text-blue-700">{total}</h2>
                </div>
                <div className="bg-white p-4 rounded shadow text-center">
                    <p className="text-sm text-grey-500">Recent Activity</p>
                    <h2 className="text-2xl font-bold text-blue-700">Today{}</h2>
                </div>

                
            </div>

            {/*mkuu hapa ni kwa form na class list*/}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/*kucreate class mpya*/}
                    <div className="bg-white p-6 rounded shadow">
                        <h2 className="text-xl font-bold mb-2">Create a New Class</h2>
                        <p className="text-sm text-grey-500 mb-4">Add a new class to a school system</p>
                        <form onSubmit={formik.handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="">Class Name</label>
                                <input 
                                name="name"
                                type="text"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                className="w-full border rounded px-3 py-2 mt-1"
                                placeholder="e.g. Grade 1A"
                                />
                                {formik.touched.name && formik.errors.name && (
                                    <p className="text-red-500 text-sm">{formik.errors.name}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-700 to-green-500 text-white py-2 rounded hover:opacity-90"

                            >
                                + Create Class
                            </button>
                        </form>
                </div>

                {/*Existing Classes*/}
                
                <div className="bg-white p-6 rounded shadow">
                    <h2>📚 Existing Classes</h2>
                    <p className="text-sm text-gray-500 mb-4">Manage and view all school classes</p>
                    {/*buda boss errors and loading while fetching */}
                {loading ?(
                    <p className="text-center text-gray-500">Loading classes...</p>
                ) : error ? (
                    <p className="text-center text-red-500">Error fetching classes, Tafadhali jaribu tena .</p>
                ):(
                    <>
                      {/*table details of classes*/}
                        <table className="w-full text-sm text-left">
                            <thead>
                                <tr className="border-b">
                                    <th className="py-2">Class Name</th>
                                    <th>School ID</th>
                                    <th>Students</th>
                                    <th>Created</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            
                            <tbody>
                                {classes.map((cls)=>(
                                    <tr key={cls.id} className="border-b">
                                        <td className="py-2">{cls.name}</td>
                                        <td>{cls.school_id}</td>
                                        <td>{cls.students_count || 0}</td>
                                        <td>{cls.created_at?.split("T")[0] || "—"}</td>
                                        <td className="flex gap-2">
                                            <button className="text-blue-600 hover:underline">
                                                <FiEdit />
                                            </button>
                                            <button className="text-red-600 hover:underline" onClick={()=>handleDeleteClick(cls)}>
                                                <FiTrash2 />
                                            </button>
                                        </td>
                                    </tr>

                                ))}
                                {classes.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="text-center py-4 text-gray-400">No classes found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </>
                )}
                    
                </div>
                    
            </div>

            {showDeleteModal && (
                <div>
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white p-6 rounded shadow-md text-center">
                            <h3 className="text-lg font-bold mb-4">Are you sure ?</h3>
                            <p className="mb-6">Do you really want to delete <strong>{classToDelete?.name}</strong>?</p>
                            <div className="flex justify-center gap-4">
                                <button
                                  className="bg-red-600 text-white px-4 py-2 rounded"
                                  onClick={confirmDelete}
                                >
                                    Yes, Delete
                                </button>
                                <button
                                  className="bg-gray-300 px-4 py-2 rounded"
                                  onClick={()=>{
                                    setShowDeleteModal(false);
                                    setClassToDelete(null)
                                  }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}


          </div>
        </>
    );

}export default ClassSection;