import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "@/types/user";
import { editProfileSchema } from "@/schemas/editUserSchema";
import { updateProfile, uploadImage } from "@/api/user";
import { toast } from "sonner";

type EditProfileFormData = z.infer<typeof editProfileSchema>;

const EditProfile = () => {
  const queryClient = useQueryClient();
  const user: User = queryClient.getQueryData(["user"])!;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProfileFormData>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      handle: user.handle,
      description: user.description,
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: updateProfile,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      window.location.reload(); // Force page reload
    },
  });

  const uploadImageMutation = useMutation({
    mutationFn: uploadImage,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) uploadImageMutation.mutate(e.target.files[0]);
  };

  const handleUserProfileForm = (formData: EditProfileFormData) => {
    const data: User = queryClient.getQueryData<User>(["user"])!;
    data.description = formData.description;
    data.handle = formData.handle;
    updateProfileMutation.mutate(data);
  };

  return (
    <div className="w-full md:w-1/2 lg:w-1/3 flex flex-col justify-center">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>

      <form
        onSubmit={handleSubmit(handleUserProfileForm)}
        className="space-y-6"
      >
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
            <p className="text-red-500 text-sm">{errors.description.message}</p>
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
  );
};

export default EditProfile;
