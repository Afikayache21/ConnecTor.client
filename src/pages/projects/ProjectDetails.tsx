// import axios from 'axios';
// import { Project } from '../../services/ProjectService';
// import './projectDetalis.scss';

// interface ProjectDetailsProps {
//   project: Project | null;
// }

// const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project }) => {
//   if (!project) return null;

//   const handleFileDownload = async (fileId: number, fileName: string) => {
//     try {
//       const response = await axios.get(`/api/files/download/${fileId}`, {
//         responseType: 'blob',
//       });

//       // Create a URL for the file and trigger a download
//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', fileName);
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//     } catch (error) {
//       console.error('Error downloading file:', error);
//       alert('Failed to download the file.');
//     }
//   };

  
//   return (
//     <div className="project-details-container">
//       <h2 className="project-title">{project.projectName}</h2>
//       <div className="project-content">
//         <div className="project-info">
//           <div className="info-item">
//             <span className="info-label">Client:</span> {project.clientFullName}
//           </div>
//           <div className="info-item">
//             <span className="info-label">Contractor:</span> {project.contractorFullName}
//           </div>
//           <div className="info-item">
//             <span className="info-label">Project Field ID:</span> {project.projectFieldId}
//           </div>
//           <div className="info-item">
//             <span className="info-label">Opening Date:</span> {new Date(project.openingDate).toLocaleDateString()}
//           </div>
//           <div className="info-item">
//             <span className="info-label">Deadline:</span> {new Date(project.deadline).toLocaleDateString()}
//           </div>
//           {project.actualStartDate && (
//             <div className="info-item">
//               <span className="info-label">Actual Start Date:</span> {new Date(project.actualStartDate).toLocaleDateString()}
//             </div>
//           )}
//           {project.actualEndDate && (
//             <div className="info-item">
//               <span className="info-label">Actual End Date:</span> {new Date(project.actualEndDate).toLocaleDateString()}
//             </div>
//           )}
//           {project.actualPayment && (
//             <div className="info-item">
//               <span className="info-label">Actual Payment:</span> ${project.actualPayment.toLocaleString()}
//             </div>
//           )}
//           <div className="description">
//             <strong>Description:</strong> {project.projectDescription}
//           </div>
//           <div className="reviews">
//             <strong>Client Review:</strong> {project.clientReview}
//           </div>
//           <div className="reviews">
//             <strong>Contractor Review:</strong> {project.contractorReview}
//           </div>
//           <div className="files">
//             {/* Add here a button that download the file */}
//             <strong>files:</strong> 
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProjectDetails;

import React from 'react';
import { Project } from '../../services/ProjectService';
import './projectDetalis.scss';
import agent from '../../Api/agent';

interface ProjectDetailsProps {
  project: Project | null;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project }) => {
  if (!project) return null;

  const handleFileDownload = async (fileId: number): Promise<void> => {
    try {
      // Call Files.Download to get the full response
      const response = await agent.Files.Download(fileId);
  
      // Extract the Blob from the response
      const blob = response.data;
  
      // Extract the Content-Disposition header to determine the file name
      const contentDisposition = response.headers['content-disposition'];
      const fileName =
        contentDisposition?.match(/filename="?(.+)"?/)?.[1] || 'downloaded-file';
  
      // Create a URL for the Blob and set up the download
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName; // Set the file name
      document.body.appendChild(link);
      link.click();
  
      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
  
      console.log(`File "${fileName}" downloaded successfully!`);
    } catch (error) {
      console.error('Error downloading the file:', error);
    }
  };

  return (
    <div className="project-details-container">
      <h2 className="project-title">{project.projectName}</h2>
      <div className="project-content">
        <div className="project-info">
          <div className="info-item">
            <span className="info-label">Client:</span> {project.clientFullName}
          </div>
          <div className="info-item">
            <span className="info-label">Contractor:</span> {project.contractorFullName}
          </div>
          <div className="info-item">
            <span className="info-label">Project Field ID:</span> {project.projectFieldId}
          </div>
          <div className="info-item">
            <span className="info-label">Opening Date:</span> {new Date(project.openingDate).toLocaleDateString()}
          </div>
          <div className="info-item">
            <span className="info-label">Deadline:</span> {new Date(project.deadline).toLocaleDateString()}
          </div>
          {project.actualStartDate && (
            <div className="info-item">
              <span className="info-label">Actual Start Date:</span> {new Date(project.actualStartDate).toLocaleDateString()}
            </div>
          )}
          {project.actualEndDate && (
            <div className="info-item">
              <span className="info-label">Actual End Date:</span> {new Date(project.actualEndDate).toLocaleDateString()}
            </div>
          )}
          {project.actualPayment && (
            <div className="info-item">
              <span className="info-label">Actual Payment:</span> ${project.actualPayment.toLocaleString()}
            </div>
          )}
          <div className="description">
            <strong>Description:</strong> {project.projectDescription}
          </div>
          <div className="reviews">
            <strong>Client Review:</strong> {project.clientReview}
          </div>
          <div className="reviews">
            <strong>Contractor Review:</strong> {project.contractorReview}
          </div>
          <div className="files">
            <strong>Files:</strong>
            <div className="file-item">
              <button
                onClick={() =>handleFileDownload(project.projectQuantitiesFileId)}
              >
                Download Project Quantities
              </button>
            </div>
            <div className="file-item">
              <button
                onClick={() =>handleFileDownload(project.constructionPlansFileId)}
              >
                Download Construction Plans
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
