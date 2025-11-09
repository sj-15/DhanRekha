export default function AddButtons(submit, loading, isDisabled, text) {
  return (
    <div>
      <button
            onClick={submit}
            disabled={loading}
            className=" text-medium font-semibold"
          >
            {loading ? "Adding..." : text}
          </button>
    </div>
  );
}