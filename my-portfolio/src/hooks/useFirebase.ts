import { useState, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs 
} from 'firebase/firestore';
import { db } from '../config/firebase';

// Update the Skill interface to include proficiency
export interface Skill {
  id: string;
  name: string;
  category: "frontend" | "backend" | "tools" | "languages" | "databases" | "cloud";
  proficiency: number; // Add this line
  experience: string;
  description: string;
  icon?: string;
}

export interface Project {
  id?: string;
  title: string;
  description: string;
  technologies?: string[];
  images?: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// Update the useSkills hook
export const useSkills = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching skills from Firestore...');
      
      const querySnapshot = await getDocs(collection(db, 'skills'));
      const skillsData: Skill[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        skillsData.push({
          id: doc.id,
          name: data.name || '',
          category: data.category || 'Other',
          proficiency: data.proficiency || 0,
          experience: data.experience || '',
          description: data.description || '',
          icon: data.icon || '⚡'
        });
      });
      
      console.log('Skills fetched:', skillsData.length);
      setSkills(skillsData);
    } catch (error) {
      console.error('Error fetching skills:', error);
      setError('Failed to load skills');
      setSkills([]); // Use empty array as fallback
    } finally {
      setLoading(false);
    }
  };

  const addSkill = async (skillData: Omit<Skill, 'id'>): Promise<void> => {
    try {
      console.log('Adding skill to Firestore:', skillData);
      
      const docRef = await addDoc(collection(db, 'skills'), skillData);
      console.log('Skill added with ID:', docRef.id);
      
      // Add to local state
      const newSkill: Skill = { ...skillData, id: docRef.id };
      setSkills(prevSkills => [...prevSkills, newSkill]);
      
    } catch (error) {
      console.error('Error adding skill:', error);
      throw error;
    }
  };

  const updateSkill = async (skillId: string, skillData: Partial<Skill>): Promise<void> => {
    try {
      console.log('Updating skill in Firestore:', skillId, skillData);
      
      await updateDoc(doc(db, 'skills', skillId), skillData);
      console.log('Skill updated successfully');
      
      // Update local state
      setSkills(prevSkills => 
        prevSkills.map(skill => 
          skill.id === skillId ? { ...skill, ...skillData } : skill
        )
      );
      
    } catch (error) {
      console.error('Error updating skill:', error);
      throw error;
    }
  };

  const deleteSkill = async (skillId: string): Promise<void> => {
    try {
      console.log('Deleting skill from Firestore:', skillId);
      
      await deleteDoc(doc(db, 'skills', skillId));
      console.log('Skill deleted successfully');
      
      // Update local state
      setSkills(prevSkills => prevSkills.filter(skill => skill.id !== skillId));
      
    } catch (error) {
      console.error('Error deleting skill:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  return { 
    skills, 
    loading, 
    error, 
    addSkill, 
    updateSkill, 
    deleteSkill, 
    refetch: fetchSkills 
  };
};

// Update the useProjects hook
export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching projects from Firestore...');
      
      const querySnapshot = await getDocs(collection(db, 'projects'));
      const projectsData: Project[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        projectsData.push({
          id: doc.id,
          title: data.title || '',
          description: data.description || '',
          technologies: data.technologies || [],
          images: data.images || [],
          liveUrl: data.liveUrl,
          githubUrl: data.githubUrl,
          featured: data.featured || false
        });
      });
      
      console.log('Projects fetched:', projectsData.length);
      setProjects(projectsData);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setError('Failed to load projects');
      setProjects([]); // Use empty array as fallback
    } finally {
      setLoading(false);
    }
  };

  const addProject = async (projectData: Omit<Project, 'id'>): Promise<void> => {
    try {
      console.log('Adding project to Firestore:', projectData);
      
      // Ensure arrays exist
      const dataToAdd = {
        ...projectData,
        technologies: projectData.technologies || [],
        images: projectData.images || []
      };
      
      const docRef = await addDoc(collection(db, 'projects'), dataToAdd);
      console.log('Project added with ID:', docRef.id);
      
      // Add to local state
      const newProject: Project = { ...dataToAdd, id: docRef.id };
      setProjects(prevProjects => [...prevProjects, newProject]);
      
    } catch (error) {
      console.error('Error adding project:', error);
      throw error;
    }
  };

  const updateProject = async (projectId: string, projectData: Partial<Project>): Promise<void> => {
    try {
      console.log('Updating project in Firestore:', projectId, projectData);
      
      await updateDoc(doc(db, 'projects', projectId), projectData);
      console.log('Project updated successfully');
      
      // Update local state
      setProjects(prevProjects => 
        prevProjects.map(project => 
          project.id === projectId ? { ...project, ...projectData } : project
        )
      );
      
    } catch (error) {
      console.error('Error updating project:', error);
      throw error;
    }
  };

  const deleteProject = async (projectId: string): Promise<void> => {
    try {
      console.log('Deleting project from Firestore:', projectId);
      
      await deleteDoc(doc(db, 'projects', projectId));
      console.log('Project deleted successfully');
      
      // Update local state
      setProjects(prevProjects => prevProjects.filter(project => project.id !== projectId));
      
    } catch (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return { 
    projects, 
    loading, 
    error, 
    addProject, 
    updateProject, 
    deleteProject, 
    refetch: fetchProjects 
  };
};
