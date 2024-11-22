import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useStore } from '../../Store/store';
import './allProjects/createProjectPage.scss';
//import agent from '../../Api/agent';
import { useNavigate } from 'react-router';

const CreateProject: React.FC = () => {
  const navigate = useNavigate();
  const { commonStore,projectStore } = useStore();
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
      if (!commonStore.allRegions.size) {
        setLoadingRegions(true);
        await commonStore.loadRegions();
        setLoadingRegions(false);
      } else {
        setLoadingRegions(false);
      }

      if (!commonStore.projectFileds.length) {
        setLoadingFields(true);
        await commonStore.loadProjectsFileds();
        setLoadingFields(false);
      } else {
        setLoadingFields(false);
      }
    };

    loadOptions();
  }, [commonStore]);

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
      alert('Project created successfully!');
      loadProjects();
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
              options={commonStore.regions}
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
              options={commonStore.projectFileds.map((field) => ({
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