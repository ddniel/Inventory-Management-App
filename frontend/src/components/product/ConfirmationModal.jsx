export default function ConfirmationModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
        <p>
          Are you sure you want to delete this item? This action cannot be
          undone.
        </p>
        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="cursor-pointer hover:bg-blue-600 hover:text-white px-2 py-1 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="cursor-pointer hover:bg-blue-600 hover:text-white px-2 py-1 rounded-md"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
