import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useQueryClient } from "@tanstack/react-query";
import { User } from "@/types/user";
import { editProfileSchema } from "@/schemas/editUserSchema";

type EditProfileFormData = z.infer<typeof editProfileSchema>;

const EditProfile = () => {
  const queryClient = useQueryClient();
  const user: User = queryClient.getQueryData(["user"])!;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<EditProfileFormData>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      handle: user.handle,
      description: user.description,
      image: user.image,
    },
  });

  const username = watch("handle");
  const description = watch("description");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {};

  const onSubmit = (formData: EditProfileFormData) => {};

  return (
    <div className="min-w-full mx-auto mt-8 md:mt-0 flex flex-col-reverse md:flex-row gap-8 md:gap-0 md:space-x-8 lg:space-x-24 justify-center">
      <div className="w-full md:w-1/2 lg:w-1/3 flex flex-col justify-center">
        <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Username
            </label>
            <Input
              {...register("handle")}
              placeholder="Enter your username"
              className="mt-1"
            />
            {errors.handle && (
              <p className="text-red-500 text-sm">{errors.handle.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Description
            </label>
            <Textarea
              {...register("description")}
              placeholder="Tell us something about you"
              className="mt-1"
              rows={4}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Profile Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1"
            />
          </div>

          <Button type="submit" className="w-full mt-4">
            Save Changes
          </Button>
        </form>
      </div>

      <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Profile Preview</h3>
        <div className="flex flex-col items-center">
          <img
            src={user.image}
            alt="Profile preview"
            className="w-24 h-24 rounded-full object-cover mb-4"
          />
          <p className="text-lg font-medium text-gray-900 dark:text-gray-100">
            {username}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300 text-center mt-2">
            {description}
          </p>
          
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
