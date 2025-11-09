export default function TestPage() {
  return (
    <div className="min-h-screen bg-blue-600 p-8">
      <h1 className="text-4xl font-bold text-white mb-4">Tailwind Test</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p className="text-blue-600 font-semibold">If you see colors, Tailwind is working!</p>
      </div>
      <button className="mt-4 bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-700">
        Test Button
      </button>
    </div>
  );
}