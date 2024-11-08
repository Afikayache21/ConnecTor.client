import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { CreateProjectModel } from '../../types'; // Ensure this imports the correct types
import './allProjects/createProjectPage.scss';
import { getToken, getUserId } from '../../Api/agent';
//import axios from 'axios';

// Adjust the schema to specify file types for ProjectQuantities and ConstructionPlans
const schema: yup.ObjectSchema<CreateProjectModel> = yup.object({
  ProjectName: yup.string()
    .required("Project name is required")
    .max(255, "Project name cannot exceed 255 characters"),
  OpeningDate: yup.string().required("Opening date is required"),
  Deadline: yup.string().required("Deadline is required"),
  ProjectDescription: yup.string()
    .required("Project description is required")
    .min(10, "Description must be at least 10 characters long"),
  RegionID: yup.number().required("Region ID is required"),
  ProjectQuantities: yup.mixed<File>().nullable(), // Specify File type
  ConstructionPlans: yup.mixed<File>().nullable(),  // Specify File type
});

const CreateProject: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<CreateProjectModel>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<CreateProjectModel> = async (data) => {

    const projectData: CreateProjectModel = {
        ProjectName: data.ProjectName,
        OpeningDate: data.OpeningDate,
        Deadline: data.Deadline,
        ProjectDescription: data.ProjectDescription,
        RegionID: data.RegionID,
        ProjectQuantities: data.ProjectQuantities, 
        ConstructionPlans: data.ConstructionPlans, 
        ProjectFieldID: 1,
        ContractorID: undefined, // TODO: Replace with actual contractor ID        
        ActualStartDate: undefined,
        ActualEndDate: undefined,
        ActualPayment: undefined,
        ClientReview: undefined,
        ContractorReview: undefined,
        Images:undefined,
        ClientId: Number(getUserId()) // TODO: Replace with actual client ID
    };


    try {
        const response = await fetch('https://localhost:5000/api/Project/Create', {
            method: 'POST',
            headers: {
                'Authorization': `${getToken()}`, // or the specific header you want, e.g., 'token': getToken()
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(projectData), // Send the project data as JSON
        });

        if (!response.ok) {
            throw new Error("Failed to create project");
        }
        alert("Project created successfully!");

    } catch (error) {
        console.error(error);
        alert("Error creating project: " + error); // Use error.message for better clarity
    }
};

  return (
    <div className="create-project-page">
      <h1>Create New Project</h1>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div>
          <label>Project Name</label>
          <input type="text" {...register("ProjectName")} />
          <p>{errors.ProjectName?.message}</p>
        </div>

        <div>
          <label>Project Description</label>
          <textarea {...register("ProjectDescription")} />
          <p>{errors.ProjectDescription?.message}</p>
        </div>
       
        <div>
          <label>Region ID</label>
          <input type="number" {...register("RegionID")} />
          <p>{errors.RegionID?.message}</p>
        </div>

        <div>
          <label>Opening Date</label>
          <input type="date" {...register("OpeningDate")} />
          <p>{errors.OpeningDate?.message}</p>
        </div>

        <div>
          <label>Deadline</label>
          <input type="date" {...register("Deadline")} />
          <p>{errors.Deadline?.message}</p>
        </div>

        <div>
          <label>Project Quantities (File)</label>
          <input type="file" {...register("ProjectQuantities")} />
          <p>{errors.ProjectQuantities?.message}</p>
        </div>

        <div>
          <label>Construction Plans (File)</label>
          <input type="file" {...register("ConstructionPlans")} />
          <p>{errors.ConstructionPlans?.message}</p>
        </div>

        <button type="submit">Create Project</button>
      </form>
    </div>
  );
};

export default CreateProject;
