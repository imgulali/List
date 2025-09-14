// List Item Types
export interface ListItem {
  id: string;
  text: string;
  createdAt: Date;
}

// Context Types
export interface ItemsContextType {
  list: ListItem[];
  addItem: (text: string) => boolean;
  editItem: (id: string, newText: string) => boolean;
  deleteItem: (id: string) => void;
  clearAll: () => void;
}

// Component Props Types
export interface ItemProps {
  text: string;
  id: string;
  onEdit?: (text: string, id: string) => void;
}

export interface TopBarProps {
  total: number;
  toggleMore: () => void;
}

export interface MoreOptionsProps {
  isActive: boolean;
  toggleMore: () => void;
  shareList: () => Promise<void>;
}

// Context Provider Props
export interface ItemsContextProviderProps {
  children: React.ReactNode;
}

// Input Component Props
export interface InputProps {
  editText?: string;
  editId?: string;
  onEditCancel?: () => void;
  onAddItem: (text: string) => boolean;
}

// Item Modal Props
export interface ItemModalProps {
  isVisible: boolean;
  text: string;
  onClose: () => void;
}

// Toast/Notification Types
export interface ToastConfig {
  type: 'success' | 'error' | 'info';
  text1: string;
  text2?: string;
  position?: 'top' | 'bottom';
  bottomOffset?: number;
  visibilityTime?: number;
}

// Share Types
export interface ShareOptions {
  message: string;
  title?: string;
  url?: string;
}
