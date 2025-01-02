import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/api/user";

function ProfilePreview() {
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  if (!user) return null;

  return (
    <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
      <h3 className="text-xl font-semibold mb-4">Profile Preview</h3>
      <div className="flex flex-col items-center">
        <img
          src={user.image}
          alt="Profile preview"
          className="w-24 h-24 rounded-full object-cover mb-4"
        />
        <p className="text-lg font-medium text-gray-900 dark:text-gray-100">
          {user.handle}
        </p>
        <p className="text-sm text-gray-700 dark:text-gray-300 text-center mt-2">
          {user.description}
        </p>
      </div>
    </div>
  );
}

export default ProfilePreview;
