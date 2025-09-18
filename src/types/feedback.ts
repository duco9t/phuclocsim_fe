export interface Feedback {
  _id: string;
  userId: string;
  customerName: string;
  message: string;
  rating: number;
  imageUrls?: string[];
  videoUrl?: string;
  source?: string;
  published: boolean;
  createdAt: string;
}
