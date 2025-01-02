import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import api from "@/config/axios";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { User } from "@/types/user";

const editProfileSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  description: z
    .string()
    .max(200, "Description cannot be longer than 200 characters"),
  image: z.string().optional(),
});

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
      username: user.handle,
      description: user.description,
      image: user.image,
    },
  });

  const [imagePreview, setImagePreview] = useState<string | undefined>(undefined);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: EditProfileFormData) => {
    try {
      const formData = new FormData();
      formData.append("username", data.username);
      formData.append("description", data.description);
      if (data.image) {
        formData.append("image", data.image);
      }

      const response = await api.put("/user/edit-profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  const username = watch("username");
  const description = watch("description");

  return (
    <div className="max-w-4xl mx-auto mt-8 flex flex-col-reverse md:flex-row gap-8 md:gap-0 md:space-x-8 justify-center">
      <div className="w-full md:w-1/2">
        <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Username
            </label>
            <Input
              {...register("username")}
              placeholder="Enter your username"
              className="mt-1"
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
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
              {...register("image")}
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
          {user.image ? (
            <img
              src={imagePreview || user.image}
              alt="Profile preview"
              className="w-24 h-24 rounded-full object-cover mb-4"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-300 dark:bg-gray-600 mb-4"></div>
          )}
          <p className="text-lg font-medium text-gray-900 dark:text-gray-100">
            {username || "Username"}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300 text-center mt-2">
            {description || "Description"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
