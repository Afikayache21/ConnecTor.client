// import React from 'react';
// import { useForm, SubmitHandler } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
// import { CreateProjectModel } from '../../types'; // Ensure this imports the correct types
// import './allProjects/createProjectPage.scss';
// import { getToken, getUserId } from '../../Api/agent';
// import Select from 'react-select';
// import { useStore } from '../../Store/store';
// //import axios from 'axios';

// // Adjust the schema to specify file types for ProjectQuantities and ConstructionPlans
// const schema: yup.ObjectSchema<CreateProjectModel> = yup.object({
//   ProjectName: yup.string()
//     .required("Project name is required")
//     .max(255, "Project name cannot exceed 255 characters"),
//   OpeningDate: yup.string().required("Opening date is required"),
//   Deadline: yup.string().required("Deadline is required"),
//   ProjectDescription: yup.string()
//     .required("Project description is required")
//     .min(10, "Description must be at least 10 characters long"),
//   RegionID: yup.number().required("Region ID is required"),
//   ProjectQuantities: yup.mixed<File>().nullable(), // Specify File type
//   ConstructionPlans: yup.mixed<File>().nullable(),  // Specify File type
// });

// const CreateProject: React.FC = () => {
//   const  {CommonStore} = useStore()


//   const { register, handleSubmit, formState: { errors } } = useForm<CreateProjectModel>({
//     resolver: yupResolver(schema),
//   });

//   const onSubmit: SubmitHandler<CreateProjectModel> = async (data) => {

//     const projectData: CreateProjectModel = {
//         ProjectName: data.ProjectName,
//         OpeningDate: data.OpeningDate,
//         Deadline: data.Deadline,
//         ProjectDescription: data.ProjectDescription,
//         RegionID: data.RegionID,
//         ProjectQuantities: data.ProjectQuantities, 
//         ConstructionPlans: data.ConstructionPlans, 
//         ProjectFieldID: 1,
//         ContractorID: undefined, // TODO: Replace with actual contractor ID        
//         ActualStartDate: undefined,
//         ActualEndDate: undefined,
//         ActualPayment: undefined,
//         ClientReview: undefined,
//         ContractorReview: undefined,
//         Images:undefined,
//         ClientId: Number(getUserId()) // TODO: Replace with actual client ID
//     };


//     try {
//         const response = await fetch('https://localhost:5000/api/Project/Create', {
//             method: 'POST',
//             headers: {
//                 'Authorization': `${getToken()}`, // or the specific header you want, e.g., 'token': getToken()
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(projectData), // Send the project data as JSON
//         });

//         if (!response.ok) {
//             throw new Error("Failed to create project");
//         }
//         alert("Project created successfully!");

//     } catch (error) {
//         console.error(error);
//         alert("Error creating project: " + error); // Use error.message for better clarity
//     }
// };

//   return (
//     <div className="create-project-page">
//       <h1>Create New Project</h1>
//       <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
//         <div>
//           <label>Project Name</label>
//           <input type="text" {...register("ProjectName")} />
//           <p>{errors.ProjectName?.message}</p>
//         </div>

//         <div>
//           <label>Project Description</label>
//           <textarea {...register("ProjectDescription")} />
//           <p>{errors.ProjectDescription?.message}</p>
//         </div>
       
//         <div>
//           <label>Region ID</label>
//           <input type="number" {...register("RegionID")} />
//           <p>{errors.RegionID?.message}</p>
//         </div>

//         <div>
//           <label>Opening Date</label>
//           <input type="date" {...register("OpeningDate")} />
//           <p>{errors.OpeningDate?.message}</p>
//         </div>

//         <div>
//           <label>Deadline</label>
//           <input type="date" {...register("Deadline")} />
//           <p>{errors.Deadline?.message}</p>
//         </div>
//         <div>
//         <Select
//                   options={CommonStore.proffesions}
//                   placeholder="Select Profession"
//                   value={selectedProfessions}
//                   onChange={(selectedOption) => setSelectedProfessions(selectedOption as { value: number; label: string }[])}
//                   isClearable
//                   isMulti
//                   styles={{
//                     option: (provided) => ({
//                       ...provided,
//                       color: 'black',
//                     }),
//                   }}
//                 />
//         </div>
//         <div>
//           <label>Project Quantities (File)</label>
//           <input type="file" {...register("ProjectQuantities")} />
//           <p>{errors.ProjectQuantities?.message}</p>
//         </div>

//         <div>
//           <label>Construction Plans (File)</label>
//           <input type="file" {...register("ConstructionPlans")} />
//           <p>{errors.ConstructionPlans?.message}</p>
//         </div>

//         <button type="submit">Create Project</button>
//       </form>
//     </div>
//   );
// };

// export default CreateProject;

// import React, { useEffect, useState } from 'react';
// import { useForm, SubmitHandler } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
// import { CreateProjectModel } from '../../types';
// import './allProjects/createProjectPage.scss';
// import Select from 'react-select';
// import { useStore } from '../../Store/store';
// import agent from '../../Api/agent'; // Import the API agent
// import { observer } from 'mobx-react';

// // Schema with validation
// const schema: yup.ObjectSchema<any> = yup.object({
//   ProjectName: yup.string()
//     .required('Project name is required')
//     .max(255, 'Project name cannot exceed 255 characters'),
//   OpeningDate: yup.date().required('Opening date is required'),
//   Deadline: yup.date().required('Deadline is required'),
//   ProjectDescription: yup.string()
//     .required('Project description is required')
//     .min(10, 'Description must be at least 10 characters long'),
//   RegionID: yup.number().required('Region ID is required'),
//   ProjectFieldID: yup.number().required('Project field is required'),
//   ProjectQuantities: yup.mixed<File>(),
//   ConstructionPlans: yup.mixed<File>(),
//   Image: yup.mixed<File>(),
// });

// const CreateProject: React.FC = () => {

//   const { CommonStore } = useStore();
//   const {projectFileds,loadProjectsFileds} = CommonStore;
//   const [selectedField, setSelectedField] = useState<{ value: number; label: string } | null>(null);

//   const { register, handleSubmit, formState: { errors }, setValue } = useForm<CreateProjectModel>({
//     resolver: yupResolver(schema),
//   });


//   const handleFieldChange = (selectedOption: { value: number; label: string } | null) => {
//     setSelectedField(selectedOption);
//     setValue('ProjectFieldID', selectedOption ? selectedOption.value : 0);
//   };

//   const onSubmit: SubmitHandler<any> = async (data) => {
//     const formData = new FormData();
//     formData.append('ProjectName', data.ProjectName);
//     formData.append('OpeningDate', data.OpeningDate.toISOString());
//     formData.append('Deadline', data.Deadline.toISOString());
//     formData.append('ProjectDescription', data.ProjectDescription);
//     formData.append('RegionID', data.RegionID.toString());
//     formData.append('ProjectFieldID', selectedField ? selectedField.value.toString() : '0');
//     if (data.ProjectQuantities) formData.append('ProjectQuantities', data.ProjectQuantities[0]);
//     if (data.ConstructionPlans) formData.append('ConstructionPlans', data.ConstructionPlans);
//     if (data.Image) formData.append('Image', data.Image);

//     try {
//       await agent.Projects.create(formData); 
//       alert('Project created successfully!');
//     } catch (error) {
//       console.error(error);
//       alert('Error creating project: ' + error);
//     }
//   };


//   if (projectFileds.length <= 0) loadProjectsFileds();

  
//   return (
//     <div className="create-project-page">
//       <h1>Create New Project</h1>
//       <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
//         <div>
//           <label>Project Name</label>
//           <input type="text" {...register('ProjectName')} />
//           <p>{errors.ProjectName?.message}</p>
//         </div>

//         <div>
//           <label>Project Description</label>
//           <textarea {...register('ProjectDescription')} />
//           <p>{errors.ProjectDescription?.message}</p>
//         </div>

//         <div>
//           <label>Region ID</label>
//           <input type="number" {...register('RegionID')} />
//           <p>{errors.RegionID?.message}</p>
//         </div>

//         <div>
//           <label>Opening Date</label>
//           <input type="date" {...register('OpeningDate')} />
//           <p>{errors.OpeningDate?.message}</p>
//         </div>

//         <div>
//           <label>Deadline</label>
//           <input type="date" {...register('Deadline')} />
//           <p>{errors.Deadline?.message}</p>
//         </div>

//         <div>
//           <label>Project Field</label>
//           <Select
//             options={projectFileds.map((field: any) => ({
//               value: field.value,
//               label: field.label,
//             }))}
//             placeholder="Select Project Field"
//             value={selectedField}
//             onChange={handleFieldChange}
//             isClearable
//             styles={{
//               option: (provided) => ({
//                 ...provided,
//                 color: 'black',
//               }),
//             }}
//           />
//           <p>{errors.ProjectFieldID?.message}</p>
//         </div>

//         <div>
//           <label>Project Quantities (File)</label>
//           <input
//             type="file"
//             {...register('ProjectQuantities')}
//           />
//           <p>{errors.ProjectQuantities?.message}</p>
//         </div>

//         <div>
//           <label>Construction Plans (File)</label>
//           <input
//             type="file"
//             {...register('ConstructionPlans')}
//           />
//           <p>{errors.ConstructionPlans?.message}</p>
//         </div>

//         <div>
//           <label>Image (File)</label>
//           <input
//             type="file"
//             {...register('Image')}
//           />
//           <p>{errors.Image?.message}</p>
//         </div>

//         <button type="submit">Create Project</button>
//       </form>
//     </div>
//   );
// };

// export default observer (CreateProject);









































import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useStore } from '../../Store/store';
import './allProjects/createProjectPage.scss';
import agent from '../../Api/agent';
import { useNavigate } from 'react-router';

const CreateProject: React.FC = () => {
  const navigate = useNavigate();
  const { CommonStore,projectStore } = useStore();
  const { loadProjects ,createProject} = projectStore;

  const [loadingFields, setLoadingFields] = useState(true);
  const [loadingRegions, setLoadingRegions] = useState(true);

  const [project, setProject] = useState<any>({
    projectName: '',
    projectDescription: '',
    openingDate: '',
    deadline: '',
    regionID: null,
    projectFieldID: null,
    projectQuantities: null,
    constructionPlans: null,
    image: null,
  });

  const [selectedField, setSelectedField] = useState<{ value: number; label: string } | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<{ value: number; label: string } | null>(null);

  // Load regions and fields on mount
  useEffect(() => {
    const loadOptions = async () => {
      if (!CommonStore.allRegions.size) {
        setLoadingRegions(true);
        await CommonStore.loadRegions();
        setLoadingRegions(false);
      } else {
        setLoadingRegions(false);
      }

      if (!CommonStore.projectFileds.length) {
        setLoadingFields(true);
        await CommonStore.loadProjectsFileds();
        setLoadingFields(false);
      } else {
        setLoadingFields(false);
      }
    };

    loadOptions();
  }, [CommonStore]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProject((prev:any) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setProject((prev:any) => ({ ...prev, [name]: files[0] }));
    }
  };

  const handleFieldChange = (selectedOption: { value: number; label: string } | null) => {
    setSelectedField(selectedOption);
    setProject((prev:any) => ({ ...prev, projectFieldID: selectedOption ? selectedOption.value : null }));
  };

  const handleRegionChange = (selectedOption: { value: number; label: string } | null) => {
    setSelectedRegion(selectedOption);
    setProject((prev:any) => ({ ...prev, regionID: selectedOption ? selectedOption.value : null }));
  };

  const validateForm = () => {
    const errors: string[] = [];

    if (!project.projectName) errors.push('Project name is required.');
    if (project.projectName && project.projectName.length > 255)
      errors.push('Project name cannot exceed 255 characters.');
    if (!project.openingDate) errors.push('Opening date is required.');
    if (!project.deadline) errors.push('Deadline is required.');
    if (!project.projectDescription) errors.push('Project description is required.');
    if (project.projectDescription && project.projectDescription.length < 10)
      errors.push('Description must be at least 10 characters long.');
    if (!project.regionID) errors.push('Region is required.');
    if (!project.projectFieldID) errors.push('Project field is required.');

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validateForm();
    if (errors.length > 0) {
      alert(errors.join('\n'));
      return;
    }

    const formData = new FormData();
    formData.append('ProjectName', project.projectName);
    formData.append('OpeningDate', project.openingDate);
    formData.append('Deadline', project.deadline);
    formData.append('ProjectDescription', project.projectDescription);
    formData.append('RegionID', project.regionID.toString());
    formData.append('ProjectFieldID', project.projectFieldID?.toString() || '');

    if (project.projectQuantities) formData.append('ProjectQuantities', project.projectQuantities);
    if (project.constructionPlans) formData.append('ConstructionPlans', project.constructionPlans);
    if (project.image) formData.append('Image', project.image);

    try {
      await createProject(formData)
      //await agent.Projects.create(formData);
      alert('Project created successfully!');

      navigate('/projects')

    } catch (error) {
      console.error(error);
      alert('Error creating project: ' + error);
    }
  };

  return (
    <div className="create-project-page">
      <h1>Create New Project</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label>Project Name</label>
          <input
            type="text"
            name="projectName"
            value={project.projectName}
            onChange={handleInputChange}
            placeholder="Enter project name"
          />
        </div>

        <div>
          <label>Project Description</label>
          <textarea
            name="projectDescription"
            value={project.projectDescription}
            onChange={handleInputChange}
            placeholder="Enter project description"
          />
        </div>

        <div>
          <label>Region</label>
          {loadingRegions ? (
            <p>Loading regions...</p>
          ) : (
            <Select
              options={CommonStore.regions}
              value={selectedRegion}
              onChange={handleRegionChange}
              placeholder="Select region"
              isClearable
              styles={{
                option: (provided) => ({
                  ...provided,
                  color: 'black',
                }),
              }}
            />
          )}
        </div>

        <div>
          <label>Opening Date</label>
          <input
            type="date"
            name="openingDate"
            value={project.openingDate}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label>Deadline</label>
          <input
            type="date"
            name="deadline"
            value={project.deadline}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label>Project Field</label>
          {loadingFields ? (
            <p>Loading fields...</p>
          ) : (
            <Select
              options={CommonStore.projectFileds.map((field) => ({
                value: field.value,
                label: field.label,
              }))}
              value={selectedField}
              onChange={handleFieldChange}
              placeholder="Select project field"
              isClearable
              styles={{
                option: (provided) => ({
                  ...provided,
                  color: 'black',
                }),
              }}
            />
          )}
        </div>

        <div>
          <label>Project Quantities (File)</label>
          <input
            type="file"
            name="projectQuantities"
            onChange={handleFileChange}
          />
        </div>

        <div>
          <label>Construction Plans (File)</label>
          <input
            type="file"
            name="constructionPlans"
            onChange={handleFileChange}
          />
        </div>

        <div>
          <label>Image (File)</label>
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
          />
        </div>

        <button type="submit">Create Project</button>
      </form>
    </div>
  );
};

export default CreateProject;