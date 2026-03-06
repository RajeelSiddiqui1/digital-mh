// Types for Category
export interface ICategory {
  _id: string;
  title: string;
  description: string;
  icon?: string;
  adminId: string;
  createdAt: string;
  updatedAt: string;
}

// Types for Social Links
export interface ISocial {
  platform: string;
  url: string;
}

// Types for Profile Picture
export interface IProfilePic {
  url: string;
  name: string;
  type: string;
  size: number;
  publicId: string;
  createdAt?: string;
}

// Types for Team Member
export interface ITeamMember {
  _id: string;
  name: string;
  email: string;
  intro: string;
  role: string;
  socials: ISocial[];
  profilePic: IProfilePic;
  adminId: string;
  createdAt: string;
  updatedAt: string;
}

// Types for FAQ
export interface IFaq {
  _id: string;
  question: string;
  answers: string[];
  adminId: string;
  createdAt: string;
  updatedAt: string;
}

// Types for Project Attachment
export interface IProjectAttachment {
  url: string;
  name: string;
  type: string;
  size: number;
  publicId: string;
  createdAt: string;
  _id?: string;
}

// Types for Project Category
export interface IProjectCategory {
  _id: string;
  title: string;
  icon: string;
}

// Types for Project
export interface IProject {
  _id: string;
  title: string;
  description: string;
  technologies: string[];
  cateogryId: string | IProjectCategory;
  adminId: string;
  liveLink?: string;
  isActive: boolean;
  fileAttachment: IProjectAttachment;
  multipleAttachments: IProjectAttachment[];
  type?: string;
  createdAt: string;
  updatedAt: string;
}

// Types for Testimonial
export interface ITestimonial {
  _id: string;
  profilePic: IProfilePic;
  name: string;
  comment: string;
  stars: number;
  createdAt: string;
  updatedAt: string;
}

// Types for File Attachment
export interface IFileAttachment {
  url: string;
  name: string;
  type: string;
  size: number;
  publicId: string;
  createdAt: string;
}

// Types for Video Attachment
export interface IVideoAttachment {
  url?: string;
  name?: string;
  type?: string;
  size?: number;
  publicId?: string;
  createdAt?: string;
}

// Types for Services
export interface IService {
  _id: string;
  title: string;
  description: string;
  isActive: boolean;
  cateogryId: string;
  adminId: string;
  fileAttachment: IFileAttachment;
  videoAttachment?: IVideoAttachment;
  createdAt: string;
  updatedAt: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
