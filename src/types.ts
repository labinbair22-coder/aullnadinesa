export interface Task {
  id: string;
  title: string;
  status: 'todo' | 'in_progress' | 'done';
  assignee: string;
  dueDate: string;
}

export interface LegalDocument {
  id: string;
  name: string;
  type: string;
  uploadedAt: string;
  size: string;
  status: 'verified' | 'pending_review' | 'rejected';
}

export interface Project {
  id: string;
  name: string;
  category: string;
  status: 'Dalam Proses' | 'Selesai' | 'Tertunda';
  progress: number;
  picName: string;
  picRole: string;
  clientName: string;
  startDate: string;
  tasks: Task[];
  documents: LegalDocument[];
}

export interface ComplaintTicket {
  id: string;
  projectNumber: string;
  category: string;
  description: string;
  status: 'Dalam Antrian' | 'Sedang Ditinjau' | 'Selesai';
  createdAt: string;
}

export interface UserProfileInfo {
  fullName: string;
  email: string;
  phone: string;
  businessName: string;
  businessSector: string;
  nib: string;
  legalStatus: string;
  address: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}
