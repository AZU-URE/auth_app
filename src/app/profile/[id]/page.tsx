export default function profilePage({ params }: any) {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <h1 className="text-center text-2xl font-bold">
        Profile
        <span className="border-2 rounded p-2 border-green-500 ml-2">
          {params.id}
        </span>
      </h1>
      <br />
    </div>
  );
}
