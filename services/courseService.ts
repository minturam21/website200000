
import { apiFetch } from './api';
import { db } from '../lib/db';

export interface CourseData {
  id: number;
  title: string;
  description: string;
  duration: string;
  mode: string;
}

export const getPublicCourses = async (): Promise<CourseData[]> => {
  try {
    const response = await apiFetch('/courses');
    return response.data;
  } catch (err) {
    console.warn("Institutional API unreachable. Falling back to local program registry.");
    // Emergency Fallback to lib/db.ts
    const localCourses = await db.getCourses();
    return localCourses.map(c => ({
      id: c.id,
      title: c.name,
      description: c.description,
      duration: c.duration,
      mode: 'Offline' 
    }));
  }
};
