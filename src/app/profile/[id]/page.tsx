export default function profilePage({ params }: any) {
  return (
    <div>
      <h1 className="text-center">Profile {params.id}</h1>
      <br />
    </div>
  );
}
