import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ModernContactForm from "@/components/ModernContactForm";

interface ContactModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  children?: React.ReactNode;
}

export const ContactModal = ({ isOpen, onOpenChange, children }: ContactModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent className="max-w-4xl w-full max-h-[90vh] overflow-y-auto p-0 bg-white">
        <div className="relative">
          <ModernContactForm />
        </div>
      </DialogContent>
    </Dialog>
  );
};