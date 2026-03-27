


export default async function ProfilePage({ params }) {
  const { id } = await params;
    return (
        <div>
            <h1>Profile Page</h1>
            <p>User ID: {id}</p>
        </div>
    );
}