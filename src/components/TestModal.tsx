import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface TestModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const TestModal: React.FC<TestModalProps> = ({ open, onOpenChange }) => {
  console.log("TestModal rendering with open:", open);
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-white text-black">
        <DialogHeader>
          <DialogTitle>Test Modal</DialogTitle>
        </DialogHeader>
        <div className="p-4">
          <p>This is a test modal. If you see this, the modal system is working!</p>
          <button 
            onClick={() => onOpenChange(false)}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Close
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};