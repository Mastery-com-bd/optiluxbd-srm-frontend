// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea";
// import { useImageUploadImgbb } from "@/hooks/imagebb/useImageUpload";
// import {
//   useCreateProductMutation,
//   useUpdateProductMutation,
// } from "@/redux/features/inventory/inventoryApi";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Camera } from "lucide-react";
// import { useEffect, useRef, useState } from "react";
// import { Controller, useForm } from "react-hook-form";
// import { toast } from "sonner";
// import { z } from "zod";

// const productSchema = z.object({
//   name: z.string().min(1, "Name is required"),
//   sku: z.string().min(1, "SKU is required"),
//   description: z.string().optional(),
//   category: z.string().min(1, "Category is required"),
//   costPrice: z.number().min(0, "Cost price must be positive"),
//   sellingPrice: z.number().min(0, "Selling price must be positive"),
//   quantity: z.number().min(0, "Quantity must be non-negative"),
//   minimumStock: z.number().min(0, "Minimum stock must be non-negative"),
//   supplier: z.string().min(1, "Supplier is required"),
//   imageUrl: z.string().optional(),
// });

// type ProductFormData = z.infer<typeof productSchema>;

// // interface ProductFormProps {
// //   initialData?: any;
// //   onSubmit: () => void;
// //   isAdd: boolean;
// // }

// interface ProductFormProps {
//   initialData?: any;
//   onSubmit: (data?: any) => void | Promise<void>;
//   isAdd: boolean;
// }

// const ProductForm = ({ initialData, onSubmit, isAdd }: ProductFormProps) => {
//   const [createProduct] = useCreateProductMutation();
//   const [updateProduct] = useUpdateProductMutation();
//   const { uploadImage, isUploading } = useImageUploadImgbb();
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [previewUrl, setPreviewUrl] = useState<string | undefined>(
//     initialData?.imageUrl
//   );

//   const {
//     control,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//   } = useForm<ProductFormData>({
//     resolver: zodResolver(productSchema),
//     defaultValues: {
//       name: "",
//       sku: "",
//       description: "",
//       category: "",
//       costPrice: 0,
//       sellingPrice: 0,
//       quantity: 0,
//       minimumStock: 0,
//       supplier: "",
//       imageUrl: undefined,
//     },
//   });

//   useEffect(() => {
//     if (initialData) {
//       setValue("name", initialData.name);
//       setValue("sku", initialData.sku);
//       setValue("description", initialData.description || "");
//       setValue("category", initialData.category);
//       setValue("costPrice", initialData.costPrice);
//       setValue("sellingPrice", initialData.sellingPrice);
//       setValue("quantity", initialData.quantity);
//       setValue("minimumStock", initialData.minimumStock);
//       setValue("supplier", initialData.supplier);
//       setValue("imageUrl", initialData.imageUrl || undefined);
//       setPreviewUrl(initialData.imageUrl);
//     }
//   }, [initialData, setValue]);

//   const handleImageClick = () => {
//     fileInputRef.current?.click();
//   };

//   const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setPreviewUrl(URL.createObjectURL(file));
//       try {
//         const { url } = await uploadImage(file);
//         if (url) {
//           setValue("imageUrl", url);
//           toast.success("Image uploaded successfully");
//         }
//       } catch {
//         setPreviewUrl(initialData?.imageUrl);
//         toast.error("Failed to upload image");
//       }
//     }
//   };

//   const onFormSubmit = async (data: ProductFormData) => {
//     try {
//       if (isAdd) {
//         await createProduct(data).unwrap();
//         toast.success("Product created successfully");
//       } else {
//         await updateProduct({ id: initialData._id, ...data }).unwrap();
//         toast.success("Product updated successfully");
//       }
//       onSubmit();
//     } catch {
//       toast.error("Failed to save product");
//     }
//   };

//   const categories = [
//     "glasses",
//     "Electronics",
//     "Computers",
//     "Accessories",
//     "Mobile Phones",
//     "Tablets",
//     "Smart Watches",
//     "Audio Equipment",
//     "Wallets",
//     "Bags",
//     "Belts",
//   ];

//   return (
//     <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
//       <div className="flex justify-center mb-4">
//         <div className="relative">
//           <img
//             src={previewUrl || "/placeholder-image.png"}
//             alt="Product preview"
//             className="h-32 w-32 rounded-lg object-cover cursor-pointer"
//             onClick={handleImageClick}
//           />
//           <Input
//             type="file"
//             accept="image/*"
//             className="hidden"
//             ref={fileInputRef}
//             onChange={handleImageChange}
//           />
//           <Button
//             type="button"
//             size="icon"
//             className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
//             onClick={handleImageClick}
//             disabled={isUploading}
//           >
//             <Camera className="h-4 w-4" />
//           </Button>
//         </div>
//       </div>
//       {errors.imageUrl && (
//         <p className="text-sm text-destructive">{errors.imageUrl.message}</p>
//       )}

//       <div className="grid grid-cols-2 gap-4">
//         <div className="space-y-2">
//           <Label htmlFor="name">Product Name *</Label>
//           <Controller
//             name="name"
//             control={control}
//             render={({ field }) => <Input id="name" {...field} />}
//           />
//           {errors.name && (
//             <p className="text-sm text-destructive">{errors.name.message}</p>
//           )}
//         </div>
//         <div className="space-y-2">
//           <Label htmlFor="sku">SKU *</Label>
//           <Controller
//             name="sku"
//             control={control}
//             render={({ field }) => <Input id="sku" {...field} />}
//           />
//           {errors.sku && (
//             <p className="text-sm text-destructive">{errors.sku.message}</p>
//           )}
//         </div>
//       </div>

//       <div className="space-y-2">
//         <Label htmlFor="description">Description</Label>
//         <Controller
//           name="description"
//           control={control}
//           render={({ field }) => (
//             <Textarea id="description" rows={3} {...field} />
//           )}
//         />
//         {errors.description && (
//           <p className="text-sm text-destructive">
//             {errors.description.message}
//           </p>
//         )}
//       </div>

//       <div className="grid grid-cols-2 gap-4">
//         <div className="space-y-2">
//           <Label htmlFor="category">Category *</Label>
//           <Controller
//             name="category"
//             control={control}
//             render={({ field }) => (
//               <Select onValueChange={field.onChange} value={field.value}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select category" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {categories.map((cat) => (
//                     <SelectItem key={cat} value={cat}>
//                       {cat}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             )}
//           />
//           {errors.category && (
//             <p className="text-sm text-destructive">
//               {errors.category.message}
//             </p>
//           )}
//         </div>
//         <div className="space-y-2">
//           <Label htmlFor="supplier">Supplier *</Label>
//           <Controller
//             name="supplier"
//             control={control}
//             render={({ field }) => <Input id="supplier" {...field} />}
//           />
//           {errors.supplier && (
//             <p className="text-sm text-destructive">
//               {errors.supplier.message}
//             </p>
//           )}
//         </div>
//       </div>

//       <div className="grid grid-cols-2 gap-4">
//         <div className="space-y-2">
//           <Label htmlFor="costPrice">Cost Price (BDT) *</Label>
//           <Controller
//             name="costPrice"
//             control={control}
//             render={({ field }) => (
//               <Input
//                 id="costPrice"
//                 type="number"
//                 step="0.01"
//                 {...field}
//                 onChange={(e) =>
//                   field.onChange(parseFloat(e.target.value) || 0)
//                 }
//               />
//             )}
//           />
//           {errors.costPrice && (
//             <p className="text-sm text-destructive">
//               {errors.costPrice.message}
//             </p>
//           )}
//         </div>
//         <div className="space-y-2">
//           <Label htmlFor="sellingPrice">Selling Price (BDT) *</Label>
//           <Controller
//             name="sellingPrice"
//             control={control}
//             render={({ field }) => (
//               <Input
//                 id="sellingPrice"
//                 type="number"
//                 step="0.01"
//                 {...field}
//                 onChange={(e) =>
//                   field.onChange(parseFloat(e.target.value) || 0)
//                 }
//               />
//             )}
//           />
//           {errors.sellingPrice && (
//             <p className="text-sm text-destructive">
//               {errors.sellingPrice.message}
//             </p>
//           )}
//         </div>
//       </div>

//       <div className="grid grid-cols-2 gap-4">
//         <div className="space-y-2">
//           <Label htmlFor="quantity">Quantity *</Label>
//           <Controller
//             name="quantity"
//             control={control}
//             render={({ field }) => (
//               <Input
//                 id="quantity"
//                 type="number"
//                 {...field}
//                 onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
//               />
//             )}
//           />
//           {errors.quantity && (
//             <p className="text-sm text-destructive">
//               {errors.quantity.message}
//             </p>
//           )}
//         </div>
//         <div className="space-y-2">
//           <Label htmlFor="minimumStock">Minimum Stock *</Label>
//           <Controller
//             name="minimumStock"
//             control={control}
//             render={({ field }) => (
//               <Input
//                 id="minimumStock"
//                 type="number"
//                 {...field}
//                 onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
//               />
//             )}
//           />
//           {errors.minimumStock && (
//             <p className="text-sm text-destructive">
//               {errors.minimumStock.message}
//             </p>
//           )}
//         </div>
//       </div>

//       <div className="flex justify-end space-x-2 pt-4">
//         <Button type="submit" disabled={isUploading}>
//           {initialData ? "Update Product" : "Add Product"}
//         </Button>
//       </div>
//     </form>
//   );
// };

// export default ProductForm;

// Updated ProductForm.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useImageUploadImgbb } from "@/hooks/imagebb/useImageUpload";
import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from "@/redux/features/inventory/inventoryApi";
import { useGetAllUsersQuery } from "@/redux/features/user/userApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  sku: z.string().min(1, "SKU is required"),
  description: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  costPrice: z.number().min(0, "Cost price must be positive"),
  sellingPrice: z.number().min(0, "Selling price must be positive"),
  quantity: z.number().min(0, "Quantity must be non-negative"),
  minimumStock: z.number().min(0, "Minimum stock must be non-negative"),
  supplier: z.string().min(1, "Supplier is required"),
  imageUrl: z.string().optional(),
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductFormProps {
  initialData?: any;
  onSubmit: () => void;
  isAdd: boolean;
}

const ProductForm = ({ initialData, onSubmit, isAdd }: ProductFormProps) => {
  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const { data: usersData } = useGetAllUsersQuery(undefined);
  const { uploadImage, isUploading } = useImageUploadImgbb();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(
    initialData?.imageUrl
  );

  const suppliers =
    usersData?.data?.filter((user: any) => user.role === "supplier") || [];

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      sku: "",
      description: "",
      category: "",
      costPrice: 0,
      sellingPrice: 0,
      quantity: 0,
      minimumStock: 0,
      supplier: "",
      imageUrl: undefined,
    },
  });

  useEffect(() => {
    if (initialData) {
      setValue("name", initialData.name);
      setValue("sku", initialData.sku);
      setValue("description", initialData.description || "");
      setValue("category", initialData.category);
      setValue("costPrice", initialData.costPrice);
      setValue("sellingPrice", initialData.sellingPrice);
      setValue("quantity", initialData.quantity);
      setValue("minimumStock", initialData.minimumStock);
      setValue("supplier", initialData.supplier);
      setValue("imageUrl", initialData.imageUrl || undefined);
      setPreviewUrl(initialData.imageUrl);
    }
  }, [initialData, setValue]);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
      try {
        const { url } = await uploadImage(file);
        if (url) {
          setValue("imageUrl", url);
          toast.success("Image uploaded successfully");
        }
      } catch {
        setPreviewUrl(initialData?.imageUrl);
        toast.error("Failed to upload image");
      }
    }
  };

  const onFormSubmit = async (data: ProductFormData) => {
    try {
      if (isAdd) {
        await createProduct(data).unwrap();
        toast.success("Product created successfully");
      } else {
        await updateProduct({ id: initialData._id, ...data }).unwrap();
        toast.success("Product updated successfully");
      }
      onSubmit();
    } catch {
      toast.error("Failed to save product");
    }
  };

  const categories = [
    "glasses",
    "Electronics",
    "Computers",
    "Accessories",
    "Mobile Phones",
    "Tablets",
    "Smart Watches",
    "Audio Equipment",
    "Wallets",
    "Bags",
    "Belts",
  ];

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      <div className="flex justify-center mb-4">
        <div className="relative">
          <img
            src={previewUrl || "/placeholder-image.png"}
            alt="Product preview"
            className="h-32 w-32 rounded-lg object-cover cursor-pointer"
            onClick={handleImageClick}
          />
          <Input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          <Button
            type="button"
            size="icon"
            className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
            onClick={handleImageClick}
            disabled={isUploading}
          >
            <Camera className="h-4 w-4" />
          </Button>
        </div>
      </div>
      {errors.imageUrl && (
        <p className="text-sm text-destructive">{errors.imageUrl.message}</p>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Product Name *</Label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => <Input id="name" {...field} />}
          />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="sku">SKU *</Label>
          <Controller
            name="sku"
            control={control}
            render={({ field }) => <Input id="sku" {...field} />}
          />
          {errors.sku && (
            <p className="text-sm text-destructive">{errors.sku.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <Textarea id="description" rows={3} {...field} />
          )}
        />
        {errors.description && (
          <p className="text-sm text-destructive">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">Category *</Label>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.category && (
            <p className="text-sm text-destructive">
              {errors.category.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="supplier">Supplier *</Label>
          <Controller
            name="supplier"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select supplier" />
                </SelectTrigger>
                <SelectContent>
                  {suppliers.map((supplier: any) => (
                    <SelectItem key={supplier._id} value={supplier._id}>
                      {supplier.profile.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.supplier && (
            <p className="text-sm text-destructive">
              {errors.supplier.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="costPrice">Cost Price (BDT) *</Label>
          <Controller
            name="costPrice"
            control={control}
            render={({ field }) => (
              <Input
                id="costPrice"
                type="number"
                step="0.01"
                {...field}
                onChange={(e) =>
                  field.onChange(parseFloat(e.target.value) || 0)
                }
              />
            )}
          />
          {errors.costPrice && (
            <p className="text-sm text-destructive">
              {errors.costPrice.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="sellingPrice">Selling Price (BDT) *</Label>
          <Controller
            name="sellingPrice"
            control={control}
            render={({ field }) => (
              <Input
                id="sellingPrice"
                type="number"
                step="0.01"
                {...field}
                onChange={(e) =>
                  field.onChange(parseFloat(e.target.value) || 0)
                }
              />
            )}
          />
          {errors.sellingPrice && (
            <p className="text-sm text-destructive">
              {errors.sellingPrice.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="quantity">Quantity *</Label>
          <Controller
            name="quantity"
            control={control}
            render={({ field }) => (
              <Input
                id="quantity"
                type="number"
                {...field}
                onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
              />
            )}
          />
          {errors.quantity && (
            <p className="text-sm text-destructive">
              {errors.quantity.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="minimumStock">Minimum Stock *</Label>
          <Controller
            name="minimumStock"
            control={control}
            render={({ field }) => (
              <Input
                id="minimumStock"
                type="number"
                {...field}
                onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
              />
            )}
          />
          {errors.minimumStock && (
            <p className="text-sm text-destructive">
              {errors.minimumStock.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="submit" disabled={isUploading}>
          {initialData ? "Update Product" : "Add Product"}
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;
