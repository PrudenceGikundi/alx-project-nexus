import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from 'next/image';

interface User {
  user_id: string;
  profile_picture: string | null;
  email: string;
  username: string;
  created_at: string;
  favourites: Favourite[];
}

interface Favourite {
  id: string;
  title: string;
  poster: string | null;
}

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newProfilePic, setNewProfilePic] = useState<File | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("auth-token");

    if (!token) {
      router.push("/login"); // Redirect to login if not authenticated
      return;
    }

    const fetchProfile = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setNewUsername(parsedUser.username);
          setNewEmail(parsedUser.email);
        } else {
          // Fetch user data from API if not available in local storage
          const res = await fetch("https://cinewhisper.up.railway.app/auth/profile/", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await res.json();
          if (res.ok) {
            setUser(data);
            setNewUsername(data.username);
            setNewEmail(data.email);
            localStorage.setItem("user", JSON.stringify(data));
          } else {
            setError(data.detail || "Failed to load profile");
          }
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message || "Failed to load profile");
        } else {
          setError("Failed to load profile");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedUser = {
      ...user,
      username: newUsername,
      email: newEmail,
      profile_picture: newProfilePic ? URL.createObjectURL(newProfilePic) : user?.profile_picture,
    } as User;

    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setIsEditing(false);
    alert("Profile updated successfully!");
    router.push("/"); // Redirect to homepage after updating profile
  };

  if (loading) return <p className="text-center text-white">Loading profile...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-600 to-pink-500 dark:from-gray-900 dark:to-gray-800 text-white transition-all">
      <Navbar />

      <main className="p-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">Your Profile</h2>

        {user && (
          <div className="bg-gray-900 dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="flex items-center gap-4">
              <Image
                src={user.profile_picture || "/default-avatar.png"}
                alt="Profile Picture"
                width={96}
                height={96}
                className="w-24 h-24 rounded-full border-2 border-gray-400"
                loading="lazy"
              />
              <div>
                <p className="text-xl font-semibold">{user.username}</p>
                <p className="text-gray-300">{user.email}</p>
                <p className="text-sm text-gray-400">Joined: {new Date(user.created_at).toLocaleDateString()}</p>
              </div>
            </div>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>

            {isEditing && (
              <form onSubmit={handleUpdateProfile} className="mt-6 space-y-4">
                <input
                  type="text"
                  placeholder="New Username"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  className="w-full p-2 bg-gray-800 rounded"
                />
                <input
                  type="email"
                  placeholder="New Email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full p-2 bg-gray-800 rounded"
                />
                <input
                  type="password"
                  placeholder="New Password (optional)"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-2 bg-gray-800 rounded"
                />
                <input
                  type="file"
                  onChange={(e) => setNewProfilePic(e.target.files ? e.target.files[0] : null)}
                  className="w-full p-2 bg-gray-800 rounded"
                />

                <button type="submit" className="w-full bg-green-500 p-2 rounded">
                  Update Profile
                </button>
              </form>
            )}
          </div>
        )}

        {/* User Favorites */}
        {user?.favourites && (
          <div className="mt-8">
            <h3 className="text-2xl font-bold">Your Favorite Movies</h3>
            {user.favourites.length === 0 ? (
              <p className="text-gray-300">No favorites yet.</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {user.favourites.map((movie) => (
                  <div key={movie.id} className="bg-gray-800 p-4 rounded">
                    <Image
                      src={movie.poster || "/default-movie.png"}
                      alt={movie.title}
                      width={160}
                      height={240}
                      className="w-full h-40 object-cover rounded"
                      loading="lazy"
                    />
                    <p className="text-lg font-semibold mt-2">{movie.title}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Profile;