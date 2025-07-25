import { useState, useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit, Save, X, User, Camera, Upload } from "lucide-react";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { createBrowserSupabaseClient } from "@/lib/supabase";
import { toast } from "sonner";

interface ProfileEditorProps {
  user: SupabaseUser;
}

export function ProfileEditor({ user }: ProfileEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    avatarUrl: "",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const supabase = createBrowserSupabaseClient();

  // Initialize form when user data is available
  useEffect(() => {
    if (user) {
      setForm({
        fullName: user.user_metadata?.full_name || "",
        email: user.email || "",
        avatarUrl: user.user_metadata?.avatar_url || "",
      });
    }
  }, [user]);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }

    // Create preview
    const previewUrl = URL.createObjectURL(file);
    setAvatarPreview(previewUrl);

    // Upload to Supabase Storage
    setIsUploadingAvatar(true);
    try {
      const fileName = `${user.id}/avatar-${Date.now()}.${file.name.split(".").pop()}`;

      // Upload file to Supabase Storage
      const { data, error } = await supabase.storage
        .from("avatars")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: true, // Allow overwriting existing avatar
        });

      if (error) throw error;

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("avatars").getPublicUrl(fileName);

      // Update form with new avatar URL
      setForm((prev) => ({ ...prev, avatarUrl: publicUrl }));

      toast.success("Avatar uploaded successfully!");
    } catch (error: any) {
      console.error("Failed to upload avatar:", error);
      toast.error(error.message || "Failed to upload avatar");
      setAvatarPreview(null);
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const handleUpdate = async () => {
    if (!form.fullName.trim()) {
      toast.error("Full name is required");
      return;
    }

    setIsUpdating(true);
    try {
      // Update user metadata
      const { error: updateError } = await supabase.auth.updateUser({
        data: {
          full_name: form.fullName.trim(),
          avatar_url: form.avatarUrl,
        },
      });

      if (updateError) throw updateError;

      // Update email if changed
      if (form.email !== user?.email) {
        const { error: emailError } = await supabase.auth.updateUser({
          email: form.email,
        });

        if (emailError) throw emailError;

        toast.success(
          "Profile updated! Check your email to confirm the email change."
        );
      } else {
        toast.success("Profile updated successfully!");
      }

      setIsEditing(false);
      setAvatarPreview(null);
    } catch (error: any) {
      console.error("Failed to update profile:", error);
      toast.error(error.message || "Failed to update profile");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setAvatarPreview(null);
    setForm({
      fullName: user?.user_metadata?.full_name || "",
      email: user?.email || "",
      avatarUrl: user?.user_metadata?.avatar_url || "",
    });
  };

  const getAvatarUrl = () => {
    if (avatarPreview) return avatarPreview;
    if (form.avatarUrl) return form.avatarUrl;
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>
              Update your personal information and avatar
            </CardDescription>
          </div>
          {!isEditing && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start space-x-4">
          {/* Avatar Section */}
          <div className="flex-shrink-0">
            <div className="relative">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-indigo-100 flex items-center justify-center border-2 border-gray-200">
                {getAvatarUrl() ? (
                  <img
                    src={getAvatarUrl()!}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="h-10 w-10 text-indigo-600" />
                )}
              </div>
              {isEditing && (
                <button
                  onClick={handleAvatarClick}
                  disabled={isUploadingAvatar}
                  className="absolute -bottom-1 -right-1 bg-indigo-600 text-white rounded-full p-1.5 hover:bg-indigo-700 transition-colors disabled:opacity-50"
                >
                  {isUploadingAvatar ? (
                    <Upload className="h-3 w-3 animate-spin" />
                  ) : (
                    <Camera className="h-3 w-3" />
                  )}
                </button>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* Profile Form */}
          <div className="flex-1">
            {isEditing ? (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <Input
                    value={form.fullName}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        fullName: e.target.value,
                      })
                    }
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        email: e.target.value,
                      })
                    }
                    placeholder="Enter your email"
                  />
                </div>
                <div className="flex space-x-2 pt-2">
                  <Button
                    onClick={handleUpdate}
                    disabled={isUpdating || isUploadingAvatar}
                    size="sm"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {isUpdating ? "Saving..." : "Save Changes"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                    disabled={isUpdating || isUploadingAvatar}
                    size="sm"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="pt-2">
                <h3 className="text-lg font-medium">
                  {user?.user_metadata?.full_name || "User"}
                </h3>
                <p className="text-gray-600">{user?.email}</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
