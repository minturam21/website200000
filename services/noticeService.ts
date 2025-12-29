
import { apiFetch } from './api';
import { db } from '../lib/db';

export interface NoticeData {
  id: number;
  title: string;
  content: string;
  created_at: string;
}

export const getPublicNotices = async (): Promise<NoticeData[]> => {
  try {
    const response = await apiFetch('/notices');
    return response.data;
  } catch (err) {
    console.warn("Notice Terminal sync failed. Accessing local feed.");
    // Emergency Fallback to lib/db.ts
    const localNotices = await db.getNotices();
    return localNotices.map(n => ({
      id: n.id,
      title: n.title,
      content: n.desc,
      created_at: n.date
    }));
  }
};
