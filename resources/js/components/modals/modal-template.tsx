interface ModalProps {
    show: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export default function Modal({
    show,
    onClose,
    children,
}: ModalProps) {
    if (!show) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
            onClick={onClose}
        >
            <div 
                className="w-full max-w-lg rounded-lg p-6"
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>

        </div>
    );
}