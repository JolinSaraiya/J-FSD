function Loading() {
  return (
    <div className="flex min-h-40 items-center justify-center" role="status">
      <div className="flex items-center gap-3">
        <div className="h-6 w-6 animate-spin rounded-full border-4 border-slate-300 border-t-indigo-600" />
        <p className="font-medium text-slate-600">Loading events...</p>
      </div>
    </div>
  );
}

export default Loading;
