"use client";
export default async function ProfilePage({ params }) {
  const { id } = await params; // Assuming params is an object containing the route parameters
    return (
        <div>
            <h1>Profile Page</h1>
            <p>User ID: {id}</p>
        </div>
    );
}