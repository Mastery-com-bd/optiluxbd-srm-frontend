import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useImageUploadImgbb } from "@/hooks/imagebb/useImageUpload";
import { useAuth } from "@/hooks/useAuth";
import { useUpdateMeMutation } from "@/redux/features/auth/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Camera,
  Edit3,
  Mail,
  MapPin,
  Phone,
  User,
  VerifiedIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { data } from "react-router";
import { toast } from "sonner";
import * as z from "zod";

// Schema for profile update based on backend
const profileSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name cannot exceed 50 characters"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 characters")
    .max(15, "Phone number cannot exceed 15 characters"),
  address: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(128, "Address cannot exceed 128 characters")
    .optional(),

  avatarUrl: z.string().nullable().optional(),
  employeeId: z.string().min(7).max(12).optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const Profile = () => {
  const { user } = useAuth();
  const [updateMe] = useUpdateMeMutation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const { uploadImage, isUploading } = useImageUploadImgbb();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>();

  const profileForm = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      avatarUrl: null,
      employeeId: "",
    },
  });

  useEffect(() => {
    if (user) {
      profileForm.reset({
        name: user.profile?.name || "",
        phone: user.profile?.phone || "",
        address: user.profile?.address || "",
        avatarUrl: user.profile?.avatarUrl || null,
        employeeId: user.profile?.employeeId || "",
      });
    }
  }, [user, profileForm]);

  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
      try {
        const res = await uploadImage(file);
        const uploadedUrl = res?.url ?? null;
        if (uploadedUrl) {
          profileForm.setValue("avatarUrl", uploadedUrl);
          toast.success("Image uploaded successfully");
        } else {
          setPreviewUrl(undefined);
          toast.error("Failed to upload image");
        }
      } catch {
        setPreviewUrl(undefined);
        toast.error("Failed to upload image");
      }
    }
  };

  // const onSubmit = async (data: ProfileFormData) => {
  //   setIsUpdating(true);
  //   try {
  //     const profileData = {
  //       profile: {
  //         name: data.name,
  //         phone: data.phone,
  //         address: data.address,
  //         avatarUrl: data.avatarUrl,
  //         employeeId: data.employeeId,
  //       },
  //     };
  //     await updateMe(profileData).unwrap();
  //     toast.success("Profile updated successfully");
  //     setIsDialogOpen(false);
  //     setPreviewUrl(undefined);
  //   } catch {
  //     toast.error("Failed to update profile");
  //   } finally {
  //     setIsUpdating(false);
  //   }
  // };

  const onSubmit = async (data: ProfileFormData) => {
    setIsUpdating(true);
    try {
      const profileData = {
        name: data.name,
        phone: data.phone,
        address: data.address,
        avatarUrl: data.avatarUrl,
        employeeId: data.employeeId,
      };
      await updateMe(profileData).unwrap();
      toast.success("Profile updated successfully");
      setIsDialogOpen(false);
      setPreviewUrl(undefined);
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setIsUpdating(false);
    }
  };

  console.log(data);

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "supplier":
        return "secondary";
      case "staff":
        return "default";
      default:
        return "outline";
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">
            Profile
          </h1>
          <p className="text-muted-foreground">
            Manage your account information
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Card */}
        <Card className="md:col-span-1">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-24 w-24 border-4 border-background shadow-medium">
                <AvatarImage
                  src={user?.profile?.avatarUrl}
                  alt={user.profile?.name}
                />
                <AvatarFallback>
                  {user?.profile?.name
                    ?.split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <div className="text-center space-y-2">
                <h3 className="text-xl font-semibold">{user.profile?.name}</h3>
                <Badge
                  variant={getRoleBadgeVariant(user.role)}
                  className="capitalize"
                >
                  {user.role}
                </Badge>
                {user.isEmailVerified && (
                  <Badge
                    variant="outline"
                    className="text-green-600 border-green-600"
                  >
                    Verified Account
                  </Badge>
                )}
              </div>

              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full btn-cta">
                    <Edit3 className="mr-2 h-4 w-4" />
                    Update Profile
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Update Profile</DialogTitle>
                  </DialogHeader>

                  <div className="flex justify-center mb-4">
                    <div className="relative">
                      <Avatar
                        className="h-24 w-24 cursor-pointer"
                        onClick={handleAvatarClick}
                      >
                        <AvatarImage
                          src={previewUrl || user?.profile?.avatarUrl}
                          alt={user.profile?.name}
                        />
                        <AvatarFallback>
                          {user?.profile?.name
                            ?.split(" ")
                            .map((n: string) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <Input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        id="avatarUpload"
                        ref={fileInputRef}
                        onChange={handleAvatarChange}
                      />
                      <Button
                        size="icon"
                        className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full bg-primary hover:bg-primary-dark cursor-pointer"
                        onClick={handleAvatarClick}
                        disabled={isUploading}
                      >
                        <Camera className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <Form {...profileForm}>
                    <form
                      onSubmit={profileForm.handleSubmit(onSubmit)}
                      className="space-y-4"
                    >
                      <FormField
                        control={profileForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div>
                        <FormLabel>Email</FormLabel>
                        <Input
                          value={user.email}
                          disabled
                          className="bg-muted"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Email cannot be changed
                        </p>
                      </div>

                      <FormField
                        control={profileForm.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={profileForm.control}
                        name="employeeId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Employee ID</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={profileForm.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                              <Textarea {...field} rows={3} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex gap-2 pt-2">
                        <Button
                          type="button"
                          variant="outline"
                          className="flex-1"
                          onClick={() => setIsDialogOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          className="flex-1 btn-cta"
                          disabled={isUpdating || isUploading}
                        >
                          {isUpdating ? "Updating..." : "Update"}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* Profile Details */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span className="text-sm font-medium">Email</span>
                </div>
                <p className="text-foreground font-medium">{user.email}</p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span className="text-sm font-medium">Phone</span>
                </div>
                <p className="text-foreground font-medium">
                  {user.profile?.phone || "Not provided"}
                </p>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm font-medium">Address</span>
                </div>
                <p className="text-foreground font-medium">
                  {user.profile?.address || "Not provided"}
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <VerifiedIcon className="h-4 w-4" />
                  <span className="text-sm font-medium">Employee ID</span>
                </div>
                <p className="text-foreground font-medium">
                  {user.profile?.employeeId || "Not provided"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
